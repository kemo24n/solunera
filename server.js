#!/usr/bin/env node
/*
 * Solunera: public site + private HQ. Zero dependencies, Node.js 18+.
 *
 *   node server.js          real mode
 *   npm run demo            fills an empty store with sample data
 *
 * Public site:  /
 * HQ:           /<HQ_PATH>/   (never linked from the site)
 *
 * Environment (see .env.example):
 *   HQ_PATH, OWNER_EMAIL, OWNER_PASSWORD, SUPABASE_URL, SUPABASE_KEY, COOKIE_SECURE,
 *   CALLMEBOT_PHONE + CALLMEBOT_KEY (optional WhatsApp alert for new website inquiries)
 *
 * Built by Solunera, Kamel Nassif
 */
'use strict';
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const zlib = require('zlib');

const PORT = +process.env.PORT || 3000;
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'solunera.json');
const PUBLIC = path.join(__dirname, 'public');
const HQ_DIR = path.join(__dirname, 'hq');
const COOKIE = 'sol_hq';
const SECURE_COOKIE = process.env.COOKIE_SECURE === '1';
const SB_URL = (process.env.SUPABASE_URL || '').replace(/\/+$/, '');
const SB_KEY = process.env.SUPABASE_KEY || '';
const CLOUD = !!(SB_URL && SB_KEY);
const TABLE = process.env.SUPABASE_TABLE || 'solunera_store';
const DOC_ID = 'hq-v2';
const COLS = ['quotes', 'visits', 'demos', 'projects', 'tasks', 'inbox'];
const rand = (n) => crypto.randomBytes(n).toString('hex');
const now = () => Date.now();

/* ---------- storage ---------- */
const Local = {
  name: 'local folder ' + DATA_DIR,
  async init() { fs.mkdirSync(path.join(DATA_DIR, 'backups'), { recursive: true }); },
  async load() { return fs.existsSync(DB_FILE) ? JSON.parse(fs.readFileSync(DB_FILE, 'utf8')) : null; },
  async save(json) { const tmp = DB_FILE + '.tmp'; await fs.promises.writeFile(tmp, json); await fs.promises.rename(tmp, DB_FILE); },
  async backup(day, json) {
    const dir = path.join(DATA_DIR, 'backups'), f = path.join(dir, `solunera-${day}.json.gz`);
    if (fs.existsSync(f)) return;
    fs.writeFileSync(f, zlib.gzipSync(json));
    const all = fs.readdirSync(dir).sort();
    all.slice(0, Math.max(0, all.length - 30)).forEach((x) => fs.unlinkSync(path.join(dir, x)));
  }
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
  async load() { return this.get(DOC_ID); },
  async save(json) { await this.put(DOC_ID, json); },
  async backup(day, json) {
    await this.put('backup2-' + day, json);
    const old = new Date(now() - 30 * 864e5).toISOString().slice(0, 10);
    await this.req('DELETE', `?id=like.backup2-*&id=lt.backup2-${old}`, undefined, { Prefer: 'return=minimal' }).catch(() => {});
  }
};
const Store = CLOUD ? Cloud : Local;

/* ---------- passwords ---------- */
function hashPw(pw, salt) { salt = salt || rand(16); return { salt, hash: crypto.scryptSync(String(pw), salt, 64).toString('hex') }; }
function checkPw(user, pw) {
  if (!user || !user.hash) return false;
  const h = crypto.scryptSync(String(pw), user.salt, 64);
  return crypto.timingSafeEqual(h, Buffer.from(user.hash, 'hex'));
}

