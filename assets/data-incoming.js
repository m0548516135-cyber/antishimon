/* =========================================================================
   אנטישימון — תור מועמדים
   -------------------------------------------------------------------------
   הקובץ הזה נכתב אוטומטית בכל ריצה של המעדכן היומי (update/run-daily.ps1)
   ונדרס בכל פעם. הוא תור, לא ארכיון.

   רשומות כאן מוצגות באפליקציה מסומנות "חדש · לאישור" ובסטטוס "בבדיקה".
   הן אינן חלק מהמרשם עד שאדם קורא את המקורות ולוחץ "אישור לרשומה".
   דחייה מסירה אותן לצמיתות.

   אין לערוך את הקובץ ביד — כל שינוי יימחק בריצה הבאה. רשומה שאושרה
   כדאי להעביר ל-assets/data.js.
   ========================================================================= */

/* ריצת 2026-08-21.

   ── עמדות/החלטות מוצהרות של גופים (חלון 07.8–21.8.26) ─────────────────
   ממצא אחד בחלון, נפתח ואומת מול שני מקורות ראשוניים/מיינסטרים:
   • אולימפיאדת האינפורמטיקה הבינלאומית (IOI) — הוועדה הבינלאומית פסלה את
     התלמיד הישראלי יותם בודניק, שללה את מדליית הזהב שלו ואיפסה את ניקודו
     בשל הצגת דגל ישראל בטקס (15.8.26), בהתאם לכלל מ-2024 האוסר על ישראל
     (לצד רוסיה ובלארוס) להתחרות תחת דגל לאומי. actor=entity (החלטת הוועדה).

   ── נבדקו ונדחו ──────────────────────────────────────────────────────
   • DOJ — כתב אישום נגד לארי מונטס בתקיפה בבית כנסת במנהטן (14.8.26,
     האשמה 18–19.8): כתב אישום בלבד, לא הרשעה/ממצא; דיווחים על עבר של
     בעיות נפשיות. חזקת החפות — לא נכנס עד להרשעה.
   • פסק דין McFadden בעניין תקיפת מפגינה עטופת דגל ישראל: שם הנתבע/ת
     לא אומת ממקור שניתן לפתוח, התאריך מעורפל (פרסום ToI 2025 מול דיווחי
     18–19.8.26), ומדובר בפסק אזרחי לאחר זיכוי פלילי. סיכון להאשמת שווא —
     לא נכנס.
   • CPS ויילס — הרשעות סוויטלנד/האקסלי: 13.5.26, מחוץ לחלון.
   • פורטוגל/קוימברה — בקשה לפתיחת חקירה פלילית: שלב חקירה, לא ממצא.
   • דליפת צ'אט של מפלגת הירוקים בבריטניה ("להרוג ציונים"): צילומי מסך/
     ייחוס בלי אישור רשמי או תמליל — נפסל לפי כללי הקבלה.
   • דחיית ערעור בריסטול (מילר), פסיקת צוויבריקן בגרמניה: מחוץ לחלון ו/או
     פסיקות לצד השני, לא ממצא נגד גורם בר-רישום.
   • SAMA/IMA, European Society of Criminology: לא אומת תאריך בחלון 14 יום.

   ── בחירת הקמפיין (סבב) ──────────────────────────────────────────────
   רצף אחרון: 08-11 FWP · 08-16 MFP · 08-18 FWP. NMFG מכוסה במלואו
   (data-signers.js). הקמפיין הבא בסבב שלא נחלץ הוא מכתב הספורטאים ל-UEFA
   (Game Over Israel / Athletes 4 Peace, 12.11.2025, 70+ חותמים). ל-data.js
   יש רשומת "מכתב הספורטאים ל-UEFA" (as-athletes) עם Pogba ו-Ziyech ב-aliases
   בלבד — הוצאו מהמבחר כדי לא להתנגש ב-check-data. 6 חותמים בולטים נותרים.

   ── אימות החותמים ────────────────────────────────────────────────────
   כל 6 השמות אומתו שם-בשם מול מקורות מיינסטרים שנפתחו ונקראו:
   Yahoo Sports (מנה: Doucouré, El Ghazi, Choudhury, Nigel Pearson, Moeen
   Ali) ו-Middle East Eye (מנה: Traoré, El Ghazi, Nigel Pearson). JURIST
   מאמת את המכתב, התאריך והגופים המארגנים. Chadi Riad ו-Mathias Normann
   הופיעו רק בתקצירי חיפוש (לא במקור פתוח) — לא נכללו. */

