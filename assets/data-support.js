/* =========================================================================
   אנטישימון — הצד השני: את מי כן
   -------------------------------------------------------------------------
   המרשם עונה על "את מי לא לממן". הרשימה הזו עונה על השאלה ההפוכה,
   וזו למעשה אותה שאלה צרכנית: מה לקנות, את מי לעקוב, מה לקרוא.

   ארבעה חלקים:
     people   — קולות שפועלים בפומבי למען ישראל ונגד אנטישמיות
     orgs     — ארגונים שמנטרים, מתעדים ופועלים בשטח
     media    — ערוצים ומקורות חדשות
     products — מוצרים ומותגים ישראליים שקמפייני חרם מסמנים כיעד

   ⚠ שקיפות: בספטמבר 2025 נחשף שקמפיין הסברה שילם למשפיענים אמריקאים
     עד 4,250 דולר לפוסט. הפרסום לא ייחס זאת לאף אחד מהשמות כאן, אבל
     ראוי שתדעו שהתופעה קיימת ותשפטו כל קול לגופו.

   ⚠ אזהרת ברקוד: הטענה ש"729 = מוצר ישראלי" שגויה והופרכה. הקידומת
     מציינת רק היכן החברה נרשמה ב-GS1. ראו assets/data.js → gs1.
   ========================================================================= */

