#!/usr/bin/env node
/*
 * Solunera HQ — server. Zero dependencies, Node.js 18+.
 *
 *   node server.js
 *
 * Public site:  /
 * Hidden HQ:    /<HQ_PATH>/     (never linked from the site)
 *
 * Environment:
 *   HQ_PATH         secret path for the HQ app, e.g. "studio-8f3k2"  (if empty one is generated and printed once)
 *   OWNER_EMAIL     your login email (first run)
 *   OWNER_PASSWORD  your first password (first run; you'll be asked to change it)
 *   VAULT_KEY       long random text used to encrypt API keys/passwords in the vault (keep it safe, never change it)
 *   SUPABASE_URL / SUPABASE_KEY   free cloud storage (see README). Without them data is kept in ./data
 *   COOKIE_SECURE=1 when served over HTTPS
 *
 * Built by Solunera — Kamel Nassif
 */
'use strict';
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const zlib = require('zlib');
const Engine = require('./public/engine.js');

const PORT = +process.env.PORT || 3000;
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'solunera.json');
const PUBLIC = path.join(__dirname, 'public');
const HQ_DIR = path.join(__dirname, 'hq');
const COOKIE = 'sol_sid';
const SECURE_COOKIE = process.env.COOKIE_SECURE === '1';
const SB_URL = (process.env.SUPABASE_URL || '').replace(/\/+$/, '');
const SB_KEY = process.env.SUPABASE_KEY || '';
const CLOUD = !!(SB_URL && SB_KEY);
const TABLE = process.env.SUPABASE_TABLE || 'solunera_store';
const rand = (n) => crypto.randomBytes(n).toString('hex');

/* ---------- vault (AES-256-GCM) ---------- */
const VKEY = process.env.VAULT_KEY ? crypto.createHash('sha256').update(process.env.VAULT_KEY).digest() : null;
const vault = {
  ready: !!VKEY,
  enc(plain) {
    const iv = crypto.randomBytes(12), c = crypto.createCipheriv('aes-256-gcm', VKEY, iv);
    const data = Buffer.concat([c.update(String(plain), 'utf8'), c.final()]);
    return 'v1:' + Buffer.concat([iv, c.getAuthTag(), data]).toString('base64');
  },
  dec(s) {
    const raw = Buffer.from(String(s).slice(3), 'base64');
    const d = crypto.createDecipheriv('aes-256-gcm', VKEY, raw.subarray(0, 12)); d.setAuthTag(raw.subarray(12, 28));
    return Buffer.concat([d.update(raw.subarray(28)), d.final()]).toString('utf8');
  }
};