/* ---------- database ---------- */
let db, HQ_PATH, saveTimer = null, saving = false, dirty = false;
function freshDb() {
  return {
    meta: { v: 2, rev: 1, created: now(), hqPath: '' },
    users: [], sessions: {},
    settings: { company: 'Solunera', phone: '+961 81 836 178', instagram: '@soluneragency', email: '', signer: 'Kamel Nassif', signerTitle_en: 'Founder', signerTitle_ar: 'المؤسس', quotePrefix: 'SOL', quoteSeq: 0, terms_en: '', terms_ar: '' },
    quotes: [], visits: [], demos: [], projects: [], tasks: [], inbox: []
  };
}
function persist() { db.meta.rev++; dirty = true; if (!saveTimer) saveTimer = setTimeout(flush, CLOUD ? 400 : 150); }
async function flush() {
  saveTimer = null; if (saving || !dirty) return; saving = true; dirty = false;
  try { await Store.save(JSON.stringify(db)); }
  catch (e) { console.error('save failed, retrying', e.message); dirty = true; setTimeout(() => { if (!saveTimer) saveTimer = setTimeout(flush, 10); }, 5000); }
  finally { saving = false; if (dirty && !saveTimer) saveTimer = setTimeout(flush, 50); }
}
async function backup() { try { await Store.backup(new Date().toISOString().slice(0, 10), JSON.stringify(db)); } catch (e) { console.warn('backup failed', e.message); } }
async function shutdown() { try { clearTimeout(saveTimer); await Store.save(JSON.stringify(db)); } catch (e) { console.error(e.message); } process.exit(0); }
process.on('SIGINT', shutdown); process.on('SIGTERM', shutdown);

function ensureOwner() {
  if (db.users.some((u) => u.role === 'owner')) return null;
  const email = (process.env.OWNER_EMAIL || 'kamel@solunera.co').toLowerCase().trim();
  const pw = process.env.OWNER_PASSWORD || rand(6);
  db.users.push(Object.assign({ id: 'u' + rand(4), name: 'Kamel Nassif', email, role: 'owner', mustChange: true, createdAt: now() }, hashPw(pw)));
  return pw;
}

async function init() {
  await Store.init();
  db = await Store.load();
  if (!db) {
    db = freshDb();
  }
  COLS.forEach((c) => { db[c] = db[c] || []; });
  db.sessions = db.sessions || {};
  const pw = ensureOwner();
  if (process.argv.includes('--demo') && !db.visits.length && !db.demos.length) { require('./hq/sample.js').fill(db, now()); db.users.forEach((u) => { if (!u.hash) Object.assign(u, hashPw(rand(8))); }); }
  HQ_PATH = (process.env.HQ_PATH || db.meta.hqPath || '').replace(/[^a-zA-Z0-9_-]/g, '');
  if (!HQ_PATH) { HQ_PATH = 'hq-' + rand(5); db.meta.hqPath = HQ_PATH; }
  await Store.save(JSON.stringify(db));
  setInterval(backup, 3600e3); setTimeout(backup, 15000);
  setInterval(() => { const t = now(); for (const k in db.sessions) if (db.sessions[k].exp < t) delete db.sessions[k]; }, 3600e3);
  console.log('\n  Storage: ' + Store.name);
  console.log('  HQ:      /' + HQ_PATH + '/   (keep this link private)');
  if (pw) console.log(`\n  ┌─ FIRST RUN, owner account ──────────────────────\n  │ email:    ${db.users[0].email}\n  │ password: ${pw}\n  └─ you'll be asked to change it ─────────────────\n`);
}

/* ---------- helpers ---------- */
const hits = new Map();
function limited(ip, key, max, windowMs) { const k = ip + '|' + key, t = now(); const arr = (hits.get(k) || []).filter((x) => t - x < windowMs); arr.push(t); hits.set(k, arr); return arr.length > max; }
setInterval(() => hits.clear(), 3600e3);
function readBody(req, limit) {
  return new Promise((resolve, reject) => {
    let size = 0; const chunks = [];
    req.on('data', (c) => { size += c.length; if (size > limit) { reject(Object.assign(new Error('too large'), { status: 413 })); req.destroy(); } else chunks.push(c); });
    req.on('end', () => { try { resolve(chunks.length ? JSON.parse(Buffer.concat(chunks).toString('utf8')) : {}); } catch (e) { reject(Object.assign(new Error('bad json'), { status: 400 })); } });
    req.on('error', reject);
  });
}
function cookies(req) { const o = {}; (req.headers.cookie || '').split(';').forEach((c) => { const i = c.indexOf('='); if (i > 0) o[c.slice(0, i).trim()] = decodeURIComponent(c.slice(i + 1).trim()); }); return o; }
function send(res, status, body, headers) { res.writeHead(status, Object.assign({ 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }, headers || {})); res.end(JSON.stringify(body)); }
const pub = (u) => ({ id: u.id, name: u.name, email: u.email, role: u.role, phone: u.phone || '', mustChange: !!u.mustChange });
function clean(obj) {
  // keep plain data only; cap long strings; never let a client set server fields
  const out = {};
  for (const k of Object.keys(obj || {})) {
    if (['id', 'createdAt', 'createdBy', 'number'].includes(k)) continue;
    const v = obj[k];
    if (typeof v === 'string') out[k] = v.slice(0, k === 'photos' ? 0 : 20000);
    else if (v === null || typeof v === 'number' || typeof v === 'boolean') out[k] = v;
    else if (Array.isArray(v) || typeof v === 'object') out[k] = JSON.parse(JSON.stringify(v));
  }
  return out;
}
function whatsapp(text) {
  const p = process.env.CALLMEBOT_PHONE, k = process.env.CALLMEBOT_KEY;
  if (!p || !k) return;
  https.get(`https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(p)}&text=${encodeURIComponent(text)}&apikey=${encodeURIComponent(k)}`, { timeout: 15000 }, (r) => r.resume()).on('error', (e) => console.warn('WhatsApp alert failed:', e.message));
}

