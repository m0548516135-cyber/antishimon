/* =========================================================================
   אנטישימון — מקומות: מדינות וערים
   -------------------------------------------------------------------------
   השאלה כאן שונה מכל שאר המרשם. אצל חברה או אדם שואלים ״מה הם אמרו
   או החליטו״. אצל מקום שואלים ״כמה קרה שם, ולמי״.

   ── שני צירים, לא אחד ──────────────────────────────────────────────────

   `incidents` — מה שקורה מצד האוכלוסייה. מספר אירועים אנטישמיים
   מתועדים בשנה: תקיפות, גרפיטי, איומים, ונדליזם. זה המדד הבסיסי,
   והוא מגיע אך ורק ממנטרים רשמיים שמפרסמים מתודולוגיה — CST בבריטניה,
   SPCJ עם משרד הפנים הצרפתי, RIAS בגרמניה, ADL בארה״ב, ECAJ באוסטרליה,
   בני ברית בקנדה. אין כאן הערכה אחת שלנו.

   `official` — מה שהמוסד עצמו החליט. עירייה שניתקה קשרי ערים תאומות,
   מועצה שהצביעה על חרם, ממשלה שאסרה כניסה. זו החלטה מוצהרת ולא
   התנהגות של פרטים, ולכן היא מעלה את הדירוג — כפי שנקבע במפורש.

   ── למה שני הצירים לא מתערבבים ─────────────────────────────────────────

   עיר שבה 1,800 אירועים בשנה אינה ״עיר אנטישמית״ — היא עיר שבה יהודים
   סופגים 1,800 אירועים. ההבחנה הזו אינה משחק מילים: היא ההבדל בין
   ״אל תיסע ללונדון״ לבין ״בלונדון יש בעיה שהרשויות מודדות ומדווחות״.
   דווקא המדינות עם המספרים הגבוהים הן אלה שסופרות; מדינה בלי מספר כאן
   היא לרוב מדינה בלי גוף שמנטר, לא מדינה בלי אנטישמיות.

   ── נורמליזציה ─────────────────────────────────────────────────────────

   `per10k` הוא אירועים לכל 10,000 יהודים באותו מקום. בלעדיו ארצות
   הברית תמיד תוביל כי יש בה הכי הרבה יהודים, וזה לא אומר דבר. עם זה
   מתקבלת שאלה אחרת ונכונה יותר: כמה סיכוי שזה יקרה למי שחי שם.
   הערכות האוכלוסייה הן מ-Jewish Data Bank / DellaPergola ומעוגלות.
   ========================================================================= */

