/* Solunera HQ — app. Built by Solunera — Kamel Nassif */
(function () {
'use strict';
var API = window.SolAPI, E = window.SolEngine, U = E.util;

/* ============ i18n ============ */
var AR = {
  'Overview':'نظرة عامة','Pipeline':'خط المبيعات','Businesses':'الأنشطة التجارية','Clients':'العملاء','Projects':'المشاريع','Billing':'الفواتير','Renewals':'التجديدات','Portfolio':'المعرض','Team':'الفريق','Settings':'الإعدادات','Activity':'السجل','My dashboard':'لوحتي',
  'Search':'بحث','Search anything…':'ابحث عن أي شيء…','Sign in':'تسجيل الدخول','Email':'البريد الإلكتروني','Password':'كلمة المرور','Wrong email or password':'البريد أو كلمة المرور غير صحيحة',
  'Sign out':'تسجيل الخروج','Change password':'تغيير كلمة المرور','Dark mode':'الوضع الليلي','Language':'اللغة','Notifications':'التنبيهات','Mark all read':'تعليم الكل كمقروء','No notifications':'لا توجد تنبيهات',
  'Add business':'إضافة نشاط','New client':'عميل جديد','New project':'مشروع جديد','Save':'حفظ','Cancel':'إلغاء','Delete':'حذف','Edit':'تعديل','Close':'إغلاق','Back':'رجوع','Add':'إضافة','Yes':'نعم','No':'لا','Confirm':'تأكيد',
  'new':'جديد','contacted':'تم التواصل','interested':'مهتم','offer':'عرض مُرسل','negotiating':'تفاوض','won':'تم الاتفاق','lost':'خسارة',
  'draft':'مسودة','sent':'مُرسل','accepted':'مقبول','rejected':'مرفوض','paid':'مدفوع','unpaid':'غير مدفوع','void':'ملغى','overdue':'متأخر',
  'planning':'تخطيط','building':'قيد البناء','live':'يعمل','maintenance':'صيانة','paused':'متوقف','ended':'منتهي','active':'نشط','prospect':'محتمل',
  'call':'اتصال','email':'بريد','offer ':'عرض','whatsapp':'واتساب','visit':'زيارة','meeting':'اجتماع','note':'ملاحظة','stage':'مرحلة',
  'Business name':'اسم النشاط','Type':'النوع','Contact person':'الشخص المسؤول','Role':'الصفة','Phone':'الهاتف','WhatsApp':'واتساب','Instagram':'إنستغرام','Facebook':'فيسبوك','Website':'الموقع','City':'المدينة','Country':'البلد','Address / area':'العنوان / المنطقة','Google Maps link':'رابط خرائط غوغل','Source':'المصدر','Notes':'ملاحظات','Next follow-up':'المتابعة القادمة','Rating':'التقييم','Budget':'الميزانية','Needs':'الاحتياجات','Tags':'وسوم','Owner':'المسؤول','Unassigned':'غير مُسند',
  'Offers':'العروض','New offer':'عرض جديد','Title':'العنوان','Services':'الخدمات','Setup price':'سعر التأسيس','Monthly':'الشهري','Monthly starts after (months)':'يبدأ الشهري بعد (أشهر)','Valid until':'صالح حتى','Mark sent':'تعليم كمُرسل','Accepted':'قُبل','Rejected':'رُفض',
  'Timeline':'الخط الزمني','Log activity':'تسجيل نشاط','What happened?':'ماذا حدث؟','Convert to client':'تحويل إلى عميل','Assign to':'إسناد إلى',
  'Follow-ups today':'متابعات اليوم','Overdue follow-ups':'متابعات متأخرة','New enquiries':'طلبات جديدة من الموقع','Recent wins':'آخر الصفقات',
  'Monthly recurring':'الدخل الشهري المتكرر','Collected this month':'المحصّل هذا الشهر','Collected this year':'المحصّل هذه السنة','Outstanding':'المستحق','Active clients':'العملاء النشطون','Pipeline value':'قيمة العروض المفتوحة','Monthly costs':'التكاليف الشهرية',
  'Revenue — last 12 months':'الإيرادات — آخر 12 شهراً','Upcoming & overdue':'القادم والمتأخر','Team this month':'الفريق هذا الشهر','Funnel':'مراحل البيع',
  'Contract ends':'نهاية العقد','Domain renewal':'تجديد النطاق','Hosting renewal':'تجديد الاستضافة','Monthly billing starts':'بدء الاشتراك الشهري','Invoice due':'فاتورة مستحقة',
  'Since':'منذ','Status':'الحالة','Lifetime paid':'إجمالي المدفوع','Unpaid':'غير مدفوع','Stack':'التقنيات','Hosting':'الاستضافة','Database':'قاعدة البيانات','Domain':'النطاق','Contract':'العقد','Vault':'الخزنة',
  'Provider':'المزوّد','Plan':'الخطة','URL':'الرابط','Monthly cost':'التكلفة الشهرية','Yearly cost':'التكلفة السنوية','Renewal date':'تاريخ التجديد','Registrar':'جهة التسجيل',
  'Contract start':'بداية العقد','Contract end':'نهاية العقد','Setup fee':'رسوم التأسيس','Setup paid':'تم دفع التأسيس','Monthly fee':'الاشتراك الشهري','Monthly starts on':'يبدأ الشهري في','Billing day':'يوم الفوترة',
  'Live URL':'رابط المشروع','Admin URL':'رابط لوحة التحكم','Repository':'المستودع','Start date':'تاريخ البدء','Delivery date':'تاريخ التسليم','End date':'تاريخ الانتهاء','Description':'الوصف',
  'Add secret':'إضافة سر','Label':'الاسم','Value':'القيمة','Reveal':'إظهار','Copy':'نسخ','Hidden again':'تم الإخفاء',
  'Mark paid':'تعليم كمدفوع','Mark unpaid':'إلغاء الدفع','Add invoice':'إضافة فاتورة','Amount':'المبلغ','Due':'الاستحقاق','Method':'الطريقة','Period':'الفترة',
  'Published':'منشور','Draft':'مسودة','Featured':'مميّز','Upload images':'رفع صور','Mobile screenshot':'صورة الموبايل','Year':'السنة','Category':'الفئة','Summary (EN)':'الملخص (إنجليزي)','Summary (AR)':'الملخص (عربي)','Result (EN)':'النتيجة (إنجليزي)','Result (AR)':'النتيجة (عربي)','Title (EN)':'العنوان (إنجليزي)','Title (AR)':'العنوان (عربي)',
  'Add team member':'إضافة عضو للفريق','Name':'الاسم','Temporary password':'كلمة مرور مؤقتة','Commission %':'العمولة %','Deactivate':'إيقاف','Activate':'تفعيل','New password':'كلمة مرور جديدة','Move businesses to':'نقل الأنشطة إلى','Personal link':'الرابط الشخصي',
  'Won':'صفقات','Conversion':'نسبة التحويل','Commission':'العمولة','Leads':'أنشطة','Offers sent':'عروض مُرسلة',
  'Company':'الشركة','Message templates':'قوالب الرسائل','WhatsApp alerts':'تنبيهات واتساب','Send test':'إرسال تجربة','Backup':'نسخ احتياطي','Download backup':'تنزيل نسخة','Restore':'استعادة',
  'Your link':'رابطك','Share it with businesses — enquiries through it are assigned to you.':'شاركه مع الأنشطة — كل طلب يأتي عبره يُسند إليك تلقائياً.',
  'All':'الكل','Mine':'أنشطتي','Board':'لوحة','List':'قائمة','days':'يوم','today':'اليوم','tomorrow':'غداً','yesterday':'أمس','ago':'مضت','in':'بعد',
  'Nothing here yet':'لا شيء هنا بعد','Saved':'تم الحفظ','Deleted':'تم الحذف','Copied':'تم النسخ','Are you sure?':'هل أنت متأكد؟','This cannot be undone.':'لا يمكن التراجع عن هذا.',
  'Choose a template':'اختر قالباً','Open WhatsApp':'فتح واتساب','Welcome':'أهلاً','Good morning':'صباح الخير','Good evening':'مساء الخير',
  'Client':'العميل','Project':'المشروع','Invoices':'الفواتير','Info':'المعلومات','Tech & hosting':'التقنية والاستضافة','Contract & billing':'العقد والفوترة','Overview tab':'نظرة عامة',
  'After first year':'بعد السنة الأولى','per year':'بالسنة','Open':'فتح','Preview mode — sample data stored in this browser only.':'وضع المعاينة — بيانات أمثلة محفوظة في هذا المتصفح فقط.'
};
var S = { lang: 'en' };
try { S.lang = localStorage.getItem('sol_hq_lang') || 'en'; } catch (e) {}
var ENX = { 'Overview tab': 'Overview', offer: 'Offer sent', won: 'Won', lost: 'Lost', real_estate: 'Real estate' };
function t(en) { if (S.lang === 'ar') return AR[en] || en; if (ENX[en]) return ENX[en]; return /^[a-z_]+$/.test(en) ? (en.charAt(0).toUpperCase() + en.slice(1)).replace(/_/g, ' ') : en; }
function applyLang() { document.documentElement.lang = S.lang; document.documentElement.dir = S.lang === 'ar' ? 'rtl' : 'ltr'; }
applyLang();

/* ============ helpers ============ */
var $ = function (s, r) { return (r || document).querySelector(s); };
var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
function ic(id, s) { s = s || 18; return '<svg class="i" style="width:' + s + 'px;height:' + s + 'px"><use href="#i-' + id + '"/></svg>'; }
function money(n) { var v = Math.round((+n || 0) * 100) / 100; return '$' + v.toLocaleString('en-US', { maximumFractionDigits: 2 }); }
function today() { return U.todayStr(Date.now()); }
var MON = { en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], ar: ['كانون ٢', 'شباط', 'آذار', 'نيسان', 'أيار', 'حزيران', 'تموز', 'آب', 'أيلول', 'تشرين ١', 'تشرين ٢', 'كانون ١'] };
function dfmt(s) { if (!s) return '—'; var m = +s.slice(5, 7) - 1; return +s.slice(8, 10) + ' ' + MON[S.lang][m] + ' ' + s.slice(0, 4); }
function dshort(s) { if (!s) return ''; return +s.slice(8, 10) + ' ' + MON[S.lang][+s.slice(5, 7) - 1]; }
function mfmt(ym) { return S.lang === 'ar' ? (+ym.slice(5, 7)) + '/' + ym.slice(2, 4) : MON.en[+ym.slice(5, 7) - 1] + ' ' + ym.slice(2, 4); }
function tsDate(ms) { return new Date(ms + 3 * 3600e3).toISOString().slice(0, 10); }
function ago(ms) { var s = (Date.now() - ms) / 1000; if (s < 60) return S.lang === 'ar' ? 'الآن' : 'now'; var v, u; if (s < 3600) { v = Math.floor(s / 60); u = S.lang === 'ar' ? 'د' : 'm'; } else if (s < 86400) { v = Math.floor(s / 3600); u = S.lang === 'ar' ? 'س' : 'h'; } else { v = Math.floor(s / 86400); u = S.lang === 'ar' ? 'ي' : 'd'; } return S.lang === 'ar' ? 'قبل ' + v + u : v + u + ' ago'; }
function rel(d) { if (!d) return ''; var n = U.daysBetween(today(), d); if (n === 0) return t('today'); if (n === 1) return t('tomorrow'); if (n === -1) return t('yesterday'); return S.lang === 'ar' ? (n > 0 ? 'بعد ' + n + ' يوم' : 'منذ ' + (-n) + ' يوم') : (n > 0 ? 'in ' + n + 'd' : (-n) + 'd ago'); }
function waUrl(p, text) { var d = U.phoneNorm(p); if (d.indexOf('0') === 0) d = '961' + d.slice(1); return d.length >= 8 ? 'https://wa.me/' + d + (text ? '?text=' + encodeURIComponent(text) : '') : null; }
function toast(msg, kind, onclick) { var el = document.createElement('div'); el.className = 'toast' + (kind ? ' ' + kind : ''); el.innerHTML = msg; if (onclick) el.onclick = function () { onclick(); el.remove(); }; $('#toasts').appendChild(el); setTimeout(function () { el.style.transition = 'opacity .4s'; el.style.opacity = 0; setTimeout(function () { el.remove(); }, 400); }, kind === 'hot' ? 9000 : 3500); }
function copy(txt) { if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(function () { toast(t('Copied')); }, function () { toast(esc(txt)); }); else toast(esc(txt)); }
function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
var STAGES = U.STAGES;
function stPill(st) { var map = { new: 'p-mute', contacted: 'p-info', interested: 'p-info', offer: 'p-acc', negotiating: 'p-warn', won: 'p-ok', lost: 'p-bad' }; return '<span class="pill ' + (map[st] || 'p-mute') + '"><i></i>' + t(st) + '</span>'; }
function pPill(st) { var map = { planning: 'p-mute', building: 'p-info', live: 'p-ok', maintenance: 'p-acc', paused: 'p-warn', ended: 'p-mute', active: 'p-ok', prospect: 'p-mute' }; return '<span class="pill ' + (map[st] || 'p-mute') + '"><i></i>' + t(st) + '</span>'; }
function oPill(st) { var map = { draft: 'p-mute', sent: 'p-acc', accepted: 'p-ok', rejected: 'p-bad' }; return '<span class="pill ' + map[st] + '"><i></i>' + t(st) + '</span>'; }
function iPill(i) { var st = invState(i); var map = { paid: 'p-ok', unpaid: 'p-warn', overdue: 'p-bad', void: 'p-mute' }; return '<span class="pill ' + map[st] + '"><i></i>' + t(st) + '</span>'; }
function invState(i) { return i.status === 'unpaid' && i.dueDate < today() ? 'overdue' : i.status; }
var CATS = ['restaurant', 'cafe', 'hotel', 'clinic', 'dental', 'beauty', 'gym', 'retail', 'supermarket', 'real_estate', 'education', 'auto', 'agency', 'other'];
var CAT_AR = { restaurant: 'مطعم', cafe: 'مقهى', hotel: 'فندق', clinic: 'عيادة', dental: 'أسنان', beauty: 'تجميل', gym: 'نادي رياضي', retail: 'متجر', supermarket: 'سوبرماركت', real_estate: 'عقارات', education: 'تعليم', auto: 'سيارات', agency: 'وكالة', other: 'أخرى' };
function catName(c) { if (!c) return ''; return S.lang === 'ar' ? (CAT_AR[c] || c) : (c.charAt(0).toUpperCase() + c.slice(1)).replace('_', ' '); }
var SOURCES = ['field', 'instagram', 'google_maps', 'referral', 'website', 'facebook', 'cold_call', 'other'];
var SRC_AR = { field: 'زيارة ميدانية', instagram: 'إنستغرام', google_maps: 'خرائط غوغل', referral: 'توصية', website: 'الموقع', facebook: 'فيسبوك', cold_call: 'اتصال', other: 'أخرى' };
function srcName(s) { return S.lang === 'ar' ? (SRC_AR[s] || s || '—') : ((s || '—').replace('_', ' ')); }
var ACT_IC = { call: 'phone', whatsapp: 'wa', visit: 'pin', email: 'mail', meeting: 'users', note: 'note', stage: 'board', offer: 'offer' };

/* ============ state ============ */
var D = null; // server state
var X = { view: 'overview', seen: null, board: { who: 'all', q: '' }, list: { q: '', stage: 'all', who: 'all' }, bill: { tab: 'open' }, editing: null };
function isOwner() { return D && D.me.role === 'owner'; }
function user(id) { return (D.users || D.team || []).filter(function (u) { return u.id === id; })[0] || { name: '—' }; }
function lead(id) { return D.leads.filter(function (l) { return l.id === id; })[0]; }
function client(id) { return (D.clients || []).filter(function (c) { return c.id === id; })[0]; }
function project(id) { return (D.projects || []).filter(function (p) { return p.id === id; })[0]; }
function offersOf(lid) { return D.offers.filter(function (o) { return o.leadId === lid; }); }
function actsOf(lid) { return D.activities.filter(function (a) { return a.leadId === lid; }).sort(function (a, b) { return b.at - a.at; }); }
function initials(n) { return String(n || '?').trim().split(/\s+/).map(function (w) { return w[0]; }).slice(0, 2).join('').toUpperCase(); }
function siteBase() { return location.origin + '/'; }
function myLink(u) { return siteBase() + '?ref=' + encodeURIComponent((u || D.me).refCode || ''); }

function load(silent) {
  return API.get('/api/hq/state').then(function (st) {
    var first = !D; D = st; checkNotes(first);
    if (first) { renderShell(); route(); postLogin(); } else { renderBadges(); if (!busy()) renderView(); refreshDrawer(); }
  }).catch(function (e) { if (e.status === 401) { D = null; renderLogin(); } else if (!silent) toast(esc(e.message), 'err'); });
}
function busy() { var a = document.activeElement; return a && /INPUT|TEXTAREA|SELECT/.test(a.tagName) && !a.closest('#cmdk'); }
function act(p, ok) { return p.then(function (r) { if (ok) toast(ok); return load(true).then(function () { return r; }); }).catch(function (e) { toast(esc(e.message), 'err'); throw e; }); }
var pollT;
function poll() { clearInterval(pollT); pollT = setInterval(function () { if (!D || document.hidden) return; API.get('/api/hq/rev').then(function (r) { if (r.rev !== D.meta.rev) load(true); }).catch(function (e) { if (e.status === 401) { D = null; renderLogin(); } }); }, 5000); }
API.onExternalChange(function () { if (D) load(true); });

var actx = null;
function chime() { try { actx = actx || new (window.AudioContext || window.webkitAudioContext)(); [660, 990, 1320].forEach(function (f, i) { var o = actx.createOscillator(), g = actx.createGain(), s = actx.currentTime + i * .12; o.frequency.value = f; g.gain.setValueAtTime(.0001, s); g.gain.exponentialRampToValueAtTime(.2, s + .02); g.gain.exponentialRampToValueAtTime(.0001, s + .4); o.connect(g); g.connect(actx.destination); o.start(s); o.stop(s + .45); }); } catch (e) {} }
function checkNotes(first) {
  if (first || !X.seen) { X.seen = {}; D.notifications.forEach(function (n) { X.seen[n.id] = 1; }); return; }
  D.notifications.forEach(function (n) { if (X.seen[n.id]) return; X.seen[n.id] = 1; chime(); toast('<b>' + (n.type === 'inquiry' ? t('New enquiries') : n.type === 'won' ? '🎉' : '🔔') + '</b> ' + esc(n.text), 'hot', function () { if (n.ref && lead(n.ref)) openLead(n.ref); }); });
}
function unread() { return D.notifications.filter(function (n) { return n.readBy.indexOf(D.me.id) < 0; }).length; }

/* ============ login ============ */
function renderLogin() {
  clearInterval(pollT); closeDrawer(); closeModal();
  $('#root').innerHTML = '<div class="login"><form class="login-card" id="lf"><img src="../media/logo-s.png" alt=""><div><h1 style="font-family:Syne,sans-serif;font-size:26px">Solunera HQ</h1><p style="color:var(--bar-dim)">' + (S.lang === 'ar' ? 'للفريق فقط' : 'Team access only') + '</p></div>' +
    '<div class="fld"><label for="le">' + t('Email') + '</label><input class="in" id="le" type="email" autocomplete="username" dir="ltr" required></div><div class="fld"><label for="lp">' + t('Password') + '</label><input class="in" id="lp" type="password" autocomplete="current-password" dir="ltr" required></div>' +
    '<p id="lerr" style="color:#FF8FA3" hidden></p><button class="btn btn-p" type="submit" style="justify-content:center;padding:11px">' + t('Sign in') + '</button>' +
    '<button type="button" class="btn" style="color:var(--bar-dim);justify-content:center" id="lLang">' + (S.lang === 'ar' ? 'English' : 'العربية') + '</button></form></div>';
  $('#lf').onsubmit = function (e) { e.preventDefault(); doLogin(); };
  $('#lLang').onclick = function () { S.lang = S.lang === 'ar' ? 'en' : 'ar'; lsSet('sol_hq_lang', S.lang); applyLang(); renderLogin(); };
  setTimeout(function () { var f = $('#le'); if (f) f.focus(); }, 50);
}
function doLogin() {
  try { actx = actx || new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {}
  API.post('/api/auth/login', { email: $('#le').value, password: $('#lp').value }).then(function () { D = null; X.seen = null; return load(); })
    .catch(function (e) { var er = $('#lerr'); er.textContent = e.status === 401 ? t('Wrong email or password') : e.message; er.hidden = false; });
}

/* ============ shell ============ */
var NAV_OWNER = [['overview', 'Overview', 'home'], ['pipeline', 'Pipeline', 'board'], ['businesses', 'Businesses', 'biz'], ['clients', 'Clients', 'client'], ['projects', 'Projects', 'proj'], ['billing', 'Billing', 'money'], ['renewals', 'Renewals', 'cal'], ['portfolio', 'Portfolio', 'image'], ['team', 'Team', 'team'], ['settings', 'Settings', 'gear'], ['log', 'Activity', 'log']];
var NAV_EMP = [['overview', 'My dashboard', 'home'], ['pipeline', 'Pipeline', 'board'], ['businesses', 'Businesses', 'biz']];
function nav() { return isOwner() ? NAV_OWNER : NAV_EMP; }
function renderShell() {
  $('#root').innerHTML = '<div id="pv" class="pv" hidden>' + t('Preview mode — sample data stored in this browser only.') + '</div><header class="top"><div class="top-in"><a class="logo" href="#overview"><img src="../media/logo-s.png" alt="">Solunera <small>HQ</small></a>' +
    '<nav class="tabs-top" id="tabs"></nav>' +
    '<button class="kbtn" id="kb">' + ic('search', 15) + '<span>' + t('Search') + '</span><kbd>Ctrl K</kbd></button>' +
    '<div style="position:relative"><button class="tb" id="bell" aria-label="' + t('Notifications') + '">' + ic('bell') + '<span class="dot" id="bdot" hidden></span></button><div class="notif" id="notif" hidden></div></div>' +
    '<div style="position:relative"><button class="tb" id="meBtn" aria-label="Account"><span class="av">' + esc(initials(D.me.name)) + '</span></button><div class="menu-pop" id="meMenu" hidden></div></div></div></header><main class="page" id="page"></main>';
  API.mode().then(function (m) { $('#pv').hidden = m !== 'preview'; });
  $('#kb').onclick = openCmdk;
  $('#bell').onclick = function (e) { e.stopPropagation(); var n = $('#notif'); n.hidden = !n.hidden; $('#meMenu').hidden = true; if (!n.hidden) renderNotif(); };
  $('#meBtn').onclick = function (e) { e.stopPropagation(); var m = $('#meMenu'); m.hidden = !m.hidden; $('#notif').hidden = true; if (!m.hidden) renderMe(); };
  document.addEventListener('click', function (e) { if (!e.target.closest('#notif,#bell') && $('#notif')) $('#notif').hidden = true; if (!e.target.closest('#meMenu,#meBtn') && $('#meMenu')) $('#meMenu').hidden = true; });
  renderTabs(); poll();
}
function renderTabs() {
  var pend = isOwner() ? D.leads.filter(function (l) { return !l.ownerId; }).length : 0;
  var ovd = isOwner() ? (D.invoices || []).filter(function (i) { return invState(i) === 'overdue'; }).length : 0;
  $('#tabs').innerHTML = nav().map(function (n) { var c = n[0] === 'businesses' && pend ? pend : n[0] === 'billing' && ovd ? ovd : 0; return '<a href="#' + n[0] + '" class="' + (X.view === n[0] ? 'on' : '') + '">' + ic(n[2], 16) + '<span>' + t(n[1]) + '</span>' + (c ? '<span class="c">' + c + '</span>' : '') + '</a>'; }).join('');
}
function renderBadges() { renderTabs(); var u = unread(); $('#bdot').textContent = u > 9 ? '9+' : u; $('#bdot').hidden = !u; }
function renderMe() {
  $('#meMenu').innerHTML = '<div style="padding:10px 10px 8px"><b>' + esc(D.me.name) + '</b><div class="muted sm">' + esc(D.me.email) + '</div></div>' +
    '<button id="mLang">' + ic('globe') + (S.lang === 'ar' ? 'English' : 'العربية') + '</button><button id="mTheme">' + ic('moon') + t('Dark mode') + '</button><button id="mPw">' + ic('key') + t('Change password') + '</button><a href="' + esc(siteBase()) + '" target="_blank" rel="noopener">' + ic('web') + (S.lang === 'ar' ? 'الموقع العام' : 'Public website') + '</a><button id="mOut" style="color:var(--bad)">' + ic('out') + t('Sign out') + '</button>';
  $('#mLang').onclick = function () { S.lang = S.lang === 'ar' ? 'en' : 'ar'; lsSet('sol_hq_lang', S.lang); applyLang(); renderShell(); route(); };
  $('#mTheme').onclick = function () { var cur = document.documentElement.getAttribute('data-theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'), nx = cur === 'dark' ? 'light' : 'dark'; document.documentElement.setAttribute('data-theme', nx); lsSet('sol_hq_theme', nx); };
  $('#mPw').onclick = function () { pwModal(false); };
  $('#mOut').onclick = function () { API.post('/api/auth/logout').then(function () { D = null; renderLogin(); }); };
}
(function () { try { var th = localStorage.getItem('sol_hq_theme'); if (th) document.documentElement.setAttribute('data-theme', th); } catch (e) {} })();
function renderNotif() {
  var l = D.notifications.slice(0, 40);
  $('#notif').innerHTML = '<div class="card-h"><h3>' + t('Notifications') + '</h3><div class="sp"><button class="btn btn-s btn-sm" id="nRead">' + t('Mark all read') + '</button></div></div>' +
    (l.length ? l.map(function (n) { return '<div class="n' + (n.readBy.indexOf(D.me.id) < 0 ? ' un' : '') + '" data-ref="' + esc(n.ref || '') + '">' + ic(n.type === 'inquiry' ? 'mail' : n.type === 'won' ? 'check' : 'bell', 16) + '<div><div>' + esc(n.text) + '</div><div class="muted sm">' + ago(n.at) + '</div></div></div>'; }).join('') : '<div class="empty">' + t('No notifications') + '</div>');
  $('#nRead').onclick = function () { act(API.post('/api/hq/notifications/read')); $('#notif').hidden = true; };
  $$('#notif [data-ref]').forEach(function (el) { el.onclick = function () { if (el.dataset.ref && lead(el.dataset.ref)) openLead(el.dataset.ref); $('#notif').hidden = true; }; });
}

/* ============ routing ============ */
function route() {
  var h = (location.hash || '').slice(1) || 'overview';
  if (!nav().some(function (n) { return n[0] === h; })) h = 'overview';
  X.view = h; renderBadges(); renderView();
}
addEventListener('hashchange', function () { if (D) route(); });
var V = {};
function renderView() { if (!D || !$('#page')) return; var y = scrollY; V[X.view]($('#page')); scrollTo(0, y); }
function wire(el) {
  $$('[data-lead]', el).forEach(function (x) { x.addEventListener('click', function (e) { if (e.target.closest('button:not([data-lead]),a')) return; openLead(x.dataset.lead); }); });
  $$('[data-client]', el).forEach(function (x) { x.addEventListener('click', function (e) { if (e.target.closest('button:not([data-client]),a')) return; openClient(x.dataset.client); }); });
  $$('[data-project]', el).forEach(function (x) { x.addEventListener('click', function (e) { if (e.target.closest('button:not([data-project]),a')) return; openProject(x.dataset.project); }); });
}

/* ============ computations ============ */
function paidIn(from, to) { return (D.invoices || []).filter(function (i) { return i.status === 'paid' && i.paidAt && i.paidAt >= from && i.paidAt <= to; }).reduce(function (a, i) { return a + i.amount; }, 0); }
function outstanding() { return (D.invoices || []).filter(function (i) { return i.status === 'unpaid'; }).reduce(function (a, i) { return a + i.amount; }, 0); }
function monthlyCosts() { return (D.projects || []).filter(function (p) { return p.status !== 'ended'; }).reduce(function (a, p) { return a + (+(p.hosting || {}).monthlyCost || 0) + (+(p.database || {}).monthlyCost || 0) + (+(p.domain || {}).yearlyCost || 0) / 12; }, 0); }
function pipelineValue(leads) { return leads.filter(function (l) { return ['offer', 'negotiating', 'interested'].indexOf(l.stage) >= 0; }).reduce(function (a, l) { var o = offersOf(l.id).filter(function (x) { return x.status === 'sent' || x.status === 'draft'; }).pop(); return a + (o ? (o.setupPrice || 0) : 0); }, 0); }
function renewals(days) {
  var t = today(), lim = U.addDays(t, days || 60), out = [];
  (D.projects || []).forEach(function (p) {
    var c = client(p.clientId) || {}, k = p.contract || {};
    if (k.end && k.end <= lim && p.status !== 'ended') out.push({ d: k.end, kind: 'Contract ends', p: p, c: c, amt: k.monthlyFee ? money(k.monthlyFee) + '/mo' : '' });
    if ((p.domain || {}).renewalDate && p.domain.renewalDate <= lim) out.push({ d: p.domain.renewalDate, kind: 'Domain renewal', p: p, c: c, amt: p.domain.yearlyCost ? money(p.domain.yearlyCost) : '', extra: p.domain.name });
    if ((p.hosting || {}).renewalDate && p.hosting.renewalDate <= lim) out.push({ d: p.hosting.renewalDate, kind: 'Hosting renewal', p: p, c: c, extra: p.hosting.provider });
    if (k.monthlyStart && k.monthlyStart >= t && k.monthlyStart <= lim) out.push({ d: k.monthlyStart, kind: 'Monthly billing starts', p: p, c: c, amt: money(k.monthlyFee) + '/mo' });
  });
  (D.invoices || []).forEach(function (i) { if (i.status === 'unpaid' && i.dueDate <= lim) { var p = project(i.projectId) || {}; out.push({ d: i.dueDate, kind: 'Invoice due', p: p, c: client(i.clientId) || {}, amt: money(i.amount), inv: i }); } });
  return out.sort(function (a, b) { return a.d.localeCompare(b.d); });
}
function empStats(uid, from) {
  var ls = D.leads.filter(function (l) { return l.ownerId === uid; });
  var won = ls.filter(function (l) { return l.stage === 'won' && (!from || (l.wonAt && tsDate(l.wonAt) >= from)); });
  var lost = ls.filter(function (l) { return l.stage === 'lost'; });
  var acc = D.offers.filter(function (o) { return o.status === 'accepted' && ls.some(function (l) { return l.id === o.leadId; }) && (!from || (o.respondedAt && tsDate(o.respondedAt) >= from)); });
  var u = uid === D.me.id ? D.me : ((D.users || D.team).filter(function (x) { return x.id === uid; })[0] || {});
  var val = acc.reduce(function (a, o) { return a + (o.setupPrice || 0); }, 0);
  return { leads: ls.length, won: won.length, lost: lost.length, conv: won.length + lost.length ? Math.round(ls.filter(function (l) { return l.stage === 'won'; }).length / (ls.filter(function (l) { return l.stage === 'won' || l.stage === 'lost'; }).length || 1) * 100) : 0,
    value: val, commission: val * (u.commissionPct || 0) / 100, sent: D.offers.filter(function (o) { return o.status !== 'draft' && ls.some(function (l) { return l.id === o.leadId; }); }).length };
}
function followups(leads) { var t = today(); return leads.filter(function (l) { return l.nextFollowUp && l.nextFollowUp <= t && ['won', 'lost'].indexOf(l.stage) < 0; }).sort(function (a, b) { return a.nextFollowUp.localeCompare(b.nextFollowUp); }); }

function kpi(k, v, d, hi) { return '<div class="card kpi' + (hi ? ' hi' : '') + '"><div class="k">' + k + '</div><div class="v">' + v + '</div>' + (d ? '<div class="d">' + d + '</div>' : '') + '</div>'; }
function leadRow(l, right) { return '<div class="li" data-lead="' + l.id + '"><span class="av sm">' + esc(initials(l.name)) + '</span><div class="m"><b>' + esc(l.name) + '</b><span class="muted sm">' + esc(catName(l.category)) + (l.city ? ' · ' + esc(l.city) : '') + (isOwner() && l.ownerId ? ' · ' + esc(user(l.ownerId).name) : '') + '</span></div>' + (right || stPill(l.stage)) + '</div>'; }

function barChart(host, data, o) {
  var W = o.w || 640, H = o.h || 220, pb = 26, pt = 10, pl = 44, n = data.length, cw = (W - pl) / n, bw = Math.min(30, cw * .6);
  var max = Math.max.apply(null, data.map(function (d) { return d.v; }).concat([1])); var step = Math.pow(10, Math.floor(Math.log10(max))); max = Math.ceil(max / step) * step;
  var sy = function (v) { return pt + (H - pt - pb) * (1 - v / max); };
  var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(o.label || '') + '">';
  [0, .5, 1].forEach(function (f) { var v = f * max; s += '<line class="gl" x1="' + pl + '" x2="' + W + '" y1="' + sy(v) + '" y2="' + sy(v) + '"/><text class="ax" x="0" y="' + (sy(v) + 4) + '">' + (o.fmt ? o.fmt(v) : Math.round(v)) + '</text>'; });
  data.forEach(function (d, i) {
    var idx = S.lang === 'ar' ? n - 1 - i : i, cx = pl + (idx + .5) * cw, x = cx - bw / 2, y = sy(d.v), h = Math.max(0, H - pb - y), r = Math.min(4, h);
    s += '<g class="bg" data-i="' + i + '"><rect x="' + (cx - cw / 2) + '" y="' + pt + '" width="' + cw + '" height="' + (H - pt - pb) + '" fill="transparent"/>' + (h > 0 ? '<path class="bar' + (d.cls ? ' ' + d.cls : '') + '" d="M' + x + ',' + (H - pb) + 'V' + (y + r) + 'q0,-' + r + ' ' + r + ',-' + r + 'H' + (x + bw - r) + 'q' + r + ',0 ' + r + ',' + r + 'V' + (H - pb) + 'z"/>' : '') + '<text class="ax" x="' + cx + '" y="' + (H - 8) + '" text-anchor="middle">' + esc(d.label) + '</text></g>';
  });
  host.innerHTML = s + '</svg><div class="tip" hidden></div>'; host.style.position = 'relative';
  var tip = $('.tip', host), svg = $('svg', host);
  $$('.bg', host).forEach(function (g) { g.onmouseenter = function () { var i = +g.dataset.i, d = data[i], bb = svg.getBoundingClientRect(), idx = S.lang === 'ar' ? n - 1 - i : i; tip.textContent = d.tip; tip.hidden = false; tip.style.left = ((pl + (idx + .5) * cw) / W * bb.width) + 'px'; tip.style.top = (sy(d.v) / H * bb.height) + 'px'; }; g.onmouseleave = function () { tip.hidden = true; }; });
}

/* ============ overview ============ */
V.overview = function (el) { return isOwner() ? ownerOverview(el) : empOverview(el); };
function greet() { var h = new Date(Date.now() + 3 * 3600e3).getUTCHours(); return h < 12 ? t('Good morning') : t('Good evening'); }
function ownerOverview(el) {
  var t0 = today(), m0 = t0.slice(0, 8) + '01', y0 = t0.slice(0, 5) + '01-01';
  var coll = paidIn(m0, t0), yr = paidIn(y0, t0), out = outstanding(), ovd = (D.invoices || []).filter(function (i) { return invState(i) === 'overdue'; });
  var act = (D.clients || []).filter(function (c) { return c.status === 'active'; }).length, pv = pipelineValue(D.leads), costs = monthlyCosts();
  var inq = D.leads.filter(function (l) { return !l.ownerId || (l.source === 'website' && l.stage === 'new'); }).slice(-6).reverse();
  var fu = followups(D.leads), ren = renewals(45);
  var staff = (D.users || []).filter(function (u) { return u.role === 'employee' && u.active; });
  el.innerHTML = '<div class="ph"><div><h1>' + greet() + ', ' + esc(D.me.name.split(' ')[0]) + '</h1><div class="sub">' + dfmt(t0) + '</div></div><div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn btn-s" id="oLead">' + ic('plus', 16) + t('Add business') + '</button><button class="btn btn-p" id="oClient">' + ic('plus', 16) + t('New client') + '</button></div></div>' +
    '<div class="kpis">' + kpi(t('Monthly recurring'), money(D.mrr), (S.lang === 'ar' ? 'سنوياً ' : '×12 = ') + money(D.mrr * 12), true) + kpi(t('Collected this month'), money(coll), t('Collected this year') + ': ' + money(yr)) +
      kpi(t('Outstanding'), money(out), ovd.length ? '<span style="color:var(--bad);font-weight:600">' + ovd.length + ' ' + t('overdue') + ' · ' + money(ovd.reduce(function (a, i) { return a + i.amount; }, 0)) + '</span>' : '') +
      kpi(t('Active clients'), act, (D.projects || []).filter(function (p) { return p.status === 'live'; }).length + ' ' + (S.lang === 'ar' ? 'مشروع يعمل' : 'live projects')) + kpi(t('Pipeline value'), money(pv), D.leads.filter(function (l) { return ['won', 'lost'].indexOf(l.stage) < 0; }).length + ' ' + (S.lang === 'ar' ? 'نشاط مفتوح' : 'open businesses')) +
      kpi(t('Monthly costs'), money(costs), (S.lang === 'ar' ? 'الصافي الشهري ' : 'Net monthly ') + money(D.mrr - costs)) + '</div>' +
    '<div class="grid g-main"><div class="grid">' +
      '<div class="card"><div class="card-h"><h3>' + t('Revenue — last 12 months') + '</h3></div><div class="card-b chart" id="revC"></div></div>' +
      '<div class="card"><div class="card-h"><h3>' + t('Upcoming & overdue') + '</h3><div class="sp"><a class="btn btn-s btn-sm" href="#renewals">' + t('Renewals') + '</a></div></div><div class="lst scroll">' + (ren.length ? ren.slice(0, 12).map(renRow).join('') : '<div class="empty">' + t('Nothing here yet') + '</div>') + '</div></div>' +
    '</div><div class="grid">' +
      '<div class="card"><div class="card-h"><h3>' + t('New enquiries') + '</h3><span class="tag">' + D.leads.filter(function (l) { return !l.ownerId; }).length + '</span></div><div class="lst">' + (inq.length ? inq.map(function (l) { return leadRow(l, l.ownerId ? stPill(l.stage) : '<span class="pill p-warn"><i></i>' + t('Unassigned') + '</span>'); }).join('') : '<div class="empty">' + t('Nothing here yet') + '</div>') + '</div></div>' +
      '<div class="card"><div class="card-h"><h3>' + t('Funnel') + '</h3></div><div class="card-b funnel">' + funnel(D.leads) + '</div></div>' +
      '<div class="card"><div class="card-h"><h3>' + t('Team this month') + '</h3></div><div class="tw"><table><thead><tr><th>' + t('Name') + '</th><th class="n">' + t('Leads') + '</th><th class="n">' + t('Won') + '</th><th class="n">' + t('Commission') + '</th></tr></thead><tbody>' +
        staff.map(function (u) { var s = empStats(u.id, m0); return '<tr><td><span style="display:flex;gap:8px;align-items:center"><span class="av sm">' + esc(initials(u.name)) + '</span>' + esc(u.name) + '</span></td><td class="n">' + s.leads + '</td><td class="n">' + s.won + '</td><td class="n">' + money(s.commission) + '</td></tr>'; }).join('') + (staff.length ? '' : '<tr><td colspan="4" class="muted">' + (S.lang === 'ar' ? 'أضف أعضاء من صفحة الفريق' : 'Add team members from the Team page') + '</td></tr>') + '</tbody></table></div></div>' +
      (fu.length ? '<div class="card"><div class="card-h"><h3>' + t('Overdue follow-ups') + '</h3><span class="tag">' + fu.length + '</span></div><div class="lst scroll">' + fu.slice(0, 8).map(function (l) { return leadRow(l, '<span class="' + (l.nextFollowUp < today() ? 'due' : 'today') + ' sm">' + rel(l.nextFollowUp) + '</span>'); }).join('') + '</div></div>' : '') +
    '</div></div>';
  var months = []; for (var i = 11; i >= 0; i--) months.push(U.addMonths(t0.slice(0, 7), -i));
  barChart($('#revC'), months.map(function (m) { var v = paidIn(m + '-01', m + '-31'); return { label: mfmt(m), v: v, tip: mfmt(m) + ': ' + money(v), cls: m === t0.slice(0, 7) ? 'cur' : '' }; }), { h: 220, fmt: function (v) { return '$' + (v >= 1000 ? Math.round(v / 100) / 10 + 'k' : Math.round(v)); }, label: t('Revenue — last 12 months') });
  $('#oLead').onclick = function () { leadForm(); }; $('#oClient').onclick = function () { clientForm(); };
  wireRen(el); wire(el);
}
function funnel(leads) {
  var mx = Math.max.apply(null, STAGES.map(function (s) { return leads.filter(function (l) { return l.stage === s; }).length; }).concat([1]));
  return STAGES.map(function (s) { var n = leads.filter(function (l) { return l.stage === s; }).length; return '<div class="fr"><span>' + t(s) + '</span><div class="t"><i style="width:' + (n / mx * 100) + '%;background:var(--st-' + s + ')"></i></div><span class="n">' + n + '</span></div>'; }).join('');
}
function renRow(r) {
  var n = U.daysBetween(today(), r.d), cls = n < 0 ? 'due' : n <= 7 ? 'today' : 'muted';
  return '<div class="li" ' + (r.p && r.p.id ? 'data-project="' + r.p.id + '"' : '') + '><div class="date-chip"><b class="tn">' + +r.d.slice(8, 10) + '</b><span>' + MON[S.lang][+r.d.slice(5, 7) - 1] + '</span></div><div class="m"><b>' + t(r.kind) + (r.extra ? ' · ' + esc(r.extra) : '') + '</b><span class="muted sm">' + esc(r.c.name || '') + (r.p && r.p.name ? ' — ' + esc(r.p.name) : '') + '</span></div><span class="money sm">' + esc(r.amt || '') + '</span><span class="' + cls + ' sm" style="min-width:64px;text-align:end">' + rel(r.d) + '</span>' + (r.inv ? '<button class="btn btn-ok btn-sm" data-pay="' + r.inv.id + '">' + ic('check', 14) + '</button>' : '') + '</div>';
}
function wireRen(el) { $$('[data-pay]', el).forEach(function (b) { b.onclick = function (e) { e.stopPropagation(); payModal(b.dataset.pay); }; }); }
function empOverview(el) {
  var t0 = today(), m0 = t0.slice(0, 8) + '01', s = empStats(D.me.id), sm = empStats(D.me.id, m0), fu = followups(D.leads);
  var fresh = D.leads.filter(function (l) { return l.stage === 'new'; });
  el.innerHTML = '<div class="ph"><div><h1>' + greet() + ', ' + esc(D.me.name.split(' ')[0]) + '</h1><div class="sub">' + dfmt(t0) + '</div></div><button class="btn btn-p" id="eLead">' + ic('plus', 16) + t('Add business') + '</button></div>' +
    '<div class="kpis">' + kpi(t('Leads'), s.leads, fresh.length + ' ' + t('new')) + kpi(t('Offers sent'), s.sent, '') + kpi(t('Won'), s.won, (S.lang === 'ar' ? 'هذا الشهر ' : 'This month ') + sm.won) + kpi(t('Conversion'), s.conv + '%', '') + kpi(t('Commission'), money(s.commission), (D.me.commissionPct || 0) + '% · ' + (S.lang === 'ar' ? 'هذا الشهر ' : 'this month ') + money(sm.commission), true) + '</div>' +
    '<div class="card"><div class="card-h"><h3>' + ic('link', 16) + ' ' + t('Your link') + '</h3></div><div class="card-b" style="display:grid;gap:10px"><div class="link-box"><code>' + esc(myLink()) + '</code><button class="btn btn-s btn-sm" id="cpLink">' + ic('copy', 14) + t('Copy') + '</button></div><p class="muted sm">' + t('Share it with businesses — enquiries through it are assigned to you.') + '</p></div></div>' +
    '<div class="grid g2"><div class="card"><div class="card-h"><h3>' + t('Follow-ups today') + '</h3><span class="tag">' + fu.length + '</span></div><div class="lst scroll">' + (fu.length ? fu.map(function (l) { return leadRow(l, '<span class="' + (l.nextFollowUp < t0 ? 'due' : 'today') + ' sm">' + rel(l.nextFollowUp) + '</span>'); }).join('') : '<div class="empty">' + ic('check', 30) + t('Nothing here yet') + '</div>') + '</div></div>' +
    '<div class="card"><div class="card-h"><h3>' + t('Funnel') + '</h3></div><div class="card-b funnel">' + funnel(D.leads) + '</div></div></div>';
  $('#eLead').onclick = function () { leadForm(); }; $('#cpLink').onclick = function () { copy(myLink()); };
  wire(el);
}

/* ============ pipeline board ============ */
V.pipeline = function (el) {
  var b = X.board, q = b.q.toLowerCase();
  var ls = D.leads.filter(function (l) { return (b.who === 'all' || (b.who === 'none' ? !l.ownerId : l.ownerId === b.who)) && (!q || (l.name + ' ' + (l.city || '') + ' ' + (l.phone || '') + ' ' + (l.contactName || '')).toLowerCase().indexOf(q) >= 0); });
  var staff = (D.users || []).filter(function (u) { return u.active; });
  el.innerHTML = '<div class="ph"><div><h1>' + t('Pipeline') + '</h1><div class="sub">' + ls.length + ' · ' + money(pipelineValue(ls)) + '</div></div><div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center"><input class="in" id="bq" placeholder="' + t('Search') + '" value="' + esc(b.q) + '" style="width:200px">' +
    (isOwner() ? '<select class="in" id="bw" style="width:auto"><option value="all">' + t('All') + '</option><option value="none"' + (b.who === 'none' ? ' selected' : '') + '>' + t('Unassigned') + '</option>' + staff.map(function (u) { return '<option value="' + u.id + '"' + (b.who === u.id ? ' selected' : '') + '>' + esc(u.name) + '</option>'; }).join('') + '</select>' : '') +
    '<button class="btn btn-p" id="bAdd">' + ic('plus', 16) + t('Add business') + '</button></div></div>' +
    '<div class="board" id="board">' + STAGES.map(function (st) {
      var col = ls.filter(function (l) { return l.stage === st; }).sort(function (a, c) { return (a.nextFollowUp || '9') .localeCompare(c.nextFollowUp || '9'); });
      return '<div class="col" data-st="' + st + '"><div class="col-h"><i style="background:var(--st-' + st + ')"></i>' + t(st) + '<span class="c">' + col.length + '</span></div>' + col.map(card).join('') + '</div>';
    }).join('') + '</div>';
  function card(l) {
    var o = offersOf(l.id).slice(-1)[0], fu = l.nextFollowUp, t0 = today();
    return '<div class="lc" draggable="true" data-lead="' + l.id + '"><b>' + esc(l.name) + '</b><div class="meta"><span>' + esc(catName(l.category)) + '</span>' + (l.city ? '<span>' + ic('pin', 12) + esc(l.city) + '</span>' : '') + '</div>' +
      '<div class="meta">' + (o ? '<span class="money" style="color:var(--ink)">' + money(o.setupPrice) + (o.monthlyPrice ? ' +' + money(o.monthlyPrice) + '/mo' : '') + '</span>' : '') + (fu && ['won', 'lost'].indexOf(l.stage) < 0 ? '<span class="' + (fu < t0 ? 'due' : fu === t0 ? 'today' : '') + '">' + ic('cal', 12) + ' ' + rel(fu) + '</span>' : '') +
      (isOwner() ? '<span style="margin-inline-start:auto" title="' + esc(l.ownerId ? user(l.ownerId).name : t('Unassigned')) + '">' + (l.ownerId ? '<span class="av sm">' + esc(initials(user(l.ownerId).name)) + '</span>' : '<span class="pill p-warn">' + t('Unassigned') + '</span>') + '</span>' : '') + '</div></div>';
  }
  var qi = $('#bq'); qi.oninput = function () { b.q = qi.value; clearTimeout(qi._t); qi._t = setTimeout(function () { var p = qi.selectionStart; renderView(); var n = $('#bq'); n.focus(); n.setSelectionRange(p, p); }, 250); };
  if ($('#bw')) $('#bw').onchange = function () { b.who = this.value; renderView(); };
  $('#bAdd').onclick = function () { leadForm(); };
  var drag = null, board = $('#board');
  board.addEventListener('dragstart', function (e) { var c = e.target.closest('.lc'); if (!c) return; drag = c.dataset.lead; c.classList.add('drag'); e.dataTransfer.effectAllowed = 'move'; try { e.dataTransfer.setData('text/plain', drag); } catch (x) {} });
  board.addEventListener('dragend', function (e) { var c = e.target.closest('.lc'); if (c) c.classList.remove('drag'); $$('.col.over', board).forEach(function (x) { x.classList.remove('over'); }); });
  board.addEventListener('dragover', function (e) { var c = e.target.closest('.col'); if (!c || !drag) return; e.preventDefault(); $$('.col.over', board).forEach(function (x) { if (x !== c) x.classList.remove('over'); }); c.classList.add('over'); });
  board.addEventListener('drop', function (e) {
    e.preventDefault(); var c = e.target.closest('.col'); if (!c || !drag) return; var l = lead(drag), st = c.dataset.st; drag = null;
    if (!l || l.stage === st) return renderView();
    if (st === 'lost') { lostModal(l.id); return; }
    act(API.patch('/api/hq/leads/' + l.id, { stage: st }), esc(l.name) + ' → ' + t(st));
  });
  wire(el);
};

/* ============ businesses list ============ */
V.businesses = function (el) {
  var f = X.list, q = f.q.toLowerCase(), qd = q.replace(/\D/g, '');
  var ls = D.leads.filter(function (l) {
    if (f.stage !== 'all' && l.stage !== f.stage) return false;
    if (isOwner() && f.who !== 'all' && (f.who === 'none' ? !!l.ownerId : l.ownerId !== f.who)) return false;
    if (!q) return true;
    return (l.name + ' ' + (l.city || '') + ' ' + (l.contactName || '') + ' ' + (l.instagram || '') + ' ' + catName(l.category)).toLowerCase().indexOf(q) >= 0 || (qd.length >= 3 && U.phoneNorm(l.phone).indexOf(qd) >= 0);
  }).sort(function (a, b) { return (b.updatedAt || b.createdAt) - (a.updatedAt || a.createdAt); });
  var staff = (D.users || []).filter(function (u) { return u.active; });
  el.innerHTML = '<div class="ph"><div><h1>' + t('Businesses') + '</h1><div class="sub">' + ls.length + '</div></div><button class="btn btn-p" id="lAdd">' + ic('plus', 16) + t('Add business') + '</button></div>' +
    '<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center"><div class="seg" id="lSt">' + ['all'].concat(STAGES).map(function (s) { return '<button data-s="' + s + '" aria-pressed="' + (f.stage === s) + '">' + t(s === 'all' ? 'All' : s) + ' <span class="c">' + (s === 'all' ? D.leads.length : D.leads.filter(function (l) { return l.stage === s; }).length) + '</span></button>'; }).join('') + '</div></div>' +
    '<div class="card"><div class="card-h" style="flex-wrap:wrap"><input class="in" id="lq" placeholder="' + t('Search') + '" value="' + esc(f.q) + '" style="max-width:320px">' + (isOwner() ? '<select class="in" id="lw" style="width:auto"><option value="all">' + t('All') + '</option><option value="none"' + (f.who === 'none' ? ' selected' : '') + '>' + t('Unassigned') + '</option>' + staff.map(function (u) { return '<option value="' + u.id + '"' + (f.who === u.id ? ' selected' : '') + '>' + esc(u.name) + '</option>'; }).join('') + '</select>' : '') + '</div>' +
    '<div class="tw"><table><thead><tr><th>' + t('Business name') + '</th><th>' + t('Type') + '</th><th>' + t('City') + '</th><th>' + t('Phone') + '</th><th>' + t('Status') + '</th>' + (isOwner() ? '<th>' + t('Owner') + '</th>' : '') + '<th>' + t('Next follow-up') + '</th><th class="n">' + t('Offers') + '</th></tr></thead><tbody>' +
    (ls.map(function (l) { var os = offersOf(l.id); return '<tr data-open data-lead="' + l.id + '"><td class="b">' + esc(l.name) + (l.source === 'website' ? ' <span class="tag">web</span>' : '') + '</td><td>' + esc(catName(l.category)) + '</td><td>' + esc(l.city || '') + '</td><td><span class="ltr tn">' + esc(l.phone || '') + '</span></td><td>' + stPill(l.stage) + '</td>' + (isOwner() ? '<td>' + (l.ownerId ? esc(user(l.ownerId).name) : '<span class="pill p-warn"><i></i>' + t('Unassigned') + '</span>') + '</td>' : '') + '<td class="' + (l.nextFollowUp && l.nextFollowUp < today() && ['won', 'lost'].indexOf(l.stage) < 0 ? 'due' : '') + '">' + (l.nextFollowUp ? rel(l.nextFollowUp) : '') + '</td><td class="n">' + (os.length ? os.map(function (o) { return oPill(o.status); }).slice(-1)[0] + ' ' + money(os.slice(-1)[0].setupPrice) : '') + '</td></tr>'; }).join('') || '<tr><td colspan="8"><div class="empty">' + t('Nothing here yet') + '</div></td></tr>') + '</tbody></table></div></div>';
  $$('#lSt [data-s]').forEach(function (b) { b.onclick = function () { f.stage = b.dataset.s; renderView(); }; });
  var qi = $('#lq'); qi.oninput = function () { f.q = qi.value; clearTimeout(qi._t); qi._t = setTimeout(function () { var p = qi.selectionStart; renderView(); var n = $('#lq'); n.focus(); n.setSelectionRange(p, p); }, 250); };
  if ($('#lw')) $('#lw').onchange = function () { f.who = this.value; renderView(); };
  $('#lAdd').onclick = function () { leadForm(); };
  wire(el);
};

/* ============ clients ============ */
function clientPaid(cid) { return (D.invoices || []).filter(function (i) { return i.clientId === cid && i.status === 'paid'; }).reduce(function (a, i) { return a + i.amount; }, 0); }
function clientUnpaid(cid) { return (D.invoices || []).filter(function (i) { return i.clientId === cid && i.status === 'unpaid'; }).reduce(function (a, i) { return a + i.amount; }, 0); }
function clientMonthly(cid) { return (D.projects || []).filter(function (p) { return p.clientId === cid && p.status !== 'ended'; }).reduce(function (a, p) { return a + (+(p.contract || {}).monthlyFee || 0); }, 0); }
V.clients = function (el) {
  var cs = (D.clients || []).slice().sort(function (a, b) { return (b.startedAt || '').localeCompare(a.startedAt || ''); });
  el.innerHTML = '<div class="ph"><div><h1>' + t('Clients') + '</h1><div class="sub">' + cs.length + ' · ' + (S.lang === 'ar' ? 'إجمالي المحصّل ' : 'lifetime collected ') + money((D.invoices || []).filter(function (i) { return i.status === 'paid'; }).reduce(function (a, i) { return a + i.amount; }, 0)) + '</div></div><button class="btn btn-p" id="cAdd">' + ic('plus', 16) + t('New client') + '</button></div>' +
    '<div class="card"><div class="tw"><table><thead><tr><th>' + t('Client') + '</th><th>' + t('Type') + '</th><th>' + t('City') + '</th><th>' + t('Status') + '</th><th>' + t('Since') + '</th><th class="n">' + t('Projects') + '</th><th class="n">' + t('Monthly') + '</th><th class="n">' + t('Lifetime paid') + '</th><th class="n">' + t('Unpaid') + '</th></tr></thead><tbody>' +
    (cs.map(function (c) { var up = clientUnpaid(c.id); return '<tr data-open data-client="' + c.id + '"><td class="b">' + esc(c.name) + '</td><td>' + esc(catName(c.category)) + '</td><td>' + esc(c.city || '') + '</td><td>' + pPill(c.status) + '</td><td class="tn">' + dfmt(c.startedAt) + (c.endedAt ? ' → ' + dfmt(c.endedAt) : '') + '</td><td class="n">' + (D.projects || []).filter(function (p) { return p.clientId === c.id; }).length + '</td><td class="n">' + money(clientMonthly(c.id)) + '</td><td class="n">' + money(clientPaid(c.id)) + '</td><td class="n" style="' + (up ? 'color:var(--bad);font-weight:600' : '') + '">' + money(up) + '</td></tr>'; }).join('') || '<tr><td colspan="9"><div class="empty">' + t('Nothing here yet') + '</div></td></tr>') + '</tbody></table></div></div>';
  $('#cAdd').onclick = function () { clientForm(); }; wire(el);
};

/* ============ projects ============ */
V.projects = function (el) {
  var ps = (D.projects || []).slice().sort(function (a, b) { return (b.startDate || '').localeCompare(a.startDate || ''); });
  el.innerHTML = '<div class="ph"><div><h1>' + t('Projects') + '</h1><div class="sub">' + ps.length + '</div></div><button class="btn btn-p" id="pAdd">' + ic('plus', 16) + t('New project') + '</button></div>' +
    '<div class="card"><div class="tw"><table><thead><tr><th>' + t('Project') + '</th><th>' + t('Client') + '</th><th>' + t('Status') + '</th><th>' + t('Stack') + '</th><th>' + t('Hosting') + '</th><th>' + t('Database') + '</th><th>' + t('Contract end') + '</th><th class="n">' + t('Setup fee') + '</th><th class="n">' + t('Monthly') + '</th></tr></thead><tbody>' +
    (ps.map(function (p) { var k = p.contract || {}; return '<tr data-open data-project="' + p.id + '"><td class="b">' + esc(p.name) + '</td><td>' + esc((client(p.clientId) || {}).name || '') + '</td><td>' + pPill(p.status) + '</td><td>' + (p.stack || []).slice(0, 3).map(function (s) { return '<span class="tag">' + esc(s) + '</span>'; }).join(' ') + '</td><td>' + esc((p.hosting || {}).provider || '') + '</td><td>' + esc((p.database || {}).provider || '') + '</td><td class="tn">' + (k.end ? dfmt(k.end) : '') + '</td><td class="n">' + money(k.setupFee) + '</td><td class="n">' + (k.monthlyFee ? money(k.monthlyFee) + (k.monthlyStart > today() ? ' <span class="muted sm">(' + dshort(k.monthlyStart) + ')</span>' : '') : '—') + '</td></tr>'; }).join('') || '<tr><td colspan="9"><div class="empty">' + t('Nothing here yet') + '</div></td></tr>') + '</tbody></table></div></div>';
  $('#pAdd').onclick = function () { projectForm(); }; wire(el);
};

/* ============ billing ============ */
V.billing = function (el) {
  var tab = X.bill.tab, all = (D.invoices || []).slice();
  var tabs = [['open', S.lang === 'ar' ? 'مستحقة' : 'Open', function (i) { return i.status === 'unpaid'; }], ['overdue', t('overdue'), function (i) { return invState(i) === 'overdue'; }], ['paid', t('paid'), function (i) { return i.status === 'paid'; }], ['all', t('All'), function () { return true; }]];
  var cur = tabs.filter(function (x) { return x[0] === tab; })[0] || tabs[0];
  var list = all.filter(cur[2]).sort(function (a, b) { return tab === 'paid' ? (b.paidAt || '').localeCompare(a.paidAt || '') : a.dueDate.localeCompare(b.dueDate); });
  var t0 = today();
  el.innerHTML = '<div class="ph"><div><h1>' + t('Billing') + '</h1><div class="sub">' + t('Outstanding') + ': ' + money(outstanding()) + '</div></div><button class="btn btn-p" id="iAdd">' + ic('plus', 16) + t('Add invoice') + '</button></div>' +
    '<div class="kpis">' + kpi(t('Collected this month'), money(paidIn(t0.slice(0, 8) + '01', t0)), '') + kpi(t('Collected this year'), money(paidIn(t0.slice(0, 5) + '01-01', t0)), '') + kpi(t('Outstanding'), money(outstanding()), '') + kpi(t('Monthly recurring'), money(D.mrr), '', true) + '</div>' +
    '<div class="seg" id="bTabs">' + tabs.map(function (x) { return '<button data-t="' + x[0] + '" aria-pressed="' + (x[0] === cur[0]) + '">' + x[1] + ' <span class="c">' + all.filter(x[2]).length + '</span></button>'; }).join('') + '</div>' +
    '<div class="card"><div class="tw"><table><thead><tr><th>' + t('Client') + '</th><th>' + t('Label') + '</th><th>' + t('Due') + '</th><th>' + t('Status') + '</th><th>' + t('Method') + '</th><th class="n">' + t('Amount') + '</th><th></th></tr></thead><tbody>' +
    (list.map(function (i) { return '<tr><td class="b">' + esc((client(i.clientId) || {}).name || '') + '</td><td>' + esc(i.label) + '</td><td class="tn">' + dfmt(i.dueDate) + '</td><td>' + iPill(i) + (i.paidAt ? ' <span class="muted sm">' + dshort(i.paidAt) + '</span>' : '') + '</td><td>' + esc(i.method || '') + '</td><td class="n money">' + money(i.amount) + '</td><td style="white-space:nowrap;text-align:end">' +
      (i.status === 'unpaid' ? '<button class="btn btn-ok btn-sm" data-pay="' + i.id + '">' + ic('check', 14) + t('Mark paid') + '</button> ' : i.status === 'paid' ? '<button class="btn btn-s btn-sm" data-unpay="' + i.id + '">' + t('Mark unpaid') + '</button> ' : '') +
      (i.status !== 'void' ? '<button class="ib" data-void="' + i.id + '" title="' + t('void') + '">' + ic('x', 15) + '</button>' : '') + '</td></tr>'; }).join('') || '<tr><td colspan="7"><div class="empty">' + t('Nothing here yet') + '</div></td></tr>') + '</tbody></table></div></div>';
  $$('#bTabs [data-t]').forEach(function (b) { b.onclick = function () { X.bill.tab = b.dataset.t; renderView(); }; });
  $('#iAdd').onclick = function () { invoiceForm(); };
  wireRen(el);
  $$('[data-unpay]', el).forEach(function (b) { b.onclick = function () { act(API.patch('/api/hq/invoices/' + b.dataset.unpay, { status: 'unpaid' }), t('Saved')); }; });
  $$('[data-void]', el).forEach(function (b) { b.onclick = function () { ask(t('Are you sure?'), S.lang === 'ar' ? 'ستُلغى هذه الفاتورة.' : 'This invoice will be voided.').then(function (ok) { if (ok) act(API.patch('/api/hq/invoices/' + b.dataset.void, { status: 'void' }), t('Saved')); }); }; });
};

/* ============ renewals ============ */
V.renewals = function (el) {
  var r = renewals(365);
  el.innerHTML = '<div class="ph"><div><h1>' + t('Renewals') + '</h1><div class="sub">' + (S.lang === 'ar' ? 'العقود والنطاقات والاستضافة والفواتير خلال سنة' : 'Contracts, domains, hosting and invoices in the next 12 months') + '</div></div></div>' +
    '<div class="card"><div class="lst">' + (r.length ? r.map(renRow).join('') : '<div class="empty">' + t('Nothing here yet') + '</div>') + '</div></div>';
  wireRen(el); wire(el);
};

/* ============ portfolio ============ */
V.portfolio = function (el) {
  var ps = (D.portfolio || []).slice().sort(function (a, b) { return a.order - b.order; });
  el.innerHTML = '<div class="ph"><div><h1>' + t('Portfolio') + '</h1><div class="sub">' + ps.filter(function (p) { return p.published; }).length + ' ' + t('Published') + ' · <a href="' + esc(siteBase()) + '#work" target="_blank" rel="noopener">' + (S.lang === 'ar' ? 'شاهد على الموقع' : 'View on website') + ' ↗</a></div></div><button class="btn btn-p" id="pfAdd">' + ic('plus', 16) + t('Add') + '</button></div>' +
    '<div class="pf-grid">' + ps.map(function (p, i) { return '<div class="card pf"><div class="img"><img src="' + esc(API.img((p.images || [])[0], '../')) + '" alt="" loading="lazy">' + (p.published ? '<span class="pill p-ok"><i></i>' + t('Published') + '</span>' : '<span class="pill p-mute"><i></i>' + t('Draft') + '</span>') + '</div><div class="card-b" style="display:grid;gap:6px"><b>' + esc(S.lang === 'ar' ? p.title_ar || p.title_en : p.title_en || p.title_ar) + '</b><span class="muted sm">' + esc(p.client || '') + ' · ' + (p.images || []).length + ' ' + (S.lang === 'ar' ? 'صور' : 'images') + (p.featured ? ' · ★' : '') + '</span>' +
      '<div style="display:flex;gap:6px;margin-top:6px"><button class="btn btn-s btn-sm" data-pfe="' + p.id + '">' + t('Edit') + '</button><button class="btn btn-s btn-sm" data-pfp="' + p.id + '">' + (p.published ? (S.lang === 'ar' ? 'إخفاء' : 'Unpublish') : (S.lang === 'ar' ? 'نشر' : 'Publish')) + '</button><span style="flex:1"></span><button class="ib" data-up="' + i + '" title="↑"' + (i === 0 ? ' disabled' : '') + '>↑</button><button class="ib" data-dn="' + i + '" title="↓"' + (i === ps.length - 1 ? ' disabled' : '') + '>↓</button></div></div></div>'; }).join('') + '</div>';
  $('#pfAdd').onclick = function () { portfolioForm(); };
  $$('[data-pfe]', el).forEach(function (b) { b.onclick = function () { portfolioForm(b.dataset.pfe); }; });
  $$('[data-pfp]', el).forEach(function (b) { b.onclick = function () { var p = D.portfolio.filter(function (x) { return x.id === b.dataset.pfp; })[0]; act(API.patch('/api/hq/portfolio/' + p.id, { published: !p.published }), t('Saved')); }; });
  function swap(i, j) { var a = ps[i], c = ps[j]; Promise.all([API.patch('/api/hq/portfolio/' + a.id, { order: j }), API.patch('/api/hq/portfolio/' + c.id, { order: i })]).then(function () { ps.forEach(function (p, k) { if (k !== i && k !== j && p.order !== k) API.patch('/api/hq/portfolio/' + p.id, { order: k }); }); return load(true); }); }
  $$('[data-up]', el).forEach(function (b) { b.onclick = function () { swap(+b.dataset.up, +b.dataset.up - 1); }; });
  $$('[data-dn]', el).forEach(function (b) { b.onclick = function () { swap(+b.dataset.dn, +b.dataset.dn + 1); }; });
};

/* ============ team ============ */
V.team = function (el) {
  var us = D.users || [], m0 = today().slice(0, 8) + '01';
  el.innerHTML = '<div class="ph"><div><h1>' + t('Team') + '</h1><div class="sub">' + us.filter(function (u) { return u.active; }).length + '</div></div><button class="btn btn-p" id="uAdd">' + ic('plus', 16) + t('Add team member') + '</button></div>' +
    '<div class="card"><div class="tw"><table><thead><tr><th>' + t('Name') + '</th><th>' + t('Email') + '</th><th class="n">' + t('Leads') + '</th><th class="n">' + t('Offers sent') + '</th><th class="n">' + t('Won') + '</th><th class="n">' + t('Conversion') + '</th><th class="n">' + t('Commission %') + '</th><th class="n">' + t('Commission') + '</th><th>' + t('Status') + '</th><th></th></tr></thead><tbody>' +
    us.map(function (u) { var s = empStats(u.id); return '<tr><td><span style="display:flex;gap:8px;align-items:center"><span class="av sm">' + esc(initials(u.name)) + '</span><b>' + esc(u.name) + '</b>' + (u.role === 'owner' ? ' <span class="tag">' + (S.lang === 'ar' ? 'أنت' : 'you') + '</span>' : '') + '</span></td><td class="ltr">' + esc(u.email) + '</td><td class="n">' + s.leads + '</td><td class="n">' + s.sent + '</td><td class="n">' + s.won + '</td><td class="n">' + s.conv + '%</td><td class="n">' + (u.commissionPct || 0) + '%</td><td class="n">' + money(s.commission) + '</td><td>' + (u.active ? '<span class="pill p-ok"><i></i>' + t('active') + '</span>' : '<span class="pill p-mute"><i></i>' + t('paused') + '</span>') + '</td><td><button class="btn btn-s btn-sm" data-ue="' + u.id + '">' + t('Edit') + '</button></td></tr>'; }).join('') + '</tbody></table></div></div>';
  $('#uAdd').onclick = function () { userForm(); };
  $$('[data-ue]', el).forEach(function (b) { b.onclick = function () { userForm(b.dataset.ue); }; });
};

/* ============ settings ============ */
V.settings = function (el) {
  var s = D.settings, svcs = JSON.parse(JSON.stringify(s.services || [])), tpls = JSON.parse(JSON.stringify(s.templates || [])), rec = JSON.parse(JSON.stringify(s.recipients || []));
  el.innerHTML = '<div class="ph"><h1>' + t('Settings') + '</h1><button class="btn btn-p" id="stSave">' + t('Save') + '</button></div><div class="grid g2">' +
    '<div class="card"><div class="card-h"><h3>' + t('Company') + '</h3></div><div class="card-b" style="display:grid;gap:12px"><div class="frow"><div class="fld"><label for="sCo">' + t('Name') + '</label><input class="in" id="sCo" value="' + esc(s.company) + '"></div><div class="fld"><label for="sBiz">' + (S.lang === 'ar' ? 'عدد الأنشطة التي خدمناها' : 'Businesses served (shown on site)') + '</label><input class="in" type="number" id="sBiz" value="' + (s.businessesServed || 0) + '"></div></div>' +
      '<div class="frow"><div class="fld"><label for="sWa">' + t('WhatsApp') + '</label><input class="in" id="sWa" dir="ltr" value="' + esc(s.whatsapp || '') + '" placeholder="961 70 000 000"></div><div class="fld"><label for="sIg">' + t('Instagram') + '</label><input class="in" id="sIg" dir="ltr" value="' + esc(s.instagram || '') + '"></div><div class="fld"><label for="sEm">' + t('Email') + '</label><input class="in" id="sEm" dir="ltr" value="' + esc(s.email || '') + '"></div></div>' +
      '<div class="frow"><div class="fld"><label for="sTe">Tagline (EN)</label><input class="in" id="sTe" value="' + esc(s.tagline_en || '') + '"></div><div class="fld"><label for="sTa">Tagline (AR)</label><input class="in" id="sTa" dir="rtl" value="' + esc(s.tagline_ar || '') + '"></div></div></div></div>' +
    '<div class="card"><div class="card-h"><h3>' + ic('wa', 16) + ' ' + t('WhatsApp alerts') + '</h3><div class="sp"><button class="btn btn-s btn-sm" id="rcTest">' + t('Send test') + '</button></div></div><div class="card-b" style="display:grid;gap:10px"><p class="muted sm">' + (S.lang === 'ar' ? 'كل طلب من الموقع يصل كرسالة واتساب إلى هذه الأرقام (مجاناً عبر CallMeBot). من كل هاتف: أرسل ' : 'Every website enquiry is sent to these numbers on WhatsApp (free, via CallMeBot). From each phone, send ') + '<b class="ltr">I allow callmebot to send me messages</b>' + (S.lang === 'ar' ? ' إلى رقم CallMeBot من ' : ' to the CallMeBot number listed on ') + '<a href="https://www.callmebot.com/blog/free-api-whatsapp-messages/" target="_blank" rel="noopener">callmebot.com</a>' + (S.lang === 'ar' ? ' والصق المفتاح هنا.' : ' and paste the key here.') + '</p><div id="rcList" style="display:grid;gap:8px"></div><button class="btn btn-s btn-sm" id="rcAdd" style="justify-self:start">' + ic('plus', 14) + t('Add') + '</button></div></div>' +
    '<div class="card" style="grid-column:1/-1"><div class="card-h"><h3>' + t('Services') + ' <span class="muted sm">(' + (S.lang === 'ar' ? 'تظهر على الموقع' : 'shown on the website') + ')</span></h3><div class="sp"><button class="btn btn-s btn-sm" id="svAdd">' + ic('plus', 14) + t('Add') + '</button></div></div><div class="card-b" id="svList" style="display:grid;gap:12px"></div></div>' +
    '<div class="card" style="grid-column:1/-1"><div class="card-h"><h3>' + t('Message templates') + ' <span class="muted sm">{business} {me} {link} {contact}</span></h3><div class="sp"><button class="btn btn-s btn-sm" id="tpAdd">' + ic('plus', 14) + t('Add') + '</button></div></div><div class="card-b" id="tpList" style="display:grid;gap:12px"></div></div>' +
    '<div class="card"><div class="card-h"><h3>' + t('Backup') + '</h3></div><div class="card-b" style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn btn-s" id="bkE">' + t('Download backup') + '</button><label class="btn btn-s">' + t('Restore') + '<input type="file" id="bkI" accept="application/json" hidden></label><button class="btn btn-bad" id="pvReset" hidden>' + (S.lang === 'ar' ? 'إعادة ضبط المعاينة' : 'Reset preview data') + '</button></div></div>' +
    '</div>';
  function drawSv() { $('#svList').innerHTML = svcs.map(function (x, i) { return '<div class="frow" style="grid-template-columns:1fr 1fr 2fr 2fr 90px auto;align-items:end"><div class="fld"><label>EN</label><input class="in" data-sv="en" data-i="' + i + '" value="' + esc(x.en) + '"></div><div class="fld"><label>AR</label><input class="in" dir="rtl" data-sv="ar" data-i="' + i + '" value="' + esc(x.ar) + '"></div><div class="fld"><label>' + t('Description') + ' EN</label><input class="in" data-sv="d_en" data-i="' + i + '" value="' + esc(x.d_en) + '"></div><div class="fld"><label>' + t('Description') + ' AR</label><input class="in" dir="rtl" data-sv="d_ar" data-i="' + i + '" value="' + esc(x.d_ar) + '"></div><div class="fld"><label>from $</label><input class="in" type="number" data-sv="from" data-i="' + i + '" value="' + (x.from || '') + '"></div><button class="ib" data-svx="' + i + '">' + ic('trash', 15) + '</button></div>'; }).join('');
    $$('[data-sv]').forEach(function (inp) { inp.oninput = function () { svcs[+inp.dataset.i][inp.dataset.sv] = inp.value; }; }); $$('[data-svx]').forEach(function (b) { b.onclick = function () { svcs.splice(+b.dataset.svx, 1); drawSv(); }; }); }
  function drawTp() { $('#tpList').innerHTML = tpls.map(function (x, i) { return '<div style="display:grid;gap:6px"><div style="display:flex;gap:8px"><input class="in" data-tp="name" data-i="' + i + '" value="' + esc(x.name) + '" style="max-width:280px"><button class="ib" data-tpx="' + i + '">' + ic('trash', 15) + '</button></div><textarea class="in" data-tp="text" data-i="' + i + '">' + esc(x.text) + '</textarea></div>'; }).join('');
    $$('[data-tp]').forEach(function (inp) { inp.oninput = function () { tpls[+inp.dataset.i][inp.dataset.tp] = inp.value; }; }); $$('[data-tpx]').forEach(function (b) { b.onclick = function () { tpls.splice(+b.dataset.tpx, 1); drawTp(); }; }); }
  function drawRc() { $('#rcList').innerHTML = rec.map(function (r, i) { return '<div class="frow" style="grid-template-columns:1fr 1.3fr 1.3fr auto auto;align-items:end"><div class="fld"><label>' + t('Name') + '</label><input class="in" data-rc="name" data-i="' + i + '" value="' + esc(r.name) + '"></div><div class="fld"><label>' + t('Phone') + '</label><input class="in" dir="ltr" data-rc="phone" data-i="' + i + '" value="' + esc(r.phone) + '"></div><div class="fld"><label>apikey</label><input class="in" dir="ltr" data-rc="apikey" data-i="' + i + '" value="' + esc(r.apikey || '') + '"></div><label class="sw" style="padding-bottom:8px"><input type="checkbox" data-rc="active" data-i="' + i + '"' + (r.active !== false ? ' checked' : '') + '></label><button class="ib" data-rcx="' + i + '">' + ic('trash', 15) + '</button></div>'; }).join('') || '<p class="muted sm">—</p>';
    $$('[data-rc]').forEach(function (inp) { inp.oninput = inp.onchange = function () { rec[+inp.dataset.i][inp.dataset.rc] = inp.type === 'checkbox' ? inp.checked : inp.value; }; }); $$('[data-rcx]').forEach(function (b) { b.onclick = function () { rec.splice(+b.dataset.rcx, 1); drawRc(); }; }); }
  drawSv(); drawTp(); drawRc();
  $('#svAdd').onclick = function () { svcs.push({ id: 's' + Date.now().toString(36), en: '', ar: '', d_en: '', d_ar: '', from: 0 }); drawSv(); };
  $('#tpAdd').onclick = function () { tpls.push({ id: '', name: 'New template', text: '' }); drawTp(); };
  $('#rcAdd').onclick = function () { rec.push({ name: '', phone: '', apikey: '', active: true }); drawRc(); };
  function body() { return { company: $('#sCo').value, businessesServed: +$('#sBiz').value, whatsapp: $('#sWa').value, instagram: $('#sIg').value, email: $('#sEm').value, tagline_en: $('#sTe').value, tagline_ar: $('#sTa').value, services: svcs, templates: tpls, recipients: rec }; }
  $('#stSave').onclick = function () { act(API.put('/api/hq/settings', body()), t('Saved')); };
  $('#rcTest').onclick = function () { API.put('/api/hq/settings', body()).then(function () { return API.post('/api/hq/notify-test'); }).then(function (r) { toast('✓ ' + r.sent); }).catch(function (e) { toast(esc(e.message), 'err'); }); };
  $('#bkE').onclick = function () { API.get('/api/hq/export').then(function (d) { var a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([JSON.stringify(d)], { type: 'application/json' })); a.download = 'solunera-backup-' + today() + '.json'; document.body.appendChild(a); a.click(); a.remove(); }); };
  $('#bkI').onchange = function () { var f = this.files[0]; if (!f) return; var fr = new FileReader(); fr.onload = function () { var d; try { d = JSON.parse(fr.result); } catch (e) { return toast('Invalid file', 'err'); } ask(t('Are you sure?'), S.lang === 'ar' ? 'ستُستبدل كل البيانات الحالية.' : 'All current data will be replaced.').then(function (ok) { if (ok) act(API.post('/api/hq/import', d), t('Saved')); }); }; fr.readAsText(f); };
  API.mode().then(function (m) { if (m === 'preview') { $('#pvReset').hidden = false; $('#pvReset').onclick = function () { API.resetPreview(); D = null; renderLogin(); }; } });
};

/* ============ log ============ */
V.log = function (el) {
  el.innerHTML = '<div class="ph"><h1>' + t('Activity') + '</h1></div><div class="card"><div class="tw"><table><thead><tr><th></th><th>' + t('Name') + '</th><th>' + (S.lang === 'ar' ? 'العملية' : 'Action') + '</th><th>' + (S.lang === 'ar' ? 'التفاصيل' : 'Details') + '</th></tr></thead><tbody>' +
    (D.log || []).slice(0, 400).map(function (l) { var ld = l.ref && lead(l.ref); return '<tr' + (ld ? ' data-open data-lead="' + ld.id + '"' : '') + '><td class="muted sm tn" style="white-space:nowrap">' + ago(l.at) + '</td><td>' + esc(l.who) + '</td><td><span class="tag">' + esc(l.action) + '</span></td><td>' + esc(l.detail || '') + '</td></tr>'; }).join('') + '</tbody></table></div></div>';
  wire(el);
};

/* ============ modal / drawer ============ */
function modal(html, small, lock) {
  var m = $('#modal'); m.innerHTML = '<div class="mc' + (small ? ' sm' : '') + '">' + html + '</div>'; m.classList.add('on'); $('#scrim').classList.add('on');
  if (lock) m.dataset.lock = '1'; else delete m.dataset.lock;
  $$('[data-x]', m).forEach(function (b) { b.onclick = closeModal; });
  var f = $('input:not([type=hidden]):not([type=file]),select,textarea', m); if (f) setTimeout(function () { f.focus(); }, 60);
}
function closeModal() { var m = $('#modal'); if (!m || m.dataset.lock) return; m.classList.remove('on'); m.innerHTML = ''; if (!$('#drawer').classList.contains('on')) $('#scrim').classList.remove('on'); }
function forceClose() { delete $('#modal').dataset.lock; closeModal(); }
$('#modal').addEventListener('click', function (e) { if (e.target === this) closeModal(); });
function ask(title, text) { return new Promise(function (res) { modal('<div class="dh"><h2>' + esc(title) + '</h2></div><div class="db"><p>' + esc(text) + '</p></div><div class="df"><button class="btn btn-bad" id="aOk">' + t('Confirm') + '</button><button class="btn btn-s" id="aNo">' + t('Cancel') + '</button></div>', true); $('#aOk').onclick = function () { closeModal(); res(true); }; $('#aNo').onclick = function () { closeModal(); res(false); }; }); }
var drawerFn = null;
function openDrawer(fn) { drawerFn = fn; fn(); $('#drawer').classList.add('on'); $('#scrim').classList.add('on'); }
function refreshDrawer() { if (drawerFn && $('#drawer').classList.contains('on') && !($('#drawer').contains(document.activeElement) && /INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName))) drawerFn(); }
function closeDrawer() { drawerFn = null; var d = $('#drawer'); if (!d) return; d.classList.remove('on'); if (!$('#modal').classList.contains('on')) $('#scrim').classList.remove('on'); }
$('#scrim').addEventListener('click', function () { if ($('#modal').classList.contains('on')) closeModal(); else closeDrawer(); });
document.addEventListener('keydown', function (e) {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { if (D) { e.preventDefault(); openCmdk(); } return; }
  if (e.key === 'Escape') { if ($('#cmdk').classList.contains('on')) closeCmdk(); else if ($('#modal').classList.contains('on')) closeModal(); else closeDrawer(); }
});
function val(id) { var e = $('#' + id); return e ? (e.type === 'checkbox' ? e.checked : e.value) : undefined; }
function fld(id, label, v, o) { o = o || {}; return '<div class="fld"' + (o.span ? ' style="grid-column:1/-1"' : '') + '><label for="' + id + '">' + label + '</label>' + (o.area ? '<textarea class="in" id="' + id + '"' + (o.dir ? ' dir="' + o.dir + '"' : '') + '>' + esc(v || '') + '</textarea>' : o.opts ? '<select class="in" id="' + id + '">' + o.opts.map(function (x) { return '<option value="' + esc(x[0]) + '"' + (String(v || '') === String(x[0]) ? ' selected' : '') + '>' + esc(x[1]) + '</option>'; }).join('') + '</select>' : '<input class="in" id="' + id + '" type="' + (o.type || 'text') + '" value="' + esc(v == null ? '' : v) + '"' + (o.dir ? ' dir="' + o.dir + '"' : '') + (o.ph ? ' placeholder="' + esc(o.ph) + '"' : '') + (o.step ? ' step="' + o.step + '"' : '') + '>') + '</div>'; }