/* ---------- api ---------- */
async function api(req, res, url) {
  const ip = (req.headers['x-forwarded-for'] || req.socket.remoteAddress || '').split(',')[0].trim();
  const p = url.pathname, m = req.method;
  let body = {};
  if (m !== 'GET') { try { body = await readBody(req, 6e6); } catch (e) { return send(res, e.status || 400, { error: 'Invalid request' }); } }

  if (p === '/api/ping') return send(res, 200, { app: 'solunera', v: 2 });

  if (p === '/api/public/inquiry' && m === 'POST') {
    if (limited(ip, 'inq', 6, 3600e3)) return send(res, 429, { error: 'Too many messages. WhatsApp us instead.' });
    const name = String(body.name || '').trim().slice(0, 120), phone = String(body.phone || '').trim().slice(0, 40);
    if (!name || phone.replace(/\D/g, '').length < 6) return send(res, 400, { error: 'Name and phone are required' });
    const item = { id: 'in' + rand(5), createdAt: now(), name, phone, business: String(body.business || '').slice(0, 160), message: String(body.message || '').slice(0, 4000),
      needs: Array.isArray(body.needs) ? body.needs.slice(0, 8).map((x) => String(x).slice(0, 40)) : [], lang: body.lang === 'ar' ? 'ar' : 'en', status: 'new' };
    db.inbox.unshift(item); persist();
    whatsapp(`New Solunera inquiry: ${name} (${item.business || 'no business'}), ${phone}. ${item.needs.join(', ')}`);
    return send(res, 200, { ok: true });
  }

  if (p === '/api/auth/login' && m === 'POST') {
    if (limited(ip, 'login', 8, 900e3)) return send(res, 429, { error: 'Too many attempts. Wait 15 minutes.' });
    const u = db.users.find((x) => x.email === String(body.email || '').toLowerCase().trim());
    if (!checkPw(u, body.password || '')) return send(res, 401, { error: 'Email or password is wrong' });
    const tok = rand(24); db.sessions[tok] = { uid: u.id, exp: now() + 14 * 864e5 }; persist();
    return send(res, 200, { me: pub(u) }, { 'Set-Cookie': `${COOKIE}=${tok}; Max-Age=${14 * 86400}; Path=/; HttpOnly; SameSite=Strict${SECURE_COOKIE ? '; Secure' : ''}` });
  }

  const tok = cookies(req)[COOKIE];
  const sess = tok && db.sessions[tok];
  const me = sess && sess.exp > now() ? db.users.find((u) => u.id === sess.uid) : null;
  if (p === '/api/auth/logout') { if (tok) { delete db.sessions[tok]; persist(); } return send(res, 200, { ok: true }, { 'Set-Cookie': `${COOKIE}=; Max-Age=0; Path=/; HttpOnly; SameSite=Strict` }); }
  if (!me) return send(res, 401, { error: 'Sign in again' });
  const owner = me.role === 'owner';

  if (p === '/api/auth/password' && m === 'POST') {
    if (!me.mustChange && !checkPw(me, body.current || '')) return send(res, 400, { error: 'Current password is wrong' });
    if (String(body.next || '').length < 8) return send(res, 400, { error: 'Use at least 8 characters' });
    Object.assign(me, hashPw(body.next)); me.mustChange = false; persist();
    return send(res, 200, { me: pub(me) });
  }
  if (p === '/api/hq/rev') return send(res, 200, { rev: db.meta.rev });
  if (p === '/api/hq/state') {
    const out = { me: pub(me), rev: db.meta.rev, users: db.users.map(pub), settings: db.settings };
    COLS.forEach((c) => { out[c] = db[c]; });
    return send(res, 200, out);
  }
  if (p === '/api/hq/settings' && m === 'PATCH') {
    if (!owner) return send(res, 403, { error: 'Only the owner can change settings' });
    Object.assign(db.settings, clean(body)); persist(); return send(res, 200, { settings: db.settings });
  }

  let mm = p.match(/^\/api\/hq\/users(?:\/([a-z0-9]+))?$/);
  if (mm) {
    if (!owner) return send(res, 403, { error: 'Only the owner can manage people' });
    if (m === 'POST' && !mm[1]) {
      const email = String(body.email || '').toLowerCase().trim();
      if (!email || !body.name) return send(res, 400, { error: 'Name and email are required' });
      if (db.users.some((u) => u.email === email)) return send(res, 400, { error: 'Someone already uses this email' });
      const pw = body.password && String(body.password).length >= 8 ? body.password : rand(5);
      const u = Object.assign({ id: 'u' + rand(4), name: String(body.name).slice(0, 80), email, phone: String(body.phone || ''), role: ['owner', 'sales', 'dev'].includes(body.role) ? body.role : 'sales', mustChange: true, createdAt: now() }, hashPw(pw));
      db.users.push(u); persist();
      return send(res, 200, { user: pub(u), password: pw });
    }
    const u = db.users.find((x) => x.id === mm[1]);
    if (!u) return send(res, 404, { error: 'Person not found' });
    if (m === 'DELETE') {
      if (u.id === me.id) return send(res, 400, { error: 'You can’t remove yourself' });
      db.users = db.users.filter((x) => x.id !== u.id);
      for (const k in db.sessions) if (db.sessions[k].uid === u.id) delete db.sessions[k];
      persist(); return send(res, 200, { ok: true });
    }
    if (m === 'PATCH') {
      if (body.name) u.name = String(body.name).slice(0, 80);
      if (body.phone !== undefined) u.phone = String(body.phone);
      if (body.role && u.id !== me.id && ['owner', 'sales', 'dev'].includes(body.role)) u.role = body.role;
      let pw;
      if (body.resetPassword) { pw = rand(5); Object.assign(u, hashPw(pw)); u.mustChange = true; }
      persist(); return send(res, 200, { user: pub(u), password: pw });
    }
  }

  mm = p.match(/^\/api\/hq\/(quotes|visits|demos|projects|tasks|inbox)(?:\/([a-z0-9]+))?$/);
  if (mm) {
    const col = mm[1], id = mm[2], list = db[col];
    if (m === 'POST' && !id) {
      const item = Object.assign(clean(body), { id: col.slice(0, 2) + rand(5), createdAt: now(), createdBy: me.id });
      if (col === 'quotes') {
        db.settings.quoteSeq = (db.settings.quoteSeq || 0) + 1;
        item.number = `${db.settings.quotePrefix || 'SOL'}-${new Date().getFullYear()}-${String(db.settings.quoteSeq).padStart(3, '0')}`;
      }
      list.unshift(item); persist();
      return send(res, 200, { item, rev: db.meta.rev });
    }
    const item = list.find((x) => x.id === id);
    if (!item) return send(res, 404, { error: 'Not found. Someone may have deleted it.' });
    if (m === 'PATCH') { Object.assign(item, clean(body), { updatedAt: now(), updatedBy: me.id }); persist(); return send(res, 200, { item, rev: db.meta.rev }); }
    if (m === 'DELETE') {
      if (!owner && item.createdBy !== me.id) return send(res, 403, { error: 'Only the owner or the person who added it can delete this' });
      db[col] = list.filter((x) => x.id !== id);
      if (col === 'projects') db.tasks = db.tasks.filter((t) => t.projectId !== id);
      persist(); return send(res, 200, { ok: true, rev: db.meta.rev });
    }
  }
  return send(res, 404, { error: 'Unknown request' });
}