window.ANTISHIMON_PLACES = {

  /* מקורות הניטור — מוגדרים פעם אחת ומשויכים לרשומות */
  monitors: {
    cst:  { name: "CST", full: "Community Security Trust", country: "בריטניה",
            url: "https://cst.org.uk/research/cst-publications/antisemitic-incidents-report-2025" },
    spcj: { name: "SPCJ", full: "Service de Protection de la Communauté Juive", country: "צרפת",
            url: "https://www.spcj.org/antisemitisme/chiffres-de-l-antisemitisme-2025" },
    rias: { name: "RIAS", full: "Bundesverband RIAS", country: "גרמניה",
            url: "https://report-antisemitism.de/documents/17-06-26_RIAS_Bund_Jahresbericht_2025.pdf" },
    adl:  { name: "ADL", full: "Anti-Defamation League", country: "ארצות הברית",
            url: "https://www.adl.org/resources/report/audit-antisemitic-incidents-2025" },
    ecaj: { name: "ECAJ", full: "Executive Council of Australian Jewry", country: "אוסטרליה",
            url: "https://www.ecaj.org.au/wordpress/wp-content/uploads/ECAJ-Report-Anti-Jewish-Incidents-Australia-2025.pdf" },
    bnai: { name: "B'nai Brith", full: "B'nai Brith Canada", country: "קנדה",
            url: "https://bnaibrith.ca/bnai-brith-canada-special-report-a-national-crisis-of-antisemitism/" }
  },

  entries: [

    /* ══════════ בריטניה ══════════ */
    {
      id: "pl-uk", name: "בריטניה", aliases: ["United Kingdom", "UK"],
      type: "place", actor: "individual", scope: "local",
      location: { country: "בריטניה", region: "eu", city: "" },
      severity: 4, status: "verified",
      incidents: { n: 3700, year: 2025, jews: 290000, monitor: "cst",
                   prev: 3556, peak: 4298, peakYear: 2023, assaults: 202 },
      official: null,
      summary: "CST תיעד 3,700 אירועים אנטישמיים בבריטניה ב-2025 — הסכום השנתי השני בגובהו אי פעם, עלייה של 4% מ-3,556 ב-2024, ונמוך ב-14% מהשיא של 4,298 ב-2023. ב-2 באוקטובר 2025, ביום כיפור, נהג תוקף לתוך מתפללים בבית הכנסת ״היטון פארק״ במנצ׳סטר ודקר אותם; מלווין קרביץ ואדריאן דולבי נרצחו. האירוע הוגדר פיגוע טרור, וראש הממשלה קיר סטארמר אמר שהתוקף פגע ״ביהודים משום שהם יהודים״.",
      summaryEn: "CST recorded 3,700 antisemitic incidents in the UK in 2025 — the second-highest annual total ever, a 4% rise from 3,556 in 2024 and 14% below the record of 4,298 in 2023. On 2 October 2025, on Yom Kippur, an attacker drove into worshippers at the Heaton Park Hebrew Congregation synagogue in Manchester and stabbed them; Melvin Cravitz and Adrian Daulby were killed. The incident was declared a terrorist attack, and Prime Minister Keir Starmer said the attacker targeted \"Jews because they are Jews\".",
      tags: ["ניטור רשמי", "פיגוע", "אירועים"],
      sources: [
        { date: "2026-02-11", publisher: "CST", title: "Antisemitic Incidents Report 2025", url: "https://cst.org.uk/research/cst-publications/antisemitic-incidents-report-2025" },
        { date: "2025-10-02", publisher: "GOV.UK", title: "Manchester synagogue terror attack — statement", url: "https://www.gov.uk/government/speeches/manchester-synagogue-terror-attack-statement" },
        { date: "2026-02", publisher: "European Jewish Congress", title: "CST recorded 3,700 antisemitic incidents in the UK in 2025", url: "https://eurojewcong.org/news/communities-news/united-kingdom/cst-recorded-3700-antisemitic-incidents-in-the-uk-in-2025/" }
      ],
      updated: "2026-02-11"
    },
    {
      id: "pl-london", name: "לונדון", aliases: ["London", "Greater London"],
      type: "place", actor: "individual", scope: "local",
      location: { country: "בריטניה", region: "eu", city: "לונדון" },
      severity: 4, status: "verified",
      incidents: { n: 1844, year: 2025, jews: 145000, monitor: "cst", prev: 1863 },
      official: null,
      summary: "1,844 אירועים אנטישמיים תועדו בלונדון רבתי ב-2025, ירידה של 1% מ-1,863 ב-2024. לונדון ומנצ׳סטר יחד היוו 61% מכלל האירועים בבריטניה. לונדון היא ריכוז היהודים הגדול באירופה, ולכן גם המספר המוחלט וגם השיעור לנפש רלוונטיים.",
      summaryEn: "1,844 antisemitic incidents were recorded in Greater London in 2025, down 1% from 1,863 in 2024. London and Manchester together accounted for 61% of all incidents in the UK. London is the largest Jewish population centre in Europe, so both the absolute number and the per-capita rate matter.",
      tags: ["ניטור רשמי", "אירועים", "עיר"],
      sources: [
        { date: "2026-02-11", publisher: "CST", title: "Antisemitic Incidents Report 2025", url: "https://cst.org.uk/research/cst-publications/antisemitic-incidents-report-2025" },
        { date: "2026-02", publisher: "Jewish News", title: "2025 sees second highest annual figure for antisemitism in the UK", url: "https://www.jewishnews.co.uk/2025-sees-second-highest-annual-figure-for-antisemitism-in-the-uk-says-cst/" }
      ],
      updated: "2026-02-11"
    },
    {
      id: "pl-manchester", name: "מנצ׳סטר", aliases: ["Manchester", "Greater Manchester"],
      type: "place", actor: "individual", scope: "local",
      location: { country: "בריטניה", region: "eu", city: "מנצ׳סטר" },
      severity: 4, status: "verified",
      incidents: { n: 425, year: 2025, jews: 30000, monitor: "cst", prev: 480 },
      official: null,
      summary: "425 אירועים אנטישמיים תועדו במנצ׳סטר רבתי ב-2025, ירידה של 11% מ-480 ב-2024. בעיר אירע הפיגוע הקטלני ביותר נגד יהודים בבריטניה בשנים האחרונות: ב-2 באוקטובר 2025, ביום כיפור, תקף ג׳יהאד אל-שאמי מתפללים בבית הכנסת ״היטון פארק״ ברכב ובסכין. שני מתפללים נרצחו ושלושה נפצעו. המניע כלל אנטישמיות ואידאולוגיית דאעש.",
      summaryEn: "425 antisemitic incidents were recorded in Greater Manchester in 2025, down 11% from 480 in 2024. The city saw the deadliest attack on Jews in Britain in recent years: on 2 October 2025, on Yom Kippur, Jihad al-Shamie attacked worshippers at the Heaton Park Hebrew Congregation synagogue with a car and a knife. Two worshippers were killed and three injured. The motive included antisemitism and Islamic State ideology.",
      tags: ["ניטור רשמי", "פיגוע", "עיר"],
      sources: [
        { date: "2026-02-11", publisher: "CST", title: "Antisemitic Incidents Report 2025", url: "https://cst.org.uk/research/cst-publications/antisemitic-incidents-report-2025" },
        { date: "2025-10-02", publisher: "GOV.UK", title: "Manchester synagogue terror attack — statement", url: "https://www.gov.uk/government/speeches/manchester-synagogue-terror-attack-statement" },
        { date: "2025-10-02", publisher: "The Times of Israel", title: "Manchester survivors describe chaos of deadly Yom Kippur terror attack", url: "https://www.timesofisrael.com/shut-the-doors-manchester-survivors-recall-chaos-of-deadly-yom-kippur-terror-attack/" }
      ],
      updated: "2026-02-11"
    },
    {
      id: "pl-hackney", name: "האקני, לונדון", aliases: ["Hackney", "London Borough of Hackney"],
      type: "place", actor: "entity", scope: "local",
      location: { country: "בריטניה", region: "eu", city: "לונדון" },
      severity: 3, status: "verified",
      incidents: null,
      official: { kind: "twinning", body: "מועצת האקני", date: "2026-07" },
      summary: "מועצת הרובע האקני שבמזרח לונדון הצביעה ביולי 2026 על סיום הסכם הערים התאומות עם חיפה, לאחר 58 שנה. ראש הרובע מטעם מפלגת הירוקים התנצל לאחר שקצב לחיפה מועד אחרון להשיב — 7 באוקטובר, יום השנה לטבח. זו החלטה של המוסד הנבחר עצמו ולא התנהגות של תושבים, ולכן היא מדורגת בציר האחריות כהחלטת גוף.",
      summaryEn: "Hackney Council in east London voted in July 2026 to end its 58-year twinning agreement with Haifa. The Green Party mayor apologised after setting Haifa a response deadline of 7 October, the anniversary of the massacre. This is a decision by the elected institution itself rather than the conduct of residents, and is therefore classified on the responsibility axis as an entity decision.",
      tags: ["ערים תאומות", "עירייה", "החלטה רשמית"],
      sources: [
        { date: "2026-07-24", publisher: "Hackney Citizen", title: "Hackney moves to end six-decade twinning with Haifa amid antisemitism row", url: "https://www.hackneycitizen.co.uk/2026/07/24/hackney-moves-end-twinning-haifa/" },
        { date: "2026-07", publisher: "The Times of Israel", title: "London's Hackney council gives initial nod to end 58-year twin city deal with Haifa", url: "https://www.timesofisrael.com/londons-hackney-council-gives-initial-nod-to-end-58-year-twin-city-deal-with-haifa/" },
        { date: "2026-07", publisher: "The Jewish Chronicle", title: "Green Hackney mayor apologises for giving Haifa a deadline of October 7", url: "https://www.thejc.com/news/politics/green-hackney-mayor-apologises-for-giving-haifa-a-deadline-of-october-7-to-reply-to-plan-to-cut-twinning-ties-k6nif7uj" }
      ],
      updated: "2026-07-24"
    },

    /* ══════════ צרפת ══════════ */
    {
      id: "pl-france", name: "צרפת", aliases: ["France"],
      type: "place", actor: "individual", scope: "local",
      location: { country: "צרפת", region: "eu", city: "" },
      severity: 4, status: "verified",
      incidents: { n: 1320, year: 2025, jews: 440000, monitor: "spcj",
                   prev: 1570, peak: 1676, peakYear: 2023, assaults: 126 },
      official: null,
      summary: "משרד הפנים הצרפתי ו-SPCJ תיעדו 1,320 אירועים אנטישמיים ב-2025 — יותר מ-3.5 ליום. המספר יורד משיא 2023 (1,676) ומ-2024 (1,570), אך נותר גבוה פי שלושה מ-2022 (436). 2025 הייתה דווקא שנת שיא באלימות: 126 תקיפות פיזיות מול 108 בשנה הקודמת, עלייה של 19%. האירועים האנטישמיים הם 53% מכלל האירועים האנטי-דתיים בצרפת, בעוד היהודים הם פחות מ-1% מהאוכלוסייה. SPCJ מציין ״רטוריקה אנטי-ישראלית״ בכשליש מהאירועים.",
      summaryEn: "The French Interior Ministry and SPCJ recorded 1,320 antisemitic incidents in 2025 — more than 3.5 a day. The figure is down from the 2023 peak (1,676) and from 2024 (1,570), but remains three times the 2022 level (436). 2025 was in fact a record year for violence: 126 physical assaults against 108 the previous year, a 19% rise. Antisemitic incidents make up 53% of all anti-religious incidents in France, while Jews are under 1% of the population. SPCJ notes \"anti-Israel rhetoric\" in close to a third of incidents.",
      tags: ["ניטור רשמי", "אירועים", "תקיפות"],
      sources: [
        { date: "2026-02-12", publisher: "SPCJ", title: "Les chiffres de l'antisémitisme en France en 2025", url: "https://www.spcj.org/antisemitisme/chiffres-de-l-antisemitisme-2025" },
        { date: "2026-02-12", publisher: "CRIF", title: "Les chiffres de l'antisémitisme en France en 2025 : un enracinement de la haine antijuive", url: "https://www.crif.org/articles/actualites/2026-02-12/les-chiffres-de-lantisemitisme-en-france-en-2025-un-enracinement-de-la-haine-antijuive/" },
        { date: "2026-02", publisher: "i24NEWS", title: "France : 1 320 actes antisémites ont été recensés en 2025", url: "https://www.i24news.tv/fr/actu/france/artc-france-1-320-actes-antisemites-ont-ete-recenses-en-2025" }
      ],
      updated: "2026-02-12"
    },

    {
      id: "pl-paris", name: "פריז", aliases: ["Paris", "Île-de-France"],
      type: "place", actor: "individual", scope: "local",
      location: { country: "צרפת", region: "eu", city: "פריז" },
      severity: 4, status: "verified",
      /* SPCJ ומשרד הפנים אינם מפרסמים פילוח עירוני, ולכן אין כאן מספר
         שנתי. המצאת מספר לפריז רק כדי שהיא תדורג גבוה הייתה הופכת את
         כל הטבלה לחסרת ערך. הדירוג שלה נגזר מהאירועים המתועדים עצמם. */
      incidents: null,
      official: null,
      summary: "אזור פריז מרכז את הקהילה היהודית הגדולה באירופה, ובו אירעו הרציחות האנטישמיות שעיצבו את השיח בצרפת. שרה הלימי נרצחה באפריל 2017 בדירתה ברובע ה-11 בידי קובילי טראורה, שקרא ״אללה אכבר״; בית המשפט לערעורים קבע באפריל 2021 שאינו בר-עונשין בשל פסיכוזה, אך האופי האנטישמי של המעשה הוכר. מירֵיי קנול, ניצולת שואה בת 85, נרצחה במרץ 2018 באותו רובע; בנובמבר 2021 נגזרו על יאסין מיהוב מאסר עולם ועל אלכס קרימבאקוס 15 שנה, עם נסיבות מחמירות של מניע אנטישמי. באוקטובר 2023 רוססו כ-250 מגני דוד כחולים על בנייני מגורים בפריז ובפרווריה; חקירת הפרקליטות הצרפתית קשרה את המבצעים לרשת שהופעלה מרוסיה. **הערה על נתונים:** SPCJ ומשרד הפנים מפרסמים נתון ארצי בלבד ואינם מפרסמים פילוח לפי עיר, ולכן אין כאן מספר שנתי לפריז.",
      summaryEn: "The Paris region holds the largest Jewish community in Europe, and is where the antisemitic murders that shaped the French debate took place. Sarah Halimi was killed in April 2017 in her flat in the 11th arrondissement by Kobili Traoré, who shouted \"Allahu Akbar\"; the Court of Cassation ruled in April 2021 that he was not criminally responsible owing to psychosis, but the antisemitic character of the act was recognised. Mireille Knoll, an 85-year-old Holocaust survivor, was murdered in March 2018 in the same arrondissement; in November 2021 Yacine Mihoub was sentenced to life and Alex Carrimbacus to 15 years, with the antisemitic motive retained as an aggravating circumstance. In October 2023 roughly 250 blue Stars of David were stencilled on residential buildings in Paris and its suburbs; the French prosecution's investigation linked those responsible to a network run from Russia. **Note on data:** SPCJ and the Interior Ministry publish a national figure only and do not break it down by city, so there is no annual figure for Paris here.",
      tags: ["רצח", "הרשעה פלילית", "עיר", "גרפיטי"],
      sources: [
        { date: "2021-04-14", publisher: "BBC News", title: "Sarah Halimi: Court rules killer of Jewish woman not criminally responsible", url: "https://www.bbc.com/news/world-europe-56747239" },
        { date: "2021-11-10", publisher: "The Times of Israel", title: "French court hands life sentence in murder of Holocaust survivor Mireille Knoll", url: "https://www.timesofisrael.com/french-court-hands-life-sentence-in-murder-of-holocaust-survivor-mireille-knoll/" },
        { date: "2026-02-12", publisher: "SPCJ", title: "Les chiffres de l'antisémitisme en France en 2025", url: "https://www.spcj.org/antisemitisme/chiffres-de-l-antisemitisme-2025" }
      ],
      updated: "2026-02-12"
    },

    /* ══════════ גרמניה ══════════ */
    {
      id: "pl-germany", name: "גרמניה", aliases: ["Germany", "Deutschland"],
      type: "place", actor: "individual", scope: "local",
      location: { country: "גרמניה", region: "eu", city: "" },
      severity: 4, status: "verified",
      incidents: { n: 8725, year: 2025, jews: 125000, monitor: "rias",
                   prev: 8713, assaults: 178 },
      official: null,
      summary: "RIAS תיעד 8,725 אירועים אנטישמיים בגרמניה ב-2025 — ממוצע של 24 ליום, ומעל 8,713 של 2024. מול 2,610 ב-2022 המספר יותר מהשלישׁ את עצמו. הדוח מונה בנפרד 178 תקיפות ו-257 איומים, ו-807 אירועים בסיווג ימין קיצוני — הגבוה ביותר מאז ש-RIAS החל להפריד את הקטגוריה ב-2020. כשני שלישים מהאירועים קשורים לאנטישמיות בהקשר ישראלי. 27% מהאירועים תועדו במרחב הדיגיטלי, מול 23% בשנה הקודמת.",
      summaryEn: "RIAS recorded 8,725 antisemitic incidents in Germany in 2025 — an average of 24 a day, and above the 8,713 of 2024. Against 2,610 in 2022 the figure has more than tripled. The report counts separately 178 attacks and 257 threats, and 807 incidents classified as far-right — the highest since RIAS began separating that category in 2020. About two-thirds of incidents relate to Israel-related antisemitism. 27% were documented online, against 23% the previous year.",
      tags: ["ניטור רשמי", "אירועים", "ימין קיצוני"],
      sources: [
        { date: "2026-06-17", publisher: "RIAS", title: "Antisemitische Vorfälle in Deutschland — Jahresbericht 2025", url: "https://report-antisemitism.de/documents/17-06-26_RIAS_Bund_Jahresbericht_2025.pdf" },
        { date: "2026-06", publisher: "ZDF", title: "Antisemitismus in Deutschland: 2025 mehr als 8.700 Vorfälle", url: "https://www.zdfheute.de/politik/deutschland/antisemitismus-juden-israel-hasskriminalitaet-bericht-rias-100.html" }
      ],
      updated: "2026-06-17"
    },

    /* ══════════ ארצות הברית ══════════ */
    {
      id: "pl-usa", name: "ארצות הברית", aliases: ["United States", "USA"],
      type: "place", actor: "individual", scope: "local",
      location: { country: "ארצות הברית", region: "na", city: "" },
      severity: 4, status: "verified",
      incidents: { n: 6274, year: 2025, jews: 6000000, monitor: "adl",
                   prev: 9354, peak: 9354, peakYear: 2024 },
      official: null,
      summary: "ADL תיעד 6,274 אירועים אנטישמיים בארצות הברית ב-2025, ירידה של 33% מ-9,354 ב-2024. זו עדיין השנה השלישית בגובהה מאז שה-ADL החל למדוד ב-1979. למרות הירידה הכוללת, התקיפות הפיזיות הגיעו לשיא של כל הזמנים. מדינת ניו יורק הובילה עם 1,160 אירועים, קליפורניה 817 וניו ג׳רזי 687.",
      summaryEn: "ADL recorded 6,274 antisemitic incidents in the United States in 2025, a 33% drop from 9,354 in 2024. It remains the third-highest year since ADL began tracking in 1979. Despite the overall decline, physical assaults reached an all-time high. New York State led with 1,160 incidents, California 817 and New Jersey 687.",
      tags: ["ניטור רשמי", "אירועים", "תקיפות"],
      sources: [
        { date: "2026-05-06", publisher: "ADL", title: "Audit of Antisemitic Incidents 2025", url: "https://www.adl.org/resources/report/audit-antisemitic-incidents-2025" },
        { date: "2026-05-06", publisher: "JTA", title: "ADL says antisemitic incidents dropped by a third in 2025, but assaults reached record levels", url: "https://www.jta.org/2026/05/06/default/adl-says-antisemitic-incidents-dropped-by-a-third-in-2025-but-assaults-reached-record-levels" }
      ],
      updated: "2026-05-06"
    },
    {
      id: "pl-newyork", name: "מדינת ניו יורק", aliases: ["New York State", "New York"],
      type: "place", actor: "individual", scope: "local",
      location: { country: "ארצות הברית", region: "na", city: "ניו יורק" },
      severity: 4, status: "verified",
      incidents: { n: 1160, year: 2025, jews: 1770000, monitor: "adl" },
      official: null,
      summary: "1,160 אירועים אנטישמיים תועדו במדינת ניו יורק ב-2025 — המספר הגבוה בארצות הברית, כ-18% מכלל האירועים בארץ. ניו יורק היא ריכוז היהודים הגדול בעולם מחוץ לישראל, ורוב האירועים מרוכזים בעיר עצמה. בתביעה נגד פורץ מטה חב״ד בקראון הייטס צוין ש-80 מתוך 146 אירועי פשע שנאה בעיר מתחילת אותה שנה כוונו נגד יהודים ומוסדות יהודיים.",
      summaryEn: "1,160 antisemitic incidents were recorded in New York State in 2025 — the highest in the United States, about 18% of the national total. New York is the largest Jewish population centre outside Israel, and most incidents are concentrated in the city itself. In the prosecution of the man who rammed Chabad headquarters in Crown Heights, it was noted that 80 of 146 hate-crime incidents in the city since the start of that year had targeted Jews and Jewish institutions.",
      tags: ["ניטור רשמי", "אירועים", "פשע שנאה"],
      sources: [
        { date: "2026-05-06", publisher: "ADL", title: "Audit of Antisemitic Incidents 2025", url: "https://www.adl.org/resources/report/audit-antisemitic-incidents-2025" },
        { date: "2026-05-06", publisher: "CBS New York", title: "Top spots for antisemitic incidents in 2025 included New York and New Jersey, ADL says", url: "https://www.cbsnews.com/newyork/news/2025-adl-audit-of-antisemitic-incidents/" }
      ],
      updated: "2026-05-06"
    },
    {
      id: "pl-california", name: "קליפורניה", aliases: ["California"],
      type: "place", actor: "individual", scope: "local",
      location: { country: "ארצות הברית", region: "na", city: "לוס אנג׳לס" },
      severity: 3, status: "verified",
      incidents: { n: 817, year: 2025, jews: 1200000, monitor: "adl" },
      official: null,
      summary: "817 אירועים אנטישמיים תועדו בקליפורניה ב-2025 — המספר השני בגובהו בארצות הברית אחרי מדינת ניו יורק.",
      summaryEn: "817 antisemitic incidents were recorded in California in 2025 — the second-highest figure in the United States after New York State.",
      tags: ["ניטור רשמי", "אירועים"],
      sources: [
        { date: "2026-05-06", publisher: "ADL", title: "Audit of Antisemitic Incidents 2025", url: "https://www.adl.org/resources/report/audit-antisemitic-incidents-2025" }
      ],
      updated: "2026-05-06"
    },
    {
      id: "pl-newjersey", name: "ניו ג׳רזי", aliases: ["New Jersey"],
      type: "place", actor: "individual", scope: "local",
      location: { country: "ארצות הברית", region: "na", city: "" },
      severity: 4, status: "verified",
      incidents: { n: 687, year: 2025, jews: 545000, monitor: "adl" },
      official: null,
      summary: "687 אירועים אנטישמיים תועדו בניו ג׳רזי ב-2025 — השלישית בארצות הברית. ביחס לגודל האוכלוסייה היהודית זהו אחד השיעורים הגבוהים במדינה.",
      summaryEn: "687 antisemitic incidents were recorded in New Jersey in 2025 — the third-highest in the United States. Relative to the size of the Jewish population this is one of the highest rates in the country.",
      tags: ["ניטור רשמי", "אירועים"],
      sources: [
        { date: "2026-05-06", publisher: "ADL", title: "Audit of Antisemitic Incidents 2025", url: "https://www.adl.org/resources/report/audit-antisemitic-incidents-2025" },
        { date: "2026-05-06", publisher: "CBS New York", title: "Top spots for antisemitic incidents in 2025 included New York and New Jersey, ADL says", url: "https://www.cbsnews.com/newyork/news/2025-adl-audit-of-antisemitic-incidents/" }
      ],
      updated: "2026-05-06"
    },

    /* ══════════ קנדה ══════════ */
    {
      id: "pl-canada", name: "קנדה", aliases: ["Canada"],
      type: "place", actor: "individual", scope: "local",
      location: { country: "קנדה", region: "na", city: "" },
      severity: 4, status: "verified",
      incidents: { n: 6800, year: 2025, jews: 395000, monitor: "bnai", prev: 6216 },
      official: null,
      summary: "בני ברית קנדה תיעד 6,800 אירועים אנטישמיים ב-2025 — הנתון הגבוה ביותר מאז שהסקר החל ב-1982, עלייה של 9.4% מ-2024 ושל 145.6% מ-2022. הארגון הגדיר את המצב ״משבר לאומי״. אונטריו לבדה רשמה 3,194 אירועים — יותר מכלל האירועים בקנדה ב-2022. קוויבק רשמה 573, ירידה של 65% מהשנה הקודמת. רוב האירועים התרחשו ברשת.",
      summaryEn: "B'nai Brith Canada recorded 6,800 antisemitic incidents in 2025 — the highest figure since the audit began in 1982, a 9.4% rise from 2024 and 145.6% from 2022. The organisation described the situation as a \"national crisis\". Ontario alone logged 3,194 incidents — more than all incidents in Canada in 2022. Quebec logged 573, a 65% drop from the previous year. Most incidents occurred online.",
      tags: ["ניטור רשמי", "אירועים"],
      sources: [
        { date: "2026", publisher: "B'nai Brith Canada", title: "Special Report: A National Crisis of Antisemitism", url: "https://bnaibrith.ca/bnai-brith-canada-special-report-a-national-crisis-of-antisemitism/" },
        { date: "2026", publisher: "The CJN", title: "Record number of antisemitic incidents reported in Canada last year reflect a 'national crisis'", url: "https://thecjn.ca/news/record-number-of-antisemitic-incidents-reported-in-canada-last-year-reflect-a-national-crisis-bnai-brith/" }
      ],
      updated: "2026-05-01"
    },
    {
      id: "pl-ontario", name: "אונטריו", aliases: ["Ontario", "Toronto"],
      type: "place", actor: "individual", scope: "local",
      location: { country: "קנדה", region: "na", city: "טורונטו" },
      severity: 4, status: "verified",
      incidents: { n: 3194, year: 2025, jews: 230000, monitor: "bnai" },
      official: null,
      summary: "3,194 אירועים אנטישמיים תועדו באונטריו ב-2025 — כמחצית מכלל האירועים בקנדה, ויותר מכל האירועים שנרשמו בקנדה כולה ב-2022. מרבית הקהילה היהודית באונטריו מרוכזת באזור טורונטו.",
      summaryEn: "3,194 antisemitic incidents were recorded in Ontario in 2025 — roughly half of all incidents in Canada, and more than were recorded in the whole of Canada in 2022. Most of Ontario's Jewish community is concentrated in the Toronto area.",
      tags: ["ניטור רשמי", "אירועים"],
      sources: [
        { date: "2026", publisher: "B'nai Brith Canada", title: "Special Report: A National Crisis of Antisemitism", url: "https://bnaibrith.ca/bnai-brith-canada-special-report-a-national-crisis-of-antisemitism/" }
      ],
      updated: "2026-05-01"
    },

    /* ══════════ אוסטרליה ══════════ */
    {
      id: "pl-australia", name: "אוסטרליה", aliases: ["Australia"],
      type: "place", actor: "individual", scope: "local",
      location: { country: "אוסטרליה", region: "oceania", city: "" },
      severity: 4, status: "verified",
      incidents: { n: 1654, year: 2025, jews: 118000, monitor: "ecaj",
                   prev: 2062, assaults: 24 },
      official: null,
      summary: "ECAJ תיעד 1,654 אירועים אנטישמיים באוסטרליה בין 1 באוקטובר 2024 ל-30 בספטמבר 2025, לאחר 2,062 בשנה שקדמה לה — יותר מפי שלושה מהרמה שלפני 7 באוקטובר. הפילוח: 621 מקרי התעללות מילולית, 379 כרזות ומדבקות, 359 גרפיטי, 238 מסרים, 33 ונדליזם ו-24 תקיפות פיזיות. ב-2025 עלה מספר ההצתות והוונדליזם, ובאוגוסט 2025 אישרו הממשלה הפדרלית ו-ASIO קשר ישיר בין משטר איראן, דרך משמרות המהפכה, לבין ההצתות בבית הכנסת אדס במלבורן ובמסעדת לואיס בסידני.",
      summaryEn: "ECAJ recorded 1,654 antisemitic incidents in Australia between 1 October 2024 and 30 September 2025, following 2,062 the year before — more than triple the pre-7 October level. The breakdown: 621 cases of verbal abuse, 379 posters and stickers, 359 graffiti, 238 messages, 33 vandalism and 24 physical assaults. Arson and vandalism rose in 2025, and in August 2025 the federal government and ASIO confirmed a direct link between the Iranian regime, acting through the IRGC, and the arson attacks on the Adass Israel synagogue in Melbourne and Lewis's Continental Kitchen in Sydney.",
      tags: ["ניטור רשמי", "אירועים", "הצתה", "טרור"],
      sources: [
        { date: "2025-11", publisher: "ECAJ", title: "Report on Anti-Jewish Incidents in Australia 2025", url: "https://www.ecaj.org.au/wordpress/wp-content/uploads/ECAJ-Report-Anti-Jewish-Incidents-Australia-2025.pdf" },
        { date: "2025-11", publisher: "The Jewish Independent", title: "ECAJ Report: Anti-Jewish Incidents Remain High", url: "https://thejewishindependent.com.au/anti-jewish-incidents-australia-2025/" },
        { date: "2026", publisher: "AJC", title: "Antisemitism in Australia: A Timeline", url: "https://www.ajc.org/news/antisemitism-in-australia-a-timeline" }
      ],
      updated: "2025-11-30"
    },
    {
      id: "pl-melbourne", name: "מלבורן", aliases: ["Melbourne"],
      type: "place", actor: "individual", scope: "local",
      location: { country: "אוסטרליה", region: "oceania", city: "מלבורן" },
      severity: 4, status: "verified",
      incidents: null,
      official: null,
      summary: "בדצמבר 2024 הוצת בית הכנסת אדס ישראל במלבורן — אחד האירועים החמורים ביותר נגד יהודים באוסטרליה. באוגוסט 2025 אישרו הממשלה הפדרלית ו-ASIO שנקבע קשר חיובי בין משטר איראן, הפועל דרך משמרות המהפכה, לבין ההצתה הזו ובין הצתת מסעדת לואיס בסידני, וככל הנראה גם חלק מהתקיפות האנטישמיות האחרות.",
      summaryEn: "In December 2024 the Adass Israel synagogue in Melbourne was firebombed — one of the most serious attacks on Jews in Australia. In August 2025 the federal government and ASIO confirmed a positive link between the Iranian regime, acting through the IRGC, and this arson and the arson at Lewis's Continental Kitchen in Sydney, and most likely some of the other antisemitic attacks.",
      tags: ["הצתה", "טרור", "עיר", "בית כנסת"],
      sources: [
        { date: "2025-08", publisher: "ECAJ", title: "Report on Anti-Jewish Incidents in Australia 2025", url: "https://www.ecaj.org.au/wordpress/wp-content/uploads/ECAJ-Report-Anti-Jewish-Incidents-Australia-2025.pdf" },
        { date: "2026", publisher: "AJC", title: "Antisemitism in Australia: A Timeline", url: "https://www.ajc.org/news/antisemitism-in-australia-a-timeline" }
      ],
      updated: "2025-11-30"
    },
    {
      id: "pl-sydney", name: "סידני", aliases: ["Sydney"],
      type: "place", actor: "individual", scope: "local",
      location: { country: "אוסטרליה", region: "oceania", city: "סידני" },
      severity: 4, status: "verified",
      incidents: null,
      official: null,
      summary: "באוקטובר 2024 הוצתה מסעדת לואיס קונטיננטל קיצ׳ן בבונדיי. בין האירועים בעיר: עשרה צלבי קרס והאות Z שרוססו על גדר בית כנסת, ורגל חזיר שהושלכה לתוך עסק כשר ויהודי מזוהה. באוגוסט 2025 אישרו הממשלה הפדרלית ו-ASIO קשר בין משמרות המהפכה האיראניים לבין ההצתה.",
      summaryEn: "In October 2024 Lewis's Continental Kitchen in Bondi was firebombed. Incidents in the city include ten swastikas and the letter Z sprayed on a synagogue fence, and a pig's leg thrown into an identifiably kosher and Jewish business. In August 2025 the federal government and ASIO confirmed a link between the Iranian Revolutionary Guard and the arson.",
      tags: ["הצתה", "טרור", "עיר"],
      sources: [
        { date: "2025-11", publisher: "ECAJ", title: "Report on Anti-Jewish Incidents in Australia 2025", url: "https://www.ecaj.org.au/wordpress/wp-content/uploads/ECAJ-Report-Anti-Jewish-Incidents-Australia-2025.pdf" },
        { date: "2026", publisher: "AJC", title: "Antisemitism in Australia: A Timeline", url: "https://www.ajc.org/news/antisemitism-in-australia-a-timeline" }
      ],
      updated: "2025-11-30"
    },

    /* ══════════ הולנד ══════════ */
    {
      id: "pl-amsterdam", name: "אמסטרדם", aliases: ["Amsterdam"],
      type: "place", actor: "individual", scope: "local",
      location: { country: "הולנד", region: "eu", city: "אמסטרדם" },
      severity: 4, status: "verified",
      incidents: null,
      official: null,
      summary: "בין 6 ל-8 בנובמבר 2024, סביב משחק הליגה האירופית בין מכבי תל אביב לאיאקס, תקפו קבוצות על קטנועים אוהדים ישראלים ברחבי אמסטרדם. ראשת העיר פמקה הלסמה תיארה תקיפות ״פגע וברח״ שבהן חיפשו התוקפים אוהדי מכבי. שבעה אנשים אושפזו, כ-20–30 נפצעו קל, ו-62 נעצרו. הפרקליטות אישרה שהתוקפים תיאמו את תנועותיהם בקבוצות ווטסאפ וטלגרם ובהן ההתייחסות ל״ציד יהודים״. **לשם דיוק:** בערב שקדם למשחק תועדו אוהדי מכבי תולשים דגלי פלסטין, קוראים קריאות גזעניות נגד ערבים ומשחיתים רכוש. שני הדברים קרו, ושניהם מתועדים כאן.",
      summaryEn: "Between 6 and 8 November 2024, around the Europa League match between Maccabi Tel Aviv and Ajax, groups on scooters attacked Israeli fans across Amsterdam. Mayor Femke Halsema described \"hit-and-run\" attacks in which assailants searched the city for Maccabi supporters. Seven people were hospitalised, some 20–30 lightly injured, and 62 arrested. The public prosecutor confirmed that attackers coordinated their movements in WhatsApp and Telegram groups referring to a \"Jew hunt\". **For accuracy:** on the evening before the match, Maccabi fans were filmed pulling down Palestinian flags, chanting racist anti-Arab slogans and damaging property. Both happened, and both are recorded here.",
      tags: ["תקיפה", "עיר", "כדורגל"],
      sources: [
        { date: "2024-11-07", publisher: "CNN", title: "Amsterdam bans protests for three days following violent attacks on Israeli soccer fans", url: "https://www.cnn.com/2024/11/07/europe/israel-soccer-fans-attacked-amsterdam-intl-hnk/index.html" },
        { date: "2024-11", publisher: "Wikipedia", title: "November 2024 Amsterdam riots", url: "https://en.wikipedia.org/wiki/November_2024_Amsterdam_riots" }
      ],
      updated: "2025-12-07"
    },

    /* ══════════ ספרד ══════════ */
    {
      id: "pl-barcelona", name: "ברצלונה", aliases: ["Barcelona"],
      type: "place", actor: "entity", scope: "local",
      location: { country: "ספרד", region: "eu", city: "ברצלונה" },
      severity: 3, status: "verified",
      incidents: null,
      official: { kind: "ties", body: "מועצת העיר ברצלונה", date: "2025-05-30" },
      summary: "מועצת העיר ברצלונה הצביעה ב-30 במאי 2025 על ניתוק היחסים הרשמיים עם ממשלת ישראל והשעיית הסכם הידידות עם תל אביב משנת 1998. ראש העיר ז׳אומה קולבוני אמר בישיבה שהסבל וההרג בעזה ״הופכים כל קשר לבלתי אפשרי״. זו ההחלטה השנייה מסוגה בעיר: ראשת העיר הקודמת אדה קולאו ניתקה יחסים בפברואר 2023, וההחלטה בוטלה בהמשך אותה שנה.",
      summaryEn: "Barcelona city council voted on 30 May 2025 to sever official relations with the Israeli government and suspend its 1998 friendship agreement with Tel Aviv. Mayor Jaume Collboni told the session that the suffering and death in Gaza \"make any relationship unviable\". This is the city's second such decision: former mayor Ada Colau cut ties in February 2023, and that decision was reversed later the same year.",
      tags: ["ערים תאומות", "עירייה", "החלטה רשמית"],
      sources: [
        { date: "2025-05-30", publisher: "Catalan News", title: "Barcelona 'breaks' Israel relations until human rights are respected in Gaza", url: "https://www.catalannews.com/politics/item/barcelona-city-council-israel-relations-break-human-rights-gaza-30-may-2025" },
        { date: "2025-05-31", publisher: "The National", title: "Barcelona cuts twin-city ties with Tel Aviv over Gaza war", url: "https://www.thenationalnews.com/news/mena/2025/05/31/barcelona-cuts-twin-city-ties-with-tel-aviv-over-gaza-war/" },
        { date: "2025-06", publisher: "The Times of Israel", title: "Barcelona ends 'friendship agreement' with Tel Aviv over Gaza war", url: "https://www.timesofisrael.com/barcelona-ends-friendship-agreement-with-tel-aviv-over-gaza-war/" }
      ],
      updated: "2025-05-31"
    },

    /* ══════════ נורווגיה ══════════ */
    {
      id: "pl-oslo", name: "אוסלו", aliases: ["Oslo"],
      type: "place", actor: "entity", scope: "local",
      location: { country: "נורווגיה", region: "eu", city: "אוסלו" },
      severity: 2, status: "verified",
      incidents: null,
      official: { kind: "procurement", body: "מועצת העיר אוסלו", date: "2023-04" },
      summary: "מועצת העיר אוסלו הודיעה שלא תסחר בסחורות ובשירותים המיוצרים בשטחים שנכבשו בניגוד למשפט הבינלאומי, ומדיניות הרכש שלה מחריגה חברות שתורמות במישרין או בעקיפין להתנחלויות. ההחלטה ממוקדת בשטחים ואינה חרם על ישראל, ולכן היא מסווגת כעמדה מדינית ולא כחרם.",
      summaryEn: "Oslo city council announced that it will not trade in goods and services produced in territories occupied in breach of international law, and its procurement policy excludes companies that contribute directly or indirectly to the settlements. The decision targets the territories and is not a boycott of Israel, and is therefore classified as a political position rather than a boycott.",
      tags: ["רכש ציבורי", "עירייה", "החלטה רשמית"],
      sources: [
        { date: "2023-04-26", publisher: "Middle East Monitor", title: "Norway's capital prohibits the import of goods produced in Israel settlements", url: "https://www.middleeastmonitor.com/20230426-norway-prohibits-the-import-of-goods-produced-in-israel-settlements/" }
      ],
      updated: "2023-04-26"
    },

    /* ══════════ אירלנד ══════════ */
    {
      id: "pl-dublin", name: "דבלין", aliases: ["Dublin"],
      type: "place", actor: "entity", scope: "local",
      location: { country: "אירלנד", region: "eu", city: "דבלין" },
      severity: 2, status: "verified",
      incidents: null,
      official: { kind: "twinning", body: "מועצת העיר דבלין", date: "2024" },
      summary: "מועצת העיר דבלין חתמה על הסכם ידידות עם רמאללה, וקראה לממשלת אירלנד להעביר את חוק השטחים הכבושים. המועצה לא ניתקה קשר עם עיר ישראלית — היא כרתה קשר עם עיר פלסטינית ותמכה בחקיקה. זו עמדה מדינית מוצהרת של גוף נבחר.",
      summaryEn: "Dublin City Council signed a friendship agreement with Ramallah, and called on the Irish government to pass the Occupied Territories Bill. The council did not cut ties with an Israeli city — it formed ties with a Palestinian one and backed legislation. This is a declared political position by an elected body.",
      tags: ["ערים תאומות", "עירייה", "חקיקה"],
      sources: [
        { date: "2024", publisher: "Anadolu Agency", title: "Irish capital Dublin twinned with Palestine's Ramallah", url: "https://www.aa.com.tr/en/europe/irish-capital-dublin-twinned-with-palestines-ramallah/3076591" },
        { date: "2024", publisher: "Irish Legal News", title: "Dublin City Council urges government to pass Israeli settlement law", url: "https://www.irishlegal.com/articles/dublin-city-council-urges-government-to-pass-israeli-settlement-law" }
      ],
      updated: "2024-12-01"
    },

    /* ══════════ צעדים ממלכתיים — ניתוק יחסים, סחר וחימוש ══════════ */
    {
      id: "pl-turkey", name: "טורקיה", aliases: ["Türkiye", "Turkey"],
      type: "place", actor: "entity", scope: "local",
      location: { country: "טורקיה", region: "me", city: "" },
      severity: 3, status: "verified",
      incidents: null,
      official: { kind: "trade", body: "משרד הסחר הטורקי", date: "2024-05-02" },
      summary: "משרד הסחר הטורקי הודיע ב-2 במאי 2024 על השעיה מלאה של כל הסחר עם ישראל — יבוא ויצוא — בהיקף של כ-6.8 מיליארד דולר בשנה, עד ש״ישראל תאפשר זרימה רציפה ומספקת של סיוע הומניטרי לעזה״. הצעד בא אחרי הגבלת יצוא של 54 מוצרים באפריל, והוא צעד הסחר החריף ביותר שנקטה מדינה כלשהי נגד ישראל מאז 7 באוקטובר.",
      summaryEn: "On 2 May 2024 Turkey's trade ministry announced a full suspension of all trade with Israel — imports and exports — worth about $6.8 billion a year, until \"Israel allows an uninterrupted and sufficient flow of humanitarian aid to Gaza\". The move followed an April export ban on 54 products, and is the most severe trade measure taken by any state against Israel since 7 October.",
      tags: ["סחר", "ממשל", "החלטה רשמית"],
      sources: [
        { date: "2024-05-03", publisher: "CNN Business", title: "Turkey halts trade with Israel over Gaza war", url: "https://www.cnn.com/2024/05/03/business/turkey-halts-israel-trade-gaza" },
        { date: "2024-05-02", publisher: "Bloomberg", title: "Turkey Confirms All Trade Halt With Israel Over War in Gaza", url: "https://www.bloomberg.com/news/articles/2024-05-02/turkey-halts-all-trade-with-israel-officials" },
        { date: "2024-05-03", publisher: "NPR", title: "Turkey halts all trade with Israel over military actions in Gaza", url: "https://www.npr.org/2024/05/03/1248863099/turkey-trade-israel-gaza" }
      ],
      updated: "2024-05-03"
    },
    {
      id: "pl-colombia", name: "קולומביה", aliases: ["Colombia"],
      type: "place", actor: "entity", scope: "local",
      location: { country: "קולומביה", region: "latam", city: "" },
      severity: 3, status: "verified",
      incidents: null,
      official: { kind: "ties", body: "ממשלת קולומביה", date: "2024-05-01" },
      summary: "הנשיא גוסטבו פטרו הכריז ב-1 במאי 2024 על ניתוק היחסים הדיפלומטיים עם ישראל, בנימוק שבראשה עומד ״נשיא רוצח-עם״ — המדינה השלישית באמריקה הלטינית שניתקה יחסים מאז 7 באוקטובר. באוגוסט 2024 נחתם צו 1047 האוסר יצוא פחם לישראל; קולומביה סיפקה למעלה מ-60% מהפחם שיובא לישראל ב-2023.",
      summaryEn: "On 1 May 2024 President Gustavo Petro announced Colombia was severing diplomatic relations with Israel, saying it is led by \"a genocidal president\" — the third Latin American country to cut ties since 7 October. In August 2024 Decree 1047 banned coal exports to Israel; Colombia supplied more than 60% of the coal imported by Israel in 2023.",
      tags: ["ניתוק יחסים", "סחר", "ממשל"],
      sources: [
        { date: "2024-05-01", publisher: "CNN", title: "Colombia to break diplomatic ties with Israel over actions in Gaza", url: "https://www.cnn.com/2024/05/01/world/colombia-breaks-diplomatic-ties-israel-intl-latam" },
        { date: "2024-08-19", publisher: "EY Global", title: "Colombia prohibits coal exports to Israel", url: "https://www.ey.com/en_gl/technical/tax-alerts/colombia-prohibits-coal-exports-to-israel" }
      ],
      updated: "2024-08-19"
    },
    {
      id: "pl-bolivia", name: "בוליביה", aliases: ["Bolivia"],
      type: "place", actor: "entity", scope: "local",
      location: { country: "בוליביה", region: "latam", city: "" },
      severity: 3, status: "verified",
      incidents: null,
      official: { kind: "ties", body: "ממשלת בוליביה", date: "2023-10-31" },
      summary: "בוליביה הייתה המדינה הראשונה באמריקה הלטינית שניתקה יחסים דיפלומטיים עם ישראל אחרי 7 באוקטובר — ב-31 באוקטובר 2023, בנימוק של ״המתקפה הישראלית האגרסיבית והבלתי מידתית בעזה״. זו הפעם השנייה: היא ניתקה יחסים גם ב-2009. בדצמבר 2025, תחת נשיא חדש, חודשו היחסים.",
      summaryEn: "Bolivia was the first Latin American country to sever diplomatic ties with Israel after 7 October — on 31 October 2023, citing \"the aggressive and disproportionate Israeli military offensive in Gaza\". It was the second time, after a 2009 break. In December 2025, under a new president, relations were restored.",
      tags: ["ניתוק יחסים", "ממשל", "תיקון"],
      sources: [
        { date: "2023-10-31", publisher: "Middle East Monitor", title: "Bolivia severs diplomatic ties with Israel, citing 'crimes against humanity'", url: "https://www.middleeastmonitor.com/20231031-bolivia-severs-diplomatic-ties-with-israel-citing-crimes-against-humanity/" },
        { date: "2025-12", publisher: "The Times of Israel", title: "Israel and Bolivia renew diplomatic ties after two years of rupture over Gaza war", url: "https://www.timesofisrael.com/israel-and-bolivia-renew-diplomatic-ties-after-two-years-of-rupture-over-gaza-war/" }
      ],
      updated: "2025-12-11"
    },
    {
      id: "pl-belize", name: "בליז", aliases: ["Belize"],
      type: "place", actor: "entity", scope: "local",
      location: { country: "בליז", region: "latam", city: "" },
      severity: 3, status: "verified",
      incidents: null,
      official: { kind: "ties", body: "ממשלת בליז", date: "2023-11-14" },
      summary: "בליז ניתקה יחסים דיפלומטיים עם ישראל ב-14 בנובמבר 2023, בנימוק שישראל לא נענתה לקריאות להפסקת אש ומנעה כניסת סיוע הומניטרי לעזה.",
      summaryEn: "Belize severed diplomatic relations with Israel on 14 November 2023, saying Israel had not heeded ceasefire calls and had prevented humanitarian aid from entering Gaza.",
      tags: ["ניתוק יחסים", "ממשל"],
      sources: [
        { date: "2023-11-15", publisher: "Forbes", title: "Belize Latest Cutting Diplomatic Ties With Israel", url: "https://www.forbes.com/sites/brianbushard/2023/11/15/belize-latest-cutting-diplomatic-ties-with-israel---joining-these-8-other-countries/" },
        { date: "2023-11-15", publisher: "Middle East Monitor", title: "Belize severs diplomatic relations with Israel", url: "https://www.middleeastmonitor.com/20231115-belize-severs-diplomatic-relations-with-israel/" }
      ],
      updated: "2023-11-15"
    },
    {
      id: "pl-nicaragua", name: "ניקרגואה", aliases: ["Nicaragua"],
      type: "place", actor: "entity", scope: "local",
      location: { country: "ניקרגואה", region: "latam", city: "" },
      severity: 3, status: "verified",
      incidents: null,
      official: { kind: "ties", body: "ממשלת ניקרגואה", date: "2024-10-11" },
      summary: "ניקרגואה הודיעה באוקטובר 2024 על ניתוק היחסים הדיפלומטיים עם ישראל, לאחר שהקונגרס שלה העביר החלטה המאשימה את ישראל ב״רצח עם״ בעזה. את ההודעה מסרה סגנית הנשיא רוסריו מורייו.",
      summaryEn: "In October 2024 Nicaragua announced it was breaking diplomatic relations with Israel, after its congress passed a resolution accusing Israel of \"genocide\" in Gaza. The announcement was made by Vice-President Rosario Murillo.",
      tags: ["ניתוק יחסים", "ממשל"],
      sources: [
        { date: "2024-10-12", publisher: "News On Air", title: "Nicaragua announces break in diplomatic relations with Israel", url: "https://www.newsonair.gov.in/nicaragua-announces-break-in-diplomatic-relations-with-israel" }
      ],
      updated: "2024-10-12"
    },
    {
      id: "pl-southafrica", name: "דרום אפריקה", aliases: ["South Africa"],
      type: "place", actor: "entity", scope: "global",
      location: { country: "דרום אפריקה", region: "africa", city: "" },
      severity: 3, status: "verified",
      incidents: null,
      official: { kind: "icj", body: "ממשלת דרום אפריקה", date: "2023-12-29" },
      summary: "דרום אפריקה הגישה ב-29 בדצמבר 2023 תביעה נגד ישראל בבית הדין הבינלאומי לצדק בהאג, בטענה להפרת אמנת מניעת רצח עם בעזה. ב-26 בינואר 2024 קבע בית הדין שיש לו סמכות לכאורה והורה על צעדים זמניים — בלי להכריע לגוף הטענה, הכרעה הצפויה להימשך שנים. ישראל דוחה את ההאשמה מכל וכל וטוענת לפעולה בהגנה עצמית נגד חמאס. 14 מדינות נוספות ביקשו להצטרף להליך.",
      summaryEn: "On 29 December 2023 South Africa filed a case against Israel at the International Court of Justice in The Hague, alleging violation of the Genocide Convention in Gaza. On 26 January 2024 the court found prima facie jurisdiction and ordered provisional measures — without ruling on the merits, a determination expected to take years. Israel rejects the accusation outright, saying it acts in self-defence against Hamas. Fourteen more states have sought to join the proceedings.",
      tags: ["ממשל", "עמדה מדינית", "החלטה רשמית"],
      sources: [
        { date: "2023-12-29", publisher: "ICJ / UN", title: "South Africa institutes proceedings against Israel — ICJ Press Release", url: "https://www.un.org/unispal/document/icj-southafrica-israel-genocide-29dec2023/" },
        { date: "2026", publisher: "UNRIC", title: "South Africa vs Israel: 14 other countries intend to join the ICJ case", url: "https://unric.org/en/south-africa-vs-israel-14-other-countries-intend-to-join-the-icj-case/" }
      ],
      updated: "2024-01-26"
    },
    {
      id: "pl-spain", name: "ספרד", aliases: ["Spain", "España"],
      type: "place", actor: "entity", scope: "local",
      location: { country: "ספרד", region: "eu", city: "" },
      severity: 3, status: "verified",
      incidents: null,
      official: { kind: "arms-embargo", body: "ממשלת ספרד", date: "2025-09-23" },
      summary: "ראש הממשלה פדרו סאנצ׳ס הכריז ב-8 בספטמבר 2025 על תשעה צעדים ״לעצירת רצח העם בעזה״, וב-23 בספטמבר אישרה הממשלה צו מלכותי המעגן אמברגו נשק מלא וקבוע על ישראל, איסור עגינה על ספינות דלק לצבא ישראל, סגירת המרחב האווירי למטוסי נשק, ואיסור יבוא מוצרי התנחלויות. הפרלמנט אשרר את הצו ב-8 באוקטובר ברוב של 178 מול 169. בספטמבר 2025 גם אילצו מחאות המוניות את ביטול הקטע האחרון של מרוץ הוולטה בשל השתתפות קבוצת Israel-Premier Tech — וסאנצ׳ס הביע ״הערכה עמוקה״ למוחים.",
      summaryEn: "On 8 September 2025 Prime Minister Pedro Sánchez announced nine measures \"to stop the genocide in Gaza\", and on 23 September the government approved a royal decree making the arms embargo on Israel full and permanent, banning port calls by ships carrying fuel for the Israeli military, closing airspace to arms flights, and banning imports from settlements. Parliament ratified the decree on 8 October, 178 to 169. That September, mass protests also forced the cancellation of the final stage of La Vuelta over the participation of the Israel-Premier Tech team — and Sánchez voiced \"deep admiration\" for the protesters.",
      tags: ["אמברגו נשק", "ממשל", "החלטה רשמית", "ספורט"],
      sources: [
        { date: "2025-09-08", publisher: "La Moncloa (ממשלת ספרד)", title: "The President announces nine measures to stop the genocide in Gaza", url: "https://www.lamoncloa.gob.es/lang/en/presidente/news/paginas/2025/20250908-gaza-measures.aspx" },
        { date: "2025-09-23", publisher: "La Moncloa (ממשלת ספרד)", title: "The Government strengthens the arms embargo on Israel", url: "https://www.lamoncloa.gob.es/lang/en/gobierno/councilministers/paginas/2025/20250923-council-press-conference.aspx" },
        { date: "2025-10-08", publisher: "Al Jazeera", title: "Spain's parliament formally approves Israel arms embargo", url: "https://www.aljazeera.com/news/2025/10/8/spains-parliament-formally-approves-israel-arms-embargo" }
      ],
      updated: "2025-10-08"
    },
    {
      id: "pl-slovenia", name: "סלובניה", aliases: ["Slovenia"],
      type: "place", actor: "entity", scope: "local",
      location: { country: "סלובניה", region: "eu", city: "" },
      severity: 3, status: "verified",
      incidents: null,
      official: { kind: "arms-embargo", body: "ממשלת סלובניה", date: "2025-08-01" },
      summary: "סלובניה הייתה מדינת האיחוד האירופי הראשונה שהכריזה ביולי 2025 על השרים איתמר בן-גביר ובצלאל סמוטריץ׳ כאישים בלתי רצויים בשל ״התבטאויות רצחניות״, והראשונה שאסרה באוגוסט 2025 את כל סחר הנשק עם ישראל — יבוא, יצוא ומעבר. הממשלה נימקה שפעלה עצמאית משום שהאיחוד ״אינו מסוגל לנקוט צעדים קונקרטיים בשל מחלוקות פנימיות״.",
      summaryEn: "Slovenia was the first EU state to declare ministers Itamar Ben-Gvir and Bezalel Smotrich personae non gratae in July 2025 over \"genocidal statements\", and the first to ban all weapons trade with Israel in August 2025 — import, export and transit. The government said it acted alone because the EU was \"unable to adopt concrete measures due to internal disagreements\".",
      tags: ["אמברגו נשק", "הגבלת כניסה", "ממשל"],
      sources: [
        { date: "2025-07-17", publisher: "The Times of Israel", title: "In EU first, Slovenia to ban Ben Gvir and Smotrich over 'genocidal statements'", url: "https://www.timesofisrael.com/in-eu-first-slovenia-to-ban-ben-gvir-and-smotrich-over-genocidal-statements/" },
        { date: "2025-08-01", publisher: "Al Jazeera", title: "Slovenia becomes first EU country to impose arms embargo on Israel", url: "https://www.aljazeera.com/news/2025/8/1/slovenia-becomes-first-eu-country-to-impose-arms-embargo-on-israel" }
      ],
      updated: "2025-08-01"
    },

    /* ══════════ ערים — אירועים ומדידות ══════════ */
    {
      id: "pl-berlin", name: "ברלין", aliases: ["Berlin"],
      type: "place", actor: "individual", scope: "local",
      location: { country: "גרמניה", region: "eu", city: "ברלין" },
      severity: 4, status: "verified",
      incidents: { n: 2197, year: 2025, jews: 30000, monitor: "rias", prev: 2500 },
      official: null,
      summary: "RIAS ברלין תיעד 2,197 אירועים אנטישמיים בעיר ב-2025 — ממוצע של שישה ביום — לאחר למעלה מ-2,500 ב-2024 ולמעלה מ-1,200 ב-2023. בין 2018 ל-2022 המספר השנתי היה נמוך מ-1,000 בממוצע. הדוח מתאר ״הסרת עכבות נוספת של התבטאויות אנטישמיות במרחב הציבורי״, ותועדו 239 עצרות עם אירועים אנטישמיים — יותר מאי פעם.",
      summaryEn: "RIAS Berlin documented 2,197 antisemitic incidents in the city in 2025 — an average of six a day — after more than 2,500 in 2024 and more than 1,200 in 2023. Between 2018 and 2022 the annual figure averaged under 1,000. The report describes \"a further disinhibition of antisemitic expression in public space\", and recorded 239 assemblies with antisemitic incidents — more than ever.",
      tags: ["ניטור רשמי", "אירועים", "עיר"],
      sources: [
        { date: "2026-05-20", publisher: "RIAS Berlin", title: "2.197 antisemitische Vorfälle in Berlin im Jahr 2025 (מקור ראשוני)", url: "https://report-antisemitism.de/documents/2026-05-20_RIAS_Berlin_Pressemittteilung_Antisemitische_Vorfaelle_in_Berlin_2025.pdf" },
        { date: "2026-05-20", publisher: "Jüdische Allgemeine", title: "Meldestelle zählt 2025 knapp 2.200 antisemitische Vorfälle in Berlin", url: "https://www.juedische-allgemeine.de/politik/meldestelle-zaehlt-2025-knapp-2-200-antisemitische-vorfaelle-in-berlin/" }
      ],
      updated: "2026-05-20"
    },
    {
      id: "pl-boulder", name: "בולדר, קולורדו", aliases: ["Boulder", "Boulder, Colorado"],
      type: "place", actor: "individual", scope: "local",
      location: { country: "ארצות הברית", region: "na", city: "בולדר, קולורדו" },
      severity: 4, status: "verified",
      incidents: null,
      official: null,
      summary: "ב-1 ביוני 2025 השליך מוחמד סברי סולימאן בקבוקי תבערה על צעדת ״Run for Their Lives״ למען החטופים במדרחוב פרל סטריט, כשהוא מחופש לגנן. התביעה מנתה 29 קורבנות, 13 מהם נפגעו פיזית; קרן דיאמונד בת ה-82 מתה מפצעיה ב-25 ביוני. סולימאן אמר לחוקרים שרצה ״להרוג את כל הציונים״. הוא הואשם בפשע שנאה פדרלי וברצח מדרגה ראשונה במדינת קולורדו.",
      summaryEn: "On 1 June 2025 Mohamed Sabry Soliman hurled Molotov cocktails at a \"Run for Their Lives\" walk for the hostages on the Pearl Street Mall, disguised as a gardener. Prosecutors listed 29 victims, 13 physically injured; 82-year-old Karen Diamond died of her wounds on 25 June. Soliman told investigators he wanted to \"kill all Zionist people\". He faces a federal hate-crime charge and first-degree murder charges in Colorado.",
      tags: ["פיגוע", "רצח", "פשע שנאה", "עיר"],
      sources: [
        { date: "2025-06-30", publisher: "Colorado Public Radio", title: "Victim in Boulder firebomb attack dies, suspect now faces first-degree murder charges", url: "https://www.cpr.org/2025/06/30/boulder-pearl-street-attack-victim-dies/" },
        { date: "2025-06-30", publisher: "The Washington Post", title: "Elderly woman dies of injuries from Boulder, Colorado, firebombing", url: "https://www.washingtonpost.com/nation/2025/06/30/boulder-attack-firebomb-death-karen-diamond/" }
      ],
      updated: "2025-06-30"
    },
    {
      id: "pl-dc", name: "וושינגטון הבירה", aliases: ["Washington, D.C.", "Washington DC"],
      type: "place", actor: "individual", scope: "local",
      location: { country: "ארצות הברית", region: "na", city: "וושינגטון" },
      severity: 4, status: "verified",
      incidents: null,
      official: null,
      summary: "ב-21 במאי 2025 נרצחו בירי שני עובדי שגרירות ישראל — יערון לישינסקי ושרה מילגרים, זוג שעמד להתארס — ביציאה מאירוע של הוועד היהודי-אמריקאי במוזיאון היהודי של הבירה. היורה, אליאס רודריגס משיקגו, קרא ״עשיתי את זה למען עזה״ ו״שחררו את פלסטין״ בעת מעצרו. הוא הואשם ברצח בכירים זרים וברצח באמצעות נשק חם — אישום שדינו האפשרי מוות.",
      summaryEn: "On 21 May 2025 two Israeli embassy staffers — Yaron Lischinsky and Sarah Milgrim, a couple about to be engaged — were shot dead leaving an American Jewish Committee event at the Capital Jewish Museum. The gunman, Elias Rodriguez of Chicago, shouted \"I did it for Gaza\" and \"Free Palestine\" as he was detained. He is charged with murdering foreign officials and murder with a firearm — a charge carrying a possible death penalty.",
      tags: ["פיגוע", "רצח", "עיר"],
      sources: [
        { date: "2025-05-22", publisher: "The Washington Post", title: "2 Israeli Embassy staff killed in shooting near D.C.'s Capital Jewish Museum", url: "https://www.washingtonpost.com/dc-md-va/2025/05/21/dc-shooting-capital-jewish-museum/" },
        { date: "2025-05-22", publisher: "NBC News", title: "What to know after 2 Israeli Embassy staffers were shot dead outside Capital Jewish Museum", url: "https://www.nbcnews.com/news/us-news/shooting-dc-jewish-museum-rcna208427" }
      ],
      updated: "2025-05-22"
    },
    {
      id: "pl-makhachkala", name: "מחצ׳קלה, דאגסטן", aliases: ["Makhachkala", "Dagestan"],
      type: "place", actor: "individual", scope: "local",
      location: { country: "רוסיה", region: "eu", city: "מחצ׳קלה" },
      severity: 4, status: "verified",
      incidents: null,
      official: null,
      summary: "ב-29 באוקטובר 2023 הסתער המון על שדה התעופה של מחצ׳קלה בחיפוש אחר יהודים שהגיעו בטיסה מתל אביב — פוגרום שבו הותקפו 30 שוטרים ואנשי ביטחון ו-23 נפצעו. בתי משפט רוסיים גזרו עד יולי 2025 עונשי מאסר של 6.5 עד 15 שנה על 135 מעורבים; המשפטים הועברו מדאגסטן לחבלים אחרים. שלושה שהפעילו את ערוץ הטלגרם שארגן את ההתפרעות הוכרזו מבוקשים.",
      summaryEn: "On 29 October 2023 a mob stormed Makhachkala airport hunting for Jews arriving on a flight from Tel Aviv — a pogrom in which 30 police and security personnel were assaulted and 23 injured. By July 2025 Russian courts had sentenced 135 participants to prison terms of 6.5 to 15 years; the trials were moved out of Dagestan. Three people who ran the Telegram channel that organised the riot were placed on the wanted list.",
      tags: ["פיגוע", "הרשעה פלילית", "עיר"],
      sources: [
        { date: "2025-07-18", publisher: "The Times of Israel", title: "Russian courts sentence 135 people linked to 2023 antisemitic airport riot", url: "https://www.timesofisrael.com/russian-courts-sentence-135-people-linked-to-2023-antisemitic-airport-riot/" },
        { date: "2025-07-18", publisher: "Al Arabiya", title: "Russia convicts dozens for anti-Israel riots at Dagestan airport", url: "https://english.alarabiya.net/News/world/2025/07/18/russia-convicts-dozens-for-antiisrael-riots-at-dagestan-airport-two-years-ago" }
      ],
      updated: "2025-07-18"
    },
    {
      id: "pl-zurich", name: "ציריך", aliases: ["Zurich", "Zürich"],
      type: "place", actor: "individual", scope: "local",
      location: { country: "שוויץ", region: "eu", city: "ציריך" },
      severity: 4, status: "verified",
      incidents: null,
      official: null,
      summary: "ב-2 במרץ 2024 דקר נער בן 15, אזרח שוויצרי-תוניסאי שנשבע אמונים לדאעש בסרטון, יהודי חרדי בן 50 — 17 דקירות — סמוך לבית כנסת בעיר, במטרה מוצהרת ״להרוג כמה שיותר יהודים״. ביולי 2026 גזר עליו בית משפט לנוער שנת מאסר על-תנאי בלבד — העונש המרבי בחוק הנוער השוויצרי לגילו — לצד טיפול במוסד. גזר הדין עורר סערה בקהילה היהודית ומחוצה לה.",
      summaryEn: "On 2 March 2024 a 15-year-old Swiss-Tunisian who had pledged allegiance to Islamic State in a video stabbed a 50-year-old Orthodox Jew — 17 times — near a synagogue in the city, with the declared aim of \"killing as many Jews as possible\". In July 2026 a juvenile court handed him a one-year suspended sentence — the maximum under Swiss juvenile law for his age — alongside institutional therapy. The sentence caused an outcry in and beyond the Jewish community.",
      tags: ["פיגוע", "טרור", "הרשעה פלילית", "עיר"],
      sources: [
        { date: "2026-07-05", publisher: "SWI swissinfo.ch", title: "Zurich court sentences man who attacked a Jew to one year in prison", url: "https://www.swissinfo.ch/eng/various/zurich-court-sentences-man-who-attacked-a-jew-to-one-year-in-prison/91711065" },
        { date: "2026-07-07", publisher: "Algemeiner", title: "Swiss Court Sparks Outrage After Teen Who Stabbed Orthodox Jew 17 Times Receives One-Year Sentence", url: "https://www.algemeiner.com/2026/07/07/swiss-court-sparks-outrage-after-muslim-teen-who-stabbed-orthodox-jew-17-times-receives-one-year-sentence/" }
      ],
      updated: "2026-07-07"
    },
    {
      id: "pl-montreal", name: "מונטריאול", aliases: ["Montreal", "Montréal"],
      type: "place", actor: "individual", scope: "local",
      location: { country: "קנדה", region: "na", city: "מונטריאול" },
      severity: 4, status: "verified",
      incidents: null,
      official: null,
      summary: "בית הכנסת ״בית תקווה״ בפרוור דולרד-דז-אורמו הוצת פעמיים מאז 7 באוקטובר — ב-7 בנובמבר 2023 וב-18 בדצמבר 2024, אז נפגעו גם משרדי פדרציית CJA הסמוכים. באפריל 2025 נעצר מוחמד איליאס אקודאד בן ה-19 והואשם בהצתה, בניסיון הצתה ובהחזקת חומר בערה. קוויבק כולה תיעדה 573 אירועים אנטישמיים ב-2025 לפי בני ברית קנדה.",
      summaryEn: "The Congregation Beth Tikvah synagogue in suburban Dollard-des-Ormeaux has been firebombed twice since 7 October — on 7 November 2023 and again on 18 December 2024, when the nearby Federation CJA offices were also hit. In April 2025 19-year-old Mohamed Ilyess Akodad was arrested and charged with arson, attempted arson and possession of incendiary material. Quebec as a whole recorded 573 antisemitic incidents in 2025 per B'nai Brith Canada.",
      tags: ["הצתה", "בית כנסת", "עיר"],
      sources: [
        { date: "2024-12-18", publisher: "The Times of Israel", title: "Montreal synagogue firebombed for second time since Hamas onslaught against Israel", url: "https://www.timesofisrael.com/montreal-synagogue-firebombed-for-second-time-since-hamas-onslaught-against-israel/" },
        { date: "2025-04", publisher: "CBC News", title: "Montreal man faces arson-related charges in connection with synagogue firebombing", url: "https://www.cbc.ca/news/canada/montreal/congregation-beth-tikvah-firebombing-charges-1.7506253" }
      ],
      updated: "2025-04-30"
    }
  ]
};
