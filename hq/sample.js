/* Example data for the HQ preview and for `npm run demo`. Safe to delete. */
(function (root) {
  'use strict';
  function fill(db, t) {
    var day = 864e5;
    function d(n) { return new Date(t + n * day).toISOString().slice(0, 10); }
    function dt(n, h) { var x = new Date(t + n * day); x.setHours(h, 0, 0, 0); var o = x.getTimezoneOffset() * 6e4; return new Date(x - o).toISOString().slice(0, 16); }
    var k = 0; function id(p) { k++; return p + 'x' + k.toString(36) + Math.floor(t / 1e3).toString(36).slice(-3); }
    var owner = (db.users[0] && db.users[0].id) || 'u-owner';
    var rep = 'u-rep1';
    db.users.push({ id: rep, name: 'Field rep (example)', email: 'rep@solunera.co', role: 'sales', phone: '', mustChange: false, createdAt: t, salt: '', hash: '' });

    var v1 = id('vi'), v2 = id('vi'), v3 = id('vi'), v4 = id('vi');
    db.visits = [
      { id: v1, createdAt: t - 2 * day, createdBy: rep, by: rep, business: 'Juicy bakery & pastry', kind: 'bakery', area: '', owner: 'Owner', phone: '', instagram: '@juicy_bakery_pastry', visitedOn: d(-2),
        currentSystem: 'Owner is building his own ERP', problems: 'Wants one system for orders and stock\nOpen to other ideas', wants: 'Hear what else we can add next to his ERP', interest: 'warm', nextStep: 'Show ordering demo', nextDate: d(3), status: 'open', photos: [] },
      { id: v2, createdAt: t - 5 * day, createdBy: rep, by: rep, business: 'Tiger fast food', kind: 'restaurant', area: '', owner: 'Mr. Mo3tasem', phone: '', instagram: '', visitedOn: d(-5),
        currentSystem: 'Paper menu, buzzer pagers', problems: 'Customers crowd the counter waiting for orders\nMenu changes are slow', wants: 'Smart QR menu, ordering, phone pager', interest: 'hot', nextStep: 'Demo with their menu', nextDate: d(1), status: 'demo', photos: [] },
      { id: v3, createdAt: t - 8 * day, createdBy: owner, by: owner, business: 'Khayal cafe', kind: 'cafe', area: '', owner: '', phone: '', instagram: '', visitedOn: d(-8),
        currentSystem: '', problems: 'Similar setup to BASE', wants: 'AI agent ideas', interest: 'warm', nextStep: 'Send AI ideas in Arabic', nextDate: d(-1), status: 'open', photos: [] },
      { id: v4, createdAt: t - 3 * day, createdBy: rep, by: rep, business: 'Route 66 cafe', kind: 'cafe', area: '', owner: '', phone: '', instagram: '@route66_cafe_', visitedOn: d(-3),
        currentSystem: '', problems: '', wants: 'Free trial version of a system', interest: 'warm', nextStep: 'Set up the trial', nextDate: d(2), status: 'demo', photos: [] }
    ];

    var q1 = id('qu');
    db.settings.quoteSeq = 32;
    db.quotes = [
      { id: q1, number: 'SOL-2026-032', createdAt: t - 12 * day, createdBy: owner, client: 'Mr. Brand', clientTitle: '', lang: 'en', date: d(-12), validDays: 14, status: 'sent',
        intro: 'A delivery and restaurant guide platform with an AI assistant that answers in your style, customer accounts with WhatsApp verification and points, and panels for the owner, staff and drivers.',
        packages: [
          { name: 'Package 1: full platform on the web', items: 'Customer website\nAI assistant\nOwner, staff and driver panels', price: 2800, yearly: 1200, recommended: false },
          { name: 'Package 2: web + Android', items: 'Everything in Package 1\nAndroid app under your name', price: 3900, yearly: 1400, recommended: true },
          { name: 'Package 3: Android + iPhone', items: 'Android app\niPhone app\nNo website', price: 5000, yearly: 1600, recommended: false }
        ],
        payment: [{ label: 'At the start', pct: 30 }, { label: 'At the demo', pct: 30 }, { label: 'At launch', pct: 40 }],
        notes: 'The first year is included. The yearly plan starts in year two and covers up to 5 work hours a month.' }
    ];

    db.demos = [
      { id: id('de'), createdAt: t - 9 * day, createdBy: owner, client: 'Velouté', what: 'Chocolate ordering site with 3D gold-wrapper animation', link: '', status: 'ready', meetingAt: dt(2, 17), price: 650, owner: owner, notes: 'Customer side only. Arabic, English, Turkish.' },
      { id: id('de'), createdAt: t - 10 * day, createdBy: owner, client: 'Sakkal & Alasal', what: 'Travel platform demo', link: '', status: 'ready', meetingAt: dt(4, 12), price: 900, owner: owner, notes: 'Client side first, simple admin and staff boards.' },
      { id: id('de'), createdAt: t - 4 * day, createdBy: rep, client: 'Tiger fast food', visitId: v2, what: 'QR menu, ordering and phone pager', link: '', status: 'building', meetingAt: dt(1, 19), price: 0, owner: owner, notes: '' },
      { id: id('de'), createdAt: t - 3 * day, createdBy: rep, client: 'Route 66 cafe', visitId: v4, what: 'Free trial system', link: '', status: 'building', meetingAt: '', price: 0, owner: rep, notes: '' },
      { id: id('de'), createdAt: t - 30 * day, createdBy: owner, client: 'Al-Attrash', what: 'Shelf-check AI agent + online ordering', link: '', status: 'silent', meetingAt: '', price: 0, owner: owner, notes: 'Stopped replying after advanced stages.' },
      { id: id('de'), createdAt: t - 20 * day, createdBy: owner, client: 'Mr. Brand', what: 'Food guide platform with AI assistant', link: '', status: 'shown', meetingAt: '', price: 3900, owner: owner, notes: 'Quote SOL-2026-032 sent.', quoteId: q1 }
    ];

    var p1 = id('pr'), p2 = id('pr'), p3 = id('pr');
    db.projects = [
      { id: p1, createdAt: t - 20 * day, createdBy: owner, name: 'Dental clinic platform', client: 'Dr. Sana Baghdadi', deadline: d(10), status: 'active' },
      { id: p2, createdAt: t - 9 * day, createdBy: owner, name: 'Velouté demo', client: 'Velouté', deadline: d(2), status: 'active' },
      { id: p3, createdAt: t - 1 * day, createdBy: owner, name: 'Solunera website', client: 'Solunera', deadline: d(7), status: 'active' }
    ];
    function task(p, title, status, due, pr, who) { return { id: id('ta'), createdAt: t, createdBy: owner, projectId: p, title: title, status: status, due: due, priority: pr || 'normal', assignee: who || owner, notes: '' }; }
    db.tasks = [
      task(p1, 'Replace placeholder clinic info with real details', 'doing', d(1), 'high'),
      task(p1, 'Odontogram: save per-visit history', 'todo', d(5)),
      task(p1, 'Receptionist booking screen review', 'review', d(2)),
      task(p1, 'Patient portal login', 'done', d(-3)),
      task(p2, 'Final pass on the gold-wrapper scroll', 'doing', d(0), 'high'),
      task(p2, 'Turkish translations', 'todo', d(1)),
      task(p3, 'Deploy new site to Render', 'todo', d(3)),
      task(p3, 'Add new project screenshots', 'todo', d(5), 'normal', rep)
    ];

    db.inbox = [
      { id: id('in'), createdAt: t - 3 * 36e5, name: 'Example inquiry', phone: '+961 70 000 000', business: 'Seaside restaurant', message: 'We want online ordering and a system for the kitchen.', needs: ['Ordering', 'Management system'], lang: 'en', status: 'new' }
    ];
    return db;
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = { fill: fill };
  else root.SolSample = { fill: fill };
})(this);