/* ---------- storage: main document + image assets ---------- */
const Local = {
  name: 'local folder ' + DATA_DIR,
  async init() { fs.mkdirSync(path.join(DATA_DIR, 'backups'), { recursive: true }); fs.mkdirSync(path.join(DATA_DIR, 'assets'), { recursive: true }); },
  async load() { return fs.existsSync(DB_FILE) ? JSON.parse(fs.readFileSync(DB_FILE, 'utf8')) : null; },
  async save(json) { const tmp = DB_FILE + '.tmp'; await fs.promises.writeFile(tmp, json); await fs.promises.rename(tmp, DB_FILE); },
  async backup(day, json) {
    const f = path.join(DATA_DIR, 'backups', `solunera-${day}.json.gz`);
    if (fs.existsSync(f)) return;
    fs.writeFileSync(f, zlib.gzipSync(json));
    const all = fs.readdirSync(path.join(DATA_DIR, 'backups')).sort();
    all.slice(0, Math.max(0, all.length - 30)).forEach((x) => fs.unlinkSync(path.join(DATA_DIR, 'backups', x)));
  },
  async putAsset(a) { fs.writeFileSync(path.join(DATA_DIR, 'assets', a.id + '.json'), JSON.stringify({ mime: a.mime, b64: a.b64 })); },
  async getAsset(id) { const f = path.join(DATA_DIR, 'assets', id + '.json'); return fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : null; },
  async delAsset(id) { const f = path.join(DATA_DIR, 'assets', id + '.json'); if (fs.existsSync(f)) fs.unlinkSync(f); }
};
const Cloud = {
  name: 'Supabase ' + SB_URL,
  async init() {},
  headers(extra) { const h = { apikey: SB_KEY, 'Content-Type': 'application/json' }; if (SB_KEY.startsWith('eyJ')) h.Authorization = 'Bearer ' + SB_KEY; return Object.assign(h, extra || {}); },
  async req(method, q, body, extra) {
    const r = await fetch(`${SB_URL}/rest/v1/${TABLE}${q}`, { method, headers: this.headers(extra), body });
    if (!r.ok) throw new Error(`Supabase ${method} ${r.status}: ${(await r.text()).slice(0, 300)}`);
    return r;
  },
  async get(id) { const rows = await (await this.req('GET', `?id=eq.${encodeURIComponent(id)}&select=data`)).json(); return rows.length ? rows[0].data : null; },
  async put(id, json) { await this.req('POST', '', `[{"id":${JSON.stringify(id)},"data":${json},"updated_at":"${new Date().toISOString()}"}]`, { Prefer: 'resolution=merge-duplicates,return=minimal' }); },
  async load() { return this.get('main'); },
  async save(json) { await this.put('main', json); },
  async backup(day, json) {
    await this.put('backup-' + day, json);
    const old = new Date(Date.now() - 30 * 864e5).toISOString().slice(0, 10);
    await this.req('DELETE', `?id=like.backup-*&id=lt.backup-${old}`, undefined, { Prefer: 'return=minimal' }).catch(() => {});
  },
  async putAsset(a) { await this.put('asset-' + a.id, JSON.stringify({ mime: a.mime, b64: a.b64 })); },
  async getAsset(id) { return this.get('asset-' + id); },
  async delAsset(id) { await this.req('DELETE', `?id=eq.asset-${encodeURIComponent(id)}`, undefined, { Prefer: 'return=minimal' }).catch(() => {}); }
};
const Store = CLOUD ? Cloud : Local;
const assetCache = new Map();

let db, HQ_PATH;
let saveTimer = null, saving = false, dirty = false;
function persist() { dirty = true; if (!saveTimer) saveTimer = setTimeout(flush, CLOUD ? 400 : 150); }
async function flush() {
  saveTimer = null; if (saving || !dirty) return; saving = true; dirty = false;
  try { await Store.save(JSON.stringify(db)); }
  catch (e) { console.error('save failed — retrying', e.message); dirty = true; setTimeout(persist, 5000); }
  finally { saving = false; if (dirty) persist(); }
}
async function backup() { try { await Store.backup(new Date().toISOString().slice(0, 10), JSON.stringify(db)); } catch (e) { console.warn('backup failed', e.message); } }
async function shutdown() { try { clearTimeout(saveTimer); await Store.save(JSON.stringify(db)); } catch (e) { console.error(e.message); } process.exit(0); }
process.on('SIGINT', shutdown); process.on('SIGTERM', shutdown);

async function init() {
  await Store.init();
  db = await Store.load();
  if (!db) { db = Engine.freshDb(Date.now()); Engine.seedPortfolio(db); if (process.argv.includes('--demo')) { Engine.ensureOwner(db, rand, process.env.OWNER_EMAIL || 'kamel@solunera.co', process.env.OWNER_PASSWORD || 'solunera-demo'); Engine.seedDemo(db, Date.now(), rand); } }
  const pw = Engine.ensureOwner(db, rand, process.env.OWNER_EMAIL, process.env.OWNER_PASSWORD);
  HQ_PATH = (process.env.HQ_PATH || db.meta.hqPath || '').replace(/[^a-zA-Z0-9_-]/g, '');
  if (!HQ_PATH) { HQ_PATH = 'hq-' + rand(5); db.meta.hqPath = HQ_PATH; }
  await Store.save(JSON.stringify(db));
  setInterval(backup, 3600e3); setTimeout(backup, 15000);
  if (CLOUD) setInterval(() => Cloud.req('GET', '?id=eq.main&select=id').catch(() => {}), 6 * 3600e3);
  console.log('\n  Storage: ' + Store.name + '\n  Vault:   ' + (vault.ready ? 'ready (VAULT_KEY set)' : 'LOCKED — set VAULT_KEY to store API keys'));
  console.log('  HQ:      /' + HQ_PATH + '/   (keep this link private)');
  if (pw) console.log(`\n  ┌─ FIRST RUN — owner account ─────────────────────\n  │ email:    ${db.users[0].email}\n  │ password: ${pw}\n  └─ change it after your first sign-in ─────────────\n`);
}

