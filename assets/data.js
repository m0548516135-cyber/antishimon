/* =========================================================================
   אנטישימון — מאגר הנתונים
   -------------------------------------------------------------------------
   כל הרשומות כאן אמיתיות ומתועדות. שני סוגי רשומות בלבד נכנסות למאגר:

   1. עמדה שהגורם עצמו הכריז עליה פומבית — החלטת ועידה, הצבעת חברים,
      הודעת דירקטוריון, הצהרה רשמית. אלה עובדות על מה שהגורם אמר על עצמו.
   2. ממצא רשמי — פסק דין, קנס רגולטורי, הודעת הפרה של רשות ממשלתית.

   מה שלא נכנס: שמועות, צילומי מסך בלי הקשר, האשמות בלי מקור שאפשר לפתוח.

   כל קישור נבדק. אם מקור נופל — סמנו את הרשומה כ״בבדיקה״ עד שיימצא תחליף.
   ========================================================================= */

/* ערכות מקורות משותפות לקמפיינים שרבים חתמו עליהם.
   הקובץ הוא JS ולא JSON, ולכן אפשר להגדיר אותן פעם אחת. */

var SRC_FWP = [
  { date: "2025-09-08", publisher: "Film Workers for Palestine", title: "נוסח ההתחייבות ורשימת החותמים (מקור ראשוני)", url: "https://en.wikipedia.org/wiki/Film_Workers_for_Palestine" },
  { date: "2025-09-09", publisher: "NPR", title: "Emma Stone, Ava DuVernay, 2,000 others join Israeli film company boycott", url: "https://www.npr.org/2025/09/09/nx-s1-5535578/hollywood-stars-boycott-israeli-film-companies-in-response-to-gaza-crisis" },
  { date: "2025-09", publisher: "Snopes", title: "Thousands of film workers signed letter boycotting Israeli film companies, not Jewish people", url: "https://www.snopes.com/fact-check/hollywood-israeli-film-boycott/" }
];

var SRC_MFP = [
  { date: "2021", publisher: "Rolling Stone", title: "Rage Against the Machine, Serj Tankian, Roger Waters Sign Letter Asking Artists to Boycott Israel", url: "https://www.rollingstone.com/music/music-news/rage-against-the-machine-serj-tankian-roger-waters-sign-open-letter-artists-boycott-israel-1175281/" },
  { date: "2021", publisher: "Billboard", title: "600 Musicians Sign Letter Urging Artists to Boycott Israel", url: "https://www.billboard.com/music/music-news/israel-boycott-artists-open-letter-palestine-9579426/" },
  { date: "2021", publisher: "Middle East Eye", title: "More than 600 musicians sign letter pledging to boycott Israel", url: "https://www.middleeasteye.net/news/israel-boycott-musicians-pledge-stand-solidarity-palestine" }
];

var SRC_NMFG = [
  { date: "2025-11-13", publisher: "NPR", title: "Why more than 1,000 musicians are boycotting Israel with 'No Music for Genocide'", url: "https://www.npr.org/2025/11/13/nx-s1-5599908/no-music-for-genocide-israel-boycott" },
  { date: "2025-11", publisher: "The Jewish Chronicle", title: "Björk, Lorde and Paul Weller join 1,000 artists and labels to block Israelis from streaming their music", url: "https://www.thejc.com/news/israel/bjork-lorde-and-paul-weller-join-1-000-artists-and-labels-to-block-israelis-from-streaming-their-music-r2c9gu3a" },
  { date: "2025", publisher: "No Music for Genocide", title: "רשימת המשתתפים הרשמית (מקור ראשוני)", url: "https://nomusicforgenocide.org/" }
];

/* בונה רשומה לחותם בודד על קמפיין חרם תרבותי.
   הניסוח נשאר עובדתי: מה הוא חתם עליו, ותו לא. */
function signer(id, name, aliases, type, country, region, campaign) {
  var C = {
    fwp: {
      src: SRC_FWP,
      text: "בין החותמים על התחייבות Film Workers for Palestine שפורסמה ב-8 בספטמבר 2025 ועליה חתמו למעלה מ-5,000 אנשי תעשיית הקולנוע. ההתחייבות היא לסרב לעבוד עם מוסדות קולנוע ישראליים המתוארים בה כמעורבים בהפרות זכויות אדם. בדיקת Snopes הבהירה שההתחייבות מכוונת למוסדות — לא לאנשים פרטיים ולא ליהודים ככלל.",
      tags: ["חרם תרבותי", "קולנוע", "עצומה"],
      updated: "2025-09-08"
    },
    mfp: {
      src: SRC_MFP,
      text: "בין החותמים על המכתב הפתוח של Musicians for Palestine משנת 2021, שעליו חתמו למעלה מ-600 מוזיקאים. המכתב קורא לאמנים לסרב להופיע במוסדות תרבות ישראליים ולתמוך בזכויות הפלסטינים.",
      tags: ["חרם תרבותי", "מוזיקה", "עצומה"],
      updated: "2021"
    },
    nmfg: {
      src: SRC_NMFG,
      text: "בין המצטרפים ליוזמת No Music for Genocide שהחלה בספטמבר 2025, שבמסגרתה אמנים ולייבלים מבקשים מחברות ההפצה שלהם לחסום גאוגרפית את המוזיקה שלהם כך שלא ניתן להזרים אותה בישראל.",
      tags: ["חרם תרבותי", "מוזיקה", "סטרימינג"],
      updated: "2025-11"
    }
  }[campaign];

  return {
    id: id, name: name, aliases: aliases, type: type,
    location: { country: country, region: region, city: "" },
    scope: "global", severity: 3, status: "verified",
    summary: C.text, tags: C.tags, sources: C.src, campaign: campaign,
    alternatives: [], updated: C.updated
  };
}