/* ============ lead form + drawer ============ */
function leadFields(l) {
  l = l || {}; var cats = CATS.map(function (c) { return [c, catName(c)]; });
  return '<div class="frow">' + fld('fName', t('Business name') + ' *', l.name) + fld('fCat', t('Type'), l.category, { opts: [['', '']].concat(cats) }) + '</div>' +
    '<div class="frow">' + fld('fContact', t('Contact person'), l.contactName) + fld('fRole', t('Role'), l.contactRole) + '</div>' +
    '<div class="frow">' + fld('fPhone', t('Phone'), l.phone, { dir: 'ltr', ph: '+961 70 000 000' }) + fld('fWa', t('WhatsApp'), l.whatsapp, { dir: 'ltr' }) + fld('fEmail', t('Email'), l.email, { dir: 'ltr', type: 'email' }) + '</div>' +
    '<div class="frow">' + fld('fIg', t('Instagram'), l.instagram, { dir: 'ltr', ph: '@' }) + fld('fFb', t('Facebook'), l.facebook, { dir: 'ltr' }) + fld('fWeb', t('Website'), l.website, { dir: 'ltr' }) + '</div>' +
    '<div class="frow">' + fld('fCity', t('City'), l.city) + fld('fCountry', t('Country'), l.country || 'Lebanon') + fld('fAddr', t('Address / area'), l.address) + '</div>' +
    '<div class="frow">' + fld('fMaps', t('Google Maps link'), l.mapsUrl, { dir: 'ltr' }) + fld('fSrc', t('Source'), l.source || 'field', { opts: SOURCES.map(function (s) { return [s, srcName(s)]; }) }) + fld('fRating', t('Rating') + ' (Google)', l.rating, { type: 'number', step: '0.1' }) + '</div>' +
    '<div class="frow">' + fld('fNeeds', t('Needs'), l.needs) + fld('fBudget', t('Budget'), l.budget) + fld('fFu', t('Next follow-up'), l.nextFollowUp, { type: 'date' }) + '</div>' +
    fld('fNotes', t('Notes'), l.notes, { area: true, span: true });
}
function readLead() { return { name: val('fName'), category: val('fCat'), contactName: val('fContact'), contactRole: val('fRole'), phone: val('fPhone'), whatsapp: val('fWa'), email: val('fEmail'), instagram: (val('fIg') || '').replace(/^@/, ''), facebook: val('fFb'), website: val('fWeb'), city: val('fCity'), country: val('fCountry'), address: val('fAddr'), mapsUrl: val('fMaps'), source: val('fSrc'), rating: val('fRating'), needs: val('fNeeds'), budget: val('fBudget'), nextFollowUp: val('fFu'), notes: val('fNotes') }; }
function leadForm() {
  var staff = (D.users || []).filter(function (u) { return u.active; });
  modal('<div class="dh"><h2>' + t('Add business') + '</h2><button class="ib" data-x style="margin-inline-start:auto">' + ic('x') + '</button></div><div class="db">' + leadFields({ nextFollowUp: U.addDays(today(), 2) }) +
    (isOwner() ? '<div class="frow">' + fld('fOwner', t('Assign to'), D.me.id, { opts: [['', t('Unassigned')]].concat(staff.map(function (u) { return [u.id, u.name]; })) }) + '</div>' : '') + '<p class="err" id="fErr" style="color:var(--bad)" hidden></p></div><div class="df"><button class="btn btn-p" id="fOk">' + t('Save') + '</button><button class="btn btn-s" data-x>' + t('Cancel') + '</button></div>');
  $('#fOk').onclick = function () { save(false); };
  function save(force) {
    var b = readLead(); if (isOwner()) b.ownerId = val('fOwner') || null; if (force) b.force = true;
    API.post('/api/hq/leads', b).then(function (l) { forceClose(); toast(t('Saved')); return load(true).then(function () { openLead(l.id); }); })
      .catch(function (e) { if (e.status === 409) { var er = $('#fErr'); er.innerHTML = esc(e.message) + ' <button class="btn btn-s btn-sm" id="fForce">' + (S.lang === 'ar' ? 'أضف على أي حال' : 'Add anyway') + '</button>'; er.hidden = false; $('#fForce').onclick = function () { save(true); }; } else toast(esc(e.message), 'err'); });
  }
}
function openLead(id) { X.leadTab = X.leadTab || 'timeline'; openDrawer(function () { renderLead(id); }); }
function renderLead(id) {
  var l = lead(id), d = $('#drawer'); if (!l) return closeDrawer();
  var os = offersOf(id), as = actsOf(id), tab = X.leadTab, editing = X.editing === id;
  var contact = [];
  if (waUrl(l.whatsapp || l.phone)) contact.push('<button class="btn btn-wa btn-sm" id="ldWa">' + ic('wa', 15) + ' WhatsApp</button>');
  if (l.phone) contact.push('<a class="btn btn-s btn-sm" href="tel:' + esc(l.phone.replace(/\s/g, '')) + '">' + ic('phone', 15) + '</a>');
  if (l.instagram) contact.push('<a class="btn btn-s btn-sm" target="_blank" rel="noopener" href="https://instagram.com/' + esc(l.instagram) + '">' + ic('ig', 15) + '</a>');
  if (l.mapsUrl || l.address || l.city) contact.push('<a class="btn btn-s btn-sm" target="_blank" rel="noopener" href="' + esc(l.mapsUrl || ('https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(l.name + ' ' + (l.address || '') + ' ' + (l.city || '')))) + '">' + ic('pin', 15) + '</a>');
  if (l.email) contact.push('<a class="btn btn-s btn-sm" href="mailto:' + esc(l.email) + '">' + ic('mail', 15) + '</a>');
  var body = '';
  body += '<div class="card card-b" style="display:grid;gap:12px"><div class="stage-pick" id="stPick">' + STAGES.map(function (s) { return '<button data-st="' + s + '" aria-pressed="' + (l.stage === s) + '"><i style="background:var(--st-' + s + ')"></i>' + t(s) + '</button>'; }).join('') + '</div>' +
    '<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">' + contact.join('') + '<span style="flex:1"></span><label class="muted sm" for="ldFu">' + t('Next follow-up') + '</label><input class="in" type="date" id="ldFu" value="' + esc(l.nextFollowUp || '') + '" style="width:auto"></div>' +
    (l.stage === 'lost' && l.lostReason ? '<p class="sm" style="color:var(--bad)">' + esc(l.lostReason) + '</p>' : '') + '</div>';
  body += '<div class="dtabs" style="border-radius:12px;border:1px solid var(--line-2)" role="tablist">' + [['timeline', t('Timeline')], ['offers', t('Offers') + ' (' + os.length + ')'], ['info', t('Info')]].map(function (x) { return '<button role="tab" data-tab="' + x[0] + '" aria-selected="' + (tab === x[0]) + '">' + x[1] + '</button>'; }).join('') + '</div>';
  if (tab === 'timeline') {
    body += '<div class="card card-b" style="display:grid;gap:10px"><div class="seg" id="actT">' + ['whatsapp', 'call', 'visit', 'meeting', 'email', 'note'].map(function (x, i) { return '<button data-a="' + x + '" aria-pressed="' + (i === 0) + '">' + ic(ACT_IC[x], 14) + t(x) + '</button>'; }).join('') + '</div><textarea class="in" id="actTx" placeholder="' + t('What happened?') + '"></textarea><div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap"><label class="muted sm" for="actFu">' + t('Next follow-up') + '</label><input class="in" type="date" id="actFu" style="width:auto" value="' + U.addDays(today(), 3) + '"><span style="flex:1"></span><button class="btn btn-p" id="actOk">' + t('Log activity') + '</button></div></div>' +
      '<div class="tl">' + (as.length ? as.map(function (a) { return '<div class="ev"><span class="ic">' + ic(ACT_IC[a.type] || 'note', 14) + '</span><div><div class="sm"><b>' + t(a.type) + '</b> · <span class="muted">' + esc(user(a.byId).name) + ' · ' + ago(a.at) + '</span></div><div style="white-space:pre-wrap">' + esc(a.text) + '</div></div></div>'; }).join('') : '<div class="empty">' + t('Nothing here yet') + '</div>') + '</div>';
  }
  if (tab === 'offers') {
    body += '<button class="btn btn-p" id="ofNew" style="justify-self:start">' + ic('plus', 15) + t('New offer') + '</button>' + (os.length ? os.slice().reverse().map(function (o) {
      var svc = (o.services || []).map(function (s) { var x = D.settings.services.filter(function (y) { return y.id === s; })[0]; return x ? (S.lang === 'ar' ? x.ar : x.en) : s; });
      return '<div class="offer"><div class="top-r"><b>' + esc(o.title || svc.join(', ')) + '</b>' + oPill(o.status) + '<span class="muted sm" style="margin-inline-start:auto">' + ago(o.createdAt) + '</span></div><div class="top-r"><span class="money" style="font-size:18px">' + money(o.setupPrice) + '</span>' + (o.monthlyPrice ? '<span class="muted">+ ' + money(o.monthlyPrice) + '/mo' + (o.monthlyAfterMonths ? ' ' + (S.lang === 'ar' ? 'بعد ' + o.monthlyAfterMonths + ' شهر' : 'after ' + o.monthlyAfterMonths + ' mo') : '') + '</span>' : '') + '</div>' +
        (svc.length ? '<div>' + svc.map(function (s) { return '<span class="tag">' + esc(s) + '</span>'; }).join(' ') + '</div>' : '') + (o.notes ? '<p class="sm muted" style="white-space:pre-wrap">' + esc(o.notes) + '</p>' : '') +
        '<div class="top-r">' + (o.status === 'draft' ? '<button class="btn btn-s btn-sm" data-os="' + o.id + ':sent">' + t('Mark sent') + '</button>' : '') + (o.status === 'sent' || o.status === 'draft' ? '<button class="btn btn-ok btn-sm" data-os="' + o.id + ':accepted">' + ic('check', 14) + t('Accepted') + '</button><button class="btn btn-bad btn-sm" data-os="' + o.id + ':rejected">' + t('Rejected') + '</button>' : '') + '<button class="btn btn-s btn-sm" data-oe="' + o.id + '">' + t('Edit') + '</button>' + (waUrl(l.whatsapp || l.phone) ? '<button class="btn btn-s btn-sm" data-ow="' + o.id + '">' + ic('wa', 14) + '</button>' : '') + '</div></div>';
    }).join('') : '<div class="empty">' + t('Nothing here yet') + '</div>');
  }
  if (tab === 'info') {
    if (!editing) {
      var rows = [['Contact person', (l.contactName || '') + (l.contactRole ? ' · ' + l.contactRole : '')], ['Phone', l.phone], ['WhatsApp', l.whatsapp], ['Email', l.email], ['Instagram', l.instagram ? '@' + l.instagram : ''], ['Facebook', l.facebook], ['Website', l.website], ['City', [l.city, l.country].filter(Boolean).join(', ')], ['Address / area', l.address], ['Source', srcName(l.source)], ['Rating', l.rating ? '★ ' + l.rating : ''], ['Needs', l.needs], ['Budget', l.budget], ['Notes', l.notes], ['Owner', l.ownerId ? user(l.ownerId).name : t('Unassigned')]];
      body += '<div class="card card-b"><dl class="kv">' + rows.filter(function (r) { return r[1]; }).map(function (r) { return '<dt>' + t(r[0]) + '</dt><dd style="white-space:pre-wrap">' + esc(r[1]) + '</dd>'; }).join('') + '<dt>' + (S.lang === 'ar' ? 'أضيف' : 'Added') + '</dt><dd>' + dfmt(tsDate(l.createdAt)) + ' · ' + esc(user(l.createdBy).name === '—' ? (S.lang === 'ar' ? 'الموقع' : 'Website') : user(l.createdBy).name) + '</dd></dl><button class="btn btn-s btn-sm" id="ldEdit" style="margin-top:12px">' + t('Edit') + '</button></div>';
      if (isOwner()) {
        var staff = (D.users || []).filter(function (u) { return u.active; });
        body += '<div class="card card-b" style="display:grid;gap:10px"><div class="frow" style="align-items:end">' + fld('ldOwner', t('Assign to'), l.ownerId || '', { opts: [['', t('Unassigned')]].concat(staff.map(function (u) { return [u.id, u.name]; })) }) + '<div style="display:flex;gap:8px;align-items:end"><button class="btn btn-s" id="ldAssign">' + t('Save') + '</button></div></div>' +
          '<div style="display:flex;gap:8px;flex-wrap:wrap">' + (l.clientId && client(l.clientId) ? '<button class="btn btn-s" id="ldGo">' + ic('client', 15) + (S.lang === 'ar' ? 'فتح ملف العميل' : 'Open client') + '</button>' : '<button class="btn btn-ok" id="ldConv">' + ic('check', 15) + t('Convert to client') + '</button>') + '<button class="btn btn-bad" id="ldDel">' + ic('trash', 15) + t('Delete') + '</button></div></div>';
      }
    } else {
      body += '<div class="card card-b" style="display:grid;gap:12px">' + leadFields(l) + '<div style="display:flex;gap:8px"><button class="btn btn-p" id="ldSave">' + t('Save') + '</button><button class="btn btn-s" id="ldCancel">' + t('Cancel') + '</button></div></div>';
    }
  }
  d.innerHTML = '<div class="dh"><span class="av">' + esc(initials(l.name)) + '</span><div style="flex:1;min-width:0"><h2>' + esc(l.name) + '</h2><div class="muted sm">' + esc(catName(l.category)) + (l.city ? ' · ' + esc(l.city) : '') + (isOwner() ? ' · ' + (l.ownerId ? esc(user(l.ownerId).name) : t('Unassigned')) : '') + '</div></div><button class="ib" id="ldX">' + ic('x') + '</button></div><div class="db">' + body + '</div>';
  $('#ldX').onclick = closeDrawer;
  $$('[data-tab]', d).forEach(function (b) { b.onclick = function () { X.leadTab = b.dataset.tab; X.editing = null; renderLead(id); }; });
  $$('#stPick [data-st]').forEach(function (b) { b.onclick = function () { if (b.dataset.st === l.stage) return; if (b.dataset.st === 'lost') return lostModal(id); act(API.patch('/api/hq/leads/' + id, { stage: b.dataset.st }), t(b.dataset.st)); }; });
  $('#ldFu').onchange = function () { act(API.patch('/api/hq/leads/' + id, { nextFollowUp: this.value }), t('Saved')); };
  if ($('#ldWa')) $('#ldWa').onclick = function () { waModal(l); };
  if ($('#actOk')) {
    var at = 'whatsapp';
    $$('#actT [data-a]').forEach(function (b) { b.onclick = function () { at = b.dataset.a; $$('#actT [data-a]').forEach(function (x) { x.setAttribute('aria-pressed', x === b); }); }; });
    $('#actOk').onclick = function () { act(API.post('/api/hq/activities', { leadId: id, type: at, text: $('#actTx').value, nextFollowUp: $('#actFu').value }), t('Saved')); };
  }
  if ($('#ofNew')) $('#ofNew').onclick = function () { offerForm(id); };
  $$('[data-os]', d).forEach(function (b) { b.onclick = function () { var p = b.dataset.os.split(':'); act(API.patch('/api/hq/offers/' + p[0], { status: p[1] }), t(p[1])); }; });
  $$('[data-oe]', d).forEach(function (b) { b.onclick = function () { offerForm(id, b.dataset.oe); }; });
  $$('[data-ow]', d).forEach(function (b) { b.onclick = function () { var o = D.offers.filter(function (x) { return x.id === b.dataset.ow; })[0]; var txt = offerText(l, o); window.open(waUrl(l.whatsapp || l.phone, txt), '_blank', 'noopener'); }; });
  if ($('#ldEdit')) $('#ldEdit').onclick = function () { X.editing = id; renderLead(id); };
  if ($('#ldCancel')) $('#ldCancel').onclick = function () { X.editing = null; renderLead(id); };
  if ($('#ldSave')) $('#ldSave').onclick = function () { act(API.patch('/api/hq/leads/' + id, readLead()), t('Saved')).then(function () { X.editing = null; renderLead(id); }); };
  if ($('#ldAssign')) $('#ldAssign').onclick = function () { act(API.patch('/api/hq/leads/' + id, { ownerId: val('ldOwner') || null }), t('Saved')); };
  if ($('#ldConv')) $('#ldConv').onclick = function () { convertModal(id); };
  if ($('#ldGo')) $('#ldGo').onclick = function () { openClient(l.clientId); };
  if ($('#ldDel')) $('#ldDel').onclick = function () { ask(t('Are you sure?'), t('This cannot be undone.')).then(function (ok) { if (ok) act(API.del('/api/hq/leads/' + id), t('Deleted')).then(closeDrawer); }); };
}
function fillTpl(txt, l) { return String(txt).replace(/\{business\}/g, l.name || '').replace(/\{contact\}/g, l.contactName || '').replace(/\{me\}/g, D.me.name.split(' ')[0]).replace(/\{link\}/g, myLink()); }
function waModal(l) {
  var tp = D.settings.templates || [];
  modal('<div class="dh"><h2>' + ic('wa') + ' ' + esc(l.name) + '</h2><button class="ib" data-x style="margin-inline-start:auto">' + ic('x') + '</button></div><div class="db"><div class="seg" id="tpS">' + tp.map(function (x, i) { return '<button data-i="' + i + '" aria-pressed="' + (i === 0) + '">' + esc(x.name) + '</button>'; }).join('') + '<button data-i="-1">' + (S.lang === 'ar' ? 'فارغة' : 'Blank') + '</button></div><textarea class="in" id="waTx" style="min-height:170px">' + esc(tp[0] ? fillTpl(tp[0].text, l) : '') + '</textarea><label class="sw"><input type="checkbox" id="waLog" checked> ' + t('Log activity') + '</label></div><div class="df"><button class="btn btn-wa" id="waGo">' + ic('wa', 16) + t('Open WhatsApp') + '</button><button class="btn btn-s" data-x>' + t('Cancel') + '</button></div>');
  $$('#tpS [data-i]').forEach(function (b) { b.onclick = function () { var i = +b.dataset.i; $('#waTx').value = i < 0 ? '' : fillTpl(tp[i].text, l); $$('#tpS [data-i]').forEach(function (x) { x.setAttribute('aria-pressed', x === b); }); }; });
  $('#waGo').onclick = function () { var txt = $('#waTx').value, lg = $('#waLog').checked; window.open(waUrl(l.whatsapp || l.phone, txt), '_blank', 'noopener'); closeModal(); if (lg) act(API.post('/api/hq/activities', { leadId: l.id, type: 'whatsapp', text: txt.slice(0, 500) })); };
}
function offerText(l, o) {
  var svc = (o.services || []).map(function (s) { var x = D.settings.services.filter(function (y) { return y.id === s; })[0]; return x ? x.en : s; }).join(', ');
  return 'Hi ' + (l.contactName || l.name) + ',\nHere is our offer for ' + l.name + ':\n' + (o.title ? '• ' + o.title + '\n' : '') + (svc ? '• ' + svc + '\n' : '') + '• Setup: ' + money(o.setupPrice) + '\n' + (o.monthlyPrice ? '• Monthly: ' + money(o.monthlyPrice) + (o.monthlyAfterMonths ? ' (starts after ' + o.monthlyAfterMonths + ' months)' : '') + '\n' : '') + (o.notes ? o.notes + '\n' : '') + '\n' + D.me.name + ' — Solunera';
}
function offerForm(lid, oid) {
  var o = oid ? D.offers.filter(function (x) { return x.id === oid; })[0] : { services: [], setupPrice: '', monthlyPrice: '', monthlyAfterMonths: 12 };
  var sel = (o.services || []).slice();
  modal('<div class="dh"><h2>' + (oid ? t('Edit') : t('New offer')) + '</h2><button class="ib" data-x style="margin-inline-start:auto">' + ic('x') + '</button></div><div class="db">' + fld('oTitle', t('Title'), o.title, { ph: S.lang === 'ar' ? 'مثلاً: موقع + نظام طلبات' : 'e.g. Website + ordering system' }) +
    '<div class="fld"><label>' + t('Services') + '</label><div class="seg" id="oSv" style="flex-wrap:wrap">' + D.settings.services.map(function (s) { return '<button type="button" data-s="' + esc(s.id) + '" aria-pressed="' + (sel.indexOf(s.id) >= 0) + '">' + esc(S.lang === 'ar' ? s.ar : s.en) + '</button>'; }).join('') + '</div></div>' +
    '<div class="frow">' + fld('oSetup', t('Setup price') + ' $', o.setupPrice, { type: 'number' }) + fld('oMonthly', t('Monthly') + ' $', o.monthlyPrice, { type: 'number' }) + fld('oAfter', t('Monthly starts after (months)'), o.monthlyAfterMonths, { type: 'number' }) + fld('oValid', t('Valid until'), o.validUntil, { type: 'date' }) + '</div>' + fld('oNotes', t('Notes'), o.notes, { area: true }) + '</div>' +
    '<div class="df"><button class="btn btn-p" id="oSave">' + t('Save') + '</button>' + (!oid ? '<button class="btn btn-s" id="oSend">' + t('Save') + ' + ' + t('Mark sent') + '</button>' : '') + '<button class="btn btn-s" data-x>' + t('Cancel') + '</button>' + (oid ? '<button class="btn btn-bad" id="oDel" style="margin-inline-start:auto">' + ic('trash', 15) + '</button>' : '') + '</div>');
  $$('#oSv [data-s]').forEach(function (b) { b.onclick = function () { var i = sel.indexOf(b.dataset.s); if (i < 0) sel.push(b.dataset.s); else sel.splice(i, 1); b.setAttribute('aria-pressed', i < 0); }; });
  function body(sent) { var b = { leadId: lid, title: val('oTitle'), services: sel, setupPrice: +val('oSetup') || 0, monthlyPrice: +val('oMonthly') || 0, monthlyAfterMonths: +val('oAfter') || 0, validUntil: val('oValid'), notes: val('oNotes') }; if (sent) b.status = 'sent'; return b; }
  $('#oSave').onclick = function () { act(oid ? API.patch('/api/hq/offers/' + oid, body()) : API.post('/api/hq/offers', body()), t('Saved')).then(closeModal); };
  if ($('#oSend')) $('#oSend').onclick = function () { act(API.post('/api/hq/offers', body(true)), t('Saved')).then(closeModal); };
  if ($('#oDel')) $('#oDel').onclick = function () { act(API.del('/api/hq/offers/' + oid), t('Deleted')).then(closeModal); };
}
function lostModal(id) {
  modal('<div class="dh"><h2>' + t('lost') + '</h2></div><div class="db">' + fld('lsR', S.lang === 'ar' ? 'السبب' : 'Reason', '', { ph: S.lang === 'ar' ? 'مثلاً: الميزانية، لديهم مطور…' : 'e.g. budget, already have a developer…' }) + '</div><div class="df"><button class="btn btn-bad" id="lsOk">' + t('Confirm') + '</button><button class="btn btn-s" data-x>' + t('Cancel') + '</button></div>', true);
  $('#lsOk').onclick = function () { act(API.patch('/api/hq/leads/' + id, { stage: 'lost', lostReason: val('lsR') }), t('lost')).then(closeModal); };
}
function convertModal(id) {
  var l = lead(id), acc = offersOf(id).filter(function (o) { return o.status === 'accepted'; }).pop();
  modal('<div class="dh"><h2>' + t('Convert to client') + '</h2></div><div class="db"><p class="muted">' + (acc ? (S.lang === 'ar' ? 'سيُنشأ عميل ومشروع بعقد من العرض المقبول: ' : 'A client and a project will be created with the contract from the accepted offer: ') + '<b>' + money(acc.setupPrice) + (acc.monthlyPrice ? ' + ' + money(acc.monthlyPrice) + '/mo' : '') + '</b>' : (S.lang === 'ar' ? 'لا يوجد عرض مقبول — يمكنك تعبئة العقد لاحقاً.' : 'No accepted offer — you can fill in the contract later.')) + '</p><div class="frow">' + fld('cvName', t('Project'), (acc && acc.title) || (l.name + ' — website')) + fld('cvStart', t('Start date'), today(), { type: 'date' }) + '</div></div><div class="df"><button class="btn btn-ok" id="cvOk">' + t('Confirm') + '</button><button class="btn btn-s" data-x>' + t('Cancel') + '</button></div>', true);
  $('#cvOk').onclick = function () { act(API.post('/api/hq/leads/' + id + '/convert', { projectName: val('cvName'), startedAt: val('cvStart') }), '🎉 ' + t('Saved')).then(function (r) { closeModal(); openProject(r.project.id); }); };
}

/* ============ clients ============ */
function clientFields(c) {
  c = c || {};
  return '<div class="frow">' + fld('cName', t('Client') + ' *', c.name) + fld('cCat', t('Type'), c.category, { opts: [['', '']].concat(CATS.map(function (x) { return [x, catName(x)]; })) }) + fld('cStatus', t('Status'), c.status || 'active', { opts: ['active', 'paused', 'ended', 'prospect'].map(function (s) { return [s, t(s)]; }) }) + '</div>' +
    '<div class="frow">' + fld('cContact', t('Contact person'), c.contactName) + fld('cPhone', t('Phone'), c.phone, { dir: 'ltr' }) + fld('cEmail', t('Email'), c.email, { dir: 'ltr' }) + '</div>' +
    '<div class="frow">' + fld('cIg', t('Instagram'), c.instagram, { dir: 'ltr' }) + fld('cWeb', t('Website'), c.website, { dir: 'ltr' }) + fld('cCity', t('City'), c.city) + fld('cCountry', t('Country'), c.country) + '</div>' +
    '<div class="frow">' + fld('cStart', t('Since'), c.startedAt || today(), { type: 'date' }) + fld('cEnd', t('End date'), c.endedAt, { type: 'date' }) + fld('cTax', S.lang === 'ar' ? 'الرقم الضريبي / السجل' : 'Tax / registration no.', c.taxId) + '</div>' + fld('cNotes', t('Notes'), c.notes, { area: true });
}
function readClient() { return { name: val('cName'), category: val('cCat'), status: val('cStatus'), contactName: val('cContact'), phone: val('cPhone'), email: val('cEmail'), instagram: val('cIg'), website: val('cWeb'), city: val('cCity'), country: val('cCountry'), startedAt: val('cStart'), endedAt: val('cEnd'), taxId: val('cTax'), notes: val('cNotes') }; }
function clientForm() {
  modal('<div class="dh"><h2>' + t('New client') + '</h2><button class="ib" data-x style="margin-inline-start:auto">' + ic('x') + '</button></div><div class="db">' + clientFields() + '</div><div class="df"><button class="btn btn-p" id="cOk">' + t('Save') + '</button><button class="btn btn-s" data-x>' + t('Cancel') + '</button></div>');
  $('#cOk').onclick = function () { act(API.post('/api/hq/clients', readClient()), t('Saved')).then(function (c) { closeModal(); openClient(c.id); }); };
}
function openClient(id) { X.editing = null; openDrawer(function () { renderClient(id); }); }
function renderClient(id) {
  var c = client(id), d = $('#drawer'); if (!c) return closeDrawer();
  var ps = (D.projects || []).filter(function (p) { return p.clientId === id; }), inv = (D.invoices || []).filter(function (i) { return i.clientId === id; }).sort(function (a, b) { return b.dueDate.localeCompare(a.dueDate); });
  var paid = clientPaid(id), up = clientUnpaid(id), mo = clientMonthly(id), yearsIn = c.startedAt ? U.daysBetween(c.startedAt, today()) / 365 : 0;
  var body = '<div class="kpis">' + kpi(t('Lifetime paid'), money(paid), c.startedAt ? t('Since') + ' ' + dfmt(c.startedAt) : '') + kpi(t('Unpaid'), money(up), '') + kpi(t('Monthly'), money(mo), money(mo * 12) + ' ' + t('per year'), true) + '</div>';
  if (X.editing === id) body += '<div class="card card-b" style="display:grid;gap:12px">' + clientFields(c) + '<div style="display:flex;gap:8px"><button class="btn btn-p" id="ceSave">' + t('Save') + '</button><button class="btn btn-s" id="ceCancel">' + t('Cancel') + '</button><button class="btn btn-bad" id="ceDel" style="margin-inline-start:auto">' + ic('trash', 15) + '</button></div></div>';
  else body += '<div class="card card-b"><dl class="kv">' + [['Status', pPill(c.status), 1], ['Contact person', esc(c.contactName)], ['Phone', '<span class="ltr">' + esc(c.phone) + '</span>'], ['Email', esc(c.email)], ['Instagram', c.instagram ? '@' + esc(c.instagram) : ''], ['Website', c.website ? '<a href="' + esc(/^https?:/.test(c.website) ? c.website : 'https://' + c.website) + '" target="_blank" rel="noopener">' + esc(c.website) + '</a>' : ''], ['City', esc([c.city, c.country].filter(Boolean).join(', '))], ['Since', dfmt(c.startedAt) + (c.endedAt ? ' → ' + dfmt(c.endedAt) : '') + (yearsIn ? ' <span class="muted">(' + (Math.round(yearsIn * 10) / 10) + (S.lang === 'ar' ? ' سنة)' : ' yrs)') + '</span>' : '')], ['Notes', esc(c.notes)]].filter(function (r) { return r[1] && r[1] !== '<span class="ltr"></span>'; }).map(function (r) { return '<dt>' + t(r[0]) + '</dt><dd>' + r[1] + '</dd>'; }).join('') + '</dl><div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap"><button class="btn btn-s btn-sm" id="ceEdit">' + t('Edit') + '</button>' + (waUrl(c.phone) ? '<a class="btn btn-wa btn-sm" target="_blank" rel="noopener" href="' + waUrl(c.phone) + '">' + ic('wa', 14) + ' WhatsApp</a>' : '') + (c.leadId && lead(c.leadId) ? '<button class="btn btn-s btn-sm" id="ceLead">' + (S.lang === 'ar' ? 'سجل المبيعات' : 'Sales history') + '</button>' : '') + '</div></div>';
  body += '<div class="card"><div class="card-h"><h3>' + t('Projects') + '</h3><div class="sp"><button class="btn btn-s btn-sm" id="ceProj">' + ic('plus', 14) + t('New project') + '</button></div></div><div class="lst">' + (ps.map(function (p) { var k = p.contract || {}; return '<div class="li" data-project="' + p.id + '"><span class="av sm">' + ic('proj', 12) + '</span><div class="m"><b>' + esc(p.name) + '</b><span class="muted sm">' + (p.stack || []).join(' · ') + '</span></div>' + pPill(p.status) + '<span class="money sm">' + money(k.setupFee) + (k.monthlyFee ? ' + ' + money(k.monthlyFee) + '/mo' : '') + '</span></div>'; }).join('') || '<div class="empty">' + t('Nothing here yet') + '</div>') + '</div></div>';
  body += '<div class="card"><div class="card-h"><h3>' + t('Invoices') + '</h3><div class="sp"><button class="btn btn-s btn-sm" id="ceInv">' + ic('plus', 14) + t('Add invoice') + '</button></div></div><div class="tw"><table><tbody>' + (inv.map(function (i) { return '<tr><td>' + esc(i.label) + '</td><td class="tn">' + dfmt(i.dueDate) + '</td><td>' + iPill(i) + '</td><td class="n money">' + money(i.amount) + '</td><td style="text-align:end">' + (i.status === 'unpaid' ? '<button class="btn btn-ok btn-sm" data-pay="' + i.id + '">' + ic('check', 14) + '</button>' : '') + '</td></tr>'; }).join('') || '<tr><td><div class="empty">' + t('Nothing here yet') + '</div></td></tr>') + '</tbody></table></div></div>';
  d.innerHTML = '<div class="dh"><span class="av">' + esc(initials(c.name)) + '</span><div style="flex:1;min-width:0"><h2>' + esc(c.name) + '</h2><div class="muted sm">' + esc(catName(c.category)) + (c.city ? ' · ' + esc(c.city) : '') + '</div></div><button class="ib" id="ceX">' + ic('x') + '</button></div><div class="db">' + body + '</div>';
  $('#ceX').onclick = closeDrawer; wire(d); wireRen(d);
  if ($('#ceEdit')) $('#ceEdit').onclick = function () { X.editing = id; renderClient(id); };
  if ($('#ceCancel')) $('#ceCancel').onclick = function () { X.editing = null; renderClient(id); };
  if ($('#ceSave')) $('#ceSave').onclick = function () { act(API.patch('/api/hq/clients/' + id, readClient()), t('Saved')).then(function () { X.editing = null; renderClient(id); }); };
  if ($('#ceDel')) $('#ceDel').onclick = function () { ask(t('Are you sure?'), t('This cannot be undone.')).then(function (ok) { if (ok) act(API.del('/api/hq/clients/' + id), t('Deleted')).then(closeDrawer); }); };
  if ($('#ceLead')) $('#ceLead').onclick = function () { openLead(c.leadId); };
  $('#ceProj').onclick = function () { projectForm(id); };
  $('#ceInv').onclick = function () { invoiceForm(id); };
}

/* ============ projects ============ */
var STACKS = ['HTML/CSS', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Vue', 'Node.js', 'Express', 'PHP', 'Laravel', 'Python', 'Django', 'Flutter', 'React Native', 'Tailwind', 'PostgreSQL', 'MySQL', 'MongoDB', 'Supabase', 'Firebase', 'Prisma', 'Drizzle', 'OpenAI', 'Anthropic', 'OpenRouter', 'Three.js', 'WordPress', 'Shopify'];
function projectForm(clientId) {
  var cs = D.clients || [];
  if (!cs.length) { toast(S.lang === 'ar' ? 'أضف عميلاً أولاً' : 'Add a client first', 'err'); return clientForm(); }
  modal('<div class="dh"><h2>' + t('New project') + '</h2><button class="ib" data-x style="margin-inline-start:auto">' + ic('x') + '</button></div><div class="db"><div class="frow">' + fld('npC', t('Client'), clientId || cs[0].id, { opts: cs.map(function (c) { return [c.id, c.name]; }) }) + fld('npN', t('Project') + ' *', '') + fld('npT', t('Type'), 'website', { opts: [['website', 'Website'], ['system', 'Management system'], ['booking', 'Booking platform'], ['ordering', 'Ordering / e-commerce'], ['ai', 'AI assistant'], ['app', 'Mobile app'], ['social', 'Social / ads'], ['other', 'Other']] }) + '</div>' +
    '<div class="frow">' + fld('npS', t('Start date'), today(), { type: 'date' }) + fld('npSetup', t('Setup fee') + ' $', '', { type: 'number' }) + fld('npMo', t('Monthly fee') + ' $', '', { type: 'number' }) + fld('npMs', t('Monthly starts on'), U.addMonths(today().slice(0, 7), 12) + '-' + ('0' + Math.min(28, +today().slice(8, 10))).slice(-2), { type: 'date' }) + '</div></div><div class="df"><button class="btn btn-p" id="npOk">' + t('Save') + '</button><button class="btn btn-s" data-x>' + t('Cancel') + '</button></div>');
  $('#npOk').onclick = function () { var st = val('npS'); act(API.post('/api/hq/projects', { clientId: val('npC'), name: val('npN'), type: val('npT'), startDate: st, contract: { start: st, setupFee: +val('npSetup') || 0, monthlyFee: +val('npMo') || 0, monthlyStart: +val('npMo') ? val('npMs') : '', billingDay: Math.min(28, +(val('npMs') || st).slice(8, 10) || 1) } }), t('Saved')).then(function (p) { closeModal(); openProject(p.id); }); };
}
function openProject(id) { X.projTab = X.projTab || 'overview'; openDrawer(function () { renderProject(id); }); }
function renderProject(id) {
  var p = project(id), d = $('#drawer'); if (!p) return closeDrawer();
  var c = client(p.clientId) || {}, k = p.contract || {}, h = p.hosting || {}, dbx = p.database || {}, dm = p.domain || {}, tab = X.projTab;
  var inv = (D.invoices || []).filter(function (i) { return i.projectId === id; }).sort(function (a, b) { return a.dueDate.localeCompare(b.dueDate); });
  var paid = inv.filter(function (i) { return i.status === 'paid'; }).reduce(function (a, i) { return a + i.amount; }, 0);
  var body = '';
  if (tab === 'overview') {
    body += '<div class="kpis">' + kpi(t('Setup fee'), money(k.setupFee), k.setupPaid ? '✓ ' + t('paid') : t('unpaid')) + kpi(t('Monthly fee'), money(k.monthlyFee), k.monthlyStart ? (k.monthlyStart > today() ? (S.lang === 'ar' ? 'يبدأ ' : 'starts ') + dfmt(k.monthlyStart) : (S.lang === 'ar' ? 'منذ ' : 'since ') + dfmt(k.monthlyStart)) : '—', true) + kpi(t('Lifetime paid'), money(paid), '') + '</div>' +
      '<div class="card card-b" style="display:grid;gap:12px"><div class="frow">' + fld('pN', t('Project'), p.name) + fld('pSt', t('Status'), p.status, { opts: U.PROJECT_ST.map(function (s) { return [s, t(s)]; }) }) + fld('pT', t('Type'), p.type) + '</div>' +
      '<div class="frow">' + fld('pS', t('Start date'), p.startDate, { type: 'date' }) + fld('pDl', t('Delivery date'), p.deliveryDate, { type: 'date' }) + fld('pE', t('End date'), p.endDate, { type: 'date' }) + '</div>' +
      '<div class="frow">' + fld('pLive', t('Live URL'), p.liveUrl, { dir: 'ltr' }) + fld('pAdm', t('Admin URL'), p.adminUrl, { dir: 'ltr' }) + fld('pRepo', t('Repository'), p.repoUrl, { dir: 'ltr' }) + '</div>' +
      fld('pDesc', t('Description'), p.description, { area: true }) + fld('pNotes', t('Notes'), p.notes, { area: true }) +
      '<div style="display:flex;gap:8px;flex-wrap:wrap">' + [p.liveUrl, p.adminUrl, p.repoUrl].filter(Boolean).map(function (u) { return '<a class="btn btn-s btn-sm" target="_blank" rel="noopener" href="' + esc(/^https?:/.test(u) ? u : 'https://' + u) + '">' + ic('link', 14) + esc(u.replace(/^https?:\/\//, '').slice(0, 40)) + '</a>'; }).join('') + '</div></div>';
  }
  if (tab === 'tech') {
    var st = (p.stack || []).slice();
    body += '<div class="card card-b" style="display:grid;gap:10px"><div class="sec-t">' + t('Stack') + '</div><div class="seg" id="stk" style="flex-wrap:wrap">' + STACKS.concat(st.filter(function (s) { return STACKS.indexOf(s) < 0; })).map(function (s) { return '<button data-s="' + esc(s) + '" aria-pressed="' + (st.indexOf(s) >= 0) + '">' + esc(s) + '</button>'; }).join('') + '</div>' + fld('pStkX', S.lang === 'ar' ? 'تقنيات أخرى (مفصولة بفواصل)' : 'Other (comma separated)', '') +
      '<div class="sec-t">' + t('Hosting') + '</div><div class="frow">' + fld('hP', t('Provider'), h.provider, { ph: 'Render, Vercel, Hostinger…' }) + fld('hPl', t('Plan'), h.plan) + fld('hU', t('URL'), h.url, { dir: 'ltr' }) + fld('hC', t('Monthly cost') + ' $', h.monthlyCost, { type: 'number' }) + fld('hR', t('Renewal date'), h.renewalDate, { type: 'date' }) + fld('hA', S.lang === 'ar' ? 'الحساب / البريد' : 'Account / email', h.account, { dir: 'ltr' }) + '</div>' +
      '<div class="sec-t">' + t('Database') + '</div><div class="frow">' + fld('dP', t('Provider'), dbx.provider, { ph: 'Supabase, Neon, MySQL…' }) + fld('dN', t('Name'), dbx.name) + fld('dR', S.lang === 'ar' ? 'المنطقة' : 'Region', dbx.region) + fld('dC', t('Monthly cost') + ' $', dbx.monthlyCost, { type: 'number' }) + fld('dA', S.lang === 'ar' ? 'الحساب / البريد' : 'Account / email', dbx.account, { dir: 'ltr' }) + '</div>' +
      '<div class="sec-t">' + t('Domain') + '</div><div class="frow">' + fld('mN', t('Domain'), dm.name, { dir: 'ltr' }) + fld('mR', t('Registrar'), dm.registrar) + fld('mD', t('Renewal date'), dm.renewalDate, { type: 'date' }) + fld('mC', t('Yearly cost') + ' $', dm.yearlyCost, { type: 'number' }) + fld('mO', S.lang === 'ar' ? 'المالك' : 'Owned by', dm.owner, { opts: [['', ''], ['client', S.lang === 'ar' ? 'العميل' : 'Client'], ['solunera', 'Solunera']] }) + '</div>' +
      '<button class="btn btn-p" id="tSave" style="justify-self:start">' + t('Save') + '</button></div>';
    X._stk = st;
  }
  if (tab === 'contract') {
    body += '<div class="card card-b" style="display:grid;gap:12px"><div class="frow">' + fld('kS', t('Contract start'), k.start, { type: 'date' }) + fld('kE', t('Contract end'), k.end, { type: 'date' }) + '</div>' +
      '<div class="frow">' + fld('kSetup', t('Setup fee') + ' $', k.setupFee, { type: 'number' }) + '<label class="sw" style="align-self:end;padding-bottom:9px"><input type="checkbox" id="kSP"' + (k.setupPaid ? ' checked' : '') + '> ' + t('Setup paid') + '</label></div>' +
      '<div class="frow">' + fld('kMo', t('Monthly fee') + ' $', k.monthlyFee, { type: 'number' }) + fld('kMs', t('Monthly starts on'), k.monthlyStart, { type: 'date' }) + fld('kBd', t('Billing day'), k.billingDay || 1, { type: 'number' }) + '</div>' +
      fld('kN', t('Notes'), k.notes, { area: true }) + '<p class="muted sm">' + (S.lang === 'ar' ? 'تُنشأ فاتورة شهرية تلقائياً كل شهر من تاريخ بدء الاشتراك حتى نهاية العقد، وفاتورة تأسيس واحدة.' : 'A monthly invoice is created automatically every month from the monthly start date until the contract ends, plus one setup invoice.') + '</p><button class="btn btn-p" id="kSave" style="justify-self:start">' + t('Save') + '</button></div>' +
      '<div class="card"><div class="card-h"><h3>' + t('Invoices') + '</h3><div class="sp"><button class="btn btn-s btn-sm" id="pInv">' + ic('plus', 14) + t('Add invoice') + '</button></div></div><div class="tw"><table><tbody>' + (inv.map(function (i) { return '<tr><td>' + esc(i.label) + '</td><td class="tn">' + dfmt(i.dueDate) + '</td><td>' + iPill(i) + '</td><td class="n money">' + money(i.amount) + '</td><td style="text-align:end">' + (i.status === 'unpaid' ? '<button class="btn btn-ok btn-sm" data-pay="' + i.id + '">' + ic('check', 14) + '</button>' : '') + '</td></tr>'; }).join('') || '<tr><td><div class="empty">' + t('Nothing here yet') + '</div></td></tr>') + '</tbody></table></div></div>';
  }
  if (tab === 'vault') {
    body += '<div class="card card-b" style="display:grid;gap:12px"><p class="muted sm">' + ic('lock', 14) + ' ' + (S.lang === 'ar' ? 'المفاتيح وكلمات المرور مشفرة على الخادم (AES-256). كل إظهار يُسجّل في السجل.' : 'Keys and passwords are encrypted on the server (AES-256). Every reveal is written to the activity log.') + '</p><div class="vault">' +
      ((p.secrets || []).map(function (s) { return '<div class="vrow">' + ic('key', 16) + '<div style="min-width:0;flex:1"><b>' + esc(s.label) + '</b><div class="muted sm">' + esc(s.kind || '') + ' · ' + esc(s.hint || '') + '</div><code id="sv-' + s.id + '" hidden></code></div><button class="btn btn-s btn-sm" data-rv="' + s.id + '">' + ic('eye', 14) + t('Reveal') + '</button><button class="ib" data-sd="' + s.id + '">' + ic('trash', 15) + '</button></div>'; }).join('') || '<div class="empty">' + t('Nothing here yet') + '</div>') + '</div>' +
      '<div class="sec-t">' + t('Add secret') + '</div><div class="frow">' + fld('sL', t('Label'), '', { ph: 'OpenAI API key, Supabase secret, admin password…' }) + fld('sK', t('Type'), 'api_key', { opts: [['api_key', 'API key'], ['password', 'Password'], ['token', 'Token'], ['env', '.env'], ['other', 'Other']] }) + '</div>' + fld('sV', t('Value'), '', { area: true, dir: 'ltr' }) + '<button class="btn btn-p" id="sAdd" style="justify-self:start">' + ic('lock', 15) + t('Add secret') + '</button></div>';
  }
  d.innerHTML = '<div class="dh"><span class="av">' + ic('proj', 15) + '</span><div style="flex:1;min-width:0"><h2>' + esc(p.name) + '</h2><div class="muted sm"><a href="#" id="pCl">' + esc(c.name || '') + '</a> · ' + t(p.status) + '</div></div><button class="ib" id="pX">' + ic('x') + '</button></div>' +
    '<div class="dtabs" role="tablist">' + [['overview', t('Overview tab')], ['tech', t('Tech & hosting')], ['contract', t('Contract & billing')], ['vault', t('Vault') + ' (' + (p.secrets || []).length + ')']].map(function (x) { return '<button role="tab" data-tab="' + x[0] + '" aria-selected="' + (tab === x[0]) + '">' + x[1] + '</button>'; }).join('') + '</div>' +
    '<div class="db">' + body + '</div>' + (tab === 'overview' ? '<div class="df"><button class="btn btn-p" id="pSave">' + t('Save') + '</button><button class="btn btn-bad" id="pDel" style="margin-inline-start:auto">' + ic('trash', 15) + t('Delete') + '</button></div>' : '');
  $('#pX').onclick = closeDrawer; $('#pCl').onclick = function (e) { e.preventDefault(); openClient(p.clientId); };
  $$('[data-tab]', d).forEach(function (b) { b.onclick = function () { X.projTab = b.dataset.tab; renderProject(id); }; });
  wireRen(d);
  if ($('#pSave')) $('#pSave').onclick = function () { act(API.patch('/api/hq/projects/' + id, { name: val('pN'), status: val('pSt'), type: val('pT'), startDate: val('pS'), deliveryDate: val('pDl'), endDate: val('pE'), liveUrl: val('pLive'), adminUrl: val('pAdm'), repoUrl: val('pRepo'), description: val('pDesc'), notes: val('pNotes') }), t('Saved')); };
  if ($('#pDel')) $('#pDel').onclick = function () { ask(t('Are you sure?'), S.lang === 'ar' ? 'سيُحذف المشروع والفواتير غير المدفوعة.' : 'The project and its unpaid invoices will be deleted.').then(function (ok) { if (ok) act(API.del('/api/hq/projects/' + id), t('Deleted')).then(closeDrawer); }); };
  $$('#stk [data-s]').forEach(function (b) { b.onclick = function () { var i = X._stk.indexOf(b.dataset.s); if (i < 0) X._stk.push(b.dataset.s); else X._stk.splice(i, 1); b.setAttribute('aria-pressed', i < 0); }; });
  if ($('#tSave')) $('#tSave').onclick = function () { var stk = X._stk.concat((val('pStkX') || '').split(',').map(function (s) { return s.trim(); }).filter(Boolean)); act(API.patch('/api/hq/projects/' + id, { stack: stk, hosting: { provider: val('hP'), plan: val('hPl'), url: val('hU'), monthlyCost: +val('hC') || 0, renewalDate: val('hR'), account: val('hA') }, database: { provider: val('dP'), name: val('dN'), region: val('dR'), monthlyCost: +val('dC') || 0, account: val('dA') }, domain: { name: val('mN'), registrar: val('mR'), renewalDate: val('mD'), yearlyCost: +val('mC') || 0, owner: val('mO') } }), t('Saved')); };
  if ($('#kSave')) $('#kSave').onclick = function () { act(API.patch('/api/hq/projects/' + id, { contract: { start: val('kS'), end: val('kE'), setupFee: +val('kSetup') || 0, setupPaid: val('kSP'), monthlyFee: +val('kMo') || 0, monthlyStart: val('kMs'), billingDay: +val('kBd') || 1, notes: val('kN') } }), t('Saved')); };
  if ($('#pInv')) $('#pInv').onclick = function () { invoiceForm(p.clientId, id); };
  $$('[data-rv]', d).forEach(function (b) { b.onclick = function () {
    var sid = b.dataset.rv, box = $('#sv-' + sid);
    API.post('/api/hq/projects/' + id + '/secrets/' + sid + '/reveal').then(function (r) { box.textContent = r.value; box.hidden = false; b.outerHTML = '<button class="btn btn-s btn-sm" id="cp-' + sid + '">' + ic('copy', 14) + t('Copy') + '</button>'; $('#cp-' + sid).onclick = function () { copy(r.value); }; setTimeout(function () { if (box) { box.textContent = ''; box.hidden = true; } }, 30000); })
      .catch(function (e) { toast(esc(e.message), 'err'); });
  }; });
  $$('[data-sd]', d).forEach(function (b) { b.onclick = function () { ask(t('Are you sure?'), t('This cannot be undone.')).then(function (ok) { if (ok) act(API.del('/api/hq/projects/' + id + '/secrets/' + b.dataset.sd), t('Deleted')); }); }; });
  if ($('#sAdd')) $('#sAdd').onclick = function () { act(API.post('/api/hq/projects/' + id + '/secrets', { label: val('sL'), kind: val('sK'), value: val('sV') }), t('Saved')); };
}

/* ============ invoices ============ */
function invoiceForm(clientId, projectId) {
  var cs = D.clients || []; if (!cs.length) return toast(S.lang === 'ar' ? 'أضف عميلاً أولاً' : 'Add a client first', 'err');
  var cid = clientId || cs[0].id;
  modal('<div class="dh"><h2>' + t('Add invoice') + '</h2><button class="ib" data-x style="margin-inline-start:auto">' + ic('x') + '</button></div><div class="db"><div class="frow">' + fld('ivC', t('Client'), cid, { opts: cs.map(function (c) { return [c.id, c.name]; }) }) + fld('ivP', t('Project'), projectId || '', { opts: [['', '—']].concat((D.projects || []).filter(function (p) { return p.clientId === cid; }).map(function (p) { return [p.id, p.name]; })) }) + '</div><div class="frow">' + fld('ivL', t('Label'), '', { ph: S.lang === 'ar' ? 'مثلاً: تعديلات إضافية' : 'e.g. Extra pages' }) + fld('ivA', t('Amount') + ' $', '', { type: 'number' }) + fld('ivD', t('Due'), today(), { type: 'date' }) + '</div><label class="sw"><input type="checkbox" id="ivPaid"> ' + t('paid') + '</label></div><div class="df"><button class="btn btn-p" id="ivOk">' + t('Save') + '</button><button class="btn btn-s" data-x>' + t('Cancel') + '</button></div>');
  $('#ivC').onchange = function () { var c2 = this.value; $('#ivP').innerHTML = '<option value="">—</option>' + (D.projects || []).filter(function (p) { return p.clientId === c2; }).map(function (p) { return '<option value="' + p.id + '">' + esc(p.name) + '</option>'; }).join(''); };
  $('#ivOk').onclick = function () { act(API.post('/api/hq/invoices', { clientId: val('ivC'), projectId: val('ivP') || null, label: val('ivL'), amount: +val('ivA'), dueDate: val('ivD'), paid: val('ivPaid') }), t('Saved')).then(closeModal); };
}
function payModal(iid) {
  var i = (D.invoices || []).filter(function (x) { return x.id === iid; })[0]; if (!i) return;
  modal('<div class="dh"><h2>' + t('Mark paid') + ' · ' + money(i.amount) + '</h2></div><div class="db"><p class="muted">' + esc((client(i.clientId) || {}).name || '') + ' — ' + esc(i.label) + '</p><div class="frow">' + fld('pyD', S.lang === 'ar' ? 'تاريخ الدفع' : 'Paid on', today(), { type: 'date' }) + fld('pyM', t('Method'), 'Cash', { opts: [['Cash', S.lang === 'ar' ? 'نقداً' : 'Cash'], ['Whish', 'Whish'], ['OMT', 'OMT'], ['Bank transfer', S.lang === 'ar' ? 'تحويل بنكي' : 'Bank transfer'], ['Card', S.lang === 'ar' ? 'بطاقة' : 'Card'], ['USDT', 'USDT'], ['Other', S.lang === 'ar' ? 'أخرى' : 'Other']] }) + '</div>' + fld('pyA', t('Amount') + ' $', i.amount, { type: 'number' }) + '</div><div class="df"><button class="btn btn-ok" id="pyOk">' + ic('check', 15) + t('Mark paid') + '</button><button class="btn btn-s" data-x>' + t('Cancel') + '</button></div>', true);
  $('#pyOk').onclick = function () { act(API.patch('/api/hq/invoices/' + iid, { status: 'paid', paidAt: val('pyD'), method: val('pyM'), amount: +val('pyA') }), '✓ ' + money(+val('pyA'))).then(closeModal); };
}

/* ============ portfolio form ============ */
function resize(file, max, cb) { var fr = new FileReader(); fr.onload = function () { var img = new Image(); img.onload = function () { var r = Math.min(1, max / Math.max(img.width, img.height)), c = document.createElement('canvas'); c.width = Math.round(img.width * r); c.height = Math.round(img.height * r); c.getContext('2d').drawImage(img, 0, 0, c.width, c.height); var u = c.toDataURL('image/webp', .82); if (u.indexOf('data:image/webp') !== 0) u = c.toDataURL('image/jpeg', .85); cb(u); }; img.src = fr.result; }; fr.readAsDataURL(file); }
function portfolioForm(pid) {
  var p = pid ? D.portfolio.filter(function (x) { return x.id === pid; })[0] : { images: [], tags: [], published: false, category: 'hospitality', year: today().slice(0, 4) };
  var imgs = (p.images || []).slice(), mob = p.mobile || '';
  modal('<div class="dh"><h2>' + (pid ? t('Edit') : t('Add')) + ' — ' + t('Portfolio') + '</h2><button class="ib" data-x style="margin-inline-start:auto">' + ic('x') + '</button></div><div class="db">' +
    '<div class="frow">' + fld('pfTe', t('Title (EN)'), p.title_en) + fld('pfTa', t('Title (AR)'), p.title_ar, { dir: 'rtl' }) + '</div>' +
    '<div class="frow">' + fld('pfCl', t('Client') + ' · ' + t('City'), p.client) + fld('pfCat', t('Category'), p.category, { opts: [['hospitality', 'Hospitality'], ['food', 'Food & ordering'], ['ai', 'AI'], ['health', 'Health'], ['retail', 'Retail'], ['other', 'Other']] }) + fld('pfY', t('Year'), p.year) + fld('pfUrl', t('Live URL'), p.liveUrl, { dir: 'ltr' }) + '</div>' +
    fld('pfSe', t('Summary (EN)'), p.summary_en, { area: true }) + fld('pfSa', t('Summary (AR)'), p.summary_ar, { area: true, dir: 'rtl' }) +
    '<div class="frow">' + fld('pfRe', t('Result (EN)'), p.results_en) + fld('pfRa', t('Result (AR)'), p.results_ar, { dir: 'rtl' }) + '</div>' + fld('pfTags', t('Tags') + ' (comma)', (p.tags || []).join(', ')) +
    '<div class="sec-t">' + (S.lang === 'ar' ? 'الصور (الأولى تظهر على البطاقة)' : 'Screenshots (the first is the cover)') + '</div><div class="imgs" id="pfImgs"></div><div style="display:flex;gap:8px;flex-wrap:wrap"><label class="btn btn-s">' + ic('image', 15) + t('Upload images') + '<input type="file" id="pfUp" accept="image/*" multiple hidden></label><label class="btn btn-s">' + ic('phone', 15) + t('Mobile screenshot') + '<input type="file" id="pfMob" accept="image/*" hidden></label></div><div id="pfMobBox"></div>' +
    '<div style="display:flex;gap:16px;flex-wrap:wrap"><label class="sw"><input type="checkbox" id="pfPub"' + (p.published ? ' checked' : '') + '> ' + t('Published') + '</label><label class="sw"><input type="checkbox" id="pfFeat"' + (p.featured ? ' checked' : '') + '> ' + t('Featured') + '</label><label class="sw"><input type="checkbox" id="pfPort"' + (p.portrait ? ' checked' : '') + '> ' + (S.lang === 'ar' ? 'صور طولية (منشورات)' : 'Portrait images (posts)') + '</label></div></div>' +
    '<div class="df"><button class="btn btn-p" id="pfOk">' + t('Save') + '</button><button class="btn btn-s" data-x>' + t('Cancel') + '</button>' + (pid ? '<button class="btn btn-bad" id="pfDel" style="margin-inline-start:auto">' + ic('trash', 15) + '</button>' : '') + '</div>');
  function draw() {
    $('#pfImgs').innerHTML = imgs.map(function (s, i) { return '<div class="it"><img src="' + esc(API.img(s, '../')) + '" alt=""><button class="ib" data-ri="' + i + '">' + ic('x', 13) + '</button>' + (i ? '<button class="ib" data-first="' + i + '" style="inset-inline-end:auto;inset-inline-start:3px;top:3px" title="cover">★</button>' : '') + '</div>'; }).join('') || '<span class="muted sm">—</span>';
    $('#pfMobBox').innerHTML = mob ? '<div class="imgs"><div class="it" style="width:70px"><img src="' + esc(API.img(mob, '../')) + '" alt="" style="width:70px;height:140px"><button class="ib" id="pfMobX">' + ic('x', 13) + '</button></div></div>' : '';
    $$('[data-ri]').forEach(function (b) { b.onclick = function () { imgs.splice(+b.dataset.ri, 1); draw(); }; });
    $$('[data-first]').forEach(function (b) { b.onclick = function () { var x = imgs.splice(+b.dataset.first, 1)[0]; imgs.unshift(x); draw(); }; });
    if ($('#pfMobX')) $('#pfMobX').onclick = function () { mob = ''; draw(); };
  }
  function upload(file, cb) { resize(file, 1800, function (du) { API.post('/api/hq/assets', { dataUrl: du }).then(function (r) { cb(r.ref); }).catch(function (e) { toast(esc(e.message), 'err'); }); }); }
  draw();
  $('#pfUp').onchange = function () { Array.prototype.forEach.call(this.files, function (f) { upload(f, function (ref) { imgs.push(ref); draw(); }); }); };
  $('#pfMob').onchange = function () { var f = this.files[0]; if (f) upload(f, function (ref) { mob = ref; draw(); }); };
  $('#pfOk').onclick = function () { var b = { title_en: val('pfTe'), title_ar: val('pfTa'), client: val('pfCl'), category: val('pfCat'), year: val('pfY'), liveUrl: val('pfUrl'), summary_en: val('pfSe'), summary_ar: val('pfSa'), results_en: val('pfRe'), results_ar: val('pfRa'), tags: val('pfTags'), images: imgs, mobile: mob, published: val('pfPub'), featured: val('pfFeat'), portrait: val('pfPort') }; act(pid ? API.patch('/api/hq/portfolio/' + pid, b) : API.post('/api/hq/portfolio', b), t('Saved')).then(closeModal); };
  if ($('#pfDel')) $('#pfDel').onclick = function () { ask(t('Are you sure?'), t('This cannot be undone.')).then(function (ok) { if (ok) act(API.del('/api/hq/portfolio/' + pid), t('Deleted')); }); };
}

/* ============ team ============ */
function userForm(uid) {
  var u = uid ? D.users.filter(function (x) { return x.id === uid; })[0] : null, others = D.users.filter(function (x) { return x.id !== uid && x.active; });
  modal('<div class="dh"><h2>' + (u ? esc(u.name) : t('Add team member')) + '</h2><button class="ib" data-x style="margin-inline-start:auto">' + ic('x') + '</button></div><div class="db"><div class="frow">' + fld('uN', t('Name'), u && u.name) + fld('uE', t('Email'), u && u.email, { dir: 'ltr', type: 'email' }) + fld('uP', t('Phone'), u && u.phone, { dir: 'ltr' }) + fld('uC', t('Commission %'), u ? u.commissionPct : 10, { type: 'number' }) + '</div>' +
    fld('uPw', u ? t('New password') : t('Temporary password'), '', { dir: 'ltr' }) +
    (u ? '<div class="link-box"><code>' + esc(myLink(u)) + '</code><button class="btn btn-s btn-sm" id="uCp">' + ic('copy', 14) + '</button></div>' : '') +
    (u && u.id !== D.me.id ? '<div class="sec-t">' + t('Move businesses to') + '</div><div style="display:flex;gap:8px"><select class="in" id="uTo">' + others.map(function (x) { return '<option value="' + x.id + '">' + esc(x.name) + '</option>'; }).join('') + '</select><button class="btn btn-s" id="uMove">' + t('Confirm') + '</button></div>' : '') + '</div>' +
    '<div class="df"><button class="btn btn-p" id="uOk">' + t('Save') + '</button><button class="btn btn-s" data-x>' + t('Cancel') + '</button>' + (u && u.id !== D.me.id ? '<button class="btn btn-bad" id="uAct" style="margin-inline-start:auto">' + (u.active ? t('Deactivate') : t('Activate')) + '</button>' : '') + '</div>');
  $('#uOk').onclick = function () { var b = { name: val('uN'), email: val('uE'), phone: val('uP'), commissionPct: +val('uC') || 0 }; if (val('uPw')) b.password = val('uPw'); act(u ? API.patch('/api/hq/users/' + uid, b) : API.post('/api/hq/users', b), t('Saved')).then(closeModal); };
  if ($('#uCp')) $('#uCp').onclick = function () { copy(myLink(u)); };
  if ($('#uMove')) $('#uMove').onclick = function () { act(API.post('/api/hq/users/' + uid + '/transfer', { to: val('uTo') }), t('Saved')).then(closeModal); };
  if ($('#uAct')) $('#uAct').onclick = function () { act(API.patch('/api/hq/users/' + uid, { active: !u.active }), t('Saved')).then(closeModal); };
}
function pwModal(forced) {
  modal('<div class="dh"><h2>' + t('Change password') + '</h2></div><div class="db">' + (forced ? '<p class="muted">' + (S.lang === 'ar' ? 'اختر كلمة مرور جديدة قبل المتابعة.' : 'Choose a new password before you continue.') + '</p>' : '') + fld('pwO', S.lang === 'ar' ? 'كلمة المرور الحالية' : 'Current password', '', { type: 'password', dir: 'ltr' }) + fld('pwN', t('New password') + ' (8+)', '', { type: 'password', dir: 'ltr' }) + '</div><div class="df"><button class="btn btn-p" id="pwOk">' + t('Save') + '</button>' + (forced ? '' : '<button class="btn btn-s" data-x>' + t('Cancel') + '</button>') + '</div>', true, forced);
  $('#pwOk').onclick = function () { API.post('/api/auth/password', { old: val('pwO'), new: val('pwN') }).then(function () { forceClose(); toast(t('Saved')); D.me.mustChange = false; }).catch(function (e) { toast(esc(e.message), 'err'); }); };
}
function postLogin() { if (D.me.mustChange) pwModal(true); }

/* ============ command palette ============ */
var cmdItems = [], cmdI = 0;
function openCmdk() { var c = $('#cmdk'); c.classList.add('on'); var i = $('#cmdkIn'); i.value = ''; i.placeholder = t('Search anything…'); cmdSearch(''); setTimeout(function () { i.focus(); }, 30); }
function closeCmdk() { $('#cmdk').classList.remove('on'); }
$('#cmdk').addEventListener('click', function (e) { if (e.target === this) closeCmdk(); });
$('#cmdkIn').addEventListener('input', function () { cmdSearch(this.value); });
$('#cmdkIn').addEventListener('keydown', function (e) {
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); cmdI = (cmdI + (e.key === 'ArrowDown' ? 1 : -1) + cmdItems.length) % Math.max(1, cmdItems.length); drawCmd(); }
  if (e.key === 'Enter' && cmdItems[cmdI]) { e.preventDefault(); var it = cmdItems[cmdI]; closeCmdk(); it.go(); }
});
function cmdSearch(q) {
  if (!D) return; q = q.trim().toLowerCase(); var qd = q.replace(/\D/g, ''), out = [];
  nav().forEach(function (n) { if (!q || t(n[1]).toLowerCase().indexOf(q) >= 0) out.push({ ic: n[2], label: t(n[1]), k: '→', go: function () { location.hash = n[0]; } }); });
  if (!q || 'add business new'.indexOf(q) >= 0 || t('Add business').toLowerCase().indexOf(q) >= 0) out.push({ ic: 'plus', label: t('Add business'), k: '+', go: leadForm });
  if (q) {
    D.leads.forEach(function (l) { if ((l.name + ' ' + (l.city || '') + ' ' + (l.contactName || '') + ' ' + (l.instagram || '')).toLowerCase().indexOf(q) >= 0 || (qd.length >= 3 && U.phoneNorm(l.phone).indexOf(qd) >= 0)) out.push({ ic: 'biz', label: l.name, sub: t(l.stage) + (l.city ? ' · ' + l.city : ''), k: t('Businesses'), go: function () { openLead(l.id); } }); });
    (D.clients || []).forEach(function (c) { if (c.name.toLowerCase().indexOf(q) >= 0) out.push({ ic: 'client', label: c.name, k: t('Clients'), go: function () { openClient(c.id); } }); });
    (D.projects || []).forEach(function (p) { if ((p.name + ' ' + (p.stack || []).join(' ') + ' ' + ((p.domain || {}).name || '') + ' ' + ((p.hosting || {}).provider || '')).toLowerCase().indexOf(q) >= 0) out.push({ ic: 'proj', label: p.name, sub: (client(p.clientId) || {}).name, k: t('Projects'), go: function () { openProject(p.id); } }); });
  }
  cmdItems = out.slice(0, 40); cmdI = 0; drawCmd();
}
function drawCmd() {
  $('#cmdkList').innerHTML = cmdItems.map(function (it, i) { return '<div class="ci' + (i === cmdI ? ' act' : '') + '" data-i="' + i + '">' + ic(it.ic, 16) + '<span>' + esc(it.label) + (it.sub ? ' <span class="muted sm">' + esc(it.sub) + '</span>' : '') + '</span><span class="k">' + esc(it.k || '') + '</span></div>'; }).join('') || '<div class="empty">—</div>';
  $$('#cmdkList [data-i]').forEach(function (el) { el.onclick = function () { var it = cmdItems[+el.dataset.i]; closeCmdk(); it.go(); }; });
  var a = $('#cmdkList .act'); if (a) a.scrollIntoView({ block: 'nearest' });
}

/* ============ boot ============ */
API.mode().then(function () { return load(); });
})();
