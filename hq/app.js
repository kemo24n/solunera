/* Solunera HQ: field visits, demo tracker, quote builder, project tasks. Arabic + English.
 * Talks to /api/* on the real server. Opened anywhere else it runs as a preview with example data in this browser. */
(function () {
  'use strict';

  /* ========================= I18N ========================= */
  const L = {
    en: {
      home: 'Home', visits: 'Field visits', demos: 'Demos', quotes: 'Quotes', tasks: 'Tasks', people: 'People',
      hello: 'Good to see you, {n}', today: 'Today is {d}', signout: 'Sign out', password: 'Password', lang: 'عربي',
      k_pipe: 'open deals in demos', k_meet: 'meetings in the next 7 days', k_hot: 'hot leads waiting', k_due: 'of your tasks due or late',
      b_tasks: 'Your tasks', b_meet: 'Next meetings', b_follow: 'Follow-ups from visits', b_quotes: 'Quotes waiting for an answer', b_inbox: 'Website inquiries',
      e_tasks: 'Nothing due. Pick something from Tasks.', e_meet: 'No meetings booked. Set a meeting date on a demo.', e_follow: 'No follow-ups due.', e_quotes: 'No quotes waiting.', e_inbox: 'No new inquiries from the website.',
      see_all: 'See all', late: 'late', due_today: 'today', tomorrow: 'tomorrow',
      new_visit: 'New visit', search: 'Search', all: 'All', hot: 'Hot', warm: 'Warm', cold: 'Cold',
      st_open: 'Open', st_demo: 'Demo started', st_quoted: 'Quoted', st_closed: 'Closed',
      v_business: 'Business name', v_kind: 'Type', v_area: 'Area', v_owner: 'Owner or manager', v_phone: 'Phone / WhatsApp', v_ig: 'Instagram', v_date: 'Visit date', v_by: 'Visited by',
      v_current: 'What they use today', v_problems: 'Their problems (one per line)', v_wants: 'What they asked for', v_interest: 'Interest', v_budget: 'Budget they mentioned', v_next: 'Next step', v_nextdate: 'Next step date', v_photos: 'Photos', v_status: 'Status', add_photo: 'Add photo',
      kinds: { restaurant: 'Restaurant', cafe: 'Cafe', bakery: 'Bakery / sweets', shop: 'Shop', supermarket: 'Supermarket', hotel: 'Hotel', clinic: 'Clinic', factory: 'Factory', other: 'Other' },
      start_demo: 'Start a demo', make_quote: 'Make a quote', edit: 'Edit', del: 'Delete', save: 'Save', cancel: 'Cancel', close: 'Close', sure: 'Delete this for everyone?', yes_del: 'Yes, delete',
      saved: 'Saved', deleted: 'Deleted', created: 'Added',
      new_demo: 'New demo', d_client: 'Client', d_what: 'What we’re showing', d_link: 'Demo link', d_status: 'Status', d_meet: 'Meeting', d_price: 'Deal price (USD)', d_owner: 'Owner', d_notes: 'Notes', d_visit: 'From visit', none: 'None', mine: 'Mine only', open_link: 'Open demo',
      ds_building: 'Building', ds_ready: 'Ready to show', ds_shown: 'Shown', ds_won: 'Won', ds_lost: 'Lost', ds_silent: 'No reply',
      new_quote: 'New quote', q_no: 'Number', q_client: 'Client', q_title: 'How to address them', q_lang: 'Quote language', q_date: 'Date', q_valid: 'Valid for (days)', q_intro: 'What we’re offering', q_status: 'Status',
      qs_draft: 'Draft', qs_sent: 'Sent', qs_accepted: 'Accepted', qs_rejected: 'Rejected',
      packages: 'Packages', add_pkg: 'Add package', pkg: 'Package {n}', p_name: 'Name', p_items: 'What’s included (one per line)', p_price: 'Price (USD)', p_yearly: 'Yearly from year 2', p_rec: 'Recommended', remove: 'Remove',
      payment: 'Payment stages', add_stage: 'Add stage', q_notes: 'Notes and terms', print: 'Print / save PDF', duplicate: 'Duplicate', total_pct: 'Total {p}%',
      th_no: 'No.', th_client: 'Client', th_date: 'Date', th_status: 'Status', th_value: 'Value', e_quotelist: 'No quotes yet. Make the first one from a demo or start fresh.',
      new_project: 'New project', edit_project: 'Edit project', pr_name: 'Project name', pr_client: 'Client', pr_deadline: 'Deadline', pr_status: 'Status', pr_active: 'Active', pr_done: 'Finished',
      ts_todo: 'To do', ts_doing: 'Doing', ts_review: 'Review', ts_done: 'Done', add_task: 'Add a task…', t_title: 'Task', t_assignee: 'Who', t_due: 'Due', t_priority: 'Priority', t_project: 'Project', t_notes: 'Notes',
      pr_low: 'Low', pr_normal: 'Normal', pr_high: 'High', e_projects: 'No projects yet. Add one to start a task board.', all_people: 'Everyone', open_tasks: '{n} open',
      add_person: 'Add person', pe_name: 'Name', pe_email: 'Email', pe_phone: 'Phone', pe_role: 'Role', role_owner: 'Owner', role_sales: 'Sales / field', role_dev: 'Developer', reset_pw: 'New password', you: 'you',
      pw_once: 'Share this password with {n}. It’s shown once: {p}', settings: 'Quote details', s_company: 'Company name', s_phone: 'Phone on quotes', s_ig: 'Instagram', s_email: 'Email', s_signer: 'Signed by', s_title_en: 'Title (English)', s_title_ar: 'Title (Arabic)', s_prefix: 'Quote number prefix',
      in_status: 'Status', in_new: 'New', in_contacted: 'Contacted', in_closed: 'Closed', to_visit: 'Turn into a visit', whatsapp: 'WhatsApp', needs: 'Needs', message: 'Message', received: 'Received',
      chg_pw: 'Change password', cur_pw: 'Current password', new_pw: 'New password (8+ characters)', must_change: 'Choose your own password before you start.',
      preview: 'Preview with example data. Changes stay in this browser only.', reset_preview: 'Reset examples',
      err_net: 'No connection. Check the internet and try again.', err_required: 'Fill in {f} first.', photo_big: 'Up to 4 photos per visit.',
      login_err: 'Email or password is wrong', usd: 'USD'
    },
    ar: {
      home: 'الرئيسية', visits: 'الزيارات', demos: 'الديموهات', quotes: 'عروض الأسعار', tasks: 'المهام', people: 'الفريق',
      hello: 'أهلا {n}', today: 'اليوم {d}', signout: 'تسجيل خروج', password: 'كلمة السر', lang: 'English',
      k_pipe: 'صفقات مفتوحة بالديموهات', k_meet: 'اجتماعات خلال ٧ أيام', k_hot: 'عملاء متحمسين ناطرين', k_due: 'من مهامك مستحقة أو متأخرة',
      b_tasks: 'مهامك', b_meet: 'الاجتماعات الجاية', b_follow: 'متابعات من الزيارات', b_quotes: 'عروض ناطرة رد', b_inbox: 'طلبات من الموقع',
      e_tasks: 'ما في شي مستحق. اختار شي من المهام.', e_meet: 'ما في اجتماعات. حط موعد على ديمو.', e_follow: 'ما في متابعات مستحقة.', e_quotes: 'ما في عروض ناطرة.', e_inbox: 'ما في طلبات جديدة من الموقع.',
      see_all: 'عرض الكل', late: 'متأخر', due_today: 'اليوم', tomorrow: 'بكرا',
      new_visit: 'زيارة جديدة', search: 'بحث', all: 'الكل', hot: 'متحمس', warm: 'مهتم', cold: 'بارد',
      st_open: 'مفتوحة', st_demo: 'بلّش الديمو', st_quoted: 'انبعت عرض', st_closed: 'مسكّرة',
      v_business: 'اسم البزنس', v_kind: 'النوع', v_area: 'المنطقة', v_owner: 'المالك أو المدير', v_phone: 'هاتف / واتساب', v_ig: 'إنستغرام', v_date: 'تاريخ الزيارة', v_by: 'مين زار',
      v_current: 'شو بيستعملوا هلق', v_problems: 'مشاكلهم (وحدة بكل سطر)', v_wants: 'شو طلبوا', v_interest: 'الاهتمام', v_budget: 'الميزانية اللي ذكروها', v_next: 'الخطوة الجاية', v_nextdate: 'موعد الخطوة الجاية', v_photos: 'صور', v_status: 'الحالة', add_photo: 'أضف صورة',
      kinds: { restaurant: 'مطعم', cafe: 'كافيه', bakery: 'أفران / حلويات', shop: 'محل', supermarket: 'سوبرماركت', hotel: 'فندق', clinic: 'عيادة', factory: 'مصنع', other: 'غير ذلك' },
      start_demo: 'ابدأ ديمو', make_quote: 'اعمل عرض سعر', edit: 'تعديل', del: 'حذف', save: 'حفظ', cancel: 'إلغاء', close: 'إغلاق', sure: 'حذف هذا للجميع؟', yes_del: 'إي، احذف',
      saved: 'انحفظ', deleted: 'انحذف', created: 'انضاف',
      new_demo: 'ديمو جديد', d_client: 'العميل', d_what: 'شو عم نعرض', d_link: 'رابط الديمو', d_status: 'الحالة', d_meet: 'الاجتماع', d_price: 'سعر الصفقة (دولار)', d_owner: 'المسؤول', d_notes: 'ملاحظات', d_visit: 'من زيارة', none: 'لا شي', mine: 'تبعي بس', open_link: 'افتح الديمو',
      ds_building: 'عم ينبنى', ds_ready: 'جاهز للعرض', ds_shown: 'انعرض', ds_won: 'ربحنا', ds_lost: 'خسرنا', ds_silent: 'ما في رد',
      new_quote: 'عرض سعر جديد', q_no: 'الرقم', q_client: 'العميل', q_title: 'كيف نخاطبه', q_lang: 'لغة العرض', q_date: 'التاريخ', q_valid: 'صالح لمدة (أيام)', q_intro: 'شو عم نقدّم', q_status: 'الحالة',
      qs_draft: 'مسودة', qs_sent: 'انبعت', qs_accepted: 'انقبل', qs_rejected: 'انرفض',
      packages: 'الباقات', add_pkg: 'أضف باقة', pkg: 'باقة {n}', p_name: 'الاسم', p_items: 'شو بتشمل (كل بند بسطر)', p_price: 'السعر (دولار)', p_yearly: 'سنوي من السنة الثانية', p_rec: 'منصح فيها', remove: 'شيل',
      payment: 'مراحل الدفع', add_stage: 'أضف مرحلة', q_notes: 'ملاحظات وشروط', print: 'طباعة / PDF', duplicate: 'نسخة', total_pct: 'المجموع {p}%',
      th_no: 'الرقم', th_client: 'العميل', th_date: 'التاريخ', th_status: 'الحالة', th_value: 'القيمة', e_quotelist: 'ما في عروض لسا. اعمل أول واحد من ديمو أو من الصفر.',
      new_project: 'مشروع جديد', edit_project: 'تعديل المشروع', pr_name: 'اسم المشروع', pr_client: 'العميل', pr_deadline: 'الموعد النهائي', pr_status: 'الحالة', pr_active: 'شغّال', pr_done: 'خلص',
      ts_todo: 'لازم ينعمل', ts_doing: 'عم ينعمل', ts_review: 'مراجعة', ts_done: 'خلص', add_task: 'أضف مهمة…', t_title: 'المهمة', t_assignee: 'مين', t_due: 'الموعد', t_priority: 'الأولوية', t_project: 'المشروع', t_notes: 'ملاحظات',
      pr_low: 'منخفضة', pr_normal: 'عادية', pr_high: 'عالية', e_projects: 'ما في مشاريع لسا. أضف مشروع لتبلّش لوحة المهام.', all_people: 'الكل', open_tasks: '{n} مفتوحة',
      add_person: 'أضف شخص', pe_name: 'الاسم', pe_email: 'الإيميل', pe_phone: 'الهاتف', pe_role: 'الدور', role_owner: 'مالك', role_sales: 'مبيعات / ميداني', role_dev: 'مطوّر', reset_pw: 'كلمة سر جديدة', you: 'إنت',
      pw_once: 'ابعت كلمة السر لـ {n}. بتطلع مرة وحدة: {p}', settings: 'معلومات عروض الأسعار', s_company: 'اسم الشركة', s_phone: 'الهاتف على العروض', s_ig: 'إنستغرام', s_email: 'الإيميل', s_signer: 'التوقيع باسم', s_title_en: 'اللقب (إنجليزي)', s_title_ar: 'اللقب (عربي)', s_prefix: 'بادئة رقم العرض',
      in_status: 'الحالة', in_new: 'جديد', in_contacted: 'تواصلنا', in_closed: 'مسكّر', to_visit: 'حوّلها لزيارة', whatsapp: 'واتساب', needs: 'الاحتياجات', message: 'الرسالة', received: 'وصلت',
      chg_pw: 'غيّر كلمة السر', cur_pw: 'كلمة السر الحالية', new_pw: 'كلمة سر جديدة (٨ أحرف أو أكثر)', must_change: 'اختار كلمة سر خاصة فيك قبل ما تبلّش.',
      preview: 'معاينة ببيانات تجريبية. التغييرات بتضل بهالمتصفح بس.', reset_preview: 'رجّع الأمثلة',
      err_net: 'ما في اتصال. تأكد من الإنترنت وجرّب كمان مرة.', err_required: 'عبّي {f} أول.', photo_big: 'لحد ٤ صور بكل زيارة.',
      login_err: 'الإيميل أو كلمة السر غلط', usd: 'دولار'
    }
  };
  const DOC = {
    en: { title: 'Quotation', for: 'Prepared for', date: 'Date', valid: 'Valid until', no: 'Quote', rec: 'Recommended', once: 'one-time', yearly: '{p} / year from year 2', firstYear: 'First year included', pay: 'Payment', notes: 'Notes', signed: 'For Solunera' },
    ar: { title: 'عرض سعر', for: 'مقدّم إلى', date: 'التاريخ', valid: 'صالح حتى', no: 'رقم العرض', rec: 'ننصح بها', once: 'دفعة واحدة', yearly: '{p} سنوياً من السنة الثانية', firstYear: 'السنة الأولى مشمولة', pay: 'الدفع', notes: 'ملاحظات', signed: 'عن سولونيرا' }
  };
  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  let lang = lsGet('solhq_lang') === 'ar' ? 'ar' : 'en';
  function t(k, v) { let s = (L[lang][k] !== undefined ? L[lang][k] : L.en[k]); if (s === undefined) s = k; if (v) Object.keys(v).forEach((x) => { s = s.replace('{' + x + '}', v[x]); }); return s; }
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const money = (n) => '$' + (Math.round(+n || 0)).toLocaleString('en-US');
  const todayISO = () => { const d = new Date(); return new Date(d - d.getTimezoneOffset() * 6e4).toISOString().slice(0, 10); };
  function addDays(iso, n) { const d = new Date(iso + 'T12:00:00'); d.setDate(d.getDate() + n); return d.toISOString().slice(0, 10); }
  function fmtDate(iso) { if (!iso) return ''; const d = new Date(iso.length > 10 ? iso : iso + 'T12:00:00'); if (isNaN(d)) return iso; return d.toLocaleDateString(lang === 'ar' ? 'ar-LB' : 'en-GB', { day: 'numeric', month: 'short' }) + (iso.length > 10 ? ' · ' + d.toLocaleTimeString(lang === 'ar' ? 'ar-LB' : 'en-GB', { hour: '2-digit', minute: '2-digit' }) : ''); }
  function dueLabel(iso) {
    if (!iso) return '';
    const td = todayISO(), d = iso.slice(0, 10);
    if (d < td) return '<span class="late">' + esc(fmtDate(iso)) + ' · ' + t('late') + '</span>';
    if (d === td) return '<b>' + t('due_today') + (iso.length > 10 ? ' · ' + esc(fmtDate(iso).split(' · ')[1] || '') : '') + '</b>';
    if (d === addDays(td, 1)) return t('tomorrow') + (iso.length > 10 ? ' · ' + esc(fmtDate(iso).split(' · ')[1] || '') : '');
    return esc(fmtDate(iso));
  }

  /* ========================= API ========================= */
  const COLS = ['quotes', 'visits', 'demos', 'projects', 'tasks', 'inbox'];
  const PKEY = 'solhq_preview_v3';
  const API = {
    mode: null,
    async detect() {
      if (this.mode) return this.mode;
      try {
        const c = new AbortController(); const tm = setTimeout(() => c.abort(), 3000);
        const r = await fetch('/api/ping', { cache: 'no-store', signal: c.signal }); clearTimeout(tm);
        const j = r.ok ? await r.json() : null; this.mode = j && j.app === 'solunera' && j.v === 2 ? 'server' : 'preview';
      } catch (e) { this.mode = 'preview'; }
      return this.mode;
    },
    async req(method, path, body) {
      if (this.mode === 'server') {
        let r;
        try { r = await fetch(path, { method, credentials: 'same-origin', cache: 'no-store', headers: body ? { 'Content-Type': 'application/json' } : {}, body: body ? JSON.stringify(body) : undefined }); }
        catch (e) { const er = new Error(t('err_net')); er.status = 0; throw er; }
        const j = await r.json().catch(() => ({}));
        if (!r.ok) { const er = new Error(j.error || t('err_net')); er.status = r.status; throw er; }
        return j;
      }
      return Local.handle(method, path, body ? JSON.parse(JSON.stringify(body)) : {});
    }
  };
  const Local = {
    db: null,
    load() {
      if (this.db) return this.db;
      const raw = lsGet(PKEY);
      if (raw) { try { this.db = JSON.parse(raw); return this.db; } catch (e) {} }
      const db = { meta: { rev: 1 }, users: [{ id: 'u-owner', name: 'Kamel Nassif', email: 'kamel@solunera.co', role: 'owner', phone: '+961 81 836 178' }],
        settings: { company: 'Solunera', phone: '+961 81 836 178', instagram: '@soluneragency', email: '', signer: 'Kamel Nassif', signerTitle_en: 'Founder', signerTitle_ar: 'المؤسس', quotePrefix: 'SOL', quoteSeq: 0 },
        quotes: [], visits: [], demos: [], projects: [], tasks: [], inbox: [] };
      if (window.SolSample) window.SolSample.fill(db, Date.now());
      this.db = db; this.save(); return db;
    },
    save() { lsSet(PKEY, JSON.stringify(this.db)); },
    reset() { try { localStorage.removeItem(PKEY); } catch (e) {} this.db = null; },
    handle(m, p, body) {
      const db = this.load(), me = db.users[0], rid = () => Math.random().toString(36).slice(2, 9);
      const ok = (x) => new Promise((res) => setTimeout(() => res(x), 60));
      const bad = (msg) => Promise.reject(Object.assign(new Error(msg), { status: 400 }));
      const pub = (u) => ({ id: u.id, name: u.name, email: u.email, role: u.role, phone: u.phone || '', mustChange: false });
      const touch = () => { db.meta.rev++; this.save(); };
      if (p === '/api/hq/state') { const o = { me: pub(me), rev: db.meta.rev, users: db.users.map(pub), settings: db.settings }; COLS.forEach((c) => { o[c] = db[c]; }); return ok(JSON.parse(JSON.stringify(o))); }
      if (p === '/api/hq/rev') return ok({ rev: db.meta.rev });
      if (p === '/api/auth/logout') return ok({ ok: true });
      if (p === '/api/auth/password') return ok({ me: pub(me) });
      if (p === '/api/hq/settings') { Object.assign(db.settings, body); touch(); return ok({ settings: db.settings }); }
      let mm = p.match(/^\/api\/hq\/users(?:\/([\w-]+))?$/);
      if (mm) {
        if (m === 'POST') { if (db.users.some((u) => u.email === body.email)) return bad('Someone already uses this email'); const u = { id: 'u' + rid(), name: body.name, email: body.email, phone: body.phone || '', role: body.role || 'sales' }; db.users.push(u); touch(); return ok({ user: pub(u), password: 'demo-' + rid().slice(0, 5) }); }
        const u = db.users.find((x) => x.id === mm[1]); if (!u) return bad('Person not found');
        if (m === 'DELETE') { if (u.id === me.id) return bad('You can’t remove yourself'); db.users = db.users.filter((x) => x !== u); touch(); return ok({ ok: true }); }
        if (m === 'PATCH') { ['name', 'phone', 'role'].forEach((k) => { if (body[k] !== undefined && !(k === 'role' && u.id === me.id)) u[k] = body[k]; }); touch(); return ok({ user: pub(u), password: body.resetPassword ? 'demo-' + rid().slice(0, 5) : undefined }); }
      }
      mm = p.match(/^\/api\/hq\/(quotes|visits|demos|projects|tasks|inbox)(?:\/([\w-]+))?$/);
      if (mm) {
        const col = mm[1], id = mm[2];
        if (m === 'POST') {
          const item = Object.assign(body, { id: col.slice(0, 2) + rid(), createdAt: Date.now(), createdBy: me.id });
          if (col === 'quotes') { db.settings.quoteSeq = (db.settings.quoteSeq || 0) + 1; item.number = (db.settings.quotePrefix || 'SOL') + '-' + new Date().getFullYear() + '-' + String(db.settings.quoteSeq).padStart(3, '0'); }
          db[col].unshift(item); touch(); return ok({ item });
        }
        const item = db[col].find((x) => x.id === id); if (!item) return bad('Not found. Someone may have deleted it.');
        if (m === 'PATCH') { ['id', 'createdAt', 'createdBy', 'number'].forEach((k) => delete body[k]); Object.assign(item, body, { updatedAt: Date.now() }); touch(); return ok({ item }); }
        if (m === 'DELETE') { db[col] = db[col].filter((x) => x.id !== id); if (col === 'projects') db.tasks = db.tasks.filter((x) => x.projectId !== id); touch(); return ok({ ok: true }); }
      }
      return bad('Unknown request');
    }
  };

  /* ========================= STATE ========================= */
  let S = null;
  const ui = { view: 'home', vInterest: 'all', vStatus: 'active', q: '', mineDemos: false, projectId: lsGet('solhq_project') || null, taskWho: 'all', sheetOpen: false };
  const VIEWS = ['home', 'visits', 'demos', 'quotes', 'tasks', 'people'];
  const DEMO_ST = ['building', 'ready', 'shown', 'won', 'lost', 'silent'];
  const TASK_ST = ['todo', 'doing', 'review', 'done'];
  const QUOTE_ST = ['draft', 'sent', 'accepted', 'rejected'];
  const VISIT_ST = ['open', 'demo', 'quoted', 'closed'];
  const user = (id) => (S.users.find((u) => u.id === id) || { name: '?', id: '' });
  const initials = (n) => String(n || '?').split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
  const avatar = (id) => { const u = user(id); return '<span class="avatar" title="' + esc(u.name) + '">' + esc(initials(u.name)) + '</span>'; };
  const isOwner = () => S && S.me.role === 'owner';

  async function loadState() { S = await API.req('GET', '/api/hq/state'); }
  async function mutate(method, path, body, msg) {
    try {
      const r = await API.req(method, path, body);
      await loadState(); renderView(); if (msg) toast(msg);
      return r;
    } catch (e) {
      if (e.status === 401) return showLogin();
      toast(e.message, true); throw e;
    }
  }
  const create = (col, obj) => mutate('POST', '/api/hq/' + col, obj, t('created'));
  const update = (col, id, obj, quiet) => mutate('PATCH', '/api/hq/' + col + '/' + id, obj, quiet ? null : t('saved'));
  const remove = (col, id) => mutate('DELETE', '/api/hq/' + col + '/' + id, null, t('deleted'));

  /* ========================= UI HELPERS ========================= */
  let toastT;
  function toast(msg, err) {
    let el = $('.toast'); if (!el) { el = document.createElement('div'); el.className = 'toast'; el.setAttribute('role', 'status'); document.body.appendChild(el); }
    el.textContent = msg; el.classList.toggle('err', !!err); el.hidden = false;
    clearTimeout(toastT); toastT = setTimeout(() => { el.hidden = true; }, err ? 4200 : 1800);
  }
  function openSheet(html, opts) {
    closeSheet();
    const bg = document.createElement('div'); bg.className = 'sheet-bg';
    bg.innerHTML = '<div class="sheet' + (opts && opts.wide ? ' wide' : '') + '" role="dialog" aria-modal="true">' + html + '</div>';
    bg.addEventListener('mousedown', (e) => { if (e.target === bg && !(opts && opts.locked)) closeSheet(); });
    document.body.appendChild(bg); ui.sheetOpen = true;
    const f = $('.sheet input:not([type=hidden]):not([type=file]), .sheet select, .sheet textarea', bg); if (f && !(opts && opts.noFocus)) setTimeout(() => f.focus(), 30);
    return $('.sheet', bg);
  }
  function closeSheet() { $$('.sheet-bg').forEach((x) => x.remove()); ui.sheetOpen = false; }
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && ui.sheetOpen && !$('.sheet-bg[data-locked]')) closeSheet(); });
  function head(title, extra) { return '<div class="sheet-h"><h2>' + esc(title) + '</h2><div style="display:flex;gap:8px;align-items:center">' + (extra || '') + '<button class="x" data-act="close" aria-label="' + t('close') + '">×</button></div></div>'; }
  function fld(label, inner, cls) { return '<label class="field ' + (cls || '') + '"><span>' + esc(label) + '</span>' + inner + '</label>'; }
  function inp(name, val, type, attrs) { return '<input class="inp" name="' + name + '" id="f-' + name + '" type="' + (type || 'text') + '" value="' + esc(val == null ? '' : val) + '" ' + (attrs || '') + '>'; }
  function area(name, val, attrs) { return '<textarea class="inp" name="' + name + '" id="f-' + name + '" ' + (attrs || '') + '>' + esc(val || '') + '</textarea>'; }
  function sel(name, val, opts) { return '<select class="inp" name="' + name + '" id="f-' + name + '">' + opts.map((o) => '<option value="' + esc(o[0]) + '"' + (String(o[0]) === String(val == null ? '' : val) ? ' selected' : '') + '>' + esc(o[1]) + '</option>').join('') + '</select>'; }
  function peopleOpts() { return S.users.map((u) => [u.id, u.name + (u.id === S.me.id ? ' (' + t('you') + ')' : '')]); }
  function formObj(form) { const o = {}; $$('[name]', form).forEach((el) => { if (el.type === 'checkbox') o[el.name] = el.checked; else if (el.type === 'number') o[el.name] = el.value === '' ? '' : +el.value; else o[el.name] = el.value.trim(); }); return o; }
  function confirmDel(btn, fn) {
    const box = document.createElement('div'); box.className = 'confirm';
    box.innerHTML = '<span>' + t('sure') + '</span><button class="btn danger sm" type="button">' + t('yes_del') + '</button><button class="btn quiet sm" type="button">' + t('cancel') + '</button>';
    btn.replaceWith(box);
    box.children[1].onclick = fn; box.children[2].onclick = () => box.replaceWith(btn);
  }
  function pill(kind, label) { return '<span class="pill ' + kind + '">' + esc(label) + '</span>'; }
  const interestPill = (i) => pill(i === 'hot' ? 'hot' : i === 'warm' ? 'warm' : 'cold', t(i || 'cold'));
  const demoKind = { building: '', ready: 'warm', shown: 'cold', won: 'ok', lost: 'hot', silent: '' };
  const quoteKind = { draft: '', sent: 'warm', accepted: 'ok', rejected: 'hot' };

  /* ========================= SHELL ========================= */
  const ICON = {
    home: '<path d="M3 10.5 12 3l9 7.5V21h-6v-6H9v6H3z"/>',
    visits: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    demos: '<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M10 8.5v5l4-2.5z"/>',
    quotes: '<path d="M6 3h9l4 4v14H6z"/><path d="M14 3v5h5M9 13h7M9 17h5"/>',
    tasks: '<rect x="3" y="4" width="5" height="16" rx="1"/><rect x="10" y="4" width="5" height="10" rx="1"/><rect x="17" y="4" width="4" height="7" rx="1"/>',
    people: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.8-3.6 3.4-5.5 6.5-5.5s5.7 1.9 6.5 5.5M16 4.8a3.5 3.5 0 0 1 0 6.4M18 14.8c2 .7 3.2 2.4 3.6 5.2"/>'
  };
  function icon(k) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true">' + ICON[k] + '</svg>'; }
  function renderShell() {
    document.documentElement.lang = lang; document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    const newIn = S.inbox.filter((x) => x.status === 'new').length;
    const nav = VIEWS.filter((v) => v !== 'people' || isOwner()).map((v) => '<button class="nav-b" data-v="' + v + '" data-act="go" ' + (ui.view === v ? 'aria-current="page"' : '') + '>' + icon(v) + '<span>' + t(v) + '</span>' + (v === 'home' && newIn ? '<span class="badge">' + newIn + '</span>' : '') + '</button>').join('');
    $('#root').innerHTML =
      (API.mode === 'preview' ? '<div class="preview-bar"><span>' + t('preview') + '</span><button data-act="reset-preview">' + t('reset_preview') + '</button></div>' : '') +
      '<div class="app"><nav class="rail" aria-label="HQ">' +
      '<div class="mark">s<span class="o"></span>lunera<small>HQ</small></div>' + nav +
      '<div class="foot"><div>' + esc(S.me.name) + '</div><div class="row"><button data-act="lang">' + t('lang') + '</button><button data-act="password">' + t('password') + '</button><button data-act="logout">' + t('signout') + '</button></div></div>' +
      '</nav><main class="main" id="main"></main></div>';
    $('#root').hidden = false; $('#login').hidden = true;
    renderView();
  }
  function mobileTop() {
    return '<div class="mobile-top"><span class="mark2">solunera <span class="mono muted">HQ</span></span><div class="row">' +
      (isOwner() ? '<button class="btn quiet sm" data-act="go" data-v="people">' + t('people') + '</button>' : '') +
      '<button class="btn quiet sm" data-act="lang">' + t('lang') + '</button><button class="btn quiet sm" data-act="logout">' + t('signout') + '</button></div></div>';
  }
  function renderView() {
    if (!S || !$('#main')) return;
    $$('.nav-b').forEach((b) => { if (b.dataset.v === ui.view) b.setAttribute('aria-current', 'page'); else b.removeAttribute('aria-current'); });
    const newIn = S.inbox.filter((x) => x.status === 'new').length, bh = $('.nav-b[data-v="home"]');
    if (bh) { const bd = $('.badge', bh); if (newIn && !bd) bh.insertAdjacentHTML('beforeend', '<span class="badge">' + newIn + '</span>'); else if (bd) { if (newIn) bd.textContent = newIn; else bd.remove(); } }
    const m = $('#main'), keepScroll = window.scrollY;
    m.innerHTML = mobileTop() + ({ home: vHome, visits: vVisits, demos: vDemos, quotes: vQuotes, tasks: vTasks, people: vPeople }[ui.view] || vHome)();
    window.scrollTo(0, keepScroll);
    if (ui.view === 'demos' || ui.view === 'tasks') wireBoard();
  }

  /* ========================= HOME ========================= */
  function vHome() {
    const td = todayISO(), week = addDays(td, 7), me = S.me.id;
    const openDemos = S.demos.filter((d) => ['building', 'ready', 'shown'].includes(d.status));
    const pipe = openDemos.reduce((a, d) => a + (+d.price || 0), 0);
    const meets = S.demos.filter((d) => d.meetingAt && d.meetingAt.slice(0, 10) >= td && !['won', 'lost'].includes(d.status)).sort((a, b) => a.meetingAt.localeCompare(b.meetingAt));
    const hot = S.visits.filter((v) => v.interest === 'hot' && v.status !== 'closed');
    const myTasks = S.tasks.filter((x) => x.assignee === me && x.status !== 'done').sort((a, b) => (a.due || '9').localeCompare(b.due || '9'));
    const dueN = myTasks.filter((x) => x.due && x.due <= td).length;
    const follow = S.visits.filter((v) => v.nextDate && v.nextDate <= addDays(td, 2) && v.status !== 'closed').sort((a, b) => a.nextDate.localeCompare(b.nextDate));
    const qwait = S.quotes.filter((q) => q.status === 'sent');
    const inbox = S.inbox.filter((x) => x.status !== 'closed');
    const d = new Date().toLocaleDateString(lang === 'ar' ? 'ar-LB' : 'en-GB', { weekday: 'long', day: 'numeric', month: 'long' });
    const li = (act, id, title, sub, end) => '<li><button class="row-b" data-act="' + act + '" data-id="' + id + '"><span class="t">' + title + '</span><span class="e">' + end + '</span><span class="s">' + sub + '</span></button></li>';
    const block = (title, view, items, empty) => '<section class="block"><h2>' + esc(title) + (view ? '<button class="btn quiet sm" data-act="go" data-v="' + view + '">' + t('see_all') + '</button>' : '') + '</h2><ul class="list">' + (items.length ? items.join('') : '<li class="empty">' + esc(empty) + '</li>') + '</ul></section>';
    return '<div class="page-h"><div><h1>' + esc(t('hello', { n: S.me.name.split(' ')[0] })) + '</h1><p class="sub">' + esc(t('today', { d })) + '</p></div>' +
      '<div class="act"><button class="btn" data-act="new-visit">' + t('new_visit') + '</button><button class="btn ghost" data-act="new-quote">' + t('new_quote') + '</button></div></div>' +
      '<div class="kpis">' +
      '<div class="kpi"><b>' + money(pipe) + '</b><span>' + t('k_pipe') + ' (' + openDemos.length + ')</span></div>' +
      '<div class="kpi"><b>' + meets.filter((x) => x.meetingAt.slice(0, 10) <= week).length + '</b><span>' + t('k_meet') + '</span></div>' +
      '<div class="kpi"><b>' + hot.length + '</b><span>' + t('k_hot') + '</span></div>' +
      '<div class="kpi"><b>' + dueN + '</b><span>' + t('k_due') + '</span></div></div>' +
      '<div class="cols">' +
      block(t('b_tasks'), 'tasks', myTasks.slice(0, 6).map((x) => { const p = S.projects.find((p) => p.id === x.projectId); return li('task', x.id, esc(x.title), esc(p ? p.name : ''), '<span class="mono">' + dueLabel(x.due) + '</span>'); }), t('e_tasks')) +
      block(t('b_meet'), 'demos', meets.slice(0, 6).map((x) => li('demo', x.id, esc(x.client), esc(x.what || ''), '<span class="mono">' + dueLabel(x.meetingAt) + '</span>' + (x.price ? '<span class="mono muted">' + money(x.price) + '</span>' : ''))), t('e_meet')) +
      block(t('b_follow'), 'visits', follow.slice(0, 6).map((v) => li('visit', v.id, esc(v.business), esc(v.nextStep || ''), '<span class="mono">' + dueLabel(v.nextDate) + '</span>' + interestPill(v.interest))), t('e_follow')) +
      block(t('b_inbox'), '', inbox.slice(0, 6).map((x) => li('inquiry', x.id, esc(x.name) + (x.business ? ' · ' + esc(x.business) : ''), esc((x.needs || []).join(', ') || x.message || ''), pill(x.status === 'new' ? 'hot' : '', t('in_' + x.status)))), t('e_inbox')) +
      block(t('b_quotes'), 'quotes', qwait.slice(0, 6).map((q) => li('quote', q.id, esc(q.client), '<span class="mono">' + esc(q.number) + '</span>', '<span class="mono">' + money(quoteValue(q)) + '</span>')), t('e_quotes')) +
      '</div>';
  }

  /* ========================= VISITS ========================= */
  function vVisits() {
    const q = ui.q.toLowerCase();
    let list = S.visits.filter((v) => (ui.vInterest === 'all' || v.interest === ui.vInterest) && (ui.vStatus === 'all' || (ui.vStatus === 'active' ? v.status !== 'closed' : v.status === 'closed')));
    if (q) list = list.filter((v) => [v.business, v.owner, v.problems, v.wants, v.area, v.instagram].join(' ').toLowerCase().includes(q));
    list.sort((a, b) => (b.visitedOn || '').localeCompare(a.visitedOn || ''));
    const seg = (key, vals) => '<div class="seg" role="group">' + vals.map((v) => '<button data-act="filter" data-k="' + key + '" data-val="' + v[0] + '" aria-pressed="' + (ui[key] === v[0]) + '">' + esc(v[1]) + '</button>').join('') + '</div>';
    return '<div class="page-h"><h1>' + t('visits') + '</h1><span class="sub">' + list.length + '</span><div class="act"><button class="btn" data-act="new-visit">' + t('new_visit') + '</button></div></div>' +
      '<div class="toolbar"><input class="inp search" id="search" type="search" placeholder="' + t('search') + '" value="' + esc(ui.q) + '" aria-label="' + t('search') + '">' +
      seg('vInterest', [['all', t('all')], ['hot', t('hot')], ['warm', t('warm')], ['cold', t('cold')]]) +
      seg('vStatus', [['active', t('st_open')], ['all', t('all')], ['closed', t('st_closed')]]) + '</div>' +
      (list.length ? '<div class="cards">' + list.map((v) => '<button class="card" data-act="visit" data-id="' + v.id + '"><div class="top"><h3>' + esc(v.business) + '</h3>' + interestPill(v.interest) + '</div>' +
        '<span class="muted" style="font-size:13px">' + esc(L[lang].kinds[v.kind] || '') + (v.owner ? ' · ' + esc(v.owner) : '') + '</span>' +
        (v.problems ? '<p class="pr">' + esc(v.problems) + '</p>' : '') +
        ((v.photos || []).length ? '<div class="thumbs">' + v.photos.slice(0, 4).map((p) => '<img src="' + esc(p) + '" alt="">').join('') + '</div>' : '') +
        '<div class="meta"><span>' + esc(fmtDate(v.visitedOn)) + '</span><span>' + esc(user(v.by).name) + '</span><span>' + t('st_' + (v.status || 'open')) + '</span>' + (v.nextDate ? '<span>' + (lang === 'ar' ? '← ' : '→ ') + dueLabel(v.nextDate) + '</span>' : '') + '</div></button>').join('') + '</div>'
        : '<p class="empty">' + t('e_follow') + '</p>');
  }
  function visitDetail(id) {
    const v = S.visits.find((x) => x.id === id); if (!v) return;
    const row = (k, val) => val ? '<dt>' + esc(t(k)) + '</dt><dd>' + val + '</dd>' : '';
    const demos = S.demos.filter((d) => d.visitId === v.id);
    const sh = openSheet(head(v.business, interestPill(v.interest)) +
      '<div class="detail"><dl>' +
      row('v_kind', esc(L[lang].kinds[v.kind] || '')) + row('v_owner', esc(v.owner)) +
      row('v_phone', v.phone ? '<a href="https://wa.me/' + esc(v.phone.replace(/\D/g, '')) + '" target="_blank" rel="noopener" dir="ltr">' + esc(v.phone) + '</a>' : '') +
      row('v_ig', v.instagram ? '<a href="https://instagram.com/' + esc(v.instagram.replace('@', '')) + '" target="_blank" rel="noopener" dir="ltr">' + esc(v.instagram) + '</a>' : '') +
      row('v_area', esc(v.area)) + row('v_date', esc(fmtDate(v.visitedOn)) + ' · ' + esc(user(v.by).name)) +
      row('v_current', esc(v.currentSystem)) + row('v_problems', esc(v.problems)) + row('v_wants', esc(v.wants)) + row('v_budget', esc(v.budget)) +
      row('v_next', esc(v.nextStep) + (v.nextDate ? ' · ' + dueLabel(v.nextDate) : '')) + row('v_status', esc(t('st_' + (v.status || 'open')))) +
      (demos.length ? row('demos', demos.map((d) => '<button class="btn quiet sm" data-act="demo" data-id="' + d.id + '">' + esc(d.what || d.client) + ' · ' + t('ds_' + d.status) + '</button>').join(' ')) : '') +
      '</dl></div>' +
      ((v.photos || []).length ? '<div class="photos">' + v.photos.map((p) => '<a href="' + esc(p) + '" target="_blank" rel="noopener"><img src="' + esc(p) + '" alt=""></a>').join('') + '</div>' : '') +
      '<div class="sheet-f"><div class="l"><button class="btn danger sm" data-act="del" data-col="visits" data-id="' + v.id + '">' + t('del') + '</button></div>' +
      '<button class="btn ghost" data-act="edit-visit" data-id="' + v.id + '">' + t('edit') + '</button><button class="btn ghost" data-act="visit-quote" data-id="' + v.id + '">' + t('make_quote') + '</button><button class="btn" data-act="visit-demo" data-id="' + v.id + '">' + t('start_demo') + '</button></div>', { noFocus: true });
    return sh;
  }
  function visitForm(v) {
    v = v || { visitedOn: todayISO(), by: S.me.id, interest: 'warm', status: 'open', kind: 'restaurant', photos: [] };
    let photos = (v.photos || []).slice();
    const sh = openSheet(head(v.id ? v.business : t('new_visit')) +
      '<form class="grid2" id="vf">' +
      fld(t('v_business') + ' *', inp('business', v.business, 'text', 'required autocomplete="off"'), 'full') +
      fld(t('v_kind'), sel('kind', v.kind, Object.keys(L[lang].kinds).map((k) => [k, L[lang].kinds[k]]))) +
      fld(t('v_area'), inp('area', v.area)) +
      fld(t('v_owner'), inp('owner', v.owner)) + fld(t('v_phone'), inp('phone', v.phone, 'tel', 'dir="ltr"')) +
      fld(t('v_ig'), inp('instagram', v.instagram, 'text', 'dir="ltr"')) + fld(t('v_date'), inp('visitedOn', v.visitedOn, 'date')) +
      fld(t('v_by'), sel('by', v.by, peopleOpts())) + fld(t('v_interest'), sel('interest', v.interest, [['hot', t('hot')], ['warm', t('warm')], ['cold', t('cold')]])) +
      fld(t('v_current'), inp('currentSystem', v.currentSystem), 'full') +
      fld(t('v_problems'), area('problems', v.problems), 'full') +
      fld(t('v_wants'), area('wants', v.wants, 'style="min-height:60px"'), 'full') +
      fld(t('v_budget'), inp('budget', v.budget)) + fld(t('v_status'), sel('status', v.status, VISIT_ST.map((s) => [s, t('st_' + s)]))) +
      fld(t('v_next'), inp('nextStep', v.nextStep)) + fld(t('v_nextdate'), inp('nextDate', v.nextDate, 'date')) +
      '<div class="field full"><span>' + t('v_photos') + '</span><div class="photos" id="ph"></div></div>' +
      '</form><div class="sheet-f">' + (v.id ? '<div class="l"><button class="btn danger sm" data-act="del" data-col="visits" data-id="' + v.id + '">' + t('del') + '</button></div>' : '') +
      '<button class="btn quiet" data-act="close">' + t('cancel') + '</button><button class="btn" id="vf-save">' + t('save') + '</button></div>');
    function drawPhotos() {
      $('#ph', sh).innerHTML = photos.map((p, i) => '<div class="ph"><img src="' + esc(p) + '" alt=""><button type="button" data-i="' + i + '" aria-label="' + t('remove') + '">×</button></div>').join('') +
        (photos.length < 4 ? '<label class="add">+ ' + t('add_photo') + '<input type="file" accept="image/*" capture="environment" id="ph-in" multiple></label>' : '');
      $$('.ph button', sh).forEach((b) => b.onclick = () => { photos.splice(+b.dataset.i, 1); drawPhotos(); });
      const fi = $('#ph-in', sh);
      if (fi) fi.onchange = async () => {
        for (const f of Array.from(fi.files)) { if (photos.length >= 4) { toast(t('photo_big'), true); break; } try { photos.push(await shrink(f)); } catch (e) {} }
        drawPhotos();
      };
    }
    drawPhotos();
    $('#vf-save', sh).onclick = async () => {
      const o = formObj($('#vf', sh)); o.photos = photos;
      if (!o.business) { toast(t('err_required', { f: t('v_business') }), true); $('#f-business', sh).focus(); return; }
      const r = v.id ? await update('visits', v.id, o) : await create('visits', o);
      if (r) { closeSheet(); if (!v.id && ui.view !== 'visits') { ui.view = 'visits'; renderView(); } }
    };
  }
  function shrink(file) {
    return new Promise((res, rej) => {
      const fr = new FileReader();
      fr.onload = () => { const img = new Image(); img.onload = () => {
        const max = 1000, s = Math.min(1, max / Math.max(img.width, img.height)), c = document.createElement('canvas');
        c.width = Math.round(img.width * s); c.height = Math.round(img.height * s); c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
        res(c.toDataURL('image/jpeg', 0.72)); }; img.onerror = rej; img.src = fr.result; };
      fr.onerror = rej; fr.readAsDataURL(file);
    });
  }

  /* ========================= DEMOS ========================= */
  function vDemos() {
    const list = S.demos.filter((d) => !ui.mineDemos || d.owner === S.me.id);
    const cols = DEMO_ST.map((st) => {
      const items = list.filter((d) => (d.status || 'building') === st);
      const sum = items.reduce((a, d) => a + (+d.price || 0), 0);
      return '<div class="colm" data-drop="' + st + '"><h3><span>' + t('ds_' + st) + ' <b>' + items.length + '</b></span><span class="mono">' + (sum ? money(sum) : '') + '</span></h3>' +
        items.map((d) => '<button class="tcard" draggable="true" data-drag="' + d.id + '" data-act="demo" data-id="' + d.id + '"><span class="t">' + esc(d.client) + '</span>' +
          (d.what ? '<span class="muted" style="font-size:13px">' + esc(d.what) + '</span>' : '') +
          '<span class="m">' + avatar(d.owner) + (d.meetingAt ? '<span class="mono">' + dueLabel(d.meetingAt) + '</span>' : '') + (d.price ? '<span class="mono">' + money(d.price) + '</span>' : '') + '</span></button>').join('') + '</div>';
    }).join('');
    return '<div class="page-h"><h1>' + t('demos') + '</h1><div class="act"><div class="seg"><button data-act="mine-demos" aria-pressed="' + ui.mineDemos + '">' + t('mine') + '</button></div><button class="btn" data-act="new-demo">' + t('new_demo') + '</button></div></div>' +
      '<div class="board" data-board="demos">' + cols + '</div>';
  }
  function demoForm(d) {
    d = d || { status: 'building', owner: S.me.id };
    const visits = [['', t('none')]].concat(S.visits.map((v) => [v.id, v.business]));
    const sh = openSheet(head(d.id ? d.client : t('new_demo')) +
      '<form class="grid2" id="df">' +
      fld(t('d_client') + ' *', inp('client', d.client, 'text', 'required'), 'full') +
      fld(t('d_what'), inp('what', d.what), 'full') +
      fld(t('d_link'), inp('link', d.link, 'url', 'dir="ltr" placeholder="https://"'), 'full') +
      fld(t('d_status'), sel('status', d.status, DEMO_ST.map((s) => [s, t('ds_' + s)]))) + fld(t('d_meet'), inp('meetingAt', d.meetingAt, 'datetime-local')) +
      fld(t('d_price'), inp('price', d.price, 'number', 'min="0" step="50"')) + fld(t('d_owner'), sel('owner', d.owner, peopleOpts())) +
      fld(t('d_visit'), sel('visitId', d.visitId || '', visits), 'full') +
      fld(t('d_notes'), area('notes', d.notes), 'full') +
      '</form><div class="sheet-f">' + (d.id ? '<div class="l"><button class="btn danger sm" data-act="del" data-col="demos" data-id="' + d.id + '">' + t('del') + '</button>' + (d.link ? '<a class="btn quiet sm" href="' + esc(d.link) + '" target="_blank" rel="noopener">' + t('open_link') + '</a>' : '') + '</div>' : '') +
      (d.id ? '<button class="btn ghost" data-act="demo-quote" data-id="' + d.id + '">' + t('make_quote') + '</button>' : '') +
      '<button class="btn" id="df-save">' + t('save') + '</button></div>');
    $('#df-save', sh).onclick = async () => {
      const o = formObj($('#df', sh));
      if (!o.client) { toast(t('err_required', { f: t('d_client') }), true); return; }
      const r = d.id ? await update('demos', d.id, o) : await create('demos', o);
      if (r && !d.id && o.visitId) { const v = S.visits.find((x) => x.id === o.visitId); if (v && v.status === 'open') await update('visits', v.id, { status: 'demo' }, true); }
      if (r) closeSheet();
    };
  }

  /* ========================= QUOTES ========================= */
  function quoteValue(q) { const ps = q.packages || []; const rec = ps.find((p) => p.recommended) || ps[0]; return rec ? +rec.price || 0 : 0; }
  function vQuotes() {
    const list = S.quotes.slice().sort((a, b) => (b.date || '').localeCompare(a.date || ''));
    return '<div class="page-h"><h1>' + t('quotes') + '</h1><div class="act"><button class="btn" data-act="new-quote">' + t('new_quote') + '</button></div></div>' +
      (list.length ? '<div class="tbl-wrap"><table><thead><tr><th>' + t('th_no') + '</th><th>' + t('th_client') + '</th><th>' + t('th_date') + '</th><th>' + t('th_status') + '</th><th class="r">' + t('th_value') + '</th></tr></thead><tbody>' +
        list.map((q) => '<tr class="click" data-act="quote" data-id="' + q.id + '" tabindex="0"><td class="mono">' + esc(q.number) + '</td><td><b>' + esc(q.client) + '</b></td><td class="num">' + esc(fmtDate(q.date)) + '</td><td>' + pill(quoteKind[q.status] || '', t('qs_' + (q.status || 'draft'))) + '</td><td class="r num mono">' + money(quoteValue(q)) + '</td></tr>').join('') +
        '</tbody></table></div>' : '<p class="empty">' + t('e_quotelist') + '</p>');
  }
  function blankQuote(pre) {
    const ar = (pre && pre.lang) || 'en';
    return Object.assign({ client: '', clientTitle: '', lang: ar, date: todayISO(), validDays: 14, status: 'draft', intro: '',
      packages: [{ name: '', items: '', price: '', yearly: '', recommended: true }],
      payment: ar === 'ar' ? [{ label: 'بعد الموافقة على الديمو', pct: 30 }, { label: 'عند التسليم', pct: 70 }] : [{ label: 'After you approve the demo', pct: 30 }, { label: 'On delivery', pct: 70 }],
      notes: ar === 'ar' ? 'السنة الأولى مشمولة: استضافة، نسخ احتياطي وتصليحات.' : 'The first year is included: hosting, backups and fixes.' }, pre || {});
  }
  function quoteDoc(q) {
    const D = DOC[q.lang === 'ar' ? 'ar' : 'en'], st = S.settings;
    const valid = q.date ? addDays(q.date, +q.validDays || 14) : '';
    const fd = (iso) => { if (!iso) return ''; const x = new Date(iso + 'T12:00:00'); return x.toLocaleDateString(q.lang === 'ar' ? 'ar-LB' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' }); };
    const pkgs = (q.packages || []).filter((p) => p.name || p.price);
    return '<div class="doc" dir="' + (q.lang === 'ar' ? 'rtl' : 'ltr') + '" lang="' + (q.lang === 'ar' ? 'ar' : 'en') + '">' +
      '<div class="dh"><div class="dmark">s<span class="o"></span>lunera</div><div class="dmeta"><span>' + D.no + '</span><b class="mono">' + esc(q.number || '—') + '</b><span>' + D.date + ': ' + esc(fd(q.date)) + '</span><span>' + D.valid + ': ' + esc(fd(valid)) + '</span></div></div>' +
      '<div><h1>' + D.title + '</h1><p class="to">' + D.for + ': <b>' + esc((q.clientTitle ? q.clientTitle + ' ' : '') + (q.client || '')) + '</b></p></div>' +
      (q.intro ? '<p>' + esc(q.intro) + '</p>' : '') +
      '<div class="dpk">' + pkgs.map((p) => '<div class="pk' + (p.recommended && pkgs.length > 1 ? ' rec' : '') + '"><h3>' + esc(p.name) + (p.recommended && pkgs.length > 1 ? '<span class="tag">' + D.rec + '</span>' : '') + '</h3>' +
        '<div class="price"><b>' + money(p.price) + '</b><span>' + D.once + '</span>' + (p.yearly ? '<span style="display:block">' + esc(D.yearly.replace('{p}', money(p.yearly))) + '</span>' : '') + '</div>' +
        (p.items ? '<ul>' + String(p.items).split('\n').filter((x) => x.trim()).map((x) => '<li>' + esc(x) + '</li>').join('') + '</ul>' : '') + '</div>').join('') + '</div>' +
      ((q.payment || []).length ? '<div><h3 style="font-size:15px;margin-bottom:8px">' + D.pay + '</h3><div class="terms">' + q.payment.map((s) => '<div><b>' + (+s.pct || 0) + '%</b><span>' + esc(s.label) + '</span></div>').join('') + '</div></div>' : '') +
      (q.notes ? '<div><h3 style="font-size:15px;margin-bottom:6px">' + D.notes + '</h3><p class="notes">' + esc(q.notes) + '</p></div>' : '') +
      '<div class="sign"><div><small>' + D.signed + '</small><div class="sig">' + esc(st.signer || '') + '</div><small>' + esc(st.signer || '') + ' · ' + esc(q.lang === 'ar' ? st.signerTitle_ar || '' : st.signerTitle_en || '') + '</small></div>' +
      '<div class="contact">' + esc(st.phone || '') + '<br>' + esc(st.instagram || '') + (st.email ? '<br>' + esc(st.email) : '') + '</div></div></div>';
  }
  function quoteEditor(q0) {
    const q = JSON.parse(JSON.stringify(q0 && q0.id ? q0 : blankQuote(q0)));
    const sh = openSheet(head(q.id ? q.number + ' · ' + (q.client || '') : t('new_quote')) + '<div class="qed"><div class="qform" id="qf"></div><div class="qprev-wrap"><div id="qprev"></div></div></div>' +
      '<div class="sheet-f">' + (q.id ? '<div class="l"><button class="btn danger sm" data-act="del" data-col="quotes" data-id="' + q.id + '">' + t('del') + '</button><button class="btn quiet sm" id="q-dup">' + t('duplicate') + '</button></div>' : '') +
      '<button class="btn ghost" id="q-print">' + t('print') + '</button><button class="btn" id="q-save">' + t('save') + '</button></div>', { wide: true });
    const form = $('#qf', sh);
    function drawForm() {
      const pct = (q.payment || []).reduce((a, s) => a + (+s.pct || 0), 0);
      form.innerHTML =
        '<div class="grid2">' + fld(t('q_client') + ' *', inp('client', q.client, 'text', 'data-q="client"'), 'full') +
        fld(t('q_title'), inp('clientTitle', q.clientTitle, 'text', 'data-q="clientTitle" placeholder="' + (q.lang === 'ar' ? 'الأستاذ / الدكتور' : 'Mr. / Dr.') + '"')) +
        fld(t('q_lang'), sel('lang', q.lang, [['en', 'English'], ['ar', 'العربية']])) +
        fld(t('q_date'), inp('date', q.date, 'date', 'data-q="date"')) + fld(t('q_valid'), inp('validDays', q.validDays, 'number', 'data-q="validDays" min="1"')) +
        fld(t('q_status'), sel('status', q.status, QUOTE_ST.map((s) => [s, t('qs_' + s)])), 'full') + '</div>' +
        fld(t('q_intro'), area('intro', q.intro, 'data-q="intro" style="min-height:70px"')) +
        '<h3 style="font-size:16px">' + t('packages') + '</h3>' +
        q.packages.map((p, i) => '<div class="pkg"><div class="ph2"><span>' + t('pkg', { n: i + 1 }) + '</span><span style="display:flex;gap:8px;align-items:center"><label style="display:flex;gap:6px;align-items:center"><input type="radio" name="rec" data-rec="' + i + '"' + (p.recommended ? ' checked' : '') + '> ' + t('p_rec') + '</label>' + (q.packages.length > 1 ? '<button type="button" class="btn quiet sm" data-rm-pkg="' + i + '">' + t('remove') + '</button>' : '') + '</span></div>' +
          fld(t('p_name'), '<input class="inp" data-pk="' + i + '" data-f="name" value="' + esc(p.name) + '">') +
          fld(t('p_items'), '<textarea class="inp" data-pk="' + i + '" data-f="items" style="min-height:70px">' + esc(p.items) + '</textarea>') +
          '<div class="grid2">' + fld(t('p_price'), '<input class="inp" type="number" min="0" step="50" data-pk="' + i + '" data-f="price" value="' + esc(p.price) + '">') + fld(t('p_yearly'), '<input class="inp" type="number" min="0" step="50" data-pk="' + i + '" data-f="yearly" value="' + esc(p.yearly) + '">') + '</div></div>').join('') +
        '<button type="button" class="btn ghost sm" id="add-pkg" style="justify-self:start">+ ' + t('add_pkg') + '</button>' +
        '<h3 style="font-size:16px;display:flex;justify-content:space-between">' + t('payment') + '<span class="mono ' + (pct === 100 ? 'muted' : 'late') + '">' + t('total_pct', { p: pct }) + '</span></h3>' +
        q.payment.map((s, i) => '<div class="paygrid"><input class="inp" data-pay="' + i + '" data-f="label" value="' + esc(s.label) + '" aria-label="' + t('payment') + '"><input class="inp" type="number" min="0" max="100" data-pay="' + i + '" data-f="pct" value="' + esc(s.pct) + '" aria-label="%"><button type="button" class="x" data-rm-pay="' + i + '" aria-label="' + t('remove') + '">×</button></div>').join('') +
        '<button type="button" class="btn ghost sm" id="add-pay" style="justify-self:start">+ ' + t('add_stage') + '</button>' +
        fld(t('q_notes'), area('notes', q.notes, 'data-q="notes"'));
      $('#f-lang', form).onchange = (e) => { q.lang = e.target.value; drawForm(); drawPrev(); };
      $('#f-status', form).onchange = (e) => { q.status = e.target.value; };
      $('#add-pkg', form).onclick = () => { q.packages.push({ name: '', items: '', price: '', yearly: '', recommended: false }); drawForm(); drawPrev(); };
      $('#add-pay', form).onclick = () => { q.payment.push({ label: '', pct: 0 }); drawForm(); drawPrev(); };
      $$('[data-rm-pkg]', form).forEach((b) => b.onclick = () => { const wasRec = q.packages[+b.dataset.rmPkg].recommended; q.packages.splice(+b.dataset.rmPkg, 1); if (wasRec && q.packages[0]) q.packages[0].recommended = true; drawForm(); drawPrev(); });
      $$('[data-rm-pay]', form).forEach((b) => b.onclick = () => { q.payment.splice(+b.dataset.rmPay, 1); drawForm(); drawPrev(); });
      $$('[data-rec]', form).forEach((r) => r.onchange = () => { q.packages.forEach((p, i) => { p.recommended = i === +r.dataset.rec; }); drawPrev(); });
    }
    form.addEventListener('input', (e) => {
      const el = e.target;
      if (el.dataset.q) q[el.dataset.q] = el.type === 'number' ? (el.value === '' ? '' : +el.value) : el.value;
      else if (el.dataset.pk) q.packages[+el.dataset.pk][el.dataset.f] = el.type === 'number' ? (el.value === '' ? '' : +el.value) : el.value;
      else if (el.dataset.pay) { q.payment[+el.dataset.pay][el.dataset.f] = el.type === 'number' ? +el.value : el.value; if (el.type === 'number') { const pct = q.payment.reduce((a, s) => a + (+s.pct || 0), 0); const h = el.closest('.qform').querySelector('h3 .mono:last-child'); $$('h3 .mono', form).forEach((x) => { x.textContent = t('total_pct', { p: pct }); x.className = 'mono ' + (pct === 100 ? 'muted' : 'late'); }); void h; } }
      drawPrev();
    });
    function drawPrev() {
      const box = $('#qprev', sh); box.innerHTML = quoteDoc(q);
      const w = box.parentNode.clientWidth - 40, doc = $('.doc', box);
      if (doc && w > 0) doc.style.zoom = Math.min(1, w / 794).toFixed(3);
    }
    window.addEventListener('resize', () => { if (document.body.contains(sh)) drawPrev(); });
    drawForm(); drawPrev();
    async function save() {
      if (!q.client) { toast(t('err_required', { f: t('q_client') }), true); $('#f-client', sh).focus(); return null; }
      const body = Object.assign({}, q); delete body.id; delete body.number;
      const r = q.id ? await update('quotes', q.id, body) : await create('quotes', body);
      if (r && r.item) { Object.assign(q, r.item); $('.sheet-h h2', sh).textContent = q.number + ' · ' + q.client; drawPrev(); }
      return r;
    }
    $('#q-save', sh).onclick = save;
    $('#q-print', sh).onclick = async () => { if (!q.id) { const r = await save(); if (!r) return; } setTimeout(() => window.print(), 50); };
    const dup = $('#q-dup', sh);
    if (dup) dup.onclick = () => { const c = JSON.parse(JSON.stringify(q)); delete c.id; delete c.number; c.status = 'draft'; c.date = todayISO(); closeSheet(); quoteEditor(c); };
  }

  /* ========================= TASKS ========================= */
  function vTasks() {
    const projects = S.projects.slice().sort((a, b) => (a.status === 'done') - (b.status === 'done') || (a.deadline || '9').localeCompare(b.deadline || '9'));
    if (!projects.length) return '<div class="page-h"><h1>' + t('tasks') + '</h1><div class="act"><button class="btn" data-act="new-project">' + t('new_project') + '</button></div></div><p class="empty">' + t('e_projects') + '</p>';
    if (!projects.find((p) => p.id === ui.projectId)) ui.projectId = projects[0].id;
    const pr = projects.find((p) => p.id === ui.projectId);
    const tasks = S.tasks.filter((x) => x.projectId === pr.id && (ui.taskWho === 'all' || x.assignee === ui.taskWho));
    const who = [['all', t('all_people')]].concat(S.users.map((u) => [u.id, u.name]));
    return '<div class="page-h"><h1>' + t('tasks') + '</h1><div class="act"><select class="inp" id="task-who" style="width:auto" aria-label="' + t('t_assignee') + '">' + who.map((w) => '<option value="' + w[0] + '"' + (w[0] === ui.taskWho ? ' selected' : '') + '>' + esc(w[1]) + '</option>').join('') + '</select><button class="btn ghost" data-act="edit-project">' + t('edit_project') + '</button><button class="btn" data-act="new-project">' + t('new_project') + '</button></div></div>' +
      '<div class="proj-tabs" role="group">' + projects.map((p) => { const open = S.tasks.filter((x) => x.projectId === p.id && x.status !== 'done').length; return '<button data-act="project" data-id="' + p.id + '" aria-pressed="' + (p.id === pr.id) + '"><span>' + esc(p.name) + (p.status === 'done' ? ' ✓' : '') + '</span><small>' + esc(t('open_tasks', { n: open })) + (p.deadline ? ' · ' + esc(fmtDate(p.deadline)) : '') + '</small></button>'; }).join('') + '</div>' +
      '<div class="board" data-board="tasks">' + TASK_ST.map((st) => {
        const items = tasks.filter((x) => x.status === st).sort((a, b) => (b.priority === 'high') - (a.priority === 'high') || (a.due || '9').localeCompare(b.due || '9'));
        return '<div class="colm" data-drop="' + st + '"><h3><span>' + t('ts_' + st) + ' <b>' + items.length + '</b></span></h3>' +
          items.map((x) => '<button class="tcard" draggable="true" data-drag="' + x.id + '" data-act="task" data-id="' + x.id + '"><span class="t">' + esc(x.title) + '</span><span class="m">' + avatar(x.assignee) + (x.priority === 'high' ? '<span class="hi">' + t('pr_high') + '</span>' : '') + (x.due && st !== 'done' ? '<span class="mono">' + dueLabel(x.due) + '</span>' : '') + '</span></button>').join('') +
          '<form class="addt" data-add="' + st + '"><input id="add-' + st + '" placeholder="' + t('add_task') + '" aria-label="' + t('add_task') + '" autocomplete="off"></form></div>';
      }).join('') + '</div>';
  }
  function taskForm(x) {
    const sh = openSheet(head(x.title) +
      '<form class="grid2" id="tf">' + fld(t('t_title'), inp('title', x.title), 'full') +
      fld(t('t_project'), sel('projectId', x.projectId, S.projects.map((p) => [p.id, p.name]))) + fld(t('d_status'), sel('status', x.status, TASK_ST.map((s) => [s, t('ts_' + s)]))) +
      fld(t('t_assignee'), sel('assignee', x.assignee, peopleOpts())) + fld(t('t_due'), inp('due', x.due, 'date')) +
      fld(t('t_priority'), sel('priority', x.priority || 'normal', [['low', t('pr_low')], ['normal', t('pr_normal')], ['high', t('pr_high')]])) +
      fld(t('t_notes'), area('notes', x.notes), 'full') +
      '</form><div class="sheet-f"><div class="l"><button class="btn danger sm" data-act="del" data-col="tasks" data-id="' + x.id + '">' + t('del') + '</button></div><button class="btn" id="tf-save">' + t('save') + '</button></div>');
    $('#tf-save', sh).onclick = async () => { const o = formObj($('#tf', sh)); if (!o.title) return; if (await update('tasks', x.id, o)) closeSheet(); };
  }
  function projectForm(p) {
    p = p || { status: 'active' };
    const sh = openSheet(head(p.id ? p.name : t('new_project')) +
      '<form class="grid2" id="pf">' + fld(t('pr_name') + ' *', inp('name', p.name), 'full') + fld(t('pr_client'), inp('client', p.client)) + fld(t('pr_deadline'), inp('deadline', p.deadline, 'date')) +
      fld(t('pr_status'), sel('status', p.status, [['active', t('pr_active')], ['done', t('pr_done')]])) + '</form>' +
      '<div class="sheet-f">' + (p.id ? '<div class="l"><button class="btn danger sm" data-act="del" data-col="projects" data-id="' + p.id + '">' + t('del') + '</button></div>' : '') + '<button class="btn" id="pf-save">' + t('save') + '</button></div>');
    $('#pf-save', sh).onclick = async () => {
      const o = formObj($('#pf', sh)); if (!o.name) { toast(t('err_required', { f: t('pr_name') }), true); return; }
      const r = p.id ? await update('projects', p.id, o) : await create('projects', o);
      if (r) { if (!p.id && r.item) { ui.projectId = r.item.id; lsSet('solhq_project', r.item.id); renderView(); } closeSheet(); }
    };
  }

  /* ========================= BOARD DRAG ========================= */
  function wireBoard() {
    const board = $('.board'); if (!board) return;
    const col = board.dataset.board;
    let dragId = null;
    $$('[data-drag]', board).forEach((c) => {
      c.addEventListener('dragstart', (e) => { dragId = c.dataset.drag; c.classList.add('dragging'); e.dataTransfer.effectAllowed = 'move'; try { e.dataTransfer.setData('text/plain', dragId); } catch (er) {} });
      c.addEventListener('dragend', () => { c.classList.remove('dragging'); $$('.colm', board).forEach((x) => x.classList.remove('over')); });
    });
    $$('[data-drop]', board).forEach((z) => {
      z.addEventListener('dragover', (e) => { e.preventDefault(); z.classList.add('over'); });
      z.addEventListener('dragleave', (e) => { if (!z.contains(e.relatedTarget)) z.classList.remove('over'); });
      z.addEventListener('drop', (e) => {
        e.preventDefault(); z.classList.remove('over');
        const id = dragId || e.dataTransfer.getData('text/plain'), st = z.dataset.drop;
        const item = S[col].find((x) => x.id === id);
        if (item && item.status !== st) { item.status = st; renderView(); update(col, id, { status: st }, true); }
      });
    });
    $$('form[data-add]', board).forEach((f) => f.addEventListener('submit', async (e) => {
      e.preventDefault(); const i = $('input', f), title = i.value.trim(); if (!title) return;
      await create('tasks', { projectId: ui.projectId, title, status: f.dataset.add, assignee: ui.taskWho !== 'all' ? ui.taskWho : S.me.id, priority: 'normal', due: '' });
      const again = $('#add-' + f.dataset.add); if (again) again.focus();
    }));
  }

  /* ========================= PEOPLE ========================= */
  function vPeople() {
    if (!isOwner()) { ui.view = 'home'; return vHome(); }
    const st = S.settings;
    return '<div class="page-h"><h1>' + t('people') + '</h1><div class="act"><button class="btn" data-act="new-person">' + t('add_person') + '</button></div></div>' +
      '<div class="tbl-wrap" style="margin-bottom:40px"><table><thead><tr><th>' + t('pe_name') + '</th><th>' + t('pe_email') + '</th><th>' + t('pe_role') + '</th><th></th></tr></thead><tbody>' +
      S.users.map((u) => '<tr><td><span style="display:flex;gap:8px;align-items:center">' + avatar(u.id) + '<b>' + esc(u.name) + '</b>' + (u.id === S.me.id ? ' <span class="muted">(' + t('you') + ')</span>' : '') + '</span></td><td dir="ltr" style="text-align:start">' + esc(u.email) + '</td><td>' + t('role_' + u.role) + '</td><td class="r">' +
        (u.id !== S.me.id ? '<button class="btn quiet sm" data-act="reset-pw" data-id="' + u.id + '">' + t('reset_pw') + '</button><button class="btn quiet sm" data-act="del-person" data-id="' + u.id + '">' + t('del') + '</button>' : '') + '</td></tr>').join('') +
      '</tbody></table></div>' +
      '<h2 style="font-size:22px;margin-bottom:14px">' + t('settings') + '</h2><form class="grid3" id="sf" style="max-width:900px">' +
      fld(t('s_company'), inp('company', st.company)) + fld(t('s_phone'), inp('phone', st.phone, 'text', 'dir="ltr"')) + fld(t('s_ig'), inp('instagram', st.instagram, 'text', 'dir="ltr"')) +
      fld(t('s_email'), inp('email', st.email, 'email', 'dir="ltr"')) + fld(t('s_signer'), inp('signer', st.signer)) + fld(t('s_prefix'), inp('quotePrefix', st.quotePrefix, 'text', 'dir="ltr"')) +
      fld(t('s_title_en'), inp('signerTitle_en', st.signerTitle_en)) + fld(t('s_title_ar'), inp('signerTitle_ar', st.signerTitle_ar)) +
      '<div class="field" style="align-self:end"><button class="btn" type="submit">' + t('save') + '</button></div></form>';
  }
  function personForm() {
    const sh = openSheet(head(t('add_person')) + '<form class="grid2" id="uf">' + fld(t('pe_name') + ' *', inp('name', ''), 'full') + fld(t('pe_email') + ' *', inp('email', '', 'email', 'dir="ltr"')) + fld(t('pe_phone'), inp('phone', '', 'tel', 'dir="ltr"')) +
      fld(t('pe_role'), sel('role', 'sales', [['sales', t('role_sales')], ['dev', t('role_dev')], ['owner', t('role_owner')]])) + '</form><div id="uf-out"></div><div class="sheet-f"><button class="btn" id="uf-save">' + t('save') + '</button></div>');
    $('#uf-save', sh).onclick = async () => {
      const o = formObj($('#uf', sh)); if (!o.name || !o.email) { toast(t('err_required', { f: t('pe_email') }), true); return; }
      const r = await mutate('POST', '/api/hq/users', o, t('created'));
      if (r && r.password) { $('#uf-out', sh).innerHTML = '<p class="confirm" style="background:var(--okbg)">' + esc(t('pw_once', { n: o.name, p: r.password })) + '</p>'; $('#uf-save', sh).replaceWith(Object.assign(document.createElement('button'), { className: 'btn', textContent: t('close'), onclick: closeSheet })); }
    };
  }
  function passwordForm(forced) {
    const sh = openSheet(head(t('chg_pw')) + (forced ? '<p>' + t('must_change') + '</p>' : '') + '<form class="grid2" id="pwf">' + (forced ? '' : fld(t('cur_pw'), inp('current', '', 'password', 'autocomplete="current-password"'), 'full')) +
      fld(t('new_pw'), inp('next', '', 'password', 'autocomplete="new-password" minlength="8"'), 'full') + '</form><div class="sheet-f"><button class="btn" id="pw-save">' + t('save') + '</button></div>', { locked: forced });
    if (forced) { $('.x', sh).remove(); sh.parentNode.setAttribute('data-locked', '1'); }
    $('#pw-save', sh).onclick = async () => {
      try { await API.req('POST', '/api/auth/password', formObj($('#pwf', sh))); closeSheet(); toast(t('saved')); await loadState(); }
      catch (e) { toast(e.message, true); }
    };
  }
  function inquirySheet(x) {
    const sh = openSheet(head(x.name) + '<div class="detail"><dl>' +
      '<dt>' + t('received') + '</dt><dd>' + esc(new Date(x.createdAt).toLocaleString(lang === 'ar' ? 'ar-LB' : 'en-GB')) + '</dd>' +
      '<dt>' + t('v_business') + '</dt><dd>' + esc(x.business || '—') + '</dd>' +
      '<dt>' + t('v_phone') + '</dt><dd dir="ltr" style="text-align:start">' + esc(x.phone) + '</dd>' +
      '<dt>' + t('needs') + '</dt><dd>' + esc((x.needs || []).join(', ') || '—') + '</dd>' +
      '<dt>' + t('message') + '</dt><dd>' + esc(x.message || '—') + '</dd></dl></div>' +
      fld(t('in_status'), sel('status', x.status, [['new', t('in_new')], ['contacted', t('in_contacted')], ['closed', t('in_closed')]])) +
      '<div class="sheet-f"><div class="l"><button class="btn danger sm" data-act="del" data-col="inbox" data-id="' + x.id + '">' + t('del') + '</button></div><a class="btn ghost" href="https://wa.me/' + esc(String(x.phone).replace(/\D/g, '')) + '" target="_blank" rel="noopener">' + t('whatsapp') + '</a><button class="btn" id="in-visit">' + t('to_visit') + '</button></div>', { noFocus: true });
    $('#f-status', sh).onchange = (e) => update('inbox', x.id, { status: e.target.value });
    $('#in-visit', sh).onclick = async () => { if (x.status === 'new') await update('inbox', x.id, { status: 'contacted' }, true); closeSheet(); visitForm({ business: x.business || x.name, owner: x.name, phone: x.phone, wants: [(x.needs || []).join(', '), x.message].filter(Boolean).join('\n'), visitedOn: todayISO(), by: S.me.id, interest: 'warm', status: 'open', kind: 'other', photos: [] }); };
  }

  /* ========================= EVENTS ========================= */
  document.addEventListener('click', async (e) => {
    const a = e.target.closest('[data-act]'); if (!a) return;
    const act = a.dataset.act, id = a.dataset.id;
    const find = (col) => S[col].find((x) => x.id === id);
    switch (act) {
      case 'go': ui.view = a.dataset.v; location.hash = ui.view === 'home' ? '' : ui.view; closeSheet(); renderView(); window.scrollTo(0, 0); break;
      case 'close': closeSheet(); break;
      case 'lang': lang = lang === 'ar' ? 'en' : 'ar'; lsSet('solhq_lang', lang); closeSheet(); renderShell(); break;
      case 'logout': await API.req('POST', '/api/auth/logout').catch(() => {}); if (API.mode === 'server') showLogin(); break;
      case 'password': passwordForm(false); break;
      case 'reset-preview': Local.reset(); await loadState(); renderShell(); break;
      case 'filter': ui[a.dataset.k] = a.dataset.val; renderView(); break;
      case 'new-visit': visitForm(); break;
      case 'visit': visitDetail(id); break;
      case 'edit-visit': visitForm(find('visits')); break;
      case 'visit-demo': { const v = find('visits'); closeSheet(); demoForm({ client: v.business, what: v.wants, visitId: v.id, status: 'building', owner: S.me.id }); break; }
      case 'visit-quote': { const v = find('visits'); closeSheet(); quoteEditor({ client: v.business, clientTitle: '', intro: v.wants || '' }); break; }
      case 'new-demo': demoForm(); break;
      case 'mine-demos': ui.mineDemos = !ui.mineDemos; renderView(); break;
      case 'demo': if (!a.classList.contains('dragging')) demoForm(find('demos')); break;
      case 'demo-quote': { const d = find('demos'); closeSheet(); quoteEditor({ client: d.client, intro: d.what || '', packages: [{ name: d.what || '', items: '', price: d.price || '', yearly: '', recommended: true }] }); break; }
      case 'new-quote': quoteEditor(); break;
      case 'quote': quoteEditor(find('quotes')); break;
      case 'project': ui.projectId = id; lsSet('solhq_project', id); renderView(); break;
      case 'new-project': projectForm(); break;
      case 'edit-project': projectForm(S.projects.find((p) => p.id === ui.projectId)); break;
      case 'task': taskForm(find('tasks')); break;
      case 'inquiry': inquirySheet(find('inbox')); break;
      case 'new-person': personForm(); break;
      case 'reset-pw': { const r = await mutate('PATCH', '/api/hq/users/' + id, { resetPassword: true }); if (r && r.password) openSheet(head(t('reset_pw')) + '<p class="confirm" style="background:var(--okbg)">' + esc(t('pw_once', { n: user(id).name, p: r.password })) + '</p>'); break; }
      case 'del-person': confirmDel(a, async () => { await mutate('DELETE', '/api/hq/users/' + id, null, t('deleted')); }); break;
      case 'del': confirmDel(a, async () => { await remove(a.dataset.col, id); closeSheet(); }); break;
    }
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Enter' && e.target.matches('tr.click')) e.target.click(); });
  document.addEventListener('input', (e) => {
    if (e.target.id === 'search') { ui.q = e.target.value; const pos = e.target.selectionStart; renderView(); const s = $('#search'); if (s) { s.focus(); s.setSelectionRange(pos, pos); } }
  });
  document.addEventListener('change', (e) => { if (e.target.id === 'task-who') { ui.taskWho = e.target.value; renderView(); } });
  document.addEventListener('submit', async (e) => {
    if (e.target.id === 'sf') { e.preventDefault(); await mutate('PATCH', '/api/hq/settings', formObj(e.target), t('saved')); }
  });
  window.addEventListener('hashchange', () => { const h = location.hash.slice(1); if (VIEWS.includes(h) && h !== ui.view) { ui.view = h; renderView(); } });

  /* ========================= BOOT ========================= */
  function showLogin() {
    $('#root').hidden = true; $('#login').hidden = false; closeSheet();
    document.documentElement.lang = 'en'; document.documentElement.dir = 'ltr';
    setTimeout(() => $('#l-email').focus(), 30);
  }
  $('#login-f').addEventListener('submit', async (e) => {
    e.preventDefault(); $('#l-err').textContent = ''; $('#l-go').disabled = true;
    try {
      const r = await API.req('POST', '/api/auth/login', { email: $('#l-email').value, password: $('#l-pw').value });
      await loadState(); renderShell(); if (r.me && r.me.mustChange) passwordForm(true);
    } catch (er) { $('#l-err').textContent = er.status === 401 ? t('login_err') : er.message; }
    $('#l-go').disabled = false;
  });
  async function boot() {
    const h = location.hash.slice(1); if (VIEWS.includes(h)) ui.view = h;
    await API.detect();
    try { await loadState(); renderShell(); if (S.me.mustChange) passwordForm(true); }
    catch (e) { if (e.status === 401) showLogin(); else { $('#login').hidden = false; $('#l-err').textContent = e.message; } }
    if (API.mode === 'server') setInterval(async () => {
      if (ui.sheetOpen || document.hidden || !S || $('#root').hidden) return;
      if (document.activeElement && document.activeElement.matches('input, textarea, select')) return;
      try { const r = await API.req('GET', '/api/hq/rev'); if (r.rev !== S.rev) { await loadState(); renderView(); } } catch (e) {}
    }, 15000);
  }
  boot();
})();