window.ANTISHIMON_SUPPORT = {
  updated: "2026-07-31",

  note: "הצד השני של אותה שאלה צרכנית. הופעה ברשימה כאן אינה האשמה — היא ההפך.",

  /* לכל סעיף גוון משלו ופריסה משלה. שבע רשימות באותו כרטיס ירוק
     יוצרות קיר מונוטוני; שבעה גוונים ושלושה סוגי כרטיס יוצרים עמוד.
     layout: rich = כרטיס מלא · tile = אריח בינוני · name = שם בלבד */
  sections: [
    { key: "people",   label: "קולות",           layout: "rich", accent: "#38B48B",
      lead: "אנשים שפועלים בפומבי למען ישראל ונגד אנטישמיות — ובהם קולות ערביים ומוסלמיים שהם מהחזקים בזירה." },
    { key: "oct7",     label: "חתמו נגד חמאס",   layout: "name", accent: "#4E93B8",
      lead: "1,000+ אמנים ובכירי תעשייה חתמו ב-12.10.2023 על המכתב ״Israel Under Attack״, המגנה את המתקפה וקורא להשבת החטופים. אלה השמות הנקובים בו." },
    { key: "signers",  label: "חתמו נגד החרם",   layout: "name", accent: "#8B72C9",
      lead: "1,250+ אנשי תעשיית הבידור חתמו ב-24.9.2025 על המכתב הדוחה את חרם הקולנוע הישראלי ומכנה אותו ״מפלה ואנטישמי״ ו״ענישה קולקטיבית״." },
    { key: "orgs",     label: "ארגונים",         layout: "rich", accent: "#D8A93B",
      lead: "גופים שמנטרים אנטישמיות, מתעדים אירועים ופועלים בשטח. ארבעה מהם משמשים כמקורות במרשם עצמו." },
    { key: "media",    label: "ערוצים ומקורות",  layout: "tile", accent: "#3FA9C4",
      lead: "מקורות חדשות ישראליים, רובם עם מהדורה באנגלית." },
    { key: "companies", label: "חברות ישראליות", layout: "tile", accent: "#5C8FD6",
      lead: "חברות שנוסדו בישראל ופועלות מכאן. שימוש במוצר שלהן הוא תמיכה ישירה בכלכלה הישראלית." },
    { key: "backers", label: "תמכו בישראל",     layout: "tile", accent: "#3E9C6D",
      lead: "חברות בינלאומיות שהתחייבו בפומבי לישראל אחרי 7 באוקטובר — תרומות, הצהרות רשמיות או סיוע בשטח. חלקן הפכו בעקבות כך ליעד של קמפייני חרם. הסכומים מדוּוחים בסקר של 212 חברות." },
    { key: "products", label: "מוצרים תחת חרם",  layout: "rich", accent: "#C4783A",
      lead: "מותגים ישראליים שקמפייני חרם מסמנים בשמם כיעד, או שהוסרו ממדף בהחלטה מתועדת. הופעה כאן אינה האשמה — היא ההפך." }
  ],

  /* קמפיין החתימה הנגדי — 1,250+ חותמים. השמות הנקובים מועתקים
     מהודעת הארגון כלשונם, בפורמט "שם | תפקיד", והאפליקציה מרחיבה
     כל אחד לכרטיס. אותה שיטה בדיוק שבה נטענות רשימות החותמים בצד השני,
     כדי ששני הצדדים יימדדו באותה אמת מידה. */
  campaigns: {
    oct7: {
      section: "oct7",
      what: "חתם נגד חמאס",
      text: "מופיע ברשימת החותמים הנקובים בשמם על המכתב הפתוח ״Israel Under Attack״ שפרסם ארגון Creative Community for Peace ב-12 באוקטובר 2023, ועליו חתמו למעלה מ-1,000 אמנים ובכירי תעשיית הבידור. המכתב מגנה את מתקפת חמאס וקורא להשבת החטופים.",
      sources: [
        { publisher: "Creative Community for Peace", title: "Israel Under Attack — Open Letter (מקור ראשוני)", url: "https://www.creativecommunityforpeace.com/blog/2023/10/12/israel-under-attack-open-letter/" }
      ]
    },
    ccfp: {
      section: "signers",
      what: "חתם נגד החרם",
      text: "מופיע ברשימת החותמים הנקובים בשמם על המכתב הפתוח של Creative Community for Peace ו-The Brigade, שפורסם ב-24 בספטמבר 2025 ועליו חתמו למעלה מ-1,250 אנשי תעשיית הבידור. המכתב דוחה את חרם הקולנוע הישראלי, מכנה אותו ״מפלה ואנטישמי״ ו״ענישה קולקטיבית״, וקובע: ״לצנזר דווקא את הקולות שמנסים למצוא מכנה משותף ולבטא את אנושיותם — זה שגוי, לא יעיל, וצורה של ענישה קולקטיבית״.",
      sources: [
        { publisher: "Creative Community for Peace", title: "המכתב הפתוח ורשימת החותמים (מקור ראשוני)", url: "https://www.creativecommunityforpeace.com/blog/2025/09/24/filmopenletter/" },
        { publisher: "Variety", title: "1,200 Industry Names Rejecting Israeli Film Boycott in New Open Letter", url: "https://variety.com/2025/film/global/liev-schreiber-mayim-bialik-reject-israeli-industry-boycott-letter-1236528982/" },
        { publisher: "The Hollywood Reporter", title: "Liev Schreiber, Mayim Bialik, Debra Messing Reject Israeli Film Boycott Calls as 'Collective Punishment'", url: "https://www.hollywoodreporter.com/movies/movie-news/liev-schrieber-debra-messing-reject-israeli-film-boycott-1236385658/" },
        { publisher: "Jewish Telegraphic Agency", title: "An open letter opposing the Israeli film boycott is making the rounds in Hollywood", url: "https://www.jta.org/2025/09/26/culture/an-open-letter-opposing-the-israeli-film-boycott-signed-by-liev-schrieber-mayim-bialik-and-others-is-making-the-rounds-in-hollywood" }
      ]
    }
  },

  lists: {
    oct7: `
Gal Gadot | שחקנית ומפיקה
Jerry Seinfeld | שחקן וקומיקאי
Michael Douglas | שחקן
Jamie Lee Curtis | שחקנית
Helen Mirren | שחקנית
Amy Schumer | שחקנית
Chris Pine | שחקן
Mark Hamill | שחקן
Ryan Murphy | שורראנר
Andy Garcia | שחקן
Jason Alexander | שחקן ובמאי
Gary Sinise | שחקן
Diane Warren | פזמונאית
Billy Porter | שחקן
Simu Liu | שחקן
John Fogerty | מוזיקאי
Peter Frampton | מוזיקאי
Ziggy Marley | מוזיקאי
Zachary Levi | שחקן
Jeremy Piven | שחקן
Josh Peck | שחקן
Jon Bernthal | שחקן
Noah Wyle | שחקן ותסריטאי
Shannen Doherty | שחקנית
Fred Savage | שחקן ובמאי
Bella Thorne | שחקנית
Emmanuelle Chriqui | שחקנית
George Lopez | בדרן
Mekhi Phifer | שחקן
Eli Roth | במאי
Antoine Fuqua | מפיק ובמאי
Guy Nattiv | יוצר סרטים
Phil Rosenthal | שחקן ומפיק
Frances Fisher | שחקנית ופעילה
Richard Lewis | שחקן וקומיקאי
Samantha Ronson | אמנית
Kathy Ireland | יזמת ופילנתרופית
Nicholas Sparks | סופר
Chuck Liddell | לוחם MMA
Julian Edelman | ממייסדי Coast Productions
Irving Azoff | מנכ״ל ויו״ר Full Stop Management
Bryan Lourd | מנכ״ל CAA
Richard Lovett | יו״ר משותף, CAA
Kevin Huvane | יו״ר משותף, CAA
Aaron Bay-Schuck | מנכ״ל ויו״ר משותף, Warner Records
Jody Gerson | יו״רית ומנכ״לית Universal Music Publishing
Jenji Kohan | תסריטאית ומפיקה
Jim Berkus | יו״ר הדירקטוריון, UTA
Dana Goldberg | מנהלת יצירה ראשית, Skydance
Gail Berman | מפיקה
Steve Schnur | מנהל מוזיקה עולמי, Electronic Arts
Josh Greenstein | נשיא Sony Pictures Motion Picture Group
Tom Rothman | יו״ר ומנכ״ל Sony Pictures Entertainment
Rick Yorn | ממייסדי LBI Entertainment
Daniel Glass | מייסד ומנכ״ל Glassnote Records
Basil Iwanyk | מפיק
Jacqueline Saturn | נשיאת Virgin Music
David Renzer | יו״ר Universal Music Publishing לשעבר
Zach Katz | נשיא ומנהל תפעול, FaZe Clan
David Levy | שותף, WME
Mike Levine | ראש משותף, CAA Sports
Risa Gertner | ראשת משותפת, CAA Motion Picture Group
David Zedeck | ראש תחום מוזיקה עולמי, UTA
Neil Blair | שותף, The Blair Partnership
Scott Greenberg | שותף, LBI
Ryan Kavanaugh | מייסד Proxima
Bruce Resnikoff | נשיא ומנכ״ל Universal Music Enterprises
`,

    ccfp: `
Liev Schreiber | שחקן
Mayim Bialik | שחקנית, סופרת ומפיקה
Gene Simmons | מוזיקאי, KISS
Debra Messing | שחקנית
Sharon Osbourne | מנחה ומנהלת אמנים
Greg Berlanti | תסריטאי, מפיק ובמאי
Jerry O'Connell | שחקן
Howie Mandel | מנחה
Jennifer Jason Leigh | שחקנית
Rebecca De Mornay | שחקנית
Sherry Lansing | מנכ״לית Paramount Pictures לשעבר
Gary Barber | בכיר בהוליווד
Ynon Kreiz | יו״ר ומנכ״ל Mattel
Erin Foster | שחקנית
Anthony Edwards | שחקן
Mare Winningham | שחקנית
Patricia Heaton | שחקנית
Haim Saban | יו״ר ומנכ״ל Saban Capital Group
Regina Spektor | זמרת ויוצרת
Tracy Ann Oberman | שחקנית
Rick Rosen | ממייסדי Endeavor
Modi Wiczyk | ממייסדי MRC
Howard Gordon | שורראנר
Michael Rotenberg | שותף, 3 Arts Entertainment
Susan Rovner | יו״ר NBCUniversal Television לשעבר
Jonathan Baruch | נשיא Rain Management Group
Fred Toczek | שותף, Felker Toczek
Patti Felker | שותפה, Felker Toczek
Nina Tassler | מנכ״לית Kismet Creative Group
Jacob Fenton | שותף, United Talent Agency
David Kohan | שורראנר ומפיק בפועל
Bruce Resnikoff | נשיא ומנכ״ל Universal Music Enterprises
Blair Kohan | שותפה וחברת דירקטוריון, UTA
Ram Bergman | מפיק
Fernando Szew | מנכ״ל FOX Entertainment Global
Nancy Mendelson Gates | סוכנת ושותפה, UTA
Julie Greenwald | יו״ר Atlantic Records Group לשעבר
David Draiman | סולן Disturbed
Danny Cohen | נשיא Access Entertainment
Orly Marley | נשיאת Tuff Gong Worldwide
Kevin Yorn | עורך דין
Tara Strong | שחקנית קול
Martin Singer | עורך דין, Lavely and Singer
Allan Loeb | תסריטאי
Amy Sherman-Palladino | תסריטאית
Joel Fields | תסריטאי ומפיק
Matisyahu | מוזיקאי
Marc Guggenheim | תסריטאי ומפיק
Matthew Weiner | שורראנר, Mad Men
Gideon Raff | במאי, יוצר "חטופים"
Michael Rapaport | שחקן
Lawrence Bender | מפיק
David Shore | תסריטאי, יוצר House
Jan Harlan | מפיק
Robert Lantos | מפיק
Shari Redstone | יו״רית Paramount Global לשעבר
Abbe Raven | יו״רית אמריטוס A+E Networks
`
  },

  items: [

    /* ═══ קולות ═══ */

    {
      id: "sup-haddad", section: "people",
      name: "יוסף חדאד",
      aliases: ["Yoseph Haddad"],
      company: "ערבים ויהודים — ערבים זה לזה",
      what: "פעיל ערבי־ישראלי",
      why: "ערבי־ישראלי יליד חיפה שגדל בנצרת. התנדב בגיל 18 לצה״ל ושירת בגולני; במלחמת לבנון השנייה ב-2006, בקרב בבינת ג׳ביל, נפגע מטיל קורנט של חיזבאללה שקטע את רגלו. לאחר שיקום ארוך הרגל חוברה בחזרה. ב-2018 הקים את העמותה ״ערבים זה לזה״ (Together — Vouch for Each Other), הפועלת לשילוב החברה הערבית בישראל ומעודדת התנדבות לצה״ל ולשירות לאומי. העמותה יזמה את טקס יום השואה הראשון בחברה הערבית בישראל ואת הראשון באיחוד האמירויות ב-2021.",
      sources: [
        { publisher: "Wikipedia", title: "Yoseph Haddad", url: "https://en.wikipedia.org/wiki/Yoseph_Haddad" },
        { publisher: "אתר רשמי", title: "yosephhaddad.com", url: "https://yosephhaddad.com/" },
        { publisher: "The Jerusalem Post", title: "The Arab Israeli activist bashing apartheid accusations", url: "https://www.jpost.com/israel-news/culture/article-829119" }
      ]
    },
    {
      id: "sup-mazzig", section: "people",
      name: "חן מזיג",
      aliases: ["Hen Mazzig"],
      company: "",
      what: "סופר ומשפיען",
      why: "סופר ומשפיען ישראלי, נכד למשפחות שנמלטו מעיראק ומתוניסיה. שירת כקצין הומניטרי בצה״ל בתיאום פעילות אזרחית מול אוכלוסייה פלסטינית. מאז 7 באוקטובר הגיע התוכן שלו לעשרות מיליוני אנשים, והוא מוכר כאחד הקולות המזוהים בעולם בהסברה הישראלית. שחקנים בהוליווד פונים אליו לייעוץ בנושא.",
      sources: [
        { publisher: "Wikipedia", title: "Hen Mazzig", url: "https://en.wikipedia.org/wiki/Hen_Mazzig" },
        { publisher: "The Hollywood Reporter", title: "Why Pro-Israel Hollywood Stars Turn to Hen Mazzig for Advice", url: "https://www.hollywoodreporter.com/news/general-news/hen-mazzig-debra-messing-ginnifer-goodwin-pro-israel-hamas-1236001088/" }
      ]
    },
    {
      id: "sup-tishby", section: "people",
      name: "נעה תשבי",
      aliases: ["Noa Tishby"],
      company: "Eighteen",
      what: "שחקנית ופעילה",
      why: "שחקנית ומפיקה ישראלית ששימשה בשנים 2022–2023 כשליחה המיוחדת של ישראל למאבק באנטישמיות ובדה-לגיטימציה. ב-2024 הקימה את עמותת Eighteen לפעילות הסברה עצמאית. מחברת הספר על ההיסטוריה של ישראל שהפך לרב-מכר.",
      sources: [
        { publisher: "Wikipedia", title: "Noa Tishby", url: "https://en.wikipedia.org/wiki/Noa_Tishby" },
        { publisher: "The Hollywood Reporter", title: "Actress Noa Tishby, Prominent Pro-Israel Activist, Fights Her Info War", url: "https://www.hollywoodreporter.com/news/politics-news/noa-tishby-eighteen-israel-activism-1236590522/" }
      ]
    },
    {
      id: "sup-schrader", section: "people",
      name: "אמילי שרדר",
      aliases: ["Emily Schrader"],
      company: "",
      what: "עיתונאית",
      why: "עיתונאית ופעילת זכויות אדם אמריקאית־ישראלית היושבת בישראל, המתמקדת בענייני ישראל ואיראן ובזכויות אדם באיראן.",
      sources: [
        { publisher: "Campus for All", title: "Voices You Should Know", url: "https://campus4all.org/voices-you-should-know/" }
      ]
    },
    {
      id: "sup-tucker", section: "people",
      name: "מונטנה טאקר",
      aliases: ["Montana Tucker"],
      company: "",
      what: "זמרת ומשפיענית",
      why: "זמרת, רקדנית ומשפיענית אמריקאית־יהודייה עם למעלה מ-14 מיליון עוקבים, נכדה לניצולי שואה. מאז 7 באוקטובר סרטוני ההסברה שלה נצפו מיליוני פעמים, והיא הפכה לקול מוביל בסולידריות יהודית. יצרה את הסדרה התיעודית ״The Children of October 7״ והשתתפה במכביה 2025.",
      sources: [
        { publisher: "The Jerusalem Post", title: "Maccabiah 2025: Montana Tucker leads pro-Israel advocacy through sports", url: "https://www.jpost.com/israel-news/sports/article-832941" },
        { publisher: "Combat Antisemitism Movement", title: "Social Media Star Montana Tucker Honored for Jewish Advocacy", url: "https://combatantisemitism.org/cam-news/social-media-star-montana-tucker-honored-for-jewish-advocacy-during-latest-israel-solidarity-visit/" },
        { publisher: "Wikipedia", title: "The Children of October 7", url: "https://en.wikipedia.org/wiki/The_Children_of_October_7" }
      ]
    },
    {
      id: "sup-alshareef", section: "people",
      name: "לואי אלשריף",
      aliases: ["Loay Alshareef"],
      company: "",
      what: "פעיל מוסלמי",
      why: "פעיל מוסלמי יליד ג׳דה שבסעודיה, כיום באיחוד האמירויות, הקורא לעולם הערבי לנרמל יחסים עם ישראל. גדל בבית שבו חונך לשנוא יהודים, ועמדתו השתנתה לאחר מפגש עם משפחה יהודית מארחת בזמן לימודיו בצרפת.",
      sources: [
        { publisher: "Wikipedia", title: "Loay Alshareef", url: "https://en.wikipedia.org/wiki/Loay_Alshareef" },
        { publisher: "JNS", title: "'Recovered antisemite': Saudi Muslim a born-again advocate for Israel", url: "https://www.jns.org/recovered-antisemite-saudi-muslim-a-born-again-advocate-for-israel/" }
      ]
    },
    {
      id: "sup-osman", section: "people",
      name: "רוואן עוסמאן",
      aliases: ["Rawan Osman"],
      company: "Arabs Ask",
      what: "פעילה",
      why: "ילידת דמשק שגדלה בבקעת לבנון, פעילה בולטת ברשתות למען ישראל ונגד חמאס, חיזבאללה ואיראן. זמן קצר לאחר 7 באוקטובר השיקה את הפורום Arabs Ask.",
      sources: [
        { publisher: "Tablet Magazine", title: "Arab Advocates for Israel Speak Out on Social Media", url: "https://www.tabletmag.com/sections/community/articles/arab-advocates-israel-social-media" }
      ]
    },
    {
      id: "sup-alkhatib", section: "people",
      name: "אחמד פואד אלח׳טיב",
      aliases: ["Ahmed Fouad Alkhatib"],
      company: "",
      what: "אנליסט יליד עזה",
      why: "אנליסט יליד עזה, מהקולות הבולטים בביקורת פומבית על חמאס ובקריאה לעתיד אחר לרצועה.",
      sources: [
        { publisher: "Aish", title: "Four Anti-Zionist Muslims Who Became Staunch Supporters of Israel", url: "https://aish.com/four-anti%E2%80%91zionist-muslims-who-became-staunch-supporters-of-israel/" }
      ]
    },

    /* ═══ ארגונים ═══ */

    {
      id: "sup-adl", section: "orgs",
      name: "ADL",
      aliases: ["Anti-Defamation League", "הליגה נגד השמצה"],
      company: "נוסד 1913",
      what: "ניטור ומחקר",
      why: "הארגון היהודי הוותיק והבולט במאבק באנטישמיות. מפעיל שלושה מרכזי מחקר — קיצוניות, טכנולוגיה וחברה, וחקר האנטישמיות — מגיב לאירועים ברשת ומחוצה לה, אוסף נתונים לזיהוי מגמות, ומפרסם את הסקר השנתי של אירועי אנטישמיות. מקור מצוטט במרשם הזה.",
      sources: [
        { publisher: "ADL", title: "Fight Antisemitism — מה הארגון עושה", url: "https://www.adl.org/what-we-do/fight-antisemitism" },
        { publisher: "ADL", title: "Audit of Antisemitic Incidents 2025", url: "https://www.adl.org/resources/report/audit-antisemitic-incidents-2025" }
      ]
    },
    {
      id: "sup-swu", section: "orgs",
      name: "StandWithUs",
      aliases: ["SWU"],
      company: "נוסד 2001",
      what: "חינוך וקמפוסים",
      why: "ארגון לא-מפלגתי שהוקם ב-2001 בידי רוז רוטשטיין, המתמקד בהעצמת סטודנטים בקמפוסים ובבתי ספר. מפעיל מרכז למאבק באנטישמיות וכלי לדיווח על אירועים, ומספק חומרי הסבר על BDS, על השואה ועל ציונות.",
      sources: [
        { publisher: "StandWithUs", title: "אתר הארגון", url: "https://standwithus.com/" },
        { publisher: "Chosen People Ministries", title: "Top Organizations Fighting Antisemitism", url: "https://chosenpeople.com/top-organizations-fighting-antisemitism/" }
      ]
    },
    {
      id: "sup-camera", section: "orgs",
      name: "CAMERA",
      aliases: ["Committee for Accuracy in Middle East Reporting and Analysis"],
      company: "נוסד 1982",
      what: "ניטור תקשורת",
      why: "מנטר מאז 1982 הטיה אנטי-ישראלית בתקשורת, וכן פעילות בקמפוסים. מתעד אי-דיוקים ודורש תיקונים מגופי תקשורת.",
      sources: [
        { publisher: "CAMERA", title: "אתר הארגון", url: "https://www.camera.org/" },
        { publisher: "Chosen People Ministries", title: "Top Organizations Fighting Antisemitism", url: "https://chosenpeople.com/top-organizations-fighting-antisemitism/" }
      ]
    },
    {
      id: "sup-honest", section: "orgs",
      name: "HonestReporting",
      aliases: ["הונסט ריפורטינג"],
      company: "",
      what: "ניטור תקשורת",
      why: "מנטר הטיה, אי-דיוק והפרות של כללי אתיקה עיתונאית בסיקור הסכסוך, ומסייע לעיתונאים זרים בסיקור מדויק מהאזור.",
      sources: [
        { publisher: "HonestReporting", title: "אתר הארגון", url: "https://honestreporting.com/" }
      ]
    },
    {
      id: "sup-cam", section: "orgs",
      name: "Combat Antisemitism Movement",
      aliases: ["CAM"],
      company: "",
      what: "תיעוד ומעקב",
      why: "קואליציה בין-לאומית המתעדת אירועי אנטישמיות ומפרסמת דוחות מעקב שוטפים, כולל סיכומים חודשיים של האירועים החמורים.",
      sources: [
        { publisher: "Combat Antisemitism Movement", title: "אתר הארגון", url: "https://combatantisemitism.org/" }
      ]
    },
    {
      id: "sup-fswc", section: "orgs",
      name: "מרכז שמעון ויזנטל",
      aliases: ["Simon Wiesenthal Center", "FSWC"],
      company: "",
      what: "מאבק בשנאה",
      why: "ארגון בין-לאומי למאבק באנטישמיות ובהכחשת שואה, המלווה הליכים משפטיים ומפרסם מעקב אחר תעמולת שנאה. מקור מצוטט במרשם הזה.",
      sources: [
        { publisher: "Friends of Simon Wiesenthal Center", title: "אתר הארגון", url: "https://www.fswc.ca/" }
      ]
    },

    /* ═══ ערוצים ומקורות ═══ */

    {
      id: "sup-toi", section: "media",
      name: "The Times of Israel",
      aliases: ["טיימס אוף ישראל"],
      company: "", what: "אתר חדשות",
      why: "אתר חדשות ישראלי באנגלית עם סיקור נרחב של ישראל, המזרח התיכון והעולם היהודי. מקור מצוטט רבות במרשם הזה.",
      sources: [{ publisher: "The Times of Israel", title: "האתר", url: "https://www.timesofisrael.com/" }]
    },
    {
      id: "sup-jpost", section: "media",
      name: "The Jerusalem Post",
      aliases: ["ג׳רוזלם פוסט"],
      company: "", what: "עיתון ואתר",
      why: "העיתון הוותיק בישראל באנגלית, עם מדור ייעודי לאנטישמיות ולתפוצות.",
      sources: [{ publisher: "The Jerusalem Post", title: "האתר", url: "https://www.jpost.com/" }]
    },
    {
      id: "sup-i24", section: "media",
      name: "i24NEWS",
      aliases: ["איי-24"],
      company: "", what: "ערוץ טלוויזיה",
      why: "ערוץ חדשות ישראלי המשדר 24 שעות מנמל יפו בארבע שפות — עברית, אנגלית, צרפתית וערבית. משדר בארצות הברית מאז 2017.",
      sources: [
        { publisher: "Wikipedia", title: "i24NEWS", url: "https://en.wikipedia.org/wiki/I24NEWS_(Israeli_TV_channel)" },
        { publisher: "i24NEWS", title: "האתר", url: "https://www.i24news.tv/en" }
      ]
    },
    {
      id: "sup-jns", section: "media",
      name: "JNS",
      aliases: ["Jewish News Syndicate"],
      company: "", what: "סוכנות ידיעות",
      why: "סוכנות ידיעות שהושקה ב-2011 ומסקרת את ישראל והעולם היהודי. מקור מצוטט במרשם הזה.",
      sources: [
        { publisher: "Wikipedia", title: "Jewish News Syndicate", url: "https://en.wikipedia.org/wiki/Jewish_News_Syndicate" },
        { publisher: "JNS", title: "האתר", url: "https://www.jns.org/" }
      ]
    },
    {
      id: "sup-hayom", section: "media",
      name: "ישראל היום",
      aliases: ["Israel Hayom"],
      company: "", what: "עיתון ואתר",
      why: "העיתון בעל התפוצה הגדולה בישראל. מפעיל גם אתר ומהדורת ניוזלטר יומית באנגלית.",
      sources: [{ publisher: "Israel Hayom", title: "האתר", url: "https://www.israelhayom.co.il/" }]
    },
    {
      id: "sup-kan", section: "media",
      name: "כאן — תאגיד השידור",
      aliases: ["Kan", "IPBC"],
      company: "", what: "שידור ציבורי",
      why: "השדר הציבורי הישראלי. מפעיל מהדורת חדשות יומית באנגלית הזמינה להאזנה מקוונת.",
      sources: [{ publisher: "כאן", title: "האתר", url: "https://www.kan.org.il/" }]
    },

    /* ═══ חברות בינלאומיות שתמכו בישראל ═══
       אותו תקן ראיות כמו במרשם: התחייבות פומבית מוצהרת של הגוף עצמו. */

    {
      id: "sup-bloomberg", section: "backers",
      name: "Bloomberg Philanthropies", aliases: ["מייקל בלומברג", "Michael Bloomberg"],
      company: "ארצות הברית", what: "התחייבות · 25 מיליון $",
      why: "התרומה הגדולה ביותר שנרשמה בסקר של 212 חברות שבחן התחייבויות כספיות לישראל ולגופים הקשורים אליה אחרי 7 באוקטובר.",
      sources: [{ publisher: "Euronews", title: "How are businesses responding to the Israel-Hamas war?", url: "https://www.euronews.com/business/2023/11/01/the-controversies-of-company-activism-how-are-businesses-responding-to-the-israel-hamas-wa" }]
    },
    {
      id: "sup-jefferies", section: "backers",
      name: "Jefferies", aliases: ["ג׳פריס"],
      company: "ארצות הברית", what: "התחייבות · 13 מיליון $",
      why: "בנק ההשקעות האמריקאי, מבין ההתחייבויות הגדולות ביותר בסקר.",
      sources: [{ publisher: "Euronews", title: "How are businesses responding to the Israel-Hamas war?", url: "https://www.euronews.com/business/2023/11/01/the-controversies-of-company-activism-how-are-businesses-responding-to-the-israel-hamas-wa" }]
    },
    {
      id: "sup-blackstone", section: "backers",
      name: "Blackstone", aliases: ["בלקסטון"],
      company: "ארצות הברית", what: "התחייבות · 7 מיליון $",
      why: "קרן ההשקעות, מבין ההתחייבויות הגדולות בסקר.",
      sources: [{ publisher: "Euronews", title: "How are businesses responding to the Israel-Hamas war?", url: "https://www.euronews.com/business/2023/11/01/the-controversies-of-company-activism-how-are-businesses-responding-to-the-israel-hamas-wa" }]
    },
    {
      id: "sup-salesforce", section: "backers",
      name: "Salesforce", aliases: ["סיילספורס"],
      company: "ארצות הברית", what: "התחייבות · 2.4 מיליון $",
      why: "חברת התוכנה האמריקאית, מבין החברות שהתחייבו כספית אחרי 7 באוקטובר.",
      sources: [{ publisher: "Euronews", title: "How are businesses responding to the Israel-Hamas war?", url: "https://www.euronews.com/business/2023/11/01/the-controversies-of-company-activism-how-are-businesses-responding-to-the-israel-hamas-wa" }]
    },
    {
      id: "sup-disney", section: "backers",
      name: "Disney", aliases: ["דיסני", "The Walt Disney Company"],
      company: "ארצות הברית", what: "התחייבות · 2 מיליון $",
      why: "תרמה 2 מיליון דולר לארגונים הומניטריים באזור והביעה בהצהרה רשמית זעזוע מ״מתקפות הטרור המחרידות״.",
      sources: [{ publisher: "Euronews", title: "How are businesses responding to the Israel-Hamas war?", url: "https://www.euronews.com/business/2023/11/01/the-controversies-of-company-activism-how-are-businesses-responding-to-the-israel-hamas-wa" }]
    },
    {
      id: "sup-boeing", section: "backers",
      name: "Boeing", aliases: ["בואינג"],
      company: "ארצות הברית", what: "התחייבות · 2 מיליון $",
      why: "מבין החברות שהתחייבו כספית לישראל ולגופים הקשורים אליה אחרי 7 באוקטובר.",
      sources: [{ publisher: "Euronews", title: "How are businesses responding to the Israel-Hamas war?", url: "https://www.euronews.com/business/2023/11/01/the-controversies-of-company-activism-how-are-businesses-responding-to-the-israel-hamas-wa" }]
    },
    {
      id: "sup-jnj", section: "backers",
      name: "Johnson & Johnson", aliases: ["ג׳ונסון אנד ג׳ונסון"],
      company: "ארצות הברית", what: "התחייבות · 2 מיליון $",
      why: "מבין החברות שהתחייבו כספית לישראל ולגופים הקשורים אליה אחרי 7 באוקטובר.",
      sources: [{ publisher: "Euronews", title: "How are businesses responding to the Israel-Hamas war?", url: "https://www.euronews.com/business/2023/11/01/the-controversies-of-company-activism-how-are-businesses-responding-to-the-israel-hamas-wa" }]
    },
    {
      id: "sup-mcdonalds-il", section: "backers",
      name: "מקדונלד׳ס ישראל", aliases: ["McDonald's Israel"],
      company: "זכיין ישראלי", what: "מזון לחיילים",
      why: "הזכיין הישראלי פרסם שהוא מעניק ארוחות חינם ובהנחה לחיילי צה״ל ולכוחות ההצלה אחרי 7 באוקטובר, ובעקבות זאת ספגה הרשת הגלובלית קריאות חרם נרחבות. חשוב להבחין: זו הייתה החלטת הזכיין המקומי, לא של החברה האם.",
      sources: [
        { publisher: "TIME", title: "What to Know About BDS, the Boycotts Against Israel", url: "https://time.com/6694986/israel-palestine-bds-boycotts-starbucks-mcdonalds/" },
        { publisher: "The Washington Post", title: "What is BDS, the movement to boycott Israel?", url: "https://www.washingtonpost.com/world/2024/01/23/bds-movement-israel-boycott-brands/" }
      ]
    },
    {
      id: "sup-burgerking-il", section: "backers",
      name: "בורגר קינג ישראל", aliases: ["Burger King Israel"],
      company: "זכיין ישראלי", what: "מזון לחיילים",
      why: "הזכיין הישראלי פרסם באינסטגרם באוקטובר 2023 שתרם אלפי ארוחות לחיילים, וספג בעקבות כך קריאות חרם.",
      sources: [{ publisher: "Al Jazeera", title: "Boycotts and protests — how are people around the world defying Israel?", url: "https://www.aljazeera.com/news/2023/12/15/boycotts-and-protests-how-are-people-around-the-world-defying-israel" }]
    },
    {
      id: "sup-microsoft", section: "backers",
      name: "Microsoft", aliases: ["מיקרוסופט"],
      company: "ארצות הברית", what: "יעד חרם מרכזי",
      why: "תנועת ה-BDS מתארת אותה כ״חברת הטכנולוגיה המעורבת ביותר״ בשל קשריה עם ממשלת ישראל, הצבא ושירות בתי הסוהר. כלומר: יעד חרם דווקא בשל עומק הקשר לישראל.",
      sources: [{ publisher: "BDS Movement", title: "Guide to BDS Boycott & Pressure Corporate Priority Targeting", url: "https://bdsmovement.net/Guide-to-BDS-Boycott" }]
    },
    {
      id: "sup-hp", section: "backers",
      name: "HP", aliases: ["Hewlett-Packard"],
      company: "ארצות הברית", what: "יעד חרם מרכזי",
      why: "מופיעה ברשימת יעדי העדיפות של תנועת ה-BDS בשל התקשרויותיה עם ישראל.",
      sources: [{ publisher: "BDS Movement", title: "Guide to BDS Boycott & Pressure Corporate Priority Targeting", url: "https://bdsmovement.net/Guide-to-BDS-Boycott" }]
    },
    {
      id: "sup-carrefour", section: "backers",
      name: "Carrefour", aliases: ["קרפור"],
      company: "צרפת", what: "יעד חרם מרכזי",
      why: "רשת הקמעונאות הצרפתית מופיעה ברשימת יעדי העדיפות של תנועת ה-BDS בשל פעילותה בישראל.",
      sources: [{ publisher: "BDS Movement", title: "Guide to BDS Boycott & Pressure Corporate Priority Targeting", url: "https://bdsmovement.net/Guide-to-BDS-Boycott" }]
    },
    {
      id: "sup-siemens", section: "backers",
      name: "Siemens", aliases: ["סימנס"],
      company: "גרמניה", what: "יעד חרם מרכזי",
      why: "מופיעה ברשימת יעדי העדיפות של תנועת ה-BDS בשל התקשרויותיה בישראל.",
      sources: [{ publisher: "BDS Movement", title: "Guide to BDS Boycott & Pressure Corporate Priority Targeting", url: "https://bdsmovement.net/Guide-to-BDS-Boycott" }]
    },

    /* ═══ חברות ישראליות ═══ */

    {
      id: "sup-wix", section: "companies",
      name: "Wix", aliases: ["ויקס"],
      company: "תל אביב · נוסדה 2006", what: "בניית אתרים",
      why: "חברת תוכנה ישראלית הנסחרת בבורסה האמריקאית, המספקת שירותי בניית אתרים בענן. נוסדה בתל אביב בידי אבישי אברהמי, נדב אברהמי וגיורא קפלן.",
      sources: [{ publisher: "Wikipedia", title: "Wix.com", url: "https://en.wikipedia.org/wiki/Wix.com" }]
    },
    {
      id: "sup-monday", section: "companies",
      name: "monday.com", aliases: ["מאנדיי"],
      company: "תל אביב", what: "ניהול עבודה",
      why: "חברת תוכנה גלובלית מתל אביב המפתחת פלטפורמת ניהול תהליכי עבודה מבוססת דפדפן ובינה מלאכותית. מהסטארט-אפים היקרים בישראל.",
      sources: [{ publisher: "Wikipedia", title: "Monday.com", url: "https://en.wikipedia.org/wiki/Monday.com" }]
    },
    {
      id: "sup-fiverr", section: "companies",
      name: "Fiverr", aliases: ["פייבר"],
      company: "תל אביב", what: "שוק פרילנסרים",
      why: "שוק מקוון רב-לאומי לשירותי פרילנס שנוסד בישראל וצמח לפעילות עולמית, המחבר עסקים לנותני שירותים דיגיטליים.",
      sources: [{ publisher: "Wikipedia", title: "Fiverr", url: "https://en.wikipedia.org/wiki/Fiverr" }]
    },
    {
      id: "sup-checkpoint", section: "companies",
      name: "Check Point", aliases: ["צ׳ק פוינט", "Check Point Software Technologies"],
      company: "תל אביב", what: "אבטחת סייבר",
      why: "חברת אבטחת סייבר ישראלית הפועלת בלמעלה מ-60 מדינות ומגנה על יותר מ-100,000 ארגונים ברחבי העולם.",
      sources: [{ publisher: "Wikipedia", title: "Check Point", url: "https://en.wikipedia.org/wiki/Check_Point" }]
    },
    {
      id: "sup-netafim", section: "companies",
      name: "נטפים", aliases: ["Netafim"],
      company: "קיבוץ חצרים", what: "השקיה בטפטוף",
      why: "החברה שפיתחה והפיצה את טכנולוגיית ההשקיה בטפטוף, מהמותגים הישראליים הנפוצים בעולם בתחום החקלאות.",
      sources: [{ publisher: "Built In", title: "Largest Companies in Israel", url: "https://builtin.com/articles/israel-largest-companies" }]
    },
    {
      id: "sup-payoneer", section: "companies",
      name: "Payoneer", aliases: ["פיוניר"],
      company: "פתח תקווה", what: "תשלומים בינלאומיים",
      why: "חברת תשלומים בינלאומיים שנוסדה בישראל ומשמשת עסקים ופרילנסרים בעולם.",
      sources: [{ publisher: "Built In", title: "Largest Companies in Israel", url: "https://builtin.com/articles/israel-largest-companies" }]
    },
    {
      id: "sup-elal", section: "companies",
      name: "אל על", aliases: ["EL AL"],
      company: "נתב״ג", what: "תעופה",
      why: "חברת התעופה הלאומית של ישראל. בתקופות שבהן חברות זרות השעו טיסות לישראל, היא נותרה קו החיים האווירי של המדינה.",
      sources: [{ publisher: "Wikipedia", title: "El Al", url: "https://en.wikipedia.org/wiki/El_Al" }]
    },
    {
      id: "sup-mobileye", section: "companies",
      name: "Mobileye", aliases: ["מובילאיי"],
      company: "ירושלים", what: "ראייה ממוחשבת לרכב",
      why: "חברה ישראלית מירושלים המפתחת מערכות סיוע לנהג ונהיגה אוטונומית, מהמובילות בעולם בתחומה.",
      sources: [{ publisher: "Built In", title: "Largest Companies in Israel", url: "https://builtin.com/articles/israel-largest-companies" }]
    },
    {
      id: "sup-teva", section: "companies",
      name: "טבע", aliases: ["Teva", "Teva Pharmaceutical Industries"],
      company: "פתח תקווה", what: "תרופות",
      why: "חברת התרופות הישראלית, מיצרניות הגנריקה הגדולות בעולם. נכללה ברשימות משיכת ההשקעות של קרנות פנסיה אירופיות — כלומר גם יעד וגם עוגן של הכלכלה הישראלית.",
      sources: [
        { publisher: "Built In", title: "Largest Companies in Israel", url: "https://builtin.com/articles/israel-largest-companies" },
        { publisher: "Pensions & Investments", title: "European pension funds have pulled investments from Israel", url: "https://www.pionline.com/rules-regulations/esg/pi-european-pension-funds-divestment-israel-ceasefire/" }
      ]
    },
    {
      id: "sup-gett", section: "companies",
      name: "Gett", aliases: ["גט", "גט טקסי"],
      company: "תל אביב", what: "הסעות ותחבורה",
      why: "חברת הסעות ישראלית הפועלת בישראל ובאירופה.",
      sources: [{ publisher: "Wikipedia", title: "Gett", url: "https://en.wikipedia.org/wiki/Gett" }]
    },

    /* ═══ מוצרים ומותגים ═══ */

    {
      id: "sup-osem", section: "products",
      name: "אוסם",
      aliases: ["Osem", "במבה", "Bamba", "ביסלי", "Bissli"],
      company: "אוסם־נסטלה", what: "מוצרי מזון",
      why: "מופיע בשמו ברשימות היעד של קמפייני חרם בינלאומיים. במבה של אוסם נכללה בתשעת המוצרים שקואופרטיב המזון של פארק סלופ בברוקלין הצביע להסיר ממדפיו במאי 2026.",
      sources: [
        { publisher: "Ireland Palestine Solidarity Campaign", title: "Boycott Israeli Goods & Services — רשימת היעד", url: "https://www.ipsc.ie/campaigns/consumer-boycott" },
        { publisher: "Jewish Telegraphic Agency", title: "Park Slope Food Coop votes for Israel boycott", url: "https://www.jta.org/2026/05/26/ny/park-slope-food-coop-votes-for-israel-boycott" }
      ]
    },
    {
      id: "sup-sabra", section: "products",
      name: "סברה", aliases: ["Sabra", "חומוס סברה"],
      company: "קבוצת שטראוס", what: "חומוס וממרחים",
      why: "מסומן בשמו ברשימות היעד של קמפייני חרם, בנימוק של הבעלות של קבוצת שטראוס.",
      sources: [
        { publisher: "CJPME", title: "Boycott — רשימת היעד", url: "https://www.cjpme.org/boycott" },
        { publisher: "Ireland Palestine Solidarity Campaign", title: "Boycott Israeli Goods & Services", url: "https://www.ipsc.ie/campaigns/consumer-boycott" }
      ]
    },
    {
      id: "sup-strauss", section: "products",
      name: "שטראוס", aliases: ["Strauss", "Strauss Group", "עלית", "Elite"],
      company: "קבוצת שטראוס", what: "מזון ומשקאות",
      why: "קבוצת שטראוס מופיעה בשמה ברשימות היעד של קמפייני חרם צרכני בינלאומיים.",
      sources: [
        { publisher: "Ireland Palestine Solidarity Campaign", title: "Boycott Israeli Goods & Services", url: "https://www.ipsc.ie/campaigns/consumer-boycott" },
        { publisher: "Ethical Consumer", title: "Palestine boycott list", url: "https://www.ethicalconsumer.org/ethical-campaigns-boycotts/palestine-boycott-list" }
      ]
    },
    {
      id: "sup-ahava", section: "products",
      name: "אהבה", aliases: ["AHAVA", "Dead Sea Laboratories"],
      company: "אהבה — מעבדות ים המלח", what: "קוסמטיקה",
      why: "אחד היעדים הוותיקים והמסומנים ביותר בקמפייני החרם, בנימוק של מיקום מפעלה ומקור חומרי הגלם שלה.",
      sources: [
        { publisher: "Ireland Palestine Solidarity Campaign", title: "Boycott Israeli Goods & Services", url: "https://www.ipsc.ie/campaigns/consumer-boycott" },
        { publisher: "BDS Movement", title: "Guide to BDS Boycott & Pressure Corporate Priority Targeting", url: "https://bdsmovement.net/Guide-to-BDS-Boycott" }
      ]
    },
    {
      id: "sup-sodastream", section: "products",
      name: "סודהסטרים", aliases: ["SodaStream"],
      company: "סודהסטרים (פפסיקו)", what: "מכשירי הגזה ביתיים",
      why: "יעד ותיק של קמפייני חרם. המפעל הועבר מאזור מעלה אדומים לאזור הנגב, והמותג נותר ברשימות היעד.",
      sources: [
        { publisher: "Ireland Palestine Solidarity Campaign", title: "Boycott Israeli Goods & Services", url: "https://www.ipsc.ie/campaigns/consumer-boycott" },
        { publisher: "BDS Movement", title: "Guide to BDS Boycott & Pressure Corporate Priority Targeting", url: "https://bdsmovement.net/Guide-to-BDS-Boycott" }
      ]
    },
    {
      id: "sup-keter", section: "products",
      name: "כתר פלסטיק", aliases: ["Keter", "Keter Plastic"],
      company: "כתר", what: "מוצרי בית וגינה",
      why: "מופיע בשמו ברשימות היעד של קמפייני חרם צרכני.",
      sources: [{ publisher: "Ireland Palestine Solidarity Campaign", title: "Boycott Israeli Goods & Services", url: "https://www.ipsc.ie/campaigns/consumer-boycott" }]
    },
    {
      id: "sup-tivall", section: "products",
      name: "תבל", aliases: ["Tivall"],
      company: "תבל (אוסם־נסטלה)", what: "תחליפי בשר צמחיים",
      why: "מופיע בשמו ברשימות היעד של קמפייני חרם צרכני.",
      sources: [{ publisher: "Ireland Palestine Solidarity Campaign", title: "Boycott Israeli Goods & Services", url: "https://www.ipsc.ie/campaigns/consumer-boycott" }]
    },
    {
      id: "sup-eden", section: "products",
      name: "עדן טבע מרש", aliases: ["Eden Springs"],
      company: "עדן ספרינגס", what: "מים ומתקני שתייה",
      why: "מופיע בשמו ברשימות היעד של קמפייני חרם, ובעבר היה יעד לקמפיינים ממוקדים בגופים ציבוריים באירופה.",
      sources: [{ publisher: "Ireland Palestine Solidarity Campaign", title: "Boycott Israeli Goods & Services", url: "https://www.ipsc.ie/campaigns/consumer-boycott" }]
    },
    {
      id: "sup-moroccanoil", section: "products",
      name: "מורוקנאויל", aliases: ["MoroccanOil"],
      company: "מורוקנאויל", what: "מוצרי טיפוח שיער",
      why: "חברה ישראלית המייצרת מוצרי שיער על בסיס שמן ארגן. מופיעה ברשימות של מותגים ישראליים שקמפייני חרם מסמנים.",
      sources: [{ publisher: "Brussels Morning", title: "Boycott alert: What brands support Israel?", url: "https://brusselsmorning.com/boycott-alert-what-brands-support-israel/72506/" }]
    },
    {
      id: "sup-dorot", section: "products",
      name: "דורות", aliases: ["Dorot", "קוביות עשבי תיבול"],
      company: "דורות", what: "קוביות שום ועשבי תיבול קפואות",
      why: "אחד מתשעת המוצרים שקואופרטיב המזון של פארק סלופ בברוקלין הצביע להסיר ממדפיו במאי 2026.",
      sources: [{ publisher: "Jewish Telegraphic Agency", title: "Park Slope Food Coop votes for Israel boycott", url: "https://www.jta.org/2026/05/26/ny/park-slope-food-coop-votes-for-israel-boycott" }]
    },
    {
      id: "sup-oliveoil", section: "products",
      name: "שמן זית ישראלי", aliases: ["Israeli olive oil"],
      company: "יצרנים שונים", what: "שמן זית",
      why: "נכלל בתשעת המוצרים שהוסרו בהחלטת קואופרטיב פארק סלופ במאי 2026.",
      sources: [{ publisher: "Jewish Telegraphic Agency", title: "Park Slope Food Coop votes for Israel boycott", url: "https://www.jta.org/2026/05/26/ny/park-slope-food-coop-votes-for-israel-boycott" }]
    },
    {
      id: "sup-sesame", section: "products",
      name: "מוצרי שומשום ישראליים", aliases: ["Israeli sesame products", "טחינה"],
      company: "יצרנים שונים", what: "טחינה ומוצרי שומשום",
      why: "נכללו בתשעת המוצרים שהוסרו בהחלטת קואופרטיב פארק סלופ במאי 2026.",
      sources: [{ publisher: "Jewish Telegraphic Agency", title: "Park Slope Food Coop votes for Israel boycott", url: "https://www.jta.org/2026/05/26/ny/park-slope-food-coop-votes-for-israel-boycott" }]
    },
    {
      id: "sup-persimmon", section: "products",
      name: "אפרסמון ישראלי", aliases: ["Israeli persimmon", "שרון פרוט"],
      company: "יצוא חקלאי", what: "פרי טרי",
      why: "נכלל בתשעת המוצרים שהוסרו בהחלטת קואופרטיב פארק סלופ במאי 2026.",
      sources: [{ publisher: "Jewish Telegraphic Agency", title: "Park Slope Food Coop votes for Israel boycott", url: "https://www.jta.org/2026/05/26/ny/park-slope-food-coop-votes-for-israel-boycott" }]
    },
    {
      id: "sup-peppers", section: "products",
      name: "פלפלים ישראליים", aliases: ["Israeli bell peppers"],
      company: "יצוא חקלאי", what: "ירקות טריים",
      why: "זן פלפל שנמכר בחורף בלבד נכלל בתשעת המוצרים שהוסרו בהחלטת קואופרטיב פארק סלופ במאי 2026.",
      sources: [{ publisher: "Jewish Telegraphic Agency", title: "Park Slope Food Coop votes for Israel boycott", url: "https://www.jta.org/2026/05/26/ny/park-slope-food-coop-votes-for-israel-boycott" }]
    },
    {
      id: "sup-carrots", section: "products",
      name: "גזר ומנגו ישראליים", aliases: ["Israeli carrots", "Israeli mangoes"],
      company: "יצוא חקלאי", what: "פירות וירקות טריים",
      why: "נכללו ברשימת כ-100 המוצרים הישראליים שרשת Co-op הבריטית מסירה בהדרגה ממדפיה לאחר הצבעת החברים במאי 2025.",
      sources: [
        { publisher: "Middle East Eye", title: "Co-op supermarket chain to stop sourcing goods from Israel", url: "https://www.middleeasteye.net/news/co-op-supermarket-chain-stop-sourcing-goods-israel-and-16-other-countries" },
        { publisher: "Middle East Monitor", title: "73% of Co-op members vote to boycott Israeli goods", url: "https://www.middleeastmonitor.com/20250519-73-of-co-op-members-vote-to-boycott-israeli-goods-in-landmark-motion/" }
      ]
    },
    {
      id: "sup-stripe", section: "products",
      name: "Stripe", aliases: ["סטרייפ", "Patrick Collison"],
      company: "Stripe", what: "סליקה ותשלומים",
      why: "המנכ״ל והמייסד פטריק קוליסון פרסם ברשת פוסט בשבח ישראל, ובעקבותיו נקראו קריאות להחרים את החברה.",
      sources: [{ publisher: "Advocating Peace", title: "Calls to Boycott Stripe After CEO Patrick Collison Praises Israel", url: "https://www.advocatingpeace.com/2024/11/29/calls-to-boycott-stripe-after-ceo-patrick-collison-praises-israel-amid-gaza-genocide/" }]
    },
    {
      id: "sup-puregym", section: "products",
      name: "PureGym", aliases: ["פיור ג׳ים", "Humphrey Cobbold"],
      company: "PureGym", what: "רשת חדרי כושר",
      why: "החל ממאי 2024 הרשת היא יעד לקמפיין חרם, לאחר שהמנכ״ל האמפרי קובולד הביע תמיכה במכירת נשק בריטי לישראל בתוכנית BBC Question Time.",
      sources: [{ publisher: "Ethical Consumer", title: "Active Consumer Boycotts List", url: "https://www.ethicalconsumer.org/ethicalcampaigns/boycotts" }]
    }
  ]
};
