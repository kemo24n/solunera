/*!
 * Solunera HQ — core engine (shared by server.js and the offline preview)
 * Built by Solunera — Kamel Nassif
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.SolEngine = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  function sha256(ascii) {
    function rrot(v, a) { return (v >>> a) | (v << (32 - a)); }
    var mathPow = Math.pow, maxWord = mathPow(2, 32), result = '', words = [], i, j;
    var asciiBitLength = ascii.length * 8;
    var hash = sha256.h = sha256.h || [], k = sha256.k = sha256.k || [], primeCounter = k.length;
    var isComposite = {};
    for (var candidate = 2; primeCounter < 64; candidate++) {
      if (!isComposite[candidate]) {
        for (i = 0; i < 313; i += candidate) isComposite[i] = candidate;
        hash[primeCounter] = (mathPow(candidate, .5) * maxWord) | 0;
        k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
      }
    }
    hash = hash.slice(0, 8);
    ascii += '\x80';
    while (ascii.length % 64 - 56) ascii += '\x00';
    for (i = 0; i < ascii.length; i++) {
      j = ascii.charCodeAt(i);
      if (j >> 8) return null;
      words[i >> 2] |= j << ((3 - i) % 4) * 8;
    }
    words[words.length] = ((asciiBitLength / maxWord) | 0);
    words[words.length] = (asciiBitLength);
    for (j = 0; j < words.length;) {
      var w = words.slice(j, j += 16), oldHash = hash;
      hash = hash.slice(0, 8);
      for (i = 0; i < 64; i++) {
        var w15 = w[i - 15], w2 = w[i - 2], a = hash[0], e = hash[4];
        var temp1 = hash[7] + (rrot(e, 6) ^ rrot(e, 11) ^ rrot(e, 25)) + ((e & hash[5]) ^ ((~e) & hash[6])) + k[i] +
          (w[i] = (i < 16) ? w[i] : (w[i - 16] + (rrot(w15, 7) ^ rrot(w15, 18) ^ (w15 >>> 3)) + w[i - 7] + (rrot(w2, 17) ^ rrot(w2, 19) ^ (w2 >>> 10))) | 0);
        var temp2 = (rrot(a, 2) ^ rrot(a, 13) ^ rrot(a, 22)) + ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2]));
        hash = [(temp1 + temp2) | 0].concat(hash);
        hash[4] = (hash[4] + temp1) | 0;
      }
      for (i = 0; i < 8; i++) hash[i] = (hash[i] + oldHash[i]) | 0;
    }
    for (i = 0; i < 8; i++) for (j = 3; j + 1; j--) { var b = (hash[i] >> (j * 8)) & 255; result += ((b < 16) ? 0 : '') + b.toString(16); }
    return result;
  }
  function utf8(s) { return unescape(encodeURIComponent(String(s))); }
  function hashPassword(pw, salt) {
    var h = utf8(salt + ':' + pw);
    for (var i = 0; i < 3000; i++) h = sha256(h + salt);
    return h;
  }



  /* ---------------- dates ---------------- */
  var TZ = 3 * 3600e3; // Beirut / Damascus
  function todayStr(now) { return new Date(now + TZ).toISOString().slice(0, 10); }
  function isDate(s) { return typeof s === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(s) && !isNaN(Date.parse(s + 'T00:00:00Z')); }
  function addDays(s, n) { return new Date(Date.parse(s + 'T00:00:00Z') + n * 864e5).toISOString().slice(0, 10); }
  function daysBetween(a, b) { return Math.round((Date.parse(b + 'T00:00:00Z') - Date.parse(a + 'T00:00:00Z')) / 864e5); }
  function monthOf(s) { return s.slice(0, 7); }
  function addMonths(ym, n) { var y = +ym.slice(0, 4), m = +ym.slice(5, 7) - 1 + n; y += Math.floor(m / 12); m = ((m % 12) + 12) % 12; return y + '-' + ('0' + (m + 1)).slice(-2); }
  function r2(n) { return Math.round((+n || 0) * 100) / 100; }

  /* ---------------- constants ---------------- */
  var STAGES = ['new', 'contacted', 'interested', 'offer', 'negotiating', 'won', 'lost'];
  var OFFER_ST = ['draft', 'sent', 'accepted', 'rejected'];
  var ACT_TYPES = ['call', 'whatsapp', 'visit', 'email', 'meeting', 'note'];
  var PROJECT_ST = ['planning', 'building', 'live', 'maintenance', 'paused', 'ended'];

  function freshDb(now) {
    return {
      meta: { rev: 1, createdAt: now, version: 1 },
      settings: {
        company: 'Solunera', tagline_en: 'Software & AI agency', tagline_ar: 'وكالة برمجيات وذكاء اصطناعي',
        email: '', whatsapp: '', instagram: 'soluneragency', city_en: 'Beirut, Lebanon', city_ar: 'بيروت، لبنان',
        currency: 'USD', businessesServed: 20, founded: '',
        recipients: [],
        services: [
          { id: 'web', en: 'Websites', ar: 'مواقع إلكترونية', d_en: 'Fast, bilingual websites that turn visitors into customers.', d_ar: 'مواقع سريعة بالعربية والإنجليزية تحوّل الزوار إلى زبائن.', from: 0 },
          { id: 'sys', en: 'Booking & management systems', ar: 'أنظمة حجز وإدارة', d_en: 'Hotels, clinics, restaurants: bookings, staff panels, reports.', d_ar: 'فنادق وعيادات ومطاعم: حجوزات ولوحات موظفين وتقارير.', from: 0 },
          { id: 'order', en: 'Online ordering & e-commerce', ar: 'طلبات أونلاين ومتاجر', d_en: 'Menus, carts and delivery flows that send orders straight to WhatsApp.', d_ar: 'قوائم وسلات وتوصيل ترسل الطلب مباشرة إلى واتساب.', from: 0 },
          { id: 'ai', en: 'AI assistants & chatbots', ar: 'مساعدات ذكية وروبوتات محادثة', d_en: 'Assistants that answer guests, take bookings and speak their language.', d_ar: 'مساعدات تجيب الزبائن وتأخذ الحجوزات وتتكلم لغتهم.', from: 0 },
          { id: 'data', en: 'Data, dashboards & ML tools', ar: 'بيانات ولوحات وأدوات تعلّم آلي', d_en: 'Clean data, reports and tools that show what is working.', d_ar: 'بيانات مرتبة وتقارير وأدوات تظهر ما ينجح.', from: 0 },
          { id: 'social', en: 'Social content & ads', ar: 'محتوى سوشيال وإعلانات', d_en: 'Design, video and campaigns that bring people to your door.', d_ar: 'تصميم وفيديو وحملات تجلب الناس إليك.', from: 0 }
        ],
        templates: [
          { id: 't1', name: 'First message (AR)', text: 'مرحباً {business} 👋\nمعك {me} من Solunera. شفنا شغلكم وعجبنا كتير، وعنا فكرة ممكن تزيد حجوزاتكم وطلباتكم أونلاين.\nهي بعض أعمالنا: {link}\nمنقدر نحكي ٥ دقايق؟' },
          { id: 't2', name: 'First message (EN)', text: 'Hi {business} 👋\nThis is {me} from Solunera. We love what you do and have an idea to bring you more bookings and orders online.\nSome of our work: {link}\nCould we talk for 5 minutes?' },
          { id: 't3', name: 'Follow-up (AR)', text: 'مرحباً مجدداً {business}، حبيت أتابع معكم بخصوص العرض. في أي سؤال؟ جاهزين نبلّش بأي وقت.' }
        ]
      },
      users: [], sessions: {},
      leads: [], offers: [], activities: [],
      clients: [], projects: [], invoices: [],
      portfolio: [], notifications: [], log: [],
      seq: { lead: 0, offer: 0, act: 0, client: 0, project: 0, inv: 0, pf: 0, user: 0, note: 0, sec: 0 }
    };
  }

  function seedPortfolio(db) {
    var P = [
      { title_en: 'Alpatra Hotel & Rest.', title_ar: 'فندق ومطعم البتراء', client: 'Alpatra Hotel · Damascus', category: 'hospitality', year: '2026',
        summary_en: 'A bilingual-ready booking website and a full front-desk system for a 75-room hotel in central Damascus: live availability, online booking with WhatsApp alerts, room board, drag-and-drop booking chart, guest bills in USD and SYP, housekeeping and reports.',
        summary_ar: 'موقع حجز ونظام استقبال كامل لفندق من 75 غرفة في وسط دمشق: توفر مباشر، حجز أونلاين مع تنبيه واتساب، لوحة غرف، مخطط حجوزات بالسحب والإفلات، فواتير بالدولار والليرة، تدبير فندقي وتقارير.',
        tags: ['Node.js', 'Supabase', 'WhatsApp', 'Arabic RTL'], images: ['media/alpatra-1.webp', 'media/alpatra-2.webp', 'media/alpatra-3.webp'], mobile: 'media/alpatra-m.webp', featured: true },
      { title_en: 'Le Six Hotel & Resort', title_ar: 'Le Six Hotel & Resort', client: 'Le Six · Batroun', category: 'hospitality', year: '2026',
        summary_en: 'A custom management system that runs the front desk in real time: live dashboard, check-in in seconds, every stay and payment in one place.',
        summary_ar: 'نظام إدارة مخصص يدير الاستقبال لحظياً: لوحة مباشرة، تسجيل دخول بثوانٍ، وكل إقامة ودفعة بمكان واحد.',
        tags: ['Management system', 'Dashboard', 'Real-time'], images: ['media/lesix-1.webp', 'media/lesix-2.webp', 'media/lesix-3.webp', 'media/lesix-4.webp'], portrait: true, featured: true },
      { title_en: 'Amsterdam Potato', title_ar: 'أمستردام بطاطا', client: 'Amsterdam Potato · Aleppo', category: 'food', year: '2026',
        summary_en: 'An Arabic ordering experience for a fries shop built around its signature sauces: big type, the brand palette, and orders that land on WhatsApp.',
        summary_ar: 'تجربة طلب عربية لمحل بطاطا مبنية حول صلصاته المميزة: خطوط كبيرة، ألوان العلامة، وطلبات تصل إلى واتساب.',
        tags: ['Ordering', 'Arabic', 'Mobile-first'], images: ['media/potato-1.webp', 'media/potato-2.webp'], mobile: 'media/potato-m.webp', featured: true },
      { title_en: 'Yamen Barakat', title_ar: 'مجمع يامن بركات', client: 'Yamen Barakat · New Aleppo', category: 'food', year: '2026',
        summary_en: 'A fast Arabic ordering demo for a fast-food complex, using the restaurant’s own logo and colours.',
        summary_ar: 'نظام طلب عربي سريع لمجمع وجبات سريعة بشعار المطعم وألوانه.',
        tags: ['Ordering', 'Arabic'], images: ['media/yamen-1.webp'], mobile: 'media/yamen-m.webp' },
      { title_en: 'Layal — AI concierge', title_ar: 'ليال — مساعدة فندقية ذكية', client: 'Boutique hotel concept · Dubai', category: 'ai', year: '2026',
        summary_en: 'A multilingual AI concierge that answers guests in English, Arabic and French, takes reservations and fires a WhatsApp alert to the hotel.',
        summary_ar: 'مساعدة ذكية متعددة اللغات تجيب الضيوف بالعربية والإنجليزية والفرنسية وتأخذ الحجوزات وترسل تنبيه واتساب للفندق.',
        tags: ['AI', 'LLM', 'WhatsApp'], images: ['media/layal-1.webp'], mobile: 'media/layal-m.webp' }
    ];
    P.forEach(function (p, i) {
      db.seq.pf++;
      p.id = 'pf' + db.seq.pf; p.published = true; p.order = i; p.liveUrl = ''; p.featured = !!p.featured; p.results_en = ''; p.results_ar = '';
      db.portfolio.push(p);
    });
  }

  function ensureOwner(db, rand, email, pw) {
    if (db.users.some(function (u) { return u.role === 'owner'; })) return null;
    var salt = rand(16), p = pw || ('sol-' + rand(4));
    db.seq.user++;
    db.users.push({ id: 'u' + db.seq.user, name: 'Kamel Nassif', email: (email || 'owner@solunera').toLowerCase(), role: 'owner', salt: salt, hash: hashPassword(p, salt),
      active: true, mustChange: !pw, createdAt: Date.now(), refCode: 'kamel', commissionPct: 0, phone: '' });
    return p;
  }

  /* ---------------- helpers ---------------- */
  function err(status, msg) { var e = new Error(msg); e.status = status; e.expose = true; return e; }
  function need(c, msg) { if (!c) throw err(400, msg); }
  function clean(s, max) { return String(s == null ? '' : s).replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f<>]/g, '').trim().slice(0, max || 200); }
  function num(v, def) { var n = +v; return isFinite(n) ? n : (def || 0); }
  function phoneNorm(p) { var d = String(p || '').replace(/[^\d]/g, ''); if (d.indexOf('00') === 0) d = d.slice(2); return d; }
  function find(arr, id) { for (var i = 0; i < arr.length; i++) if (arr[i].id === id) return arr[i]; return null; }
  function nextId(db, k, p) { db.seq[k] = (db.seq[k] || 0) + 1; return p + db.seq[k]; }
  function log(db, ctx, action, ref, detail) { db.log.unshift({ at: ctx.now, uid: ctx.user ? ctx.user.id : null, who: ctx.user ? ctx.user.name : 'Website', action: action, ref: ref || null, detail: clean(detail, 200) }); if (db.log.length > 4000) db.log.length = 4000; }
  function notify(db, ctx, to, type, text, ref) {
    db.notifications.unshift({ id: nextId(db, 'note', 'n'), at: ctx.now, to: to, type: type, text: clean(text, 300), ref: ref || null, readBy: [] });
    if (db.notifications.length > 500) db.notifications.length = 500;
  }
  function owners(db) { return db.users.filter(function (u) { return u.role === 'owner' && u.active; }).map(function (u) { return u.id; }); }
  function waEffects(db, text) {
    return (db.settings.recipients || []).filter(function (r) { return r.active !== false && r.phone && r.apikey; })
      .map(function (r) { return { type: 'whatsapp', phone: phoneNorm(r.phone), apikey: r.apikey, text: text }; });
  }
  function pick(src, fields, maxes) {
    var o = {}; fields.forEach(function (f) { if (src[f] !== undefined) o[f] = clean(src[f], (maxes && maxes[f]) || 200); }); return o;
  }
  function tags(v) { return (Array.isArray(v) ? v : String(v || '').split(',')).map(function (t) { return clean(t, 40); }).filter(Boolean).slice(0, 20); }

  var LEAD_FIELDS = ['name', 'category', 'contactName', 'contactRole', 'phone', 'whatsapp', 'email', 'instagram', 'facebook', 'website', 'city', 'country', 'address', 'mapsUrl', 'source', 'notes', 'priority', 'lostReason', 'budget', 'needs'];
  var LEAD_MAX = { notes: 3000, address: 300, mapsUrl: 600, needs: 600 };

  /* ---------------- billing ---------------- */
  function syncBilling(db, now) {
    var t = todayStr(now), cur = monthOf(t), made = 0;
    db.projects.forEach(function (p) {
      var c = p.contract || {};
      if (p.status === 'ended' && !c.monthlyFee && !c.setupFee) return;
      if (num(c.setupFee) > 0 && !db.invoices.some(function (i) { return i.projectId === p.id && i.kind === 'setup'; })) {
        db.invoices.push({ id: nextId(db, 'inv', 'i'), clientId: p.clientId, projectId: p.id, kind: 'setup', period: '', label: 'Setup — ' + p.name, amount: r2(c.setupFee),
          dueDate: c.start || p.startDate || t, status: c.setupPaid ? 'paid' : 'unpaid', paidAt: c.setupPaid ? (c.start || t) : null, method: '', note: '', createdAt: now });
        made++;
      }
      if (num(c.monthlyFee) > 0 && isDate(c.monthlyStart)) {
        var m = monthOf(c.monthlyStart), last = cur;
        if (isDate(c.end) && monthOf(c.end) < last) last = monthOf(c.end);
        var day = Math.min(28, Math.max(1, parseInt(c.billingDay, 10) || +c.monthlyStart.slice(8, 10) || 1));
        var guard = 0;
        while (m <= last && guard++ < 240) {
          var exists = db.invoices.some(function (i) { return i.projectId === p.id && i.kind === 'monthly' && i.period === m; });
          if (!exists) {
            db.invoices.push({ id: nextId(db, 'inv', 'i'), clientId: p.clientId, projectId: p.id, kind: 'monthly', period: m, label: 'Monthly — ' + p.name + ' — ' + m, amount: r2(c.monthlyFee),
              dueDate: m + '-' + ('0' + day).slice(-2), status: 'unpaid', paidAt: null, method: '', note: '', createdAt: now });
            made++;
          }
          m = addMonths(m, 1);
        }
      }
    });
    return made;
  }
  function mrr(db, t) {
    return r2(db.projects.reduce(function (a, p) {
      var c = p.contract || {};
      if (num(c.monthlyFee) > 0 && isDate(c.monthlyStart) && c.monthlyStart <= t && (!isDate(c.end) || c.end >= t) && p.status !== 'ended') return a + num(c.monthlyFee);
      return a;
    }, 0));
  }

  /* ---------------- views ---------------- */
  function publicSite(db) {
    var s = db.settings;
    return {
      settings: { company: s.company, tagline_en: s.tagline_en, tagline_ar: s.tagline_ar, email: s.email, whatsapp: phoneNorm(s.whatsapp), instagram: s.instagram,
        city_en: s.city_en, city_ar: s.city_ar, businessesServed: s.businessesServed, services: s.services },
      portfolio: db.portfolio.filter(function (p) { return p.published; }).sort(function (a, b) { return a.order - b.order; })
        .map(function (p) { return { id: p.id, title_en: p.title_en, title_ar: p.title_ar, client: p.client, category: p.category, year: p.year, summary_en: p.summary_en, summary_ar: p.summary_ar,
          results_en: p.results_en, results_ar: p.results_ar, tags: p.tags, images: p.images, mobile: p.mobile, portrait: p.portrait, liveUrl: p.liveUrl, featured: p.featured }; }),
      team: db.users.filter(function (u) { return u.active; }).length
    };
  }
  function maskSecret(s) { return { id: s.id, label: s.label, kind: s.kind, hint: s.hint, updatedAt: s.updatedAt }; }
  function hqState(db, ctx) {
    var me = ctx.user, owner = me.role === 'owner';
    var base = {
      me: { id: me.id, name: me.name, email: me.email, role: me.role, mustChange: !!me.mustChange, refCode: me.refCode, commissionPct: me.commissionPct || 0, phone: me.phone },
      today: todayStr(ctx.now), meta: { rev: db.meta.rev, demo: !!db.meta.demo },
      settings: { company: db.settings.company, services: db.settings.services, templates: db.settings.templates, currency: db.settings.currency },
      team: (owner ? db.users : db.users.filter(function (u) { return u.id === me.id; })).map(function (u) { return owner ? { id: u.id, name: u.name, role: u.role, active: u.active } : { id: u.id, name: u.name, active: u.active }; }),
      notifications: db.notifications.filter(function (n) { return n.to === me.id || (n.to === 'owners' && owner) || n.to === 'all'; }).slice(0, 80)
    };
    if (!owner) {
      var mine = db.leads.filter(function (l) { return l.ownerId === me.id; }), ids = {};
      mine.forEach(function (l) { ids[l.id] = 1; });
      base.leads = mine;
      base.offers = db.offers.filter(function (o) { return ids[o.leadId]; });
      base.activities = db.activities.filter(function (a) { return ids[a.leadId]; });
      return base;
    }
    var full = JSON.parse(JSON.stringify(db));
    delete full.sessions;
    full.users = db.users.map(function (u) { return { id: u.id, name: u.name, email: u.email, role: u.role, active: u.active, phone: u.phone, commissionPct: u.commissionPct || 0, refCode: u.refCode, createdAt: u.createdAt, lastLogin: u.lastLogin }; });
    full.projects.forEach(function (p) { p.secrets = (p.secrets || []).map(maskSecret); });
    full.settings.recipients = (db.settings.recipients || []).map(function (r) { return { id: r.id, name: r.name, phone: r.phone, active: r.active, apikey: r.apikey ? '••••' + String(r.apikey).slice(-3) : '' }; });
    Object.keys(base).forEach(function (k) { if (k !== 'settings') full[k] = base[k]; });
    full.notifications = base.notifications;
    full.mrr = mrr(db, base.today);
    return full;
  }

  /* ---------------- sanitizers ---------------- */
  function applyLead(db, l, b, ctx) {
    var o = pick(b, LEAD_FIELDS, LEAD_MAX);
    Object.keys(o).forEach(function (k) { l[k] = o[k]; });
    if (b.stage !== undefined) { need(STAGES.indexOf(b.stage) >= 0, 'Unknown stage'); if (l.stage !== b.stage) { l.stageChangedAt = ctx.now; if (b.stage === 'won') l.wonAt = ctx.now; } l.stage = b.stage; }
    if (b.nextFollowUp !== undefined) { need(!b.nextFollowUp || isDate(b.nextFollowUp), 'Invalid follow-up date'); l.nextFollowUp = b.nextFollowUp || ''; }
    if (b.tags !== undefined) l.tags = tags(b.tags);
    if (b.rating !== undefined) l.rating = Math.max(0, Math.min(5, num(b.rating)));
    if (b.value !== undefined) l.value = Math.max(0, r2(b.value));
    if (l.phone) l.phone = clean(l.phone, 40);
    l.updatedAt = ctx.now;
  }
  function applyOffer(o, b) {
    var p = pick(b, ['title', 'notes', 'validUntil', 'currency'], { notes: 2000 });
    Object.keys(p).forEach(function (k) { o[k] = p[k]; });
    if (b.services !== undefined) o.services = tags(b.services);
    if (b.setupPrice !== undefined) o.setupPrice = Math.max(0, r2(b.setupPrice));
    if (b.monthlyPrice !== undefined) o.monthlyPrice = Math.max(0, r2(b.monthlyPrice));
    if (b.monthlyAfterMonths !== undefined) o.monthlyAfterMonths = Math.max(0, parseInt(b.monthlyAfterMonths, 10) || 0);
    if (b.discountPct !== undefined) o.discountPct = Math.max(0, Math.min(100, num(b.discountPct)));
  }
  function applyClient(c, b) {
    var p = pick(b, ['name', 'category', 'contactName', 'phone', 'whatsapp', 'email', 'instagram', 'website', 'city', 'country', 'address', 'notes', 'taxId'], { notes: 3000, address: 300 });
    Object.keys(p).forEach(function (k) { c[k] = p[k]; });
    if (b.status !== undefined) { need(['active', 'paused', 'ended', 'prospect'].indexOf(b.status) >= 0, 'Unknown status'); c.status = b.status; }
    ['startedAt', 'endedAt'].forEach(function (k) { if (b[k] !== undefined) { need(!b[k] || isDate(b[k]), 'Invalid date'); c[k] = b[k] || ''; } });
    if (b.accountManagerId !== undefined) c.accountManagerId = b.accountManagerId || null;
  }
  function applyProject(p, b) {
    var f = pick(b, ['name', 'type', 'liveUrl', 'adminUrl', 'repoUrl', 'notes', 'description'], { notes: 4000, description: 2000, liveUrl: 400, adminUrl: 400, repoUrl: 400 });
    Object.keys(f).forEach(function (k) { p[k] = f[k]; });
    if (b.status !== undefined) { need(PROJECT_ST.indexOf(b.status) >= 0, 'Unknown status'); p.status = b.status; }
    ['startDate', 'deliveryDate', 'endDate'].forEach(function (k) { if (b[k] !== undefined) { need(!b[k] || isDate(b[k]), 'Invalid date'); p[k] = b[k] || ''; } });
    if (b.stack !== undefined) p.stack = tags(b.stack);
    ['hosting', 'database', 'domain', 'contract'].forEach(function (grp) {
      if (!b[grp]) return; p[grp] = p[grp] || {};
      var g = b[grp], t = p[grp];
      Object.keys(g).forEach(function (k) {
        var v = g[k];
        if (/Date$|^start$|^end$|^monthlyStart$|renewal/i.test(k)) { need(!v || isDate(v), 'Invalid date in ' + grp); t[k] = v || ''; }
        else if (/Fee$|Cost$|cost$|price$/i.test(k)) t[k] = Math.max(0, r2(v));
        else if (k === 'billingDay') t[k] = Math.max(1, Math.min(28, parseInt(v, 10) || 1));
        else if (k === 'setupPaid' || k === 'autoRenew') t[k] = !!v;
        else t[k] = clean(v, 300);
      });
    });
  }
  function applyPortfolio(p, b) {
    var f = pick(b, ['title_en', 'title_ar', 'client', 'category', 'year', 'summary_en', 'summary_ar', 'results_en', 'results_ar', 'liveUrl', 'mobile'], { summary_en: 1500, summary_ar: 1500, results_en: 800, results_ar: 800, liveUrl: 400, mobile: 200 });
    Object.keys(f).forEach(function (k) { p[k] = f[k]; });
    if (b.tags !== undefined) p.tags = tags(b.tags);
    if (b.images !== undefined) p.images = (Array.isArray(b.images) ? b.images : []).map(function (s) { return String(s).slice(0, 200); }).filter(function (s) { return /^(media\/|asset:)/.test(s); }).slice(0, 12);
    ['published', 'featured', 'portrait'].forEach(function (k) { if (b[k] !== undefined) p[k] = !!b[k]; });
    if (b.order !== undefined) p.order = num(b.order);
    if (b.projectId !== undefined) p.projectId = b.projectId || null;
  }

  /* ---------------- router ---------------- */
  function handle(db, req) {
    var ctx = { now: req.now || Date.now(), rand: req.rand, user: null, vault: req.vault };
    var M = req.method, path = req.path.replace(/\/+$/, ''), q = req.query || {}, body = req.body || {};
    var res = { status: 200, body: null, changed: false, effects: [] };
    try {
      var m;
      if (path === '/api/ping') { res.body = { ok: true, app: 'solunera', mode: req.mode || 'server' }; return res; }
      if (M === 'GET' && path === '/api/public/site') { res.body = publicSite(db); return res; }
      if (M === 'POST' && path === '/api/public/inquiry') {
        need(clean(body.name).length >= 2, 'Please write your name');
        need(clean(body.business).length >= 2, 'Please write your business name');
        need(phoneNorm(body.phone).length >= 7 || /@/.test(body.email || ''), 'Add a phone number or email so we can reach you');
        if (body.hp) { res.body = { ok: true }; return res; } // honeypot
        var ref = clean(body.ref, 40).toLowerCase(), refUser = ref ? db.users.filter(function (u) { return u.refCode === ref && u.active; })[0] : null;
        var lead = { id: nextId(db, 'lead', 'L'), ownerId: refUser && refUser.role === 'employee' ? refUser.id : null, stage: 'new', source: 'website', createdAt: ctx.now, createdBy: null, tags: ['inbound'] };
        applyLead(db, lead, { name: body.business, category: body.category, contactName: body.name, phone: body.phone, whatsapp: body.phone, email: body.email, city: body.city,
          needs: tags(body.services).join(', '), budget: body.budget, notes: clean(body.message, 2000) }, ctx);
        db.leads.push(lead);
        var txt = 'New enquiry: ' + lead.name + ' — ' + (lead.contactName || '') + ' ' + (lead.phone || lead.email || '') + (lead.needs ? ' — ' + lead.needs : '');
        notify(db, ctx, 'owners', 'inquiry', txt, lead.id);
        if (lead.ownerId) notify(db, ctx, lead.ownerId, 'inquiry', txt, lead.id);
        log(db, ctx, 'lead.inbound', lead.id, lead.name);
        res.effects = waEffects(db, '🟣 Solunera — new project enquiry\n' + lead.name + (lead.category ? ' (' + lead.category + ')' : '') + '\n' + (lead.contactName || '') + ' · ' + (lead.phone || '') + ' ' + (lead.email || '') + '\nNeeds: ' + (lead.needs || '—') + '\nBudget: ' + (lead.budget || '—') + (lead.notes ? '\n' + lead.notes.slice(0, 300) : '') + (refUser ? '\nVia: ' + refUser.name : ''));
        res.changed = true; res.status = 201; res.body = { ok: true }; return res;
      }

      /* auth */
      if (M === 'POST' && path === '/api/auth/login') {
        var em = String(body.email || '').toLowerCase().trim();
        var u = db.users.filter(function (x) { return x.email === em; })[0];
        if (!u || !u.active || hashPassword(String(body.password || ''), u.salt) !== u.hash) throw err(401, 'Wrong email or password');
        Object.keys(db.sessions).forEach(function (k) { if (db.sessions[k].exp < ctx.now) delete db.sessions[k]; });
        var tok = ctx.rand(24); db.sessions[tok] = { uid: u.id, exp: ctx.now + 14 * 864e5 };
        u.lastLogin = ctx.now; ctx.user = u; log(db, ctx, 'auth.login', u.id);
        res.changed = true; res.setToken = tok; res.body = { ok: true, role: u.role }; return res;
      }
      var sess = req.token && db.sessions[req.token];
      if (sess && sess.exp > ctx.now) { ctx.user = find(db.users, sess.uid); if (ctx.user && !ctx.user.active) ctx.user = null; }
      if (M === 'POST' && path === '/api/auth/logout') { if (req.token) delete db.sessions[req.token]; res.changed = true; res.clearToken = true; res.body = { ok: true }; return res; }
      if (path.indexOf('/api/hq/') !== 0 && path !== '/api/auth/password') throw err(404, 'Not found');
      if (!ctx.user) throw err(401, 'Please sign in again');
      var me = ctx.user, isOwner = me.role === 'owner';
      function own() { if (!isOwner) throw err(403, 'Only the owner can do this'); }
      function leadFor(id) { var l = find(db.leads, id); need(l, 'Business not found'); if (!isOwner && l.ownerId !== me.id) throw err(403, 'This business belongs to another teammate'); return l; }

      if (M === 'POST' && path === '/api/auth/password') {
        need(hashPassword(String(body.old || ''), me.salt) === me.hash, 'Current password is wrong');
        need(String(body.new || '').length >= 8, 'Use at least 8 characters');
        me.salt = ctx.rand(16); me.hash = hashPassword(String(body.new), me.salt); me.mustChange = false;
        log(db, ctx, 'auth.password', me.id); res.changed = true; res.body = { ok: true }; return res;
      }
      if (M === 'GET' && path === '/api/hq/rev') { res.body = { rev: db.meta.rev }; return res; }
      if (M === 'GET' && path === '/api/hq/state') {
        if (isOwner && syncBilling(db, ctx.now)) { res.changed = true; db.meta.rev++; }
        res.body = hqState(db, ctx); return res;
      }

      /* leads */
      if (M === 'POST' && path === '/api/hq/leads') {
        need(clean(body.name).length >= 2, 'Write the business name');
        var ph = phoneNorm(body.phone);
        if (ph.length >= 7) {
          var dup = db.leads.filter(function (l) { return phoneNorm(l.phone) === ph || phoneNorm(l.whatsapp) === ph; })[0];
          if (dup && !body.force) { var dOwner = find(db.users, dup.ownerId); throw err(409, 'This number already exists: ' + dup.name + (dOwner ? ' (' + dOwner.name + ')' : ' (unassigned)')); }
        }
        var nl = { id: nextId(db, 'lead', 'L'), ownerId: isOwner ? (body.ownerId || me.id) : me.id, stage: 'new', createdAt: ctx.now, createdBy: me.id, tags: [] };
        applyLead(db, nl, body, ctx);
        if (!nl.source) nl.source = 'field';
        db.leads.push(nl); log(db, ctx, 'lead.create', nl.id, nl.name);
        if (!isOwner) notify(db, ctx, 'owners', 'lead', me.name + ' added ' + nl.name, nl.id);
        res.changed = true; res.status = 201; res.body = nl; return res;
      }
      if ((m = path.match(/^\/api\/hq\/leads\/([\w-]+)$/))) {
        var L1 = leadFor(m[1]);
        if (M === 'PATCH') {
          var before = L1.stage;
          if (body.ownerId !== undefined) { own(); L1.ownerId = body.ownerId || null; if (body.ownerId) notify(db, ctx, body.ownerId, 'assign', 'New business assigned to you: ' + L1.name, L1.id); }
          applyLead(db, L1, body, ctx);
          if (before !== L1.stage) {
            db.activities.push({ id: nextId(db, 'act', 'a'), leadId: L1.id, byId: me.id, type: 'stage', text: before + ' → ' + L1.stage, at: ctx.now });
            if (L1.stage === 'won' && !isOwner) notify(db, ctx, 'owners', 'won', '🎉 ' + me.name + ' won ' + L1.name, L1.id);
          }
          log(db, ctx, 'lead.update', L1.id, L1.name); res.changed = true; res.body = L1; return res;
        }
        if (M === 'DELETE') {
          own();
          db.leads = db.leads.filter(function (l) { return l.id !== L1.id; });
          db.offers = db.offers.filter(function (o) { return o.leadId !== L1.id; });
          db.activities = db.activities.filter(function (a) { return a.leadId !== L1.id; });
          log(db, ctx, 'lead.delete', null, L1.name); res.changed = true; res.body = { ok: true }; return res;
        }
      }
      if (M === 'POST' && path === '/api/hq/activities') {
        var L2 = leadFor(body.leadId);
        need(ACT_TYPES.indexOf(body.type) >= 0, 'Pick an activity type');
        need(clean(body.text).length >= 1, 'Write what happened');
        var act = { id: nextId(db, 'act', 'a'), leadId: L2.id, byId: me.id, type: body.type, text: clean(body.text, 2000), at: ctx.now };
        db.activities.push(act); L2.lastContactAt = ctx.now; L2.updatedAt = ctx.now;
        if (L2.stage === 'new' && body.type !== 'note') L2.stage = 'contacted';
        if (body.nextFollowUp !== undefined) { need(!body.nextFollowUp || isDate(body.nextFollowUp), 'Invalid date'); L2.nextFollowUp = body.nextFollowUp || ''; }
        res.changed = true; res.status = 201; res.body = act; return res;
      }
      if ((m = path.match(/^\/api\/hq\/activities\/([\w-]+)$/)) && M === 'DELETE') {
        var a1 = find(db.activities, m[1]); need(a1, 'Not found'); if (!isOwner && a1.byId !== me.id) throw err(403, 'Not allowed');
        db.activities = db.activities.filter(function (a) { return a.id !== a1.id; }); res.changed = true; res.body = { ok: true }; return res;
      }

      /* offers */
      if (M === 'POST' && path === '/api/hq/offers') {
        var L3 = leadFor(body.leadId);
        var of = { id: nextId(db, 'offer', 'o'), leadId: L3.id, byId: me.id, status: 'draft', createdAt: ctx.now, services: [], setupPrice: 0, monthlyPrice: 0, monthlyAfterMonths: 0, currency: 'USD' };
        applyOffer(of, body);
        need(of.title || of.services.length, 'Add a title or at least one service');
        if (body.status === 'sent') { of.status = 'sent'; of.sentAt = ctx.now; }
        db.offers.push(of);
        if (['new', 'contacted', 'interested'].indexOf(L3.stage) >= 0 && of.status === 'sent') { L3.stage = 'offer'; L3.stageChangedAt = ctx.now; }
        log(db, ctx, 'offer.create', L3.id, of.title); res.changed = true; res.status = 201; res.body = of; return res;
      }
      if ((m = path.match(/^\/api\/hq\/offers\/([\w-]+)$/))) {
        var o1 = find(db.offers, m[1]); need(o1, 'Offer not found'); var L4 = leadFor(o1.leadId);
        if (M === 'PATCH') {
          applyOffer(o1, body);
          if (body.status !== undefined && body.status !== o1.status) {
            need(OFFER_ST.indexOf(body.status) >= 0, 'Unknown status');
            o1.status = body.status;
            if (body.status === 'sent') { o1.sentAt = ctx.now; if (['new', 'contacted', 'interested'].indexOf(L4.stage) >= 0) L4.stage = 'offer'; }
            if (body.status === 'accepted') { o1.respondedAt = ctx.now; L4.stage = 'won'; L4.wonAt = ctx.now; L4.value = r2((o1.setupPrice || 0)); notify(db, ctx, 'owners', 'won', '🎉 Offer accepted: ' + L4.name + ' — $' + (o1.setupPrice || 0) + (o1.monthlyPrice ? ' + $' + o1.monthlyPrice + '/mo' : '') + ' (' + me.name + ')', L4.id); }
            if (body.status === 'rejected') { o1.respondedAt = ctx.now; if (!db.offers.some(function (x) { return x.leadId === L4.id && x.id !== o1.id && (x.status === 'sent' || x.status === 'accepted'); })) L4.stage = 'negotiating'; }
            db.activities.push({ id: nextId(db, 'act', 'a'), leadId: L4.id, byId: me.id, type: 'offer', text: (o1.title || 'Offer') + ': ' + o1.status, at: ctx.now });
          }
          log(db, ctx, 'offer.update', L4.id, (o1.title || '') + ' ' + o1.status); res.changed = true; res.body = o1; return res;
        }
        if (M === 'DELETE') { if (!isOwner && o1.byId !== me.id) throw err(403, 'Not allowed'); db.offers = db.offers.filter(function (x) { return x.id !== o1.id; }); res.changed = true; res.body = { ok: true }; return res; }
      }

      /* ===== owner-only below ===== */
      own();
      if ((m = path.match(/^\/api\/hq\/leads\/([\w-]+)\/convert$/)) && M === 'POST') {
        var L5 = find(db.leads, m[1]); need(L5, 'Business not found');
        need(!L5.clientId || !find(db.clients, L5.clientId), 'Already a client');
        var acc = db.offers.filter(function (o) { return o.leadId === L5.id && o.status === 'accepted'; }).pop();
        var t0 = todayStr(ctx.now);
        var cl = { id: nextId(db, 'client', 'c'), leadId: L5.id, status: 'active', startedAt: body.startedAt || t0, createdAt: ctx.now, accountManagerId: L5.ownerId || me.id };
        applyClient(cl, { name: L5.name, category: L5.category, contactName: L5.contactName, phone: L5.phone, whatsapp: L5.whatsapp, email: L5.email, instagram: L5.instagram, website: L5.website, city: L5.city, country: L5.country, address: L5.address, notes: L5.notes });
        db.clients.push(cl);
        L5.clientId = cl.id; L5.stage = 'won'; L5.wonAt = L5.wonAt || ctx.now;
        var pr = { id: nextId(db, 'project', 'p'), clientId: cl.id, status: 'planning', startDate: body.startedAt || t0, stack: [], secrets: [], hosting: {}, database: {}, domain: {}, contract: {}, createdAt: ctx.now };
        applyProject(pr, { name: body.projectName || (acc && acc.title) || (L5.name + ' — project'), contract: { start: body.startedAt || t0, setupFee: acc ? acc.setupPrice : 0, monthlyFee: acc ? acc.monthlyPrice : 0,
          monthlyStart: acc && acc.monthlyPrice ? addMonths(monthOf(body.startedAt || t0), acc.monthlyAfterMonths || 1) + '-' + ('0' + Math.min(28, +(body.startedAt || t0).slice(8, 10))).slice(-2) : '', billingDay: +(body.startedAt || t0).slice(8, 10) > 28 ? 28 : +(body.startedAt || t0).slice(8, 10) } });
        if (acc && acc.services) pr.services = acc.services;
        db.projects.push(pr);
        log(db, ctx, 'client.create', cl.id, cl.name); res.changed = true; res.status = 201; res.body = { client: cl, project: pr }; return res;
      }
      if (M === 'POST' && path === '/api/hq/clients') {
        need(clean(body.name).length >= 2, 'Write the client name');
        var c2 = { id: nextId(db, 'client', 'c'), status: 'active', startedAt: todayStr(ctx.now), createdAt: ctx.now, accountManagerId: me.id };
        applyClient(c2, body); db.clients.push(c2); log(db, ctx, 'client.create', c2.id, c2.name); res.changed = true; res.status = 201; res.body = c2; return res;
      }
      if ((m = path.match(/^\/api\/hq\/clients\/([\w-]+)$/))) {
        var c3 = find(db.clients, m[1]); need(c3, 'Client not found');
        if (M === 'PATCH') { applyClient(c3, body); log(db, ctx, 'client.update', c3.id, c3.name); res.changed = true; res.body = c3; return res; }
        if (M === 'DELETE') {
          need(!db.projects.some(function (p) { return p.clientId === c3.id; }), 'Delete this client\'s projects first');
          db.clients = db.clients.filter(function (c) { return c.id !== c3.id; }); db.invoices = db.invoices.filter(function (i) { return i.clientId !== c3.id; });
          log(db, ctx, 'client.delete', null, c3.name); res.changed = true; res.body = { ok: true }; return res;
        }
      }
      if (M === 'POST' && path === '/api/hq/projects') {
        need(find(db.clients, body.clientId), 'Choose a client'); need(clean(body.name).length >= 2, 'Write the project name');
        var p2 = { id: nextId(db, 'project', 'p'), clientId: body.clientId, status: 'planning', startDate: todayStr(ctx.now), stack: [], secrets: [], hosting: {}, database: {}, domain: {}, contract: {}, createdAt: ctx.now };
        applyProject(p2, body); db.projects.push(p2); syncBilling(db, ctx.now);
        log(db, ctx, 'project.create', p2.id, p2.name); res.changed = true; res.status = 201; res.body = p2; return res;
      }
      if ((m = path.match(/^\/api\/hq\/projects\/([\w-]+)$/))) {
        var p3 = find(db.projects, m[1]); need(p3, 'Project not found');
        if (M === 'PATCH') {
          var oldC = JSON.stringify(p3.contract || {});
          applyProject(p3, body);
          if (JSON.stringify(p3.contract || {}) !== oldC) {
            // refresh unpaid future invoices with new amounts
            var t1 = todayStr(ctx.now);
            db.invoices.forEach(function (i) {
              if (i.projectId !== p3.id || i.status !== 'unpaid') return;
              if (i.kind === 'monthly') { if (!num(p3.contract.monthlyFee) || (p3.contract.monthlyStart && i.period < monthOf(p3.contract.monthlyStart)) || (isDate(p3.contract.end) && i.period > monthOf(p3.contract.end))) i.status = 'void'; else i.amount = r2(p3.contract.monthlyFee); }
              if (i.kind === 'setup') { if (!num(p3.contract.setupFee)) i.status = 'void'; else i.amount = r2(p3.contract.setupFee); }
            });
            syncBilling(db, ctx.now);
          }
          log(db, ctx, 'project.update', p3.id, p3.name); res.changed = true; res.body = p3; return res;
        }
        if (M === 'DELETE') {
          db.projects = db.projects.filter(function (p) { return p.id !== p3.id; });
          db.invoices = db.invoices.filter(function (i) { return i.projectId !== p3.id || i.status === 'paid'; });
          log(db, ctx, 'project.delete', null, p3.name); res.changed = true; res.body = { ok: true }; return res;
        }
      }
      /* vault */
      if ((m = path.match(/^\/api\/hq\/projects\/([\w-]+)\/secrets$/)) && M === 'POST') {
        var p4 = find(db.projects, m[1]); need(p4, 'Project not found');
        need(ctx.vault && ctx.vault.ready, 'The vault is locked: set VAULT_KEY on the server first');
        need(clean(body.label).length >= 1, 'Name this secret'); need(String(body.value || '').length >= 1, 'Paste the value');
        var val = String(body.value).slice(0, 8000);
        var sec = { id: nextId(db, 'sec', 's'), label: clean(body.label, 80), kind: clean(body.kind, 30) || 'api_key', enc: ctx.vault.enc(val), hint: val.length > 8 ? '…' + val.slice(-4) : '••••', updatedAt: ctx.now };
        p4.secrets = p4.secrets || []; p4.secrets.push(sec);
        log(db, ctx, 'secret.add', p4.id, sec.label); res.changed = true; res.status = 201; res.body = maskSecret(sec); return res;
      }
      if ((m = path.match(/^\/api\/hq\/projects\/([\w-]+)\/secrets\/([\w-]+)(\/reveal)?$/))) {
        var p5 = find(db.projects, m[1]); need(p5, 'Project not found');
        var s5 = find(p5.secrets || [], m[2]); need(s5, 'Secret not found');
        if (m[3] && M === 'POST') {
          need(ctx.vault && ctx.vault.ready, 'The vault is locked: set VAULT_KEY on the server');
          var plain; try { plain = ctx.vault.dec(s5.enc); } catch (e) { throw err(422, 'Cannot decrypt: VAULT_KEY changed since this secret was saved'); }
          log(db, ctx, 'secret.reveal', p5.id, s5.label); res.changed = true; res.body = { value: plain }; return res;
        }
        if (!m[3] && M === 'DELETE') { p5.secrets = p5.secrets.filter(function (s) { return s.id !== s5.id; }); log(db, ctx, 'secret.delete', p5.id, s5.label); res.changed = true; res.body = { ok: true }; return res; }
      }
      /* invoices */
      if (M === 'POST' && path === '/api/hq/invoices') {
        var pj = body.projectId ? find(db.projects, body.projectId) : null, cid = pj ? pj.clientId : body.clientId;
        need(find(db.clients, cid), 'Choose a client'); need(num(body.amount) > 0, 'Amount must be more than 0'); need(isDate(body.dueDate), 'Pick a due date');
        var inv = { id: nextId(db, 'inv', 'i'), clientId: cid, projectId: pj ? pj.id : null, kind: 'extra', period: '', label: clean(body.label, 120) || 'Extra work', amount: r2(body.amount), dueDate: body.dueDate,
          status: body.paid ? 'paid' : 'unpaid', paidAt: body.paid ? todayStr(ctx.now) : null, method: clean(body.method, 30), note: clean(body.note, 300), createdAt: ctx.now };
        db.invoices.push(inv); log(db, ctx, 'invoice.create', inv.id, inv.label + ' ' + inv.amount); res.changed = true; res.status = 201; res.body = inv; return res;
      }
      if ((m = path.match(/^\/api\/hq\/invoices\/([\w-]+)$/))) {
        var i1 = find(db.invoices, m[1]); need(i1, 'Invoice not found');
        if (M === 'PATCH') {
          if (body.status !== undefined) {
            need(['unpaid', 'paid', 'void'].indexOf(body.status) >= 0, 'Unknown status');
            i1.status = body.status; i1.paidAt = body.status === 'paid' ? (isDate(body.paidAt) ? body.paidAt : todayStr(ctx.now)) : null;
            if (body.status === 'paid' && i1.kind === 'setup') { var pp = find(db.projects, i1.projectId); if (pp) { pp.contract = pp.contract || {}; pp.contract.setupPaid = true; } }
          }
          if (body.amount !== undefined) { need(num(body.amount) > 0, 'Amount must be more than 0'); i1.amount = r2(body.amount); }
          ['method', 'note', 'label'].forEach(function (k) { if (body[k] !== undefined) i1[k] = clean(body[k], 300); });
          if (body.dueDate !== undefined) { need(isDate(body.dueDate), 'Invalid date'); i1.dueDate = body.dueDate; }
          log(db, ctx, 'invoice.update', i1.id, i1.label + ' → ' + i1.status); res.changed = true; res.body = i1; return res;
        }
        if (M === 'DELETE') { need(i1.kind === 'extra', 'Automatic invoices can be voided, not deleted'); db.invoices = db.invoices.filter(function (i) { return i.id !== i1.id; }); res.changed = true; res.body = { ok: true }; return res; }
      }
      /* portfolio */
      if (M === 'POST' && path === '/api/hq/portfolio') {
        var pf = { id: nextId(db, 'pf', 'pf'), published: false, featured: false, order: db.portfolio.length, images: [], tags: [], createdAt: ctx.now };
        applyPortfolio(pf, body); need(pf.title_en || pf.title_ar, 'Write a title');
        db.portfolio.push(pf); log(db, ctx, 'portfolio.create', pf.id, pf.title_en); res.changed = true; res.status = 201; res.body = pf; return res;
      }
      if ((m = path.match(/^\/api\/hq\/portfolio\/([\w-]+)$/))) {
        var pf2 = find(db.portfolio, m[1]); need(pf2, 'Not found');
        if (M === 'PATCH') { applyPortfolio(pf2, body); log(db, ctx, 'portfolio.update', pf2.id, pf2.title_en); res.changed = true; res.body = pf2; return res; }
        if (M === 'DELETE') { db.portfolio = db.portfolio.filter(function (p) { return p.id !== pf2.id; }); res.dropAssets = (pf2.images || []).concat([pf2.mobile || '']).filter(function (s) { return /^asset:/.test(s); }); res.changed = true; res.body = { ok: true }; return res; }
      }
      if (M === 'POST' && path === '/api/hq/assets') {
        var du = String(body.dataUrl || ''), mm = du.match(/^data:(image\/(?:webp|jpeg|png));base64,([A-Za-z0-9+/=]+)$/);
        need(mm, 'Upload a JPG, PNG or WebP image'); need(mm[2].length < 4.5e6, 'Image too large (max ~3 MB)');
        var aid = ctx.rand(8); res.asset = { id: aid, mime: mm[1], b64: mm[2] }; res.body = { ref: 'asset:' + aid }; return res;
      }
      /* team */
      if (M === 'POST' && path === '/api/hq/users') {
        var email = String(body.email || '').toLowerCase().trim();
        need(/^[^@\s]+@[^@\s]+$/.test(email), 'Write a valid email'); need(!db.users.some(function (x) { return x.email === email; }), 'This email already has an account');
        need(String(body.password || '').length >= 8, 'Temporary password: at least 8 characters'); need(clean(body.name).length >= 2, 'Write the name');
        var code = clean(body.refCode || body.name.split(' ')[0], 30).toLowerCase().replace(/[^a-z0-9]/g, '') || ctx.rand(3);
        while (db.users.some(function (x) { return x.refCode === code; })) code += ctx.rand(1);
        var salt = ctx.rand(16);
        var nu = { id: nextId(db, 'user', 'u'), name: clean(body.name, 60), email: email, role: body.role === 'owner' ? 'owner' : 'employee', salt: salt, hash: hashPassword(String(body.password), salt),
          active: true, mustChange: true, createdAt: ctx.now, refCode: code, commissionPct: Math.max(0, Math.min(100, num(body.commissionPct))), phone: clean(body.phone, 40) };
        db.users.push(nu); log(db, ctx, 'user.create', nu.id, nu.name); res.changed = true; res.status = 201; res.body = { id: nu.id }; return res;
      }
      if ((m = path.match(/^\/api\/hq\/users\/([\w-]+)$/)) && M === 'PATCH') {
        var u2 = find(db.users, m[1]); need(u2, 'User not found');
        if (body.name) u2.name = clean(body.name, 60);
        if (body.phone !== undefined) u2.phone = clean(body.phone, 40);
        if (body.commissionPct !== undefined) u2.commissionPct = Math.max(0, Math.min(100, num(body.commissionPct)));
        if (body.active !== undefined) { need(u2.id !== me.id, 'You cannot deactivate yourself'); u2.active = !!body.active; if (!u2.active) Object.keys(db.sessions).forEach(function (k) { if (db.sessions[k].uid === u2.id) delete db.sessions[k]; }); }
        if (body.password) { need(String(body.password).length >= 8, 'At least 8 characters'); u2.salt = ctx.rand(16); u2.hash = hashPassword(String(body.password), u2.salt); u2.mustChange = true; }
        if (body.email) { var e2 = String(body.email).toLowerCase().trim(); need(!db.users.some(function (x) { return x.email === e2 && x.id !== u2.id; }), 'Email in use'); u2.email = e2; }
        log(db, ctx, 'user.update', u2.id, u2.name); res.changed = true; res.body = { ok: true }; return res;
      }
      if ((m = path.match(/^\/api\/hq\/users\/([\w-]+)\/transfer$/)) && M === 'POST') {
        var from = find(db.users, m[1]), to = find(db.users, body.to); need(from && to, 'Pick both teammates');
        var n = 0; db.leads.forEach(function (l) { if (l.ownerId === from.id) { l.ownerId = to.id; n++; } });
        log(db, ctx, 'lead.transfer', to.id, from.name + ' → ' + to.name + ' (' + n + ')'); res.changed = true; res.body = { moved: n }; return res;
      }
      /* settings */
      if (M === 'PUT' && path === '/api/hq/settings') {
        var s = db.settings;
        ['company', 'tagline_en', 'tagline_ar', 'email', 'instagram', 'city_en', 'city_ar', 'founded'].forEach(function (k) { if (body[k] !== undefined) s[k] = clean(body[k], 200); });
        if (body.whatsapp !== undefined) s.whatsapp = phoneNorm(body.whatsapp);
        if (body.businessesServed !== undefined) s.businessesServed = Math.max(0, parseInt(body.businessesServed, 10) || 0);
        if (Array.isArray(body.services)) s.services = body.services.slice(0, 12).map(function (x, i) { return { id: clean(x.id, 20) || 's' + i, en: clean(x.en, 60), ar: clean(x.ar, 60), d_en: clean(x.d_en, 300), d_ar: clean(x.d_ar, 300), from: Math.max(0, r2(x.from)) }; }).filter(function (x) { return x.en || x.ar; });
        if (Array.isArray(body.templates)) s.templates = body.templates.slice(0, 20).map(function (x, i) { return { id: clean(x.id, 20) || 't' + i + ctx.rand(2), name: clean(x.name, 60), text: clean(x.text, 1500) }; }).filter(function (x) { return x.text; });
        if (Array.isArray(body.recipients)) {
          var old = s.recipients || [];
          s.recipients = body.recipients.slice(0, 6).map(function (r) {
            var prev = old.filter(function (o) { return o.id === r.id; })[0] || {};
            return { id: r.id || 'w' + ctx.rand(3), name: clean(r.name, 40), phone: phoneNorm(r.phone), apikey: r.apikey && String(r.apikey).indexOf('••••') !== 0 ? clean(r.apikey, 60) : prev.apikey || '', active: r.active !== false };
          }).filter(function (r) { return r.phone; });
        }
        log(db, ctx, 'settings.update'); res.changed = true; res.body = { ok: true }; return res;
      }
      if (M === 'POST' && path === '/api/hq/notify-test') {
        var fx = waEffects(db, '✅ Solunera HQ test message — WhatsApp alerts are working.'); need(fx.length, 'Add a WhatsApp number with its CallMeBot key first');
        res.effects = fx; res.body = { sent: fx.length }; return res;
      }
      if (M === 'POST' && path === '/api/hq/notifications/read') { db.notifications.forEach(function (n) { if (n.readBy.indexOf(me.id) < 0) n.readBy.push(me.id); }); res.changed = true; res.body = { ok: true }; return res; }
      if (M === 'GET' && path === '/api/hq/export') { var ex = JSON.parse(JSON.stringify(db)); ex.sessions = {}; res.body = ex; return res; }
      if (M === 'POST' && path === '/api/hq/import') {
        need(body && body.meta && Array.isArray(body.users) && Array.isArray(body.leads), 'This backup file is not valid');
        res.replaceDb = body; res.changed = true; res.body = { ok: true }; return res;
      }
      throw err(404, 'Not found');
    } catch (e) {
      if (!e.expose) { res.status = 500; res.body = { error: 'Something went wrong' }; res.internal = e; }
      else { res.status = e.status || 400; res.body = { error: e.message }; }
      res.changed = false; res.effects = []; res.asset = null;
      return res;
    }
  }
  // notifications for "owners" are also shown to employees? no — handled in hqState.
  // make readBy work for 'owners' too
  // (notifications with to:'owners' are visible to every owner)

  /* ---------------- demo data (preview only) ---------------- */
  function seedDemo(db, now, rand) {
    var t = todayStr(now);
    var mk = function (name, email, pct) { var salt = 'demo-' + email; db.seq.user++; db.users.push({ id: 'u' + db.seq.user, name: name, email: email, role: 'employee', salt: salt, hash: hashPassword('solunera', salt), active: true, mustChange: false, createdAt: now - 90 * 864e5, refCode: name.split(' ')[0].toLowerCase(), commissionPct: pct, phone: '+96170' + (100000 + db.seq.user * 1111) }); return 'u' + db.seq.user; };
    var ali = mk('Ali Haddad', 'ali@solunera.co', 10), rima = mk('Rima Khoury', 'rima@solunera.co', 12);
    var owner = db.users[0].id;
    var biz = [
      ['Café Nadia', 'cafe', 'Beirut', 'Hamra'], ['Al Sultan Grill', 'restaurant', 'Aleppo', 'New Aleppo'], ['Dr. Maya Dental', 'dental', 'Tripoli', 'Mina'], ['Glow Beauty Lounge', 'beauty', 'Jounieh', 'Kaslik'],
      ['Byblos Sea Hotel', 'hotel', 'Byblos', 'Old Port'], ['FitZone Gym', 'gym', 'Beirut', 'Achrafieh'], ['Mazaj Sweets', 'restaurant', 'Damascus', 'Midan'], ['Cedars Realty', 'real_estate', 'Beirut', 'Verdun'],
      ['Zaatar Bakery', 'cafe', 'Saida', 'Old Souk'], ['Nour Pharmacy', 'retail', 'Zahle', 'Boulevard'], ['Lina Boutique', 'retail', 'Batroun', 'Main St'], ['Orient Car Rental', 'auto', 'Beirut', 'Airport Rd'],
      ['Sham Kids Academy', 'education', 'Damascus', 'Mazzeh'], ['Dar Al Shifa Clinic', 'clinic', 'Homs', 'Inshaat'], ['Sunset Rooftop', 'restaurant', 'Batroun', 'Seaside']
    ];
    var stages = ['new', 'contacted', 'interested', 'offer', 'negotiating', 'won', 'lost', 'contacted', 'offer', 'won', 'new', 'interested', 'negotiating', 'lost', 'contacted'];
    var ctx = { now: now, rand: rand, user: db.users[0] };
    biz.forEach(function (b, i) {
      var who = i % 3 === 0 ? ali : i % 3 === 1 ? rima : (i % 2 ? ali : rima);
      var created = now - (40 - i * 2) * 864e5;
      var l = { id: nextId(db, 'lead', 'L'), ownerId: who, stage: stages[i], source: ['field', 'instagram', 'referral', 'google_maps'][i % 4], createdAt: created, createdBy: who, tags: [], updatedAt: created };
      applyLead(db, l, { name: b[0], category: b[1], city: b[2], address: b[3], country: ['Aleppo', 'Damascus', 'Homs'].indexOf(b[2]) >= 0 ? 'Syria' : 'Lebanon', contactName: ['Nadia', 'Abu Samer', 'Dr. Maya', 'Joelle', 'Georges', 'Marc', 'Hassan', 'Rami', 'Fadi', 'Nour', 'Lina', 'Karim', 'Hala', 'Dr. Omar', 'Tony'][i],
        contactRole: 'Owner', phone: '+961 ' + (70 + i % 9) + ' ' + (100000 + i * 7919), instagram: b[0].toLowerCase().replace(/[^a-z]/g, ''), rating: 4 + (i % 10) / 10, nextFollowUp: ['won', 'lost'].indexOf(stages[i]) < 0 ? addDays(t, (i % 5) - 1) : '' }, { now: created });
      l.stage = stages[i]; if (l.stage === 'lost') l.lostReason = 'Budget too low this season';
      db.leads.push(l);
      db.activities.push({ id: nextId(db, 'act', 'a'), leadId: l.id, byId: who, type: i % 2 ? 'visit' : 'whatsapp', text: i % 2 ? 'Visited the shop, met the owner, showed the Alpatra demo on my phone.' : 'Sent the first WhatsApp message with portfolio link.', at: created + 3600e3 });
      if (['offer', 'negotiating', 'won', 'lost'].indexOf(l.stage) >= 0) {
        var o = { id: nextId(db, 'offer', 'o'), leadId: l.id, byId: who, createdAt: created + 2 * 864e5, sentAt: created + 2 * 864e5, currency: 'USD' };
        applyOffer(o, { title: ['Website + WhatsApp ordering', 'Booking system', 'Website + social content', 'Management system'][i % 4], services: [['web', 'order'], ['sys'], ['web', 'social'], ['sys', 'data']][i % 4], setupPrice: [450, 900, 600, 1200][i % 4], monthlyPrice: [25, 40, 60, 50][i % 4], monthlyAfterMonths: 12, notes: 'First year hosting included.' });
        o.status = l.stage === 'won' ? 'accepted' : l.stage === 'lost' ? 'rejected' : 'sent';
        db.offers.push(o);
      }
    });
    // clients & projects (real portfolio projects as examples)
    function addClient(name, cat, city, started, projectName, stack, host, dbp, domain, setup, monthly, monthlyStart, status, end) {
      var c = { id: nextId(db, 'client', 'c'), status: 'active', startedAt: started, createdAt: now, accountManagerId: owner };
      applyClient(c, { name: name, category: cat, city: city, contactName: 'Owner', phone: '' }); db.clients.push(c);
      var p = { id: nextId(db, 'project', 'p'), clientId: c.id, status: status, startDate: started, stack: [], secrets: [], hosting: {}, database: {}, domain: {}, contract: {}, createdAt: now };
      applyProject(p, { name: projectName, type: 'system', stack: stack, deliveryDate: addDays(started, 21), hosting: host, database: dbp, domain: domain, contract: { start: started, end: end || addDays(started, 730), setupFee: setup, setupPaid: true, monthlyFee: monthly, monthlyStart: monthlyStart, billingDay: 5 } });
      db.projects.push(p); return p;
    }
    addClient('Alpatra Hotel & Rest.', 'hotel', 'Damascus', addDays(t, -14), 'Booking website + hotel management system', ['Node.js', 'JavaScript', 'HTML/CSS', 'Supabase'],
      { provider: 'Render', plan: 'Free', url: 'https://alpatra.onrender.com', monthlyCost: 0 }, { provider: 'Supabase', name: 'alpatra hotel', monthlyCost: 0 }, { name: 'hotelalpatra.com', registrar: 'Client', renewalDate: addDays(t, 45), yearlyCost: 0 }, 900, 40, addDays(t, 351), 'live');
    addClient('Le Six Hotel & Resort', 'hotel', 'Batroun', addDays(t, -170), 'Hotel management system', ['Next.js', 'TypeScript', 'PostgreSQL'],
      { provider: 'Vercel', plan: 'Hobby', monthlyCost: 0, renewalDate: '' }, { provider: 'Neon', monthlyCost: 0 }, { name: '', registrar: '' }, 700, 35, addDays(t, -140), 'live');
    addClient('Amsterdam Potato', 'restaurant', 'Aleppo', addDays(t, -2), 'Arabic ordering website', ['HTML/CSS', 'JavaScript'],
      { provider: 'Netlify', monthlyCost: 0 }, {}, { name: '', registrar: '' }, 450, 20, addDays(t, 363), 'building');
    db.meta.demo = true;
    syncBilling(db, now);
    // mark older monthly invoices paid except the latest
    db.invoices.forEach(function (i) { if (i.kind === 'monthly' && i.period < monthOf(t)) { i.status = 'paid'; i.paidAt = i.dueDate; i.method = 'Whish'; } });
    db.notifications.unshift({ id: nextId(db, 'note', 'n'), at: now - 3600e3, to: 'owners', type: 'won', text: '🎉 Offer accepted: Glow Beauty Lounge — $600 + $60/mo (Rima Khoury)', ref: null, readBy: [] });
  }

  return {
    handle: handle, freshDb: freshDb, ensureOwner: ensureOwner, seedDemo: seedDemo, seedPortfolio: seedPortfolio, hashPassword: hashPassword, syncBilling: syncBilling,
    util: { todayStr: todayStr, addDays: addDays, daysBetween: daysBetween, monthOf: monthOf, addMonths: addMonths, isDate: isDate, mrr: mrr, phoneNorm: phoneNorm, r2: r2, STAGES: STAGES, PROJECT_ST: PROJECT_ST }
  };
});
