/* Solunera — client API adapter.
 * On the real server it talks to /api/*. Opened as a preview (no server), it runs the same engine
 * in the browser with sample data so everything can be tried end to end. */
(function () {
  'use strict';
  var KEY = 'sol_preview_db_v1', TKEY = 'sol_preview_tok', AKEY = 'sol_preview_asset_';
  var mode = null, modeP = null, mem = null, memTok = null, memAssets = {};
  function rand(n) { var a = new Uint8Array(n); crypto.getRandomValues(a); return Array.prototype.map.call(a, function (x) { return ('0' + x.toString(16)).slice(-2); }).join(''); }
  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); return true; } catch (e) { return false; } }
  function lsDel(k) { try { localStorage.removeItem(k); } catch (e) {} }
  var pvVault = { ready: true, enc: function (v) { return 'pv:' + btoa(unescape(encodeURIComponent(v))); }, dec: function (s) { return decodeURIComponent(escape(atob(s.slice(3)))); } };

  function loadDb() {
    var raw = lsGet(KEY);
    if (raw) { try { return JSON.parse(raw); } catch (e) {} }
    if (mem) return mem;
    var db = SolEngine.freshDb(Date.now());
    SolEngine.seedPortfolio(db);
    SolEngine.ensureOwner(db, rand, 'kamel@solunera.co', 'solunera');
    db.users[0].mustChange = false;
    SolEngine.seedDemo(db, Date.now(), rand);
    db.settings.whatsapp = ''; db.settings.email = 'hello@solunera.co';
    // one sample vault entry
    var p = db.projects[0]; if (p) p.secrets = [{ id: 's1', label: 'Supabase secret key', kind: 'api_key', enc: pvVault.enc('sb_secret_demo_value_1234'), hint: '…1234', updatedAt: Date.now() }];
    db.seq.sec = 1;
    saveDb(db); return db;
  }
  function saveDb(db) { mem = db; lsSet(KEY, JSON.stringify(db)); }
  function detect() {
    if (mode) return Promise.resolve(mode);
    if (modeP) return modeP;
    var ctl = typeof AbortController !== 'undefined' ? new AbortController() : null, t = setTimeout(function () { ctl && ctl.abort(); }, 3500);
    modeP = fetch('/api/ping', { cache: 'no-store', signal: ctl ? ctl.signal : undefined }).then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) { mode = j && j.app === 'solunera' ? 'server' : 'preview'; return mode; }, function () { mode = 'preview'; return mode; })
      .then(function (m) { clearTimeout(t); return m; });
    return modeP;
  }
  function request(method, path, body) {
    return detect().then(function (m) {
      if (m === 'server') {
        return fetch(path, { method: method, credentials: 'same-origin', cache: 'no-store', headers: body ? { 'Content-Type': 'application/json' } : {}, body: body ? JSON.stringify(body) : undefined })
          .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { if (!r.ok) { var e = new Error(j.error || 'Connection problem'); e.status = r.status; throw e; } return j; }); },
            function () { var e = new Error('No connection — check the internet'); e.status = 0; throw e; });
      }
      var db = loadDb(), url = new URL(path, 'http://x'), query = {};
      url.searchParams.forEach(function (v, k) { query[k] = v; });
      var r = SolEngine.handle(db, { method: method, path: url.pathname, query: query, body: body ? JSON.parse(JSON.stringify(body)) : null, token: lsGet(TKEY) || memTok, now: Date.now(), rand: rand, mode: 'preview', vault: pvVault });
      if (r.asset) { var du = 'data:' + r.asset.mime + ';base64,' + r.asset.b64; memAssets[r.asset.id] = du; lsSet(AKEY + r.asset.id, du); }
      if (r.replaceDb) db = r.replaceDb;
      if (r.changed || (r.status < 300 && path.indexOf('/api/hq/state') === 0)) { if (r.changed) db.meta.rev = (db.meta.rev || 0) + 1; saveDb(db); }
      if (r.setToken) { memTok = r.setToken; lsSet(TKEY, r.setToken); }
      if (r.clearToken) { memTok = null; lsDel(TKEY); }
      return new Promise(function (res, rej) { setTimeout(function () { if (r.status >= 400) { var e = new Error(r.body.error); e.status = r.status; rej(e); } else res(r.body); }, 90 + Math.random() * 140); });
    });
  }
  window.SolAPI = {
    mode: detect,
    get: function (p) { return request('GET', p); },
    post: function (p, b) { return request('POST', p, b || {}); },
    patch: function (p, b) { return request('PATCH', p, b || {}); },
    put: function (p, b) { return request('PUT', p, b || {}); },
    del: function (p) { return request('DELETE', p); },
    // turn a stored image reference into a URL the page can show
    img: function (ref, base) {
      if (!ref) return '';
      if (ref.indexOf('asset:') === 0) { var id = ref.slice(6); return mode === 'server' ? '/asset/' + id : (memAssets[id] || lsGet(AKEY + id) || ''); }
      return (base || '') + ref;
    },
    resetPreview: function () { lsDel(KEY); lsDel(TKEY); mem = null; memTok = null; },
    onExternalChange: function (fn) { window.addEventListener('storage', function (e) { if (e.key === KEY) { mem = null; fn(); } }); }
  };
})();