var UEFA_HE = "מופיע ברשימת החותמים של המכתב שיזמו הקמפיינים Game Over Israel ו-Athletes 4 Peace, אשר נמסר לנשיא UEFA אלכסנדר צ'פרין (Aleksander Čeferin) ב-12 בנובמבר 2025 ועליו חתמו למעלה מ-70 ספורטאים הקוראים להשעות את ישראל מכל תחרויות הכדורגל האירופיות.";
var UEFA_EN = "appears on the signatory list of the letter initiated by the Game Over Israel and Athletes 4 Peace campaigns, delivered to UEFA President Aleksander Čeferin on 12 November 2025 and signed by more than 70 sportspeople calling for Israel to be suspended from all European football competitions.";

var UEFA_YAHOO = { date: "2025-11-12", publisher: "Yahoo Sports", title: "Premier League names and England cricketer among sportspeople calling for Israel football ban", url: "https://sports.yahoo.com/article/premier-league-names-england-cricketer-161346381.html" };
var UEFA_MEE   = { date: "2025-11-12", publisher: "Middle East Eye", title: "Paul Pogba among 70 athletes calling on Uefa to ban Israel", url: "https://www.middleeasteye.net/news/paul-pogba-among-70-athletes-calling-uefa-ban-israel" };
var UEFA_JURIST = { date: "2025-11-13", publisher: "JURIST", title: "Dozens of athletes urge UEFA to suspend Israel from all competitions", url: "https://www.jurist.org/news/2025/11/dozens-of-athletes-urge-uefa-to-suspend-israel-from-all-competitions/", quote: "does not participate in the normalisation of genocide, apartheid, and crimes against humanity" };