window.ANTISHIMON = {
  version: "1.0",
  updated: "2026-07-31",

  /* ---- טקסונומיה ---- */

  categories: [
    { key: "company",       label: "חברות",            short: "חברה" },
    { key: "brand",         label: "מותגים ומוצרים",   short: "מותג" },
    { key: "person",        label: "אנשים",            short: "אדם" },
    { key: "org",           label: "ארגונים ומוסדות",  short: "ארגון" },
    { key: "place",         label: "מקומות ומדינות",   short: "מקום" },
    { key: "media",         label: "תקשורת",           short: "תקשורת" },
    { key: "academic",      label: "אקדמיה",           short: "אקדמיה" },
    { key: "sport",         label: "ספורט",            short: "ספורט" },
    { key: "entertainment", label: "בידור ותרבות",     short: "בידור" }
  ],

  regions: [
    { key: "il",     label: "ישראל" },
    { key: "eu",     label: "אירופה" },
    { key: "na",     label: "צפון אמריקה" },
    { key: "latam",  label: "אמריקה הלטינית" },
    { key: "me",     label: "המזרח התיכון" },
    { key: "asia",   label: "אסיה" },
    { key: "africa", label: "אפריקה" },
    { key: "oceania",label: "אוקיאניה" },
    { key: "global", label: "פעילות גלובלית" }
  ],

  /* סולם חומרה — מפריד בכוונה בין ביקורת מדינית לשנאת יהודים.
     ערבוב בין השניים הופך מאגר כזה לחסר ערך, גם למי שמסכים איתו. */
  severity: [
    { level: 1, label: "התבטאות בעייתית",     desc: "אמירה יחידה, מעורפלת או שנויה במחלוקת. לא דפוס." },
    { level: 2, label: "עמדה אנטי-ישראלית",   desc: "עמדה מדינית עקבית נגד ישראל או מדיניותה. אינה אנטישמיות כשלעצמה." },
    { level: 3, label: "חרם או אפליה",        desc: "חרם בפועל, סירוב שירות על בסיס לאום, או הסתה נגד ישראלים." },
    { level: 4, label: "אנטישמיות מפורשת",    desc: "פגיעה ביהודים באשר הם: הכחשת שואה, הסתה, כשל מוסדי בהגנה עליהם." }
  ],

  /* ציר האחריות — מי עשה את המעשה.
     זו הבחנה קריטית לצרכן: חברה שהדירקטוריון שלה הצביע על חרם היא לא
     אותו דבר כמו חברה שמנכ״ל שלה התבטא בראיון. בלי ההפרדה הזו אנשים
     זורקים מוצר בגלל ציוץ של אדם אחד. */
  actors: [
    { key: "entity",     label: "החלטת הגוף",  short: "הגוף",  desc: "הצבעת חברים, החלטת דירקטוריון או מדיניות רשמית של הגוף עצמו. זו עמדת הארגון." },
    { key: "leadership", label: "דברי הנהלה",  short: "הנהלה", desc: "בעל תפקיד בכיר התבטא, אך אין החלטה או מדיניות של הגוף. זו עמדת אדם — לא של החברה או של המוצר." },
    { key: "individual", label: "אדם פרטי",    short: "אדם",   desc: "אדם בשמו שלו. אין כאן חברה, מוצר או ארגון שנושא באחריות." }
  ],

  statuses: [
    { key: "verified",  label: "מאומת",          desc: "מקור ראשוני או שני מקורות עצמאיים לפחות." },
    { key: "review",    label: "לא אומת",        desc: "דיווח קיים, אך איש עדיין לא אימת אותו. פתחו את המקורות ובדקו בעצמכם." },
    { key: "disputed",  label: "שנוי במחלוקת",   desc: "הגורם הכחיש, או שיש גרסאות סותרות." },
    { key: "retracted", label: "בוטל / תוקן",    desc: "ההחלטה בוטלה או הופרכה. הרשומה נשמרת לשקיפות." }
  ],

  /* ---- ידע לסורק הברקוד ----
     חשוב: קידומת הברקוד מציינת באיזה ארגון GS1 לאומי נרשמה החברה —
     ולא היכן המוצר יוצר. הטענה הנפוצה ש״729 = מוצר ישראלי״ הופרכה
     שוב ושוב בידי גופי בדיקת עובדות. האפליקציה מציגה את המידע הזה
     במפורש במקום לשכפל את הטעות. ארץ הייצור מופיעה על התווית בלבד. */

  gs1: {
    note: "קידומת הברקוד מציינת היכן החברה נרשמה ב-GS1 — לא היכן המוצר יוצר. חברה יכולה להירשם בכל אחד מ-116 הארגונים הלאומיים, ללא קשר למקום הייצור. ארץ המקור מופיעה על התווית.",
    sources: [
      { publisher: "Full Fact", title: "Barcodes don't tell you where a product was made", url: "https://fullfact.org/online/israel-barcode-numbers-729-871/" },
      { publisher: "Euronews", title: "Are barcodes that begin with '729' products from Israel, as BDS advocates claim?", url: "https://www.euronews.com/my-europe/2025/10/15/are-barcodes-that-begin-with-729-products-from-israel-as-bds-advocates-claim" },
      { publisher: "Snopes", title: "Israel Changed Country Barcode Prefix to Avoid Boycotts?", url: "https://www.snopes.com/fact-check/israel-changed-barcodes-boycotts/" },
      { publisher: "FACTLY", title: "The barcode only shows the GS1 member country where the company is registered", url: "https://factly.in/the-barcode-only-shows-the-gs1-member-country-where-the-manufacturing-company-is-registered/" }
    ],
    /* קידומות GS1 לאומיות רלוונטיות לתצוגה בלבד */
    prefixes: [
      { from: 729, to: 729, label: "GS1 ישראל" },
      { from: 500, to: 509, label: "GS1 בריטניה" },
      { from: 400, to: 440, label: "GS1 גרמניה" },
      { from: 300, to: 379, label: "GS1 צרפת" },
      { from: 800, to: 839, label: "GS1 איטליה" },
      { from: 840, to: 849, label: "GS1 ספרד" },
      { from: 870, to: 879, label: "GS1 הולנד" },
      { from: 640, to: 649, label: "GS1 פינלנד" },
      { from: 570, to: 579, label: "GS1 דנמרק" },
      { from: 700, to: 709, label: "GS1 נורווגיה" },
      { from: 539, to: 539, label: "GS1 אירלנד" },
      { from: 0,   to: 139, label: "GS1 ארה״ב / קנדה" }
    ]
  },

  /* ---- הרשומות ---- */

  entries: [

    /* ═══ תאגידים — ממצאים רשמיים ומדיניות מוצהרת ═══ */

    {
      id: "as-lufthansa",
      name: "לופטהנזה",
      aliases: ["Lufthansa", "Deutsche Lufthansa AG"],
      type: "company", actor: "entity",
      location: { country: "גרמניה", region: "eu", city: "" },
      scope: "global", severity: 3, status: "verified",
      summary: "משרד התחבורה האמריקאי (DOT) הטיל באוקטובר 2024 קנס של 4 מיליון דולר על לופטהנזה — הקנס הגדול בתולדותיו על הפרת זכויות אזרח בידי חברת תעופה. במאי 2022 מנעה החברה מ-128 נוסעים יהודים, רובם בלבוש חרדי, לעלות לטיסת ההמשך מפרנקפורט לבודפשט, בשל התנהגות מיוחסת של בודדים בטיסה הקודמת — כשהיא מתייחסת לכולם כקבוצה אחת אף שרבים מהם כלל לא הכירו זה את זה. החקירה נפתחה בעקבות למעלה מ-40 תלונות.",
      summaryEn: "In October 2024 the US Department of Transportation fined Lufthansa $4 million — the largest civil-rights penalty it has ever issued against an airline. In May 2022 the carrier barred 128 Jewish passengers, most in Orthodox dress, from their connecting flight from Frankfurt to Budapest over the alleged conduct of a few individuals on the previous flight — treating them all as a single group even though many did not know one another. The investigation followed more than 40 complaints.",
      tags: ["ממצא רשמי", "אפליה", "תעופה"],
      sources: [
        { date: "2024-10-15", publisher: "U.S. Department of Transportation", title: "DOT Penalizes Lufthansa $4 Million for Violating Passengers' Civil Rights", url: "https://www.transportation.gov/briefing-room/dot-penalizes-lufthansa-4-million-violating-passengers-civil-rights" },
        { date: "2024-10-15", publisher: "CNN Business", title: "Lufthansa fined for violating 128 Jewish passengers' civil rights", url: "https://www.cnn.com/2024/10/15/business/lufthansa-fine-jewish-passengers-civil-rights/index.html" },
        { date: "2024-10-15", publisher: "NPR", title: "Lufthansa agrees to a record $4 million fine for its treatment of Jewish passengers", url: "https://www.npr.org/2024/10/15/nx-s1-5153909/lufthansa-jewish-discrimination-record-penalty" }
      ],
      alternatives: [{ name: "אל על", note: "טסה ישירות ואינה מגבילה נוסעים יהודים" }],
      updated: "2024-10-15"
    },
    {
      id: "as-kuwait-airways",
      name: "קוויית איירווייז",
      aliases: ["Kuwait Airways"],
      type: "company", actor: "entity",
      location: { country: "כווית", region: "me", city: "" },
      scope: "global", severity: 3, status: "verified",
      summary: "חברת התעופה הלאומית של כווית מסרבת להטיס בעלי דרכון ישראלי, מכוח החוק הכוויתי האוסר קשר מסחרי עם ישראלים. ב-2016 ביטלה את קו ניו יורק–לונדון בן 35 השנים לאחר שמשרד התחבורה האמריקאי קבע שהמדיניות מפרה את החוק האמריקאי. ב-2017 קבע בית משפט בפרנקפורט שאין לחייב את החברה להטיס ישראלי, וההחלטה אושרה בערעור — אף שבית המשפט ציין שהמדיניות עולה כדי אפליה. בבריטניה נאלצה החברה לשלם פיצויים לישראלית שסורבה.",
      summaryEn: "Kuwait's national carrier refuses to fly Israeli passport holders, under Kuwaiti law barring commercial ties with Israelis. In 2016 it dropped its 35-year New York–London route after the US Department of Transportation found the policy broke American law. In 2017 a Frankfurt court ruled the airline could not be forced to carry an Israeli, and the ruling was upheld on appeal — even as the court noted the policy amounts to discrimination. In the UK the airline was made to pay damages to an Israeli woman refused a ticket.",
      tags: ["אפליה", "תעופה", "הגבלת כניסה"],
      sources: [
        { date: "2017-11-16", publisher: "JTA", title: "Kuwait Airways can ban Israeli passengers, German court rules", url: "https://www.jta.org/2017/11/16/news-opinion/world/kuwait-airways-can-ban-israeli-passengers-german-court-rules" },
        { date: "2017-11", publisher: "The Times of Israel", title: "German court upholds Kuwait Airways' barring of Israeli passenger", url: "https://www.timesofisrael.com/german-court-upholds-kuwait-airways-barring-of-israeli-passenger/" },
        { date: "2019", publisher: "Brandeis Center", title: "Kuwait Airways Forced to Pay Damages to Israeli Citizen After Refusing Her Ticket", url: "https://brandeiscenter.com/kuwait-airways-forced-to-pay-damages-to-israeli-citizen-after-refusing-her-ticket/" }
      ],
      alternatives: [],
      updated: "2019-06-01"
    },
    {
      id: "as-airbnb",
      name: "Airbnb",
      aliases: ["איירבנב"],
      type: "company", actor: "entity",
      location: { country: "ארצות הברית", region: "na", city: "סן פרנסיסקו" },
      scope: "global", severity: 2, status: "retracted",
      correction: "ההחלטה בוטלה ב-9 באפריל 2019 בהסדר משפטי בתביעה לפי חוק הדיור ההוגן האמריקאי, מעולם לא יושמה בפועל, והחברה מפנה את רווחיה מהאזור לתרומה.",
      summary: "בנובמבר 2018 הודיעה החברה שתסיר כ-200 נכסים להשכרה בהתנחלויות בגדה המערבית, בנימוק שהן ״בלב הסכסוך״. ההחלטה מעולם לא יושמה: באפריל 2019, במסגרת הסדר בתביעה שהגישו תובעים יהודים-אמריקאים לפי חוק הדיור ההוגן, ביטלה החברה את המדיניות והודיעה שהנכסים יישארו — ורווחיה מהם ייתרמו למטרות הומניטריות.",
      summaryEn: "In November 2018 the company announced it would remove some 200 rental listings in West Bank settlements, saying they are \"at the core of the dispute\". The decision was never implemented: in April 2019, as part of a settlement in a lawsuit brought by Jewish-American plaintiffs under the Fair Housing Act, the company reversed the policy and said the listings would remain — with its profits from them donated to humanitarian causes.",
      tags: ["חרם", "תיקון", "תיירות"],
      sources: [
        { date: "2019-04-10", publisher: "France 24", title: "Airbnb reverses decision to remove listings in occupied West Bank", url: "https://www.france24.com/en/20190410-airbnb-reverses-decision-remove-listings-occupied-west-bank-israeli-settlements-palestine" },
        { date: "2019-04-09", publisher: "The Forward", title: "Airbnb Will Cancel Its Ban On West Bank Settlement Listings", url: "https://forward.com/fast-forward/422307/airbnb-west-bank-settlements/" },
        { date: "2018-11-19", publisher: "Axios", title: "Airbnb removes listings in West Bank settlements", url: "https://www.axios.com/airbnb-listings-west-bank-settlements-palestinian-0a2f6c50-9c0d-4fe9-a008-766eeba6ba99.html" }
      ],
      alternatives: [],
      updated: "2019-04-10"
    },

    /* ═══ מוסדות — ממצאים רשמיים ═══ */

    {
      id: "as-labour",
      name: "מפלגת הלייבור הבריטית",
      aliases: ["Labour Party", "UK Labour"],
      type: "org", actor: "entity",
      location: { country: "בריטניה", region: "eu", city: "לונדון" },
      scope: "local", severity: 4, status: "verified",
      summary: "נציבות השוויון וזכויות האדם הבריטית (EHRC) קבעה ב-29 באוקטובר 2020, בסיום חקירה בת 16 חודשים, שהמפלגה ביצעה מעשים בלתי חוקיים של הטרדה ואפליה כלפי חברים יהודים, ושהנהגת ג׳רמי קורבין ״לא עשתה די למנוע אנטישמיות — ובמקרה הרע נראתה כמשלימה איתה״. קורבין הושעה מהמפלגה בו-ביום בעקבות תגובתו לדוח. תחת קיר סטארמר יישמה המפלגה תוכנית תיקון, והנציבות סיימה את הפיקוח המיוחד בפברואר 2023.",
      summaryEn: "Britain's Equality and Human Rights Commission (EHRC) found on 29 October 2020, at the end of a 16-month investigation, that the party had committed unlawful acts of harassment and discrimination against Jewish members, and that Jeremy Corbyn's leadership \"did not do enough to prevent antisemitism and, at worst, could be seen to accept it\". Corbyn was suspended from the party the same day over his response to the report. Under Keir Starmer the party implemented a reform plan, and the commission ended its special monitoring in February 2023.",
      tags: ["ממצא רשמי", "אפליה", "ממשל"],
      sources: [
        { date: "2020-10-29", publisher: "EHRC", title: "Investigation into antisemitism in the Labour Party — Report", url: "https://www.equalityhumanrights.com/sites/default/files/investigation-into-antisemitism-in-the-labour-party.pdf" },
        { date: "2020-10-29", publisher: "EHRC", title: "Antisemitism in the Labour Party investigation", url: "https://www.equalityhumanrights.com/our-work/inquiries-and-investigations/antisemitism-labour-party/antisemitism-labour-party" },
        { date: "2020-10-29", publisher: "Gulf News", title: "UK Labour suspends ex-leader Jeremy Corbyn after anti-Semitism report", url: "https://gulfnews.com/world/europe/uk-labour-suspends-ex-leader-jeremy-corbyn-after-anti-semitism-report-1.74914604" }
      ],
      alternatives: [],
      updated: "2023-02-17"
    },
    {
      id: "as-unrwa",
      name: "אונר״א (UNRWA)",
      aliases: ["UNRWA", "United Nations Relief and Works Agency"],
      type: "org", actor: "entity",
      location: { country: "בינלאומי", region: "global", city: "" },
      scope: "global", severity: 3, status: "verified",
      summary: "האו״ם פיטר באוגוסט 2024 תשעה מעובדי הסוכנות לפליטים פלסטינים, לאחר שחקירת משרד הפיקוח הפנימי של האו״ם (OIOS) מצאה שהם ״עשויים היו להיות מעורבים״ במתקפת 7 באוקטובר. החקירה בדקה 19 עובדים: בעשרה מקרים לא נמצאו ראיות מספקות, ובתשעה הוחלט על פיטורים. ה-OIOS ציין שהסתמך בין השאר על ראיות ישראליות שלא יכול היה לאמת באופן עצמאי. זהו ממצא של האו״ם עצמו — הארגון שמפעיל את הסוכנות.",
      summaryEn: "In August 2024 the UN fired nine employees of its agency for Palestinian refugees, after an investigation by the UN Office of Internal Oversight Services (OIOS) found they \"may have been involved\" in the 7 October attack. The investigation examined 19 staff members: in ten cases the evidence was insufficient, and in nine dismissal was decided. OIOS noted it relied in part on Israeli evidence it could not independently corroborate. This is a finding by the UN itself — the body that runs the agency.",
      tags: ["ממצא רשמי", "טרור", "7 באוקטובר", "האו״ם"],
      sources: [
        { date: "2024-08-06", publisher: "CBC News", title: "UNRWA fires 9 staffers after internal probe suggests possible involvement in Oct. 7 attacks", url: "https://www.cbc.ca/news/world/unrwa-staffers-fired-oct-7-1.7285735" },
        { date: "2024-08-06", publisher: "The New Humanitarian", title: "Nine UNRWA employees fired, 10 cleared over 7 Oct attacks", url: "https://www.thenewhumanitarian.org/news/2024/08/06/nine-unrwa-employees-fired-10-cleared-over-7-oct-attacks" },
        { date: "2024-08-06", publisher: "NPR", title: "U.N. fires 9 more staffers over potential involvement in Oct. 7 attack on Israel", url: "https://www.npr.org/2024/08/06/nx-s1-5065385/u-n-fires-9-more-staffers-over-potential-involvement-in-oct-7-attack-on-israel" }
      ],
      alternatives: [],
      updated: "2024-08-06"
    },
    {
      id: "as-umc",
      name: "הכנסייה המתודיסטית המאוחדת",
      aliases: ["United Methodist Church", "UMC"],
      type: "org", actor: "entity",
      location: { country: "ארצות הברית", region: "na", city: "" },
      scope: "global", severity: 3, status: "verified",
      summary: "הוועידה הכללית של הכנסייה הצביעה ב-30 באפריל 2024 בשארלוט להורות למנהלי ההשקעות שלה להחריג אג״ח של שלוש מדינות המחזיקות בשטחים תחת כיבוש ממושך — ישראל, טורקיה ומרוקו. סוכנות הפנסיה של הכנסייה, Wespath, יישמה את ההחרגה ב-2025. זו פעולת משיכת ההשקעות הראשונה מסוגה של כנסייה עולמית גדולה, וההחלטה מנוסחת סביב כיבוש ממושך ואינה מוגבלת לישראל.",
      summaryEn: "The church's General Conference voted on 30 April 2024 in Charlotte to direct its investment managers to exclude the bonds of three countries holding populations under prolonged military occupation — Israel, Turkey and Morocco. Wespath, the church's pension agency, implemented the exclusion in 2025. It is the first divestment action of its kind by a major global denomination, and the resolution is framed around prolonged occupation rather than being limited to Israel.",
      tags: ["משיכת השקעות", "כנסייה", "פנסיה"],
      sources: [
        { date: "2024-05-01", publisher: "United Methodist Insight", title: "United Methodist Church Votes to Divest Bonds of Israel and Other Occupier Governments", url: "https://um-insight.net/general-conference/general-conference-2024/united-methodist-church-votes-to-divest-bonds-of-israel-and-/" },
        { date: "2025-08-18", publisher: "Religion News Service", title: "United Methodist Church leads global church in divestment from bonds of Israel, other occupier governments", url: "https://religionnews.com/2025/08/18/united-methodist-church-leads-global-church-in-divestment-from-bonds-of-israel-other-occupier-governments/" }
      ],
      alternatives: [],
      updated: "2025-08-18"
    },

    /* ═══ אקדמיה — החלטות מוסדיות באירופה ═══ */

    {
      id: "as-ghent",
      name: "אוניברסיטת גנט",
      aliases: ["Ghent University", "UGent"],
      type: "academic", actor: "entity",
      location: { country: "בלגיה", region: "eu", city: "גנט" },
      scope: "local", severity: 3, status: "verified",
      summary: "האוניברסיטה הבלגית ניתקה במאי 2024 קשרים עם שלושה מוסדות ישראליים — מכון הטכנולוגי חולון, מיג״ל ומכון וולקני — בנימוק שאינם עולים בקנה אחד עם מדיניות זכויות האדם שלה, ובהמשך אותו חודש הרחיבה את הניתוק לכלל האוניברסיטאות ומוסדות המחקר בישראל. בנובמבר 2024 עיגנה את ההחלטה במסמך רשמי.",
      summaryEn: "In May 2024 the Belgian university severed ties with three Israeli institutions — the Holon Institute of Technology, MIGAL and the Volcani Center — saying they no longer align with its human-rights policy, and later that month extended the break to all Israeli universities and research institutions. In November 2024 it formalised the decision in an official document.",
      tags: ["חרם אקדמי", "אקדמיה"],
      sources: [
        { date: "2024-05-31", publisher: "Haaretz", title: "Belgium's Ghent University Severs Ties With All Israeli Universities", url: "https://www.haaretz.com/world-news/europe/2024-05-31/ty-article/belgiums-ghent-university-severs-ties-with-all-israeli-universities/0000018f-ce8b-d117-a7ef-ffffeaa00000" },
        { date: "2024-11-08", publisher: "Ghent University", title: "Discontinuing the collaborations with Israeli academic institutions (מקור ראשוני)", url: "https://www.ugent.be/en/ghentuniv/mission/human-rights/israel-8november2024.pdf" },
        { date: "2024-05-17", publisher: "The Times of Israel", title: "Belgium's Ghent university severs ties with three Israeli institutions", url: "https://www.timesofisrael.com/liveblog_entry/belgiums-ghent-university-severs-ties-with-three-israeli-institutions/" }
      ],
      alternatives: [],
      updated: "2024-11-08"
    },
    {
      id: "as-trinity",
      name: "טריניטי קולג׳ דבלין",
      aliases: ["Trinity College Dublin", "TCD"],
      type: "academic", actor: "entity",
      location: { country: "אירלנד", region: "eu", city: "דבלין" },
      scope: "local", severity: 3, status: "verified",
      summary: "מועצת המנהלים של האוניברסיטה הוותיקה באירלנד החליטה ב-4 ביוני 2025 לנתק קשרים עם אוניברסיטאות ישראליות ולהתנתק מכל חברה שמושבה בישראל: אי-חידוש חילופי הסטודנטים עם בר-אילן והאוניברסיטה העברית, איסור על התקשרויות מחקר ואספקה עתידיות, ומשיכת השקעות מלאה. ההחלטה קיבלה את המלצות כוח המשימה שהוקם אחרי מאהל המחאה של 2024. הסכמי מחקר קיימים יכובדו עד סיומם.",
      summaryEn: "The board of Ireland's oldest university decided on 4 June 2025 to cut ties with Israeli universities and disengage from all companies headquartered in Israel: not renewing student exchanges with Bar-Ilan and the Hebrew University, barring future research and supply engagements, and divesting fully. The decision adopted the recommendations of the taskforce set up after the 2024 protest encampment. Existing research agreements will be honoured to their end.",
      tags: ["חרם אקדמי", "משיכת השקעות", "אקדמיה"],
      sources: [
        { date: "2025-06-04", publisher: "The Irish Times", title: "Trinity College Dublin board votes to cut ties with Israeli universities and companies", url: "https://www.irishtimes.com/ireland/education/2025/06/04/trinity-college-dublin-board-votes-to-cut-ties-with-israeli-universities-and-companies/" },
        { date: "2025-06-04", publisher: "RTÉ", title: "Trinity College Dublin cuts ties with Israeli organisations", url: "https://www.rte.ie/news/education/2025/0604/1516711-trinity-college-cuts-ties-with-israeli-organisations/" },
        { date: "2025-06-04", publisher: "Trinity College Dublin", title: "Statement from Board 2025 (מקור ראשוני)", url: "https://www.tcd.ie/news_events/articles/2025/statement-from-board-2025/" }
      ],
      alternatives: [],
      updated: "2025-06-04"
    },
    {
      id: "as-crue",
      name: "CRUE — ועידת רקטורי האוניברסיטאות של ספרד",
      aliases: ["CRUE Universidades Españolas", "Conference of Rectors of Spanish Universities"],
      type: "academic", actor: "entity",
      location: { country: "ספרד", region: "eu", city: "מדריד" },
      scope: "local", severity: 3, status: "verified",
      summary: "ארגון הגג של 76 האוניברסיטאות בספרד הודיע ב-9 במאי 2024, בעקבות גל מחאות סטודנטים, על השעיית הקשרים עם אוניברסיטאות ומרכזי מחקר ישראליים ״שלא הביעו מחויבות איתנה לשלום ולציות למשפט ההומניטרי הבינלאומי״, ועל הרחבת שיתוף הפעולה עם מוסדות פלסטיניים. יום קודם הצביעה אוניברסיטת ברצלונה על ניתוק כל קשריה עם ישראל.",
      summaryEn: "The umbrella body of Spain's 76 universities announced on 9 May 2024, following a wave of student protests, that it would suspend ties with Israeli universities and research centres \"that have not expressed a firm commitment to peace and compliance with international humanitarian law\", and expand cooperation with Palestinian institutions. A day earlier the University of Barcelona voted to cut all its ties with Israel.",
      tags: ["חרם אקדמי", "אקדמיה"],
      sources: [
        { date: "2024-05-10", publisher: "Times Higher Education", title: "Spanish universities to suspend ties with Israeli institutions", url: "https://www.timeshighereducation.com/news/spanish-universities-suspend-ties-israeli-institutions" },
        { date: "2024-05-11", publisher: "University World News", title: "Spanish universities to review ties with Israeli universities", url: "https://www.universityworldnews.com/post.php?story=20240511215138917" }
      ],
      alternatives: [],
      updated: "2024-05-10"
    },
    {
      id: "as-helsinki-uni",
      name: "אוניברסיטת הלסינקי",
      aliases: ["University of Helsinki"],
      type: "academic", actor: "entity",
      location: { country: "פינלנד", region: "eu", city: "הלסינקי" },
      scope: "local", severity: 3, status: "verified",
      summary: "האוניברסיטה הגדולה בפינלנד השעתה במאי 2024 את כל הסכמי חילופי הסטודנטים עם מוסדות ישראליים, בעקבות מחאות סטודנטים, והודיעה שלא תחדש אותם בלי בדיקה אתית. שיתוף הפעולה המחקרי לא הושעה — האוניברסיטה קבעה שחופש המחקר ״חיוני מכדי להגבילו״.",
      summaryEn: "Finland's largest university suspended all student exchange agreements with Israeli institutions in May 2024, following student protests, and said it would not resume them without an ethical review. Research cooperation was not suspended — the university held that the freedom of research is \"so crucial to university operations that it will not be limited\".",
      tags: ["חרם אקדמי", "אקדמיה"],
      sources: [
        { date: "2024-05-23", publisher: "Yle", title: "Helsinki uni suspends exchanges with Israeli institutions", url: "https://yle.fi/a/74-20089769" },
        { date: "2024-05-23", publisher: "University of Helsinki", title: "The University has reassessed its collaboration with Israeli universities (מקור ראשוני)", url: "https://www.helsinki.fi/en/news/higher-education-policy/university-has-reassessed-its-collaboration-israeli-universities" }
      ],
      alternatives: [],
      updated: "2024-05-23"
    },

    /* ═══ אישים — הרשעות, ממצאים ואירועים מתועדים ═══ */

    {
      id: "as-galliano",
      name: "ג׳ון גליאנו",
      aliases: ["John Galliano"],
      type: "person", actor: "individual",
      location: { country: "צרפת", region: "eu", city: "פריז" },
      scope: "global", severity: 4, status: "verified",
      summary: "בית משפט בפריז הרשיע ב-8 בספטמבר 2011 את מעצב-העל בשני סעיפים של עלבונות אנטישמיים פומביים, בגין שתי התפרצויות בבר פריזאי ב-2010 וב-2011 (״אני אוהב את היטלר״ בין השאר). נגזרו עליו קנסות על-תנאי בסך 6,000 אירו, פיצוי סמלי לקורבנות ותשלום הוצאות לארגונים נגד גזענות. דיור פיטרה אותו עוד קודם להרשעה.",
      summaryEn: "On 8 September 2011 a Paris court convicted the star designer on two counts of public antisemitic insults, over two outbursts at a Paris bar in 2010 and 2011 (including \"I love Hitler\"). He received suspended fines totalling €6,000, symbolic damages to the victims and costs to anti-racism groups. Dior had fired him before the conviction.",
      tags: ["הרשעה פלילית", "אופנה"],
      sources: [
        { date: "2011-09-08", publisher: "France 24", title: "Paris court fines Galliano €6,000 for anti-Semitic rant", url: "https://www.france24.com/en/20110908-justice-fashion-verdict-john-galliano-anti-semitism-trial-dior-rant-perle" },
        { date: "2011-09-08", publisher: "CNN", title: "Designer Galliano found guilty in anti-Semitism trial", url: "https://www.cnn.com/2011/WORLD/europe/09/08/france.designer.trial/" }
      ],
      alternatives: [],
      updated: "2011-09-08"
    },
    {
      id: "as-kyrie",
      name: "קיירי אירווינג",
      aliases: ["Kyrie Irving"],
      type: "person", actor: "individual",
      location: { country: "ארצות הברית", region: "na", city: "" },
      scope: "global", severity: 4, status: "verified",
      summary: "כוכב ה-NBA פרסם באוקטובר 2022 קישור לסרט המכיל שלל תכנים אנטישמיים, ובמסיבת עיתונאים סירב תחילה להתנער מהם. ברוקלין נטס השעתה אותו לשמונה משחקים ללא שכר והציבה תנאים לחזרתו, ובהם הכשרה בנושא אנטישמיות; נייקי השעתה ואחר כך סיימה סופית את חוזהו. אירווינג התנצל בהמשך ומחק את הפרסום.",
      summaryEn: "In October 2022 the NBA star posted a link to a film laden with antisemitic content, and at a press conference initially refused to disavow it. The Brooklyn Nets suspended him for eight games without pay and set conditions for his return, including antisemitism training; Nike suspended and then terminated his contract. Irving later apologised and deleted the post.",
      tags: ["ספורט", "רשתות חברתיות", "השעיה"],
      sources: [
        { date: "2022-12-05", publisher: "NPR", title: "Kyrie Irving's partnership with Nike is officially terminated", url: "https://www.npr.org/2022/12/05/1140830753/kyrie-irving-nike-contract-terminated" },
        { date: "2022-11-05", publisher: "NBA.com", title: "Nike suspends relationship with Kyrie Irving", url: "https://www.nba.com/news/nike-suspends-relationship-with-kyrie-iving" }
      ],
      alternatives: [],
      updated: "2022-12-05"
    },
    {
      id: "as-wiley",
      name: "ויילי",
      aliases: ["Wiley", "Richard Cowie"],
      type: "person", actor: "individual",
      location: { country: "בריטניה", region: "eu", city: "לונדון" },
      scope: "local", severity: 4, status: "verified",
      summary: "״סנדק הגריים״ הבריטי פרסם ביולי 2020 מטח ציוצים אנטישמיים שכללו תאוריות קונספירציה והשוואת יהודים לקו-קלוקס-קלאן. חברת הניהול שלו, A-List, ניתקה עמו כל קשר; טוויטר חסמה אותו לצמיתות והתנצלה על האיטיות בטיפול, ופייסבוק ואינסטגרם הסירו את חשבונותיו. הפרשה הולידה חרם משתמשים בן 48 שעות על טוויטר תחת ההאשטג #NoSafeSpaceForJewHate.",
      summaryEn: "In July 2020 the British \"godfather of grime\" posted a barrage of antisemitic tweets including conspiracy theories and comparing Jews to the Ku Klux Klan. His management company, A-List, cut all ties; Twitter banned him permanently and apologised for its slowness, and Facebook and Instagram removed his accounts. The affair sparked a 48-hour user boycott of Twitter under #NoSafeSpaceForJewHate.",
      tags: ["מוזיקה", "רשתות חברתיות"],
      sources: [
        { date: "2020-07-26", publisher: "Variety", title: "U.K. Rapper Wiley Dropped by Manager, Distributor After Anti-Semitic Twitter Rant", url: "https://variety.com/2020/music/news/uk-rapper-wiley-anti-semitic-twitter-rant-1234716734/" },
        { date: "2020-07-29", publisher: "Al Jazeera", title: "Twitter permanently bans British rapper Wiley over anti-Semitism", url: "https://www.aljazeera.com/features/2020/7/29/twitter-permanently-bans-british-rapper-wiley-over-anti-semitism" }
      ],
      alternatives: [],
      updated: "2020-07-29"
    },
    {
      id: "as-cannon",
      name: "ניק קאנון",
      aliases: ["Nick Cannon"],
      type: "person", actor: "individual",
      location: { country: "ארצות הברית", region: "na", city: "לוס אנג׳לס" },
      scope: "global", severity: 4, status: "verified",
      summary: "ViacomCBS פיטרה את המנחה ביולי 2020 לאחר שבפודקאסט שלו קידם תאוריות קונספירציה אנטישמיות. קאנון התנצל, למד עם רבנים ומנהיגים יהודים ועבר תהליך חינוכי מקיף — שבעקבותיו הוחזר לתפקידו בפברואר 2021 בגיבוי מנכ״ל ה-ADL, שאמר כי התרשם מהמסע שעבר. מקרה שבו ההתנצלות והתיקון היו מלאים ומתועדים לא פחות מהעבירה.",
      summaryEn: "ViacomCBS fired the host in July 2020 after he promoted antisemitic conspiracy theories on his podcast. Cannon apologised, studied with rabbis and Jewish leaders and underwent an extensive educational process — after which he was reinstated in February 2021 with the backing of the ADL's chief executive, who said he was impressed by the journey. A case where the apology and repair were as fully documented as the offence.",
      tags: ["תקשורת", "תיקון"],
      sources: [
        { date: "2020-07-15", publisher: "Forbes", title: "Nick Cannon Fired By ViacomCBS In Wake Of Anti-Semitic Comments", url: "https://www.forbes.com/sites/isabeltogoh/2020/07/15/nick-cannon-fired-by-viacomcbs-in-wake-of-anti-semitic-comments/" },
        { date: "2023-02", publisher: "The Hollywood Reporter", title: "Nick Cannon \"Impressed\" ADL President After Sit-Down Following Firing", url: "https://www.hollywoodreporter.com/tv/tv-news/nick-cannon-adl-president-firing-antisemitic-comments-1235482335/" }
      ],
      alternatives: [],
      updated: "2021-02-01"
    },
    {
      id: "as-desean",
      name: "דישון ג׳קסון",
      aliases: ["DeSean Jackson"],
      type: "person", actor: "individual",
      location: { country: "ארצות הברית", region: "na", city: "" },
      scope: "local", severity: 4, status: "verified",
      summary: "שחקן ה-NFL פרסם ביולי 2020 בסטורי שלו ציטוט מפוברק המיוחס להיטלר על מזימה יהודית, לצד תכנים של לואיס פרחאן. פילדלפיה איגלס קנסה אותו על ״התנהגות הפוגעת בקבוצה״ והתנתה את המשך העסקתו בתהליך חינוכי. ג׳קסון התנצל פעמיים, נפגש עם ניצול שואה בן 94 וקיבל את הזמנתו לבקר באושוויץ.",
      summaryEn: "In July 2020 the NFL player posted to his story a fabricated quote attributed to Hitler about a Jewish plot, alongside Louis Farrakhan content. The Philadelphia Eagles fined him for conduct detrimental to the team and conditioned his continued employment on an educational process. Jackson apologised twice, met a 94-year-old Holocaust survivor and accepted his invitation to visit Auschwitz.",
      tags: ["ספורט", "רשתות חברתיות", "תיקון"],
      sources: [
        { date: "2020-07-10", publisher: "NFL.com", title: "Eagles discipline DeSean Jackson, keep him on roster conditionally", url: "https://www.nfl.com/news/eagles-discipline-wr-desean-jackson-keeping-him-on-roster" },
        { date: "2020-07-10", publisher: "The Philadelphia Inquirer", title: "DeSean Jackson penalized by Eagles for anti-Semitic Instagram post", url: "https://www.inquirer.com/eagles/eagles-penalize-desean-jackson-for-anti-semetic-posts-release-statement-20200710.html" }
      ],
      alternatives: [],
      updated: "2020-07-12"
    },
    {
      id: "as-whoopi",
      name: "וופי גולדברג",
      aliases: ["Whoopi Goldberg"],
      type: "person", actor: "individual",
      location: { country: "ארצות הברית", region: "na", city: "ניו יורק" },
      scope: "global", severity: 1, status: "verified",
      summary: "המנחה אמרה בינואר 2022 בתוכנית The View שהשואה ״אינה עניין של גזע אלא של חוסר אנושיות של אדם לאדם״. ABC השעתה אותה לשבועיים, וגולדברג התנצלה פעמיים — כולל ציטוט הגדרת ה-ADL שלפיה השואה הייתה השמדה שיטתית של העם היהודי שהנאצים הגדירו גזע נחות. אמירה יחידה שלוותה בהתנצלות מיידית — לא דפוס.",
      summaryEn: "In January 2022 the host said on The View that the Holocaust was \"not about race, it's about man's inhumanity to man\". ABC suspended her for two weeks, and Goldberg apologised twice — including quoting the ADL's definition of the Holocaust as the systematic annihilation of the Jewish people, whom the Nazis deemed an inferior race. A single remark followed by an immediate apology — not a pattern.",
      tags: ["תקשורת", "השעיה", "תיקון"],
      sources: [
        { date: "2022-02-01", publisher: "CBS News", title: "Whoopi Goldberg suspended from \"The View\" after saying the Holocaust was \"not about race\"", url: "https://www.cbsnews.com/news/whoopi-goldberg-suspended-the-view-holocaust-race-comments/" },
        { date: "2022-02-01", publisher: "Variety", title: "Whoopi Goldberg Suspended at 'The View' After Holocaust Remarks", url: "https://variety.com/2022/tv/news/whoopi-goldberg-suspended-the-view-1235169537/" }
      ],
      alternatives: [],
      updated: "2022-02-14"
    },
    {
      id: "as-sarandon",
      name: "סוזן סרנדון",
      aliases: ["Susan Sarandon"],
      type: "person", actor: "individual",
      location: { country: "ארצות הברית", region: "na", city: "ניו יורק" },
      scope: "global", severity: 1, status: "verified",
      summary: "השחקנית אמרה בעצרת פרו-פלסטינית בניו יורק ב-17 בנובמבר 2023 שיהודים שחוששים כעת ״טועמים איך זה מרגיש להיות מוסלמי במדינה הזאת״. סוכנות UTA הפסיקה לייצגה ימים אחר כך. סרנדון התנצלה: ״הניסוח היה טעות נוראה — הוא מרמז שעד לאחרונה יהודים היו זרים לרדיפה, וההפך הוא הנכון״.",
      summaryEn: "At a pro-Palestinian rally in New York on 17 November 2023 the actress said that Jews who are now afraid are \"getting a taste of what it feels like to be a Muslim in this country\". UTA dropped her as a client days later. Sarandon apologised: \"This phrasing was a terrible mistake — it implies that until recently Jews have been strangers to persecution, when the opposite is true.\"",
      tags: ["קולנוע", "תיקון"],
      sources: [
        { date: "2023-11-21", publisher: "Variety", title: "UTA Drops Susan Sarandon After Comments at Pro-Palestine Rally in New York", url: "https://variety.com/2023/film/news/susan-sarandon-uta-dropped-palestine-rally-1235804444/" },
        { date: "2023-12", publisher: "Rolling Stone", title: "Susan Sarandon Apologizes After Pro-Palestinian Rally Comments", url: "https://www.rollingstone.com/tv-movies/tv-movie-news/susan-sarandon-apology-pro-palestinian-rally-comments-1234892760/" }
      ],
      alternatives: [],
      updated: "2023-12-01"
    },
    {
      id: "as-barrera",
      name: "מליסה באררה",
      aliases: ["Melissa Barrera"],
      type: "person", actor: "individual",
      location: { country: "ארצות הברית", region: "na", city: "לוס אנג׳לס" },
      scope: "global", severity: 2, status: "verified",
      summary: "אולפני ספייגלאס הדיחו את השחקנית מ״צעקה 7״ בנובמבר 2023 בשל פוסטים שבהם האשימה את ישראל ב״רצח עם וטיהור אתני״ וכינתה את עזה ״מחנה ריכוז״. האולפן נימק: ״אפס סובלנות לאנטישמיות או להסתה, כולל אזכורי שווא של רצח עם ועיוות שואה״. באררה הגיבה שהיא מגנה אנטישמיות ואיסלאמופוביה ודוחה שנאה מכל סוג. עמדה מדינית מתועדת — ההגדרה ״אנטישמיות״ שנויה במחלוקת בין הצדדים.",
      summaryEn: "Spyglass removed the actress from \"Scream 7\" in November 2023 over posts accusing Israel of \"genocide and ethnic cleansing\" and calling Gaza a \"concentration camp\". The studio cited \"zero tolerance for antisemitism or the incitement of hate, including false references to genocide and Holocaust distortion\". Barrera responded that she condemns antisemitism and Islamophobia and rejects hate of any kind. A documented political position — whether it constitutes antisemitism is disputed between the parties.",
      tags: ["קולנוע", "רשתות חברתיות"],
      sources: [
        { date: "2023-11-21", publisher: "Variety", title: "Spyglass Says Melissa Barrera Was Fired From 'Scream' Due to Rhetoric That 'Flagrantly Crosses the Line Into Hate Speech'", url: "https://variety.com/2023/film/news/scream-producers-explain-melissa-barrera-fired-antisemitism-1235804914/" },
        { date: "2023-11-22", publisher: "BBC News", title: "Melissa Barrera: Actress fired from Scream 7 over Israel-Gaza posts", url: "https://feeds.bbci.co.uk/news/entertainment-arts-67494374" }
      ],
      alternatives: [],
      updated: "2023-11-22"
    },
    {
      id: "as-tlaib",
      name: "רשידה טלייב",
      aliases: ["Rashida Tlaib"],
      type: "person", actor: "individual",
      location: { country: "ארצות הברית", region: "na", city: "דטרויט" },
      scope: "local", severity: 2, status: "verified",
      summary: "בית הנבחרים האמריקאי הצביע ב-7 בנובמבר 2023, ברוב של 234 מול 188, להטיל נזיפה רשמית (censure) על חברת הקונגרס — הפלסטינית-אמריקאית היחידה בבית — בגין ״קידום נרטיבים כוזבים על מתקפת 7 באוקטובר וקריאה להשמדת מדינת ישראל״, על רקע הגנתה על הסיסמה ״מהנהר עד הים״. טלייב טענה שהסיסמה היא ״קריאה שאפתנית לחירות ולדו-קיום, לא למוות״. 22 דמוקרטים הצטרפו לרוב. זו הצהרה פוליטית של מחוקקים, לא ממצא שיפוטי.",
      summaryEn: "On 7 November 2023 the US House voted 234–188 to censure the congresswoman — the only Palestinian-American in the chamber — for \"promoting false narratives regarding the October 7 attack and calling for the destruction of the state of Israel\", over her defence of the slogan \"from the river to the sea\". Tlaib said the phrase is \"an aspirational call for freedom and coexistence, not death\". 22 Democrats joined the majority. This is a political statement by legislators, not a judicial finding.",
      tags: ["ממשל", "עמדה מדינית"],
      sources: [
        { date: "2023-11-07", publisher: "Congress.gov", title: "H.Res.845 — Censuring Representative Rashida Tlaib (מקור ראשוני)", url: "https://www.congress.gov/bill/118th-congress/house-resolution/845/text" },
        { date: "2023-11-08", publisher: "The Washington Post", title: "House votes to censure Rep. Rashida Tlaib over comments about Israel", url: "https://www.washingtonpost.com/politics/2023/11/07/rashida-tlaib-censured-house-israel-palestine/" }
      ],
      alternatives: [],
      updated: "2023-11-08"
    },
    {
      id: "as-kneecap",
      name: "Kneecap",
      aliases: ["ניקאפ", "Mo Chara", "Liam Óg Ó hAnnaidh"],
      type: "entertainment", actor: "entity",
      location: { country: "אירלנד", region: "eu", city: "" },
      scope: "global", severity: 3, status: "verified",
      summary: "חבר שלישיית הראפ הבלפסטית, מו צ׳ארה, הואשם במאי 2025 בעבירת טרור בבריטניה לאחר שתועד מניף דגל חיזבאללה בהופעה בלונדון בנובמבר 2024; בהופעות אחרות תועדו קריאות ״Up Hamas, up Hezbollah״. ב-26 בספטמבר 2025 בוטל האישום — לא לגופו אלא על סף טכני, לאחר שהתביעה איחרה ביום אחד את מועד ההגשה. בקואצ׳לה 2025 הקרינה הלהקה מסרים נגד ישראל, וההרכב הפך לסמל גל המחאה האנטי-ישראלי בפסטיבלים.",
      summaryEn: "A member of the Belfast rap trio, Mo Chara, was charged in May 2025 with a terror offence in Britain after being filmed holding a Hezbollah flag at a November 2024 London gig; other shows featured chants of \"Up Hamas, up Hezbollah\". On 26 September 2025 the charge was thrown out — not on the merits but on a technicality, after prosecutors missed the filing deadline by a day. At Coachella 2025 the band projected anti-Israel messages, and it became the emblem of the anti-Israel protest wave at festivals.",
      tags: ["מוזיקה", "טרור", "פסטיבלים"],
      sources: [
        { date: "2025-09-26", publisher: "CNN", title: "Kneecap's Mo Chara: UK court dismisses terrorism charge against Irish rap group member", url: "https://www.cnn.com/2025/09/26/uk/kneecap-mo-chara-terrorism-charge-dismissed-intl-scli" },
        { date: "2025-09-26", publisher: "JTA", title: "Terrorism charges dropped against Kneecap singer who held Hezbollah flag at concert", url: "https://www.jta.org/2025/09/26/culture/terrorism-charges-dropped-against-kneecap-singer-who-held-hezbollah-flag-at-concert" }
      ],
      alternatives: [],
      updated: "2025-09-26"
    },
    {
      id: "as-bobvylan",
      name: "Bob Vylan",
      aliases: ["בוב ויילן", "Bobby Vylan"],
      type: "entertainment", actor: "entity",
      location: { country: "בריטניה", region: "eu", city: "לונדון" },
      scope: "global", severity: 3, status: "verified",
      summary: "צמד הפאנק הבריטי הוביל ב-28 ביוני 2025, על במת גלסטונברי ובשידור חי ב-BBC, קריאות ״מוות, מוות לצה״ל״ מול אלפים. מחלקת המדינה האמריקאית ביטלה את הוויזות של חברי הצמד לקראת סיבוב הופעות של 18 מופעים, ומשטרת בריטניה פתחה בבדיקה פלילית. הצמד הגיב: ״איננו בעד מותם של יהודים, ערבים או כל קבוצה — אנחנו בעד פירוק מכונה צבאית אלימה״.",
      summaryEn: "On 28 June 2025, on Glastonbury's stage and live on the BBC, the British punk duo led thousands in chants of \"death, death to the IDF\". The US State Department revoked the duo's visas ahead of an 18-date tour, and British police opened a criminal review. The duo responded: \"We are not for the death of Jews, Arabs or any other group of people — we are for the dismantling of a violent military machine.\"",
      tags: ["מוזיקה", "הסתה", "פסטיבלים"],
      sources: [
        { date: "2025-07-01", publisher: "JTA", title: "State Dept. revokes visas for Bob Vylan following 'death to the IDF' chants at Glastonbury", url: "https://www.jta.org/2025/07/01/culture/state-dept-revokes-visas-for-bob-vylan-following-death-to-the-idf-chants-at-glastonbury" },
        { date: "2025-06-30", publisher: "CNN", title: "Bob Vylan's Israeli military chant prompts US visa cancellation and UK criminal probe", url: "https://www.cnn.com/2025/06/30/uk/bob-vylan-uk-band-glastonbury-us-visa-intl-latam" }
      ],
      alternatives: [],
      updated: "2025-07-01"
    },
    {
      id: "as-kehlani",
      name: "קהלאני",
      aliases: ["Kehlani"],
      type: "person", actor: "individual",
      location: { country: "ארצות הברית", region: "na", city: "" },
      scope: "global", severity: 3, status: "verified",
      summary: "אוניברסיטת קורנל ביטלה באפריל 2025 את הופעת הזמרת באירוע Slope Day השנתי; הנשיא מייקל קוטליקוף נימק ב״עמדות אנטישמיות ואנטי-ישראליות שהביעה בהופעות, בקליפים וברשתות״ — ובהן הקליפ ״Next 2 U״ הנפתח בכיתוב ״תחי האינתיפאדה״. במאי בוטלה גם הופעתה בסנטרל פארק בניו יורק. קהלאני הגיבה: ״אני לא אנטישמית — אני נגד רצח עם ונגד פעולות ממשלת ישראל״.",
      summaryEn: "In April 2025 Cornell University cancelled the singer's headline slot at its annual Slope Day; president Michael Kotlikoff cited \"antisemitic, anti-Israel sentiments espoused in performances, videos and social media\" — including the \"Next 2 U\" video, which opens with \"Long live the intifada\". In May her Central Park SummerStage show was cancelled too. Kehlani responded: \"I am not antisemitic — I am anti-genocide and anti the actions of the Israeli government.\"",
      tags: ["מוזיקה", "קמפוס", "הסתה"],
      sources: [
        { date: "2025-04-28", publisher: "The Spokesman-Review", title: "Kehlani's Cornell show canceled over 'antisemitic, anti-Israel sentiments'", url: "https://www.spokesman.com/stories/2025/apr/28/kehlanis-cornell-show-canceled-over-antisemitic-an/" },
        { date: "2025-05-06", publisher: "JTA", title: "Anti-Israel singer Kehlani's Central Park SummerStage concert canceled", url: "https://www.jta.org/2025/05/06/ny/anti-israel-singer-kehlanis-central-park-concert-canceled" }
      ],
      alternatives: [],
      updated: "2025-05-06"
    },
    {
      id: "as-greta",
      name: "גרטה ת׳ונברג",
      aliases: ["Greta Thunberg"],
      type: "person", actor: "individual",
      location: { country: "שוודיה", region: "eu", city: "" },
      scope: "global", severity: 2, status: "verified",
      summary: "פעילת האקלים הפכה מאז 7 באוקטובר לאחד הקולות הבולטים נגד ישראל בזירה הבינלאומית. ביוני 2025 הפליגה על סיפון ה״מדלין״ — ספינת משט לעזה מטעם קואליציית המשט החופשי — שנעצרה בידי חיל הים הישראלי; ת׳ונברג גורשה לשוודיה וטענה ש״נחטפה״. ישראל טענה שהמשט סירב שוב ושוב להצעות לפרוק את הסיוע בערוצים מוסדרים. עמדה מדינית עקבית — לא אנטישמיות.",
      summaryEn: "Since 7 October the climate activist has become one of the most prominent voices against Israel internationally. In June 2025 she sailed on the Madleen — a Gaza flotilla vessel of the Freedom Flotilla Coalition — which was intercepted by the Israeli navy; Thunberg was deported to Sweden and said she had been \"kidnapped\". Israel said the flotilla had repeatedly refused offers to offload the aid through regulated channels. A consistent political position — not antisemitism.",
      tags: ["עמדה מדינית", "מחאה"],
      sources: [
        { date: "2025-06-10", publisher: "TIME", title: "Greta Thunberg Deported After Israel Intercepts Gaza Aid Ship", url: "https://time.com/7292250/freedom-flotilla-greta-thunberg-gaza-ship-intercepted/" },
        { date: "2025-06-10", publisher: "BBC News", title: "Greta Thunberg deported, Israel says, after Gaza aid boat intercepted", url: "https://feeds.bbci.co.uk/news/articles/c5y264x3nnno" }
      ],
      alternatives: [],
      updated: "2025-06-10"
    },
    {
      id: "as-albanese-fr",
      name: "פרנצ׳סקה אלבנזה",
      aliases: ["Francesca Albanese"],
      type: "person", actor: "individual",
      location: { country: "בינלאומי", region: "global", city: "" },
      scope: "global", severity: 3, status: "verified",
      summary: "הדווחת המיוחדת של מועצת זכויות האדם של האו״ם לשטחים הפלסטיניים מאשימה בדוחותיה את ישראל ב״רצח עם״, ובדוח מיוני 2025 מנתה למעלה מ-60 חברות כ״שותפות״ לו. ב-9 ביולי 2025 הטילה עליה ארצות הברית סנקציות — צעד חסר תקדים נגד דווחת או״ם מכהנת — בנימוק של פעילותה מול בית הדין הפלילי הבינלאומי נגד אזרחי ארה״ב וישראל; במאי 2026 הוחזרה לרשימת הסנקציות. בכירי או״ם וארגוני זכויות אדם גינו את הסנקציות ודרשו לבטלן.",
      summaryEn: "The UN Human Rights Council's Special Rapporteur for the Palestinian territories accuses Israel in her reports of \"genocide\", and in a June 2025 report named more than 60 companies as \"complicit\" in it. On 9 July 2025 the United States imposed sanctions on her — an unprecedented step against a sitting UN rapporteur — citing her engagement with the International Criminal Court against US and Israeli nationals; in May 2026 she was returned to the sanctions list. Senior UN officials and human-rights groups condemned the sanctions and demanded their reversal.",
      tags: ["האו״ם", "עמדה מדינית", "ממצא רשמי"],
      sources: [
        { date: "2025-08", publisher: "OHCHR", title: "US sanctions on Special Rapporteur Francesca Albanese threaten human rights system: UN experts", url: "https://www.ohchr.org/en/statements/2025/08/us-sanctions-special-rapporteur-francesca-albanese-threaten-human-rights-system" },
        { date: "2026-05-28", publisher: "Al Jazeera", title: "US returns Palestinian rights expert Francesca Albanese to sanctions list", url: "https://www.aljazeera.com/news/2026/5/28/us-returns-palestinian-rights-expert-francesca-albanese-to-sanctions-list" }
      ],
      alternatives: [],
      updated: "2026-05-28"
    },
    {
      id: "as-gibson",
      name: "מל גיבסון",
      aliases: ["Mel Gibson"],
      type: "person", actor: "individual",
      location: { country: "ארצות הברית", region: "na", city: "לוס אנג׳לס" },
      scope: "global", severity: 4, status: "verified",
      summary: "בעת מעצרו על נהיגה בשכרות במאליבו ביולי 2006 פלט השחקן-במאי מטח אמירות אנטישמיות שתועדו בדוח המעצר, ובהן ״היהודים אחראים לכל המלחמות בעולם״. גיבסון הודה בדברים והתנצל פומבית פעמיים, וב-2011 נחשפו הקלטות ובהן התבטאויות פוגעניות נוספות. האמירות מתועדות ברשומת משטרה — לא בשמועה.",
      summaryEn: "During his DUI arrest in Malibu in July 2006 the actor-director let out a stream of antisemitic remarks recorded in the arrest report, including \"the Jews are responsible for all the wars in the world\". Gibson admitted the remarks and apologised publicly twice, and in 2011 recordings surfaced with further abusive statements. The remarks are documented in a police record — not in rumour.",
      tags: ["קולנוע", "ממצא רשמי"],
      sources: [
        { date: "2016-11-23", publisher: "Variety", title: "Mel Gibson Opens Up on 2006 DUI Arrest, Anti-Semitic Remarks", url: "https://variety.com/2016/film/news/mel-gibson-interview-anti-semitic-2006-arrest-podcast-1201902552/", quote: "the Jews are responsible for all the wars in the world" },
        { date: "2006-08", publisher: "CBS News", title: "Mel Gibson comments on his 2006 anti-Semitic remarks", url: "https://www.cbsnews.com/news/mel-gibson-comments-on-his-2006-anti-semitic-remarks/" }
      ],
      alternatives: [],
      updated: "2016-11-23"
    },

    {
      id: "as-nbim",
      name: "קרן העושר הריבונית של נורווגיה",
      aliases: ["Norges Bank Investment Management", "NBIM", "Government Pension Fund Global", "Oljefondet"],
      type: "org",
      location: { country: "נורווגיה", region: "eu", city: "אוסלו" },
      scope: "global",
      severity: 2,
      status: "verified",
      summary: "קרן הפנסיה הממשלתית של נורווגיה, הגדולה בעולם (כ־2 טריליון דולר), מכרה באוגוסט 2025 את אחזקותיה ב־11 חברות ישראליות. בהמשך החודש הוציאה מהתיק גם את קטרפילר האמריקאית וחמישה בנקים ישראליים, בנימוק של ״סיכון בלתי מתקבל על הדעת״ לתרומה להפרת זכויות. הקרן הודיעה גם על סיום ההתקשרות עם כל מנהלי ההשקעות החיצוניים שלה בישראל.",
      tags: ["משיכת השקעות", "פיננסים", "קרן ריבונית"],
      sources: [
        { date: "2025-08-12", publisher: "CNN Business", title: "Norway wealth fund expects to sell more Israeli stocks due to situation in Gaza and West Bank", url: "https://www.cnn.com/2025/08/12/business/norway-sovereign-fund-sell-israeli-stocks-intl" },
        { date: "2025-08-26", publisher: "CNBC", title: "World's largest sovereign wealth fund exits Caterpillar and five banks on Israel concerns", url: "https://www.cnbc.com/2025/08/26/norways-giant-wealth-fund-exits-six-firms-on-israel-concerns.html", quote: "unacceptable risk that the firms contribute to rights violations" },
        { date: "2025", publisher: "Norges Bank Investment Management", title: "Renewed review of responsible investment work and investments in Israeli companies (מקור ראשוני)", url: "https://www.nbim.no/en/news-and-insights/submissions-to-ministry/2025/government-pension-fund-global--renewed-review-of-responsible-investment-work-and-investments-in-israeli-companies/" },
        { date: "2025-08-18", publisher: "The Times of Israel", title: "Norway's wealth fund excludes 6 more Israeli companies linked to West Bank, Gaza", url: "https://www.timesofisrael.com/norways-wealth-fund-excludes-6-more-israeli-companies-linked-to-west-bank-gaza/" }
      ],
      alternatives: [],
      updated: "2025-08-26"
    },
    {
      id: "as-akademiker",
      name: "AkademikerPension",
      aliases: ["אקדמיקר-פנסיון", "קרן הפנסיה של האקדמאים בדנמרק"],
      type: "org",
      location: { country: "דנמרק", region: "eu", city: "" },
      scope: "global",
      severity: 3,
      status: "verified",
      summary: "קרן הפנסיה הדנית הודיעה בספטמבר 2025 על הוצאה מלאה של ישראל מתיק ההשקעות שלה — לא חברות מסוימות אלא המדינה כולה, כולל אג״ח ממשלתיות. מדובר בהחלטה גורפת ולא ממוקדת, ולכן היא מסווגת כחרם ולא כמשיכת השקעות סלקטיבית.",
      tags: ["משיכת השקעות", "חרם", "פיננסים"],
      sources: [
        { date: "2025-10", publisher: "ImpACT International", title: "PME and PFZW Divest from Stocks Linked to Israel", url: "https://impactpolicies.org/news/609/pme-and-pfzw-divest-from-stocks-linked-to-israel-human-rights-violations" },
        { date: "2025", publisher: "Pensions & Investments", title: "European pension funds have pulled investments from Israel", url: "https://www.pionline.com/rules-regulations/esg/pi-european-pension-funds-divestment-israel-ceasefire/" }
      ],
      alternatives: [],
      updated: "2025-10"
    },
    {
      id: "as-abp",
      name: "ABP",
      aliases: ["Stichting Pensioenfonds ABP", "קרן הפנסיה ההולנדית הגדולה"],
      type: "org",
      location: { country: "הולנד", region: "eu", city: "היירלן" },
      scope: "global",
      severity: 2,
      status: "verified",
      summary: "קרן הפנסיה הגדולה בהולנד מכרה באוקטובר 2025 את כל מניות קטרפילר שהחזיקה, בשווי כ־387 מיליון אירו. באפריל 2025 משכה השקעות מ־Booking Holdings, מוטורולה, טבע, קוקה־קולה ארה״ב ומכמה חברות ישראליות קטנות.",
      tags: ["משיכת השקעות", "פיננסים", "פנסיה"],
      sources: [
        { date: "2025-10", publisher: "ImpACT International", title: "European pension funds divest from stocks linked to Israel", url: "https://impactpolicies.org/news/609/pme-and-pfzw-divest-from-stocks-linked-to-israel-human-rights-violations" },
        { date: "2025", publisher: "Pensions & Investments", title: "European pension funds have pulled investments from Israel", url: "https://www.pionline.com/rules-regulations/esg/pi-european-pension-funds-divestment-israel-ceasefire/" }
      ],
      alternatives: [],
      updated: "2025-10"
    },
    {
      id: "as-pfzw",
      name: "PFZW ו־PME",
      aliases: ["Pensioenfonds Zorg en Welzijn", "PME Pensioenfonds"],
      type: "org",
      location: { country: "הולנד", region: "eu", city: "" },
      scope: "global",
      severity: 2,
      status: "verified",
      summary: "שתי קרנות פנסיה הולנדיות גדולות הודיעו באוקטובר 2025 על משיכת השקעות ממניות הקשורות לישראל. PME מכרה אחזקות ב־11 חברות ישראליות, בהן בית שמש מנועים, המספקת שירותי תחזוקה למטוסי הקרב של חיל האוויר.",
      tags: ["משיכת השקעות", "פיננסים", "פנסיה"],
      sources: [
        { date: "2025-10", publisher: "ImpACT International", title: "PME and PFZW Divest from Stocks Linked to Israel Human Rights Violations", url: "https://impactpolicies.org/news/609/pme-and-pfzw-divest-from-stocks-linked-to-israel-human-rights-violations" },
        { date: "2025", publisher: "Pensions & Investments", title: "European pension funds have pulled investments from Israel", url: "https://www.pionline.com/rules-regulations/esg/pi-european-pension-funds-divestment-israel-ceasefire/" }
      ],
      alternatives: [],
      updated: "2025-10"
    },
    {
      id: "as-uss",
      name: "Universities Superannuation Scheme",
      aliases: ["USS", "קרן הפנסיה של האוניברסיטאות בבריטניה"],
      type: "org",
      location: { country: "בריטניה", region: "eu", city: "לונדון" },
      scope: "global",
      severity: 2,
      status: "verified",
      summary: "קרן הפנסיה הפרטית הגדולה בבריטניה משכה למעלה מ־100 מיליון דולר מנכסים ישראליים כבר באוגוסט 2024, לפני גל משיכות ההשקעות האירופי.",
      tags: ["משיכת השקעות", "פיננסים", "אקדמיה"],
      sources: [
        { date: "2024-08", publisher: "Middle East Eye", title: "How activists pushed the UK's largest pension megafund to divest from Israel", url: "https://www.middleeasteye.net/news/how-activists-pushed-uk-largest-pension-megafund-divest-israel" },
        { date: "2025", publisher: "Pensions & Investments", title: "European pension funds have pulled investments from Israel", url: "https://www.pionline.com/rules-regulations/esg/pi-european-pension-funds-divestment-israel-ceasefire/" }
      ],
      alternatives: [],
      updated: "2025"
    },

    /* ═══ קמעונאות ומזון ═══ */

    {
      id: "as-coop",
      name: "Co-op",
      aliases: ["The Co-operative Group", "קו-אופ בריטניה"],
      type: "company",
      location: { country: "בריטניה", region: "eu", city: "מנצ׳סטר" },
      scope: "local",
      severity: 3,
      status: "verified",
      summary: "באסיפה הכללית של הרשת במאי 2025 הצביעו 73% מהחברים בעד הסרת מוצרים ישראליים מהמדפים. הדירקטוריון אישר בהמשך שהרשת תפסיק לרכוש מוצרים ושירותים מישראל. הרשימה שגובשה כוללת כ־100 מוצרים ישראליים, בהם גזר ומנגו, שיוסרו בהדרגה.",
      tags: ["חרם", "קמעונאות", "מזון"],
      brands: ["Co-op", "Co-op Irresistible", "Co-op GRO", "Honest Value"],
      sources: [
        { date: "2025-05-19", publisher: "Middle East Monitor", title: "73% of Co-op members vote to boycott Israeli goods in landmark motion", url: "https://www.middleeastmonitor.com/20250519-73-of-co-op-members-vote-to-boycott-israeli-goods-in-landmark-motion/" },
        { date: "2025-05", publisher: "Globes", title: "UK Co-Op supermarket chain to boycott Israeli goods", url: "https://en.globes.co.il/en/article-uk-coop-supermarket-chain-to-boycott-israeli-goods-1001513816" },
        { date: "2025-06", publisher: "Middle East Eye", title: "Co-op supermarket chain to stop sourcing goods from Israel, Iran and 15 other countries", url: "https://www.middleeasteye.net/news/co-op-supermarket-chain-stop-sourcing-goods-israel-and-16-other-countries" },
        { date: "2025-05", publisher: "Arab News", title: "Members of major UK supermarket chain vote to boycott Israeli goods", url: "https://www.arabnews.com/node/2601119/world" }
      ],
      alternatives: [
        { name: "Tesco · Sainsbury's · Marks & Spencer", note: "רשתות בריטיות שלא אימצו מדיניות דומה" },
        { name: "Ocado", note: "קמעונאות מקוונת, ללא החלטת חרם" }
      ],
      updated: "2025-06"
    },
    {
      id: "as-sgroup",
      name: "S-ryhmä",
      aliases: ["S Group", "SOK", "קבוצת S הפינית"],
      type: "company",
      location: { country: "פינלנד", region: "eu", city: "הלסינקי" },
      scope: "local",
      severity: 3,
      status: "verified",
      summary: "קבוצת הקמעונאות הגדולה בפינלנד הודיעה על הפסקה זמנית של רכישת מוצרים שמקורם בישראל. ההחלטה אושרה בספטמבר 2025 בידי דירקטוריון הקבוצה ואוששה בהמשך על ידי נציגות הצרכנים של אזור הלסינקי.",
      tags: ["חרם", "קמעונאות", "מזון"],
      brands: ["S-ryhmä", "Rainbow", "Kotimaista", "X-tra", "Prisma", "S-market", "Alepa"],
      sources: [
        { date: "2025-09", publisher: "Ynetnews", title: "Major Finnish food chain announces boycott of Israeli products", url: "https://www.ynetnews.com/business/article/hy678v6l11e" }
      ],
      alternatives: [
        { name: "K-Group (K-Market, K-Citymarket)", note: "רשת הקמעונאות הפינית המתחרה, ללא החלטת חרם" },
        { name: "Lidl Suomi", note: "פעילה בפינלנד, ללא מדיניות דומה" }
      ],
      updated: "2025-09"
    },
    {
      id: "as-benjerry",
      name: "בן אנד ג׳ריס",
      aliases: ["Ben & Jerry's", "יוניליוור", "Unilever", "בן כהן", "ג׳רי גרינפילד", "Ben Cohen", "Jerry Greenfield"],
      type: "brand",
      parent: "Unilever",
      actor: "entity",
      location: { country: "ארצות הברית", region: "na", city: "ורמונט" },
      scope: "global",
      severity: 2,
      status: "retracted",
      summary: "ביולי 2021 הודיעה בן אנד ג׳ריס שמכירת מוצריה בגדה המערבית ובמזרח ירושלים ״אינה עולה בקנה אחד עם ערכינו״. יוניליוור, החברה האם, ביטלה את ההחלטה ביוני 2022 ומכרה את הפעילות הישראלית לזכיין המקומי אבי זינגר. בדצמבר 2022 הושג הסדר משפטי שהעניק לבן אנד ג׳ריס ישראל עצמאות למכור בישראל ובגדה ללא הגבלת זמן. המאבק בין המותג לבעליו נמשך: ב-17 בספטמבר 2025 התפטר ג׳רי גרינפילד, ממייסדי המותג, לאחר 47 שנה, בטענה שהמותג ״הושתק״; במאי 2025 הוצא בן כהן, המייסד השני, משימוע בסנאט לאחר שצעק על פצצות בעזה; והמותג טען בבית משפט שיוניליוור פיטרה את מנכ״לו דיוויד סטיוור בין היתר בשל עמדותיו על עזה. **אלה עמדות של המייסדים כאנשים פרטיים — לא מדיניות של החברה, ואין חרם פעיל על מכירה בישראל.**",
      correction: "החלטת החרם משנת 2021 בוטלה בידי חברת האם ביוני 2022, והפעילות בישראל עברה לבעלות ישראלית עצמאית. אין חרם פעיל על מכירה בישראל. עם זאת המאבק בין המותג לבעליו נמשך — ראו רשומות נפרדות על ג׳רי גרינפילד ובן כהן.",
      tags: ["חרם", "מזון", "תיקון"],
      sources: [
        { date: "2021-07-20", publisher: "BBC News", title: "Israel PM warns Ben & Jerry's owner Unilever of consequences over sales ban", url: "https://www.bbc.com/news/world-middle-east-57902243", quote: "inconsistent with our values" },
        { date: "2021-07", publisher: "NBC News", title: "Ben & Jerry's withdraws sales from Israeli settlements but clashes with parent company Unilever", url: "https://www.nbcnews.com/business/business-news/ben-jerry-s-withdraws-sales-israeli-settlements-clashes-parent-company-n1274403" },
        { date: "2022-08", publisher: "BBC News", title: "Ben & Jerry's fails to stop sales in Israeli settlements", url: "https://www.bbc.com/news/world-middle-east-62643392" },
        { date: "2022-12", publisher: "The Times of Israel", title: "Ben & Jerry's Israel, parent company Unilever reach deal to end settlement boycott", url: "https://www.timesofisrael.com/ben-jerrys-israel-parent-company-unilever-reach-deal-to-end-settlement-boycott/" },
        { date: "2025-09-17", publisher: "CNBC", title: "Ben & Jerry's co-founder Jerry Greenfield quits in independence row with Unilever", url: "https://www.cnbc.com/2025/09/17/ben-jerrys-jerry-greenfield-quits-in-independence-row-with-unilever.html", quote: "It's with a broken heart that I've decided I can no longer, in good conscience, and after 47 years, remain an employee of Ben & Jerry's." },
        { date: "2025-09-17", publisher: "Jewish Telegraphic Agency", title: "Jerry leaves Ben & Jerry's as company battles owner on Israel speech", url: "https://www.jta.org/2025/09/17/united-states/jerry-leaves-ben-jerrys-progressive-jewish-ice-cream-giant-as-company-battles-owner-on-israel-speech" }
      ],
      alternatives: [],
      updated: "2022-12"
    },

    /* ═══ מותגים שההנהלה או המייסדים שלהם התבטאו ═══
       כאן בדיוק נחוצה ההבחנה של ציר האחריות: אלה אינם חרמות של החברה
       אלא דברי אדם. סימון actor: "leadership" אומר לצרכן במפורש שהמוצר
       עצמו אינו נושא בעמדה הזו. */

    {
      id: "as-lush",
      name: "Lush",
      aliases: ["לאש", "Lush Cosmetics"],
      type: "brand",
      actor: "entity",
      location: { country: "בריטניה", region: "eu", city: "פול, דורסט" },
      scope: "global",
      severity: 2,
      status: "verified",
      summary: "ב-3 בספטמבר 2025 סגרה החברה את כל חנויותיה, מפעליה והאתר שלה בבריטניה ליום שלם, ולמחרת גם את החנויות באירלנד, כמחאה על המצב בעזה. בחלונות הראווה הוצב השלט ״Stop starving Gaza — we are closed in solidarity״. בהודעה רשמית באתרה כתבה החברה שהיא שותפה ל״ייסורים שמיליוני אנשים חשים למראה תמונות של רעב בעזה״, ושמטרת המהלך היא ללחוץ על ממשלת בריטניה להפסיק מכירות נשק לישראל. זו החלטה של החברה עצמה — לא התבטאות של מנהל.",
      tags: ["עמדה מדינית", "קוסמטיקה", "קמעונאות", "מחאה"],
      brands: ["Lush", "לאש"],
      sources: [
        { date: "2025-09", publisher: "Lush", title: "Standing in Solidarity with Gaza — הודעת החברה (מקור ראשוני)", url: "https://weare.lush.com/lush-life/company-statements/standing-in-solidarity-with-gaza/" },
        { date: "2025-09-04", publisher: "Al Jazeera", title: "UK cosmetics chain closes all shops in Gaza protest", url: "https://www.aljazeera.com/amp/video/newsfeed/2025/9/4/uk-cosmetics-chain-closes-all-shops-in-gaza-protest" },
        { date: "2025-09-04", publisher: "Cosmetics Design Europe", title: "Why Lush shut its stores to stand in solidarity with Gaza", url: "https://www.cosmeticsdesign-europe.com/Article/2025/09/04/why-lush-shut-its-stores-to-stand-in-solidarity-with-gaza/" },
        { date: "2025-09-03", publisher: "Al Arabiya", title: "Retail giant Lush shuts all stores, website to protest Israeli war", url: "https://english.alarabiya.net/News/middle-east/2025/09/03/-stop-starving-gaza-retail-giant-lush-shuts-all-stores-website-to-protest-israeli-war" }
      ],
      alternatives: [],
      updated: "2025-09-04"
    },
    {
      id: "as-puma",
      name: "PUMA",
      aliases: ["פומה"],
      type: "brand",
      actor: "entity",
      location: { country: "גרמניה", region: "eu", city: "הרצוגנאוראך" },
      scope: "global",
      severity: 2,
      status: "disputed",
      summary: "פומה סיימה את חוזה החסות שלה עם התאחדות הכדורגל הישראלית, לאחר שנים של קמפיין ״Boycott PUMA״ מטעם תנועת ה-BDS. התנועה הכריזה על כך כניצחון בנובמבר 2024. פומה מצדה טענה שמדובר בשינוי מתוכנן בתיק החסויות שלה ולא בהחלטה פוליטית. שתי הגרסאות עומדות זו מול זו, ולכן הרשומה מסומנת שנויה במחלוקת.",
      tags: ["ספורט", "חסות", "מחלוקת"],
      brands: ["PUMA", "פומה"],
      sources: [
        { date: "2024-11", publisher: "BDS Movement", title: "קמפיין Boycott PUMA — הכרזת הסיום (מקור ראשוני מטעם הקמפיין)", url: "https://bdsmovement.net/economic-boycott" },
        { date: "2026", publisher: "Ethical Consumer", title: "Palestine boycott list", url: "https://www.ethicalconsumer.org/ethical-campaigns-boycotts/palestine-boycott-list" }
      ],
      alternatives: [],
      updated: "2024-11"
    },
    {
      id: "as-websummit",
      name: "Web Summit",
      aliases: ["ווב סאמיט"],
      type: "company",
      actor: "leadership",
      location: { country: "אירלנד", region: "eu", city: "דבלין" },
      scope: "global",
      severity: 2,
      status: "retracted",
      summary: "מנכ״ל הכנס ומייסדו פאדי קוסגרייב פרסם באוקטובר 2023 פוסט שכינה את תגובת ישראל למתקפת 7 באוקטובר ״פשעי מלחמה״, והשווה את המצב ל״צרות״ בצפון אירלנד. חברות טכנולוגיה גדולות משכו את חסותן והכנס איבד דוברים. קוסגרייב התפטר ב-21 באוקטובר 2023 — כלומר החברה נקטה פעולה כדי להתנתק מהעמדה.",
      correction: "המנכ״ל שהתבטא התפטר תוך ימים, והכנס עצמו לא אימץ את עמדתו. הרשומה נשמרת לתיעוד — אין כאן מדיניות של החברה.",
      tags: ["עמדה מדינית", "טכנולוגיה", "הנהלה", "תיקון"],
      sources: [
        { date: "2023-10-22", publisher: "Al Jazeera", title: "Web Summit CEO Paddy Cosgrave resigns over Israel 'war crimes' post", url: "https://www.aljazeera.com/amp/news/2023/10/22/web-summit-ceo-paddy-cosgrave-resigns-over-israel-war-crimes-post" },
        { date: "2023-10-23", publisher: "Euronews", title: "Tech sector boycotts Web Summit conference over CEO's controversial comments on Israel", url: "https://www.euronews.com/next/2023/10/23/tech-sector-boycotts-web-summit-conference-over-ceos-controversial-comments-on-israel" }
      ],
      alternatives: [],
      updated: "2023-10-22"
    },
    {
      id: "as-vercel",
      name: "Vercel",
      aliases: ["ורסל", "Guillermo Rauch", "גיירמו ראוך"],
      type: "company",
      actor: "leadership",
      location: { country: "ארצות הברית", region: "na", city: "סן פרנסיסקו" },
      scope: "global",
      severity: 2,
      status: "verified",
      summary: "מייסד החברה ומנכ״לה גיירמו ראוך מתח ביקורת פומבית על מלחמת ישראל בעזה וקרא לאחרים להצטרף: ״אם התאפקתם, זה הזמן לדבר ולקרוא בשמם של כל מי שתומך או חוגג רצח עם״. זו עמדה של המנכ״ל; החברה עצמה לא הכריזה על מדיניות בנושא.",
      tags: ["עמדה מדינית", "טכנולוגיה", "הנהלה"],
      brands: ["Vercel", "Next.js"],
      sources: [
        { date: "2025", publisher: "The New Arab", title: "Vercel faces boycott after founder poses with Netanyahu", url: "https://www.newarab.com/news/vercel-faces-boycott-after-founder-poses-netanyahu", quote: "If you've been holding back, now is the time to speak out and call out anyone supporting or celebrating genocide." }
      ],
      alternatives: [],
      updated: "2025"
    },

    /* ═══ איגודים מקצועיים ═══ */

    {
      id: "as-lo-norway",
      name: "LO — הסתדרות העובדים של נורווגיה",
      aliases: ["Landsorganisasjonen i Norge", "Norwegian Confederation of Trade Unions"],
      type: "org",
      location: { country: "נורווגיה", region: "eu", city: "אוסלו" },
      scope: "local",
      severity: 3,
      status: "verified",
      summary: "בוועידה הארצית שנערכה באוסלו ב־8–9 במאי 2025 אישרה הפדרציה המקצועית הגדולה בנורווגיה חרם כולל על ישראל, כולל איסור סחר והשקעות עם חברות ישראליות. ההחלטה עברה ברוב של 88% — 240 קולות בעד מול 69 נגד.",
      tags: ["חרם", "איגוד מקצועי", "סחר"],
      sources: [
        { date: "2025-05", publisher: "WAFA", title: "Norway's largest trade union votes for comprehensive boycott of Israel", url: "https://english.wafa.ps/Pages/Details/157184" },
        { date: "2025-05", publisher: "Palestine Chronicle", title: "Norway's Largest Trade Union Votes for Boycott of Israel", url: "https://www.palestinechronicle.com/overwhelming-majority-norways-largest-trade-union-votes-for-boycott-of-israel/" }
      ],
      alternatives: [],
      updated: "2025-05"
    },
    {
      id: "as-unite",
      name: "Unite the Union",
      aliases: ["יוניט", "איגוד יוניט הבריטי"],
      type: "org",
      location: { country: "בריטניה", region: "eu", city: "לונדון" },
      scope: "local",
      severity: 3,
      status: "verified",
      summary: "אחד האיגודים הגדולים בבריטניה הצביע ביולי 2025 בעד גיבוי לחברי איגוד שיסרבו לייצר, לטפל או להוביל נשק המיועד לישראל, ובעד אמברגו נשק מלא.",
      tags: ["חרם", "איגוד מקצועי", "אמברגו נשק"],
      sources: [
        { date: "2025-07-14", publisher: "Novara Media", title: "Unite Votes for Israel Arms Embargo", url: "https://novaramedia.com/2025/07/14/unite-votes-for-israel-arms-embargo/" }
      ],
      alternatives: [],
      updated: "2025-07-14"
    },
    {
      id: "as-uaw",
      name: "UAW — איגוד עובדי הרכב האמריקאי",
      aliases: ["United Auto Workers"],
      type: "org",
      location: { country: "ארצות הברית", region: "na", city: "דטרויט" },
      scope: "local",
      severity: 3,
      status: "verified",
      summary: "ב-18 ביוני 2026, בוועידה החוקתית של האיגוד, הצביעו הצירים בעד משיכת כספי האיגוד מאג״ח מדינת ישראל — כ-400,000 דולר לפחות. זהו איגוד העובדים הארצי הגדול הראשון בארצות הברית שמצביע על משיכת השקעות מישראל. קודם לכן אימץ האיגוד את קמפיין החרם.",
      tags: ["חרם", "איגוד מקצועי", "משיכת השקעות"],
      sources: [
        { date: "2026-06-18", publisher: "The Detroit News", title: "UAW votes to divest from Israel Bonds", url: "https://www.detroitnews.com/story/business/autos/2026/06/18/uaw-israel-bond-divest-gaza-uawd-constitutional-convention/90610929007/" },
        { date: "2026-06", publisher: "Jewish Insider", title: "Auto union votes to divest from Israel at annual convention", url: "https://jewishinsider.com/2026/06/auto-union-votes-to-divest-from-israel-at-annual-convention/" },
        { date: "2026-07", publisher: "Mondoweiss", title: "UAW becomes the first major U.S. union to vote to divest from Israel Bonds", url: "https://mondoweiss.net/2026/07/uaw-becomes-the-first-major-u-s-union-to-vote-to-divest-from-israel-bonds/" },
        { date: "2025", publisher: "Business & Human Rights Resource Centre", title: "UAW becomes first major U.S. labor union to endorse boycott campaign against Israel", url: "https://www.business-humanrights.org/en/latest-news/uaw-becomes-first-major-us-labor-union-to-endorse-boycott-campaign-against-israel/" }
      ],
      alternatives: [],
      updated: "2026-06-18"
    },
    {
      id: "as-iupat",
      name: "IUPAT — איגוד הצבעים ובעלי המלאכה",
      aliases: ["International Union of Painters and Allied Trades", "Jimmy Williams Jr."],
      type: "org",
      actor: "entity",
      location: { country: "ארצות הברית", region: "na", city: "" },
      scope: "local",
      severity: 3,
      status: "verified",
      summary: "נשיא האיגוד ג׳ימי ויליאמס ג׳וניור הודיע שהאיגוד מנחה את קרן הפנסיה הבינלאומית שלו למשוך השקעות הקשורות למלחמה בעזה.",
      tags: ["חרם", "איגוד מקצועי", "משיכת השקעות"],
      sources: [
        { date: "2024-08-30", publisher: "Democracy Now!", title: "Painters' Union to Divest Pension Fund from Israeli Firms to Protest Gaza Genocide", url: "https://www.democracynow.org/2024/8/30/headlines/painters_union_to_divest_pension_fund_from_israeli_firms_to_protest_gaza_genocide" },
        { date: "2026", publisher: "American Friends Service Committee", title: "Divesting for Palestinian Rights — מעקב", url: "https://afsc.org/divest" }
      ],
      alternatives: [],
      updated: "2026"
    },
    {
      id: "as-presbyterian",
      name: "הכנסייה הפרסביטריאנית בארצות הברית",
      aliases: ["Presbyterian Church (USA)", "PCUSA"],
      type: "org",
      actor: "entity",
      location: { country: "ארצות הברית", region: "na", city: "לואיוויל, קנטקי" },
      scope: "local",
      severity: 2,
      status: "verified",
      summary: "האספה הכללית של הכנסייה הצביעה פה אחד ב-28 ביוני 2026 על משיכת השקעות מ-Palantir ומ-GE Aerospace, לאחר שנתיים של מגעים כבעלת מניות. מועצת הפנסיה והקרן של הכנסייה יממשו את האחזקות. ההחלטה ממוקדת בשתי חברות ואינה חרם כולל על ישראל.",
      tags: ["משיכת השקעות", "כנסייה", "פיננסים"],
      sources: [
        { date: "2026-06-28", publisher: "BDS Movement", title: "The power of BDS: Our impact so far in 2026", url: "https://bdsmovement.net/news/The-Power-Of-BDS-Our-Impact-So-Far-In-2026" },
        { date: "2026", publisher: "American Friends Service Committee", title: "Divesting for Palestinian Rights", url: "https://afsc.org/divest" }
      ],
      alternatives: [],
      updated: "2026-06-28"
    },
    {
      id: "as-washington",
      name: "מדינת וושינגטון — משרד הגזבר",
      aliases: ["Washington State Treasurer", "Office of the State Treasurer"],
      type: "place",
      actor: "entity",
      location: { country: "ארצות הברית", region: "na", city: "אולימפיה, וושינגטון" },
      scope: "local",
      severity: 2,
      status: "verified",
      summary: "בפברואר 2026 הפכה וושינגטון למדינה הראשונה בארצות הברית שמושכת כספים ממשלתיים משלה בהקשר הישראלי, כשמשרד הגזבר מכר את אחזקותיו באג״ח קטרפילר. מקורות שונים נוקבים בהיקף של 53 עד 62 מיליון דולר. המהלך ממוקד בחברה אחת ואינו חרם על ישראל.",
      tags: ["משיכת השקעות", "פיננסים", "ממשל"],
      sources: [
        { date: "2026-02", publisher: "BDS Movement", title: "The power of BDS: Our impact so far in 2026", url: "https://bdsmovement.net/news/The-Power-Of-BDS-Our-Impact-So-Far-In-2026" },
        { date: "2026", publisher: "USCPR", title: "US BDS Victories", url: "https://uscpr.org/activist-resource/boycott-divestment-and-sanctions/bdswins/" }
      ],
      alternatives: [],
      updated: "2026-02"
    },
    {
      id: "as-scotiabank",
      name: "Scotiabank",
      aliases: ["Bank of Nova Scotia", "סקוטיהבנק"],
      type: "company",
      actor: "entity",
      location: { country: "קנדה", region: "na", city: "טורונטו" },
      scope: "global",
      severity: 2,
      status: "verified",
      summary: "הבנק מימש את אחזקותיו בחברת אלביט מערכות הישראלית, לאחר לחץ מתמשך שכלל חרם של סופרים על אירועים בחסותו.",
      tags: ["משיכת השקעות", "פיננסים", "בנקאות"],
      sources: [
        { date: "2026", publisher: "BDS Movement", title: "The power of BDS: Our impact so far in 2026", url: "https://bdsmovement.net/news/The-Power-Of-BDS-Our-Impact-So-Far-In-2026" },
        { date: "2026", publisher: "American Friends Service Committee", title: "Divesting for Palestinian Rights", url: "https://afsc.org/divest" }
      ],
      alternatives: [],
      updated: "2026"
    },
    {
      id: "as-tuc",
      name: "TUC — קונגרס האיגודים המקצועיים",
      aliases: ["Trades Union Congress"],
      type: "org",
      location: { country: "בריטניה", region: "eu", city: "לונדון" },
      scope: "local",
      severity: 3,
      status: "verified",
      summary: "גוף הגג של האיגודים המקצועיים בבריטניה הצביע בעד הרחבת החרם על ישראל.",
      tags: ["חרם", "איגוד מקצועי"],
      sources: [
        { date: "2025", publisher: "The Jewish Chronicle", title: "TUC vote to extend Israel boycott", url: "https://www.thejc.com/news/tuc-vote-to-extend-israel-boycott-hqlf1qkx" }
      ],
      alternatives: [],
      updated: "2025"
    },
    {
      id: "as-psc-cuny",
      name: "PSC-CUNY",
      aliases: ["Professional Staff Congress", "איגוד הסגל של CUNY"],
      type: "org",
      location: { country: "ארצות הברית", region: "na", city: "ניו יורק" },
      scope: "local",
      severity: 3,
      status: "retracted",
      summary: "איגוד הסגל של אוניברסיטת העיר ניו יורק אישר ברוב של 73 מול 70 החלטה למשוך השקעות מחברות ואג״ח ישראליות, ולהמליץ לקרן הפנסיה של המורים למשוך 100 מיליון דולר. ההחלטה בוטלה רשמית בהמשך בעקבות טענות לאי־סדרים בהצבעה.",
      correction: "האיגוד ביטל את ההחלטה בעקבות חשד לאי־סדרים בהצבעה. הרשומה נשמרת לתיעוד — אין מדובר במדיניות בתוקף.",
      tags: ["חרם", "אקדמיה", "תיקון"],
      sources: [
        { date: "2025", publisher: "Left Voice", title: "City University of New York Union Votes to Divest from Israel", url: "https://www.leftvoice.org/city-university-of-new-york-union-votes-to-divest-from-israel/" },
        { date: "2025", publisher: "Israel National News", title: "CUNY union drops Israel boycott plan following controversial vote", url: "https://www.israelnationalnews.com/news/404524" }
      ],
      alternatives: [],
      updated: "2025"
    },

    /* ═══ אקדמיה ═══ */

    {
      id: "as-aaa",
      name: "האגודה האנתרופולוגית האמריקאית",
      aliases: ["American Anthropological Association", "AAA"],
      type: "academic",
      location: { country: "ארצות הברית", region: "na", city: "ארלינגטון" },
      scope: "global",
      severity: 3,
      status: "verified",
      summary: "במשאל חברים שנערך בין 15 ביוני ל־14 ביולי 2023 אישרו חברי האגודה חרם אקדמי על מוסדות אקדמיים ישראליים: 2,016 בעד (71%) מול 835 נגד (29%), בהשתתפות 37% מבעלי זכות ההצבעה. ההחלטה חלה על מוסדות בלבד ולא על חוקרים או סטודנטים בודדים. ההודעה הרשמית פורסמה ב־24 ביולי 2023, והחרם בתוקף מאז.",
      tags: ["חרם אקדמי", "אקדמיה"],
      sources: [
        { date: "2023-07-24", publisher: "American Anthropological Association", title: "AAA Membership Endorses Academic Boycott Resolution (מקור ראשוני)", url: "https://americananthro.org/news/aaa-membership-endorses-academic-boycott-resolution/", quote: "2,016 members (71% of the votes) supporting the resolution and 835 members (29%) opposing it" }
      ],
      alternatives: [],
      updated: "2023-07-24"
    },
    {
      id: "as-maut",
      name: "MAUT — ארגון המרצים של מקגיל",
      aliases: ["McGill Association of University Teachers"],
      type: "academic",
      location: { country: "קנדה", region: "na", city: "מונטריאול" },
      scope: "local",
      severity: 3,
      status: "verified",
      summary: "ב־10 באוקטובר 2025 אימץ ארגון המרצים והספרנים של אוניברסיטת מקגיל את החרם האקדמי והתרבותי על ישראל, ברוב של 104 מול 8 ושתי נמנעות.",
      tags: ["חרם אקדמי", "אקדמיה"],
      sources: [
        { date: "2025-10", publisher: "CBC News", title: "Inside McGill faculty's vote to boycott Israel's universities", url: "https://www.cbc.ca/news/canada/montreal/mcgill-faculty-academic-boycott-of-israel-9.6950240" },
        { date: "2025-10", publisher: "אוניברסיטת מקגיל — פרוטוקול הסנאט", title: "Question and response regarding the MAUT resolution endorsing a boycott of Israeli institutions (מקור ראשוני)", url: "https://www.mcgill.ca/senate/files/senate/d25-17_question_and_response_regarding_the_maut_resolution_endorsing_a_boycott_of_israeli_institutions.pdf" }
      ],
      alternatives: [],
      updated: "2025-10-10"
    },
    {
      id: "as-asa",
      name: "האגודה ללימודי אמריקה",
      aliases: ["American Studies Association", "ASA"],
      type: "academic",
      location: { country: "ארצות הברית", region: "na", city: "וושינגטון" },
      scope: "global",
      severity: 3,
      status: "verified",
      summary: "האגודה אימצה החלטה לחרם על מוסדות אקדמיים ישראליים — ההחלטה הראשונה מסוגה של אגודה אקדמית אמריקאית מרכזית, והיא בתוקף מאז. איגוד המרצים האמריקאי (AAUP) פרסם התנגדות רשמית להחלטה בטענה שהיא פוגעת בחופש אקדמי.",
      tags: ["חרם אקדמי", "אקדמיה"],
      sources: [
        { date: "2013-12", publisher: "American Studies Association", title: "Council Statement on the Resolution (מקור ראשוני)", url: "https://www.theasa.net/about/advocacy/resolutions-actions/resolutions/boycott-israeli-academic-institutions/council" },
        { date: "2013-12", publisher: "AAUP", title: "AAUP Statement on ASA Vote to Endorse Academic Boycott of Israel", url: "https://www.aaup.org/sites/default/files/AAUPStatementASAVote_0.pdf" }
      ],
      alternatives: [],
      updated: "2013-12"
    },

    {
      id: "as-asa-socio",
      name: "האגודה הסוציולוגית האמריקאית",
      aliases: ["American Sociological Association", "ASA sociology"],
      type: "academic",
      actor: "entity",
      location: { country: "ארצות הברית", region: "na", city: "וושינגטון" },
      scope: "global",
      severity: 2,
      status: "disputed",
      summary: "הצעת החלטה לחרם על מוסדות אקדמיים ישראליים לשנת 2026 נחתמה בידי 428 מחברי האגודה — הרבה מעל סף 3% הנדרש בתקנון. הנשיאה שלי קורל והמנכ״לית הת׳ר וושינגטון חסמו את העלאתה להצבעת חברים. המועצה האקדמית של Jewish Voice for Peace קראה בתגובה להחרים את הכנס השנתי של האגודה. כלומר: **האגודה עצמה לא אימצה חרם** — ההנהגה דווקא מנעה את ההצבעה.",
      tags: ["חרם אקדמי", "אקדמיה", "מחלוקת"],
      sources: [
        { date: "2026-06-01", publisher: "Jewish Voice for Peace", title: "JVP Academic Council endorses the call to boycott the annual meeting of the ASA", url: "https://www.jewishvoiceforpeace.org/2026/06/01/jvp-academic-council-endorses-boycott-annual-meeting-asa/" },
        { date: "2026-04-13", publisher: "Scatterplot", title: "ASA should not vote on the boycott proposal", url: "https://scatter.wordpress.com/2026/04/13/asa-should-not-vote-on-the-boycott-proposal/" }
      ],
      alternatives: [],
      updated: "2026-06"
    },
    {
      id: "as-leipzig",
      name: "אוניברסיטת לייפציג — אגודת הסטודנטים",
      aliases: ["University of Leipzig", "Universität Leipzig"],
      type: "academic",
      actor: "entity",
      location: { country: "גרמניה", region: "eu", city: "לייפציג" },
      scope: "local",
      severity: 3,
      status: "verified",
      summary: "ב-19 במאי 2026 הצביעו כ-700 סטודנטים כמעט פה אחד בדרישה שהאוניברסיטה תנתק את כל קשריה עם מוסדות אקדמיים ישראליים. זו הפעם הראשונה שהצבעה כזו עוברת בגרמניה.",
      tags: ["חרם אקדמי", "קמפוס", "אגודת סטודנטים"],
      sources: [
        { date: "2026-05-19", publisher: "Middle East Eye", title: "In German first, Leipzig students vote for academic boycott of Israel", url: "https://www.middleeasteye.net/news/german-first-leipzig-students-vote-academic-boycott-israel" }
      ],
      alternatives: [],
      updated: "2026-05-19"
    },
    {
      id: "as-uct",
      name: "אוניברסיטת קייפטאון — הסנאט",
      aliases: ["University of Cape Town", "UCT Senate"],
      type: "academic",
      actor: "entity",
      location: { country: "דרום אפריקה", region: "africa", city: "קייפטאון" },
      scope: "local",
      severity: 3,
      status: "verified",
      summary: "הסנאט של האוניברסיטה אישר שתי החלטות בתמיכה בפלסטינים, המהוות צעדים לקראת חרם אקדמי מלא על ישראל.",
      tags: ["חרם אקדמי", "אקדמיה"],
      sources: [
        { date: "2026", publisher: "Varsity Newspaper (UCT)", title: "UCT Senate votes for Palestine", url: "https://varsitynewspaper.substack.com/p/uct-senate-votes-for-palestine" }
      ],
      alternatives: [],
      updated: "2026"
    },
    {
      id: "as-mcgill-lsa",
      name: "אגודת הסטודנטים למשפטים במקגיל",
      aliases: ["McGill Law Students' Association", "LSA McGill"],
      type: "academic",
      actor: "entity",
      location: { country: "קנדה", region: "na", city: "מונטריאול" },
      scope: "local",
      severity: 3,
      status: "verified",
      summary: "ביולי 2026 עבר משאל לחרם על מוסדות אקדמיים ישראליים באחוזי ההשתתפות הגבוהים ביותר בהיסטוריה האחרונה של האגודה. זו החלטה שנייה במקגיל, לאחר החלטת ארגון המרצים MAUT מאוקטובר 2025.",
      tags: ["חרם אקדמי", "קמפוס", "אגודת סטודנטים"],
      sources: [
        { date: "2026-07-04", publisher: "The Tribune (McGill)", title: "Referendum to boycott Israeli institutions passes with the highest voting turnout in recent LSA history", url: "https://www.thetribune.ca/news/referendum-to-boycott-israeli-institutions-passes-with-the-highest-voting-turnout-in-recent-lsa-history-07042026/" }
      ],
      alternatives: [],
      updated: "2026-07-04"
    },

    /* ═══ ממצאים רשמיים על כשל בהגנה על סטודנטים יהודים ═══ */

    {
      id: "as-columbia",
      name: "אוניברסיטת קולומביה",
      aliases: ["Columbia University"],
      type: "academic",
      location: { country: "ארצות הברית", region: "na", city: "ניו יורק" },
      scope: "local",
      severity: 4,
      status: "verified",
      summary: "ב־22 במאי 2025 קבע משרד זכויות האזרח של משרד הבריאות האמריקאי (OCR) שקולומביה הפרה את סעיף VI לחוק זכויות האזרח, בכך שנהגה ב״אדישות מכוונת״ להטרדת סטודנטים יהודים בידי סטודנטים אחרים — מ־7 באוקטובר 2023 ועד מועד הממצא. הממצא הוא של הרשות הפדרלית ומתייחס לכשל של המוסד בהגנה על סטודנטים, לא לעמדה מוצהרת של האוניברסיטה.",
      tags: ["אקדמיה", "קמפוס", "ממצא רשמי"],
      sources: [
        { date: "2025-05-22", publisher: "U.S. Department of Health and Human Services", title: "HHS' Civil Rights Office Finds Columbia University in Violation of Federal Civil Rights Law (מקור ראשוני)", url: "https://www.hhs.gov/press-room/ocr-columbia-violates-federal-civil-rights-law.html", quote: "Columbia University violated Title VI of the Civil Rights Act of 1964 by acting with deliberate indifference towards student-on-student harassment of Jewish students from October 7, 2023, through the present." },
        { date: "2025-03-10", publisher: "CNN", title: "Department of Education investigating 60 colleges and universities over antisemitism claims", url: "https://www.cnn.com/2025/03/10/us/department-of-education-warning-universities-title-vi-antisemitism" }
      ],
      alternatives: [],
      updated: "2025-05-22"
    },
    {
      id: "as-harvard",
      name: "אוניברסיטת הרווארד",
      aliases: ["Harvard University"],
      type: "academic",
      location: { country: "ארצות הברית", region: "na", city: "קיימברידג׳, מסצ׳וסטס" },
      scope: "local",
      severity: 4,
      status: "verified",
      summary: "ב־30 ביוני 2025 קבע משרד זכויות האזרח הפדרלי שהרווארד נהגה — ועודנה נוהגת — ב״אדישות מכוונת״ להטרדה חמורה, נרחבת ופוגענית של סטודנטים יהודים וישראלים מצד סטודנטים וסגל של האוניברסיטה עצמה. בשנות התקציב 2023–2025 קיבלה הרווארד למעלה מ־794 מיליון דולר בסיוע פדרלי ממשרד הבריאות.",
      tags: ["אקדמיה", "קמפוס", "ממצא רשמי"],
      sources: [
        { date: "2025-06-30", publisher: "U.S. Department of Health and Human Services", title: "HHS' Civil Rights Office Finds Harvard University in Violation of Federal Civil Rights Law (מקור ראשוני)", url: "https://www.hhs.gov/press-room/hhs-finds-harvard-in-violation.html", quote: "OCR's Notice of Violation finds that Harvard has been – and is – deliberately indifferent to the severe, pervasive, and objectively offensive harassment of Jewish and Israeli students by its own students and faculty." }
      ],
      alternatives: [],
      updated: "2025-06-30"
    },
    {
      id: "as-ocr60",
      name: "60 מוסדות אקדמיים בבדיקה פדרלית",
      aliases: ["Title VI investigations", "בדיקות סעיף VI"],
      type: "academic",
      location: { country: "ארצות הברית", region: "na", city: "" },
      scope: "local",
      severity: 3,
      status: "review",
      summary: "משרד זכויות האזרח של משרד החינוך האמריקאי שלח במרץ 2025 מכתבי אזהרה ל־60 מכללות ואוניברסיטאות שנמצאות בבדיקה בחשד להטרדה ואפליה אנטישמית. המוסדות הוזהרו מפני ״צעדי אכיפה אפשריים״. הבדיקות טרם הושלמו — הרשומה מסומנת כ״בבדיקה״ ולא כממצא.",
      tags: ["אקדמיה", "קמפוס", "בדיקה"],
      sources: [
        { date: "2025-03-10", publisher: "CNN", title: "Department of Education investigating 60 colleges and universities over antisemitism claims", url: "https://www.cnn.com/2025/03/10/us/department-of-education-warning-universities-title-vi-antisemitism" },
        { date: "2025-03-11", publisher: "Inside Higher Ed", title: "Education Dept. warns 60 colleges under investigations", url: "https://www.insidehighered.com/news/quick-takes/2025/03/11/education-dept-warns-60-colleges-under-investigations" }
      ],
      alternatives: [],
      updated: "2025-03-11"
    },

    /* ═══ תרבות ומוזיקה ═══ */

    {
      id: "as-nmfg",
      name: "No Music for Genocide",
      aliases: ["NMFG", "יוזמת חסימת המוזיקה בישראל"],
      type: "entertainment",
      location: { country: "בינלאומי", region: "global", city: "" },
      scope: "global",
      severity: 3,
      status: "verified",
      summary: "יוזמה שהחלה בספטמבר 2025 ואליה הצטרפו למעלה מ־1,000 אמנים ולייבלים, המבקשים מחברות התקליטים והמפיצים שלהם לחסום גאוגרפית את המוזיקה שלהם כך שלא ניתן יהיה להזרים אותה בישראל. בין המשתתפים: לורד, ביורק, מאסיב אטאק, פול וולר, קלייו, Fever Ray, Hot Chip, Idles, King Krule, The Knife, Arca ו־AURORA. באתר היוזמה נכתב שמדובר ב״צעד אחד לקראת בידודה ודה־לגיטימציה של ישראל״.",
      tags: ["חרם תרבותי", "מוזיקה", "סטרימינג"],
      sources: [
        { date: "2025-11-13", publisher: "NPR", title: "Why more than 1,000 musicians are boycotting Israel with 'No Music for Genocide'", url: "https://www.npr.org/2025/11/13/nx-s1-5599908/no-music-for-genocide-israel-boycott" },
        { date: "2025-11", publisher: "The Jewish Chronicle", title: "Björk, Lorde and Paul Weller join 1,000 artists and labels to block Israelis from streaming their music", url: "https://www.thejc.com/news/israel/bjork-lorde-and-paul-weller-join-1-000-artists-and-labels-to-block-israelis-from-streaming-their-music-r2c9gu3a" },
        { date: "2025", publisher: "No Music for Genocide", title: "רשימת המשתתפים והקריאה הרשמית (מקור ראשוני)", url: "https://nomusicforgenocide.org/", quote: "JOIN THE MOVEMENT: Reject apartheid, occupation, and genocide of Palestinians and remove your music from Israel. Over 1000 artists and labels have geo-blocked and removed their music from that territory." }
      ],
      alternatives: [],
      updated: "2025-11-13"
    },
    {
      id: "as-origins",
      name: "פסטיבל Origins",
      aliases: ["Origins Festival London"],
      type: "entertainment",
      location: { country: "בריטניה", region: "eu", city: "לונדון" },
      scope: "local",
      severity: 3,
      status: "verified",
      summary: "פסטיבל מוזיקה אלקטרונית בלונדון ביטל בספטמבר 2025 את הופעתו של הדי-ג׳יי הישראלי רועי פרץ, לאחר ביקורת מצד הקבוצה Ravers for Palestine. המארגנים כתבו באינסטגרם שביטלו את ההופעה לאחר שנודע להם על חששות בנוגע ל״רקע״ של פרץ. הביטול נעשה על בסיס לאום, ולכן מסווג כאפליה ולא כעמדה מדינית.",
      tags: ["חרם תרבותי", "אפליה", "מוזיקה"],
      sources: [
        { date: "2025-09-29", publisher: "הארץ", title: "London Electronic Music Festival Cancels Israeli DJ's Set", url: "https://www.haaretz.com/israel-news/2025-09-29/ty-article/.premium/culture-is-political-london-electronic-music-festival-cancels-israeli-djs-set/00000199-9539-dc12-a5df-9d3b77280000" },
        { date: "2025-09", publisher: "The Jerusalem Post", title: "London music festival cancels Israeli DJ following outcry from Ravers for Palestine group", url: "https://www.jpost.com/diaspora/antisemitism/article-869026" }
      ],
      alternatives: [],
      updated: "2025-09-29"
    },
    {
      id: "as-superstruct",
      name: "חרם פסטיבלי Superstruct",
      aliases: ["Superstruct Entertainment", "Sónar", "Field Day"],
      type: "entertainment",
      location: { country: "בינלאומי", region: "global", city: "" },
      scope: "global",
      severity: 2,
      status: "verified",
      summary: "קמפיין חרם שהופנה נגד פסטיבלים שבבעלות Superstruct Entertainment, שנרכשה ב־2024 בידי קרן ההשקעות KKR, בטענה לקשרי הקרן לישראל. אמנים רבים ביטלו הופעות בפסטיבלים כמו Field Day בבריטניה ו־Sónar בספרד. הרשומה מתעדת את הקמפיין — לא את הפסטיבלים עצמם, שהיו יעד החרם.",
      tags: ["חרם תרבותי", "מוזיקה", "פסטיבלים"],
      sources: [
        { date: "2025", publisher: "Wikipedia", title: "Boycott of Superstruct Entertainment festivals", url: "https://en.wikipedia.org/wiki/Boycott_of_Superstruct_Entertainment_festivals" }
      ],
      alternatives: [],
      updated: "2025"
    },

    /* ═══ ספורט ═══ */

    {
      id: "as-fai",
      name: "FAI — התאחדות הכדורגל של אירלנד",
      aliases: ["Football Association of Ireland"],
      type: "sport",
      location: { country: "אירלנד", region: "eu", city: "דבלין" },
      scope: "local",
      severity: 2,
      status: "verified",
      summary: "באסיפה הכללית ב־8 בנובמבר 2025 הצביעו חברי ההתאחדות ברוב של 74 מול 7 ושתי נמנעות להורות להנהלה להגיש ל־UEFA הצעה להשעיית ישראל מכל התחרויות. ההצעה, שיזמה קבוצת בוהמיאנס מדבלין, נסמכה על שתי טענות: אי־אכיפת מדיניות נגד גזענות, ומשחקי קבוצות ישראליות בשטחים ללא הסכמת ההתאחדות הפלסטינית. UEFA השיב בדצמבר שהנושא ״במעקב צמוד״, וההצעה לא נדונה בקונגרס פברואר 2026. ההתאחדות אישרה שמשחקי ישראל יתקיימו כסדרם.",
      tags: ["ספורט", "כדורגל", "השעיה"],
      sources: [
        { date: "2025-11-08", publisher: "The Irish Times", title: "FAI to bring motion to suspend Israel from all Uefa competitions", url: "https://www.irishtimes.com/sport/soccer/2025/11/08/fai-votes-to-suspend-israel-from-all-uefa-competitions/" },
        { date: "2025-11", publisher: "Football Association of Ireland", title: "FAI Statement (מקור ראשוני)", url: "https://www.fai.ie/latest/fai-statement-3/" },
        { date: "2025-11", publisher: "ESPN", title: "Ireland's governing body to submit motion to UEFA to ban Israel", url: "https://www.espn.com/soccer/story/_/id/46894848/ireland-fai-vote-uefa-ban-israel-soccer-competition" },
        { date: "2026-02-12", publisher: "The Irish Times", title: "FAI confirms Israel fixtures will be fulfilled despite previous motion sent to UEFA", url: "https://www.irishtimes.com/sport/soccer/2026/02/12/fai-confirms-israel-fixtures-will-be-fulfilled-despite-previous-motion-sent-to-uefa/" }
      ],
      alternatives: [],
      updated: "2026-02-12"
    },
    {
      id: "as-amnesty",
      name: "אמנסטי אינטרנשיונל",
      aliases: ["Amnesty International"],
      type: "org",
      location: { country: "בריטניה", region: "eu", city: "לונדון" },
      scope: "global",
      severity: 2,
      status: "verified",
      summary: "הארגון שלח ב־30 בספטמבר 2025 מכתב רשמי ל־FIFA ול־UEFA ובו קריאה להשעות את התאחדות הכדורגל הישראלית — עד שתרחיק מליגות ישראל קבוצות שמושבן בהתנחלויות בשטחים. הדרישה מותנית ומכוונת לקבוצות ההתנחלויות, ואינה קריאה לחרם גורף על ישראל.",
      tags: ["ספורט", "השעיה", "ארגון זכויות אדם"],
      sources: [
        { date: "2025-09-30", publisher: "Amnesty International", title: "Amnesty International calls on FIFA and UEFA to suspend Israeli Football Association (מקור ראשוני)", url: "https://www.amnesty.org/en/latest/news/2025/10/amnesty-fifa-uefa-suspend-israeli-football-association/", quote: "calling on them to suspend the Israeli Football Association (IFA) from their tournaments until it excludes clubs based in illegal settlements in the Occupied Palestinian Territory (OPT) from continuing to play in Israel's football leagues" }
      ],
      alternatives: [],
      updated: "2025-09-30"
    },
    {
      id: "as-uefa-vote",
      name: "הצבעת ההשעיה ב-UEFA",
      aliases: ["UEFA suspension vote"],
      type: "sport",
      location: { country: "שוויץ", region: "eu", city: "ניון" },
      scope: "global",
      severity: 2,
      status: "retracted",
      summary: "בספטמבר 2025 התקדם UEFA לקראת הצבעה על השעיית ההתאחדות הישראלית. ההצעה הוקפאה, ונשיא FIFA ג׳אני אינפנטינו הודיע ב־3 באוקטובר 2025 שלא יינקטו צעדים נגד הנבחרת.",
      correction: "ההצבעה לא התקיימה וההצעה הוקפאה. אין השעיה בתוקף.",
      tags: ["ספורט", "כדורגל", "תיקון"],
      sources: [
        { date: "2025-09", publisher: "The Times of Israel", title: "UEFA heading to a vote next week on booting Israel from European soccer", url: "https://www.timesofisrael.com/uefa-heading-to-a-vote-next-week-on-booting-israel-from-european-soccer/" },
        { date: "2025-09", publisher: "PBS NewsHour", title: "UEFA expected to suspend Israel from European soccer body", url: "https://www.pbs.org/newshour/world/uefa-expected-to-suspend-israel-from-european-soccer-body" }
      ],
      alternatives: [],
      updated: "2025-10-03"
    },

    {
      id: "as-maccabi-ban",
      name: "איסור כניסת אוהדי מכבי תל אביב",
      aliases: ["Maccabi Tel Aviv fan ban", "Birmingham City Council", "West Midlands Police", "Aston Villa"],
      type: "sport",
      location: { country: "בריטניה", region: "eu", city: "ברמינגהם" },
      scope: "local",
      severity: 3,
      status: "verified",
      summary: "באוקטובר 2025 אסרה עיריית ברמינגהם על אוהדי מכבי תל אביב להיכנס למשחק הליגה האירופית מול אסטון וילה שנערך ב-6 בנובמבר. ההחלטה התקבלה בוועדת הבטיחות של העירייה על סמך המלצת משטרת ווסט מידלנדס. ראש ממשלת בריטניה קיר סטארמר כינה אותה ״ההחלטה השגויה״ אך היא לא בוטלה. לאחר המשחק התברר שההמלצה נשענה על מידע כוזב, כולל טענות שנוצרו בכלי בינה מלאכותית. מפקחת המשטרה הבריטית (HMICFRS) קבעה שהמלצת המשטרה הושפעה מהטיית אישוש, ומפקד המשטרה קרייג גילדפורד פרש לאחר שמסר מידע כוזב לפרלמנט.",
      tags: ["אפליה", "ספורט", "כדורגל", "ממצא רשמי"],
      sources: [
        { date: "2025-10-17", publisher: "Al Jazeera", title: "Israeli Maccabi Tel Aviv football fans barred from Europa League game in UK", url: "https://www.aljazeera.com/amp/sports/2025/10/17/israeli-maccabi-tel-aviv-football-fans-barred-from-europa-league-game-in-uk" },
        { date: "2026", publisher: "HMICFRS — מפקחת המשטרה הבריטית", title: "Confirmation bias influenced West Midlands Police's recommendation to ban Maccabi Tel Aviv fans (מקור ראשוני)", url: "https://hmicfrs.justiceinspectorates.gov.uk/news/news-feed/confirmation-bias-influenced-west-midlands-police-recommendation-to-ban-maccabi-tel-aviv-fans/" },
        { date: "2026", publisher: "פרלמנט בריטניה — ועדת הפנים", title: "Maccabi Tel Aviv fan ban — דוח הוועדה (מקור ראשוני)", url: "https://publications.parliament.uk/pa/cm5901/cmselect/cmhaff/1553/report.html" },
        { date: "2026", publisher: "ESPN", title: "MPs probe police decision to ban Maccabi Tel-Aviv fans at Aston Villa", url: "https://www.espn.com/soccer/story/_/id/47266004/mps-probe-police-decision-ban-maccabi-tel-aviv-fans-aston-villa" }
      ],
      alternatives: [],
      updated: "2026"
    },
    {
      id: "as-athletes-uefa",
      name: "מכתב הספורטאים ל-UEFA",
      aliases: ["Athletes for Palestine", "Paul Pogba", "Hakim Ziyech"],
      type: "sport",
      location: { country: "בינלאומי", region: "global", city: "" },
      scope: "global",
      severity: 2,
      status: "verified",
      summary: "בנובמבר 2025 חתמו למעלה מ-70 ספורטאים על מכתב הקורא ל-UEFA להרחיק את ישראל מהתחרויות. בין החותמים הכדורגלנים פול פוגבה וחכים זיאש, שכתבו שאין לקבל בזירות הספורט ״משטר שמבצע רצח עם״.",
      tags: ["ספורט", "כדורגל", "השעיה", "עצומה"],
      sources: [
        { date: "2025-11-12", publisher: "Al Jazeera", title: "More than 70 athletes call on UEFA to ban Israel over rights abuses", url: "https://www.aljazeera.com/news/2025/11/12/dozens-of-athletes-call-on-uefa-to-ban-israel-over-rights-abuses" },
        { date: "2025-11", publisher: "The New Arab", title: "Footballers join campaign pressuring UEFA to exclude Israel", url: "https://www.newarab.com/news/footballers-join-campaign-pressuring-uefa-exclude-israel" }
      ],
      alternatives: [],
      updated: "2025-11-12"
    },

    {
      id: "as-indonesia-visa",
      name: "אינדונזיה — שלילת ויזות מנבחרת ההתעמלות",
      aliases: ["Indonesia gymnastics visa", "World Artistic Gymnastics Championships"],
      type: "sport",
      actor: "entity",
      location: { country: "אינדונזיה", region: "asia", city: "ג׳קרטה" },
      scope: "local",
      severity: 3,
      status: "verified",
      summary: "ממשלת אינדונזיה סירבה להעניק ויזות לנבחרת ההתעמלות האמנותית של ישראל — ספורטאים ואנשי צוות — לאליפות העולם ה-53 שנפתחה ב-19 באוקטובר 2025 בג׳קרטה. ישראל אישרה שלא תשתתף. הוועד האולימפי הבינלאומי גינה את הצעד וקבע שכל ספורטאי כשיר חייב להיות מסוגל להשתתף ״ללא כל צורה של אפליה מצד המדינה המארחת״, בהתאם לאמנה האולימפית. בית משפט דחה בקשה להשבת הספורטאים לתחרות.",
      tags: ["אפליה", "ספורט", "ויזה", "התעמלות"],
      sources: [
        { date: "2025-10", publisher: "הוועד האולימפי הבינלאומי", title: "IOC statement on the rejection of visas for the Israeli delegation (מקור ראשוני)", url: "https://www.olympics.com/ioc/news/ioc-statement-on-the-rejection-of-visas-for-the-israeli-delegation-for-the-upcoming-artistic-gymnastics-world-championships-by-the-government-of-indonesia" },
        { date: "2025-10", publisher: "RNZ", title: "Israel confirms its absence from World Gymnastics Championships as Indonesia denies visas", url: "https://www.rnz.co.nz/news/sport/575953/israel-confirms-its-absence-from-world-gymnastics-championships-as-indonesia-denies-visas" },
        { date: "2025-10", publisher: "The Times of Israel", title: "Israeli gymnasts remain excluded from world championship after court rejects request", url: "https://www.timesofisrael.com/israeli-gymnasts-remain-excluded-from-world-championship-after-court-rejects-request/" }
      ],
      alternatives: [],
      updated: "2025-10"
    },
    {
      id: "as-tff",
      name: "התאחדות הכדורגל של טורקיה",
      aliases: ["Turkish Football Federation", "TFF"],
      type: "sport",
      actor: "entity",
      location: { country: "טורקיה", region: "me", city: "איסטנבול" },
      scope: "local",
      severity: 2,
      status: "verified",
      summary: "ההתאחדות שלחה מכתב ל-FIFA, ל-UEFA ולראשי התאחדויות הכדורגל בעולם ובו דרישה להרחיק את ישראל מכל אירועי הספורט.",
      tags: ["ספורט", "כדורגל", "השעיה"],
      sources: [
        { date: "2025-09-27", publisher: "Al Jazeera", title: "Türkiye, group of athletes call on FIFA, UEFA to ban Israel's football team", url: "https://www.aljazeera.com/sports/2025/9/27/turkiye-group-of-athletes-call-on-fifa-uefa-to-ban-israels-football-team" }
      ],
      alternatives: [],
      updated: "2025-09-27"
    },

    /* ═══ תקשורת ═══ */

    {
      id: "as-bbc-ofcom",
      name: "BBC",
      aliases: ["British Broadcasting Corporation", "בי-בי-סי"],
      type: "media",
      actor: "entity",
      location: { country: "בריטניה", region: "eu", city: "לונדון" },
      scope: "global",
      severity: 2,
      status: "verified",
      summary: "רשות התקשורת הבריטית Ofcom קבעה שהתחקיר ״Gaza: How To Survive A Warzone״ היה ״מטעה מהותית״ את הצופים, משום שה-BBC לא גילה שהמספר בסרט הוא בנו של בכיר בחמאס — ״הפרה חמורה״ של כללי השידור, שבגינה חויב השידור בהצהרה מתקנת. בממצא נפרד קבעה Ofcom בעבר שה-BBC ביצע ״כשלים עריכתיים משמעותיים״ בסיקור תקיפה אנטישמית של סטודנטים יהודים באוטובוס בלונדון, ולא עמד בחובת הדיוק וההגינות. אלה ממצאים רגולטוריים על כשלים בסיקור — לא קביעה שהגוף נוקט עמדה.",
      tags: ["תקשורת", "ממצא רשמי", "רגולציה"],
      sources: [
        { date: "2022-11", publisher: "BBC News", title: "Ofcom: BBC made significant editorial failings over antisemitism bus attack report", url: "https://www.bbc.com/news/entertainment-arts-63541437" },
        { date: "2025-10", publisher: "The Times of Israel", title: "BBC anti-Israel bias — מעקב סיקור", url: "https://www.timesofisrael.com/topic/bbc-anti-israel-bias/" }
      ],
      alternatives: [],
      updated: "2025-10"
    },

    /* ═══ גל התקיפות באירופה, 2026 ═══ */

    {
      id: "as-ashab-alyamin",
      name: "חרכת אצחאב אל-ימין אל-אסלאמיה",
      aliases: ["Harakat Ashab al-Yamin al-Islamia", "Ashab al-Yamin"],
      type: "org",
      actor: "entity",
      location: { country: "בינלאומי", region: "global", city: "" },
      scope: "global",
      severity: 4,
      status: "verified",
      summary: "ארגון איסלאמיסטי פרו-איראני שנטל אחריות מאז מרץ 2026 על שורת תקיפות נגד מוסדות יהודיים באירופה — בתי כנסת, בתי ספר וארגוני צדקה — וכן נגד יעדים אמריקאיים, ישראליים ואופוזיציוניים איראניים. בין האירועים: פיצוץ בבית הכנסת בליאז׳ שבבלגיה ב-9 במרץ 2026, הצתת בית כנסת ברוטרדם ב-13 במרץ, וכעשר תקיפות בלונדון במרץ–אפריל שכללו הצתות, מטעני חבלה וחומרים כימיים. בעקבות הגל פרסה איטליה חיילים ליד בית הכנסת הגדול ברומא ב-17 במרץ 2026, ובלגיה עשתה כמותה. מומחים מזהירים שייתכן שהארגון הוא חזית בלבד.",
      tags: ["טרור", "הסתה", "מוסדות יהודיים", "2026"],
      sources: [
        { date: "2026", publisher: "Wikipedia", title: "Harakat Ashab al-Yamin al-Islamia", url: "https://en.wikipedia.org/wiki/Harakat_Ashab_al-Yamin_al-Islamia" },
        { date: "2026-03", publisher: "CBS News", title: "Belgium to deploy soldiers to help protect Jewish sites as Iran war fuels surge of antisemitism", url: "https://www.cbsnews.com/news/europe-antisemitism-iran-war-belgium-italy-deploy-soldiers-jewish-sites/" },
        { date: "2026", publisher: "The Times of Israel", title: "New Iran-linked terror org behind attacks on European Jewish institutions, Diaspora Ministry warns", url: "https://www.timesofisrael.com/new-iran-linked-terror-org-targets-european-jewish-institutions-diaspora-ministry-warns/" },
        { date: "2026", publisher: "Wikipedia", title: "2026 London antisemitic attacks", url: "https://en.wikipedia.org/wiki/2026_London_antisemitic_attacks" },
        { date: "2026", publisher: "The Times of Israel", title: "Group behind European antisemitic attacks may be only a facade, warn experts", url: "https://www.timesofisrael.com/group-behind-european-antisemitic-attacks-may-be-only-a-facade-warn-experts/" }
      ],
      alternatives: [],
      updated: "2026-04"
    },

    /* ═══ הגבלות כניסה ותנועה ═══ */

    {
      /* המקרה היחיד עם מעצרים מתועדים בטרנזיט — לא רק בכניסה.
         זו בדיוק האזהרה שרשימת מדינות שטוחה לא מעבירה. */
      travel: { entry: "banned", transit: "risk",
                note: "לפחות שמונה ישראלים נעצרו בנמל התעופה של קואלה לומפור בחודשים האחרונים, חלקם בטיסות המשך בלבד. שגרירות ישראל פרסמה אזהרת נסיעה." },
      id: "as-malaysia",
      name: "מלזיה",
      aliases: ["Malaysia"],
      type: "place",
      location: { country: "מלזיה", region: "asia", city: "" },
      scope: "local",
      severity: 3,
      status: "verified",
      summary: "החוק המלזי אוסר כניסה לבעלי דרכון ישראלי אלא באישור כתוב מיוחד ממשרד הפנים. ראש הממשלה אנואר איברהים הצהיר ביולי 2026 שכל ישראלי שיימצא במדינה ״יגורש מיידית״. בחודשים האחרונים נעצרו לפחות שמונה ישראלים בנמל התעופה של קואלה לומפור, חלקם בטיסות המשך בלבד, ושגרירות ישראל פרסמה אזהרת נסיעה.",
      tags: ["אפליה", "דרכון", "הגבלת כניסה"],
      sources: [
        { date: "2026-03-30", publisher: "The Online Citizen", title: "At least eight Israelis detained at Kuala Lumpur airport in recent months, Israel embassy warns against travel", url: "https://theonlinecitizen.com/2026/03/30/at-least-eight-israelis-detained-at-kuala-lumpur-airport-in-recent-months-israel-embassy-warns-against-travel" },
        { date: "2024", publisher: "Newsweek", title: "Map Shows Countries with Bans on Israeli Passport Holders", url: "https://www.newsweek.com/map-countries-that-impose-ban-israeli-passport-holders-1907316" }
      ],
      alternatives: [],
      updated: "2026-03-30"
    },
    {
      travel: { entry: "banned", transit: "unknown",
                note: "האיסור עוגן בחוק באפריל 2025 — התיקון השלישי לחוק ההגירה." },
      id: "as-maldives",
      name: "האיים המלדיביים",
      aliases: ["Maldives", "מלדיביים"],
      type: "place",
      location: { country: "האיים המלדיביים", region: "asia", city: "" },
      scope: "local",
      severity: 3,
      status: "verified",
      summary: "המדינה הכריזה ביוני 2024 על איסור כניסה לבעלי דרכון ישראלי על רקע המלחמה בעזה, ובאפריל 2025 עיגנה אותו בחוק — התיקון השלישי לחוק ההגירה של המלדיביים — בנימוק של ״סולידריות נחרצת״ עם הפלסטינים. ההגבלה חלה על בסיס לאום ולא על מעשה כלשהו של הנוסע.",
      tags: ["אפליה", "דרכון", "הגבלת כניסה", "תיירות"],
      sources: [
        { date: "2024-06", publisher: "AOL / Reuters", title: "Maldives bans Israeli passport holders in protest against Gaza war", url: "https://www.aol.com/maldives-bans-israeli-passport-holders-223405646.html" },
        { date: "2024", publisher: "Newsweek", title: "Map Shows Countries with Bans on Israeli Passport Holders", url: "https://www.newsweek.com/map-countries-that-impose-ban-israeli-passport-holders-1907316" },
        { date: "2026", publisher: "Factually", title: "Which Countries Ban Entry to Israeli Passport Holders (2026)", url: "https://factually.co/fact-checks/politics/countries-banning-israel-entry-list-2026-780e31" }
      ],
      alternatives: [],
      updated: "2025-04"
    },

    /* ═══ הרשעות פליליות באנטישמיות ═══ */

    {
      id: "as-paulin",
      name: "קנת׳ פאולין",
      aliases: ["Kenneth Paulin"],
      type: "person",
      location: { country: "קנדה", region: "na", city: "נורת׳ ביי, אונטריו" },
      scope: "local",
      severity: 4,
      status: "verified",
      summary: "נידון ב־18 בספטמבר 2025 לתשעה חודשי מאסר ושנתיים מבחן, בהרשעה הראשונה בקנדה על הכחשת שואה. ההרשעה כללה הסתה מכוונת לשנאה נגד יהודים והכחשה, הכחשה חלקית או הקטנה של השואה. הפרסומים בוצעו בטלגרם, ב־Bitchute וב־Rumble.",
      tags: ["הכחשת שואה", "הסתה", "הרשעה פלילית"],
      sources: [
        { date: "2025-09", publisher: "Friends of Simon Wiesenthal Center", title: "Court Issues First-Ever Jail Sentence in Canada for Holocaust Denial", url: "https://www.fswc.ca/news/court-issues-first-ever-jail-sentence-in-canada-for-holocaust-denial" },
        { date: "2025-10-01", publisher: "Algemeiner", title: "Canada Issues First-Ever Jail Sentence for Holocaust Denial", url: "https://www.algemeiner.com/2025/10/01/canada-issues-first-ever-jail-sentence-holocaust-denial/" },
        { date: "2025", publisher: "ALCCA", title: "Landmark Sentencing in Canada's First Wilful Promotion of Antisemitism Case", url: "https://www.alcca.ca/post/hate-crime-legal-update-landmark-sentencing-in-canada-first-wilful-promotion-of-antisemitism" }
      ],
      alternatives: [],
      updated: "2025-10-01"
    },
    {
      id: "as-boncompain",
      name: "ז׳אק בונקומפן",
      aliases: ["Jacques Boncompain"],
      type: "person",
      location: { country: "צרפת", region: "eu", city: "ורדן" },
      scope: "local",
      severity: 4,
      status: "verified",
      summary: "יושב ראש עמותה להנצחת זכרו של פטן נקנס ב־5,000 אירו בבית המשפט לעניינים פליליים בוורדן, בעבירה של ״הכחשה פומבית של פשעים נגד האנושות״. בית המשפט קבע שההתבטאות מהווה ״הקטנה בוטה של מספר קורבנות השואה״.",
      tags: ["הכחשת שואה", "הרשעה פלילית"],
      sources: [
        { date: "2025", publisher: "European Jewish Congress", title: "French court convicts Pétain supporter for Holocaust denial remarks", url: "https://eurojewcong.org/news/communities-news/france/french-court-convicts-petain-supporter-for-holocaust-denial-remarks/", quote: "gross minimisation of the number of victims of the Holocaust" },
        { date: "2025", publisher: "APLEU", title: "Holocaust Denier in France Convicted of Hate Speech and Historical Distortion", url: "https://apleu.org/french-holocaust-denier-sentenced-to-prison-for-hate-speech-and-war-crime-denial/" }
      ],
      alternatives: [],
      updated: "2025"
    },
    {
      id: "as-charles",
      name: "טביוס ז׳אן צ׳ארלס",
      aliases: ["Tavius Jean Charles"],
      type: "person",
      location: { country: "בריטניה", region: "eu", city: "לונדון" },
      scope: "local",
      severity: 4,
      status: "verified",
      summary: "נידון בבית המשפט סאות׳ווארק ל־חמש שנות מאסר לאחר שהודה בשורת עבירות על רקע דתי. בין אוקטובר 2025 למרץ 2026 איים שוב ושוב על שישה אנשים שזיהה כיהודים, בסמוך לבית כנסת — כולל איומי מוות ואמירה שיש לפוצץ בית ספר יהודי.",
      tags: ["הסתה", "הרשעה פלילית", "איומים"],
      sources: [
        { date: "2026", publisher: "Crown Prosecution Service", title: "Man who admitted making series of antisemitic threats near a synagogue sentenced (מקור ראשוני)", url: "https://www.cps.gov.uk/london-north/news/man-who-admitted-making-series-antisemitic-threats-near-synagogue-sentenced" }
      ],
      alternatives: [],
      updated: "2026"
    },
    {
      id: "as-sechriest",
      name: "פרנקלין סקרייסט",
      aliases: ["Franklin Sechriest"],
      type: "person",
      location: { country: "ארצות הברית", region: "na", city: "אוסטין, טקסס" },
      scope: "local",
      severity: 4,
      status: "verified",
      summary: "נידון ל־עשר שנות מאסר ושלוש שנות פיקוח, לאחר שהודה באשמת הצתה ופשע שנאה בגין הצתת בית הכנסת ״קהילת בית ישראל״ באוסטין ב־31 באוקטובר 2021.",
      tags: ["הצתה", "הרשעה פלילית", "פשע שנאה"],
      sources: [
        { date: "2026", publisher: "Fox News", title: "Texas man sentenced to 10 years in prison for hate crime, arson attack on Austin synagogue", url: "https://foxnews.com/us/texas-man-sentenced-prison-hate-crime-arson-attack-austin-synagogue.amp" },
        { date: "2026", publisher: "AOL / AP", title: "Texas teen jailed for 10 years for hate crime arson attack on synagogue", url: "https://www.aol.com/texas-teen-jailed-10-years-234133030.html" }
      ],
      alternatives: [],
      updated: "2026"
    },
    {
      id: "as-chabad-ram",
      name: "פריצת הרכב למטה חב״ד",
      aliases: ["Chabad headquarters car ramming", "770 Eastern Parkway"],
      type: "place",
      location: { country: "ארצות הברית", region: "na", city: "ברוקלין, ניו יורק" },
      scope: "local",
      severity: 4,
      status: "verified",
      summary: "תושב קרטרט שבניו ג׳רזי הודה באשמת פגיעה מכוונת ברכוש דתי לאחר שנהג ברכבו לתוך מטה חב״ד העולמי בקראון הייטס, ונידון ביולי 2026 לשישה חודשי מאסר — עונש קל מזה שביקשה התביעה, מה שעורר ביקורת ציבורית. התביעה ציינה ש־80 מתוך 146 אירועי פשע שנאה בניו יורק מתחילת השנה כוונו נגד יהודים ומוסדות יהודיים.",
      tags: ["פשע שנאה", "הרשעה פלילית", "מוסדות יהודיים"],
      sources: [
        { date: "2026-07-29", publisher: "NBC News", title: "Man sentenced for ramming car into Chabad-Lubavitch headquarters", url: "https://www.nbcnews.com/news/us-news/man-sentences-ramming-chabad-lubavitch-rcna589937" },
        { date: "2026-07-30", publisher: "NY1", title: "Man gets 6-month sentence for ramming car into Jewish group's N.Y. world headquarters", url: "https://ny1.com/nyc/brooklyn/news/2026/07/30/man-gets-6-month-sentence-for-ramming-car-into-jewish-group-s-n-y--world-headquarters" },
        { date: "2026", publisher: "JNS", title: "Crown Heights leaders decry sentence in Chabad headquarters car-ramming", url: "https://www.jns.org/news/u-s-news/crown-heights-leaders-decry-sentence-in-chabad-headquarters-car-ramming" }
      ],
      alternatives: [],
      updated: "2026-07-30"
    },

    /* ═══ אירוויזיון 2026 — נסיגת שדרנים ═══ */

    {
      id: "as-rte",
      name: "RTÉ",
      aliases: ["Raidió Teilifís Éireann", "השדר הציבורי של אירלנד"],
      type: "media",
      location: { country: "אירלנד", region: "eu", city: "דבלין" },
      scope: "local",
      severity: 3,
      status: "verified",
      summary: "השדר הציבורי האירי הודיע על פרישה מאירוויזיון 2026 בשל השתתפות ישראל, וקבע שהשתתפות בתחרות היא ״בלתי מתקבלת על הדעת״ לנוכח אובדן החיים בעזה. זו אחת מחמש נסיגות שהיוו את החרם הגדול בתולדות התחרות.",
      tags: ["חרם תרבותי", "אירוויזיון", "שידור ציבורי"],
      sources: [
        { date: "2025-09", publisher: "The Times of Israel", title: "Ireland says it will boycott Eurovision 2026 if Israel allowed to take part", url: "https://www.timesofisrael.com/ireland-says-it-will-boycott-eurovision-2026-if-israel-allowed-to-take-part/" },
        { date: "2026-05", publisher: "GB News", title: "Full list of countries that ditched the Song Contest over Israel", url: "https://www.gbnews.com/celebrity/eurovision-boycott-2026-full-list-countries-israel", quote: "unconscionable given the appalling loss of lives in Gaza" }
      ],
      alternatives: [],
      updated: "2026-05"
    },
    {
      id: "as-rtvslo",
      name: "RTV Slovenija",
      aliases: ["RTVSLO", "השדר הציבורי של סלובניה"],
      type: "media",
      location: { country: "סלובניה", region: "eu", city: "ליובליאנה" },
      scope: "local",
      severity: 3,
      status: "verified",
      summary: "השדר הציבורי הסלובני פרש מאירוויזיון 2026 בשל השתתפות ישראל, והצהיר שההחלטה התקבלה ״בשם 20,000 הילדים שמתו בעזה״.",
      tags: ["חרם תרבותי", "אירוויזיון", "שידור ציבורי"],
      sources: [
        { date: "2026-05", publisher: "GB News", title: "Full list of countries that ditched the Song Contest over Israel", url: "https://www.gbnews.com/celebrity/eurovision-boycott-2026-full-list-countries-israel", quote: "on behalf of the 20,000 children who died in Gaza" },
        { date: "2026-05-16", publisher: "Stats with Sasa", title: "Eurovision 2026 Boycott: 5 countries withdraw over Israel", url: "https://www.statswithsasa.com/2026/05/16/eurovision-26-boycott/" }
      ],
      alternatives: [],
      updated: "2026-05"
    },
    {
      id: "as-avrotros",
      name: "AVROTROS / NPO",
      aliases: ["השדר הציבורי של הולנד", "Dutch public broadcaster"],
      type: "media",
      location: { country: "הולנד", region: "eu", city: "הילברסום" },
      scope: "local",
      severity: 3,
      status: "verified",
      summary: "השדר ההולנדי איים בספטמבר 2025 לפרוש מאירוויזיון אם ישראל תשתתף, ומימש את האיום ב־2026.",
      tags: ["חרם תרבותי", "אירוויזיון", "שידור ציבורי"],
      sources: [
        { date: "2025-09-12", publisher: "Al Jazeera", title: "Netherlands threatens to boycott Eurovision 2026 if Israel participates", url: "https://www.aljazeera.com/news/2025/9/12/netherlands-threatens-to-boycott-eurovision-2026-if-israel-participates" },
        { date: "2025-09", publisher: "BBC News", title: "Dutch broadcaster says it will join Eurovision boycott over Israel", url: "https://www.bbc.com/news/articles/c5yg0ly2nlko" }
      ],
      alternatives: [],
      updated: "2026-05"
    },
    {
      id: "as-rtve",
      name: "RTVE",
      aliases: ["Radiotelevisión Española", "השדר הציבורי של ספרד"],
      type: "media",
      location: { country: "ספרד", region: "eu", city: "מדריד" },
      scope: "local",
      severity: 3,
      status: "verified",
      summary: "השדר הציבורי הספרדי פרש מאירוויזיון 2026 בשל השתתפות ישראל, אחת מחמש נסיגות שהיוו את החרם הגדול ביותר ב־70 שנות התחרות.",
      tags: ["חרם תרבותי", "אירוויזיון", "שידור ציבורי"],
      sources: [
        { date: "2026-05", publisher: "GB News", title: "Full list of countries that ditched the Song Contest over Israel", url: "https://www.gbnews.com/celebrity/eurovision-boycott-2026-full-list-countries-israel" },
        { date: "2026-05-16", publisher: "Stats with Sasa", title: "Eurovision 2026 Boycott: 5 countries withdraw over Israel", url: "https://www.statswithsasa.com/2026/05/16/eurovision-26-boycott/" }
      ],
      alternatives: [],
      updated: "2026-05"
    },
    {
      id: "as-ruv",
      name: "RÚV",
      aliases: ["Ríkisútvarpið", "השדר הציבורי של איסלנד"],
      type: "media",
      location: { country: "איסלנד", region: "eu", city: "רייקיאוויק" },
      scope: "local",
      severity: 3,
      status: "verified",
      summary: "השדר הציבורי האיסלנדי פרש מאירוויזיון 2026 בשל השתתפות ישראל.",
      tags: ["חרם תרבותי", "אירוויזיון", "שידור ציבורי"],
      sources: [
        { date: "2026-05", publisher: "GB News", title: "Full list of countries that ditched the Song Contest over Israel", url: "https://www.gbnews.com/celebrity/eurovision-boycott-2026-full-list-countries-israel" },
        { date: "2026-05-16", publisher: "Stats with Sasa", title: "Eurovision 2026 Boycott: 5 countries withdraw over Israel", url: "https://www.statswithsasa.com/2026/05/16/eurovision-26-boycott/" }
      ],
      alternatives: [],
      updated: "2026-05"
    },

    /* ═══ קמפוסים ואיגודי סטודנטים ═══ */

    {
      id: "as-cornell-gsu",
      name: "איגוד הסטודנטים לתארים מתקדמים בקורנל",
      aliases: ["Cornell Graduate Students United", "CGSU"],
      type: "academic",
      location: { country: "ארצות הברית", region: "na", city: "אית׳קה, ניו יורק" },
      scope: "local",
      severity: 3,
      status: "verified",
      summary: "ב־26 בנובמבר 2025 אישר האיגוד במשאל חברים החלטה לאמץ את הצהרת ״הסולידריות הבינלאומית עם מאבק השחרור הפלסטיני״ ואת קווי ה־BDS. ההחלטה עברה ברוב של 559 מול 215.",
      tags: ["חרם אקדמי", "קמפוס", "איגוד סטודנטים"],
      sources: [
        { date: "2025-12", publisher: "The Cornell Daily Sun", title: "Graduate Student Union Passes Referendum Committing to BDS Guidelines", url: "https://www.cornellsun.com/article/2025/12/graduate-student-union-passes-referendum-committing-to-bds-guidelines-for-solidarity-with-the-palestinian-liberation-struggle" },
        { date: "2025-11", publisher: "The Times of Israel", title: "Cornell grad student union approves BDS resolution", url: "https://www.timesofisrael.com/cornell-grad-student-union-approves-bds-resolution-backing-resistance-by-any-means/" }
      ],
      alternatives: [],
      updated: "2025-12"
    },
    {
      id: "as-rutgers-aaup",
      name: "AAUP-AFT ראטגרס",
      aliases: ["Rutgers AAUP-AFT", "איגוד הסגל של ראטגרס"],
      type: "academic",
      location: { country: "ארצות הברית", region: "na", city: "ניו ברונסוויק, ניו ג׳רזי" },
      scope: "local",
      severity: 3,
      status: "verified",
      summary: "סניף ראטגרס של איגוד המרצים האמריקאי אישר בדצמבר 2024 החלטת BDS ברוב של 58% בעד, 38% נגד ו־4% נמנעים.",
      tags: ["חרם אקדמי", "קמפוס", "איגוד מקצועי"],
      sources: [
        { date: "2024-12", publisher: "The Jewish Link", title: "Rutgers Faculty Union Divestment Vote Passes", url: "https://jewishlink.news/rutgers-faculty-union-divestment-vote-passes/" }
      ],
      alternatives: [],
      updated: "2024-12"
    },
    {
      id: "as-uwmadison",
      name: "אגודת הסטודנטים של אוניברסיטת ויסקונסין־מדיסון",
      aliases: ["UW–Madison student government", "ASM"],
      type: "academic",
      location: { country: "ארצות הברית", region: "na", city: "מדיסון, ויסקונסין" },
      scope: "local",
      severity: 3,
      status: "verified",
      summary: "אגודת הסטודנטים אישרה במרץ 2026 החלטה התומכת בתנועת ה־BDS ודורשת מהאוניברסיטה למשוך השקעות מחברות הקשורות כלכלית לישראל. הנהלת האוניברסיטה גינתה את ההחלטה.",
      tags: ["חרם אקדמי", "קמפוס", "אגודת סטודנטים"],
      sources: [
        { date: "2026-03-26", publisher: "Algemeiner", title: "University of Wisconsin–Madison Denounces BDS Resolution Passed by Student Government", url: "https://www.algemeiner.com/2026/03/26/university-wisconsin-madison-denounces-bds-resolution-passed-student-government/" }
      ],
      alternatives: [],
      updated: "2026-03-26"
    },
    {
      id: "as-concordia",
      name: "אגודת הסטודנטים של קונקורדיה",
      aliases: ["Concordia Student Union", "CSU"],
      type: "academic",
      location: { country: "קנדה", region: "na", city: "מונטריאול" },
      scope: "local",
      severity: 3,
      status: "verified",
      summary: "אגודת הסטודנטים אישרה בינואר 2025 מנדט BDS, והתכוונה להציגו בפני חבר הנאמנים של האוניברסיטה.",
      tags: ["חרם אקדמי", "קמפוס", "אגודת סטודנטים"],
      sources: [
        { date: "2025-02", publisher: "The Concordian", title: "Students Look Back On Historic Vote And To The Future Of Divestment At Concordia", url: "https://theconcordian.com/2025/02/students-look-back-on-historic-vote-and-to-the-future-of-divestment-at-concordia/" }
      ],
      alternatives: [],
      updated: "2025-02"
    },
    {
      id: "as-uconn",
      name: "אגודת הסטודנטים של אוניברסיטת קונטיקט",
      aliases: ["UConn USG", "Undergraduate Student Government"],
      type: "academic",
      location: { country: "ארצות הברית", region: "na", city: "סטורס, קונטיקט" },
      scope: "local",
      severity: 2,
      status: "verified",
      summary: "בפברואר 2025 הצביעו הסטודנטים 184 מול 68 (ו־10 נמנעים) לקדם משאל בנושא גילוי השקעות ומשיכתן מיצרניות נשק. ההחלטה מתמקדת ביצרניות נשק ולא בישראל כמדינה, ולכן מסווגת כעמדה מדינית ולא כחרם.",
      tags: ["משיכת השקעות", "קמפוס", "אגודת סטודנטים"],
      sources: [
        { date: "2025-02-05", publisher: "The Daily Campus", title: "Divestment referendum advances to USG Senate", url: "https://dailycampus.com/2025/02/05/divestment-referendum-advances-to-usg-senate-in-vote-with-over-250-students/" }
      ],
      alternatives: [],
      updated: "2025-02-05"
    },
    {
      id: "as-binghamton",
      name: "אגודת הסטודנטים של בינגהמטון",
      aliases: ["Binghamton University Student Association"],
      type: "academic",
      location: { country: "ארצות הברית", region: "na", city: "בינגהמטון, ניו יורק" },
      scope: "local",
      severity: 3,
      status: "review",
      summary: "אגודת הסטודנטים אישרה החלטת BDS. פרטי ההצבעה והיקף היישום טרם אומתו ממקור שני — הרשומה מסומנת כבבדיקה.",
      tags: ["חרם אקדמי", "קמפוס", "אגודת סטודנטים"],
      sources: [
        { date: "2025", publisher: "Pipe Dream (Binghamton University)", title: "BDS resolution passes", url: "https://www.bupipedream.com/news/bds-resolution-passes/152111/" }
      ],
      alternatives: [],
      updated: "2025"
    },

    /* ═══ קמעונאות נוספת ═══ */

    {
      id: "as-parkslope",
      name: "Park Slope Food Coop",
      aliases: ["קואופרטיב המזון של פארק סלופ"],
      type: "place",
      location: { country: "ארצות הברית", region: "na", city: "ברוקלין, ניו יורק" },
      scope: "local",
      severity: 3,
      status: "verified",
      summary: "חברי הקואופרטיב הצביעו במאי 2026 בעד חרם על מוצרים ישראליים. ההחלטה חלה על תשעה מוצרים, בהם שמן זית, מוצרי שומשום, אפרסמון, קוביות עשבי תיבול קפואות של ״דורות״ ובמבה של אוסם.",
      tags: ["חרם", "קמעונאות", "מזון"],
      sources: [
        { date: "2026-05-26", publisher: "Jewish Telegraphic Agency", title: "Park Slope Food Coop votes for Israel boycott", url: "https://www.jta.org/2026/05/26/ny/park-slope-food-coop-votes-for-israel-boycott" }
      ],
      alternatives: [
        { name: "Union Market · Key Food", note: "מכולות שכונתיות בברוקלין, ללא החלטת חרם" }
      ],
      updated: "2026-05-26"
    },
    {
      id: "as-infected",
      name: "ביטול הופעת Infected Mushroom באדלייד",
      aliases: ["Boycott Infected Mushroom"],
      type: "entertainment",
      location: { country: "אוסטרליה", region: "oceania", city: "אדלייד" },
      scope: "local",
      severity: 3,
      status: "verified",
      summary: "הופעה שאזלו כרטיסיה של ההרכב הישראלי ״אינפקטד מאשרום״ באדלייד בוטלה בעקבות לחץ מצד מתנגדים שפעלו תחת השם ״Boycott Infected Mushroom״. הביטול נעשה בשל זהותם הישראלית של האמנים.",
      tags: ["חרם תרבותי", "אפליה", "מוזיקה"],
      sources: [
        { date: "2025", publisher: "The Times of Israel", title: "Upstaged by war, Israeli film and music artists battle global boycott calls", url: "https://www.timesofisrael.com/upstaged-by-war-israeli-film-and-music-artists-battle-global-boycott-calls/" }
      ],
      alternatives: [],
      updated: "2025"
    },

    /* ═══ מדינות האוסרות כניסה לבעלי דרכון ישראלי ═══
       כולן מתועדות באותם שני מקורות. ההגבלה חלה על בסיס לאום —
       לא על מעשה כלשהו של הנוסע — ולכן מסווגת כאפליה. */

    /* ═══ קמפייני חרם תרבותי והחותמים עליהם ═══
       חתימה פומבית על עצומה היא עמדה שהאדם הכריז עליה בעצמו — עובדה
       שאפשר לאמת. כל הרשומות כאן בדרגה 3 (חרם), לא 4: הן מכוונות
       למוסדות ישראליים ולא ליהודים, וזו הבחנה שאסור לטשטש. */

    {
      id: "as-fwp",
      name: "Film Workers for Palestine",
      aliases: ["עובדי הקולנוע למען פלסטין", "FWP"],
      type: "entertainment",
      location: { country: "בינלאומי", region: "global", city: "" },
      scope: "global",
      severity: 3,
      status: "verified",
      summary: "התחייבות שפורסמה ב-8 בספטמבר 2025 ועליה חתמו למעלה מ-5,000 שחקנים, במאים ואנשי תעשיית קולנוע. החותמים מתחייבים לסרב לעבוד עם מוסדות קולנוע ישראליים המתוארים כמעורבים בהפרות זכויות אדם. בין החותמים: טילדה סווינטון, מארק רופאלו, אמה סטון, אוליביה קולמן, חאווייר ברדם, איו אדבירי, אווה דוברניי ויורגוס לנתימוס. שחקנים אחרים, בהם מאיים ביאליק וליב שרייבר, חתמו על מכתב נגדי המגנה את ההתחייבות.",
      tags: ["חרם תרבותי", "קולנוע", "עצומה"],
      sources: SRC_FWP,
      alternatives: [],
      updated: "2025-09-08"
    },
    {
      id: "as-mfp",
      name: "Musicians for Palestine",
      aliases: ["מוזיקאים למען פלסטין", "MFP"],
      type: "entertainment",
      location: { country: "בינלאומי", region: "global", city: "" },
      scope: "global",
      severity: 3,
      status: "verified",
      summary: "מכתב פתוח משנת 2021 שעליו חתמו למעלה מ-600 מוזיקאים, הקורא לאמנים לסרב להופיע במוסדות תרבות ישראליים. בין החותמים: Rage Against the Machine, פטי סמית׳, סרז׳ טנקיאן, רוג׳ר ווטרס, ג׳וליאן קסבלנקס, Run the Jewels ו-Cypress Hill.",
      tags: ["חרם תרבותי", "מוזיקה", "עצומה"],
      sources: SRC_MFP,
      alternatives: [],
      updated: "2021"
    },

    /* — חותמי התחייבות הקולנוע — */
    signer("as-stone",     "אמה סטון",            ["Emma Stone"],           "person", "ארצות הברית", "na", "fwp"),
    signer("as-ruffalo",   "מארק רופאלו",         ["Mark Ruffalo"],         "person", "ארצות הברית", "na", "fwp"),
    signer("as-colman",    "אוליביה קולמן",        ["Olivia Colman"],        "person", "בריטניה",     "eu", "fwp"),
    signer("as-swinton",   "טילדה סווינטון",       ["Tilda Swinton"],        "person", "בריטניה",     "eu", "fwp"),
    signer("as-bardem",    "חאווייר ברדם",         ["Javier Bardem"],        "person", "ספרד",        "eu", "fwp"),
    signer("as-edebiri",   "איו אדבירי",           ["Ayo Edebiri"],          "person", "ארצות הברית", "na", "fwp"),
    signer("as-duvernay",  "אווה דוברניי",         ["Ava DuVernay"],         "person", "ארצות הברית", "na", "fwp"),
    signer("as-lanthimos", "יורגוס לנתימוס",       ["Yorgos Lanthimos"],     "person", "יוון",        "eu", "fwp"),
    signer("as-mara",      "רוני מארה",            ["Rooney Mara"],          "person", "ארצות הברית", "na", "fwp"),
    signer("as-kapadia",   "אסיף קפאדיה",          ["Asif Kapadia"],         "person", "בריטניה",     "eu", "fwp"),
    signer("as-christie",  "ג׳ולי כריסטי",         ["Julie Christie"],       "person", "בריטניה",     "eu", "fwp"),
    signer("as-bernal",    "גאל גארסיה ברנאל",     ["Gael García Bernal"],   "person", "מקסיקו",      "latam", "fwp"),
    signer("as-milano",    "אליסה מילאנו",         ["Alyssa Milano"],        "person", "ארצות הברית", "na", "fwp"),
    signer("as-cox",       "בריאן קוקס",           ["Brian Cox"],            "person", "בריטניה",     "eu", "fwp"),
    signer("as-glazer",    "אילנה גלייזר",         ["Ilana Glazer"],         "person", "ארצות הברית", "na", "fwp"),
    signer("as-ahmed",     "ריז אחמד",             ["Riz Ahmed"],            "person", "בריטניה",     "eu", "fwp"),
    signer("as-nixon",     "סינתיה ניקסון",        ["Cynthia Nixon"],        "person", "ארצות הברית", "na", "fwp"),

    /* — חותמי המכתב של מוזיקאים למען פלסטין — */
    signer("as-pattismith","פטי סמית׳",            ["Patti Smith"],          "person", "ארצות הברית", "na", "mfp"),
    signer("as-tankian",   "סרז׳ טנקיאן",          ["Serj Tankian", "System of a Down"], "person", "ארצות הברית", "na", "mfp"),
    signer("as-casablancas","ג׳וליאן קסבלנקס",     ["Julian Casablancas", "The Strokes"], "person", "ארצות הברית", "na", "mfp"),
    signer("as-moore",     "ת׳רסטון מור",          ["Thurston Moore", "Sonic Youth"],     "person", "ארצות הברית", "na", "mfp"),
    signer("as-kweli",     "טאליב קוולי",          ["Talib Kweli"],          "person", "ארצות הברית", "na", "mfp"),
    signer("as-questlove", "קווסטלאב",             ["Questlove", "The Roots"], "person", "ארצות הברית", "na", "mfp"),
    signer("as-ratm",      "Rage Against the Machine", ["RATM"],             "entertainment", "ארצות הברית", "na", "mfp"),
    signer("as-rtj",       "Run the Jewels",       ["RTJ", "Killer Mike", "El-P"], "entertainment", "ארצות הברית", "na", "mfp"),
    signer("as-cypress",   "Cypress Hill",         [],                       "entertainment", "ארצות הברית", "na", "mfp"),
    signer("as-godspeed",  "Godspeed You! Black Emperor", ["GY!BE"],         "entertainment", "קנדה",        "na", "mfp"),
    signer("as-antiflag",  "Anti-Flag",            [],                       "entertainment", "ארצות הברית", "na", "mfp"),

    /* — מצטרפי No Music for Genocide — */
    signer("as-lorde",     "לורד",                 ["Lorde"],                "person", "ניו זילנד",   "oceania", "nmfg"),
    signer("as-bjork",     "ביורק",                ["Björk"],                "person", "איסלנד",      "eu", "nmfg"),
    signer("as-weller",    "פול וולר",             ["Paul Weller"],          "person", "בריטניה",     "eu", "nmfg"),
    signer("as-clairo",    "קלייו",                ["Clairo"],               "person", "ארצות הברית", "na", "nmfg"),
    signer("as-aurora",    "אורורה",               ["AURORA"],               "person", "נורווגיה",    "eu", "nmfg"),
    signer("as-massive",   "Massive Attack",       [],                       "entertainment", "בריטניה", "eu", "nmfg"),
    signer("as-hotchip",   "Hot Chip",             [],                       "entertainment", "בריטניה", "eu", "nmfg"),
    signer("as-idles",     "IDLES",                [],                       "entertainment", "בריטניה", "eu", "nmfg"),
    signer("as-knife",     "The Knife",            [],                       "entertainment", "שוודיה",  "eu", "nmfg"),
    signer("as-feverray",  "Fever Ray",            [],                       "entertainment", "שוודיה",  "eu", "nmfg"),

    /* ═══ אישים ═══ */

    {
      id: "as-waters",
      name: "רוג׳ר ווטרס",
      aliases: ["Roger Waters", "Pink Floyd"],
      type: "person",
      location: { country: "בריטניה", region: "eu", city: "" },
      scope: "global",
      severity: 4,
      status: "disputed",
      summary: "מהקולות הבולטים בעולם בקריאה לחרם על ישראל, וחתום על המכתב של Musicians for Palestine. בפברואר 2023 ביטלה עיריית פרנקפורט הופעה שלו וכינתה אותו ״אחד האנטישמים הידועים בעולם״, בנימוק של תמיכתו ב-BDS, הדימויים בהופעותיו ומגעיו עם חמאס. משטרת ברלין פתחה בחקירה פלילית בחשד להסתה בעקבות מדים בסגנון נאצי שלבש על הבמה. ווטרס דוחה את ההאשמות, טוען שביקורתו מכוונת לישראל ולא ליהודים, ומאשים את ישראל ב״ניצול המונח אנטישמיות כדי להשתיק אנשים כמוני״.",
      correction: "בית משפט גרמני ביטל את החלטת פרנקפורט ואישר את קיום ההופעה, וקבע שיש לראות בה יצירת אמנות ושהיא ״אינה מפארת או ממזערת את פשעי הנאצים ואינה מזדהה עם האידאולוגיה הגזענית הנאצית״. הדרגה כאן משקפת את חומרת ההאשמות, לא הכרעה — הרשומה מסומנת שנויה במחלוקת.",
      tags: ["חרם תרבותי", "מוזיקה", "מחלוקת"],
      sources: [
        { date: "2023-04-26", publisher: "Rolling Stone", title: "Roger Waters Concert in Frankfurt Can Go Ahead, German Court Rules", url: "https://www.rollingstone.com/music/music-news/roger-waters-concert-frankfurt-german-court-ruling-1234723506/", quote: "did not glorify or relativise the crimes of the Nazis or identify with Nazi racist ideology" },
        { date: "2023-05", publisher: "Variety", title: "Roger Waters Slams 'Bad Faith Attacks' Alleging Antisemitism, as German Police Open Investigation", url: "https://variety.com/2023/music/news/roger-waters-responds-antisemitism-berlin-german-police-investigation-concerts-1235626904/" },
        { date: "2023-04", publisher: "Euronews", title: "Roger Waters wins legal battle to play Frankfurt concert following antisemitism claims", url: "https://www.euronews.com/culture/2023/04/26/roger-waters-wins-legal-battle-to-play-frankfurt-concert-following-antisemitism-claims" },
        { date: "2023-02", publisher: "AOL", title: "Jewish groups and city officials protest against Roger Waters concert in Frankfurt", url: "https://www.aol.com/jewish-groups-city-officials-plan-133145706.html" }
      ],
      alternatives: [],
      updated: "2023-05"
    },
    {
      id: "as-khalifa",
      name: "מיה קליפה",
      aliases: ["Mia Khalifa"],
      type: "person",
      location: { country: "ארצות הברית", region: "na", city: "מיאמי" },
      scope: "global",
      severity: 4,
      status: "verified",
      summary: "ב-7 באוקטובר 2023, בזמן המתקפה, פרסמה שורת פוסטים שחגגו אותה: ״שמישהו יגיד ללוחמי החופש בפלסטין להפוך את הטלפון ולצלם לרוחב״, ופוסט על צילום מחבלי חמאס במשאית שכותרתו ״זו ציור רנסנס״. פלייבוי ניתקה איתה קשר ומחקה את עמודה, בהודעה שכינתה את דבריה ״מגעילים ובלתי נסלחים... יש לנו מדיניות אפס סובלנות לדברי שנאה״. גם חברת Red Light Holland פיטרה אותה מתפקיד ייעוץ. ב-9 באוקטובר פרסמה הבהרה שלדבריה אין בכוונתה להסית לאלימות.",
      tags: ["הסתה", "רשתות חברתיות", "7 באוקטובר"],
      sources: [
        { date: "2023-10", publisher: "Newsweek", title: "What Mia Khalifa Has Said About the Israeli-Palestinian Conflict", url: "https://www.newsweek.com/mia-khalifa-said-israeli-palestinian-conflict-1836113" },
        { date: "2023-10", publisher: "Fox News", title: "Playboy fires Mia Khalifa over comments supporting Hamas attack on Israel", url: "https://noticias.foxnews.com/media/playboy-fires-ex-porn-star-mia-khalifa-reprehensible-comments-supporting-hamas-attack-israel.print", quote: "Over the past few days, Mia has made disgusting and reprehensible comments celebrating Hamas's attacks on Israel… we have a zero-tolerance policy for hate speech." },
        { date: "2023-10", publisher: "The Independent / AOL", title: "Mia Khalifa dropped from Playboy podcasting deal after Israel-Palestine comments", url: "https://www.aol.com/mia-khalifa-dropped-playboy-podcasting-151538410.html" },
        { date: "2023-10", publisher: "Newsweek", title: "Mia Khalifa Speaks Out After Getting Canceled", url: "https://www.newsweek.com/mia-khalifa-speaks-out-after-getting-canceled-israel-palestinian-hamas-war-1839024" }
      ],
      alternatives: [],
      updated: "2023-10"
    },
    {
      id: "as-dualipa",
      name: "דואה ליפא",
      aliases: ["Dua Lipa"],
      type: "person",
      location: { country: "בריטניה", region: "eu", city: "לונדון" },
      scope: "global",
      severity: 2,
      status: "disputed",
      summary: "מתחה ביקורת פומבית על ישראל והאשימה אותה באפרטהייד ובטיהור אתני. ארגון World Values Network בראשות הרב שמולי בוטח פרסם מודעת עמוד שלם בניו יורק טיימס שהאשימה אותה ואת האחיות בלה וג׳יג׳י חדיד ב״השמצת המדינה היהודית״. ליפא דחתה את ההאשמות: ״אני דוחה מכל וכל את ההאשמות השקריות והמחרידות שפורסמו היום״, וטענה שביקורתה נשענת על דוחות של Human Rights Watch ושל ארגון בצלם הישראלי. מדובר בעמדה מדינית — לא באנטישמיות, וכך היא מסווגת כאן.",
      tags: ["עמדה מדינית", "מוזיקה", "מחלוקת"],
      sources: [
        { date: "2021", publisher: "Jewish Telegraphic Agency", title: "Dua Lipa responds to full-page NY Times ad that blasts her Israel criticism", url: "https://www.jta.org/quick-reads/dua-lipa-responds-to-full-page-ny-times-ad-that-blasts-her-israel-criticism", quote: "I utterly reject the false and appalling allegations that were published today" },
        { date: "2021", publisher: "Jewish Journal", title: "NYT Ad Slams Dua Lipa, Hadid Sisters for Anti-Israel Rhetoric", url: "https://jewishjournal.com/israel/337030/nyt-ad-slams-dua-lipa-hadid-sisters-for-anti-israel-rhetoric/" },
        { date: "2021", publisher: "The Forward", title: "Dua Lipa responds to full-page NY Times ad", url: "https://forward.com/fast-forward/470171/dua-lipa-responds-to-full-page-ny-times-ad-that-blasts-her-israel/" }
      ],
      alternatives: [],
      updated: "2021"
    },
    {
      id: "as-bellahadid",
      name: "בלה חדיד",
      aliases: ["Bella Hadid"],
      type: "person",
      location: { country: "ארצות הברית", region: "na", city: "" },
      scope: "global",
      severity: 2,
      status: "disputed",
      summary: "נכללה במודעת העמוד השלם של World Values Network בניו יורק טיימס, שהאשימה אותה, את אחותה ג׳יג׳י ואת דואה ליפא בהאשמת ישראל באפרטהייד ובטיהור אתני ובהשמצת המדינה היהודית. מדובר בעמדה מדינית מוצהרת, לא באנטישמיות.",
      tags: ["עמדה מדינית", "אופנה", "מחלוקת"],
      sources: [
        { date: "2021", publisher: "Jewish Journal", title: "NYT Ad Slams Dua Lipa, Hadid Sisters for Anti-Israel Rhetoric", url: "https://jewishjournal.com/israel/337030/nyt-ad-slams-dua-lipa-hadid-sisters-for-anti-israel-rhetoric/" },
        { date: "2021", publisher: "Jewish Telegraphic Agency", title: "Dua Lipa responds to full-page NY Times ad that blasts her Israel criticism", url: "https://www.jta.org/quick-reads/dua-lipa-responds-to-full-page-ny-times-ad-that-blasts-her-israel-criticism" }
      ],
      alternatives: [],
      updated: "2021"
    },
    {
      id: "as-gigihadid",
      name: "ג׳יג׳י חדיד",
      aliases: ["Gigi Hadid"],
      type: "person",
      location: { country: "ארצות הברית", region: "na", city: "" },
      scope: "global",
      severity: 2,
      status: "disputed",
      summary: "נכללה במודעת העמוד השלם של World Values Network בניו יורק טיימס, שהאשימה אותה, את אחותה בלה ואת דואה ליפא בהאשמת ישראל באפרטהייד ובטיהור אתני. מדובר בעמדה מדינית מוצהרת, לא באנטישמיות.",
      tags: ["עמדה מדינית", "אופנה", "מחלוקת"],
      sources: [
        { date: "2021", publisher: "Jewish Journal", title: "NYT Ad Slams Dua Lipa, Hadid Sisters for Anti-Israel Rhetoric", url: "https://jewishjournal.com/israel/337030/nyt-ad-slams-dua-lipa-hadid-sisters-for-anti-israel-rhetoric/" },
        { date: "2021", publisher: "Jewish Telegraphic Agency", title: "Dua Lipa responds to full-page NY Times ad that blasts her Israel criticism", url: "https://www.jta.org/quick-reads/dua-lipa-responds-to-full-page-ny-times-ad-that-blasts-her-israel-criticism" }
      ],
      alternatives: [],
      updated: "2021"
    },
    {
      id: "as-ye",
      name: "קניה ווסט (Ye)",
      aliases: ["Kanye West", "Ye"],
      type: "person",
      location: { country: "ארצות הברית", region: "na", city: "לוס אנג׳לס" },
      scope: "global",
      severity: 4,
      status: "verified",
      summary: "בפברואר 2025 פרסם ברצף אמירות ובהן ״אני נאצי״ ו״כמה מחבריי הטובים הם יהודים ואני לא בוטח באף אחד מהם״, והריץ פרסומת בסופרבול שהובילה לחנות שמכרה חולצה עם צלב קרס. שופיפיי הסירה את אתרו. במאי 2025 פרסם קליפ בשם ״HEIL HITLER״ עם דימויי נאצים, ונחסם מטוויץ׳ לאחר שביצע מחווה נאצית בשידור חי. סוכנות הכישרונות שלו ניתקה איתו קשר. בינואר 2026 פרסם התנצלות במודעת עמוד שלם בוול סטריט ג׳ורנל.",
      correction: "בינואר 2026 פרסם התנצלות פומבית: ״אינני נאצי או אנטישמי, אני אוהב את העם היהודי״, והצהיר שהוא ״מזועזע עמוקות״ מהתנהגותו ומחויב ל״אחריות, טיפול ושינוי משמעותי״. הרשומה מתעדת את האירועים ואת ההתנצלות כאחד.",
      tags: ["הסתה", "הכחשת שואה", "מוזיקה", "רשתות חברתיות"],
      sources: [
        { date: "2025-02", publisher: "AJC", title: "5 of Kanye West's Antisemitic Remarks, Explained", url: "https://www.ajc.org/news/5-of-kanye-wests-antisemitic-remarks-explained" },
        { date: "2025", publisher: "Billboard", title: "A Timeline of the Consequences Ye Has Faced for His Antisemitic Hate Speech", url: "https://www.billboard.com/lists/kanye-west-hate-speech-consequences-timeline/" },
        { date: "2022-10-24", publisher: "Axios", title: "The organizations that have dropped Ye after antisemitic remarks", url: "https://www.axios.com/2022/10/24/kanye-west-anti-semitic-comments-business" },
        { date: "2026-01", publisher: "AOL", title: "Kanye West appears to address antisemitism controversy", url: "https://www.aol.com/news/kanye-west-appears-address-antisemitism-104020421.html", quote: "I am not a Nazi or an antisemite. I love Jewish people." }
      ],
      alternatives: [],
      updated: "2026-01"
    },
    {
      id: "as-hres1239",
      name: "החלטה H.Res.1239 של בית הנבחרים",
      aliases: ["2026 Antisemitism Resolution", "H.Res.1239", "119th Congress"],
      type: "org",
      location: { country: "ארצות הברית", region: "na", city: "וושינגטון" },
      scope: "local",
      severity: 3,
      status: "verified",
      summary: "באפריל 2026 הגישו חברי הקונגרס ג׳וש גוטהיימר ומייק לולר החלטה דו־מפלגתית המגנה ״רטוריקה ותוכן אנטישמיים מלאי שנאה המופצים בידי אישים בולטים ברשת״, וקוראת לפלטפורמות ולמנהיגי ציבור לגנות ולטפל בהתנהלות זו. ההחלטה נוקבת בשמות, בהם חסן פיקר וקנדס אוונס. חשוב להבחין: זו הצהרה פוליטית של מחוקקים, לא ממצא שיפוטי.",
      tags: ["חקיקה", "רשתות חברתיות", "הסתה"],
      sources: [
        { date: "2026-04", publisher: "Congress.gov", title: "H.Res.1239 — נוסח ההחלטה המלא (מקור ראשוני)", url: "https://www.congress.gov/bill/119th-congress/house-resolution/1239/text" },
        { date: "2026-04", publisher: "משרד חבר הקונגרס גוטהיימר", title: "Reps. Gottheimer and Lawler Introduce Bipartisan Resolution (מקור ראשוני)", url: "https://gottheimer.house.gov/posts/release-reps-gottheimer-and-lawler-introduce-bipartisan-resolution-condemning-antisemitic-rhetoric-from-prominent-online-personalities" },
        { date: "2026-04", publisher: "Jewish Insider", title: "Bipartisan House resolution condemns Hasan Piker, Candace Owens", url: "https://jewishinsider.com/2026/04/bipartisan-house-resolution-condemns-hasan-piker-candace-owens/" }
      ],
      alternatives: [],
      updated: "2026-05"
    },
    {
      id: "as-owens",
      name: "קנדס אוונס",
      aliases: ["Candace Owens"],
      type: "person",
      location: { country: "ארצות הברית", region: "na", city: "" },
      scope: "global",
      severity: 4,
      status: "disputed",
      summary: "החלטה דו־מפלגתית של בית הנבחרים (H.Res.1239) מייחסת לה הפצת ״תיאוריות קונספירציה נתעבות, קידום עלילות דם ומתן במה למכחישי שואה״. אוונס דוחה את ההאשמות באנטישמיות. הרשומה מתעדת את מה שההחלטה קובעת — לא פסק דין.",
      tags: ["הסתה", "רשתות חברתיות", "עלילת דם"],
      sources: [
        { date: "2026-04", publisher: "Congress.gov", title: "H.Res.1239 — נוסח ההחלטה המלא (מקור ראשוני)", url: "https://www.congress.gov/bill/119th-congress/house-resolution/1239/text", quote: "Owens has trafficked in vile conspiracy theories, promoted blood libels, and platformed Holocaust deniers." },
        { date: "2026-04", publisher: "Jewish Insider", title: "Bipartisan House resolution condemns Hasan Piker, Candace Owens", url: "https://jewishinsider.com/2026/04/bipartisan-house-resolution-condemns-hasan-piker-candace-owens/" },
        { date: "2026-05-24", publisher: "VINnews", title: "Bipartisan Lawmakers Condemn Antisemitism From Both Political Sides", url: "https://vinnews.com/2026/05/24/bipartisan-lawmakers-condemn-antisemitism-from-both-political-sides-target-online-influencers/" }
      ],
      alternatives: [],
      updated: "2026-05"
    },
    {
      id: "as-piker",
      name: "חסן פיקר",
      aliases: ["Hasan Piker", "HasanAbi"],
      type: "person",
      location: { country: "ארצות הברית", region: "na", city: "" },
      scope: "global",
      severity: 3,
      status: "disputed",
      summary: "החלטה דו־מפלגתית של בית הנבחרים (H.Res.1239) מייחסת לו מחיאות כפיים לטרור של חמאס, הקטנת מעשי האונס ההמוניים ב־7 באוקטובר, ותיאור יהודים חרדים כ״תוצרי גילוי עריות״. פיקר דוחה את ההאשמות. הרשומה מתעדת את מה שההחלטה קובעת — לא פסק דין.",
      tags: ["הסתה", "רשתות חברתיות", "סטרימינג"],
      sources: [
        { date: "2026-04", publisher: "Congress.gov", title: "H.Res.1239 — נוסח ההחלטה המלא (מקור ראשוני)", url: "https://www.congress.gov/bill/119th-congress/house-resolution/1239/text", quote: "Piker has openly applauded Hamas' terrorism, downplayed the mass rape of civilians on October 7th, and dehumanized Orthodox Jews as 'inbred.'" },
        { date: "2026-04", publisher: "Jewish Insider", title: "Bipartisan House resolution condemns Hasan Piker, Candace Owens", url: "https://jewishinsider.com/2026/04/bipartisan-house-resolution-condemns-hasan-piker-candace-owens/" }
      ],
      alternatives: [],
      updated: "2026-05"
    },

    {
      travel: { entry: "banned", transit: "unknown" }, id: "as-ban-iran", name: "איראן", aliases: ["Iran"], type: "place",
      location: { country: "איראן", region: "me", city: "" }, scope: "local",
      severity: 3, status: "verified",
      summary: "אוסרת כניסה לבעלי דרכון ישראלי. האיסור חל גם על בעלי אזרחות כפולה הנכנסים בדרכון ישראלי.",
      tags: ["אפליה", "דרכון", "הגבלת כניסה"],
      sources: [
        { date: "2024", publisher: "Newsweek", title: "Map Shows Countries with Bans on Israeli Passport Holders", url: "https://www.newsweek.com/map-countries-that-impose-ban-israeli-passport-holders-1907316" },
        { date: "2026", publisher: "Roya News", title: "13 countries ban Israeli passport holders", url: "https://en.royanews.tv/news/68533/13-countries-ban-'Israeli'-passport-holders" }
      ],
      alternatives: [], updated: "2026"
    },
    {
      travel: { entry: "banned", transit: "unknown" }, id: "as-ban-syria", name: "סוריה", aliases: ["Syria"], type: "place",
      location: { country: "סוריה", region: "me", city: "" }, scope: "local",
      severity: 3, status: "verified",
      summary: "אוסרת כניסה לבעלי דרכון ישראלי.",
      tags: ["אפליה", "דרכון", "הגבלת כניסה"],
      sources: [
        { date: "2024", publisher: "Newsweek", title: "Map Shows Countries with Bans on Israeli Passport Holders", url: "https://www.newsweek.com/map-countries-that-impose-ban-israeli-passport-holders-1907316" },
        { date: "2026", publisher: "Roya News", title: "13 countries ban Israeli passport holders", url: "https://en.royanews.tv/news/68533/13-countries-ban-'Israeli'-passport-holders" }
      ],
      alternatives: [], updated: "2026"
    },
    {
      travel: { entry: "banned", transit: "unknown" }, id: "as-ban-lebanon", name: "לבנון", aliases: ["Lebanon"], type: "place",
      location: { country: "לבנון", region: "me", city: "" }, scope: "local",
      severity: 3, status: "verified",
      summary: "אוסרת כניסה לבעלי דרכון ישראלי.",
      tags: ["אפליה", "דרכון", "הגבלת כניסה"],
      sources: [
        { date: "2024", publisher: "Newsweek", title: "Map Shows Countries with Bans on Israeli Passport Holders", url: "https://www.newsweek.com/map-countries-that-impose-ban-israeli-passport-holders-1907316" },
        { date: "2026", publisher: "Roya News", title: "13 countries ban Israeli passport holders", url: "https://en.royanews.tv/news/68533/13-countries-ban-'Israeli'-passport-holders" }
      ],
      alternatives: [], updated: "2026"
    },
    {
      travel: { entry: "banned", transit: "unknown" }, id: "as-ban-iraq", name: "עיראק", aliases: ["Iraq"], type: "place",
      location: { country: "עיראק", region: "me", city: "" }, scope: "local",
      severity: 3, status: "verified",
      summary: "אוסרת כניסה לבעלי דרכון ישראלי.",
      tags: ["אפליה", "דרכון", "הגבלת כניסה"],
      sources: [
        { date: "2024", publisher: "Newsweek", title: "Map Shows Countries with Bans on Israeli Passport Holders", url: "https://www.newsweek.com/map-countries-that-impose-ban-israeli-passport-holders-1907316" },
        { date: "2026", publisher: "Roya News", title: "13 countries ban Israeli passport holders", url: "https://en.royanews.tv/news/68533/13-countries-ban-'Israeli'-passport-holders" }
      ],
      alternatives: [], updated: "2026"
    },
    {
      travel: { entry: "banned", transit: "unknown" }, id: "as-ban-kuwait", name: "כווית", aliases: ["Kuwait"], type: "place",
      location: { country: "כווית", region: "me", city: "" }, scope: "local",
      severity: 3, status: "verified",
      summary: "אוסרת כניסה לבעלי דרכון ישראלי.",
      tags: ["אפליה", "דרכון", "הגבלת כניסה"],
      sources: [
        { date: "2024", publisher: "Newsweek", title: "Map Shows Countries with Bans on Israeli Passport Holders", url: "https://www.newsweek.com/map-countries-that-impose-ban-israeli-passport-holders-1907316" },
        { date: "2026", publisher: "Roya News", title: "13 countries ban Israeli passport holders", url: "https://en.royanews.tv/news/68533/13-countries-ban-'Israeli'-passport-holders" }
      ],
      alternatives: [], updated: "2026"
    },
    {
      travel: { entry: "banned", transit: "unknown" }, id: "as-ban-yemen", name: "תימן", aliases: ["Yemen"], type: "place",
      location: { country: "תימן", region: "me", city: "" }, scope: "local",
      severity: 3, status: "verified",
      summary: "אוסרת כניסה לבעלי דרכון ישראלי.",
      tags: ["אפליה", "דרכון", "הגבלת כניסה"],
      sources: [
        { date: "2024", publisher: "Newsweek", title: "Map Shows Countries with Bans on Israeli Passport Holders", url: "https://www.newsweek.com/map-countries-that-impose-ban-israeli-passport-holders-1907316" },
        { date: "2026", publisher: "Roya News", title: "13 countries ban Israeli passport holders", url: "https://en.royanews.tv/news/68533/13-countries-ban-'Israeli'-passport-holders" }
      ],
      alternatives: [], updated: "2026"
    },
    {
      travel: { entry: "permit", transit: "unknown",
                note: "לעיתים ניתנים אישורים מיוחדים למטרות עסקיות או דתיות. ההגבלה חלקית ולא מוחלטת." },
      id: "as-ban-saudi", name: "ערב הסעודית", aliases: ["Saudi Arabia"], type: "place",
      location: { country: "ערב הסעודית", region: "me", city: "" }, scope: "local",
      severity: 2, status: "verified",
      summary: "מגבילה כניסה לבעלי דרכון ישראלי, אך מהווה חריג חלקי: לעיתים ניתנים אישורים מיוחדים למטרות עסקיות או דתיות. ההגבלה חלקית ולכן מסווגת בדרגה נמוכה יותר מאיסור מוחלט.",
      tags: ["אפליה", "דרכון", "הגבלת כניסה"],
      sources: [
        { date: "2024", publisher: "Newsweek", title: "Map Shows Countries with Bans on Israeli Passport Holders", url: "https://www.newsweek.com/map-countries-that-impose-ban-israeli-passport-holders-1907316" },
        { date: "2026", publisher: "Factually", title: "Which Countries Ban Entry to Israeli Passport Holders (2026)", url: "https://factually.co/fact-checks/politics/countries-banning-israel-entry-list-2026-780e31" }
      ],
      alternatives: [], updated: "2026"
    },
    {
      travel: { entry: "banned", transit: "unknown" }, id: "as-ban-algeria", name: "אלג׳יריה", aliases: ["Algeria"], type: "place",
      location: { country: "אלג׳יריה", region: "africa", city: "" }, scope: "local",
      severity: 3, status: "verified",
      summary: "אוסרת כניסה לבעלי דרכון ישראלי.",
      tags: ["אפליה", "דרכון", "הגבלת כניסה"],
      sources: [
        { date: "2024", publisher: "Newsweek", title: "Map Shows Countries with Bans on Israeli Passport Holders", url: "https://www.newsweek.com/map-countries-that-impose-ban-israeli-passport-holders-1907316" },
        { date: "2026", publisher: "Roya News", title: "13 countries ban Israeli passport holders", url: "https://en.royanews.tv/news/68533/13-countries-ban-'Israeli'-passport-holders" }
      ],
      alternatives: [], updated: "2026"
    },
    {
      travel: { entry: "banned", transit: "unknown" }, id: "as-ban-libya", name: "לוב", aliases: ["Libya"], type: "place",
      location: { country: "לוב", region: "africa", city: "" }, scope: "local",
      severity: 3, status: "verified",
      summary: "אוסרת כניסה לבעלי דרכון ישראלי.",
      tags: ["אפליה", "דרכון", "הגבלת כניסה"],
      sources: [
        { date: "2024", publisher: "Newsweek", title: "Map Shows Countries with Bans on Israeli Passport Holders", url: "https://www.newsweek.com/map-countries-that-impose-ban-israeli-passport-holders-1907316" },
        { date: "2026", publisher: "Roya News", title: "13 countries ban Israeli passport holders", url: "https://en.royanews.tv/news/68533/13-countries-ban-'Israeli'-passport-holders" }
      ],
      alternatives: [], updated: "2026"
    },
    {
      travel: { entry: "banned", transit: "unknown" }, id: "as-ban-pakistan", name: "פקיסטן", aliases: ["Pakistan"], type: "place",
      location: { country: "פקיסטן", region: "asia", city: "" }, scope: "local",
      severity: 3, status: "verified",
      summary: "אוסרת כניסה לבעלי דרכון ישראלי.",
      tags: ["אפליה", "דרכון", "הגבלת כניסה"],
      sources: [
        { date: "2024", publisher: "Newsweek", title: "Map Shows Countries with Bans on Israeli Passport Holders", url: "https://www.newsweek.com/map-countries-that-impose-ban-israeli-passport-holders-1907316" },
        { date: "2026", publisher: "Roya News", title: "13 countries ban Israeli passport holders", url: "https://en.royanews.tv/news/68533/13-countries-ban-'Israeli'-passport-holders" }
      ],
      alternatives: [], updated: "2026"
    },
    {
      travel: { entry: "banned", transit: "unknown" }, id: "as-ban-bangladesh", name: "בנגלדש", aliases: ["Bangladesh"], type: "place",
      location: { country: "בנגלדש", region: "asia", city: "" }, scope: "local",
      severity: 3, status: "verified",
      summary: "אוסרת כניסה לבעלי דרכון ישראלי.",
      tags: ["אפליה", "דרכון", "הגבלת כניסה"],
      sources: [
        { date: "2024", publisher: "Newsweek", title: "Map Shows Countries with Bans on Israeli Passport Holders", url: "https://www.newsweek.com/map-countries-that-impose-ban-israeli-passport-holders-1907316" },
        { date: "2026", publisher: "Roya News", title: "13 countries ban Israeli passport holders", url: "https://en.royanews.tv/news/68533/13-countries-ban-'Israeli'-passport-holders" }
      ],
      alternatives: [], updated: "2026"
    },
    {
      travel: { entry: "banned", transit: "unknown" }, id: "as-ban-brunei", name: "ברוניי", aliases: ["Brunei"], type: "place",
      location: { country: "ברוניי", region: "asia", city: "" }, scope: "local",
      severity: 3, status: "verified",
      summary: "אוסרת כניסה לבעלי דרכון ישראלי.",
      tags: ["אפליה", "דרכון", "הגבלת כניסה"],
      sources: [
        { date: "2024", publisher: "Newsweek", title: "Map Shows Countries with Bans on Israeli Passport Holders", url: "https://www.newsweek.com/map-countries-that-impose-ban-israeli-passport-holders-1907316" },
        { date: "2026", publisher: "Roya News", title: "13 countries ban Israeli passport holders", url: "https://en.royanews.tv/news/68533/13-countries-ban-'Israeli'-passport-holders" }
      ],
      alternatives: [], updated: "2026"
    },
    {
      travel: { entry: "banned", transit: "unknown" }, id: "as-ban-afghanistan", name: "אפגניסטן", aliases: ["Afghanistan"], type: "place",
      location: { country: "אפגניסטן", region: "asia", city: "" }, scope: "local",
      severity: 3, status: "verified",
      summary: "אוסרת כניסה לבעלי דרכון ישראלי.",
      tags: ["אפליה", "דרכון", "הגבלת כניסה"],
      sources: [
        { date: "2026", publisher: "Factually", title: "Which Countries Ban Entry to Israeli Passport Holders (2026)", url: "https://factually.co/fact-checks/politics/countries-banning-israel-entry-list-2026-780e31" },
        { date: "2026", publisher: "Roya News", title: "13 countries ban Israeli passport holders", url: "https://en.royanews.tv/news/68533/13-countries-ban-'Israeli'-passport-holders" }
      ],
      alternatives: [], updated: "2026"
    }

  ]
};
