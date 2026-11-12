/* Solunera public site: content (EN/AR), work slider, contact form. Edit the PROJECTS list to change the work section. */
(function () {
  'use strict';

  /* ======================= CONTENT ======================= */
  var PROJECTS = [
    { plate: 'shelf', tags: ['AI agent', 'Computer vision', 'Ordering', '15 branches'],
      en: { t: 'Shelf-check AI agent', who: 'Grocery chain, 15 branches', d: 'Every shift starts with a camera walk down the aisles. The model recognises each product, marks what is on the shelf, and lists what is missing, so the online store never sells what isn’t there. It runs next to the accounting software each branch already uses.' },
      ar: { t: 'وكيل ذكاء اصطناعي لجرد الرفوف', who: 'سلسلة سوبرماركت، ١٥ فرعاً', d: 'كل وردية تبدأ بجولة كاميرا بين الرفوف. النموذج يتعرّف على كل منتج، يعلّم الموجود ويطلع قائمة بالناقص، فالمتجر الأونلاين ما بيبيع شي مش موجود. يشتغل جنب برنامج المحاسبة الموجود بكل فرع.' } },
    { plate: 'chat', tags: ['AI assistant', 'Delivery', 'Driver app', 'Points'],
      en: { t: 'Food guide with an AI assistant', who: 'Delivery and recommendation service', d: 'One app with four faces: customers, staff, drivers and the owner. Customers ask the assistant where to eat and it answers the way the brand’s own team does, then they order and collect points.' },
      ar: { t: 'دليل طعام مع مساعد ذكي', who: 'خدمة توصيل وترشيح مطاعم', d: 'تطبيق واحد بأربع واجهات: الزبون، الموظف، السائق، والمالك. الزبون يسأل المساعد وين ياكل، والمساعد يجاوب بنفس أسلوب فريق العلامة، وبعدها يطلب ويجمع نقاط.' } },
    { plate: 'teeth', tags: ['Clinic system', 'Booking', 'Patient records', 'Arabic'],
      en: { t: 'Dental clinic platform', who: 'Dr. Sana Baghdadi', d: 'Booking that knows the real schedule, patient files, a tooth chart, treatment plans and payments. Separate screens for the dentist, reception and patients, all in Arabic.' },
      ar: { t: 'منصة عيادة أسنان', who: 'د. سنا بغدادي', d: 'حجز مربوط بالمواعيد الحقيقية، ملفات مرضى، مخطط أسنان، خطط علاج ومدفوعات. شاشات منفصلة للطبيبة والاستقبال والمرضى، وكلها بالعربي.' } },
    { img: 'media/alpatra-1.webp', phone: 'media/alpatra-m.webp', tags: ['Hotel system', 'Booking', 'WhatsApp alerts', 'Two currencies'],
      en: { t: 'Alpatra Hotel & Restaurant', who: '75-room hotel', d: 'A booking website and the full front desk behind it: live availability, a room board, a drag-and-drop booking chart, guest bills in two currencies, housekeeping and reports.' },
      ar: { t: 'فندق ومطعم البتراء', who: 'فندق من ٧٥ غرفة', d: 'موقع حجز ومعه نظام استقبال كامل: توفّر مباشر، لوحة غرف، مخطط حجوزات بالسحب والإفلات، فواتير ضيوف بعملتين، تدبير فندقي وتقارير.' } },
    { plate: 'rooms', tags: ['Management system', 'Front desk', 'Real time'],
      en: { t: 'Le Six Hotel & Resort', who: 'Hotel and resort', d: 'The system the front desk runs on every day. Check-in takes seconds, and every stay and payment sits in one place. Guest data stays private, so this one is drawn, not screenshotted.' },
      ar: { t: 'Le Six Hotel & Resort', who: 'فندق ومنتجع', d: 'النظام اللي بيشتغل عليه الاستقبال كل يوم. تسجيل الدخول بثواني، وكل إقامة ودفعة بمكان واحد. بيانات الضيوف خاصة، لهيك هالمشروع مرسوم مش صورة شاشة.' } },
    { plate: 'offer', tags: ['E-commerce', 'Owner studio', 'Live'],
      en: { t: 'BT Apple', who: 'Phone shop: buy, sell, trade, repair', d: 'A live store with real devices and prices, and a studio where the owner changes offers himself in a minute, without calling us.' },
      ar: { t: 'BT Apple', who: 'محل موبايلات: بيع، شراء، تبديل، صيانة', d: 'متجر شغّال بأجهزة وأسعار حقيقية، ومعه استوديو بيغيّر فيه صاحب المحل العروض بنفسه خلال دقيقة، بدون ما يتصل فينا.' } },
    { img: 'media/layal-1.webp', phone: 'media/layal-m.webp', tags: ['AI concierge', 'Arabic · English · French', 'WhatsApp'],
      en: { t: 'Layal, hotel concierge', who: 'Boutique hotel concept', d: 'A concierge that answers guests in three languages, takes reservations with a calendar, and sends the booking to the hotel’s WhatsApp the moment it happens.' },
      ar: { t: 'ليال، كونسيرج فندقي', who: 'فكرة لفندق بوتيك', d: 'كونسيرج يرد على الضيوف بثلاث لغات، ياخد الحجوزات من تقويم، ويبعت الحجز على واتساب الفندق بنفس اللحظة.' } },
    { img: 'media/potato-1.webp', phone: 'media/potato-m.webp', tags: ['Ordering', 'Arabic', 'Mobile first'],
      en: { t: 'Amsterdam Potato', who: 'Fries shop', d: 'An ordering experience built around their signature sauces: big type, their own colours, and orders that land straight on WhatsApp.' },
      ar: { t: 'أمستردام بطاطا', who: 'محل بطاطا', d: 'تجربة طلب مبنية حول الصلصات اللي بيشتهروا فيها: خطوط كبيرة، ألوانهم، والطلب بيوصل مباشرة على واتساب.' } },
    { img: 'media/yamen-1.webp', phone: 'media/yamen-m.webp', tags: ['Ordering', 'Arabic'],
      en: { t: 'Yamen Barakat', who: 'Fast-food complex', d: 'A fast Arabic ordering system in the restaurant’s own logo and colours, made to be used one-handed while hungry.' },
      ar: { t: 'مجمع يامن بركات', who: 'مجمع وجبات سريعة', d: 'نظام طلب عربي سريع بشعار المطعم وألوانه، معمول لينستخدم بإيد وحدة وإنت جوعان.' } }
  ];
  var CLIENTS = { en: ['Le Six Hotel & Resort', 'Alpatra Hotel', 'BT Apple', 'Dr. Sana Baghdadi Dental', 'Amsterdam Potato', 'iBasha', 'Yamen Barakat'],
                  ar: ['Le Six Hotel & Resort', 'فندق البتراء', 'BT Apple', 'عيادة د. سنا بغدادي', 'أمستردام بطاطا', 'iBasha', 'مجمع يامن بركات'] };
  var SERVICES = [
    { en: ['AI agents and assistants', 'Assistants trained on your menu, rooms or products. They answer customers in Arabic and English, take bookings and hand over to your staff.', 'Hotels, delivery, retail'],
      ar: ['وكلاء ومساعدين بالذكاء الاصطناعي', 'مساعدين متدربين على منيوك أو غرفك أو منتجاتك. بيردوا على الزبائن بالعربي والإنجليزي، بياخدوا حجوزات وبيحوّلوا لموظفينك.', 'فنادق، توصيل، محلات'] },
    { en: ['Computer vision', 'Cameras that count stock, check shelves and catch what is missing before a customer does.', 'Supermarkets, warehouses, factories'],
      ar: ['رؤية حاسوبية', 'كاميرات بتعد البضاعة، بتفحص الرفوف وبتلقط الناقص قبل ما ينتبه الزبون.', 'سوبرماركت، مستودعات، مصانع'] },
    { en: ['Management systems and POS', 'The software your team runs the day on: orders, stock, staff, cash and reports.', 'Cafes, restaurants, shops'],
      ar: ['أنظمة إدارة ونقاط بيع', 'البرنامج اللي فريقك بيدير فيه يومه: طلبات، مخزون، موظفين، صندوق وتقارير.', 'كافيهات، مطاعم، محلات'] },
    { en: ['Hotel systems', 'Booking websites, front desk, housekeeping and guest billing in one place.', 'Hotels and resorts'],
      ar: ['أنظمة فنادق', 'مواقع حجز، استقبال، تدبير فندقي وفواتير ضيوف بمكان واحد.', 'فنادق ومنتجعات'] },
    { en: ['Ordering and e-commerce', 'Menus and shops that take real orders and send them where you already work.', 'Food, fashion, electronics'],
      ar: ['طلبات وتجارة إلكترونية', 'منيوهات ومتاجر بتاخد طلبات حقيقية وبتبعتها للمكان اللي إنت شغّال فيه.', 'أكل، ملابس، إلكترونيات'] },
    { en: ['Mobile apps', 'Android and iPhone apps published under your own name.', 'Any business'],
      ar: ['تطبيقات موبايل', 'تطبيقات أندرويد وآيفون منشورة باسمك إنت.', 'أي بزنس'] },
    { en: ['Websites', 'Fast sites that look like your brand, in your languages.', 'Any business'],
      ar: ['مواقع', 'مواقع سريعة بتشبه علامتك، وبلغاتك.', 'أي بزنس'] },
    { en: ['Data and automation', 'Reports, cleaned-up spreadsheets, and jobs that run on their own every night.', 'Teams drowning in Excel'],
      ar: ['بيانات وأتمتة', 'تقارير، جداول مرتّبة، ومهام بتشتغل لحالها كل ليلة.', 'فرق غرقانة بالإكسل'] }
  ];
  var STAGES = [
    { y: '2023', en: ['Websites', 'Sites for the shops nearby.'], ar: ['مواقع', 'مواقع للمحلات القريبة.'] },
    { y: '', en: ['Ordering', 'Menus that take orders and send them to WhatsApp.'], ar: ['طلبات', 'منيوهات بتاخد طلبات وبتبعتها على واتساب.'] },
    { y: '', en: ['Systems', 'Hotels, clinics and shops run their whole day on our software.'], ar: ['أنظمة', 'فنادق وعيادات ومحلات بتدير يومها كامل على برامجنا.'] },
    { y: 'now', en: ['AI', 'Agents, assistants and cameras that learn each business.'], ar: ['ذكاء اصطناعي', 'وكلاء ومساعدين وكاميرات بتتعلّم كل بزنس.'] }
  ];
  var PROCESS = [
    { en: ['We visit you', 'Our field team sits with the owner and writes down what slows the business. No forms, no sales script.'],
      ar: ['منزورك', 'فريقنا الميداني بيقعد مع صاحب الشغل وبيكتب شو اللي معطّل البزنس. بلا استمارات وبلا حكي مبيعات.'] },
    { en: ['You see a working demo', 'Built on your real menu, products or rooms. You click through it before you commit to anything.'],
      ar: ['بتشوف ديمو شغّال', 'مبني على منيوك أو منتجاتك أو غرفك الحقيقية. بتجرّبه بإيدك قبل ما تلتزم بأي شي.'] },
    { en: ['We build and launch', 'You pay in stages, starting only after you approve the demo. Most systems go live in weeks.'],
      ar: ['منبني ومنطلق', 'بتدفع على مراحل، وأول دفعة بعد ما توافق على الديمو. أغلب الأنظمة بتشتغل خلال أسابيع.'] },
    { en: ['We keep it running', 'The first year is included: hosting, backups and fixes. A yearly plan starts from year two.'],
      ar: ['منضل معك', 'السنة الأولى مشمولة: استضافة، نسخ احتياطي وتصليحات. الاشتراك السنوي بيبلش من السنة التانية.'] }
  ];
  var NEEDS = { en: ['AI agent', 'Management system', 'Hotel system', 'Ordering', 'Mobile app', 'Website', 'Not sure yet'],
                ar: ['وكيل ذكاء اصطناعي', 'نظام إدارة', 'نظام فندق', 'نظام طلبات', 'تطبيق موبايل', 'موقع', 'لسا مش متأكد'] };
  var THOUGHTS = {
    en: ['reading tonight’s reservations', 'counting shelf stock, aisle 4', 'answering a guest in Arabic', 'printing a kitchen ticket', 'syncing 15 branches', 'learning a new menu', 'checking room 214 is clean', 'drafting a quote'],
    ar: ['عم يقرأ حجوزات الليلة', 'عم يعدّ بضاعة الممر ٤', 'عم يرد على ضيف بالعربي', 'عم يطبع طلب للمطبخ', 'عم يزامن ١٥ فرع', 'عم يتعلّم منيو جديد', 'عم يتأكد إنو غرفة ٢١٤ نظيفة', 'عم يكتب عرض سعر']
  };
  var T = {
    en: {
      'nav.work': 'Work', 'nav.build': 'What we build', 'nav.story': 'Story', 'nav.how': 'How we work', 'nav.cta': 'Start a project',
      'hero.title': 'Software with a pulse<span class="dot">.</span>',
      'hero.lede': 'We build AI agents, management systems and apps for restaurants, shops, hotels and factories. You see it working on your own data before you pay.',
      'hero.cta1': 'Start a project', 'hero.cta2': 'See the work',
      'hud.unit': 'assembly unit', 'hud.build': 'built', 'hud.gaze': 'gaze', 'hud.blinks': 'blinks', 'hud.hint': 'tap the face',
      'gaze.track': 'following you', 'gaze.scan': 'looking around', 'notice': 'hello. I see you.',
      'clients.label': 'Running on Solunera',
      'work.title': 'Systems that open every morning with the business.',
      'work.sub': 'Drag or use the arrows. Some clients keep their systems private, so those are drawn instead of screenshotted.',
      'build.title': 'What we build.', 'build.sub': 'One team for the whole digital side of a business, from the first website to the AI that counts your stock.',
      'story.title': 'How it started.',
      'story.p1': 'Solunera started in 2023 with one person. Kamel Nassif was studying computer science and had spent years in graphic design and print production. The shops around him needed websites, so he built them.',
      'story.p2': 'Then they needed menus that take orders. Then systems to run the whole day. Each client asked for the next thing, and we learned to build it.',
      'story.p3': 'Today a field team visits business owners and listens, a studio builds, and the systems keep running after launch.',
      'fig.1': 'businesses running on our systems', 'fig.2': 'the year it started', 'fig.3': 'languages we ship in: Arabic, English, Turkish', 'fig.4': 'payments before you see a working demo',
      'how.title': 'How we work with you.', 'how.sub': 'The same four steps for a cafe or a factory.',
      'contact.title': 'Tell us what slows your business down<span class="dot">.</span>',
      'f.name': 'Your name', 'f.biz': 'Business', 'f.phone': 'WhatsApp or phone', 'f.need': 'What do you need?', 'f.msg': 'A few words about the problem',
      'f.send': 'Send', 'f.note': 'We reply within a day.', 'f.sending': 'Sending…', 'f.ok': 'Got it. We’ll message you on WhatsApp within a day.',
      'f.missing': 'Add your name and a WhatsApp number so we can reply.', 'f.fail': 'This didn’t go through. Message us on WhatsApp instead: +961 81 836 178.',
      'd.wa': 'WhatsApp', 'd.open': 'Open chat', 'd.copy': 'Copy number', 'd.copied': 'Copied', 'd.ig': 'Instagram', 'd.follow': 'Follow',
      'foot.made': 'Designed and built in-house', 'foot.scan': 'S-01 head from a scan by Infinite Realities, CC BY', 'lang': 'عربي', 'count.of': '/'
    },
    ar: {
      'nav.work': 'أعمالنا', 'nav.build': 'شو منبني', 'nav.story': 'قصتنا', 'nav.how': 'كيف منشتغل', 'nav.cta': 'ابدأ مشروعك',
      'hero.title': 'برمجيات فيها نبض<span class="dot">.</span>',
      'hero.lede': 'منبني وكلاء ذكاء اصطناعي وأنظمة إدارة وتطبيقات للمطاعم والمحلات والفنادق والمصانع. بتشوف النظام شغّال على بياناتك قبل ما تدفع.',
      'hero.cta1': 'ابدأ مشروعك', 'hero.cta2': 'شوف أعمالنا',
      'hud.unit': 'وحدة قيد التجميع', 'hud.build': 'مكتمل', 'hud.gaze': 'النظر', 'hud.blinks': 'رمشات', 'hud.hint': 'اضغط على الوجه',
      'gaze.track': 'عم يلحقك', 'gaze.scan': 'عم يتطلّع حواليه', 'notice': 'أهلا. شايفك.',
      'clients.label': 'شغّالين على سولونيرا',
      'work.title': 'أنظمة بتفتح كل صباح مع الشغل.',
      'work.sub': 'اسحب أو استعمل الأسهم. في عملاء بيحبّوا يخلّوا أنظمتهم خاصة، فرسمناها بدل صور الشاشة.',
      'build.title': 'شو منبني.', 'build.sub': 'فريق واحد لكل الجانب الرقمي من شغلك، من أول موقع لحد الذكاء الاصطناعي اللي بيعدّ بضاعتك.',
      'story.title': 'كيف بلّشنا.',
      'story.p1': 'سولونيرا بلّشت سنة ٢٠٢٣ بشخص واحد. كامل ناصيف كان عم يدرس علوم الحاسوب، وقضّى سنين بالتصميم الجرافيكي والطباعة. المحلات اللي حواليه كانت بحاجة مواقع، فعملها.',
      'story.p2': 'بعدها احتاجوا منيوهات بتاخد طلبات. بعدها أنظمة تدير يومهم كامل. كل عميل طلب الخطوة الجاية، ونحنا تعلّمنا نبنيها.',
      'story.p3': 'اليوم في فريق ميداني بيزور أصحاب الشغل وبيسمعلهم، واستوديو بيبني، والأنظمة بتضل شغّالة بعد الإطلاق.',
      'fig.1': 'بزنس شغّال على أنظمتنا', 'fig.2': 'سنة البداية', 'fig.3': 'لغات منسلّم فيها: عربي، إنجليزي، تركي', 'fig.4': 'دفعات قبل ما تشوف ديمو شغّال',
      'how.title': 'كيف منشتغل معك.', 'how.sub': 'نفس الأربع خطوات، لكافيه أو لمصنع.',
      'contact.title': 'خبّرنا شو اللي معطّل شغلك<span class="dot">.</span>',
      'f.name': 'اسمك', 'f.biz': 'اسم البزنس', 'f.phone': 'واتساب أو رقم هاتف', 'f.need': 'شو بتحتاج؟', 'f.msg': 'كلمتين عن المشكلة',
      'f.send': 'إرسال', 'f.note': 'منرد خلال يوم.', 'f.sending': 'عم نبعت…', 'f.ok': 'وصلتنا. منحكيك على واتساب خلال يوم.',
      'f.missing': 'حط اسمك ورقم واتساب لنقدر نرد عليك.', 'f.fail': 'ما وصلت الرسالة. ابعتلنا على واتساب: +961 81 836 178.',
      'd.wa': 'واتساب', 'd.open': 'افتح المحادثة', 'd.copy': 'انسخ الرقم', 'd.copied': 'انسخ', 'd.ig': 'إنستغرام', 'd.follow': 'تابعنا',
      'foot.made': 'مصمّم ومبني عنّا', 'foot.scan': 'رأس S-01 من مسح لـ Infinite Realities، CC BY', 'lang': 'English', 'count.of': '/'
    }
  };
  T.ar['d.copied'] = 'انتسخ';

  /* ======================= I18N ======================= */
  // English is the main language. Arabic only through the switch, /ar or #ar.
  var lang = (location.hash === '#ar' || location.pathname === '/ar') ? 'ar' : 'en';
  function t(k) { return (T[lang] && T[lang][k]) || T.en[k] || k; }
  window.SolI18n = { t: t, lang: function () { return lang; } };
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  /* ======================= PLATES ======================= */
  function plate(kind) {
    var ar = lang === 'ar';
    if (kind === 'shelf') {
      var colors = ['#C8102E', '#D9A441', '#5B3A29', '#7A2E8C', '#2F6F4F', '#E8E2D7', '#B3541E', '#1F4E8C'];
      var labels = ['kitkat .97', 'snickers .95', 'galaxy .93', 'milky way .91'];
      var rows = '', li = 0;
      for (var r = 0; r < 3; r++) {
        var row = '<div class="row">';
        for (var i = 0; i < 9; i++) {
          var gap = (r === 1 && i === 5) || (r === 2 && i === 2);
          var hit = !gap && ((r * 9 + i) % 5 === 1) && li < 4;
          var h = 60 + ((r * 7 + i * 13) % 35);
          row += gap ? '<div class="p gap" style="--h:' + h + '%"></div>' : '<div class="p' + (hit ? ' hit' : '') + '" ' + (hit ? 'data-l="' + labels[li++] + '"' : '') + ' style="--c:' + colors[(r * 3 + i) % 8] + ';--h:' + h + '%"></div>';
        }
        rows += row + '</div>';
      }
      return '<div class="plate"><div class="cap"><span>' + (ar ? 'وردية الصبح · ممر ٤' : 'morning shift · aisle 4') + '</span><b>' + (ar ? '٢ ناقص' : '2 missing') + '</b></div><div class="shelf">' + rows + '</div></div>';
    }
    if (kind === 'chat') {
      if (!ar) return '<div class="plate"><div class="cap"><span>assistant</span><b>online</b></div><div class="chat" dir="ltr">' +
        '<div class="m u">I’m hungry and want something good near me. What do you suggest?</div>' +
        '<div class="m a"><b>3 places</b> are open within a kilometre. If you want something quick, the shawarma at the second one is our top pick this week.</div>' +
        '<div class="m u">Perfect, order it for me</div>' +
        '<div class="m a">Ordered ✓ The driver arrives in <b>25 minutes</b>, and you earned 40 points.</div></div></div>';
      return '<div class="plate"><div class="cap"><span>assistant</span><b>متصل</b></div><div class="chat">' +
        '<div class="m u">جوعان وبدي شي طيب قريب مني، شو بتقترح؟</div>' +
        '<div class="m a">في <b>٣ محلات</b> فاتحين هلق على بعد أقل من كيلو. إذا بدك شي سريع، الشاورما بالمحل التاني أطيب شي عنّا هالأسبوع.</div>' +
        '<div class="m u">تمام، اطلبلي ياه</div>' +
        '<div class="m a">انطلب ✓ السائق بيوصل خلال <b>٢٥ دقيقة</b>، وزدنالك ٤٠ نقطة.</div></div></div>';
    }
    if (kind === 'teeth') {
      var top = '', bot = '', tt = { 3: 't', 6: 'd', 12: 't' }, bt = { 4: 'd', 10: 't' };
      for (var n = 0; n < 16; n++) {
        top += '<i class="' + (tt[n] || '') + '">' + (n < 8 ? 18 - n : 21 + n - 8) + '</i>';
        bot += '<i class="' + (bt[n] || '') + '">' + (n < 8 ? 48 - n : 31 + n - 8) + '</i>';
      }
      return '<div class="plate"><div class="cap"><span>' + (ar ? 'مخطط الأسنان' : 'tooth chart') + '</span><b>' + (ar ? '٣ قيد العلاج' : '3 in treatment') + '</b></div><div class="teeth"><div class="jaw">' + top + '</div><div class="jaw">' + bot + '</div></div>' +
        '<div class="legend"><span style="--k:var(--signal)">' + (ar ? 'خطة علاج' : 'planned') + '</span><span style="--k:#E8E2D7">' + (ar ? 'منتهي' : 'done') + '</span></div></div>';
    }
    if (kind === 'rooms') {
      var cells = '', st = { 2: 'in', 3: 'in', 5: 'co', 6: 'in', 9: 'cl', 11: 'in', 12: 'in', 14: 'co', 17: 'in', 18: 'cl', 20: 'in', 21: 'in', 22: 'in', 23: 'cl' };
      for (var c = 0; c < 24; c++) cells += '<i class="' + (st[c] || '') + '">' + (c < 8 ? 101 + c : c < 16 ? 201 + c - 8 : 301 + c - 16) + '</i>';
      return '<div class="plate"><div class="cap"><span>' + (ar ? 'الاستقبال · اليوم' : 'front desk · today') + '</span><b>' + (ar ? '٢ مغادرة' : '2 check-outs') + '</b></div><div class="rooms">' + cells + '</div>' +
        '<div class="legend"><span style="--k:#E8E2D7">' + (ar ? 'مشغولة' : 'occupied') + '</span><span style="--k:var(--signal)">' + (ar ? 'مغادرة' : 'check-out') + '</span><span style="--k:#2C2926">' + (ar ? 'فاضية' : 'free') + '</span></div></div>';
    }
    if (kind === 'offer') {
      return '<div class="plate"><div class="cap"><span>' + (ar ? 'استوديو المالك' : 'owner studio') + '</span><b>' + (ar ? 'شغّال' : 'live') + '</b></div><div class="offer"><div class="ph"><b>−12%</b></div><ul>' +
        '<li><span>iPhone 17 Pro</span><em>' + (ar ? 'عرض' : 'offer') + '</em></li><li><span>iPhone 16</span><span>' + (ar ? 'تبديل' : 'trade-in') + '</span></li><li><span>Galaxy S25</span><span>' + (ar ? 'متوفر' : 'in stock') + '</span></li><li><span>' + (ar ? 'تغيير شاشة' : 'Screen repair') + '</span><span>' + (ar ? 'نفس اليوم' : 'same day') + '</span></li></ul></div></div>';
    }
    return '';
  }

  /* ======================= RENDER ======================= */
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function render() {
    var html = document.documentElement;
    html.lang = lang; html.dir = lang === 'ar' ? 'rtl' : 'ltr';
    $$('[data-i18n]').forEach(function (el) { el.textContent = t(el.getAttribute('data-i18n')); });
    $$('[data-i18n-html]').forEach(function (el) { el.innerHTML = t(el.getAttribute('data-i18n-html')); });
    $('#lang').textContent = t('lang');
    $('#lang').setAttribute('aria-label', lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية');

    var names = CLIENTS[lang], track = names.concat(names).map(function (n) { return '<span>' + esc(n) + '</span>'; }).join('');
    $('#marquee').innerHTML = track + track;

    $('#slider').innerHTML = PROJECTS.map(function (p, i) {
      var c = p[lang];
      var media = p.img
        ? '<img src="' + p.img + '" alt="' + esc(c.t) + '" loading="lazy" draggable="false">' + (p.phone ? '<img class="phone" src="' + p.phone + '" alt="" loading="lazy" draggable="false">' : '')
        : plate(p.plate);
      return '<article class="slide" aria-roledescription="slide" aria-label="' + (i + 1) + ' / ' + PROJECTS.length + '">' +
        '<div class="media">' + media + '</div>' +
        '<div class="info"><span class="idx mono">' + pad(i + 1) + '</span><h3>' + esc(c.t) + '</h3><span class="who mono">' + esc(c.who) + '</span><p>' + esc(c.d) + '</p>' +
        '<div class="tags">' + p.tags.map(function (g) { return '<span>' + esc(g) + '</span>'; }).join('') + '</div></div></article>';
    }).join('');

    $('#svc').innerHTML = SERVICES.map(function (s) { var c = s[lang]; return '<div class="svc-row"><h3>' + esc(c[0]) + '</h3><p>' + esc(c[1]) + '</p><span class="ex mono">' + esc(c[2]) + '</span></div>'; }).join('');
    $('#stages').innerHTML = STAGES.map(function (s) { var c = s[lang]; var y = s.y === 'now' ? (lang === 'ar' ? 'اليوم' : 'today') : s.y; return '<div class="stage-s"><span class="y mono">' + (y || '&nbsp;') + '</span><h3>' + esc(c[0]) + '</h3><p>' + esc(c[1]) + '</p></div>'; }).join('');
    $('#proc').innerHTML = PROCESS.map(function (s, i) { var c = s[lang]; return '<li><span class="n" aria-hidden="true">' + (i + 1) + '</span><h3>' + esc(c[0]) + '</h3><p>' + esc(c[1]) + '</p></li>'; }).join('');

    var checked = $$('#chips input:checked').map(function (x) { return +x.value; });
    $('#chips').innerHTML = NEEDS[lang].map(function (n, i) { return '<label><input type="checkbox" id="need-' + i + '" value="' + i + '"' + (checked.indexOf(i) > -1 ? ' checked' : '') + '><span>' + esc(n) + '</span></label>'; }).join('');
    $('#yr').textContent = new Date().getFullYear();
    updateCount();
  }

  /* ======================= SLIDER ======================= */
  var slider = $('#slider');
  function slides() { return $$('.slide', slider); }
  function current() {
    var s = slides(), best = 0, bd = 1e9, ref = slider.getBoundingClientRect();
    s.forEach(function (el, i) {
      var r = el.getBoundingClientRect();
      var d = Math.abs((lang === 'ar' ? ref.right - r.right : r.left - ref.left));
      if (d < bd) { bd = d; best = i; }
    });
    return best;
  }
  function updateCount() {
    var i = current(), n = PROJECTS.length;
    $('#count').textContent = pad(i + 1) + ' / ' + pad(n);
    $('#bar').style.width = ((i + 1) / n * 100) + '%';
  }
  function go(d) {
    var s = slides(), i = Math.max(0, Math.min(s.length - 1, current() + d));
    s[i].scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'nearest', inline: 'start' });
  }
  $('#prev').addEventListener('click', function () { go(-1); });
  $('#next').addEventListener('click', function () { go(1); });
  slider.addEventListener('keydown', function (e) {
    var rtl = lang === 'ar';
    if (e.key === 'ArrowRight') { e.preventDefault(); go(rtl ? -1 : 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(rtl ? 1 : -1); }
  });
  var raf = 0;
  slider.addEventListener('scroll', function () { cancelAnimationFrame(raf); raf = requestAnimationFrame(updateCount); }, { passive: true });
  // mouse drag (touch scrolls natively)
  (function () {
    var down = false, sx = 0, sl = 0, moved = false;
    slider.addEventListener('pointerdown', function (e) { if (e.pointerType !== 'mouse') return; down = true; moved = false; sx = e.clientX; sl = slider.scrollLeft; });
    window.addEventListener('pointermove', function (e) { if (!down) return; var dx = e.clientX - sx; if (Math.abs(dx) > 4) { moved = true; slider.classList.add('drag'); } slider.scrollLeft = sl - dx; });
    window.addEventListener('pointerup', function () {
      if (!down) return; down = false;
      if (moved) { var keep = slider.scrollLeft; slider.classList.remove('drag'); slider.scrollLeft = keep; var i = current(); slides()[i].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' }); }
    });
  })();

  /* ======================= HUD THOUGHTS ======================= */
  var ti = 0, thought = $('[data-hud="thought"]'), noticeUntil = 0;
  function nextThought() {
    if (!thought) return;
    if (Date.now() < noticeUntil) return;
    var list = THOUGHTS[lang]; ti = (ti + 1) % list.length; thought.textContent = list[ti];
  }
  setInterval(nextThought, 3400);
  window.addEventListener('s01:notice', function () { if (thought) { thought.textContent = t('notice'); noticeUntil = Date.now() + 2600; } });

  /* ======================= CONTACT ======================= */
  var out = $('#c-out');
  $('#form').addEventListener('submit', function (e) {
    e.preventDefault();
    var name = $('#c-name').value.trim(), phone = $('#c-phone').value.trim();
    if (!name || phone.replace(/\D/g, '').length < 6) { out.className = 'msg err'; out.textContent = t('f.missing'); (name ? $('#c-phone') : $('#c-name')).focus(); return; }
    var payload = { name: name, business: $('#c-biz').value.trim(), phone: phone, message: $('#c-msg').value.trim(), lang: lang,
      needs: $$('#chips input:checked').map(function (x) { return NEEDS.en[+x.value]; }) };
    var btn = $('#c-send'); btn.disabled = true; out.className = 'msg'; out.textContent = t('f.sending');
    fetch('/api/public/inquiry', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function () { out.className = 'msg ok'; out.textContent = t('f.ok'); $('#form').reset(); })
      .catch(function () { out.className = 'msg err'; out.textContent = t('f.fail'); })
      .then(function () { btn.disabled = false; });
  });
  $('#copy').addEventListener('click', function () {
    var b = this, num = '+96181836178';
    function done() { b.textContent = t('d.copied'); setTimeout(function () { b.textContent = t('d.copy'); }, 1600); }
    try {
      navigator.clipboard.writeText(num).then(done, function () { sel(); });
    } catch (e) { sel(); }
    function sel() { var r = document.createRange(); r.selectNodeContents($('#wa-num')); var s = getSelection(); s.removeAllRanges(); s.addRange(r); }
  });

  /* ======================= MISC ======================= */
  $('#lang').addEventListener('click', function () {
    lang = lang === 'ar' ? 'en' : 'ar';
    render(); nextThought();
  });
  var top = $('#top');
  window.addEventListener('scroll', function () { top.classList.toggle('scrolled', window.scrollY > 8); }, { passive: true });

  render();
  if (thought) thought.textContent = THOUGHTS[lang][0];
})();