window.ANTISHIMON_INCOMING = {
  generated: "2026-08-21",
  entries: [

    /* ═══ החלטת גוף — ממצא בחלון ═══ */

    {
      id: "inc-20260821-01",
      name: "אולימפיאדת האינפורמטיקה הבינלאומית (IOI)",
      aliases: ["International Olympiad in Informatics", "IOI", "IOI 2026"],
      type: "org",
      actor: "entity",
      parent: "",
      location: { country: "אוזבקיסטן", region: "asia", city: "" },
      scope: "global",
      severity: 3,
      status: "review",
      summary: "אולימפיאדת האינפורמטיקה הבינלאומית (IOI) פסלה את התלמיד הישראלי יותם בודניק בן ה-17 מרחובות, לאחר שהציג את דגל ישראל בטקס חלוקת המדליות ב-15 באוגוסט 2026. הוועדה הבינלאומית של IOI שללה ממנו את מדליית הזהב, איפסה את ניקודו והסירה אותו מטבלת הדירוג הרשמית, בהתאם לכלל שאימצה בשנת 2024 האוסר על משתתפים מישראל (לצד רוסיה ובלארוס) להתחרות תחת דגלם הלאומי. בודניק סירב להחזיר את המדליה הפיזית.",
      summaryEn: "The International Olympiad in Informatics (IOI) disqualified 17-year-old Israeli student Yotam Budnik from Rehovot after he displayed the Israeli flag at the medal ceremony on 15 August 2026. The IOI international committee revoked his gold medal, reset his score to zero and removed him from the official rankings, under a rule it adopted in 2024 barring participants from Israel (alongside Russia and Belarus) from competing under their national flag. Budnik refused to return the physical medal.",
      tags: ["אפליה", "תחרות בינלאומית", "דגל ישראל"],
      sources: [
        { date: "2026-08-19", publisher: "Algemeiner", title: "Israeli High Schooler Wins Gold but Gets Disqualified Over National Flag at Computer Science Olympiad in Uzbekistan", url: "https://www.algemeiner.com/2026/08/19/israeli-high-schooler-wins-gold-gets-disqualified-national-flag-computer-science-olympiad-uzbekistan/", quote: "The law that prevents me from waving the flag is based solely on politics, and I thought it had no place in a scientific competition." },
        { date: "2026-08-19", publisher: "The Jerusalem Post", title: "Israeli IOI gold medalist has medal revoked over Israeli flag display", url: "https://www.jpost.com/diaspora/antisemitism/article-905924", quote: "the decision to forbid us from showing the flag was accepted without us being able to defend ourselves" }
      ],
      alternatives: [],
      updated: "2026-08-19"
    },

    /* ═══ מכתב הספורטאים ל-UEFA — חותמים בולטים (חרם ספורטיבי, דרגה 3) ═══ */

    {
      id: "inc-20260821-02",
      name: "אנואר אל-ע'אזי",
      aliases: ["Anwar El Ghazi"],
      type: "person",
      actor: "individual",
      parent: "",
      location: { country: "הולנד", region: "eu", city: "" },
      scope: "global",
      severity: 3,
      status: "verified",
      summary: "השם אנואר אל-ע'אזי " + UEFA_HE + " שחקן כדורגל הולנדי, לשעבר אייאקס ואסטון וילה.",
      summaryEn: "The name Anwar El Ghazi " + UEFA_EN + " El Ghazi is a Dutch footballer, formerly of Ajax and Aston Villa.",
      tags: ["חרם ספורטיבי", "עצומה", "כדורגל"],
      sources: [ UEFA_YAHOO, UEFA_MEE ],
      alternatives: [],
      updated: "2025-11-12"
    },

    {
      id: "inc-20260821-03",
      name: "אדמה טראורה",
      aliases: ["Adama Traoré"],
      type: "person",
      actor: "individual",
      parent: "",
      location: { country: "ספרד", region: "eu", city: "" },
      scope: "global",
      severity: 3,
      status: "verified",
      summary: "השם אדמה טראורה " + UEFA_HE + " כנף כדורגל ספרדי, ששיחק בין השאר בוולבס ובפולהאם.",
      summaryEn: "The name Adama Traoré " + UEFA_EN + " Traoré is a Spanish winger who has played for Wolves and Fulham.",
      tags: ["חרם ספורטיבי", "עצומה", "כדורגל"],
      sources: [ UEFA_MEE, UEFA_JURIST ],
      alternatives: [],
      updated: "2025-11-12"
    },

    {
      id: "inc-20260821-04",
      name: "נייג'ל פירסון",
      aliases: ["Nigel Pearson"],
      type: "person",
      actor: "individual",
      parent: "",
      location: { country: "בריטניה", region: "eu", city: "" },
      scope: "global",
      severity: 3,
      status: "verified",
      summary: "השם נייג'ל פירסון " + UEFA_HE + " מאמן כדורגל אנגלי, לשעבר מאמן לסטר סיטי.",
      summaryEn: "The name Nigel Pearson " + UEFA_EN + " Pearson is an English football manager, former manager of Leicester City.",
      tags: ["חרם ספורטיבי", "עצומה", "כדורגל"],
      sources: [ UEFA_YAHOO, UEFA_MEE ],
      alternatives: [],
      updated: "2025-11-12"
    },

    {
      id: "inc-20260821-05",
      name: "מואין עלי",
      aliases: ["Moeen Ali"],
      type: "person",
      actor: "individual",
      parent: "",
      location: { country: "בריטניה", region: "eu", city: "" },
      scope: "global",
      severity: 3,
      status: "verified",
      summary: "השם מואין עלי " + UEFA_HE + " שחקן קריקט אנגלי, לשעבר בנבחרת אנגליה.",
      summaryEn: "The name Moeen Ali " + UEFA_EN + " Moeen Ali is an English cricketer, a former England international.",
      tags: ["חרם ספורטיבי", "עצומה", "קריקט"],
      sources: [ UEFA_YAHOO, UEFA_JURIST ],
      alternatives: [],
      updated: "2025-11-12"
    },

    {
      id: "inc-20260821-06",
      name: "שייק דוקורה",
      aliases: ["Cheick Doucouré"],
      type: "person",
      actor: "individual",
      parent: "",
      location: { country: "מאלי", region: "africa", city: "" },
      scope: "global",
      severity: 3,
      status: "verified",
      summary: "השם שייק דוקורה " + UEFA_HE + " שחקן כדורגל מלי, קשר בקריסטל פאלאס.",
      summaryEn: "The name Cheick Doucouré " + UEFA_EN + " Doucouré is a Malian footballer, a midfielder for Crystal Palace.",
      tags: ["חרם ספורטיבי", "עצומה", "כדורגל"],
      sources: [ UEFA_YAHOO, UEFA_JURIST ],
      alternatives: [],
      updated: "2025-11-12"
    },

    {
      id: "inc-20260821-07",
      name: "חמזה צ'ודורי",
      aliases: ["Hamza Choudhury"],
      type: "person",
      actor: "individual",
      parent: "",
      location: { country: "בריטניה", region: "eu", city: "" },
      scope: "global",
      severity: 3,
      status: "verified",
      summary: "השם חמזה צ'ודורי " + UEFA_HE + " שחקן כדורגל, קשר הגנתי, ששיחק בלסטר סיטי.",
      summaryEn: "The name Hamza Choudhury " + UEFA_EN + " Choudhury is a footballer, a defensive midfielder who has played for Leicester City.",
      tags: ["חרם ספורטיבי", "עצומה", "כדורגל"],
      sources: [ UEFA_YAHOO, UEFA_JURIST ],
      alternatives: [],
      updated: "2025-11-12"
    }

  ]
};
