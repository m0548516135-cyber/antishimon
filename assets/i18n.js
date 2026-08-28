/* =========================================================================
   אנטישימון — שכבת שפה
   -------------------------------------------------------------------------
   מתרגמת את הממשק והטקסונומיה: כפתורים, קטגוריות, סולם החומרה,
   סטטוסי האימות וציר האחריות.

   תרגום התוכן עצמו — שמות מדינות, תגיות ותקצירי הרשומות — יושב
   ב-assets/i18n-data.js. שני הקבצים ביחד מכסים את כל מה שנראה על
   המסך; בלי השני נשאר דף אנגלי עם פסקאות עבריות באמצע.

   שם הרשומה מוצג מה-alias הלועזי כשיש כזה, ולרוב יש —
   רוב הגופים במאגר בינלאומיים.
   ========================================================================= */

window.ANTISHIMON_I18N = {

  he: { dir: "rtl", label: "עברית", other: "EN" },

  en: {
    dir: "ltr", label: "English", other: "עב",

    ui: {
      "לדעת את מי": "Know who",
      "אתם מממנים": "you fund",
      "מרשם ראיות · עודכן": "Evidence registry · updated",
      "גופים שהכריזו בעצמם על חרם או עמדה נגד ישראל, ומקרים שבהם נקבע ממצא רשמי בנושא אנטישמיות. אין כאן שמועות — לכל רשומה מקור שאפשר לפתוח ולבדוק.":
        "Entities that publicly declared a boycott or a position against Israel, and cases with an official finding on antisemitism. No rumours — every record carries a source you can open and check.",
      "חפשו חברה, מוסד, אדם או מדינה…": "Search a company, institution, person or country…",
      "סריקת ברקוד": "Scan barcode",
      "מי לא לממן": "Who not to fund",
      "את מי כן": "Who to back",
      "כללי המרשם": "Registry rules",
      "הוספת רשומה": "Add a record",
      "מאגר": "Data",
      "ייצוא JSON": "Export JSON",
      "ייבוא JSON": "Import JSON",
      "נוסף לאחרונה": "Recently added",
      "מה חדש": "What's new",
      "אחריות": "Responsibility",
      "אזור": "Region",
      "מדינה": "Country",
      "עיר": "City",
      "אימות": "Verification",
      "מיון": "Sort",
      "הכול": "All",
      "חומרה": "Severity",
      "עדכניות": "Recency",
      "מקורות": "Sources",
      "שם": "Name",
      "איפוס": "Reset",
      "★ מעקב": "★ Watchlist",
      "✈ מצב טיול": "✈ Destination check",
      "פריסה גיאוגרפית": "Geographic spread",
      "הסתרה": "Hide",
      "הצגה": "Show",
      "כל הרשומות": "All records",
      "תוצאות סינון": "Filtered results",
      "רשומות": "records",
      "מוצגות": "showing",
      "גופים במרשם": "entities",
      "מקורות ייחודיים": "unique sources",
      "חותמי עצומות": "petition signers",
      "מדינות": "countries",
      "אין התאמה": "No match",
      "שיתוף בוואטסאפ": "Share",
      "☆ הוספה למעקב": "☆ Watch",
      "★ במעקב": "★ Watching",
      "העתקה כ־JSON": "Copy as JSON",
      "בקשת תיקון": "Request a correction",
      "העתקת קישור": "Copy link",
      "מקור": "source",
      "מקורות מתועדים": "documented sources",

      /* פתיח, כותרת תחתונה וניווט */
      "דלג לרשומות": "Skip to records",
      "הסתרת מאגר הבסיס": "Hide the base registry",
      "מי לא לממן": "Who not to fund",
      "רשומות ממופות": "records mapped",
      "(לפי הסינון הנוכחי)": "(under the current filter)",
      "הדרגה אומרת מה נטען. האימות אומר כמה זה מבוסס.":
        "The level says what is claimed. The verification says how well founded it is.",
      "רשומה שהופרכה נשארת כאן מסומנת ״בוטל / תוקן״ עם הסבר — שקיפות על טעויות היא חלק מהאמינות, לא פגיעה בה.":
        "A record that has been refuted stays here marked \"retracted / corrected\" with an explanation — being open about mistakes is part of credibility, not a dent in it.",
      "המרשם מציג דיווחים וממצאים רשמיים, לא פסקי דין. לפני הסתמכות על רשומה — פתחו את המקורות שלה. מצאתם שגיאה? כפתור ״בקשת תיקון״ בתוך כל רשומה.":
        "The registry presents reports and official findings, not court rulings. Before relying on a record — open its sources. Found an error? There is a \"Request a correction\" button inside every record.",

      /* תיק הרשומה */
      "קטגוריה": "Category", "היקף": "Scope", "גלובלי": "Global", "מקומי": "Local",
      "גוף אם": "Parent body", "עודכן": "Updated", "חלופות": "Alternatives",
      "פתיחת המקור": "Open the source",
      "אין מקורות. אל תסתמכו על הרשומה.": "No sources. Do not rely on this record.",
      "הרשומה בוטלה.": "This record has been retracted.",
      "הדיווח הופרך או תוקן. הרשומה נשמרת לשקיפות בלבד.":
        "The report was refuted or corrected. The record is kept for transparency only.",
      "שנוי במחלוקת.": "Disputed.",
      "קראו את המקורות משני הצדדים.": "Read the sources on both sides.",
      "לא אומת.": "Not verified.",
      "אין מקורות.": "No sources.",
      "רשומה ללא מקור אינה ראיה לכלום.": "A record with no source is evidence of nothing.",
      "מקור יחיד.": "Single source.",
      "הרשומה נשענת על מקור אחד בלבד. שקלו אותה בהתאם.":
        "This record rests on one source alone. Weigh it accordingly.",

      /* תוצאות */
      "הצגת": "Show", "נוספות · נותרו": "more · remaining", "פריטים": "items",
      "לא נמצאה רשומה עבור": "No record found for",
      "ייתכן שהיא פשוט עוד לא במרשם.": "It may simply not be in the registry yet.",
      "אף רשומה לא עומדת בשילוב הסינון הזה.": "No record matches this combination of filters.",
      "איפוס סינון": "Clear filters",
      "אנטישימון": "Antishimon",
      "כניסה / הרשמה": "Sign in / Register", "כניסה לחשבון": "Sign in",
      "פתיחת חשבון": "Create account", "כניסה": "Sign in",
      "שם תצוגה": "Display name", "אימייל": "Email", "סיסמה": "Password",
      "השם שיוצג לצד סיפור שאושר": "The name shown beside an approved story",
      "לפחות 8 תווים.": "At least 8 characters.",
      "כבר יש לי חשבון": "I already have an account",
      "אין לי חשבון עדיין": "I don't have an account yet",
      "שכחתי סיסמה": "Forgot password", "רגע…": "One moment…",
      "חשבון נדרש כדי להגיש רשומה או לפרסם סיפור אישי. הקריאה במרשם פתוחה לכולם, גם בלי חשבון.":
        "An account is required to submit a record or publish a personal account. Reading the registry is open to everyone, with or without an account.",
      "נשלח אליכם מייל": "We sent you an email",
      "שלחנו קישור אישור לכתובת שהזנתם. אחרי האישור אפשר להיכנס.":
        "We sent a confirmation link to the address you entered. After confirming, you can sign in.",
      "אימייל או סיסמה שגויים.": "Wrong email or password.",
      "הכתובת הזאת כבר רשומה.": "That address is already registered.",
      "הסיסמה קצרה מדי — לפחות 8 תווים.": "Password too short — at least 8 characters.",
      "צריך לאשר את המייל לפני הכניסה.": "You need to confirm your email before signing in.",
      "החשבון נפתח": "Account created", "שלום, ": "Hello, ",
      "יציאה מהחשבון": "Sign out", "יצאתם מהחשבון": "Signed out",
      "כתובת המייל שלכם:": "Your email address:",
      "נשלח קישור לאיפוס": "A reset link has been sent",
      "לא הצלחנו לשלוח": "We could not send it",
      "צוות": "Staff", "טוען…": "Loading…",
      "עוד לא הגשתם דבר.": "You have not submitted anything yet.",
      "לא הצלחנו לטעון.": "We could not load that.",
      "ממתין לבדיקה": "Awaiting review",
      "סומן לבדיקה ידנית": "Flagged for manual review",
      "עבר סינון — ממתין לאישור": "Passed screening — awaiting approval",
      "אושר ופורסם": "Approved and published", "נדחה": "Rejected",
      "תור ביקורת": "Review queue", "אין הרשאה": "Not authorised",
      "שום דבר כאן אינו מפורסם עדיין. בדיקת ה-AI היא סינון ראשוני בלבד — ההחלטה שלכם.":
        "Nothing here is published yet. The AI check is a first screen only — the decision is yours.",
      "סיפורים": "Stories", "רשומות ": "Records ",
      "התור ריק. אין מה לאשר.": "The queue is empty. Nothing to approve.",
      "תמליל ההקלטה": "Recording transcript", "האזנה": "Listen",
      "לא נמצאו דגלים": "No flags raised", "הצעת דרגה": "Suggested level",
      "נימוק — יוצג למגיש בדחייה": "Reason — shown to the submitter on rejection",
      "אישור ופרסום": "Approve and publish", "דחייה": "Reject",
      "דחייה מחייבת נימוק": "Rejection requires a reason",
      "לא הצלחנו לטעון את ההקלטה": "We could not load the recording",
      "אין מקור שאפשר לפתוח": "No source that can be opened",
      "מערבב ביקורת מדינית עם אנטישמיות": "Conflates political criticism with antisemitism",
      "פרטים מזהים של אדם פרטי": "Identifying details of a private individual",
      "התוכן עצמו מכיל הסתה": "The content itself contains incitement",
      "לא ניתן לאימות": "Cannot be verified",
      "ייתכן שכבר במרשם": "May already be in the registry",
      "לא בנושא": "Off topic",
      "בדיקת ה-AI לא רצה": "The AI check did not run",
      "תשובת AI לא תקינה": "Malformed AI response",      "תנאים ופרטיות": "Terms & privacy", "הבנתי": "Got it",
      "הבנתי, הכניסו אותי": "I understand — let me in",
      "המרשם": "The registry", "שקיפות": "Transparency",
      "תועד לאחרונה": "Recently documented",
      "לפני שמסתמכים": "Before you rely on it",
      "מקורות הניטור": "Monitoring sources",
      "מעבר לשם": "Go there", "מעבר ל״את מי כן״": "Go to “Who to back”",
      "תוצאות תואמות נמצאו בלשונית ״את מי כן״.": "matching results were found in the “Who to back” tab.",
      "תוצאות תואמות נמצאו בלשונית ״מי לא לממן״.": "matching results were found in the “Who not to fund” tab.",
      "גופי ניטור — מספרי האירועים": "Monitoring bodies — incident figures",
      "מקורות סריקה שוטפים": "Continuously scanned sources",
      "הדוח": "The report",
      "המרשם אינו סופר בעצמו. מספרי האירועים מגיעים מגופי ניטור שמפרסמים מתודולוגיה ודוח שנתי, והתיעוד השוטף נסרק ממקורות קבועים. כל מספר כאן ניתן לאימות במקור.":
        "The registry does not count on its own. Incident figures come from monitoring bodies that publish a methodology and an annual report, and ongoing documentation is scanned from fixed sources. Every number here can be verified at source.",
      "שימו לב: לכל גוף מנטר הגדרה משלו ל״אירוע״, ולכן השוואה ישירה בין מדינות מחייבת זהירות. הפירוט בכל רשומת מקום.":
        "Note: every monitoring body defines an “incident” differently, so direct comparison between countries requires care. Details appear in each place record.",
      "אתר רשמי": "Official site", "אתר הארגון": "Organisation site",
      "המקורות": "The sources", "כאן": "Kan",

      /* מקומות ומדינות */
      "מקומות": "places", "אירועים": "incidents", "אירועים מתועדים": "documented incidents",
      "רשומות במרשם": "records in the registry",
      "ל-10,000 יהודים": "per 10,000 Jews",
      "החלטה מוסדית": "Institutional decision",
      "איסור כניסה ממלכתי": "State entry ban",

      /* בדיקת יעד */
      "בדיקת יעד": "Destination check",
      "הקלידו מדינה, עיר או עצירת ביניים.": "Enter a country, a city or a transit stop.",
      "מדינות מגבילות כניסה לבעלי דרכון ישראלי,": "countries restrict entry for Israeli passport holders,",
      "יעדים נוספים נמדדים בידי גופי ניטור רשמיים.": "further destinations are measured by official monitoring bodies.",
      "לאן טסים?": "Where are you flying?",
      "לדוגמה: צרפת, פריז, מלזיה": "e.g. France, Paris, Malaysia",
      "בדיקה": "Check", "הזינו מדינת יעד": "Enter a destination",
      "מדינות שמגבילות כניסה": "Countries that restrict entry",
      "יעדים עם נתוני אירועים": "Destinations with incident data",
      "טרנזיט": "transit", "פרטים": "Details", "סגירה": "Close",
      "המקורות המלאים": "Full sources",
      "אין הגבלה ידועה": "No known restriction",
      "״": "\u201c",
      "״ אינה מופיעה ברשימת המדינות שמגבילות כניסה, ואין לגביה נתוני אירועים במאגר.":
        "\u201d does not appear on the list of countries that restrict entry, and there is no incident data for it in the registry.",
      "זה לא אישור רשמי — לפני טיסה בדקו תמיד באתר משרד החוץ.":
        "This is not official clearance — always check the foreign ministry site before flying.",
      "הכניסה אינה מוגבלת": "Entry is not restricted",
      "אין איסור כניסה לבעלי דרכון ישראלי. מה שכן ידוע על היעד מופיע למטה.":
        "There is no entry ban for Israeli passport holders. What is known about the destination appears below.",
      "סיכון גם בטיסת המשך": "Risk on connecting flights too",
      "כניסה אסורה": "Entry barred",
      "כניסה מוגבלת — נדרש אישור מיוחד": "Entry restricted — special permit required",
      "כניסה מוגבלת": "Entry restricted", "מוגבל": "Restricted",
      "מקור:": "Source:", "תקיפות פיזיות": "physical assaults", "לעומת": "vs",
      "ערים ביעד": "Cities at this destination",
      "רשומות נוספות במרשם ממוקמות ביעד הזה — חברות, מוסדות ואנשים.":
        "further records in the registry are located at this destination — companies, institutions and people.",
      "הצגתן ברשימה": "Show them in the list",
      "רשומה נוספת במרשם ממוקמת ביעד הזה — חברה, מוסד או אדם.":
        "further record in the registry is located at this destination — a company, an institution or a person.",
      "אירועים מתועדים במרשם": "documented in the registry",
      "על ההשוואה בין מדינות.": "On comparing countries.",
      "לכל גוף מנטר הגדרה משלו ל״אירוע״. RIAS בגרמניה כולל גם אירועים מקוונים — 27% מהתיעוד שלו — ו-CST הבריטי סופר אחרת. השיעור לנפש מאפשר להשוות מקום לעצמו לאורך זמן, ובזהירות רבה בין מקומות; הוא אינו דירוג של ״כמה אנטישמית״ מדינה.":
        "Every monitoring body defines an \"incident\" differently. RIAS in Germany includes online incidents — 27% of its records — and CST in Britain counts differently. The per-capita rate lets you compare a place to itself over time, and with great care between places; it is not a ranking of how antisemitic a country is.",
      "גודל הנקודה — היקף האירועים לנפש": "Dot size — incident rate per capita",
      "טבעת — החלטה של עירייה או ממשלה": "Ring — a municipal or government decision", "ישראל היום": "Israel Hayom", "הארץ": "Haaretz",
      "חדש · לאישור": "New · pending",
      "חדש": "New", "מתוך": "of", "תואמים לחיפוש.": "match the search.",
      "אין פריט תואם לחיפוש הזה.": "No item matches this search.",

      /* סיפורים אישיים */
      "סיפורים אישיים": "Personal accounts",
      "✎ הגשת עדות": "✎ Submit testimony",
      "● הקלטה": "● Record",
      "עדות נבחרת": "Selected testimony",
      "העדות האחרונה": "Latest testimony",
      "ללא כותרת": "Untitled",
      "עדות": "testimony",
      "עדויות": "testimonies",
      "עדות שפורסמה": "testimony published",
      "עדויות שפורסמו": "testimonies published",
      "הגשה שלכם ממתינה": "submission of yours is waiting",
      "הגשות שלכם ממתינות": "submissions of yours are waiting",
      "תמונה לשיתוף": "Share image",
      "ביטול ההגשה": "Withdraw submission",
      "ההגשה בוטלה": "Submission withdrawn",
      "מאת": "by",
      "תמלול": "Transcript",
      "אין תמלול — יש להאזין": "No transcript — listen to the recording",
      "הערת הבדיקה": "Review note",
      "פרטים": "Details",
      "טוען עדויות…": "Loading testimonies…",
      "שולח…": "Sending…",
      "העדות התקבלה": "Testimony received",
      "היא נשלחה לבדיקה ואינה מפורסמת עדיין. אחרי אישור היא תופיע כאן לצד שם התצוגה שלכם — כתובת המייל לעולם אינה מוצגת.":
        "It has been sent for review and is not published yet. Once approved it will appear here beside your display name — your email address is never shown.",
      "ההגשות שלי": "My submissions",
      "השירות אינו זמין כרגע": "The service is unavailable right now",
      "כל אחת אושרה לפני פרסום": "each one approved before publication",
      "עוד אין עדויות כאן": "No testimonies here yet",
      "חזרה": "Back",
      "ביטול": "Cancel",
      "שמירה": "Save",
      "מקומות ומדינות": "Places & countries",
      "מותגים ומוצרים": "Brands & products",

      /* חשבון והגשות */
      "הרשמה": "Sign up",
      "הגשת עדות": "Submit testimony",
      "נוספו לאחרונה": "Recently added",
      "כניסה למרשם": "Registry access",
      "המרשם פתוח לבעלי חשבון": "The registry is open to account holders",
      "כאן נקובים שמות של חברות, מוסדות ואנשים אמיתיים. חשבון נדרש כדי שלכל צפייה והגשה יהיה בעלים — ולא כדי לאסוף עליכם מידע: מספיקים שם תצוגה, מייל וסיסמה.": "This registry names real companies, institutions and people. An account is required so that every view and submission has an owner — not to collect data about you: a display name, an email and a password are all it takes.",
      "כבר יש לי חשבון": "I already have an account",
      "תנאים ופרטיות": "Terms and privacy",
      "הגדרות מפתחים": "Developer settings",
      "החלק הזה גלוי רק לחשבון צוות. התפקיד נקבע בשרת — לא בדפדפן — ולכן עריכת הקוד כאן לא תפתח אותו לאיש.": "This section is visible only to a staff account. The role is set on the server — not in the browser — so editing this code will not unlock it for anyone.",
      "מצב הנתונים": "Data status",
      "גרסת הנתונים": "Data version",
      "מצב העדכון היומי": "Daily update status",
      "פתיחת הדוח": "Open report",
      "תור ביקורת בשרת": "Server review queue",
      "פתיחה": "Open",
      "איכות המרשם": "Registry quality",
      "סה״כ רשומות": "Total records",
      "נאספו אוטומטית — לא נבדקו": "Auto-collected — unreviewed",
      "בסטטוס ״לא אומת״": "Marked unverified",
      "בלי מקור כלל": "With no source at all",
      "עם מקור יחיד": "With a single source",
      "אישור ודחייה הם מקומיים.": "Approve and reject are local.",
      "הם נשמרים בדפדפן הזה בלבד ואינם משנים את מה שמבקרים אחרים רואים. אישור אמיתי מחייב שרת פעיל, ואז הוא עובר דרך תור הביקורת.": "They are stored in this browser only and do not change what other visitors see. Real approval requires a live server, and then it goes through the review queue.",
      "איפוס אישורים מקומיים": "Reset local approvals",
      "האישורים המקומיים אופסו": "Local approvals reset",
      "אושרה — במכשיר הזה בלבד": "Approved — on this device only",
      "הוסרה — במכשיר הזה בלבד": "Removed — on this device only",
      "נאספה אוטומטית": "Auto-collected",
      "נאספה אוטומטית — איש עדיין לא בדק אותה.": "Auto-collected — nobody has reviewed it yet.",
      "הרשומה נאספה בידי סוכן אוטומטי ב־": "Collected by an automated agent on ",
      "היא עברה בדיקה טכנית בלבד: שיש מקורות, שהקישורים נפתחים, ושאין כפילות. תוכן הטענה עצמה טרם נבדק בידי אדם.": "It passed technical checks only: that sources exist, that the links open, and that it is not a duplicate. The substance of the claim has not been checked by a person.",
      "אל תסתמכו עליה — פתחו את המקורות ובדקו בעצמכם.": "Do not rely on it — open the sources and check for yourself.",
      "אישור לרשומה": "Approve as record",
      "דחייה והסרה": "Reject and remove",
      "לא אומת.": "Not verified.",
      "היום": "Today",
      "השבוע": "This week",
      "החודש": "This month",
      "מצב עדכון": "Update status",
      "עודכן היום": "Updated today",
      "עודכן אתמול": "Updated yesterday",
      "מתי המרשם עודכן לאחרונה": "When the registry last received data",
      "מצב עדכון הנתונים": "Data update status",
      "המרשם נבנה מסוכן שרץ כל יום ומפרסם חבילת נתונים. כאן אפשר לראות אם היא באמת מגיעה.": "The registry is built by an agent that runs daily and publishes a data bundle. This shows whether it actually arrives.",
      "מתעדכן כסדרו": "Updating normally",
      "לא התקבל עדכון כמה ימים": "No update received for several days",
      "העדכון תקוע — כדאי לבדוק את הסוכן היומי": "Updates are stuck — check the daily agent",
      "לא ידוע": "Unknown",
      "גרסת הנתונים שבידכם": "Your data version",
      "גיל הנתונים": "Data age",
      "בדיקה אחרונה מול השרת": "Last check against the server",
      "תוצאת הבדיקה האחרונה": "Last check result",
      "עוד לא נבדק": "Not checked yet",
      "הצליחה": "Succeeded",
      "נכשלה": "Failed",
      "רשומות מוצגות": "Records shown",
      "נוספו בשבוע האחרון": "Added in the last week",
      "נוספו בחודש האחרון": "Added in the last month",
      "ממתינים לאישור": "Awaiting approval",
      "בדיקה עכשיו": "Check now",
      "בודק…": "Checking…",
      "מעולם": "Never",
      "לפני פחות משעה": "Less than an hour ago",
      "יום": "day",
      "ימים": "days",
      "רשומות חדשות": "new records",
      "המאגר עודכן": "Registry updated",
      "עודכן": "Updated",
      "חשבון נדרש כדי להגיש רשומה או לפרסם סיפור. הקריאה במרשם פתוחה לכולם — גם בלי חשבון.":
        "An account is required to submit a record or a testimony. Reading the registry is open to everyone, with or without an account.",
      "השם שיוצג לצד הגשה שאושרה": "The name shown beside an approved submission",
      "ההגשות סגורות כרגע — שרת המרשם אינו זמין. נסו שוב מאוחר יותר.":
        "Submissions are closed right now — the registry server is unavailable. Please try again later.",
      "ההגשה התקבלה": "Submission received",
      "הרשומה נשלחה לבדיקה ואינה מופיעה במרשם עדיין. נעבור עליה ונחליט — תוכלו לעקוב אחרי הסטטוס בחשבון שלכם.":
        "The record has been sent for review and does not appear in the registry yet. We will go over it and decide — you can follow its status in your account.",

      /* תור הבדיקה — צוות בלבד */
      "הגיש": "Submitted by",
      "אין מקור": "No source",
      "דרגה שהוצעה": "Suggested severity"
    },

    kind: {
      street: "In the street", work: "At work", campus: "At school",
      online: "Online", service: "At a business or service", other: "Other"
    },

    cat: {
      company: "Companies", brand: "Brands & products", person: "People",
      org: "Organisations", place: "Places & countries", media: "Media",
      academic: "Academia", sport: "Sport", entertainment: "Culture"
    },
    catShort: {
      company: "Company", brand: "Brand", person: "Person", org: "Org",
      place: "Place", media: "Media", academic: "Academia",
      sport: "Sport", entertainment: "Culture"
    },
    sev: {
      1: "Problematic remark",
      2: "Anti-Israel position",
      3: "Boycott or discrimination",
      4: "Explicit antisemitism"
    },
    sevDesc: {
      1: "A single, vague or contested statement. Not a pattern.",
      2: "A consistent political position against Israel or its policy. Not antisemitism in itself.",
      3: "An actual boycott, refusal of service by nationality, or incitement against Israelis.",
      4: "Harm to Jews as such: Holocaust denial, incitement, institutional failure to protect them."
    },
    status: {
      verified: "Verified", review: "Not verified",
      disputed: "Disputed", retracted: "Retracted / corrected"
    },
    statusDesc: {
      verified: "Confirmed against a primary source that can be opened and checked.",
      review: "A report exists, but nobody has verified it yet. Open the sources and check for yourself.",
      disputed: "Two accounts stand against each other and neither has been settled.",
      retracted: "The report was refuted or corrected. Kept for transparency."
    },
    actor: {
      entity: "Entity decision", leadership: "Executive remarks", individual: "Private individual"
    },
    actorShort: { entity: "Entity", leadership: "Exec", individual: "Person" },
    actorDesc: {
      entity: "A member vote, board decision or official policy. This is the organisation's position.",
      leadership: "A senior figure spoke, but there is no decision or policy by the entity. This is a person's position — not the company's and not the product's.",
      individual: "A person in their own name. No company, product or organisation bears responsibility here."
    }
  }
};