/* ---------- WhatsApp alerts (CallMeBot) ---------- */
function sendWhatsApp(fx) {
  const url = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(fx.phone)}&text=${encodeURIComponent(fx.text)}&apikey=${encodeURIComponent(fx.apikey)}`;
  https.get(url, { timeout: 15000 }, (r) => { r.resume(); if (r.statusCode !== 200) console.warn('WhatsApp alert status', r.statusCode); }).on('error', (e) => console.warn('WhatsApp alert failed:', e.message));
}

/* ---------- rate limiting ---------- */
const hits = new Map();
function limited(ip, key, max, windowMs) { const k = ip + '|' + key, now = Date.now(); const arr = (hits.get(k) || []).filter((t) => now - t < windowMs); arr.push(now); hits.set(k, arr); return arr.length > max; }
setInterval(() => hits.clear(), 3600e3);

/* ---------- static ---------- */
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml', '.mp4': 'video/mp4', '.json': 'application/json', '.ico': 'image/x-icon', '.txt': 'text/plain' };
function sendFile(req, res, file, extraHeaders) {
  fs.stat(file, (e, st) => {
    if (e || !st.isFile()) return notFound(res);
    const ext = path.extname(file).toLowerCase();
    const h = Object.assign({ 'Content-Type': TYPES[ext] || 'application/octet-stream', 'X-Content-Type-Options': 'nosniff', 'Cache-Control': /\.(webp|jpg|png|mp4|svg)$/.test(ext) ? 'public, max-age=604800' : 'no-cache' }, extraHeaders || {});
    if (ext === '.html') { h['X-Frame-Options'] = 'SAMEORIGIN'; h['Referrer-Policy'] = 'same-origin'; }
    if (/\.(html|js|css|json|svg)$/.test(ext) && /gzip/.test(req.headers['accept-encoding'] || '')) { h['Content-Encoding'] = 'gzip'; res.writeHead(200, h); return fs.createReadStream(file).pipe(zlib.createGzip()).pipe(res); }
    h['Content-Length'] = st.size; res.writeHead(200, h); fs.createReadStream(file).pipe(res);
  });
}
function notFound(res) { res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' }); res.end('<!doctype html><meta charset=utf-8><title>Not found</title><body style="font-family:system-ui;display:grid;place-items:center;height:100vh;margin:0;background:#0d0d17;color:#fff"><div style="text-align:center"><h1 style="font-size:64px;margin:0">404</h1><p><a href="/" style="color:#9d8cff">Back to Solunera</a></p></div>'); }
function safeJoin(base, p) { const f = path.normalize(path.join(base, p)); return f.startsWith(base) ? f : null; }

async function serveAsset(res, id) {
  if (!/^[a-f0-9]{8,40}$/.test(id)) return notFound(res);
  let a = assetCache.get(id);
  if (!a) { try { a = await Store.getAsset(id); } catch (e) { a = null; } if (a) assetCache.set(id, a); }
  if (!a) return notFound(res);
  const buf = Buffer.from(a.b64, 'base64');
  res.writeHead(200, { 'Content-Type': a.mime, 'Content-Length': buf.length, 'Cache-Control': 'public, max-age=31536000, immutable' }); res.end(buf);
}

/* ---------- api ---------- */
function readBody(req, limit) {
  return new Promise((resolve, reject) => {
    let size = 0; const chunks = [];
    req.on('data', (c) => { size += c.length; if (size > limit) { reject(Object.assign(new Error('too large'), { status: 413 })); req.destroy(); } else chunks.push(c); });
    req.on('end', () => { try { resolve(chunks.length ? JSON.parse(Buffer.concat(chunks).toString('utf8')) : {}); } catch (e) { reject(Object.assign(new Error('bad json'), { status: 400 })); } });
    req.on('error', reject);
  });
}
function cookies(req) { const o = {}; (req.headers.cookie || '').split(';').forEach((c) => { const i = c.indexOf('='); if (i > 0) o[c.slice(0, i).trim()] = decodeURIComponent(c.slice(i + 1).trim()); }); return o; }
function json(res, status, body) { res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }); res.end(JSON.stringify(body)); }
async function api(req, res, url) {
  const ip = (req.headers['x-forwarded-for'] || req.socket.remoteAddress || '').split(',')[0].trim();
  let body = {};
  if (req.method !== 'GET') {
    const big = url.pathname === '/api/hq/import' || url.pathname === '/api/hq/assets';
    try { body = await readBody(req, big ? 60e6 : 1e6); } catch (e) { return json(res, e.status || 400, { error: 'Invalid request' }); }
  }
  if (req.method === 'POST' && url.pathname === '/api/public/inquiry' && limited(ip, 'inq', 6, 3600e3)) return json(res, 429, { error: 'Too many requests — message us on WhatsApp instead' });
  if (req.method === 'POST' && url.pathname === '/api/auth/login' && limited(ip, 'login', 8, 900e3)) return json(res, 429, { error: 'Too many attempts. Wait 15 minutes.' });
  if (url.pathname.startsWith('/api/hq/secrets') && limited(ip, 'reveal', 60, 3600e3)) return json(res, 429, { error: 'Slow down' });
  const token = cookies(req)[COOKIE] || null;
  const r = Engine.handle(db, { method: req.method, path: url.pathname, query: Object.fromEntries(url.searchParams.entries()), body, token, now: Date.now(), rand, ip, mode: 'server', vault });
  if (r.internal) console.error(r.internal);
  if (r.asset) { try { await Store.putAsset(r.asset); assetCache.set(r.asset.id, { mime: r.asset.mime, b64: r.asset.b64 }); } catch (e) { console.error(e); return json(res, 500, { error: 'Could not save the image, try again' }); } }
  if (r.dropAssets) r.dropAssets.forEach((ref) => { const id = ref.slice(6); assetCache.delete(id); Store.delAsset(id).catch(() => {}); });
  if (r.replaceDb) { db = r.replaceDb; db.sessions = db.sessions || {}; if (!db.meta.hqPath) db.meta.hqPath = HQ_PATH; }
  if (r.changed) { db.meta.rev = (db.meta.rev || 0) + 1; persist(); }
  (r.effects || []).forEach((fx) => { if (fx.type === 'whatsapp') sendWhatsApp(fx); });
  const headers = { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' };
  const flags = `; Path=/; HttpOnly; SameSite=Strict${SECURE_COOKIE ? '; Secure' : ''}`;
  if (r.setToken) headers['Set-Cookie'] = `${COOKIE}=${r.setToken}; Max-Age=${14 * 86400}${flags}`;
  if (r.clearToken) headers['Set-Cookie'] = `${COOKIE}=; Max-Age=0${flags}`;
  res.writeHead(r.status, headers); res.end(JSON.stringify(r.body));
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://x');
  const p = decodeURIComponent(url.pathname);
  if (p.startsWith('/api/')) return void api(req, res, url).catch((e) => { console.error(e); try { json(res, 500, { error: 'Server error' }); } catch (_) {} });
  if (req.method !== 'GET' && req.method !== 'HEAD') { res.writeHead(405); return res.end(); }
  if (p.startsWith('/asset/')) return void serveAsset(res, p.slice(7));
  // hidden HQ
  if (p === '/' + HQ_PATH) { res.writeHead(301, { Location: '/' + HQ_PATH + '/' }); return res.end(); }
  if (p.startsWith('/' + HQ_PATH + '/')) {
    const rest = p.slice(HQ_PATH.length + 2) || 'index.html';
    const f = safeJoin(HQ_DIR, rest) || '';
    if (fs.existsSync(f)) return sendFile(req, res, f, { 'X-Robots-Tag': 'noindex, nofollow' });
    const shared = safeJoin(PUBLIC, rest); // engine.js, api.js, media…
    return shared ? sendFile(req, res, shared) : notFound(res);
  }
  if (p === '/robots.txt') { res.writeHead(200, { 'Content-Type': 'text/plain' }); return res.end('User-agent: *\nAllow: /\n'); }
  const f = safeJoin(PUBLIC, p === '/' || p === '/work' || p === '/ar' ? 'index.html' : p);
  if (!f) return notFound(res);
  sendFile(req, res, f);
});
init().then(() => server.listen(PORT, () => console.log(`\n  ● Solunera is running on http://localhost:${PORT}/\n`)))
  .catch((e) => { console.error('Could not load data:', e.message); process.exit(1); });