/* ---------- static ---------- */
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml', '.json': 'application/json', '.ico': 'image/x-icon', '.txt': 'text/plain' };
const SKELETON = (lang) => `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0}img{max-width:100%}[hidden]{display:none!important}</style>\n`;
const htmlCache = new Map();
function sendFile(req, res, file, extra) {
  fs.stat(file, (e, st) => {
    if (e || !st.isFile()) return notFound(res);
    const ext = path.extname(file).toLowerCase();
    const h = Object.assign({ 'Content-Type': TYPES[ext] || 'application/octet-stream', 'X-Content-Type-Options': 'nosniff', 'Cache-Control': /\.(webp|jpg|png|svg)$/.test(ext) || file.includes('vendor') ? 'public, max-age=604800' : 'no-cache' }, extra || {});
    if (ext === '.html') {
      h['X-Frame-Options'] = 'SAMEORIGIN'; h['Referrer-Policy'] = 'same-origin';
      let html = htmlCache.get(file + st.mtimeMs);
      if (!html) { const raw = fs.readFileSync(file, 'utf8'); html = /^\s*<!doctype/i.test(raw) ? raw : SKELETON('en') + raw.replace(/(<\/style>)/, '$1\n</head><body>') + '\n</body></html>'; htmlCache.set(file + st.mtimeMs, html); }
      const buf = Buffer.from(html);
      if (/gzip/.test(req.headers['accept-encoding'] || '')) { h['Content-Encoding'] = 'gzip'; res.writeHead(200, h); return res.end(zlib.gzipSync(buf)); }
      h['Content-Length'] = buf.length; res.writeHead(200, h); return res.end(buf);
    }
    if (/\.(js|css|json|svg)$/.test(ext) && /gzip/.test(req.headers['accept-encoding'] || '')) { h['Content-Encoding'] = 'gzip'; res.writeHead(200, h); return fs.createReadStream(file).pipe(zlib.createGzip()).pipe(res); }
    h['Content-Length'] = st.size; res.writeHead(200, h); fs.createReadStream(file).pipe(res);
  });
}
function notFound(res) { res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' }); res.end('<!doctype html><meta charset=utf-8><meta name=viewport content="width=device-width"><title>Not found</title><body style="font-family:Arial,sans-serif;display:grid;place-items:center;height:100vh;margin:0;background:#EDE8DF;color:#121110"><div><h1 style="font-size:96px;margin:0;letter-spacing:-4px">404</h1><p><a href="/" style="color:#C42A12">Back to Solunera</a></p></div>'); }
function safeJoin(base, p) { const f = path.normalize(path.join(base, p)); return f.startsWith(base) ? f : null; }

const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://x');
  let p; try { p = decodeURIComponent(url.pathname); } catch (e) { return notFound(res); }
  if (p.startsWith('/api/')) return void api(req, res, url).catch((e) => { console.error(e); try { send(res, 500, { error: 'Server error' }); } catch (_) {} });
  if (req.method !== 'GET' && req.method !== 'HEAD') { res.writeHead(405); return res.end(); }
  if (p === '/' + HQ_PATH) { res.writeHead(301, { Location: '/' + HQ_PATH + '/' }); return res.end(); }
  if (p.startsWith('/' + HQ_PATH + '/')) {
    const rest = p.slice(HQ_PATH.length + 2) || 'index.html';
    if (rest === 'sample.js') { res.writeHead(200, { 'Content-Type': 'text/javascript; charset=utf-8' }); return res.end('/* examples are only loaded in preview */'); }
    const f = safeJoin(HQ_DIR, rest);
    if (f && fs.existsSync(f)) return sendFile(req, res, f, { 'X-Robots-Tag': 'noindex, nofollow' });
    const shared = safeJoin(PUBLIC, rest);
    return shared ? sendFile(req, res, shared) : notFound(res);
  }
  if (p === '/robots.txt') { res.writeHead(200, { 'Content-Type': 'text/plain' }); return res.end('User-agent: *\nAllow: /\n'); }
  const f = safeJoin(PUBLIC, p === '/' || p === '/ar' ? 'index.html' : p);
  if (!f) return notFound(res);
  sendFile(req, res, f);
});
init().then(() => server.listen(PORT, () => console.log(`\n  ● Solunera is running on http://localhost:${PORT}/\n`)))
  .catch((e) => { console.error('Could not load data:', e.message); process.exit(1); });
