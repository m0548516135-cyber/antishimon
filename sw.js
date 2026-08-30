/* =========================================================================
   אנטישימון — Service Worker
   -------------------------------------------------------------------------
   שתי אסטרטגיות שונות, כי לשני סוגי הקבצים יש צרכים הפוכים:

   שלד האפליקציה (HTML/CSS/JS/נתונים מצורפים) — cache first.
   הוא נדיר משתנה, וחשוב שהאפליקציה תיפתח מיד גם בלי רשת.

   חבילת הנתונים המרוחקת — network first עם נפילה למטמון.
   שם דווקא רוצים את הטרי ביותר, ורק אם אין רשת מסתפקים בישן.

   כשעולה גרסה חדשה של השלד, ה-SW מנקה מטמונים ישנים ומודיע לדף.
   ========================================================================= */

const VERSION = "v16";
const SHELL = "antishimon-shell-" + VERSION;
const DATA  = "antishimon-data-" + VERSION;

const SHELL_FILES = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./assets/styles.css",
  "./assets/fonts.css",
  "./assets/fonts/IBMPlexMono-400-latin.woff2",
  "./assets/fonts/IBMPlexMono-500-latin.woff2",
  "./assets/fonts/IBMPlexMono-600-latin.woff2",
  "./assets/fonts/Rubik-300-hebrew.woff2",
  "./assets/fonts/Rubik-300-latin.woff2",
  "./assets/fonts/Rubik-400-hebrew.woff2",
  "./assets/fonts/Rubik-400-latin.woff2",
  "./assets/fonts/Rubik-500-hebrew.woff2",
  "./assets/fonts/Rubik-500-latin.woff2",
  "./assets/fonts/Rubik-600-hebrew.woff2",
  "./assets/fonts/Rubik-600-latin.woff2",
  "./assets/fonts/Rubik-700-hebrew.woff2",
  "./assets/fonts/Rubik-700-latin.woff2",
  "./assets/fonts/SuezOne-400-hebrew.woff2",
  "./assets/fonts/SuezOne-400-latin.woff2",
  "./assets/config.js",
  "./assets/api.js",
  "./assets/i18n.js",
  "./assets/i18n-data.js",
  "./assets/data-world.js",
  "./assets/data-geo.js",
  "./assets/app.js",
  "./assets/data-places.js",
  "./assets/data.js",
  "./assets/data-support.js",
  "./assets/data-signers.js",
  "./assets/data-incoming.js",
  "./assets/icon-192.png",
  "./assets/icon-512.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(SHELL)
      /* addAll נכשל כולו אם קובץ אחד חסר — מוסיפים אחד-אחד כדי
         שגופן או אייקון חסר לא ימנעו את ההתקנה כולה */
      .then((c) => Promise.all(SHELL_FILES.map((f) => c.add(f).catch(() => null))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k !== SHELL && k !== DATA).map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);

  /* בקשות לשרת האפליקציה אינן עוברות כאן בכלל.
     זה לא אופטימיזציה אלא תיקון: השלד נשמר במטמון-קודם, וכלל כזה על
     /audio היה מגיש הקלטה של הגשה ממתינה מתוך המטמון גם אחרי יציאה
     מהחשבון — כלומר לחשבון אחר על אותו מכשיר. תשובות עם הרשאה אישית
     אסור לשמור, ולכן הן הולכות לרשת ישירות בכל פעם. */
  if (/(^|\/)(antishimon-)?api(\/|$)/.test(url.pathname)) return;

  const isData = /data-bundle\.json|version\.json/.test(url.pathname);

  if (isData) {
    /* טרי קודם. אם אין רשת — מה שיש במטמון. */
    e.respondWith(
      fetch(req)
        .then((res) => {
          if (res && res.ok) {
            const copy = res.clone();
            caches.open(DATA).then((c) => c.put(req, copy));
          }
          return res;
        })
        .catch(() => caches.match(req))
    );
    return;
  }

  /* שלד: מטמון קודם, ורענון ברקע לפעם הבאה */
  e.respondWith(
    caches.match(req).then((hit) => {
      const net = fetch(req)
        .then((res) => {
          if (res && res.ok && url.origin === self.location.origin) {
            const copy = res.clone();
            caches.open(SHELL).then((c) => c.put(req, copy));
          }
          return res;
        })
        .catch(() => hit);
      return hit || net;
    })
  );
});
