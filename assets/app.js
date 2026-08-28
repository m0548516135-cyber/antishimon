/* =========================================================================
   אנטישימון — לוגיקת האפליקציה
   ללא תלויות. רץ ישירות מ־file:// בלי שרת ובלי בנייה.
   ========================================================================= */
(function () {
"use strict";

/* ── כלים ─────────────────────────────────────────────────────────────── */

var $ = function (s, r) { return (r || document).querySelector(s); };

function esc(v) {
  return String(v == null ? "" : v)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

/* רק http/https נכנס ל-href */
function safeUrl(u) {
  var s = String(u || "").trim();
  return /^https?:\/\//i.test(s) ? s : "";
}

/* נרמול עברי: ניקוד, גרשיים, מקפים ואותיות סופיות.
   tight=true מוחק מפרידים לגמרי, כדי ש-"coop" ימצא את "Co-op". */
var FINALS = { "ם": "מ", "ן": "נ", "ץ": "צ", "ף": "פ", "ך": "כ" };
function norm(s, tight) {
  return String(s || "")
    .toLowerCase()
    .replace(/[֑-ׇ]/g, "")
    .replace(/[׳״'"`]/g, "")
    .replace(/[־\-–—_/]/g, tight ? "" : " ")
    .replace(/[םןץףך]/g, function (c) { return FINALS[c]; })
    .replace(/\s+/g, " ")
    .trim();
}

/* תאריכים נשמרים בדיוק שבו הם מתועדים: YYYY-MM-DD, YYYY-MM או YYYY.
   עדיף להציג "05/2025" מאשר להמציא יום שלא מופיע במקור. */
function fmtDate(iso) {
  var p = String(iso || "").split("-");
  if (!p[0]) return "—";
  if (p[2]) return p[2] + "." + p[1] + "." + p[0].slice(2);
  if (p[1]) return p[1] + "/" + p[0];
  return p[0];
}
function dateKey(iso) {
  var p = String(iso || "").split("-");
  return (p[0] || "0000") + "-" + (p[1] || "01") + "-" + (p[2] || "01");
}

/* ── אחסון ────────────────────────────────────────────────────────────── */

var LS = {
  theme: "antishimon:theme",
  user: "antishimon:user-entries",
  wiped: "antishimon:base-wiped",
  approved: "antishimon:approved",
  rejected: "antishimon:rejected",
  watch: "antishimon:watch",
  seen: "antishimon:seen-snapshot",
  codes: "antishimon:barcodes"
};

function lsGet(k, fb) {
  try { var v = localStorage.getItem(k); return v == null ? fb : JSON.parse(v); }
  catch (_) { return fb; }
}
function lsSet(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (_) {} }

/* ── עדכון מרחוק ──────────────────────────────────────────────────────────
   האפליקציה עולה תמיד מהנתונים שבידה — המצורפים, או עדכון שנשמר בפעם
   קודמת. רק אחר כך, ברקע, היא בודקת אם יש גרסה חדשה. כך אין מסך טעינה,
   ואין מצב שבו היעדר רשת שובר את האפליקציה.

   מה שנמשך הוא JSON בלבד, שנקרא ולא מורץ. עדכון שמגיע פגום נדחה
   ומה שהיה נשמר.
   ------------------------------------------------------------------------ */

var CFG = window.ANTISHIMON_CONFIG || { remote: "", checkEveryHours: 6 };

var LSR = {
  bundle:  "antishimon:bundle",
  version: "antishimon:bundle-version",
  checked: "antishimon:last-check",
  status:  "antishimon:last-sync"
};

/* עדכון שנשמר בביקור קודם גובר על המצורף */
(function applyStoredBundle() {
  var raw;
  try { raw = localStorage.getItem(LSR.bundle); } catch (_) { return; }
  if (!raw) return;
  try {
    var b = JSON.parse(raw);
    if (b.registry && Array.isArray(b.registry.entries) && b.registry.entries.length) {
      window.ANTISHIMON = b.registry;
      if (b.places)  window.ANTISHIMON_PLACES = b.places;
      if (b.support) window.ANTISHIMON_SUPPORT = b.support;
      if (b.signers) window.ANTISHIMON_SIGNERS = b.signers;
      window.ANTISHIMON_INCOMING = b.incoming || null;
    }
  } catch (_) {
    try { localStorage.removeItem(LSR.bundle); } catch (__) {}
  }
})();

/* ── שפה ──────────────────────────────────────────────────────────────────
   t() מתרגם מחרוזת ממשק; כשאין תרגום היא מוחזרת כמות שהיא, כך שהוספת
   טקסט חדש לעולם לא שוברת את האנגלית — היא רק נשארת בעברית עד שמתרגמים.
   ------------------------------------------------------------------------ */

var I18N = window.ANTISHIMON_I18N || {};
var LANG = (function () {
  try { return JSON.parse(localStorage.getItem("antishimon:lang")) || "he"; }
  catch (_) { return "he"; }
})();

function t(s) {
  if (LANG === "he") return s;
  var d = (I18N[LANG] || {}).ui || {};
  return d[s] || s;
}
function tx(group, key, fb) {
  if (LANG === "he") return fb;
  var g = (I18N[LANG] || {})[group] || {};
  return g[key] != null ? g[key] : fb;
}

/* תרגום התוכן — מדינות, אזורים, תגיות ותקצירים. נופל לעברית
   כשאין ערך, כי חצי משפט מתורגם גרוע ממשפט שלם בשפת המקור. */
var IDATA = window.ANTISHIMON_I18N_DATA || {};
function td(group, key) {
  if (LANG === "he" || !key) return key;
  var g = IDATA[group] || {};
  return g[key] != null ? g[key] : key;
}
function coName(c)  { return td("country", c); }
function cityName(c) { return td("city", c); }
function supCo(c)   { return td("co", c) === c ? td("role", c) : td("co", c); }
function tagName(g) { return td("tag", g); }
function regName(k, fb) {
  if (LANG === "he") return fb;
  return (IDATA.region || {})[k] || fb;
}

/* תקציר: קודם תרגום ייעודי לפי מזהה, אחר כך נוסח הקמפיין המשותף
   (הוא מכסה מאות רשומות חותמים), ולבסוף המקור בעברית. */
function dispSum(e) {
  if (LANG === "he") return e.summary;
  /* מועמדי הסוכן היומי נכתבים מחדש בכל ריצה, ולכן אין להם ערך
     במילון הסטטי. הסוכן מתבקש לספק summaryEn בעצמו — ראו update/prompt.md. */
  if (e.summaryEn) return e.summaryEn;
  var s = (IDATA.summary || {})[e.id];
  if (s) return s;
  if (e.campaign) {
    var c = (IDATA.campaign || {})[e.campaign];
    if (c) return c;
  }
  return e.summary;
}

function setLang(l) {
  LANG = l;
  try { localStorage.setItem("antishimon:lang", JSON.stringify(l)); } catch (_) {}
  var cfg = I18N[l] || { dir: "rtl" };
  document.documentElement.setAttribute("lang", l);
  document.documentElement.setAttribute("dir", cfg.dir || "rtl");
  applyStaticLang();
}

/* מתרגם את הטקסטים הקבועים ב-HTML. סומנו ב-data-i18n בזמן האתחול,
   כדי שהמקור בעברית יישאר זמין גם אחרי החלפה. */
function applyStaticLang() {
  Array.prototype.forEach.call(document.querySelectorAll("[data-i18n]"), function (el) {
    el.textContent = t(el.getAttribute("data-i18n"));
  });
  Array.prototype.forEach.call(document.querySelectorAll("[data-i18n-ph]"), function (el) {
    el.setAttribute("placeholder", t(el.getAttribute("data-i18n-ph")));
  });
  var b = document.getElementById("langBtn");
  if (b) b.textContent = (I18N[LANG] || {}).other || "EN";
}

/* ── מאגר ─────────────────────────────────────────────────────────────── */

var META    = window.ANTISHIMON || {};
var CATS    = META.categories || [];
var REGIONS = META.regions || [];
var SEVS    = META.severity || [];
var STATS   = META.statuses || [];

var ACTORS  = META.actors || [];

var CAT_BY = {}, REG_BY = {}, SEV_BY = {}, STAT_BY = {}, ACT_BY = {};
CATS.forEach(function (c) { CAT_BY[c.key] = c; });
REGIONS.forEach(function (r) { REG_BY[r.key] = r; });
SEVS.forEach(function (s) { SEV_BY[s.level] = s; });
STATS.forEach(function (s) { STAT_BY[s.key] = s; });
ACTORS.forEach(function (a) { ACT_BY[a.key] = a; });

var SV = { 1: "var(--s1)", 2: "var(--s2)", 3: "var(--s3)", 4: "var(--s4)" };

var DB = [];

function hash(s) {
  var h = 0, i;
  for (i = 0; i < String(s).length; i++) { h = ((h << 5) - h + String(s).charCodeAt(i)) | 0; }
  return h;
}

/* מועמדים שהסוכן היומי אסף. הם נכנסים למרשם מסומנים ובסטטוס "בבדיקה" —
   לעולם לא כ"מאומת". אדם צריך לאשר אותם לפני שהם הופכים לרשומה מלאה. */
var INCOMING = window.ANTISHIMON_INCOMING || null;

function incomingList() {
  if (!INCOMING || !Array.isArray(INCOMING.entries)) return [];
  var approved = lsGet(LS.approved, []);
  var rejected = lsGet(LS.rejected, []);

  /* הגנה בשכבה שנייה: מועמד ששמו כבר במרשם נשמט בשקט.
     הסוכן מונחה לא לשכפל ובדיקת התקינות תופסת הפרות, אבל ריצה
     שנכשלה באמצע יכולה להשאיר תור מזוהם — והמשתמש לא אמור לראות
     את אותו אדם פעמיים בגלל זה. */
  var have = {};
  (META.entries || []).forEach(function (e) {
    have[norm(e.name)] = 1;
    (e.aliases || []).forEach(function (a) { have[norm(a)] = 1; });
  });

  return INCOMING.entries
    .filter(function (e) {
      if (!e || !e.name) return false;
      if (rejected.indexOf(e.id) > -1) return false;
      if (have[norm(e.name)]) return false;
      return !(e.aliases || []).some(function (a) { return have[norm(a)]; });
    })
    .map(function (e) {
      var c = {}, k;
      for (k in e) { c[k] = e[k]; }
      c.incoming = approved.indexOf(e.id) === -1;
      if (c.incoming) c.status = "review";
      /* מזהה מועמד נראה כך: inc-20260827-03. התאריך שבתוכו הוא היום
         שבו הסוכן אסף אותו, ולכן הוא מקור אמין יותר מ-generated של
         הקובץ כולו — שמשתנה בכל ריצה גם לרשומות ישנות. */
      if (!c.added) {
        var m = String(e.id || "").match(/^inc-(\d{4})(\d{2})(\d{2})/);
        c.added = m ? m[1] + "-" + m[2] + "-" + m[3] : (INCOMING.generated || "");
      }
      return c;
    });
}

/* מרחיב רשימת חותמים דחוסה לרשומות מלאות.
   כל שם מקבל את התקציר, הדרגה והמקורות של הקמפיין שלו. שם שכבר
   מתועד ידנית ב-data.js מדולג, כדי שלא ייווצר כפל. */
function expandSigners(taken) {
  var S = window.ANTISHIMON_SIGNERS;
  if (!S || !S.lists) return [];

  var out = [];
  Object.keys(S.lists).forEach(function (key) {
    var parts = key.split("_");                 /* "nmfg_artists" */
    var camp = S.campaigns[parts[0]];
    if (!camp) return;
    var isLabel = parts[1] === "labels";

    String(S.lists[key]).split("·").forEach(function (raw, i) {
      var name = raw.replace(/\s+/g, " ").trim();
      if (!name) return;
      var k = norm(name);
      if (taken[k]) return;                     /* כבר במאגר — לא משכפלים */
      taken[k] = 1;

      out.push({
        id: "sgn-" + key + "-" + i,
        name: name,
        aliases: [],
        type: "entertainment",
        actor: "entity",
        location: { country: "", region: "global", city: "" },
        scope: "global",
        severity: camp.severity,
        status: "verified",
        summary: isLabel ? camp.textLabel : camp.textArtist,
        tags: isLabel ? camp.tagsLabel : camp.tagsArtist,
        sources: camp.sources,
        alternatives: [],
        updated: camp.updated,
        signer: true,
        /* מפתח הנוסח לתרגום. אמנים ולייבלים חותמים על אותו קמפיין
           אבל הנוסח שונה, ולכן הסיומת L מפרידה ביניהם. */
        campaign: parts[0] + (isLabel ? "L" : "")
      });
    });
  });
  return out;
}

function loadDB() {
  var base = lsGet(LS.wiped, false) ? [] : (META.entries || []);
  var places = lsGet(LS.wiped, false) ? [] : ((window.ANTISHIMON_PLACES || {}).entries || []);
  var user = lsGet(LS.user, []);

  /* כל מה שכבר מתועד — ידנית, בתור המועמדים או בתוספות המשתמש —
     תופס את השם ומונע כפילות מרשימות החותמים. */
  var inc = incomingList();
  var taken = {};
  base.concat(places).concat(inc).concat(user).forEach(function (e) {
    taken[norm(e.name)] = 1;
    (e.aliases || []).forEach(function (a) { taken[norm(a)] = 1; });
  });

  DB = base.concat(places).concat(inc).concat(expandSigners(taken)).concat(user).map(function (e) {
    return {
      id: e.id || ("usr-" + Math.abs(hash(e.name + (e.updated || ""))).toString(36)),
      name: e.name || "ללא שם",
      aliases: e.aliases || [],
      type: CAT_BY[e.type] ? e.type : "org",
      parent: e.parent || "",
      location: e.location || {},
      scope: e.scope || "local",
      severity: Math.min(4, Math.max(1, parseInt(e.severity, 10) || 1)),
      status: STAT_BY[e.status] ? e.status : "review",
      summary: e.summary || "",
      summaryEn: e.summaryEn || "",
      tags: e.tags || [],
      sources: (e.sources || []).filter(function (s) { return s && (s.title || s.url); }),
      brands: e.brands || [],
      barcodes: e.barcodes || [],
      travel: e.travel || null,
      alternatives: e.alternatives || [],
      correction: e.correction || "",
      updated: e.updated || "",
      /* שני תאריכים שונים שקל לבלבל ביניהם. `updated` הוא מתי האירוע
         קרה או מתי המקור פורסם — הוא יכול להיות 2011. `added` הוא מתי
         הרשומה נכנסה למרשם, וזה מה ש"נוספו לאחרונה" מציג. */
      added: e.added || "",
      user: !!e.user,
      incoming: !!e.incoming,
      signer: !!e.signer,
      campaign: e.campaign || "",
      incidents: e.incidents || null,
      official: e.official || null,
      /* ברירת מחדל: אדם פרטי נושא באחריות בעצמו; לכל השאר, הרשומה
         מתעדת החלטה של הגוף. "דברי הנהלה" חייב סימון מפורש בנתונים. */
      actor: ACT_BY[e.actor] ? e.actor : (e.type === "person" ? "individual" : "entity")
    };
  });

  rankPlaces();
}

/* ── דירוג מקומות ─────────────────────────────────────────────────────────
   שני צירים נפרדים, כפי שנקבע: כמה קורה שם מצד האוכלוסייה, וּמה
   המוסד עצמו החליט.

   ציר האוכלוסייה נמדד בשיעור לנפש ולא במספר המוחלט. אחרת ארצות
   הברית מנצחת תמיד — יש בה שישה מיליון יהודים, אז גם שיעור נמוך
   מייצר מספר גדול. השאלה שמעניינת את מי שגר או נוסע לשם היא ההפך:
   מה הסיכוי שזה יקרה לי כאן.

   `weight` הוא הציון המשוקלל שלפיו ממיינים; `rank` הוא המקום ברשימה.
   ───────────────────────────────────────────────────────────────────────── */

function rankPlaces() {
  var places = DB.filter(function (e) { return e.type === "place"; });

  /* מונה את הרשומות האחרות במרשם שממוקמות באותו מקום. עיר בלי גוף
     מנטר שמפרסם מספרים עדיין נמדדת — לפי מה שמתועד כאן בפועל. */
  var byCity = {}, byCountry = {};
  DB.forEach(function (e) {
    if (e.type === "place" || !e.location) return;
    if (e.location.city)    byCity[e.location.city] = (byCity[e.location.city] || 0) + 1;
    if (e.location.country) byCountry[e.location.country] = (byCountry[e.location.country] || 0) + 1;
  });

  places.forEach(function (p) {
    var inc = p.incidents;
    var rate = 0, docs = 0;

    if (inc && inc.n && inc.jews) rate = inc.n / (inc.jews / 10000);   /* לכל 10,000 יהודים */
    p.rate = rate ? Math.round(rate * 10) / 10 : 0;

    docs = p.location.city ? (byCity[p.location.city] || 0)
                           : (byCountry[p.location.country] || 0);
    p.docs = docs;

    /* הבסיס: שיעור לנפש כשיש מדידה רשמית, אחרת האירועים המתועדים כאן.
       הסולם הלוגריתמי מונע ממדינה אחת עם שיעור קיצוני לשטח את כל השאר. */
    var base = rate ? Math.log10(rate + 1) * 40 : Math.log10(docs + 1) * 26;

    /* החלטה מוסדית מעלה את הדירוג. זו הבחנה מכוונת: התנהגות של פרטים
       אינה מדיניות, והחלטת מועצה נבחרת כן — ולכן היא נספרת אחרת.
       איסור כניסה ממלכתי הוא הצורה החדה ביותר של אותה החלטה: לא עירייה
       שניתקה קשר אלא מדינה שסוגרת שער בפני נושאי דרכון ישראלי. */
    if (!p.official && p.travel && p.actor === "entity") {
      p.official = { kind: "entry-ban", body: p.name, date: p.updated };
    }
    if (p.official) base += p.official.kind === "entry-ban" ? 62 : 45;

    /* חומרה מוכפלת פנימה כדי שרצח יבדל מגרפיטי גם בשיעור זהה.
       בלי עיגול: ההפרש בין מנצ׳סטר לאוסטרליה הוא עשירית נקודה,
       ו-Math.round היה משטח את שלושתן לאותו ציון ומבטל את המיון. */
    p.weight = base * (0.7 + p.severity * 0.11);
  });

  places.slice().sort(function (a, b) { return b.weight - a.weight; })
        .forEach(function (p, i) { p.rank = i + 1; });

  PLACE_N = places.length;
}
var PLACE_N = 0;

/* ── מצב ──────────────────────────────────────────────────────────────── */

var S = { q: "", cat: "", region: "", country: "", city: "", sev: "", status: "", actor: "", sort: "sev", watchOnly: false, fresh: 0 };
var openId = null, lastFocus = null, VIEW = "registry";

/* המרשם מונה מאות רשומות. רינדור הכול בבת אחת יוצר ~16,000 צמתי DOM
   ומשתק מכשירים ניידים, ולכן מוצגת מנה ראשונה והשאר נטען לפי דרישה.
   הסינון והחיפוש פועלים תמיד על המאגר המלא, לא על המוצג. */
var PAGE = 60, shown = PAGE;

function isDefault() {
  return !S.q && !S.cat && !S.region && !S.country && !S.city && !S.sev && !S.status && !S.actor && !S.watchOnly && !S.fresh;
}

/* ── נוספו לאחרונה ────────────────────────────────────────────────────────
   `added` הוא תאריך הכניסה למרשם. רשומה בלעדיו אינה "חדשה" — היא פשוט
   קדמה למעקב, ולכן היא נופלת מחוץ לכל חלון זמן במקום להיערם בראש
   הרשימה עם תאריך מומצא.
   ------------------------------------------------------------------------ */

function daysSinceAdded(e) {
  var d = String(e.added || "").slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(d)) return Infinity;
  var ms = Date.parse(d + "T00:00:00Z");
  if (isNaN(ms)) return Infinity;
  return Math.floor((Date.now() - ms) / 864e5);
}

function freshCount(days) {
  return DB.filter(function (e) { return daysSinceAdded(e) <= days; }).length;
}

var FRESH_WINDOWS = [7, 30];

function freshBar() {
  var box = $("#freshBar");
  if (!box) return;

  var n7 = freshCount(7);
  /* אין מה להציג פס "חדש" כשאין חדש. הוא מופיע מעצמו ברגע שהסוכן
     היומי מכניס רשומה, ונעלם כשהיא מתיישנת. */
  if (!n7 && !freshCount(30) && !S.fresh) { box.hidden = true; box.innerHTML = ""; return; }
  box.hidden = false;

  box.innerHTML =
    '<span class="fresh__lead">' +
      '<span class="fresh__pulse" aria-hidden="true"></span>' +
      t("נוספו לאחרונה") +
    "</span>" +
    FRESH_WINDOWS.map(function (d) {
      var n = freshCount(d);
      return '<button class="fresh__b" data-fresh="' + d + '"' +
        ' aria-pressed="' + (S.fresh === d) + '"' + (n ? "" : ' data-empty="1"') + ">" +
        t(d === 7 ? "השבוע" : "החודש") + "<b>" + n + "</b></button>";
    }).join("") +
    (S.fresh
      ? '<button class="fresh__b fresh__b--off" data-fresh="0">' + t("הכול") + "</button>"
      : "") +
    '<button class="fresh__when" data-act="update-health" title="' +
      esc(t("מתי המרשם עודכן לאחרונה")) + '">' + esc(lastUpdateLabel()) + "</button>";
}

/* התווית שליד הפס אומרת מתי הנתונים עצמם רועננו — לא מתי נטענה
   הכותרת. משתמש שרואה "עודכן היום" ומגלה שאין כלום חדש צריך שהמספר
   יסביר את עצמו, ולכן הוא לחיץ ופותח את חלונית המצב. */
/* ── חלונית מצב העדכון ────────────────────────────────────────────────────
   השאלה שהיא עונה עליה: האם המרשם באמת מתעדכן, או שהוא רק אומר שכן.
   לכן היא מפרידה בין שלושה דברים שקל לערבב — מתי נבדק, מתי התקבל
   עדכון, ומה בפועל נכנס — ומאפשרת בדיקה חוזרת מיידית.
   ------------------------------------------------------------------------ */

function updateHealthModal() {
  var d = dataFreshness();
  var sync = lsGet(LSR.status, null);
  var checked = +lsGet(LSR.checked, 0);

  function row(label, value, tone) {
    return '<div class="uh__r' + (tone ? " uh__r--" + tone : "") + '">' +
      "<dt>" + esc(label) + "</dt><dd>" + value + "</dd></div>";
  }
  /* "לפני 3 שעות" מול "3 hours ago" — סדר המילים הפוך, ולכן הניסוח
     נבנה שלם בכל שפה. הדבקה של מילים מתורגמות מייצרת כאן אנגלית
     שבורה, וזו בדיוק התלונה שהובילה לשכתוב שכבת התרגום. */
  function ago(ms) {
    if (!ms) return t("מעולם");
    var h = Math.floor((Date.now() - ms) / 36e5);
    if (h < 1) return t("לפני פחות משעה");
    if (h < 24) {
      return LANG === "en" ? h + (h === 1 ? " hour ago" : " hours ago")
                           : "לפני " + h + (h === 1 ? " שעה" : " שעות");
    }
    var dd = Math.floor(h / 24);
    return LANG === "en" ? dd + (dd === 1 ? " day ago" : " days ago")
                         : "לפני " + dd + (dd === 1 ? " יום" : " ימים");
  }

  /* "בריא" נמדד מול הקצב המובטח: הסוכן רץ כל יום, אז נתונים בני
     יומיים סבירים, בני שבוע כבר אומרים שמשהו לא עובד. */
  var tone = d.days == null ? "warn" : d.days <= 2 ? "ok" : d.days <= 6 ? "warn" : "bad";
  var verdict = d.days == null ? t("לא ידוע")
    : tone === "ok"   ? t("מתעדכן כסדרו")
    : tone === "warn" ? t("לא התקבל עדכון כמה ימים")
                      : t("העדכון תקוע — כדאי לבדוק את הסוכן היומי");

  openModal(
    '<h2 class="modal__h">' + t("מצב עדכון הנתונים") + "</h2>" +
    '<p class="modal__p">' +
      t("המרשם נבנה מסוכן שרץ כל יום ומפרסם חבילת נתונים. כאן אפשר לראות אם היא באמת מגיעה.") +
    "</p>" +

    '<div class="uh__v uh__v--' + tone + '">' + esc(verdict) + "</div>" +

    '<dl class="uh">' +
      row(t("גרסת הנתונים שבידכם"), '<code>' + esc(d.version || "—") + "</code>") +
      row(t("גיל הנתונים"),
        d.days == null ? "—"
        : d.days === 0 ? "<b>" + t("היום") + "</b>"
        : "<b>" + d.days + "</b> " + t(d.days === 1 ? "יום" : "ימים"), tone) +
      row(t("בדיקה אחרונה מול השרת"), esc(ago(checked))) +
      row(t("תוצאת הבדיקה האחרונה"),
        !sync ? esc(t("עוד לא נבדק"))
        : sync.ok ? '<span class="uh__ok">' + t("הצליחה") + "</span>"
                  : '<span class="uh__bad">' + t("נכשלה") + " — " + esc(sync.error || "") + "</span>",
        sync && !sync.ok ? "bad" : "") +
      row(t("רשומות מוצגות"), "<b>" + DB.length + "</b>") +
      row(t("נוספו בשבוע האחרון"), "<b>" + freshCount(7) + "</b>") +
      row(t("נוספו בחודש האחרון"), "<b>" + freshCount(30) + "</b>") +
      row(t("ממתינים לאישור"), "<b>" + DB.filter(function (e) { return e.incoming; }).length + "</b>") +
    "</dl>" +

    '<div class="acts">' +
      '<button class="btn" data-act="update-recheck">' + t("בדיקה עכשיו") + "</button>" +
      '<button class="tl" data-act="close-modal">' + t("סגירה") + "</button>" +
    "</div>"
  );
}

function lastUpdateLabel() {
  var d = dataFreshness();
  if (!d.date) return t("מצב עדכון");
  if (d.days === 0) return t("עודכן היום");
  if (d.days === 1) return t("עודכן אתמול");
  return LANG === "en" ? "Updated " + d.days + " days ago"
                       : "עודכן לפני " + d.days + " ימים";
}

/* מקור האמת לרעננות: חותמת הגרסה של החבילה שהאפליקציה מחזיקה בפועל,
   ולא מתי היא ניסתה לבדוק. בדיקה שנכשלה אינה עדכון. */
function dataFreshness() {
  /* דרך lsGet ולא getItem: הערך נשמר כ-JSON, ולכן קריאה גולמית
     מחזירה אותו עם המרכאות — והתאריך שבתוכו מפסיק להתפענח. */
  var v = lsGet(LSR.version, "") || (META.updated || "");
  var m = String(v).match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return { date: "", days: null, version: v };
  var ms = Date.parse(m[0] + "T00:00:00Z");
  return {
    date: m[0],
    days: isNaN(ms) ? null : Math.floor((Date.now() - ms) / 864e5),
    version: v
  };
}

/* ── חיפוש וסינון ─────────────────────────────────────────────────────── */

/* מפתח החיפוש מכיל את הרשומה עצמה בלבד — לא את כותרות המקורות שלה.
   מאות רשומות חולקות את אותם מקורות קמפיין, וכותרת אחת שמזכירה שם
   של אמן הפכה כל חיפוש אחריו להחזרת כל הרשימה. החיפוש מוצא ישות,
   לא את הציטוטים שלה. */
function haystack(e) {
  if (!e._hay) {
    var IN = window.ANTISHIMON_I18N_DATA || {};
    var raw = [
      e.name, e.aliases.join(" "), e.parent, e.summary, e.summaryEn,
      e.tags.join(" "), e.brands.join(" "), e.barcodes.join(" "),
      e.location.country, e.location.city,
      /* השמות הלועזיים נכנסים למחסנית תמיד, לא רק במצב אנגלית: מי
         שמחפש "Paris" או "France" בממשק העברי צריך למצוא. */
      (IN.country || {})[e.location.country] || "",
      (IN.city || {})[e.location.city] || "",
      /* שם גוף הניטור — חיפוש "CST" או "RIAS" הוא חיפוש לגיטימי */
      e.incidents ? ((PLACES.monitors || {})[e.incidents.monitor] || {}).name || "" : "",
      e.incidents ? ((PLACES.monitors || {})[e.incidents.monitor] || {}).full || "" : "",
      (CAT_BY[e.type] || {}).label, (SEV_BY[e.severity] || {}).label
    ].join(" ");
    e._hay = norm(raw) + " " + norm(raw, true);
  }
  return e._hay;
}

/* חיפוש דו-שלבי: קודם הביטוי כמקשה אחת ("co-op" → "coop"), ורק אם אין לו
   התאמה — פירוק למילים. אחרת "co-op" היה גורר כל רשומה שיש בה "co" ו-"op". */
function terms() {
  var tight = norm(S.q, true);
  var parts = norm(S.q).split(" ").filter(Boolean);
  if (tight && parts.length > 1 && DB.some(function (e) { return haystack(e).indexOf(tight) > -1; })) {
    return [tight];
  }
  return parts;
}

function filtered(skip) {
  var t = terms();
  return DB.filter(function (e) {
    if (t.length) {
      var h = haystack(e), i;
      for (i = 0; i < t.length; i++) { if (h.indexOf(t[i]) === -1) return false; }
    }
    if (skip !== "cat" && S.cat && e.type !== S.cat) return false;
    if (skip !== "sev" && S.sev && e.severity !== +S.sev) return false;
    if (S.region && e.location.region !== S.region) return false;
    if (S.country && e.location.country !== S.country) return false;
    if (S.city && e.location.city !== S.city) return false;
    if (S.status && e.status !== S.status) return false;
    if (S.actor && e.actor !== S.actor) return false;
    if (S.watchOnly && !isWatched(e.id)) return false;
    if (S.fresh && daysSinceAdded(e) > S.fresh) return false;
    return true;
  });
}

var SORT = {
  /* מקומות ממוינים תמיד לפי המשקל שלהם קודם. מיון לפי חומרה בלבד היה
     מציב את פריז, לונדון וגרמניה באותה שורה — כולן דרגה 4 — ומאבד
     בדיוק את המידע שהמשתמש ביקש: כמה קורה שם. */
  sev:     function (a, b) {
    if (a.type === "place" && b.type === "place") return (b.weight || 0) - (a.weight || 0);
    return b.severity - a.severity || b.sources.length - a.sources.length || a.name.localeCompare(b.name, "he");
  },
  recent:  function (a, b) { return dateKey(b.updated).localeCompare(dateKey(a.updated)); },
  /* מיון לפי כניסה למרשם. רשומה בלי תאריך כניסה יורדת לתחתית ולא
     מתחזה לחדשה, ובתוך אותו יום מכריעה החומרה. */
  newest:  function (a, b) {
    var da = daysSinceAdded(a), db = daysSinceAdded(b);
    if (da !== db) return da - db;
    return b.severity - a.severity || b.sources.length - a.sources.length;
  },
  sources: function (a, b) { return b.sources.length - a.sources.length || b.severity - a.severity; },
  name:    function (a, b) { return a.name.localeCompare(b.name, "he"); }
};

/* ── חלקי תצוגה ───────────────────────────────────────────────────────── */

function bars(level, cls) {
  var o = "", i;
  for (i = 1; i <= 4; i++) { o += "<i" + (i <= level ? ' class="on"' : "") + "></i>"; }
  return '<span class="' + cls + '" aria-hidden="true">' + o + "</span>";
}

function dispName(e) {
  if (LANG === "he") return e.name;
  /* התנאי היה ASCII בלבד, ולכן "Björk" ו-"Gael García Bernal" נפסלו
     וחזרו לעברית. הכלל הנכון הוא הפוך: כל alias שאין בו עברית. */
  var lat = (e.aliases || []).filter(function (a) { return a && !/[֐-׿]/.test(a); })[0];
  return lat || e.name;
}

/* ── פס הנתונים של מקום ───────────────────────────────────────────────────
   מוצג רק לרשומות מסוג ״מקום״, וגם שם רק כשיש מה להציג. שלושה שדות
   ותו לא: כמה, לכל כמה, ומי החליט. עוד מספר אחד והכרטיס הופך לדוח.
   ───────────────────────────────────────────────────────────────────────── */
function placeStripHTML(e) {
  if (e.type !== "place") return "";
  var bits = [];

  if (e.incidents && e.incidents.n) {
    var mon = (PLACES.monitors || {})[e.incidents.monitor] || {};
    bits.push('<span class="pd pd--n"><b>' + e.incidents.n.toLocaleString("en-US") + "</b>" +
      "<span>" + t("אירועים") + " " + esc(String(e.incidents.year)) +
      (mon.name ? " · " + esc(mon.name) : "") + "</span></span>");
  } else if (e.docs) {
    bits.push('<span class="pd"><b>' + e.docs + "</b><span>" + t("רשומות במרשם") + "</span></span>");
  }

  if (e.rate) {
    bits.push('<span class="pd"><b>' + e.rate + "</b><span>" + t("ל-10,000 יהודים") + "</span></span>");
  }

  if (e.official) {
    bits.push('<span class="pd pd--off"><b>⚑</b><span>' +
      t(e.official.kind === "entry-ban" ? "איסור כניסה ממלכתי" : "החלטה מוסדית") + "</span></span>");
  }

  return bits.length ? '<span class="pdrow">' + bits.join("") + "</span>" : "";
}

/* אזהרת מתודולוגיה. RIAS בגרמניה סופר גם אירועים מקוונים (27% מהתיעוד)
   ומגדיר ״אירוע״ רחב יותר מ-CST הבריטי, ולכן 698 לכל 10,000 יהודים
   בגרמניה מול 128 בבריטניה אינו פי חמישה יותר אנטישמיות — הוא בחלקו
   הגדול פי חמישה שיטת ספירה. השוואה בין מדינות מחייבת את ההסתייגות
   הזו, ובלעדיה המספר משקר בדיוק במקום שבו הוא נראה משכנע. */
function methodNote() {
  return '<p class="note note--soft">' +
    "<b>" + t("על ההשוואה בין מדינות.") + "</b> " +
    t("לכל גוף מנטר הגדרה משלו ל״אירוע״. RIAS בגרמניה כולל גם אירועים מקוונים — 27% מהתיעוד שלו — ו-CST הבריטי סופר אחרת. השיעור לנפש מאפשר להשוות מקום לעצמו לאורך זמן, ובזהירות רבה בין מקומות; הוא אינו דירוג של ״כמה אנטישמית״ מדינה.") +
    "</p>";
}

/* ── סימן חזותי לכרטיס ────────────────────────────────────────────────────
   כל כרטיס פותח בסימן ולא בטקסט. אין כאן תמונות של גופים או של אנשים
   במכוון: לוגו של חברה וצילום של אדם הם רכוש מוגן, ובמרשם שנוקב בשמות
   הם גם הופכים תיעוד לפרסום־לעג. במקום זה:

     מקום  → דגל המדינה (סמל מדינה — אינו מוגן בזכויות יוצרים)
     קטגוריה → גליף שרטטתי, אחד לכל סוג
   ───────────────────────────────────────────────────────────────────────── */

/* קוד מדינה דו-אותי → אמוג׳י דגל, דרך Regional Indicator Symbols */
function flagOf(country) {
  var cc = (window.ANTISHIMON_CC || {})[country];
  if (!cc) return "";
  return String.fromCodePoint.apply(null, cc.toUpperCase().split("").map(function (ch) {
    return 0x1F1E6 + ch.charCodeAt(0) - 65;
  }));
}

var CAT_GLYPH = {
  company:  '<path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-5h6v5"/>',
  brand:    '<path d="M3 7h18l-1.5 13.5a1 1 0 0 1-1 .9H5.5a1 1 0 0 1-1-.9Z"/><path d="M8 7V5a4 4 0 0 1 8 0v2"/>',
  person:   '<circle cx="12" cy="8" r="3.6"/><path d="M4.5 21c.6-4.2 3.7-6.4 7.5-6.4s6.9 2.2 7.5 6.4"/>',
  org:      '<path d="M4 21V6l8-3 8 3v15"/><path d="M9 21v-6h6v6M9 10h1.5M13.5 10H15"/>',
  place:    '<path d="M12 21c4.5-5 6.8-8.4 6.8-11A6.8 6.8 0 0 0 5.2 10c0 2.6 2.3 6 6.8 11Z"/><circle cx="12" cy="10" r="2.4"/>',
  media:    '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 9h6M7 13h10M7 16h7"/>',
  academic: '<path d="M12 4 2.5 9 12 14l9.5-5Z"/><path d="M6.5 11.4V17c0 1.4 2.5 2.6 5.5 2.6s5.5-1.2 5.5-2.6v-5.6"/>',
  sport:    '<circle cx="12" cy="12" r="8.6"/><path d="M12 3.4v17.2M3.4 12h17.2"/>',
  entertainment: '<path d="M9 18V6l11-2v12"/><circle cx="6.5" cy="18" r="2.6"/><circle cx="17.5" cy="16" r="2.6"/>'
};

function cardMark(e) {
  if (e.type === "place") {
    var fl = flagOf(e.location && e.location.country);
    if (fl) return '<span class="card__mark"><span class="card__flag">' + fl + "</span></span>";
  }
  var g = CAT_GLYPH[e.type];
  if (g) {
    return '<span class="card__mark"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
      'stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + g + "</svg></span>";
  }
  var ini = String(dispName(e) || "?").replace(/^[^A-Za-z֐-׿0-9]+/, "").charAt(0) || "•";
  return '<span class="card__mark">' + esc(ini) + "</span>";
}

function cardHTML(e, i) {
  var cat = CAT_BY[e.type] || {}, st = STAT_BY[e.status] || {};
  var where = [cityName(e.location.city), coName(e.location.country)].filter(Boolean).join(", ");
  var n = e.sources.length;

  return '<button class="card rv' + (e.status === "retracted" ? " card--out" : "") +
      '" data-id="' + esc(e.id) + '" style="--sv:' + SV[e.severity] + '">' +
    '<span class="card__top">' +
      cardMark(e) +
      '<span class="card__cat">' + esc(tx('catShort', e.type, cat.short || cat.label || '')) + "</span>" +
      (e.incoming ? '<span class="fresh">' + t("חדש · לאישור") + "</span>" : "") +
      bars(e.severity, "card__sev") +
    "</span>" +
    '<span class="card__name">' + esc(dispName(e)) + "</span>" +
    '<span class="card__where">' + esc(where || "—") +
      (e.scope === "global" ? " · " + t("גלובלי") : "") + "</span>" +
    placeStripHTML(e) +
    '<span class="card__sum">' + esc(dispSum(e)) + "</span>" +
    (isWatched(e.id) ? '<span class="star" aria-label="במעקב">★</span>' : "") +
    '<span class="card__foot">' +
      '<span class="card__src"' + (n === 1 ? ' data-thin="1"' : "") + ">" +
        "<b>" + n + "</b><span>" + t(n === 1 ? "מקור" : "מקורות") + "</span></span>" +
      '<span class="who who--' + esc(e.actor) + '">' + esc(tx('actorShort', e.actor, (ACT_BY[e.actor] || {}).short || '')) + "</span>" +
      '<span class="badge b-' + esc(e.status) + '">' + esc(tx('status', e.status, st.label || '')) + "</span>" +
    "</span>" +
  "</button>";
}

/* כל שינוי בסינון מחזיר את המנה להתחלה — אחרת המשתמש מסנן ומקבל
   רשימה ארוכה שכבר גוללה, בלי להבין למה. */
function reRender() { shown = PAGE; render(); }

function render() {
  var list = filtered().sort(SORT[S.sort] || SORT.sev);
  var prods = supMatches();

  /* לשוניות — שתי שאלות נפרדות: את מי לא לממן, ומה לקנות */
  $("#tabN1").textContent = list.length;
  $("#tabN2").textContent = prods.length;
  Array.prototype.forEach.call(document.querySelectorAll(".tab"), function (t) {
    t.setAttribute("aria-selected", String(t.dataset.view === VIEW));
  });
  $("#tabN3").textContent =
    STORIES.filter(function (s) { return s.status === "approved"; }).length;
  $("#regCtl").hidden   = VIEW !== "registry";
  $("#regView").hidden  = VIEW !== "registry";
  $("#prodView").hidden = VIEW !== "products";
  $("#storyView").hidden = VIEW !== "stories";

  if (VIEW === "products") {
    support(prods);
    $("#resN").textContent = t("את מי כן") + " · " + prods.length + " " + t("פריטים");
    return;
  }

  if (VIEW === "stories") {
    stories();
    var stPub = STORIES.filter(function (s) { return s.status === "approved"; }).length;
    $("#resN").textContent = t("סיפורים אישיים") + " · " + stPub + " " +
      t(stPub === 1 ? "עדות" : "עדויות") + " · " + t("כל אחת אושרה לפני פרסום");
    return;
  }

  freshBar();

  /* החלוקה הראשית: מה בדיוק נטען */
  $("#split").innerHTML =
    '<button class="sp sp--all" data-sev="" aria-pressed="' + (!S.sev) + '">' +
      '<span class="sp__dot"></span>' + t('הכול') + '<b>' + filtered("sev").length + "</b></button>" +
    SEVS.slice().reverse().map(function (s) {
      var n = filtered("sev").filter(function (e) { return e.severity === s.level; }).length;
      return '<button class="sp" data-sev="' + s.level + '" style="--sv:' + SV[s.level] + '"' +
        ' aria-pressed="' + (S.sev === String(s.level)) + '"' + (n ? "" : ' data-empty="1"') +
        ' title="' + esc(s.desc) + '">' +
        '<span class="sp__dot"></span>' + esc(tx('sev', s.level, s.label)) + "<b>" + n + "</b></button>";
    }).join("");

  var slice = list.slice(0, shown);
  $("#grid").innerHTML = slice.map(cardHTML).join("") +
    (list.length > shown
      ? '<button class="more" data-act="more">' + t("הצגת") + " " +
        Math.min(PAGE, list.length - shown) + " " + t("נוספות · נותרו") + " " +
        (list.length - shown) + "</button>"
      : "");

  reveal($("#grid"));

  var v = $("#void");
  if (list.length) { v.hidden = true; $("#grid").hidden = false; }
  else {
    $("#grid").hidden = true; v.hidden = false;
    /* ״אין התאמה״ בזמן שהתשובה יושבת בלשונית השנייה הוא שקר. אם יש
       התאמה ב״את מי כן״ — אומרים את זה ונותנים כפתור לעבור. */
    var elsewhere = S.q ? prods.length : 0;
    v.innerHTML =
      '<p class="void__h">' + t("אין התאמה") + "</p>" +
      '<p class="void__p">' + (S.q
        ? t("לא נמצאה רשומה עבור") + " ״" + esc(S.q) + "״. " + t("ייתכן שהיא פשוט עוד לא במרשם.")
        : t("אף רשומה לא עומדת בשילוב הסינון הזה.")) + "</p>" +
      (elsewhere
        ? '<p class="void__p"><b>' + elsewhere + "</b> " +
          t("תוצאות תואמות נמצאו בלשונית ״את מי כן״.") + "</p>"
        : "") +
      '<div class="void__acts">' +
        (elsewhere ? '<button class="btn" data-act="go-support">' + t("מעבר ל״את מי כן״") + "</button>" : "") +
        '<button class="tl" data-act="add">' + t("הוספת רשומה") + "</button>" +
        '<button class="tl" data-act="clearfilters">' + t("איפוס סינון") + "</button>" +
      "</div>";
  }

  $("#resN").textContent = (isDefault() ? t("כל הרשומות") : t("תוצאות סינון")) +
    " · " + list.length + " " + t("רשומות") +
    (list.length > shown ? " · " + t("מוצגות") + " " + shown : "");
  $("#clearFilters").hidden = isDefault();

  /* צ׳יפים עם מונים חיים */
  var pc = filtered("cat");
  $("#chips").innerHTML =
    '<button class="chip" data-cat="" aria-pressed="' + (!S.cat) + '">' + t('הכול') + '<b>' + pc.length + "</b></button>" +
    CATS.map(function (c) {
      var n = pc.filter(function (e) { return e.type === c.key; }).length;
      return '<button class="chip" data-cat="' + c.key + '" aria-pressed="' + (S.cat === c.key) + '"' +
        (n ? "" : ' data-empty="1"') + ">" + esc(tx('cat', c.key, c.label)) + "<b>" + n + "</b></button>";
    }).join("");

  var pa = filtered("actor");
  Array.prototype.forEach.call($("#fActor").options, function (o) {
    if (!o.value) return;
    o.textContent = tx("actor", o.value, o.dataset.label) + " (" +
      pa.filter(function (e) { return e.actor === o.value; }).length + ")";
  });

  /* המפה שייכת ללשונית ״מקומות ומדינות״ בלבד. בכל שאר הקטגוריות היא
     ציירה נקודות של חברות ואנשים על מפת עולם — מידע שאין לו שום
     משמעות גיאוגרפית, וגזל שליש מהמסך לפני הרשומות עצמן. */
  var showMap = S.cat === "place" && !S.watchOnly;
  $("#mapBox").hidden = !showMap;
  if (showMap) renderMap();

  figures();
  recent();
  footStats();
  headerBar();

  /* מונה מעקב ומונה "מה חדש" — שניהם על הכפתור עצמו, כדי שלא יידרש
     מסך נוסף רק כדי לגלות שאין חדש. */
  var wb = $("#watchBtn"), nw = watchList().length;
  if (wb) {
    wb.textContent = t("★ מעקב") + (nw ? " · " + nw : "");
    wb.setAttribute("data-on", S.watchOnly ? "1" : "0");
  }
  var nb = $("#newsBtn");
  if (nb) {
    var d = diffSinceLastVisit();
    var c = d.first ? 0 : d.added.length + d.changed.length;
    if (c) nb.setAttribute("data-n", c > 99 ? "99+" : c);
    else nb.removeAttribute("data-n");
  }
}

/* ── מוצרים תחת חרם ───────────────────────────────────────────────────────
   הרשימה ההפוכה: לא ״את מי לא לממן״ אלא ״מה קמפייני החרם מסמנים כיעד״.
   מגיבה לאותו שדה חיפוש, כדי שחיפוש ״במבה״ יגיע לאן שצריך. */

var SUP = window.ANTISHIMON_SUPPORT || { items: [], note: "" };

/* מרחיב את רשימות החותמים של צד התמיכה, באותה שיטה שבה מורחבות
   רשימות החותמים בצד השני — כדי ששני הצדדים יימדדו באותה אמת מידה. */
/* חייבת להיות פונקציה בשם ולא IIFE: אחרי משיכת עדכון מהרשת מחליפים את
   SUP כולו, והרשימות הדחוסות שבו זקוקות להרחבה מחדש. בלי זה הצד השני
   מאבד את כל החותמים ונשאר עם הפריטים המפורשים בלבד. */
function expandSupportLists() {
  if (!SUP.lists || !SUP.campaigns) return;

  /* אותו אדם חתם על יותר מקמפיין אחד. הוא נרשם פעם אחת, בקמפיין
     הראשון שבו הוא מופיע. */
  var seen = {};
  SUP.items.forEach(function (it) { seen[norm(it.name)] = 1; });

  Object.keys(SUP.lists).forEach(function (key) {
    var camp = SUP.campaigns[key];
    if (!camp) return;
    String(SUP.lists[key]).split("\n").forEach(function (line, i) {
      var p = line.split("|");
      var name = (p[0] || "").trim();
      if (!name) return;
      var k = norm(name);
      if (seen[k]) return;
      seen[k] = 1;
      SUP.items.push({
        id: "sup-" + key + "-" + i,
        section: camp.section,
        name: name,
        aliases: [],
        company: (p[1] || "").trim(),
        what: camp.what,
        why: camp.text,
        sources: camp.sources
      });
    });
  });
}
expandSupportLists();

function supHay(it) {
  if (!it._hay) {
    var raw = [it.name, (it.aliases || []).join(" "), it.company, it.what, it.why].join(" ");
    it._hay = norm(raw) + " " + norm(raw, true);
  }
  return it._hay;
}

function supMatches() {
  var t = terms();
  if (!t.length) return SUP.items || [];
  return (SUP.items || []).filter(function (it) {
    var h = supHay(it), i;
    for (i = 0; i < t.length; i++) { if (h.indexOf(t[i]) === -1) return false; }
    return true;
  });
}

function srcHTML(it) {
  return '<div class="item__src">' + (it.sources || []).map(function (s) {
    var u = safeUrl(s.url);
    var pub = t(s.publisher);
    return u ? '<a href="' + esc(u) + '" target="_blank" rel="noopener noreferrer nofollow">' +
      esc(pub) + " ↗</a>" : "<span>" + esc(pub) + "</span>";
  }).join("") + "</div>";
}

/* שלושה סוגי כרטיס. חתימה היא שם ותפקיד — לחזור על אותה פסקת הסבר
   123 פעם היה הופך את העמוד לקיר טקסט. ההקשר יושב בכותרת הסעיף. */
/* שם, תפקיד והנימוק — שלושתם מתורגמים. בלי זה הלשונית הזאת
   נשארת עברית מלאה בתוך דף אנגלי, וזו בדיוק התקלה שהמשתמש הצביע עליה. */
function supName(it) {
  if (LANG === "en" && it.aliases && it.aliases.length) {
    for (var i = 0; i < it.aliases.length; i++) {
      if (/[A-Za-z]/.test(it.aliases[i])) return it.aliases[i];
    }
  }
  return it.name;
}
function supWhat(it) { return LANG === "he" ? (it.what || "") : ((IDATA.supWhat || {})[it.id] || it.what || ""); }
function supWhy(it)  { return LANG === "he" ? (it.why  || "") : ((IDATA.supWhy  || {})[it.id] || it.why  || ""); }

function itemHTML(it, layout) {
  var nm = supName(it);
  var initial = String(nm || "?").replace(/^[^A-Za-z֐-׿]+/, "").charAt(0) || "•";

  if (layout === "name") {
    return '<div class="nm">' +
      '<span class="nm__i" aria-hidden="true">' + esc(initial) + "</span>" +
      "<span>" +
        '<span class="nm__n">' + esc(nm) + "</span>" +
        (it.company ? '<span class="nm__r">' + esc(supCo(it.company)) + "</span>" : "") +
      "</span></div>";
  }

  if (layout === "tile") {
    return '<article class="tile">' +
      '<div class="tile__top">' +
        '<span class="tile__i" aria-hidden="true">' + esc(initial) + "</span>" +
        '<span class="tile__what">' + esc(supWhat(it)) + "</span>" +
      "</div>" +
      '<h4 class="tile__n">' + esc(nm) + "</h4>" +
      (it.company ? '<div class="tile__co">' + esc(supCo(it.company)) + "</div>" : "") +
      '<p class="tile__w">' + esc(supWhy(it)) + "</p>" +
      srcHTML(it) +
    "</article>";
  }

  return '<article class="item">' +
    '<div class="item__what">' + esc(supWhat(it)) + "</div>" +
    '<h4 class="item__name">' + esc(nm) + "</h4>" +
    '<div class="item__co">' + esc(supCo(it.company || "")) + (function () {
      /* ברשימת הכינויים יש גם את השם הלועזי וגם את העברי. באנגלית
         הלועזי כבר שימש ככותרת, ולכן העברי כאן הוא רעש בלבד. */
      var al = (it.aliases || []).filter(function (a) {
        return a && a !== nm && (LANG === "he" || !/[֐-׿]/.test(a));
      }).slice(0, 2);
      return al.length ? (it.company ? " · " : "") + esc(al.join(", ")) : "";
    })() + "</div>" +
    '<p class="item__why">' + esc(supWhy(it)) + "</p>" +
    srcHTML(it) +
  "</article>";
}

/* מוצג לפי סעיפים, לכל אחד גוון ופריסה משלו. */
function support(list) {
  if (!list) list = supMatches();

  var note = LANG === "he" ? SUP.note : (IDATA.supNote || SUP.note);
  $("#supportNote").textContent = S.q && list.length !== (SUP.items || []).length
    ? list.length + " " + t("מתוך") + " " + (SUP.items || []).length + " " + t("תואמים לחיפוש.") + " " + note
    : note;

  if (!list.length) {
    var inReg = S.q ? filtered().length : 0;
    $("#supportGrid").innerHTML = '<p class="item__why">' + t("אין פריט תואם לחיפוש הזה.") +
      (inReg ? ' <b>' + inReg + "</b> " + t("תוצאות תואמות נמצאו בלשונית ״מי לא לממן״.") +
        ' <button class="tl" data-act="go-registry">' + t("מעבר לשם") + "</button>" : "") + "</p>";
    return;
  }

  var secs = SUP.sections || [];
  var secTxt = function (sec, k) {
    if (LANG === "he") return sec[k];
    var g = (IDATA.supSection || {})[sec.key] || {};
    return g[k] || sec[k];
  };
  $("#supportGrid").innerHTML = secs.map(function (sec, i) {
    var rows = list.filter(function (it) { return (it.section || "products") === sec.key; });
    if (!rows.length) return "";
    var lay = sec.layout || "rich";
    var camp = SUP.campaigns && SUP.campaigns[sec.key];

    return '<section class="grp grp--' + lay + '" style="--ac:' + (sec.accent || "var(--ok)") + '">' +
      '<header class="grp__h">' +
        '<span class="grp__n">' + ("0" + (i + 1)).slice(-2) + "</span>" +
        "<div>" +
          '<h3 class="grp__t">' + esc(secTxt(sec, "label")) + '<b>' + rows.length + "</b></h3>" +
          (sec.lead ? '<p class="grp__d">' + esc(secTxt(sec, "lead")) + "</p>" : "") +
          (lay === "name" && camp ? srcHTML({ sources: camp.sources }) : "") +
        "</div>" +
      "</header>" +
      '<div class="grp__grid">' + rows.map(function (r) { return itemHTML(r, lay); }).join("") + "</div>" +
    "</section>";
  }).join("");
}

/* הרשומות שעודכנו לאחרונה — ממלא את הטור השמאלי בפתיח בתוכן אמיתי
   ולוחיץ, במקום להשאיר חלל ריק במסך הראשון. */
function recent() {
  var box = $("#recentList");
  if (!box) return;

  var list = DB.slice().sort(SORT.recent).slice(0, 7);

  box.innerHTML = list.map(function (e) {
    var cat = CAT_BY[e.type] || {};
    var where = coName(e.location.country || "");
    return '<li><button class="rc" data-id="' + esc(e.id) + '" style="--sv:' + SV[e.severity] + '">' +
      '<span class="rc__dot" aria-hidden="true"></span>' +
      '<span class="rc__mid">' +
        '<span class="rc__name">' + esc(dispName(e)) +
          (e.incoming ? '<span class="rc__new">' + t("חדש") + "</span>" : "") + "</span>" +
        '<span class="rc__meta">' + esc(tx('catShort', e.type, cat.short || cat.label || '')) +
          (where ? " · " + esc(where) : "") + "</span>" +
      "</span>" +
      '<span class="rc__date">' + esc(fmtDate(e.updated)) + "</span>" +
      "</button></li>";
  }).join("");
}

function figures() {
  /* מקורות ייחודיים, לא מופעים. רשימת חותמים חולקת את אותם שלושה
     מקורות בין מאות רשומות — לספור אותם שוב ושוב היה מנפח את המספר
     פי עשרה ומטעה בדיוק במקום שבו המאגר מבקש אמון. */
  var urls = {};
  DB.forEach(function (e) {
    e.sources.forEach(function (s) { if (s.url) urls[s.url] = 1; });
  });

  var co = {};
  DB.forEach(function (e) { if (e.location.country) co[e.location.country] = 1; });
  var signers = DB.filter(function (e) { return e.signer; }).length;

  var rows = [
    [DB.length, t("גופים במרשם")],
    [Object.keys(urls).length, t("מקורות ייחודיים")],
    [signers, t("חותמי עצומות")],
    [Object.keys(co).length, t("מדינות")]
  ];
  $("#figs").innerHTML = rows.map(function (x) {
    return '<li><b data-to="' + x[0] + '">0</b><span>' + x[1] + "</span></li>";
  }).join("");

  /* הספירה רצה פעם אחת בלבד. render נקרא בכל סינון, ומספר שנספר
     מחדש בכל הקלדה בשדה החיפוש הופך מהדגשה למטרד. */
  Array.prototype.forEach.call($("#figs").querySelectorAll("b[data-to]"), function (b) {
    countUp(b, +b.dataset.to);
  });

  $("#upd").textContent = fmtDate(META.updated);
}

/* ── רשימת מעקב ומה חדש ───────────────────────────────────────────────────
   שני הפיצ'רים שמחזירים אנשים לאפליקציה. המעקב הוא בחירה מפורשת של
   המשתמש; "מה חדש" נגזר מהשוואה לתצלום המצב מהביקור הקודם.

   התצלום שומר גם את חותמת העדכון של כל רשומה, כדי שנוכל להבחין בין
   רשומה חדשה לבין רשומה קיימת שהשתנתה — שני דברים שונים לגמרי למי
   שעוקב אחרי גורם מסוים.
   ------------------------------------------------------------------------ */

function watchList() { return lsGet(LS.watch, []); }
function isWatched(id) { return watchList().indexOf(id) > -1; }

function toggleWatch(id) {
  var w = watchList(), i = w.indexOf(id);
  if (i > -1) { w.splice(i, 1); toast("הוסר מהמעקב"); }
  else { w.push(id); toast("נוסף למעקב"); }
  lsSet(LS.watch, w);
  render();
  if (openId === id) openEntry(id);
}

/* מה השתנה מאז הביקור הקודם */
function diffSinceLastVisit() {
  var snap = lsGet(LS.seen, null);
  var now = {};
  DB.forEach(function (e) { now[e.id] = e.updated || ""; });

  if (!snap) return { first: true, added: [], changed: [] };

  var added = [], changed = [];
  DB.forEach(function (e) {
    if (!(e.id in snap)) added.push(e);
    else if (snap[e.id] !== (e.updated || "")) changed.push(e);
  });
  return { first: false, added: added, changed: changed };
}

function saveSnapshot() {
  var now = {};
  DB.forEach(function (e) { now[e.id] = e.updated || ""; });
  lsSet(LS.seen, now);
}

function newsModal() {
  var d = diffSinceLastVisit();
  var w = watchList();
  var hitW = d.added.concat(d.changed).filter(function (e) { return w.indexOf(e.id) > -1; });

  var rows = function (list, label) {
    if (!list.length) return "";
    return '<h3 class="dos__h">' + label + " <span class=\"mono\">" + list.length + "</span></h3>" +
      '<div class="newsl">' + list.slice(0, 40).map(function (e) {
        return '<button class="rc" data-id="' + esc(e.id) + '" style="--sv:' + SV[e.severity] + '">' +
          '<span class="rc__dot" aria-hidden="true"></span>' +
          '<span class="rc__mid"><span class="rc__name">' + esc(e.name) + "</span>" +
          '<span class="rc__meta">' + esc(tx('catShort', e.type, (CAT_BY[e.type] || {}).short || '')) +
            (e.location.country ? " · " + esc(coName(e.location.country)) : "") + "</span></span>" +
          '<span class="rc__date">' + esc(fmtDate(e.updated)) + "</span></button>";
      }).join("") + "</div>";
  };

  var body;
  if (d.first) {
    body = '<p class="modal__p">זו הפעם הראשונה שאתם פותחים את המרשם במכשיר הזה, אז אין עם מה להשוות. מהביקור הבא יופיע כאן בדיוק מה השתנה.</p>';
  } else if (!d.added.length && !d.changed.length) {
    body = '<p class="modal__p">שום דבר לא השתנה מאז הביקור הקודם.</p>';
  } else {
    body = (hitW.length
        ? '<p class="note"><b>' + hitW.length + " ברשימת המעקב שלכם.</b> " +
          esc(hitW.slice(0, 4).map(function (e) { return e.name; }).join(" · ")) + "</p>"
        : "") +
      rows(d.added, "רשומות חדשות") +
      rows(d.changed, "רשומות שהתעדכנו");
  }

  openModal(
    '<h2 class="modal__h">מה חדש</h2>' + body +
    '<div class="acts"><button class="btn" data-act="news-ok">סימון כנקרא</button></div>'
  );
}

/* ── מפה ──────────────────────────────────────────────────────────────────
   הטלה מלבנית פשוטה (equirectangular): קו אורך → x, קו רוחב → y, בלי
   ספריות ובלי נתוני גבולות של מאות KB. מה שחשוב פה הוא היכן בעולם זה
   מתרחש ובאיזו עוצמה — לא קווי מתאר מדויקים.

   גודל הנקודה = מספר הרשומות במדינה. הצבע = הדרגה החמורה ביותר שם.
   ------------------------------------------------------------------------ */

var PLACES = window.ANTISHIMON_PLACES || {};
var GEO  = window.ANTISHIMON_GEO || {};
var GEOC = window.ANTISHIMON_GEO_CITY || {};

function mapPoints(list) {
  /* המפה מציגה את רשומות המקומות עצמן, לא ספירה של כל המרשם. עיר
     מקבלת נקודה משלה כשיש לה קואורדינטה — אחרת לונדון ומנצ׳סטר היו
     נוחתות שתיהן על מרכז בריטניה ומסתירות זו את זו. */
  var out = [];
  list.forEach(function (e) {
    if (e.type !== "place") return;
    var city = e.location && e.location.city;
    var g = (city && GEOC[city]) || GEO[e.location && e.location.country];
    if (!g) return;
    out.push({
      entry: e, lat: g[0], lon: g[1],
      isCity: !!(city && GEOC[city]),
      n: e.incidents ? e.incidents.n : e.docs,
      measured: !!e.incidents,
      official: !!e.official,
      /* גודל הנקודה נגזר מציר האוכלוסייה בלבד — כמה קורה שם. אם היה
         נגזר מהמשקל הכולל, איראן הייתה מצוירת כמו גרמניה רק בזכות
         הבונוס על איסור הכניסה, והמפה הייתה סותרת את המקרא שלה.
         ההחלטה המוסדית מיוצגת בטבעת, וזה כל תפקידה. */
      mag: e.rate || (e.docs ? e.docs * 2 : 0),
      weight: e.weight || 0, sev: e.severity
    });
  });
  /* הכבדות מצוירות אחרונות כדי שלא ייחסמו על ידי נקודה קטנה */
  return out.sort(function (a, b) { return a.weight - b.weight; });
}

/* ההיטל חתוך ב-84°N עד 56°S. הרצועות שמעבר לזה הן קרח וים בלבד:
   כשהן בפנים, שליש מגובה המפה הוא שטח מת והיבשות מצטמקות לכלום. */
var MAP_N = 84, MAP_S = -56, MAP_W = 1000;
var MAP_H = Math.round(MAP_W * (MAP_N - MAP_S) / 360);

function mapX(lon) { return (lon + 180) / 360 * MAP_W; }
function mapY(lat) { return (MAP_N - lat) / (MAP_N - MAP_S) * MAP_H; }

/* המתאר מצויר פעם אחת ונשמר — הוא לא משתנה עם הסינון, ובניית
   המחרוזת מחדש בכל render היא עבודה מיותרת על 30 פוליגונים. */
var MAP_LAND = null;
function landPaths() {
  if (MAP_LAND !== null) return MAP_LAND;
  var W = window.ANTISHIMON_WORLD || [];
  MAP_LAND = W.map(function (ring) {
    return '<path d="M' + ring.map(function (p) {
      return mapX(p[0]).toFixed(1) + " " + mapY(p[1]).toFixed(1);
    }).join("L") + 'Z"/>';
  }).join("");
  return MAP_LAND;
}

function renderMap() {
  var host = $("#mapPlot");
  if (!host) return;
  var pts = mapPoints(filtered());
  var W = MAP_W, H = MAP_H;

  var maxN = pts.reduce(function (m, p) { return Math.max(m, p.n); }, 1);
  var total = pts.reduce(function (a, p) { return a + p.n; }, 0);

  var grid = "";
  for (var lo = -120; lo <= 120; lo += 60) {
    grid += '<line x1="' + mapX(lo).toFixed(1) + '" y1="0" x2="' + mapX(lo).toFixed(1) + '" y2="' + H + '"/>';
  }
  for (var la = -30; la <= 60; la += 30) {
    if (la === 0) continue;
    grid += '<line x1="0" y1="' + mapY(la).toFixed(1) + '" x2="' + W + '" y2="' + mapY(la).toFixed(1) + '"/>';
  }

  /* תוויות לגדולות בלבד, ורק אם יש להן מקום. אירופה צפופה: בלי
     בדיקת חפיפה "בריטניה 25" ו"גרמניה 4" נדרסות זו על זו ושתיהן
     הופכות לבלתי קריאות. עדיף תווית אחת ברורה משתיים מרוסקות. */
  var lab = {}, boxes = [];
  var maxM = pts.reduce(function (m, p) { return Math.max(m, p.mag); }, 1);
  pts.slice().sort(function (a, b) { return b.weight - a.weight; }).slice(0, 10).forEach(function (p) {
    var cx = mapX(p.lon), cy = mapY(p.lat) - 13;
    var w = (dispName(p.entry).length * 7 + 20) / 2;
    var hit = boxes.some(function (b) {
      return Math.abs(b.x - cx) < b.w + w && Math.abs(b.y - cy) < 22;
    });
    if (hit) return;
    boxes.push({ x: cx, y: cy, w: w });
    lab[p.entry.id] = 1;
  });

  var dots = pts.map(function (p) {
    var cx = mapX(p.lon), cy = mapY(p.lat);
    /* שורש ריבועי על השיעור לנפש. במספר הגולמי גרמניה עם 8,725 אירועים
       הייתה בולעת את כל אירופה; בשיעור מנורמל היחסים נשמרים והנקודה
       נשארת קריאה. מקום בלי מדידה מקבל את הרדיוס המזערי. */
    var r = p.mag ? 4 + Math.sqrt(p.mag / maxM) * 15 : 4;
    var nm = dispName(p.entry);
    var val = p.measured ? p.n + " " + t("אירועים") : p.n + " " + t("רשומות");
    return '<g class="mp' + (S.country === p.entry.location.country ? " is-on" : "") +
      (p.official ? " mp--off" : "") + '"' +
      ' data-place="' + esc(p.entry.id) + '" style="--sv:' + SV[p.sev] + '"' +
      ' tabindex="0" role="button" aria-label="' + esc(nm) + ", " + esc(val) + '">' +
      '<circle class="mp__halo" cx="' + cx.toFixed(1) + '" cy="' + cy.toFixed(1) + '" r="' + (r + 5).toFixed(1) + '"/>' +
      '<circle class="mp__dot" cx="' + cx.toFixed(1) + '" cy="' + cy.toFixed(1) + '" r="' + r.toFixed(1) + '"/>' +
      (p.official ? '<circle class="mp__ring" cx="' + cx.toFixed(1) + '" cy="' + cy.toFixed(1) +
        '" r="' + (r + 3.5).toFixed(1) + '"/>' : "") +
      (lab[p.entry.id]
        ? '<text class="mp__lab" x="' + cx.toFixed(1) + '" y="' + (cy - r - 6).toFixed(1) + '">' +
          esc(nm) + "</text>"
        : "") +
      "<title>" + esc(nm) + " — " + esc(val) +
        (p.entry.rate ? " · " + p.entry.rate + " " + t("ל-10,000 יהודים") : "") +
        (p.official ? " · " + t("החלטה מוסדית") : "") + "</title>" +
      "</g>";
  }).join("");

  host.innerHTML =
    '<svg viewBox="0 0 ' + W + " " + H + '" class="map__svg" role="img" aria-label="' +
      esc(t("פריסה גיאוגרפית")) + '">' +
      '<rect class="map__sea" x="0" y="0" width="' + W + '" height="' + H + '" rx="10"/>' +
      '<g class="map__grid">' + grid + "</g>" +
      '<line class="map__eq" x1="0" y1="' + mapY(0).toFixed(1) + '" x2="' + W + '" y2="' + mapY(0).toFixed(1) + '"/>' +
      '<g class="map__land">' + landPaths() + "</g>" +
      dots +
    "</svg>";

  /* מקרא. בלעדיו הטבעת סביב ברצלונה נראית כמו קישוט, והיא בדיוק
     ההבחנה שהדירוג נשען עליה. */
  host.insertAdjacentHTML("beforeend",
    '<div class="map__key">' +
      "<span><i></i>" + t("גודל הנקודה — היקף האירועים לנפש") + "</span>" +
      '<span><i data-k="off"></i>' + t("טבעת — החלטה של עירייה או ממשלה") + "</span>" +
    "</div>");

  var measured = pts.filter(function (p) { return p.measured; });
  $("#mapNote").textContent = pts.length + " " + t("מקומות") +
    (measured.length ? " · " + measured.reduce(function (a, p) { return a + p.n; }, 0).toLocaleString("en-US") +
      " " + t("אירועים מתועדים") : "") +
    (isDefault() ? "" : " " + t("(לפי הסינון הנוכחי)"));
}

/* ── בדיקת יעד ────────────────────────────────────────────────────────────
   שאלת המטייל אינה "אילו מדינות אוסרות" — לזה יש כבר צ׳יפ קטגוריה — אלא
   "אני טס ליפן, יש בעיה?". רשימה שטוחה עונה רק על 15 המדינות שבה;
   הכלי הזה עונה גם על השאר, וזה עיקר הערך שלו.

   בנוסף הוא מפריד בין איסור כניסה לבין סיכון בטרנזיט — מלזיה עצרה
   ישראלים בטיסות המשך בלבד, ורשימה רגילה לא מעבירה את זה.
   ------------------------------------------------------------------------ */

function travelEntries() {
  return DB.filter(function (e) { return e.travel && e.location.country; });
}

/* מתאים שאילתה לרשומה לפי שם, כינוי, מדינה או עיר — בשתי השפות.
   בלי השמות הלועזיים חיפוש "United Kingdom" מצא את רשומת המדינה
   (דרך ה-alias שלה) אבל לא את לונדון ומנצ׳סטר, שהמדינה שלהן רשומה
   כ״בריטניה״ בלבד. חיפוש לפי מדינה בלבד גם היה מחמיץ את מי שטס לעיר. */
function travelMatch(e, n) {
  var IN = window.ANTISHIMON_I18N_DATA || {};
  var fields = [
    e.location.country, e.location.city || "", e.name,
    (IN.country || {})[e.location.country] || "",
    (IN.city || {})[e.location.city] || ""
  ].concat(e.aliases || []);
  return fields.some(function (f) { return f && norm(f).indexOf(n) > -1; });
}

/* התשובה למטייל אינה בוליאנית. ״אין איסור כניסה״ אינו ״אין מה לדעת״:
   בצרפת אין איסור ויש 1,320 אירועים מתועדים ב-2025, ובברצלונה אין
   איסור ויש החלטת עירייה. הבדיקה מחזירה את כל השכבות ומציגה אותן
   לפי סדר החומרה, במקום לענות כן/לא ולסיים. */
function travelCheck(q) {
  var n = norm(q);
  if (!n) return null;

  var ban = travelEntries().filter(function (e) { return travelMatch(e, n); })[0] || null;

  var places = DB.filter(function (e) {
    return e.type === "place" && !e.travel && travelMatch(e, n);
  });

  var country = places.filter(function (p) { return !p.location.city; })[0] || null;
  var cities  = places.filter(function (p) { return p.location.city; });

  /* אם ההתאמה הייתה לעיר, נשלוף גם את רשומת המדינה שלה כדי לתת הקשר */
  if (!country && cities.length) {
    var co0 = cities[0].location.country;
    country = DB.filter(function (e) {
      return e.type === "place" && !e.location.city && e.location.country === co0 && e.incidents;
    })[0] || null;
  }

  /* משנמצאה המדינה, כל עריה נכנסות — גם אם שמן לא הופיע בשאילתה.
     מי שהקליד "צרפת" רוצה לראות את פריז, ולא היה אמור להידרש
     להקליד אותה בנפרד כדי לגלות שהיא במאגר. */
  if (country) {
    var co = country.location.country;
    DB.forEach(function (e) {
      if (e.type !== "place" || !e.location.city || e.travel) return;
      if (e.location.country !== co) return;
      if (cities.indexOf(e) === -1) cities.push(e);
    });
  }
  cities.sort(function (a, b) { return (b.weight || 0) - (a.weight || 0); });

  var scope = country ? country.location.country : (ban ? ban.location.country : "");
  var other = scope ? DB.filter(function (e) {
    return e.type !== "place" && e.location && e.location.country === scope;
  }).length : 0;

  if (!ban && !country && !cities.length) return false;   /* נבדק ולא נמצא */
  return { ban: ban, country: country, cities: cities, other: other, scope: scope };
}

var TRAVEL_ENTRY = {
  banned:   { c: "var(--s4)", t: "כניסה אסורה" },
  permit:   { c: "var(--s3)", t: "כניסה מוגבלת — נדרש אישור מיוחד" },
  restricted:{ c: "var(--s3)", t: "כניסה מוגבלת" }
};

function travelResultHTML(q, hit) {
  if (hit === false) {
    return '<div class="verdict" style="--vc:var(--ok)">' +
      '<div class="verdict__h">' + t("אין הגבלה ידועה") + "</div>" +
      "<p>" + t("״") + esc(q) + t("״ אינה מופיעה ברשימת המדינות שמגבילות כניסה, ואין לגביה נתוני אירועים במאגר.") + " " +
      t("זה לא אישור רשמי — לפני טיסה בדקו תמיד באתר משרד החוץ.") + "</p></div>";
  }

  var out = "";

  /* ── שכבה 1: כניסה. השאלה שחוסמת טיסה קודמת לכל השאר. ── */
  if (hit.ban) {
    var tv = hit.ban.travel || {};
    var ent = TRAVEL_ENTRY[tv.entry] || { c: "var(--s3)", t: "מוגבל" };
    out += '<div class="verdict" style="--vc:' + ent.c + '">' +
      '<div class="verdict__h">' + esc(coName(hit.ban.location.country)) + " — " + esc(t(ent.t)) + "</div>" +
      "<p>" + esc(dispSum(hit.ban)) + "</p></div>";

    if (tv.transit === "risk") {
      out += '<div class="verdict" style="--vc:var(--s4)">' +
        '<div class="verdict__h">⚠ ' + t("סיכון גם בטיסת המשך") + "</div>" +
        "<p>" + esc(tv.note || "") + "</p></div>";
    } else if (tv.note) {
      out += '<div class="verdict" style="--vc:var(--s1)">' +
        '<div class="verdict__h">' + t("פרטים") + "</div><p>" + esc(tv.note) + "</p></div>";
    }
  } else if (hit.country || hit.cities.length) {
    out += '<div class="verdict" style="--vc:var(--ok)">' +
      '<div class="verdict__h">' + t("הכניסה אינה מוגבלת") + "</div>" +
      "<p>" + t("אין איסור כניסה לבעלי דרכון ישראלי. מה שכן ידוע על היעד מופיע למטה.") + "</p></div>";
  }

  /* ── שכבה 2: כמה קורה שם. זו התוספת שהופכת את הכלי משאלת גבול
       לשאלת יעד — ״מותר להיכנס״ אינו ״שקט שם״. ── */
  if (hit.country && hit.country.incidents) {
    var ic = hit.country.incidents;
    var mon = (PLACES.monitors || {})[ic.monitor] || {};
    var dir = ic.prev ? (ic.n > ic.prev ? "↑" : ic.n < ic.prev ? "↓" : "→") : "";
    out += '<div class="verdict" style="--vc:' + SV[hit.country.severity] + '">' +
      '<div class="verdict__h">' + esc(coName(hit.country.location.country)) + " — " +
        ic.n.toLocaleString("en-US") + " " + t("אירועים מתועדים") + " " + esc(String(ic.year)) + "</div>" +
      "<p>" + (hit.country.rate ? "<b>" + hit.country.rate + "</b> " + t("ל-10,000 יהודים") + " · " : "") +
        (mon.name ? t("מקור:") + " " + esc(mon.name) : "") +
        (ic.assaults ? " · " + ic.assaults + " " + t("תקיפות פיזיות") : "") +
        (dir && ic.prev ? " · " + dir + " " + t("לעומת") + " " + ic.prev.toLocaleString("en-US") : "") +
      "</p>" +
      '<p style="margin-block-start:.5rem">' + esc(dispSum(hit.country)) + "</p></div>";
  }

  /* ── שכבה 2ב: החלטה ממשלתית או עירונית ביעד. טורקיה שהשעתה את כל
       הסחר וקולומביה שניתקה יחסים אינן מגבילות כניסת ישראלים — אבל
       ״הכניסה אינה מוגבלת״ לבדו היה מסתיר בדיוק את מה שחשוב לדעת. ── */
  if (hit.country && hit.country.official && !hit.country.incidents) {
    out += '<div class="verdict" style="--vc:var(--brass)">' +
      '<div class="verdict__h">⚑ ' + esc(coName(hit.country.location.country)) + " — " +
        t(hit.country.official.kind === "entry-ban" ? "איסור כניסה ממלכתי" : "החלטה מוסדית") + "</div>" +
      "<p>" + esc(dispSum(hit.country)) + "</p></div>";
  }

  /* ── שכבה 3: ערים. מי שטס לצרפת לא טס ל״צרפת״ — הוא טס לפריז. ── */
  if (hit.cities.length) {
    out += '<h3 class="dos__h" style="margin-block-start:1.4rem">' + t("ערים ביעד") +
      ' <span class="mono">' + hit.cities.length + "</span></h3>" +
      '<div class="newsl">' + hit.cities.map(function (c) {
        var bits = [];
        if (c.incidents) bits.push(c.incidents.n.toLocaleString("en-US") + " " + t("אירועים"));
        if (c.rate) bits.push(c.rate + " " + t("ל-10,000 יהודים"));
        if (c.official) bits.push(t("החלטה מוסדית"));
        /* פריז אינה נמדדת בנפרד ואין בה החלטה עירונית, ובלי השורה הזו
           היא הופיעה עם שורת מטא ריקה — כאילו אין עליה מה לומר. */
        if (!bits.length) bits.push(t("אירועים מתועדים במרשם") + (c.docs ? " · " + c.docs : ""));
        return '<button class="rc" data-act="open-from-travel" data-id="' + esc(c.id) + '"' +
          ' style="--sv:' + SV[c.severity] + '">' +
          '<span class="rc__dot" aria-hidden="true"></span>' +
          '<span class="rc__mid"><span class="rc__name">' + esc(dispName(c)) +
            (c.official ? '<span class="rc__new">⚑</span>' : "") + "</span>" +
            '<span class="rc__meta">' + esc(bits.join(" · ")) + "</span></span>" +
          "</button>";
      }).join("") + "</div>";
  }

  /* ── שכבה 4: שאר המרשם ביעד ── */
  if (hit.other) {
    out += '<p class="modal__p" style="margin-block:1.1rem 0">' +
      "<b>" + hit.other + "</b> " +
      t(hit.other === 1 ? "רשומה נוספת במרשם ממוקמת ביעד הזה — חברה, מוסד או אדם."
                        : "רשומות נוספות במרשם ממוקמות ביעד הזה — חברות, מוסדות ואנשים.") + " " +
      '<button class="tl" data-act="travel-scope" data-q="' + esc(hit.scope) + '">' +
      t("הצגתן ברשימה") + "</button></p>";
  }

  var main = hit.ban || hit.country || hit.cities[0];
  out += '<div style="display:flex;gap:1.3rem;margin-block-start:1rem;flex-wrap:wrap">' +
    (main ? '<button class="tl" data-act="open-from-travel" data-id="' + esc(main.id) + '">' +
      t("המקורות המלאים") + "</button>" : "") +
    '<button class="tl" data-act="close-modal">' + t("סגירה") + "</button></div>";
  return out;
}

function travelModal() {
  var list = travelEntries();
  /* ההשלמה האוטומטית מציעה כל יעד שיש עליו מה לומר — לא רק את
     המדינות שאוסרות כניסה. מי שמקליד ״צרפת״ קיבל קודם ״לא נמצא״,
     בזמן שבמאגר יושבים 1,320 אירועים מתועדים לגביה. */
  var dests = {};
  list.forEach(function (e) { dests[e.location.country] = 1; });
  DB.forEach(function (e) {
    if (e.type !== "place") return;
    if (e.location.city) dests[e.location.city] = 1;
    else if (e.location.country) dests[e.location.country] = 1;
  });
  var destNames = Object.keys(dests).sort(function (a, b) { return a.localeCompare(b, "he"); });

  var measured = DB.filter(function (e) { return e.type === "place" && e.incidents; })
                   .sort(function (a, b) { return (b.weight || 0) - (a.weight || 0); });

  openModal(
    '<h2 class="modal__h">' + t("בדיקת יעד") + "</h2>" +
    '<p class="modal__p">' + t("הקלידו מדינה, עיר או עצירת ביניים.") + " " +
      "<b>" + list.length + "</b> " + t("מדינות מגבילות כניסה לבעלי דרכון ישראלי,") + " " +
      "<b>" + measured.length + "</b> " + t("יעדים נוספים נמדדים בידי גופי ניטור רשמיים.") + "</p>" +

    '<form id="travelForm">' +
      '<label class="fld"><span class="fld__k">' + t("לאן טסים?") + "</span>" +
      '<input name="dest" list="destList" placeholder="' + esc(t("לדוגמה: צרפת, פריז, מלזיה")) + '" autocomplete="off"></label>' +
      '<datalist id="destList">' + destNames.map(function (c) {
        return '<option value="' + esc(c) + '">';
      }).join("") + "</datalist>" +
      '<div class="acts"><button class="btn" type="submit">' + t("בדיקה") + "</button></div>" +
    "</form>" +
    '<div id="travelOut"></div>' +

    '<h3 class="dos__h" style="margin-block-start:1.6rem">' + t("מדינות שמגבילות כניסה") +
      ' <span class="mono">' + list.length + "</span></h3>" +
    '<div class="newsl">' + list.slice().sort(function (a, b) {
      return coName(a.location.country).localeCompare(coName(b.location.country), LANG === "en" ? "en" : "he");
    }).map(function (e) {
      var tt = (e.travel || {});
      return '<button class="rc" data-act="travel-pick" data-q="' + esc(e.location.country) + '"' +
        ' style="--sv:' + (tt.transit === "risk" ? "var(--s4)" : SV[e.severity]) + '">' +
        '<span class="rc__dot" aria-hidden="true"></span>' +
        '<span class="rc__mid"><span class="rc__name">' + esc(coName(e.location.country)) +
          (tt.transit === "risk" ? '<span class="rc__new">' + t("טרנזיט") + "</span>" : "") + "</span>" +
          '<span class="rc__meta">' + esc(t((TRAVEL_ENTRY[tt.entry] || {}).t || "")) + "</span></span>" +
        "</button>";
    }).join("") + "</div>" +

    /* היעדים הפתוחים חשובים לא פחות: לשם באמת טסים, ושם המספרים
       הם ההבדל בין ״מותר״ לבין ״מה כדאי לדעת״. */
    '<h3 class="dos__h" style="margin-block-start:1.6rem">' + t("יעדים עם נתוני אירועים") +
      ' <span class="mono">' + measured.length + "</span></h3>" +
    '<div class="newsl">' + measured.map(function (e) {
      return '<button class="rc" data-act="travel-pick" data-q="' +
        esc(e.location.city || e.location.country) + '" style="--sv:' + SV[e.severity] + '">' +
        '<span class="rc__dot" aria-hidden="true"></span>' +
        '<span class="rc__mid"><span class="rc__name">' + esc(dispName(e)) + "</span>" +
          '<span class="rc__meta">' + e.incidents.n.toLocaleString("en-US") + " " + t("אירועים") +
          (e.rate ? " · " + e.rate + " " + t("ל-10,000 יהודים") : "") + "</span></span>" +
        '<span class="rc__d mono">' + esc(String(e.incidents.year)) + "</span>" +
        "</button>";
    }).join("") + "</div>"
  );

  $("#travelForm").addEventListener("submit", function (ev) {
    ev.preventDefault();
    var q = String(new FormData(ev.target).get("dest") || "").trim();
    if (!q) { toast(t("הזינו מדינת יעד")); return; }
    $("#travelOut").innerHTML = travelResultHTML(q, travelCheck(q));
    $("#travelOut").scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
}

/* ── כרטיס שיתוף ──────────────────────────────────────────────────────────
   ההפצה בישראל עוברת בוואטסאפ, ושם תמונה אחת עוברת טוב יותר מקישור.
   הכרטיס נבנה ב-Canvas ונשלח כקובץ דרך Web Share; בדפדפן שלא תומך —
   יורד כתמונה. הוא נושא את מספר המקורות ואת התאריך בכוונה: מי שמקבל
   אותו צריך לראות שיש מאחוריו תיעוד, לא סיסמה.
   ------------------------------------------------------------------------ */

var SV_HEX = { 1: "#7E8AA8", 2: "#4E93B8", 3: "#E0913C", 4: "#D2453F" };

/* גלישת שורות ידנית — לקנבס אין wrap, ועברית ארוכה חייבת אותו */
function wrapLines(ctx, text, maxW, maxLines) {
  var words = String(text).split(/\s+/), lines = [], cur = "";
  for (var i = 0; i < words.length; i++) {
    var t = cur ? cur + " " + words[i] : words[i];
    if (ctx.measureText(t).width > maxW && cur) {
      lines.push(cur); cur = words[i];
      if (lines.length === maxLines) break;
    } else { cur = t; }
  }
  if (lines.length < maxLines && cur) lines.push(cur);
  if (lines.length === maxLines && cur && lines[maxLines - 1] !== cur) {
    lines[maxLines - 1] = lines[maxLines - 1].replace(/.{1,2}$/, "…");
  }
  return lines;
}

function drawCard(e) {
  var W = 1080, H = 1080, P = 88;
  var hex = SV_HEX[e.severity] || "#7E8AA8";
  var cv = document.createElement("canvas");
  cv.width = W; cv.height = H;
  var c = cv.getContext("2d");

  c.fillStyle = "#0F1522"; c.fillRect(0, 0, W, H);
  var g = c.createRadialGradient(W, 0, 0, W, 0, W * 1.1);
  g.addColorStop(0, hex + "38"); g.addColorStop(1, "#0F152200");
  c.fillStyle = g; c.fillRect(0, 0, W, H);

  c.fillStyle = hex; c.fillRect(0, 0, W, 10);

  c.direction = "rtl"; c.textAlign = "right";

  /* סימן המותג */
  var bx = W - P, hs = [22, 32, 42, 54];
  for (var i = 0; i < 4; i++) {
    c.fillStyle = ["#7E8AA8", "#4E93B8", "#E0913C", "#D2453F"][i];
    c.fillRect(bx - 11, 92 + (54 - hs[i]), 11, hs[i]);
    bx -= 17;
  }
  c.fillStyle = "#F1EBDD"; c.font = "400 42px 'Suez One', serif";
  c.fillText("אנטישימון", bx - 18, 146);

  var cat = CAT_BY[e.type] || {};
  c.fillStyle = hex; c.font = "600 27px 'IBM Plex Mono', monospace";
  c.fillText(String(cat.label || "").toUpperCase(), W - P, 268);

  /* שם */
  c.fillStyle = "#F1EBDD"; c.font = "400 84px 'Suez One', serif";
  var nl = wrapLines(c, e.name, W - P * 2, 3), y = 372;
  nl.forEach(function (l) { c.fillText(l, W - P, y); y += 96; });

  var where = [cityName(e.location.city), coName(e.location.country)].filter(Boolean).join(", ");
  if (where) {
    c.fillStyle = "#A6B1C7"; c.font = "300 34px Rubik, sans-serif";
    c.fillText(where, W - P, y + 8); y += 56;
  }

  /* מד חומרה */
  y += 44;
  var bw = 46, gp = 9, sx = W - P;
  for (var k = 1; k <= 4; k++) {
    c.fillStyle = k <= e.severity ? hex : "#2A3245";
    c.fillRect(sx - bw, y, bw, 26);
    sx -= bw + gp;
  }
  c.fillStyle = hex; c.font = "500 38px Rubik, sans-serif";
  c.fillText((SEV_BY[e.severity] || {}).label || "", sx - 14, y + 25);

  /* תקציר */
  y += 92;
  c.fillStyle = "#A6B1C7"; c.font = "300 33px Rubik, sans-serif";
  wrapLines(c, e.summary, W - P * 2, 5).forEach(function (l) {
    c.fillText(l, W - P, y); y += 48;
  });

  /* כותרת תחתונה — התיעוד הוא הנקודה */
  c.strokeStyle = "#2A3245"; c.lineWidth = 2;
  c.beginPath(); c.moveTo(P, H - 148); c.lineTo(W - P, H - 148); c.stroke();

  c.fillStyle = "#F1EBDD"; c.font = "500 34px 'IBM Plex Mono', monospace";
  c.fillText(e.sources.length + " מקורות מתועדים", W - P, H - 92);

  c.fillStyle = "#6F7C94"; c.font = "300 27px Rubik, sans-serif";
  c.fillText("עודכן " + fmtDate(e.updated), W - P, H - 50);

  c.textAlign = "left";
  c.fillStyle = "#6F7C94"; c.font = "300 27px Rubik, sans-serif";
  c.fillText((STAT_BY[e.status] || {}).label || "", P, H - 92);

  return cv;
}

function shareCard(id) {
  var e = byId(id);
  if (!e) return;

  var go = function () {
    var cv = drawCard(e);
    cv.toBlob(function (blob) {
      if (!blob) { toast("יצירת התמונה נכשלה"); return; }
      var file = new File([blob], "antishimon-" + e.id + ".png", { type: "image/png" });
      var txt = e.name + " — " + ((SEV_BY[e.severity] || {}).label || "") +
                " · " + e.sources.length + " מקורות מתועדים";

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        navigator.share({ files: [file], text: txt }).catch(function () {});
        return;
      }
      var a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = file.name;
      a.click();
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 1500);
      toast("התמונה הורדה — אפשר לשתף אותה");
    }, "image/png");
  };

  /* בלי המתנה לגופנים הקנבס מצייר בגופן ברירת מחדל */
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(go);
  else go();
}

/* ── תיק ──────────────────────────────────────────────────────────────── */

function openEntry(id) {
  var e = DB.filter(function (x) { return x.id === id; })[0];
  if (!e) return;

  var cat = CAT_BY[e.type] || {}, sev = SEV_BY[e.severity] || {};
  var st = STAT_BY[e.status] || {}, reg = REG_BY[e.location.region] || {};

  var note = "";
  if (e.incoming) {
    note = '<p class="note"><b>מועמד מהסוכן היומי — טרם אושר.</b> ' +
      'הרשומה נאספה אוטומטית ב־' + esc(fmtDate((INCOMING || {}).generated)) + '. ' +
      'קראו את המקורות ואשרו או דחו לפני שמסתמכים עליה.' +
      '<span class="note__acts">' +
        '<button class="btn" data-act="approve" data-id="' + esc(e.id) + '">אישור לרשומה</button>' +
        '<button class="tl" data-act="reject" data-id="' + esc(e.id) + '">דחייה והסרה</button>' +
      "</span></p>";
  } else if (e.status === "retracted") {
    note = '<p class="note note--out"><b>' + t("הרשומה בוטלה.") + "</b> " +
      esc(e.correction || t("הדיווח הופרך או תוקן. הרשומה נשמרת לשקיפות בלבד.")) + "</p>";
  } else if (e.status === "disputed") {
    note = '<p class="note"><b>' + t("שנוי במחלוקת.") + "</b> " +
      esc(tx("statusDesc", e.status, st.desc)) + " " + t("קראו את המקורות משני הצדדים.") + "</p>";
  } else if (e.status === "review") {
    note = '<p class="note"><b>' + t("בבדיקה.") + "</b> " + esc(tx("statusDesc", e.status, st.desc)) + "</p>";
  } else if (!e.sources.length) {
    note = '<p class="note"><b>' + t("אין מקורות.") + "</b> " + t("רשומה ללא מקור אינה ראיה לכלום.") + "</p>";
  } else if (e.sources.length === 1) {
    note = '<p class="note"><b>' + t("מקור יחיד.") + "</b> " + t("הרשומה נשענת על מקור אחד בלבד. שקלו אותה בהתאם.") + "</p>";
  }

  var facts = [
    [t("קטגוריה"), tx("cat", e.type, cat.label)],
    [t("מדינה"), coName(e.location.country) || "—"],
    [t("אזור"), regName(e.location.region, reg.label) || "—"],
    [t("עיר"), cityName(e.location.city) || "—"],
    [t("היקף"), t(e.scope === "global" ? "גלובלי" : "מקומי")],
    [t("גוף אם"), e.parent || "—"],
    [t("מקורות"), String(e.sources.length)],
    [t("עודכן"), fmtDate(e.updated)]
  ].map(function (f) {
    return '<div class="fact"><dt>' + esc(f[0]) + "</dt><dd>" + esc(f[1]) + "</dd></div>";
  }).join("");

  var srcs = e.sources.length
    ? e.sources.slice().sort(function (a, b) { return dateKey(a.date).localeCompare(dateKey(b.date)); })
        .map(function (s) {
          var u = safeUrl(s.url);
          return '<div class="src">' +
            '<div class="src__meta">' + esc(fmtDate(s.date)) +
              (s.publisher ? " · " + esc(t(s.publisher)) : "") + "</div>" +
            '<span class="src__t" dir="auto">' +
              (u ? '<a href="' + esc(u) + '" target="_blank" rel="noopener noreferrer nofollow">' + esc(s.title || u) + "</a>"
                 : esc(s.title || t("ללא כותרת"))) + "</span>" +
            (s.quote ? '<blockquote class="src__q" dir="auto">' + esc(s.quote) + "</blockquote>" : "") +
            (u ? '<a class="src__go" href="' + esc(u) + '" target="_blank" rel="noopener noreferrer nofollow">' + t("פתיחת המקור") + " ↗</a>" : "") +
          "</div>";
        }).join("")
    : '<p class="void__p" style="margin:0">' + t("אין מקורות. אל תסתמכו על הרשומה.") + "</p>";

  var alts = e.alternatives.length
    ? '<h3 class="dos__h">' + t("חלופות") + '</h3><div class="alts">' + e.alternatives.map(function (a) {
        var u = safeUrl(a.url);
        return '<div class="alt"><b>' + esc(a.name) + "</b>" +
          (a.note ? "<span>" + esc(a.note) + "</span>" : "") +
          (u ? ' <a href="' + esc(u) + '" target="_blank" rel="noopener noreferrer nofollow" style="margin-inline-start:auto">↗</a>' : "") +
        "</div>";
      }).join("") + "</div>"
    : "";

  $("#dosIn").innerHTML =
    '<div class="dos" style="--sv:' + SV[e.severity] + '">' +
      '<div class="dos__top"><div>' +
        '<div class="dos__cat">' + esc(tx('cat', e.type, cat.label)) + "</div>" +
        '<h2 class="dos__name" id="dosName">' + esc(dispName(e)) + "</h2>" +
        (e.aliases.length ? '<div class="dos__alias">' + esc(e.aliases.join(" · ")) + "</div>" : "") +
      "</div>" +
      '<button class="dos__x" data-act="close-dos" aria-label="סגירה">✕</button></div>' +

      '<div class="gauge">' + bars(e.severity, "gauge__bars") +
        '<div class="gauge__t"><b>' + esc(tx('sev', e.severity, sev.label || '')) + "</b>" +
        "<span>" + esc(tx('sevDesc', e.severity, sev.desc || '')) + "</span></div></div>" +

      /* מי אחראי — מוצג לפני העובדות, כי זה מה שקובע מה לעשות עם המידע */
      '<div class="caveat"' + (e.actor === "leadership" ? "" : ' style="background:transparent;border-color:var(--line)"') + ">" +
        '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.9" aria-hidden="true">' +
        (e.actor === "leadership"
          ? '<path d="M12 8v5M12 16.5v.5"/><path d="M10.3 3.9 2.4 17.6A2 2 0 0 0 4.1 20.6h15.8a2 2 0 0 0 1.7-3l-7.9-13.7a2 2 0 0 0-3.4 0Z"/>'
          : '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5.5M12 7.6v.4"/>') + "</svg>" +
        "<span><b>" + esc(tx('actor', e.actor, (ACT_BY[e.actor] || {}).label || '')) + ".</b> " +
        esc(tx('actorDesc', e.actor, (ACT_BY[e.actor] || {}).desc || '')) + "</span>" +
      "</div>" +

      '<dl class="facts">' + facts + "</dl>" +
      placeStripHTML(e) +
      note +
      '<p class="dos__sum">' + esc(dispSum(e)) + "</p>" +
      (e.rate ? methodNote() : "") +

      (e.tags.length ? '<div class="tags">' + e.tags.map(function (t) {
        return '<button class="tag" data-q="' + esc(t) + '">' + esc(tagName(t)) + "</button>";
      }).join("") + "</div>" : "") +

      alts +

      '<h3 class="dos__h">' + t("מקורות") + ' <span class="mono">' + e.sources.length + "</span></h3>" +
      '<div class="tl-src">' + srcs + "</div>" +

      '<div class="dos__acts">' +
        '<button class="btn" data-act="share" data-id="' + esc(e.id) + '">' + t("שיתוף בוואטסאפ") + "</button>" +
        '<button class="tl" data-act="watch" data-id="' + esc(e.id) + '">' +
          t(isWatched(e.id) ? "★ במעקב" : "☆ הוספה למעקב") + "</button>" +
        '<button class="tl" data-act="correction" data-id="' + esc(e.id) + '">' + t("בקשת תיקון") + "</button>" +
        '<button class="tl" data-act="permalink" data-id="' + esc(e.id) + '">' + t("העתקת קישור") + "</button>" +
      "</div>" +
    "</div>";

  lastFocus = document.activeElement;
  openId = e.id;
  $("#dossier").hidden = false;
  $("#scrim").hidden = false;
  document.body.classList.add("is-locked");
  history.replaceState(null, "", "#/e/" + encodeURIComponent(e.id));
  $("#dossier").scrollTop = 0;
  var x = $(".dos__x");
  if (x) x.focus();
}

function closeDos() {
  $("#dossier").hidden = true;
  $("#scrim").hidden = true;
  document.body.classList.remove("is-locked");
  history.replaceState(null, "", location.pathname + location.search);
  openId = null;
  if (lastFocus && lastFocus.focus) lastFocus.focus();
  lastFocus = null;
}

/* ── סורק ברקוד ───────────────────────────────────────────────────────────
   הסורק לא טוען שהוא מזהה ארץ ייצור. קידומת GS1 מציינת רק היכן החברה
   נרשמה, וזה מה שהאפליקציה אומרת. כל השאר הוא התאמה מול המרשם עצמו.
   ------------------------------------------------------------------------ */

var GS1 = META.gs1 || { prefixes: [], sources: [], note: "" };
var scanStream = null, scanLoop = null;

/* ספרת ביקורת של EAN-13 / UPC-A — מסננת קריאות שגויות */
function validGtin(code) {
  var s = String(code).replace(/\D/g, "");
  if (s.length < 8 || s.length > 14) return false;
  var sum = 0, i, d, mul;
  for (i = 0; i < s.length - 1; i++) {
    d = +s[s.length - 2 - i];
    mul = (i % 2 === 0) ? 3 : 1;
    sum += d * mul;
  }
  return ((10 - (sum % 10)) % 10) === +s[s.length - 1];
}

function gs1Label(code) {
  var s = String(code).replace(/\D/g, "");
  if (s.length === 12) s = "0" + s;           /* UPC-A → EAN-13 */
  var p = parseInt(s.slice(0, 3), 10);
  if (isNaN(p)) return null;
  for (var i = 0; i < GS1.prefixes.length; i++) {
    if (p >= GS1.prefixes[i].from && p <= GS1.prefixes[i].to) return GS1.prefixes[i].label;
  }
  return null;
}

/* שיוכי ברקוד שהמשתמש תרם. נבדקים לפני המאגר המצורף, כך שסריקה חוזרת
   של אותו מוצר עונה מיד. */
function myCodes() { return lsGet(LS.codes, {}); }

function brandOptions() {
  var set = {};
  DB.forEach(function (e) {
    (e.brands || []).forEach(function (b) { set[b] = 1; });
    if (e.type === "brand" || e.type === "company") set[e.name] = 1;
  });
  (SUP.items || []).forEach(function (it) { if (it.section === "products") set[it.name] = 1; });
  return Object.keys(set).sort(function (a, b) { return a.localeCompare(b, "he"); })
    .map(function (n) { return '<option value="' + esc(n) + '">'; }).join("");
}

/* התאמה מול המרשם: קודם GTIN מדויק, אחר כך שיוך שהמשתמש תרם */
function lookupCode(code) {
  var s = String(code).replace(/\D/g, "");
  var exact = DB.filter(function (e) {
    return (e.barcodes || []).some(function (b) { return String(b).replace(/\D/g, "") === s; });
  });

  if (!exact.length) {
    var mine = myCodes()[s];
    if (mine) {
      exact = DB.filter(function (e) {
        return norm(e.name) === norm(mine) ||
               (e.brands || []).some(function (b) { return norm(b) === norm(mine); });
      });
      if (!exact.length) {
        var sup = (SUP.items || []).filter(function (it) { return norm(it.name) === norm(mine); })[0];
        if (sup) return { exact: [], support: sup, mine: mine, prefix: gs1Label(s) };
      }
    }
  }
  return { exact: exact, prefix: gs1Label(s) };
}

function lookupBrand(text) {
  var n = norm(text);
  if (!n) return [];
  return DB.filter(function (e) {
    return (e.brands || []).some(function (b) { return norm(b) === n || norm(b).indexOf(n) === 0; });
  });
}

function verdictHTML(code) {
  var r = lookupCode(code);
  var out = "";

  if (r.support) {
    out += '<div class="verdict" style="--vc:var(--ok)">' +
      '<div class="verdict__h">מוצר תחת חרם — כאן דווקא כן</div>' +
      "<p><b>" + esc(r.support.name) + "</b> — " + esc(r.support.why || "") + "</p>" +
      '<span class="mono">' + esc(code) + " · שויך בידיכם ל־" + esc(r.mine) + "</span></div>";
  } else if (r.exact.length) {
    var e = r.exact[0];
    out += '<div class="verdict" style="--vc:' + SV[e.severity] + '">' +
      '<div class="verdict__h">נמצא במרשם</div>' +
      "<p><b>" + esc(e.name) + "</b> — " + esc((SEV_BY[e.severity] || {}).label) + "</p>" +
      '<span class="mono">' + esc(code) + (r.mine ? " · שויך בידיכם" : "") + "</span></div>" +
      '<button class="btn" data-act="open-from-scan" data-id="' + esc(e.id) + '">פתיחת הרשומה</button>';
  } else {
    /* "לא נמצא" הוא רגע מבוזבז אם הוא מסתיים בעצמו. כאן הוא הופך
       לתרומה: שדה אחד שמקשר את הברקוד למותג, והמאגר המקומי גדל. */
    out += '<div class="verdict" style="--vc:var(--ok)">' +
      '<div class="verdict__h">לא נמצא במרשם</div>' +
      "<p>המספר הזה לא משויך לאף רשומה. זה לא אומר שהמוצר תקין — זה אומר שאין לנו עליו כלום.</p>" +
      '<span class="mono">' + esc(code) + "</span></div>" +

      '<form class="contrib" id="contribForm" data-code="' + esc(code) + '">' +
        '<label class="fld" style="margin:0">' +
          '<span class="fld__k">עוזרים למאגר: של איזה מותג זה?</span>' +
          '<input name="brand" list="brandList" placeholder="לדוגמה: אוסם, Co-op" autocomplete="off">' +
          '<span class="fld__hint">שיוך אחד עוזר לכל מי שיסרוק את המוצר הזה אחריכם. נשמר אצלכם ונכלל בייצוא.</span>' +
        "</label>" +
        '<datalist id="brandList">' + brandOptions() + "</datalist>" +
        '<button class="btn" type="submit">שיוך</button>' +
      "</form>";
  }

  if (r.prefix) {
    var isIL = r.prefix.indexOf("ישראל") > -1;
    out += '<div class="verdict" style="--vc:' + (isIL ? "var(--ok)" : "var(--s1)") + '">' +
      '<div class="verdict__h">רישום הברקוד: ' + esc(r.prefix) + "</div>" +
      "<p>" + esc(GS1.note) +
      (isIL
        ? " אם זה אכן מוצר ישראלי — בדקו את התווית — הוא ככל הנראה יעד של קמפייני חרם, וקנייתו היא בדיוק הפעולה ההפוכה."
        : "") + "</p>" +
      (isIL ? '<button class="tl" data-act="see-support" style="margin-block-start:.6rem">רשימת המוצרים תחת חרם</button>' : "") +
      "</div>";
  }

  out += '<div style="display:flex;gap:1.3rem;margin-block-start:1rem;flex-wrap:wrap">' +
    '<button class="tl" data-act="add">הוספת רשומה למספר הזה</button>' +
    '<button class="tl" data-act="close-scan">סגירה</button></div>';

  return out;
}

function showVerdict(code) {
  var out = $("#scanOut");
  out.innerHTML = verdictHTML(code);
  out.hidden = false;
}

function openScan() {
  $("#scan").hidden = false;
  document.body.classList.add("is-locked");
  $("#scanOut").hidden = true;
  $("#scanOut").innerHTML = "";
  startCamera();
}

function closeScan() {
  stopCamera();
  $("#scan").hidden = true;
  if ($("#dossier").hidden && $("#modal").hidden) document.body.classList.remove("is-locked");
}

function startCamera() {
  var msg = $("#scanMsg"), stage = $("#scanStage"), vid = $("#scanVid");

  if (!("BarcodeDetector" in window)) {
    msg.textContent = "הדפדפן הזה לא תומך בזיהוי ברקוד מהמצלמה. הקלידו את המספר שמתחת לברקוד — זה עובד תמיד.";
    return;
  }
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    msg.textContent = "אין גישה למצלמה בדפדפן הזה. הקלידו את המספר שמתחת לברקוד.";
    return;
  }

  msg.textContent = "מכוונים את המצלמה אל הברקוד…";

  navigator.mediaDevices.getUserMedia({
    video: { facingMode: { ideal: "environment" }, width: { ideal: 1280 } }
  }).then(function (stream) {
    scanStream = stream;
    vid.srcObject = stream;
    stage.classList.add("on");
    return vid.play();
  }).then(function () {
    var det = new window.BarcodeDetector({
      formats: ["ean_13", "ean_8", "upc_a", "upc_e", "code_128"]
    });
    scanLoop = setInterval(function () {
      if (!vid.videoWidth) return;
      det.detect(vid).then(function (codes) {
        if (!codes || !codes.length) return;
        var raw = codes[0].rawValue;
        if (!validGtin(raw)) return;          /* ספרת ביקורת שגויה — קריאה רועשת */
        stopCamera();
        msg.textContent = "נסרק: " + raw;
        showVerdict(raw);
      }).catch(function () {});
    }, 350);
  }).catch(function () {
    msg.textContent = "לא ניתן לפתוח את המצלמה — ייתכן שההרשאה נדחתה, או שהדף לא רץ ב-HTTPS. הקלידו את המספר במקום.";
  });
}

function stopCamera() {
  if (scanLoop) { clearInterval(scanLoop); scanLoop = null; }
  if (scanStream) {
    scanStream.getTracks().forEach(function (t) { t.stop(); });
    scanStream = null;
  }
  var stage = $("#scanStage");
  if (stage) stage.classList.remove("on");
}

function gs1Modal() {
  openModal(
    '<h2 class="modal__h">מה הברקוד באמת אומר</h2>' +
    '<p class="modal__p">' + esc(GS1.note) + "</p>" +
    '<p class="modal__p">הטענה הנפוצה ש״ברקוד שמתחיל ב-729 מעיד על מוצר ישראלי״ הופרכה שוב ושוב. ' +
    'היא מופצת בשני הכיוונים — גם כדי להחרים וגם כדי לתמוך — ובשני המקרים היא פשוט לא נכונה. ' +
    'האפליקציה הזאת לא משתמשת בה.</p>' +
    '<div class="plain">' + (GS1.sources || []).map(function (s) {
      var u = safeUrl(s.url);
      return "<div><b>" + esc(s.publisher) + "</b><span>" +
        (u ? '<a href="' + esc(u) + '" target="_blank" rel="noopener noreferrer nofollow">' + esc(s.title) + "</a>"
           : esc(s.title)) + "</span></div>";
    }).join("") + "</div>" +
    '<div class="acts"><button class="btn" data-act="close-modal">סגירה</button></div>'
  );
}


/* ── סיפורים אישיים ───────────────────────────────────────────────────────
   עדויות שאדם כותב או מקליט בעצמו.

   **שום עדות אינה מתפרסמת מעצמה.** ההגשה נכנסת לתור בשרת בסטטוס
   pending, עוברת סינון AI ראשוני, וממתינה לאישור אנושי. עד אז היא
   גלויה למגיש בלבד — וגם זה נאכף בשרת, לא כאן.

   שינוי מהגרסה הקודמת: העדויות היו נשמרות ב-IndexedDB במכשיר ולא
   הגיעו לאף אחד. זה היה יומן פרטי, לא מרשם. עכשיו הן נשמרות אצלנו,
   מוצגות בשם התצוגה של המגיש, וכתובת המייל לעולם אינה נחשפת.
   ───────────────────────────────────────────────────────────────────────── */

var STORIES = [];      /* מה שמוצג: מאושרות + ההגשות של המחובר */
var ST_STATE = "idle"; /* idle | loading | ok | offline */
var ST_KINDS = [
  { key: "street",  label: "ברחוב" },
  { key: "work",    label: "בעבודה" },
  { key: "campus",  label: "בלימודים" },
  { key: "online",  label: "ברשת" },
  { key: "service", label: "בשירות או בעסק" },
  { key: "other",   label: "אחר" }
];
var ST_KIND_BY = {};
ST_KINDS.forEach(function (k) { ST_KIND_BY[k.key] = k.label; });

/* השרת שומר את העדות כ-payload גולמי. כאן היא מקבלת את הצורה
   שהתצוגה מכירה, ובעיקר את שני השדות שהשרת קובע ואי אפשר לזייף
   מהדפדפן: mine ו-status. */
function stNorm(row, mine) {
  var p = row.payload || {};
  return {
    id: row.id,
    title: p.title || "",
    text: p.body || "",
    kind: p.kind || "other",
    when: p.when || "",
    city: p.city || "",
    country: p.country || "",
    audio: p.audio || null,
    dur: +p.dur || 0,
    transcript: p.transcript || "",
    author: row.author_name || (mine && API.user ? API.user.name : ""),
    status: row.status,
    note: row.review_note || "",
    featured: !!row.featured,
    mine: !!mine,
    created: row.created_at
  };
}

function stLoad() {
  if (!API.ready) { STORIES = []; ST_STATE = "offline"; return Promise.resolve(STORIES); }
  ST_STATE = "loading";

  var jobs = [API.publicItems("story").catch(function () { return null; })];
  jobs.push(API.user ? API.mine().catch(function () { return []; }) : Promise.resolve([]));

  return Promise.all(jobs).then(function (r) {
    if (r[0] === null) { STORIES = []; ST_STATE = "offline"; return STORIES; }

    var seen = {}, out = [];
    /* ההגשות שלי קודם: אם עדות שלי כבר אושרה היא מופיעה בשתי
       הרשימות, ואני רוצה שתישאר מסומנת כשלי. */
    r[1].filter(function (x) { return x.kind === "story"; })
        .forEach(function (x) { seen[x.id] = 1; out.push(stNorm(x, true)); });
    r[0].forEach(function (x) { if (!seen[x.id]) out.push(stNorm(x, false)); });

    STORIES = out.sort(function (a, b) {
      /* ממתינות בראש — הן דורשות מהמגיש תשומת לב — ואז המוצמדות. */
      var pa = a.mine && a.status !== "approved" ? 2 : a.featured ? 1 : 0;
      var pb = b.mine && b.status !== "approved" ? 2 : b.featured ? 1 : 0;
      return pb - pa || String(b.created).localeCompare(String(a.created));
    });
    ST_STATE = "ok";
    return STORIES;
  });
}

function stById(id) {
  for (var i = 0; i < STORIES.length; i++) if (STORIES[i].id === id) return STORIES[i];
  return null;
}

/* הסיפור המוצג בראש: זה שהצוות הצמיד, ואם אין — המאושר האחרון */
function stFeatured() {
  var pub = STORIES.filter(function (s) { return s.status === "approved"; });
  if (!pub.length) return null;
  return pub.filter(function (s) { return s.featured; })[0] || pub[0];
}

/* ── תצוגה ── */

function stMetaHTML(s) {
  var bits = [];
  if (s.kind)  bits.push('<span class="sc__kind">' + esc(tx("kind", s.kind, ST_KIND_BY[s.kind] || s.kind)) + "</span>");
  var place = [s.city, s.country].filter(Boolean).join(", ");
  if (place)   bits.push("<b>" + esc(place) + "</b>");
  if (s.when)  bits.push(esc(fmtDate(s.when)));
  if (s.audio) bits.push("● " + stDur(s.dur));
  return '<div class="sc__meta">' + bits.filter(Boolean).join("") + "</div>" +
    /* הייחוס יושב בשורה משלו ולא בתוך שורת המטא. בעברית עם ספרות
       ולטינית מעורבות שם שנדחס בסוף שורה כזו נקרא כהמשך של התאריך.
       שם התצוגה בלבד — המייל אינו יוצא מהשרת בשום מסלול. */
    (s.author ? '<p class="sc__by">' + t("מאת") + " <b>" + esc(s.author) + "</b></p>" : "");
}

/* סטטוס מוצג רק לבעל העדות. לקורא מזדמן אין מה לעשות עם ״ממתין״,
   ואת המאושרות ממילא הוא רואה בלי תווית. */
var ST_STATUS = {
  pending:   { c: "wait", he: "בבדיקה",            en: "In review" },
  ai_passed: { c: "wait", he: "עבר סינון · ממתין לאישור", en: "Screened · awaiting approval" },
  approved:  { c: "ok",   he: "פורסם",             en: "Published" },
  rejected:  { c: "no",   he: "לא אושר",           en: "Not approved" }
};

function stBadgeHTML(s) {
  if (!s.mine || s.status === "approved") return "";
  var b = ST_STATUS[s.status] || ST_STATUS.pending;
  return '<span class="stat stat--' + b.c + '">' + esc(LANG === "en" ? b.en : b.he) + "</span>";
}

function stDur(sec) {
  var n = Math.max(0, Math.round(+sec || 0));
  return Math.floor(n / 60) + ":" + String(n % 60).padStart(2, "0");
}

function stActsHTML(s) {
  var acts = [];
  if (s.status === "approved") {
    acts.push('<button class="tl" data-act="story-card" data-id="' + esc(s.id) + '">' +
      t("תמונה לשיתוף") + "</button>");
  }
  /* ביטול, לא מחיקה: אחרי פרסום ההסרה עוברת דרכנו, כדי שלא יימחק
     מהמרשם פריט שכבר מצוטט במקום אחר. */
  if (s.mine && s.status !== "approved") {
    acts.push('<button class="tl" data-danger="1" data-act="story-cancel" data-id="' + esc(s.id) + '">' +
      t("ביטול ההגשה") + "</button>");
  }
  return acts.length ? '<div class="sc__row">' + acts.join("") + "</div>" : "";
}

function stAudioHTML(s) {
  if (!s.audio) return "";
  return '<audio class="sc__audio" controls preload="none" src="' +
    esc(API.audioUrl(s.audio, s.status !== "approved")) + '"></audio>' +
    (s.transcript
      ? '<details class="sc__tr"><summary>' + t("תמלול") + "</summary><p>" +
        esc(s.transcript) + "</p></details>"
      : "");
}

function stories() {
  var lead = $("#storyLead");
  var pubN = STORIES.filter(function (s) { return s.status === "approved"; }).length;
  var mineN = STORIES.filter(function (s) { return s.mine && s.status !== "approved"; }).length;

  if (ST_STATE === "offline") {
    lead.innerHTML = LANG === "en"
      ? "The testimony archive is temporarily unreachable. The registry itself works offline — testimonies do not, because they live on our server."
      : "ארכיון העדויות אינו זמין כרגע. המרשם עצמו עובד גם בלי חיבור; העדויות לא, כי הן שמורות בשרת שלנו.";
  } else if (ST_STATE === "loading") {
    lead.textContent = t("טוען עדויות…");
  } else {
    lead.innerHTML =
      (pubN ? "<b>" + pubN + "</b> " + t(pubN === 1 ? "עדות שפורסמה" : "עדויות שפורסמו") + ". " : "") +
      (LANG === "en"
        ? "Every testimony here was submitted by a registered account and approved by us before it appeared. Nothing publishes itself."
        : "כל עדות כאן הוגשה בחשבון רשום ואושרה על ידינו לפני שהופיעה. שום דבר לא מתפרסם מעצמו.") +
      (mineN ? ' <span class="stat stat--wait">' + mineN + " " +
        t(mineN === 1 ? "הגשה שלכם ממתינה" : "הגשות שלכם ממתינות") + "</span>" : "");
  }

  var f = stFeatured();
  $("#storyFeat").innerHTML = f
    ? '<article class="feat">' +
        '<span class="feat__tag">' + (f.featured ? t("עדות נבחרת") : t("העדות האחרונה")) + "</span>" +
        '<h3 class="feat__h">' + esc(f.title || t("ללא כותרת")) + "</h3>" +
        (f.text ? '<p class="feat__q">' + esc(f.text) + "</p>" : "") +
        stMetaHTML(f) +
        stAudioHTML(f) +
        stActsHTML(f) +
      "</article>"
    : "";

  var rest = STORIES.filter(function (s) { return !f || s.id !== f.id; });
  $("#storyGrid").innerHTML = rest.length
    ? rest.map(function (s) {
        return '<article class="sc' + (s.mine && s.status !== "approved" ? " sc--mine" : "") + '">' +
          stBadgeHTML(s) +
          '<h3 class="sc__h">' + esc(s.title || t("ללא כותרת")) + "</h3>" +
          (s.text ? '<p class="sc__q" data-clip="1">' + esc(s.text) + "</p>" : "") +
          (s.mine && s.status === "rejected" && s.note
            ? '<p class="sc__note">' + t("הערת הבדיקה") + ": " + esc(s.note) + "</p>" : "") +
          stMetaHTML(s) +
          stAudioHTML(s) +
          stActsHTML(s) +
        "</article>";
      }).join("")
    : (f ? "" :
      '<div class="st__void"><b>' + t("עוד אין עדויות כאן") + "</b>" +
      "<p>" + (LANG === "en"
        ? "A personal testimony is the one thing in this registry no external source can supply. Write or record one — we read every submission before it goes up."
        : "עדות אישית היא הדבר היחיד במרשם שאף מקור חיצוני לא יכול לספק. " +
          "כתבו או הקליטו — אנחנו קוראים כל הגשה לפני שהיא עולה.") + "</p></div>");
}

/* ── טופס ── */

/* נוסח החלוניות מרוכז כאן ולא מפוזר ב-t(). הסיבה: אלה משפטים שלמים
   עם הדגשות בתוכם, ומילון של מפתח-לערך היה הופך אותם לבלתי קריאים. */
var ST_TXT = {
  he: {
    newH: "עדות אישית", editH: "עריכת עדות",
    lead: "מה קרה, איפה ומתי. עובדות ככל שאפשר — עדות מדויקת שווה יותר מעדות דרמטית. <b>ההגשה נכנסת לבדיקה ואינה מתפרסמת מיד.</b> אחרי אישור היא תופיע לצד שם התצוגה שלכם; המייל לעולם אינו מוצג.",
    attached: "🎙 מצורפת הקלטה באורך ",
    kTitle: "כותרת", kText: "מה קרה", kKind: "סוג", kWhen: "מתי", kCity: "עיר", kCountry: "מדינה",
    phTitle: "לדוגמה: קללות בתחנת רכבת",
    phText: "תארו את האירוע: מה נאמר או נעשה, מי היה שם, איך זה הסתיים.",
    save: "שליחה לבדיקה", update: "שליחה לבדיקה", cancel: "ביטול",
    recH: "הקלטת עדות",
    recLead: "אחרי העצירה אפשר להאזין, להקליט מחדש, ואז להוסיף כותרת ולשלוח. <b>ההקלטה עולה לשרת שלנו רק בשליחה</b>, ונשמעת רק לצוות הבדיקה עד שהעדות מאושרת.",
    recStart: "לחצו כדי להתחיל. הדפדפן יבקש רשות למיקרופון.",
    recOn: "מקליט… לחצו שוב כדי לעצור.",
    recDone: "אפשר להאזין, להקליט מחדש, או להמשיך.",
    recNoSup: "הדפדפן הזה לא תומך בהקלטה. אפשר לכתוב את העדות במקום.",
    recNoMic: "אין גישה למיקרופון. בדקו את הרשאות הדפדפן, או כתבו את העדות במקום.",
    recNext: "המשך לפרטים",
    delH: "מחיקת עדות",
    delBody: "״ תימחק מהמכשיר לצמיתות. אין עותק בשרת ואי אפשר לשחזר. אם היא חשובה — ייצאו אותה לקובץ קודם.",
    saved: "העדות נשמרה במכשיר", updated: "העדות עודכנה", failed: "השמירה נכשלה",
    deleted: "העדות נמחקה", pinned: "העדות הוצמדה לראש", unpinned: "ההצמדה בוטלה",
    dl: "הקובץ הורד — אפשר לשלוח אותו למי שתרצו",
    badJson: "הקובץ אינו JSON תקין", noneFound: "לא נמצאו עדויות בקובץ", impFail: "הייבוא נכשל",
    imp1: " עדות יובאה", impN: " עדויות יובאו",
    cardTag: "עדות אישית · אנטישימון", cardFine: "עדות אישית — לא ממצא רשמי",
    imgFail: "יצירת התמונה נכשלה", imgDl: "התמונה הורדה — אפשר לשתף אותה"
  },
  en: {
    newH: "Personal account", editH: "Edit account",
    lead: "What happened, where and when. Facts as far as you can — an accurate account is worth more than a dramatic one. <b>Submissions go to review and are not published immediately.</b> Once approved it appears beside your display name; your email is never shown.",
    attached: "🎙 A recording is attached, length ",
    kTitle: "Title", kText: "What happened", kKind: "Kind", kWhen: "When", kCity: "City", kCountry: "Country",
    phTitle: "e.g. Slurs at a train station",
    phText: "Describe the incident: what was said or done, who was there, how it ended.",
    save: "Send for review", update: "Send for review", cancel: "Cancel",
    recH: "Record an account",
    recLead: "After you stop you can listen, re-record, then add a title and send. <b>The recording is uploaded to our server only when you send it</b>, and only the review team can hear it until the testimony is approved.",
    recStart: "Tap to start. The browser will ask for microphone permission.",
    recOn: "Recording… tap again to stop.",
    recDone: "You can listen, re-record, or continue.",
    recNoSup: "This browser does not support recording. You can write the account instead.",
    recNoMic: "No microphone access. Check browser permissions, or write the account instead.",
    recNext: "Continue to details",
    delH: "Delete account",
    delBody: "” will be deleted from this device permanently. There is no copy on a server and no way to restore it. If it matters — export it to a file first.",
    saved: "Saved to this device", updated: "Account updated", failed: "Save failed",
    deleted: "Account deleted", pinned: "Pinned to top", unpinned: "Unpinned",
    dl: "File downloaded — you can send it to whoever you choose",
    badJson: "Not a valid JSON file", noneFound: "No accounts found in the file", impFail: "Import failed",
    imp1: " account imported", impN: " accounts imported",
    cardTag: "Personal account · Antishimon", cardFine: "Personal account — not an official finding",
    imgFail: "Image generation failed", imgDl: "Image downloaded — you can share it"
  }
};
function st(k) { return (ST_TXT[LANG] || ST_TXT.he)[k]; }

/* pend = { blob, dur } כשהטופס נפתח מיד אחרי הקלטה. מעבירים את ההקלטה
   כפרמטר ולא מחפשים אותה אחרי השמירה — חיפוש כזה תלוי בתזמון ונשבר.

   אין כאן עריכה של עדות קיימת. עדות שהוגשה שייכת לתור הבדיקה, ולא
   הגיוני לשנות אותה תחת ידיו של מי שכבר בודק אותה; לתיקון מבטלים
   ומגישים מחדש. */
function stForm(id, pend) {
  var s = null;
  var today = new Date().toISOString().slice(0, 10);
  openModal(
    '<h2 class="modal__h">' + st(s ? "editH" : "newH") + "</h2>" +
    '<p class="modal__p">' + st("lead") + "</p>" +
    (pend ? '<p class="modal__p">' + st("attached") + "<b>" + stDur(pend.dur) + "</b>.</p>" : "") +
    '<form id="stForm" class="form">' +
      '<label class="fld"><span class="fld__k">' + st("kTitle") + "</span>" +
        '<input name="title" required maxlength="90" placeholder="' + esc(st("phTitle")) + '" value="' +
        esc(s ? s.title : "") + '"></label>' +
      '<label class="fld"><span class="fld__k">' + st("kText") + "</span>" +
        '<textarea name="text" rows="7" maxlength="4000" placeholder="' + esc(st("phText")) + '">' +
        esc(s ? s.text : "") + "</textarea></label>" +
      '<div class="form__row">' +
        '<label class="fld"><span class="fld__k">' + st("kKind") + '</span><select name="kind">' +
          ST_KINDS.map(function (k) {
            return '<option value="' + k.key + '"' +
              (s && s.kind === k.key ? " selected" : "") + ">" +
              esc(tx("kind", k.key, k.label)) + "</option>";
          }).join("") + "</select></label>" +
        '<label class="fld"><span class="fld__k">' + st("kWhen") + "</span>" +
          '<input type="date" name="when" max="' + today + '" value="' +
          esc(s ? s.when : today) + '"></label>' +
      "</div>" +
      '<div class="form__row">' +
        '<label class="fld"><span class="fld__k">' + st("kCity") + '</span><input name="city" maxlength="60" value="' +
        esc(s ? s.city : "") + '"></label>' +
        '<label class="fld"><span class="fld__k">' + st("kCountry") + '</span><input name="country" maxlength="60" value="' +
        esc(s ? s.country : "") + '"></label>' +
      "</div>" +
      '<div class="acts">' +
        '<button class="btn" type="submit">' + st(s ? "update" : "save") + "</button>" +
        '<button class="tl" type="button" data-act="close-modal">' + st("cancel") + "</button>" +
      "</div>" +
    "</form>"
  );

  $("#stForm").addEventListener("submit", function (ev) {
    ev.preventDefault();
    var d = new FormData(ev.target);
    var payload = {
      title:   String(d.get("title") || "").trim(),
      body:    String(d.get("text") || "").trim(),
      kind:    String(d.get("kind") || "other"),
      when:    String(d.get("when") || ""),
      city:    String(d.get("city") || "").trim(),
      country: String(d.get("country") || "").trim(),
      dur:     pend ? pend.dur : 0
    };
    if (!payload.title) return;

    var btn = ev.target.querySelector("button[type=submit]");
    if (btn) { btn.disabled = true; btn.textContent = t("שולח…"); }

    /* ההקלטה עולה קודם ומקבלת מזהה מהשרת, ורק אז נשלח הסיפור.
       הסדר הזה מכוון: אם ההעלאה נכשלה, אין סיפור יתום בתור שמצביע
       על קובץ שלא קיים. */
    var first = (pend && pend.blob) ? API.uploadAudio(pend.blob) : Promise.resolve(null);

    first.then(function (aid) {
      if (aid) payload.audio = aid;
      return API.submit("story", payload);
    }).then(function () {
      openModal(
        '<h2 class="modal__h">' + t("העדות התקבלה") + "</h2>" +
        '<p class="modal__p">' + t("היא נשלחה לבדיקה ואינה מפורסמת עדיין. אחרי אישור היא תופיע כאן לצד שם התצוגה שלכם — כתובת המייל לעולם אינה מוצגת.") + "</p>" +
        '<div class="acts">' +
          '<button class="btn" data-act="account">' + t("ההגשות שלי") + "</button>" +
          '<button class="tl" data-act="close-modal">' + t("סגירה") + "</button>" +
        "</div>"
      );
      /* טוענים מחדש מהשרת ולא דוחפים את המטען לרשימה המקומית: רק
         השרת יודע איזה סטטוס ההגשה קיבלה אחרי סינון ה-AI. */
      stLoad().then(render);
    }).catch(function (e) {
      if (btn) { btn.disabled = false; btn.textContent = st(s ? "update" : "save"); }
      toast(String(e.message || e));
    });
  });
}

/* ── הקלטה ── */

var REC = null, REC_CHUNKS = [], REC_T0 = 0, REC_TICK = 0, REC_BLOB = null;

function stRecorder() {
  REC = null; REC_CHUNKS = []; REC_BLOB = null;
  openModal(
    '<h2 class="modal__h">' + st("recH") + "</h2>" +
    '<p class="modal__p">' + st("recLead") + "</p>" +
    '<div class="rec" id="rec" data-on="0">' +
      '<button class="rec__dot" id="recBtn" aria-label="הקלטה"><i></i></button>' +
      '<div class="rec__t" id="recT">0:00</div>' +
      '<p class="rec__s" id="recS">' + st("recStart") + "</p>" +
      '<audio id="recPlay" controls hidden style="inline-size:100%"></audio>' +
    "</div>" +
    '<div class="acts">' +
      '<button class="btn" id="recSave" disabled>' + st("recNext") + "</button>" +
      '<button class="tl" type="button" data-act="close-modal">' + st("cancel") + "</button>" +
    "</div>"
  );

  var btn = $("#recBtn"), box = $("#rec"), lab = $("#recT"), sub = $("#recS"),
      play = $("#recPlay"), save = $("#recSave");

  btn.addEventListener("click", function () {
    if (REC && REC.state === "recording") { REC.stop(); return; }
    if (!navigator.mediaDevices || !window.MediaRecorder) {
      sub.textContent = st("recNoSup");
      return;
    }
    navigator.mediaDevices.getUserMedia({ audio: true }).then(function (stream) {
      REC_CHUNKS = [];
      var mime = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4"].filter(function (m) {
        return MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(m);
      })[0];
      REC = new MediaRecorder(stream, mime ? { mimeType: mime } : undefined);
      REC.ondataavailable = function (e) { if (e.data && e.data.size) REC_CHUNKS.push(e.data); };
      REC.onstop = function () {
        clearInterval(REC_TICK);
        stream.getTracks().forEach(function (t) { t.stop(); });
        REC_BLOB = new Blob(REC_CHUNKS, { type: REC.mimeType || "audio/webm" });
        REC_BLOB.dur = Math.round((Date.now() - REC_T0) / 1000);
        box.dataset.on = "0";
        play.hidden = false;
        play.src = URL.createObjectURL(REC_BLOB);
        sub.textContent = st("recDone");
        save.disabled = false;
      };
      REC.start();
      REC_T0 = Date.now();
      box.dataset.on = "1";
      save.disabled = true;
      play.hidden = true;
      sub.textContent = st("recOn");
      REC_TICK = setInterval(function () {
        var sec = Math.round((Date.now() - REC_T0) / 1000);
        lab.textContent = stDur(sec);
        if (sec >= 600) REC.stop();   /* תקרת 10 דקות — מעבר לזה הקובץ כבד מדי לאחסון מקומי */
      }, 250);
    }).catch(function () {
      sub.textContent = st("recNoMic");
    });
  });

  save.addEventListener("click", function () {
    if (!REC_BLOB) return;
    stForm(null, { blob: REC_BLOB, dur: REC_BLOB.dur || 0 });
  });
}










/* כרטיס שיתוף לעדות — אותו קנבס 1080×1080 של הרשומות, בלי דרגת חומרה:
   עדות אישית אינה ממצא, והכרטיס לא יתחזה לאחד */
function stCard(id) {
  var s = stById(id);
  if (!s) return;
  var go = function () {
    var W = 1080, H = 1080, P = 96;
    var cv = document.createElement("canvas");
    cv.width = W; cv.height = H;
    var c = cv.getContext("2d");

    c.fillStyle = "#0F1522"; c.fillRect(0, 0, W, H);
    c.fillStyle = "#182236"; c.fillRect(P - 34, P - 34, W - 2 * (P - 34), H - 2 * (P - 34));
    c.strokeStyle = "#D8A93B"; c.lineWidth = 4;
    c.beginPath(); c.moveTo(W - P, P); c.lineTo(W - P, P + 120); c.stroke();

    c.direction = "rtl"; c.textAlign = "right";

    c.fillStyle = "#D8A93B"; c.font = "500 26px 'IBM Plex Mono', monospace";
    c.fillText(st("cardTag"), W - P - 26, P + 34);

    c.fillStyle = "#F1EBDD"; c.font = "400 58px 'Suez One', Georgia, serif";
    var y = P + 150;
    wrapLines(c, s.title || "", W - 2 * P, 3).forEach(function (ln) {
      c.fillText(ln, W - P, y); y += 70;
    });

    c.fillStyle = "#A6B1C7"; c.font = "300 34px Rubik, sans-serif";
    y += 30;
    wrapLines(c, s.text || "", W - 2 * P, 9).forEach(function (ln) {
      c.fillText(ln, W - P, y); y += 52;
    });

    c.strokeStyle = "#293752"; c.lineWidth = 1;
    c.beginPath(); c.moveTo(P, H - 148); c.lineTo(W - P, H - 148); c.stroke();

    c.fillStyle = "#F1EBDD"; c.font = "500 32px 'IBM Plex Mono', monospace";
    c.fillText([s.city, s.country].filter(Boolean).join(", ") || ST_KIND_BY[s.kind] || "",
               W - P, H - 92);
    c.fillStyle = "#6F7C94"; c.font = "300 27px Rubik, sans-serif";
    c.fillText(s.when ? fmtDate(s.when) : "", W - P, H - 50);

    c.textAlign = "left";
    c.fillStyle = "#6F7C94"; c.font = "300 27px Rubik, sans-serif";
    c.fillText(st("cardFine"), P, H - 92);

    cv.toBlob(function (blob) {
      if (!blob) { toast(st("imgFail")); return; }
      var file = new File([blob], "antishimon-story.png", { type: "image/png" });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        navigator.share({ files: [file], text: s.title }).catch(function () {});
        return;
      }
      var a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = file.name; a.click();
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 1500);
      toast(st("imgDl"));
    }, "image/png");
  };
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(go); else go();
}


/* ── חשבון: הרשמה, כניסה ומצב ─────────────────────────────────────────────
   ההרשמה חובה לכל פעולת כתיבה — הגשת רשומה או סיפור — ואופציונלית
   לקריאה. הבחירה הזו מכוונת: מרשם ראיות שדורש חשבון כדי *לקרוא* מאבד
   את מי שהוא נועד לשרת, ומרשם שמאפשר לכתוב בעילום שם מאבד את היכולת
   לעמוד מאחורי מה שפורסם בו.
   ───────────────────────────────────────────────────────────────────────── */

var API = window.ANTISHIMON_API || { ready: false, user: null, isStaff: function () { return false; } };

function authed() { return !!(API.ready && API.user); }

/* שער כניסה לפעולה שדורשת חשבון. אין כאן אכיפה — השרת דוחה בקשה בלי
   טוקן בכל מקרה — אלא מניעת מסך טופס שיסתיים בשגיאה. */
function needAuth(fn) {
  /* בלי שרת אין לאן להגיש. אומרים את זה בחלונית ולא בהודעה חולפת —
     מי שכתב עדות שלמה בראש מגיע לכאן בכוונה, וטוסט שנעלם אחרי שתי
     שניות נקרא כתקלה במקום כהסבר. */
  if (!API.ready) {
    openModal(
      '<h2 class="modal__h">' + t("הגשת עדות") + "</h2>" +
      '<p class="modal__p">' + t("ההגשות סגורות כרגע — שרת המרשם אינו זמין. נסו שוב מאוחר יותר.") + "</p>" +
      '<div class="acts"><button class="btn" data-act="close-modal">' + t("סגירה") + "</button></div>"
    );
    return;
  }
  if (!API.user) { authModal("up", "story"); return; }
  fn();
}

/* פינת החשבון בניווט. מוסתרת רק כשאין שרת בכלל — כפתור שנשבר בלחיצה
   גרוע מכפתור שלא קיים. */
function renderAccount() {
  var box = $("#acct");
  if (!box) return;

  if (!API.ready) { box.hidden = true; return; }
  box.hidden = false;

  if (!API.user) {
    box.innerHTML = '<button class="tl tl--cta" data-act="signup">' + t("הרשמה") + "</button>" +
      '<button class="tl" data-act="signin">' + t("כניסה") + "</button>";
    return;
  }

  box.innerHTML =
    (API.isStaff()
      ? '<button class="tl tl--staff" data-act="queue">' + t("תור ביקורת") +
        '<b id="qBadge" hidden></b></button>'
      : "") +
    '<button class="tl" data-act="account">' +
      '<span class="acct__av" aria-hidden="true">' +
        esc((API.user.name || "?").trim().charAt(0)) + "</span>" +
      esc(API.user.name) + "</button>";

  if (API.isStaff()) refreshQueueBadge();
}

function refreshQueueBadge() {
  API.queue().then(function (rows) {
    var b = $("#qBadge");
    if (!b) return;
    b.hidden = !rows.length;
    b.textContent = rows.length > 99 ? "99+" : rows.length;
  }).catch(function () {});
}

/* mode: "in" | "up".  next: מה לפתוח אחרי הצלחה */
function authModal(mode, next) {
  var isUp = mode === "up";

  openModal(
    '<h2 class="modal__h">' + t(isUp ? "פתיחת חשבון" : "כניסה לחשבון") + "</h2>" +
    '<p class="modal__p">' + t("חשבון נדרש כדי להגיש רשומה או לפרסם סיפור. הקריאה במרשם פתוחה לכולם — גם בלי חשבון.") + "</p>" +

    '<form id="authForm">' +
      (isUp
        ? '<label class="fld"><span class="fld__k">' + t("שם תצוגה") + " <i>*</i></span>" +
          '<input name="name" required minlength="2" maxlength="40" autocomplete="nickname" placeholder="' +
          esc(t("השם שיוצג לצד הגשה שאושרה")) + '"></label>'
        : "") +
      '<label class="fld"><span class="fld__k">' + t("אימייל") + " <i>*</i></span>" +
        '<input name="email" type="email" required autocomplete="email"></label>' +
      '<label class="fld"><span class="fld__k">' + t("סיסמה") + " <i>*</i></span>" +
        '<input name="pass" type="password" required minlength="8" autocomplete="' +
        (isUp ? "new-password" : "current-password") + '"></label>' +
      (isUp ? '<p class="fld__hint">' + t("לפחות 8 תווים.") + "</p>" : "") +
      '<p class="auth__err" id="authErr" hidden></p>' +
      '<div class="acts">' +
        '<button class="btn" type="submit">' + t(isUp ? "פתיחת חשבון" : "כניסה") + "</button>" +
        '<button class="tl" type="button" data-act="' + (isUp ? "signin" : "signup") + '">' +
          t(isUp ? "כבר יש לי חשבון" : "אין לי חשבון עדיין") + "</button>" +
      "</div>" +
    "</form>"
  );

  $("#authForm").addEventListener("submit", function (ev) {
    ev.preventDefault();
    var d = new FormData(ev.target);
    var btn = ev.target.querySelector("button[type=submit]");
    var err = $("#authErr");
    err.hidden = true;
    btn.disabled = true;
    btn.textContent = t("רגע…");

    var email = String(d.get("email") || "").trim();
    var pass  = String(d.get("pass") || "");
    var p = isUp ? API.register(email, pass, String(d.get("name") || "").trim())
                 : API.login(email, pass);

    p.then(function () {
      closeModal();
      renderAccount();
      /* אחרי כניסה יש עוד מה להראות: ההגשות שלי, שקודם לא היו נראות. */
      stLoad().then(render);
      render();
      toast(t(isUp ? "החשבון נפתח" : "ברוכים השבים") + ", " + API.user.name);
      if (next === "add") setTimeout(addModal, 250);
      if (next === "story") setTimeout(function () { stForm(); }, 250);
    }).catch(function (e) {
      err.textContent = String(e.message || e);
      err.hidden = false;
      btn.disabled = false;
      btn.textContent = t(isUp ? "פתיחת חשבון" : "כניסה");
    });
  });
}

function accountModal() {
  if (!authed()) { authModal("in"); return; }

  openModal(
    '<h2 class="modal__h">' + esc(API.user.name) + "</h2>" +
    '<p class="modal__p">' + esc(API.user.email) +
      (API.isStaff() ? ' · <b>' + t("צוות") + "</b>" : "") + "</p>" +
    '<h3 class="dos__h">' + t("ההגשות שלי") + "</h3>" +
    '<div id="myList" class="newsl"><p class="item__why">' + t("טוען…") + "</p></div>" +
    '<div class="acts">' +
      '<button class="tl" data-act="signout">' + t("יציאה מהחשבון") + "</button>" +
      '<button class="tl" data-act="close-modal">' + t("סגירה") + "</button>" +
    "</div>"
  );

  API.mine().then(function (rows) {
    var box = $("#myList");
    if (!box) return;
    if (!rows.length) {
      box.innerHTML = '<p class="item__why">' + t("עוד לא הגשתם דבר.") + "</p>";
      return;
    }
    box.innerHTML = rows.map(function (r) {
      var st = SUB_STATUS[r.status] || { t: r.status, c: "var(--txt-3)" };
      var p = r.payload || {};
      var title = p.name || p.title || t("בקשת תיקון");
      var canCancel = r.status !== "approved";
      return '<div class="rc" style="--sv:' + st.c + '">' +
        '<span class="rc__dot" aria-hidden="true"></span>' +
        '<span class="rc__mid"><span class="rc__name">' + esc(title) + "</span>" +
          '<span class="rc__meta">' + t(st.t) +
          (r.review_note ? " · " + esc(r.review_note) : "") + "</span></span>" +
        (canCancel ? '<button class="tl" data-act="my-cancel" data-id="' + esc(r.id) +
          '" style="font-size:.78rem">' + t("ביטול") + "</button>" : "") +
        "</div>";
    }).join("");
  }).catch(function () {
    var box = $("#myList");
    if (box) box.innerHTML = '<p class="item__why">' + t("לא הצלחנו לטעון.") + "</p>";
  });
}

var SUB_STATUS = {
  pending:    { t: "ממתין לבדיקה",              c: "var(--s1)" },
  ai_flagged: { t: "סומן לבדיקה ידנית",         c: "var(--s3)" },
  ai_passed:  { t: "עבר סינון — ממתין לאישור",  c: "var(--s2)" },
  approved:   { t: "אושר ופורסם",               c: "var(--ok)" },
  rejected:   { t: "נדחה",                      c: "var(--s4)" }
};

/* ── תור הביקורת — צוות בלבד ──────────────────────────────────────────────
   כאן, ורק כאן, נקבע מה מתפרסם. השרת חוסם את הפעולות האלה לכל מי שאינו
   צוות, ולכן ההסתרה כאן היא נוחות — אבל היא מונעת את התקלה ההפוכה:
   משתמש שרואה כפתור ״אישור״ ומסיק שהמרשם פתוח לעריכה חופשית.
   ───────────────────────────────────────────────────────────────────────── */

function queueModal() {
  if (!API.isStaff()) { toast(t("אין הרשאה")); return; }
  openModal(
    '<h2 class="modal__h">' + t("תור ביקורת") + "</h2>" +
    '<p class="modal__p">' + t("שום דבר כאן אינו מפורסם עדיין. בדיקת ה-AI היא סינון ראשוני בלבד — ההחלטה שלכם.") + "</p>" +
    '<div id="qBody"><p class="item__why">' + t("טוען…") + "</p></div>"
  );
  loadQueue();
}

function loadQueue() {
  var box = $("#qBody");
  if (!box) return;
  API.queue().then(function (rows) {
    if (!$("#qBody")) return;
    $("#qBody").innerHTML = rows.length
      ? rows.map(qCard).join("")
      : '<p class="item__why">' + t("התור ריק. אין מה לאשר.") + "</p>";
  }).catch(function (e) {
    if ($("#qBody")) $("#qBody").innerHTML = '<p class="item__why">' + esc(String(e.message || e)) + "</p>";
  });
}

function qCard(r) {
  var v = r.ai_verdict || {};
  var flags = v.flags || [];
  var p = r.payload || {};
  var isStory = r.kind === "story";
  var title = p.name || p.title || t("בקשת תיקון");
  var bodyTxt = p.summary || p.body || p.note || "";
  var src = (p.sources || [])[0];

  return '<article class="qc" data-id="' + esc(r.id) + '">' +
    '<div class="qc__top">' +
      '<span class="qc__st" data-s="' + esc(r.status) + '">' +
        t((SUB_STATUS[r.status] || {}).t || r.status) + "</span>" +
      '<span class="qc__date mono">' + esc(String(r.created_at).slice(0, 10)) + "</span>" +
    "</div>" +

    '<h4 class="qc__h">' + esc(title) + "</h4>" +
    '<p class="qc__who">' + t("הגיש") + ": " + esc(r.author_name || "?") +
      (r.author_email ? " · " + esc(r.author_email) : "") + "</p>" +
    (bodyTxt ? '<p class="qc__b">' + esc(bodyTxt) + "</p>" : "") +

    (src && src.url
      ? '<p class="qc__ai"><b>' + t("מקור") + ":</b> " +
        '<a href="' + esc(safeUrl(src.url)) + '" target="_blank" rel="noopener noreferrer nofollow">' +
        esc(src.publisher || src.url) + " ↗</a></p>"
      : (isStory ? "" : '<p class="qc__ai" style="color:var(--s4)">' + t("אין מקור") + "</p>")) +

    /* פרטי העדות: איפה ומתי. בלעדיהם אי אפשר להעריך אם היא מתאימה
       למרשם, וההגשה נראית כמו טקסט חופשי מנותק. */
    (isStory && (p.city || p.country || p.when || p.kind)
      ? '<p class="qc__ai"><b>' + t("פרטים") + ':</b> ' +
        esc([
          p.kind ? (ST_KIND_BY[p.kind] || p.kind) : "",
          [p.city, p.country].filter(Boolean).join(", "),
          p.when
        ].filter(Boolean).join(" · ")) + "</p>"
      : "") +

    /* ההקלטה נשמעת כאן. בלי זה בודק שמקבל עדות קולית מאשר טקסט
       שהוא לא שמע — כלומר לא בודק כלום. */
    (isStory && p.audio
      ? '<audio class="qc__audio" controls preload="none" src="' +
        esc(API.audioUrl(p.audio, true)) + '"></audio>' +
        (p.transcript
          ? '<details class="qc__tr"><summary>' + t("תמלול") + "</summary><p>" +
            esc(p.transcript) + "</p></details>"
          : '<p class="qc__ai">' + t("אין תמלול — יש להאזין") + "</p>")
      : "") +

    (p.severity_suggest
      ? '<p class="qc__ai"><b>' + t("דרגה שהוצעה") + ":</b> " + esc(String(p.severity_suggest)) + "</p>"
      : "") +

    (flags.length
      ? '<div class="qc__flags">' + flags.map(function (f) {
          return '<span class="qc__flag">' + esc(t(AI_FLAG[f] || f)) + "</span>";
        }).join("") + "</div>"
      : '<div class="qc__flags"><span class="qc__flag qc__flag--ok">' +
        t("לא נמצאו דגלים") + "</span></div>") +

    (v.notes ? '<p class="qc__ai"><b>AI:</b> ' + esc(v.notes) + "</p>" : "") +

    '<div class="qc__acts">' +
      '<input class="qc__note" placeholder="' + esc(t("נימוק — יוצג למגיש בדחייה")) + '">' +
      '<button class="btn" data-act="q-yes" data-id="' + esc(r.id) + '">' + t("אישור ופרסום") + "</button>" +
      '<button class="tl" data-danger="1" data-act="q-no" data-id="' + esc(r.id) + '">' + t("דחייה") + "</button>" +
    "</div>" +
  "</article>";
}

var AI_FLAG = {
  no_source:      "אין מקור שאפשר לפתוח",
  conflates:      "מערבב ביקורת מדינית עם אנטישמיות",
  personal_data:  "פרטים מזהים של אדם פרטי",
  hate:           "התוכן עצמו מכיל הסתה",
  unverifiable:   "לא ניתן לאימות",
  duplicate_risk: "ייתכן שכבר במרשם",
  off_topic:      "לא בנושא",
  ai_unavailable: "בדיקת ה-AI לא רצה",
  ai_unparsable:  "תשובת AI לא תקינה"
};

/* ── חלוניות ──────────────────────────────────────────────────────────── */

function openModal(html) {
  $("#modalBox").innerHTML = html;
  $("#modal").hidden = false;
  document.body.classList.add("is-locked");
  var f = $("#modalBox input, #modalBox select, #modalBox textarea, #modalBox button");
  if (f) f.focus();
}
function closeModal() {
  $("#modal").hidden = true;
  if ($("#dossier").hidden) document.body.classList.remove("is-locked");
  $("#modalBox").innerHTML = "";
}

/* ── תנאי שימוש, אחריות ופרטיות ──────────────────────────────────────────
   לא טקסט משפטי גנרי: הוא מנוסח סביב מה שהאפליקציה באמת עושה —
   מרשם מתועד בלי שרת, בלי עוגיות ובלי איסוף נתונים. שני נוסחים
   מלאים, עברית ואנגלית, נבחרים לפי שפת הממשק. */
function termsModal() {
  var he =
    '<h2 class="modal__h">תנאי שימוש, אחריות ופרטיות</h2>' +

    '<h3 class="dos__h">מה זה המרשם</h3>' +
    '<p class="modal__p">אנטישימון הוא מאגר מידע ציבורי המתעד עמדות שגורמים הכריזו עליהן בעצמם וממצאים של רשויות רשמיות, בצירוף מקורות פתוחים לבדיקה. המרשם מציג דיווחים ותיעוד — <b>לא קביעות משפטיות ולא פסקי דין</b>, אלא כשמצוין במפורש שמדובר בהכרעה שיפוטית. סטטוס האימות של כל רשומה (מאומת, בבדיקה, שנוי במחלוקת, בוטל) מוצג בה בגלוי.</p>' +

    '<h3 class="dos__h">אחריות</h3>' +
    '<p class="modal__p">המידע מסופק כפי שהוא (as is). אנו משתדלים לדייק ולתקן, אך איננו ערבים לשלמות או לעדכניות של כל רשומה. <b>לפני כל הסתמכות — פתחו את המקורות המצורפים לרשומה ושפטו בעצמכם.</b> החלטות צרכניות, עסקיות או אחרות שתקבלו על סמך המרשם הן באחריותכם. גורם הסבור שרשומה שגויה מוזמן ללחוץ ״בקשת תיקון״ בתוך הרשומה — טעות שתוכח תתוקן או תסומן ״בוטל / תוקן״ בגלוי.</p>' +

    '<h3 class="dos__h">פרטיות — מה נשמר ומתי</h3>' +
    '<p class="modal__p"><b>גלישה וקריאה: אנונימיות לחלוטין.</b> אין עוגיות, אין אנליטיקה, אין פרסום ואין מעקב. החיפושים שלכם אינם נשלחים לשום מקום, ורשימת המעקב וההעדפות נשמרות במכשירכם בלבד. הגופנים והקוד מוגשים מהשרת שלנו — לא מגוגל.</p>' +
    '<p class="modal__p"><b>חשבון: רק אם בחרתם לפתוח אחד.</b> חשבון נדרש כדי להגיש רשומה או לפרסם סיפור, ולא כדי לקרוא. אז נשמרים אצלנו כתובת המייל ושם התצוגה, וכן מה שהגשתם. אנחנו שומרים את הנתונים אצל Supabase בשרתים באיחוד האירופי.</p>' +
    '<p class="modal__p"><b>מה מוצג לאחרים.</b> לצד סיפור שאושר מוצג שם התצוגה שבחרתם — <b>כתובת המייל לעולם אינה מוצגת</b>. אתם רשאים לבחור שם שאינו שמכם המלא. הקלטות אינן ציבוריות: הן מושמעות דרך קישור חתום קצר-מועד.</p>' +
    '<p class="modal__p"><b>זכויותיכם.</b> אתם רשאים לבקש בכל עת עיון בנתונים שלכם, תיקונם או מחיקת החשבון וכל תוכנו. מחיקת חשבון מוחקת גם את ההגשות והסיפורים.</p>' +

    '<h3 class="dos__h">תוכן שאתם מגישים</h3>' +
    '<p class="modal__p"><b>שום דבר אינו מתפרסם אוטומטית.</b> כל הגשה — רשומה או סיפור — עוברת סינון אוטומטי ואז <b>בדיקה אנושית שלנו</b>, ומתפרסמת רק אחרי אישור. הסינון האוטומטי מסייע במיון ואינו מאשר דבר בעצמו. הקלטות מתומללות אוטומטית כדי שנוכל לבדוק אותן.</p>' +
    '<p class="modal__p">אתם אחראים לאמיתות מה שתגישו. אל תכתבו שמות מלאים, כתובות או פרטים מזהים של אנשים פרטיים שלא הורשעו. בהגשה אתם מעניקים לנו רישיון להציג את התוכן במרשם; הבעלות נשארת שלכם, ותוכלו לבקש הסרה.</p>' +

    '<h3 class="dos__h">קניין רוחני ושיפוט</h3>' +
    '<p class="modal__p">ציטוטים קצרים מובאים עם ייחוס ולצורך תיעוד ודיווח. סימני מסחר שייכים לבעליהם; אזכור גורם במרשם אינו טענה לזיקה אליו. על השימוש באפליקציה חל הדין הישראלי.</p>';

  var en =
    '<h2 class="modal__h">Terms, Liability & Privacy</h2>' +

    '<h3 class="dos__h">What this registry is</h3>' +
    '<p class="modal__p">Antishimon is a public-interest registry documenting positions that entities declared themselves and findings by official authorities, with open sources attached for verification. It presents reports and documentation — <b>not legal determinations and not court rulings</b>, except where a judicial decision is explicitly cited. Each record openly displays its verification status (verified, under review, disputed, retracted).</p>' +

    '<h3 class="dos__h">Liability</h3>' +
    '<p class="modal__p">The information is provided as is. We strive for accuracy and correction, but do not warrant the completeness or currency of any record. <b>Before relying on anything — open the sources attached to the record and judge for yourself.</b> Consumer, business or other decisions you make based on the registry are your responsibility. Anyone who believes a record is wrong is invited to use the “Request a correction” button inside it — a proven error will be fixed or openly marked “retracted / corrected”.</p>' +

    '<h3 class="dos__h">Privacy — what is stored, and when</h3>' +
    '<p class="modal__p"><b>Browsing and reading: completely anonymous.</b> No cookies, no analytics, no advertising, no tracking. Your searches are sent nowhere, and your watchlist and preferences stay on your device. Fonts and code are served from our own site — not from Google.</p>' +
    '<p class="modal__p"><b>An account: only if you choose to open one.</b> An account is required to submit a record or publish an account of an incident — not to read. If you do, we store your email address, your display name, and whatever you submitted. Data is held with Supabase on servers in the European Union.</p>' +
    '<p class="modal__p"><b>What others see.</b> An approved story shows the display name you chose — <b>your email address is never shown</b>. You may choose a name that is not your full name. Recordings are not public: they play through a short-lived signed link.</p>' +
    '<p class="modal__p"><b>Your rights.</b> You may at any time request access to your data, its correction, or deletion of your account and everything in it. Deleting an account also deletes its submissions and stories.</p>' +

    '<h3 class="dos__h">Content you submit</h3>' +
    '<p class="modal__p"><b>Nothing is published automatically.</b> Every submission — a record or a story — passes an automated screen and then <b>human review by us</b>, and is published only after approval. The automated screen helps with triage and approves nothing on its own. Recordings are transcribed automatically so that we can review them.</p>' +
    '<p class="modal__p">You are responsible for the truth of what you submit. Do not include full names, addresses or identifying details of private individuals who have not been convicted. By submitting you grant us a licence to display the content in the registry; ownership remains yours, and you may request removal.</p>' +

    '<h3 class="dos__h">Intellectual property & jurisdiction</h3>' +
    '<p class="modal__p">Short quotations appear with attribution for documentation and reporting. Trademarks belong to their owners; a listing implies no affiliation. Use of the app is governed by Israeli law.</p>';

  openModal(
    (LANG === "en" ? en : he) +
    '<div class="acts"><button class="btn" data-act="close-modal">' +
      t("הבנתי") + "</button></div>"
  );
}

/* ── דיסקליימר כניסה ──────────────────────────────────────────────────────
   נפתח פעם אחת למכשיר ודורש אישור מפורש. המטרה כפולה: משפטית — הגולש
   מאשר שהבין שמדובר בתיעוד ולא בפסק דין; ומהותית — מי שנכנס למרשם
   שנוקב בשמות של אנשים אמיתיים צריך לדעת מה הכללים לפני שהוא קורא.

   האישור נשמר מקומית עם מספר גרסה: שינוי מהותי בכללים מעלה את המספר
   וההודעה תוצג שוב, במקום לחתום את המשתמש על נוסח שלא ראה.
   ───────────────────────────────────────────────────────────────────────── */
var DISCLAIMER_V = 1;

function disclaimerSeen() {
  return +lsGet("antishimon:disclaimer", 0) >= DISCLAIMER_V;
}

function disclaimerModal() {
  var he =
    '<span class="dsc__tag">לפני שנתחיל</span>' +
    '<h2 class="modal__h">זהו מרשם ראיות — לא פסק דין</h2>' +
    '<ul class="dsc__list">' +
      "<li><b>מה נכנס לכאן.</b> רק עמדה שגורם הכריז עליה בעצמו — הצבעה, החלטת דירקטוריון, הודעה רשמית — או ממצא של רשות מוסמכת. לא שמועות ולא צילומי מסך בלי הקשר.</li>" +
      "<li><b>בדקו בעצמכם.</b> לכל רשומה מקורות שאפשר לפתוח. אל תסתמכו על התקציר — פתחו את המקור.</li>" +
      "<li><b>ביקורת על ישראל אינה אנטישמיות.</b> סולם החומרה מפריד ביניהן במפורש, ודרגה 2 אינה דרגה 4.</li>" +
      "<li><b>אחריות אישית.</b> מה שתעשו עם המידע — צרכני, עסקי או אחר — הוא באחריותכם בלבד.</li>" +
      "<li><b>טעינו?</b> בכל רשומה יש ״בקשת תיקון״. טעות שתוכח תתוקן או תסומן בגלוי.</li>" +
    "</ul>" +
    '<p class="dsc__fine">הקריאה במרשם אנונימית — בלי עוגיות ובלי מעקב. חשבון נדרש רק כדי להגיש רשומה או לפרסם סיפור. הפרטים המלאים ב״תנאים ופרטיות״.</p>';

  var en =
    '<span class="dsc__tag">Before we begin</span>' +
    '<h2 class="modal__h">This is an evidence registry — not a verdict</h2>' +
    '<ul class="dsc__list">' +
      "<li><b>What gets in.</b> Only a position an entity declared itself — a vote, a board decision, an official statement — or a finding by a competent authority. No rumours, no screenshots without context.</li>" +
      "<li><b>Check for yourself.</b> Every record carries sources you can open. Don't rely on the summary — open the source.</li>" +
      "<li><b>Criticism of Israel is not antisemitism.</b> The severity scale separates them explicitly, and level 2 is not level 4.</li>" +
      "<li><b>Your responsibility.</b> What you do with the information — as a consumer, a business or otherwise — is yours alone.</li>" +
      "<li><b>Did we get it wrong?</b> Every record has “Request a correction”. A proven error is fixed or openly marked.</li>" +
    "</ul>" +
    '<p class="dsc__fine">Reading the registry is anonymous — no cookies, no tracking. An account is needed only to submit a record or publish a story. Full details under “Terms &amp; privacy”.</p>';

  openModal(
    '<div class="dsc">' + (LANG === "en" ? en : he) +
    '<div class="acts">' +
      '<button class="btn" data-act="disclaimer-ok">' + t("הבנתי, הכניסו אותי") + "</button>" +
      '<button class="tl" data-act="terms">' + t("תנאים ופרטיות") + "</button>" +
    "</div></div>"
  );
  /* אין סגירה בלחיצה בחוץ ואין Escape — האישור חייב להיות פעולה */
  $("#modal").dataset.locked = "1";
}

/* ══════════════════════════════════════════════════════════════════════════
   שכבת התנועה
   -------------------------------------------------------------------------
   שלושה דברים, וכולם נשענים על נתונים אמיתיים ולא על אפקט:

   1. רקע הפתיח הוא מפת העולם של המרשם — אותם קווי חוף שמציירים את
      המפה בלשונית המקומות, ונקודה בכל מדינה שיש בה רשומה. הוא נע
      לאט מאוד, כמו מפה על שולחן.
   2. המספרים נספרים כלפי מעלה. מספר שקופץ מוגמר לא נקרא; מספר
      שנספר מכריח את העין לעצור עליו.
   3. תוכן נחשף בגלילה במקום להופיע בבת אחת.

   הכול מכובה כשהמשתמש ביקש פחות תנועה — לא מוחלש, מכובה.
   ══════════════════════════════════════════════════════════════════════════ */

var LESS_MOTION = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ── רקע הפתיח ── */
function heroCanvas() {
  var host = $("#heroBg");
  if (!host || host.dataset.done) return;

  var W = 1000, H = 500;
  var x = function (lon) { return (lon + 180) / 360 * W; };
  var y = function (lat) { return (84 - lat) / 140 * H; };

  var land = (window.ANTISHIMON_WORLD || []).map(function (ring) {
    return '<path d="M' + ring.map(function (p) {
      return x(p[0]).toFixed(1) + " " + y(p[1]).toFixed(1);
    }).join("L") + 'Z"/>';
  }).join("");

  /* נקודה לכל מדינה שיש בה רשומה, בגודל לפי הכמות ובצבע הדרגה החמורה */
  var by = {};
  DB.forEach(function (e) {
    var c = e.location && e.location.country;
    if (!c || !GEO[c]) return;
    if (!by[c]) by[c] = { n: 0, sev: 1 };
    by[c].n++;
    if (e.severity > by[c].sev) by[c].sev = e.severity;
  });
  var keys = Object.keys(by);
  var max = keys.reduce(function (m, k) { return Math.max(m, by[k].n); }, 1);

  var dots = keys.map(function (k, i) {
    var g = GEO[k], d = by[k];
    var r = 2.2 + Math.sqrt(d.n / max) * 7;
    return '<circle class="hb__d" cx="' + x(g[1]).toFixed(1) + '" cy="' + y(g[0]).toFixed(1) +
      '" r="' + r.toFixed(1) + '" style="--sv:' + SV[d.sev] +
      ";animation-delay:" + (i * 0.09).toFixed(2) + 's"/>';
  }).join("");

  host.innerHTML =
    '<svg viewBox="0 0 ' + W + " " + H + '" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' +
      '<g class="hb__land">' + land + "</g>" +
      '<g class="hb__dots">' + dots + "</g>" +
    "</svg>";
  host.dataset.done = "1";

  /* פרלקסה עדינה. אין כאן listener על scroll: rAF יחיד שקורא את
     המיקום רק כשהדפדפן מוכן לצייר, אחרת הגלילה נתקעת במובייל. */
  if (LESS_MOTION) return;
  var raf = 0;
  addEventListener("scroll", function () {
    if (raf) return;
    raf = requestAnimationFrame(function () {
      raf = 0;
      var yy = Math.min(scrollY, 600);
      host.style.transform = "translate3d(0," + (yy * 0.16).toFixed(1) + "px,0)";
      host.style.opacity = String(Math.max(0, 1 - yy / 700));
    });
  }, { passive: true });
}

/* ── ספירת מספרים ── */
function countUp(el, to) {
  if (LESS_MOTION || to < 2) { el.textContent = to.toLocaleString("en-US"); return; }
  var t0 = 0, dur = 1100;
  function step(ts) {
    if (!t0) t0 = ts;
    var p = Math.min(1, (ts - t0) / dur);
    /* easeOutExpo — מהיר בהתחלה ונעצר רך, כך שהמספר הסופי מתייצב */
    var e = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
    el.textContent = Math.round(to * e).toLocaleString("en-US");
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

/* ── חשיפה בגלילה ── */
var REVEAL = null;
function reveal(root) {
  if (LESS_MOTION) return;
  if (!("IntersectionObserver" in window)) return;
  if (!REVEAL) {
    REVEAL = new IntersectionObserver(function (rows) {
      rows.forEach(function (r) {
        if (!r.isIntersecting) return;
        r.target.classList.add("is-in");
        REVEAL.unobserve(r.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.06 });
  }
  var els = (root || document).querySelectorAll(".rv:not(.is-in)");
  Array.prototype.forEach.call(els, function (el, i) {
    el.style.setProperty("--rd", (Math.min(i, 8) * 45) + "ms");
    REVEAL.observe(el);
  });
}

/* ── כיווץ ההדר בגלילה ── */
function navShrink() {
  var nav = $(".nav");
  if (!nav) return;
  var on = false, raf = 0;
  addEventListener("scroll", function () {
    if (raf) return;
    raf = requestAnimationFrame(function () {
      raf = 0;
      var want = scrollY > 120;
      if (want !== on) { on = want; nav.classList.toggle("is-small", want); }
    });
  }, { passive: true });
}

/* ── שורת השירות והטיקר ───────────────────────────────────────────────────
   שתיהן נבנות פעם אחת מהמאגר. הטיקר מציג את מה שתועד לאחרונה — במרשם
   שמתעדכן כל יום זו ההצהרה שהוא חי, ולא רשימה שהועלתה פעם וננטשה.

   הרשימה משוכפלת פעמיים במכוון: אנימציית ה-CSS מזיזה 50% מהרוחב,
   וכך הקצה השני כבר במקומו כשהמחזור מתחיל מחדש ואין קפיצה.
   ───────────────────────────────────────────────────────────────────────── */

function headerBar() {
  var el = $("#utilStats");
  if (el) {
    var urls = {};
    DB.forEach(function (e) { e.sources.forEach(function (s) { if (s.url) urls[s.url] = 1; }); });
    var co = {};
    DB.forEach(function (e) { if (e.location.country) co[e.location.country] = 1; });
    el.innerHTML =
      "<b>" + DB.length.toLocaleString("en-US") + "</b> " + esc(t("רשומות")) + " · " +
      "<b>" + Object.keys(urls).length.toLocaleString("en-US") + "</b> " + esc(t("מקורות")) + " · " +
      "<b>" + Object.keys(co).length + "</b> " + esc(t("מדינות"));
  }

  var run = $("#tickRun"), box = $("#tick");
  if (!run || !box) return;

  var recent = DB.slice().sort(SORT.recent).slice(0, 14);
  if (!recent.length) return;

  var one = recent.map(function (e) {
    return '<button class="tick__i" data-id="' + esc(e.id) + '" style="--sv:' + SV[e.severity] + '">' +
      "<i></i>" + esc(dispName(e)) +
      "<span>" + esc(fmtDate(e.updated)) + "</span></button>";
  }).join("");

  run.innerHTML = one + one;
}

/* מונה חי בפוטר — לא קישוט: הוא מצהיר על היקף המרשם במקום שבו
   הגולש מחפש "מי עומד מאחורי זה". */
function footStats() {
  var el = $("#footStat");
  if (!el) return;
  var urls = {};
  DB.forEach(function (e) { e.sources.forEach(function (s) { if (s.url) urls[s.url] = 1; }); });
  el.textContent = DB.length.toLocaleString("en-US") + " " + t("רשומות") + " · " +
    Object.keys(urls).length.toLocaleString("en-US") + " " + t("מקורות ייחודיים");
  var y = $("#footYear");
  if (y) y.textContent = new Date().getFullYear();
}

/* ── מקורות הניטור ────────────────────────────────────────────────────────
   שקיפות אינה סיסמה: מי שמסתמך על מספר צריך לדעת מי ספר אותו ובאיזו
   שיטה, ולהגיע לדוח המקורי בלחיצה. */
function sourcesModal() {
  var mons = (PLACES.monitors || {});
  var keys = Object.keys(mons);
  var feeds = [
    { n: "Times of Israel — Antisemitism", u: "https://www.timesofisrael.com/topic/antisemitism/" },
    { n: "The Jerusalem Post — Antisemitism", u: "https://www.jpost.com/diaspora/antisemitism" },
    { n: "ADL — News & findings", u: "https://www.adl.org/resources/news" },
    { n: "Combat Antisemitism Movement", u: "https://combatantisemitism.org/cam-news/" },
    { n: "JNS", u: "https://www.jns.org" },
    { n: "Algemeiner", u: "https://www.algemeiner.com" },
    { n: "US DOJ — Press releases", u: "https://www.justice.gov/news" },
    { n: "HHS — Office for Civil Rights", u: "https://www.hhs.gov/press-room" },
    { n: "CPS (UK) — Prosecutions", u: "https://www.cps.gov.uk" },
    { n: "BDS Movement — own announcements", u: "https://bdsmovement.net/news" },
    { n: "Creative Community For Peace", u: "https://creativecommunityforpeace.com/blog" }
  ];

  openModal(
    '<h2 class="modal__h">' + t("מקורות הניטור") + "</h2>" +
    '<p class="modal__p">' + t("המרשם אינו סופר בעצמו. מספרי האירועים מגיעים מגופי ניטור שמפרסמים מתודולוגיה ודוח שנתי, והתיעוד השוטף נסרק ממקורות קבועים. כל מספר כאן ניתן לאימות במקור.") + "</p>" +

    '<h3 class="dos__h">' + t("גופי ניטור — מספרי האירועים") + ' <span class="mono">' + keys.length + "</span></h3>" +
    '<div class="plain">' + keys.map(function (k) {
      var m = mons[k];
      return "<div><b>" + esc(m.name) + "</b><span>" + esc(m.full) + " · " + esc(coName(m.country)) +
        ' — <a href="' + esc(safeUrl(m.url)) + '" target="_blank" rel="noopener noreferrer nofollow">' +
        t("הדוח") + " ↗</a></span></div>";
    }).join("") + "</div>" +

    '<h3 class="dos__h" style="margin-block-start:1.6rem">' + t("מקורות סריקה שוטפים") +
      ' <span class="mono">' + feeds.length + "</span></h3>" +
    '<div class="plain">' + feeds.map(function (s) {
      return '<div><b>—</b><span><a href="' + esc(s.u) + '" target="_blank" rel="noopener noreferrer nofollow">' +
        esc(s.n) + " ↗</a></span></div>";
    }).join("") + "</div>" +

    '<p class="note note--soft" style="margin-block-start:1.4rem">' +
      t("שימו לב: לכל גוף מנטר הגדרה משלו ל״אירוע״, ולכן השוואה ישירה בין מדינות מחייבת זהירות. הפירוט בכל רשומת מקום.") + "</p>" +

    '<div class="acts"><button class="btn" data-act="close-modal">' + t("סגירה") + "</button></div>"
  );
}

function aboutModal() {
  openModal(
    '<h2 class="modal__h">כללי המרשם</h2>' +
    '<p class="modal__p">נכנסים לכאן שני סוגי רשומות בלבד: <b>עמדה שהגורם הכריז עליה בעצמו</b> — הצבעה, החלטת ועידה, הודעת דירקטוריון — או <b>ממצא רשמי</b>: פסק דין, קנס, הודעת הפרה. לא נכנסות שמועות, צילומי מסך בלי הקשר, או האשמה בלי קישור שאפשר לפתוח.</p>' +

    '<h3 class="dos__h">דרגת החומרה · מה נטען</h3>' +
    '<p class="modal__p">הטעות הנפוצה במאגרים כאלה היא לערבב ביקורת על מדיניות ישראל עם שנאת יהודים. הערבוב הזה הופך את המאגר לחסר ערך גם למי שמסכים איתו. כאן הם מופרדים — והצבע עובר מקר לחם בדיוק בסף, בין דרגה 2 לדרגה 3.</p>' +
    '<div class="scale">' + SEVS.slice().reverse().map(function (s) {
      return '<div class="scale__row" style="--sv:' + SV[s.level] + '">' +
        bars(s.level, "scale__bars") +
        '<span class="scale__n">0' + s.level + "</span>" +
        '<span class="scale__t"><b>' + esc(s.label) + "</b><span>" + esc(s.desc) + "</span></span></div>";
    }).join("") + "</div>" +

    '<h3 class="dos__h" style="margin-block-start:1.8rem">סטטוס האימות · כמה זה מבוסס</h3>' +
    '<div class="plain">' + STATS.map(function (s) {
      return "<div><b>" + esc(s.label) + "</b><span>" + esc(s.desc) + "</span></div>";
    }).join("") + "</div>" +

    '<div class="acts"><button class="btn" data-act="close-modal">הבנתי</button></div>'
  );
}

function addModal() {
  /* הגשה מחייבת חשבון: מרשם שנוקב בשמות של גופים ואנשים אמיתיים חייב
     לדעת מי הגיש מה. בלי שרת אין הגשה בכלל — ואומרים זאת, במקום להציג
     טופס שלא ייסגר לשום מקום. */
  if (!API.ready) {
    openModal(
      '<h2 class="modal__h">' + t("הוספת רשומה") + "</h2>" +
      '<p class="modal__p">' + t("ההגשות סגורות כרגע — שרת המרשם אינו זמין. נסו שוב מאוחר יותר.") + "</p>" +
      '<div class="acts"><button class="btn" data-act="close-modal">' + t("סגירה") + "</button></div>"
    );
    return;
  }
  if (!authed()) { authModal("up", "add"); return; }

  openModal(
    '<h2 class="modal__h">הוספת רשומה</h2>' +
    '<p class="modal__p">רשומה בלי מקור לא נשמרת. נדרש קישור אחד לפחות שאפשר לפתוח ולבדוק. ' +
    '<b>ההגשה נכנסת לבדיקה ואינה מתפרסמת מיד.</b></p>' +
    '<form id="addForm">' +
      '<label class="fld"><span class="fld__k">שם <i>*</i></span><input name="name" required maxlength="120" placeholder="גוף, חברה, אדם או מקום"></label>' +
      '<div class="row2">' +
        '<label class="fld"><span class="fld__k">קטגוריה</span><select name="type">' +
          CATS.map(function (c) { return '<option value="' + c.key + '">' + esc(c.label) + "</option>"; }).join("") +
        "</select></label>" +
        '<label class="fld"><span class="fld__k">שמות נוספים</span><input name="aliases" placeholder="מופרדים בפסיק"></label>' +
      "</div>" +
      '<div class="row2">' +
        '<label class="fld"><span class="fld__k">מדינה</span><input name="country" list="cList"></label>' +
        '<label class="fld"><span class="fld__k">עיר</span><input name="city"></label>' +
      "</div>" +
      '<div class="row2">' +
        '<label class="fld"><span class="fld__k">אזור</span><select name="region">' +
          REGIONS.map(function (r) { return '<option value="' + r.key + '">' + esc(r.label) + "</option>"; }).join("") +
        "</select></label>" +
        '<label class="fld"><span class="fld__k">היקף</span><select name="scope"><option value="local">מקומי</option><option value="global">גלובלי</option></select></label>' +
      "</div>" +
      /* סטטוס האימות הוסר מהטופס במכוון. מי שמגיש רשומה אינו מי שקובע
         אם היא מאומתת — אחרת המילה ״מאומת״ במרשם לא שווה כלום. הדרגה
         נשארת, אבל כהצעה: הכיתוב אומר זאת במפורש. */
      '<label class="fld"><span class="fld__k">דרגת חומרה — הצעה שלכם</span><select name="severity">' +
        SEVS.slice().reverse().map(function (s) {
          return '<option value="' + s.level + '"' + (s.level === 2 ? " selected" : "") + ">0" + s.level + " · " + esc(s.label) + "</option>";
        }).join("") +
      "</select></label>" +
      '<label class="fld"><span class="fld__k">תמצית <i>*</i></span><textarea name="summary" required maxlength="700" placeholder="מה קרה, מתי, ומי אמר. עובדות בלבד — בלי פרשנות."></textarea></label>' +
      '<label class="fld"><span class="fld__k">תגיות</span><input name="tags" placeholder="מופרדות בפסיק"></label>' +

      '<div class="srcbox">' +
        '<div class="srcbox__h">מקור ראשון · חובה</div>' +
        '<div class="row2">' +
          '<label class="fld"><span class="fld__k">תאריך <i>*</i></span><input type="date" name="s_date" required></label>' +
          '<label class="fld"><span class="fld__k">גורם מפרסם</span><input name="s_pub"></label>' +
        "</div>" +
        '<label class="fld"><span class="fld__k">כותרת</span><input name="s_title"></label>' +
        '<label class="fld"><span class="fld__k">קישור <i>*</i></span><input type="url" name="s_url" required placeholder="https://…"><span class="fld__hint">רצוי גם קישור לארכיון, כדי שהמקור לא ייעלם.</span></label>' +
        '<label class="fld"><span class="fld__k">ציטוט ישיר</span><textarea name="s_quote" maxlength="400" placeholder="המילים המדויקות, בשפת המקור."></textarea></label>' +
      "</div>" +

      '<datalist id="cList">' + countryOpts() + "</datalist>" +
      '<p class="fld__hint">הרשומה נשמרת בדפדפן שלכם בלבד. לשיתוף — ייצאו JSON מתפריט ״מאגר״.</p>' +
      '<div class="acts">' +
        '<button type="submit" class="btn">שמירה</button>' +
        '<button type="button" class="tl" data-act="close-modal">ביטול</button>' +
      "</div>" +
    "</form>"
  );

  $("#addForm").addEventListener("submit", function (ev) {
    ev.preventDefault();
    var f = new FormData(ev.target);
    var g = function (k) { return String(f.get(k) || "").trim(); };
    var li = function (k) { return g(k).split(",").map(function (s) { return s.trim(); }).filter(Boolean); };

    if (!safeUrl(g("s_url"))) { toast("הקישור חייב להתחיל ב־http:// או https://"); return; }

    /* אין כאן status ואין user:true. ההגשה יוצאת כהצעה — לא כרשומה.
       השרת ממילא מוחק כל שדה הכרעה שיישלח, אבל גם הלקוח לא שולח. */
    var payload = {
      name: g("name"), aliases: li("aliases"), type: g("type"),
      location: { country: g("country"), region: g("region"), city: g("city") },
      scope: g("scope"), severity_suggest: parseInt(g("severity"), 10),
      summary: g("summary"), tags: li("tags"),
      sources: [{ date: g("s_date"), publisher: g("s_pub"),
                  title: g("s_title") || g("s_pub") || "מקור", url: g("s_url"), quote: g("s_quote") }]
    };

    var btn = ev.target.querySelector("button[type=submit]");
    if (btn) { btn.disabled = true; btn.textContent = t("שולח…"); }

    API.submit("record", payload).then(function () {
      openModal(
        '<h2 class="modal__h">' + t("ההגשה התקבלה") + "</h2>" +
        '<p class="modal__p">' + t("הרשומה נשלחה לבדיקה ואינה מופיעה במרשם עדיין. נעבור עליה ונחליט — תוכלו לעקוב אחרי הסטטוס בחשבון שלכם.") + "</p>" +
        '<div class="acts">' +
          '<button class="btn" data-act="account">' + t("ההגשות שלי") + "</button>" +
          '<button class="tl" data-act="close-modal">' + t("סגירה") + "</button>" +
        "</div>"
      );
    }).catch(function (err) {
      if (btn) { btn.disabled = false; btn.textContent = t("שמירה"); }
      toast(String(err.message || err));
    });
  });
}

function countryOpts() {
  var set = {};
  DB.forEach(function (e) { if (e.location.country) set[e.location.country] = 1; });
  return Object.keys(set).sort(function (a, b) { return a.localeCompare(b, "he"); })
    .map(function (c) { return '<option value="' + esc(c) + '">'; }).join("");
}







/* ── עזרים ────────────────────────────────────────────────────────────── */

var tT;
function toast(m) {
  var t = $("#toast");
  t.textContent = m; t.hidden = false;
  clearTimeout(tT);
  tT = setTimeout(function () { t.hidden = true; }, 3200);
}

function copyText(txt, ok) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(txt).then(function () { toast(ok); }, fb);
  } else { fb(); }
  function fb() {
    var ta = document.createElement("textarea");
    ta.value = txt; ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); toast(ok); } catch (_) { toast("ההעתקה נכשלה"); }
    document.body.removeChild(ta);
  }
}

function byId(id) { return DB.filter(function (x) { return x.id === id; })[0]; }

function fillSelects() {
  /* נקרא גם בהחלפת שפה, ולכן חייב להיות אידמפוטנטי: בלי הניקוי כל
     החלפה הייתה מוסיפה עוד עותק של כל אפשרות לרשימה.
     האפשרות הראשונה ("הכול") סטטית ב-HTML ומתורגמת דרך data-i18n. */
  ["#fActor", "#fStatus", "#fRegion"].forEach(function (sel) {
    var el = $(sel), keep = el.value;
    while (el.options.length > 1) el.remove(1);
    el.dataset.want = keep;
  });

  ACTORS.forEach(function (a) {
    var o = document.createElement("option");
    o.value = a.key; o.dataset.label = a.label; o.textContent = tx('actor', a.key, a.label);
    $("#fActor").appendChild(o);
  });
  STATS.forEach(function (s) {
    var o = document.createElement("option");
    o.value = s.key; o.textContent = tx('status', s.key, s.label);
    $("#fStatus").appendChild(o);
  });
  REGIONS.forEach(function (r) {
    if (!DB.some(function (e) { return e.location.region === r.key; })) return;
    var o = document.createElement("option");
    o.value = r.key; o.textContent = regName(r.key, r.label);
    $("#fRegion").appendChild(o);
  });

  /* מחזירים את הבחירה שהייתה. מי שסינן לפי "בריטניה" והחליף שפה
     לא ביקש לאפס את הסינון. */
  ["#fActor", "#fStatus", "#fRegion"].forEach(function (sel) {
    var el = $(sel);
    if (el.dataset.want) el.value = el.dataset.want;
    delete el.dataset.want;
  });

  fillCountries();
}

function fillCountries() {
  var sel = $("#fCountry"), cur = S.country;
  var pool = S.region ? DB.filter(function (e) { return e.location.region === S.region; }) : DB;
  var set = {};
  pool.forEach(function (e) { if (e.location.country) set[e.location.country] = 1; });
  /* ממיינים לפי השם המוצג, אחרת ברשימה אנגלית הסדר נראה אקראי */
  var names = Object.keys(set).sort(function (a, b) {
    return coName(a).localeCompare(coName(b), LANG === "en" ? "en" : "he");
  });

  sel.innerHTML = '<option value="">' + t("הכול") + "</option>" + names.map(function (c) {
    return '<option value="' + esc(c) + '">' + esc(coName(c)) + "</option>";
  }).join("");
  sel.value = names.indexOf(cur) > -1 ? cur : "";
  S.country = sel.value;
  fillCities();
}

/* רשימת הערים נגזרת מהמדינה שנבחרה. בלי מדינה היא מציגה את כל הערים
   שיש להן רשומות — לרוב זה מספר סביר, כי רק חלק מהרשומות ממוקמות בעיר. */
function fillCities() {
  var sel = $("#fCity");
  if (!sel) return;
  var cur = S.city, set = {};
  DB.forEach(function (e) {
    if (!e.location.city) return;
    if (S.country && e.location.country !== S.country) return;
    if (S.region && e.location.region !== S.region) return;
    set[e.location.city] = 1;
  });
  var names = Object.keys(set).sort(function (a, b) {
    return cityName(a).localeCompare(cityName(b), LANG === "en" ? "en" : "he");
  });

  sel.innerHTML = '<option value="">' + t("הכול") + "</option>" + names.map(function (c) {
    return '<option value="' + esc(c) + '">' + esc(cityName(c)) + "</option>";
  }).join("");
  sel.value = names.indexOf(cur) > -1 ? cur : "";
  S.city = sel.value;
  sel.parentElement.hidden = !names.length;
}

function closeMenu() {
  var p = $(".menu__pop");
  if (p && !p.hidden) {
    p.hidden = true;
    var b = $('[data-act="datamenu"]');
    if (b) b.setAttribute("aria-expanded", "false");
  }
}

function setTheme(t) {
  document.documentElement.setAttribute("data-theme", t);
  lsSet(LS.theme, t);
}

/* ── משיכת עדכון ──────────────────────────────────────────────────────── */

function syncRemote(force) {
  var base = String(CFG.remote || "").replace(/\/+$/, "");
  if (!base) return Promise.resolve();      /* מצב מקומי — אין מה למשוך */

  var gap = (CFG.checkEveryHours || 6) * 3600 * 1000;
  var last = +lsGet(LSR.checked, 0);
  if (!force && Date.now() - last < gap) return Promise.resolve();

  var bust = "?t=" + Date.now();

  return fetch(base + "/version.json" + bust, { cache: "no-store" })
    .then(function (r) {
      if (!r.ok) throw new Error("version.json — " + r.status);
      return r.json();
    })
    .then(function (v) {
      lsSet(LSR.checked, Date.now());
      /* רושמים גם בדיקה שלא הביאה כלום. בלי זה אי אפשר להבחין בין
         "אין מה לעדכן" לבין "הבדיקה נכשלה בשקט" — וזו בדיוק ההבחנה
         שחלונית המצב אמורה לענות עליה. */
      lsSet(LSR.status, { ok: true, at: Date.now(), remote: v && v.version, entries: v && v.entries });
      if (!v || !v.version) return null;
      if (v.version === lsGet(LSR.version, "")) return null;   /* כבר מעודכן */
      return fetch(base + "/data-bundle.json" + bust, { cache: "no-store" })
        .then(function (r) {
          if (!r.ok) throw new Error("data-bundle.json — " + r.status);
          return r.json();
        });
    })
    .then(function (b) {
      if (!b || !b.registry || !Array.isArray(b.registry.entries) || !b.registry.entries.length) return;

      try { localStorage.setItem(LSR.bundle, JSON.stringify(b)); } catch (_) { return; }
      lsSet(LSR.version, b.version);

      /* מרעננים בלי לטרוק את המסך על המשתמש באמצע קריאה */
      var was = DB.length;
      window.ANTISHIMON = b.registry;
      META = b.registry;
    /* בלי השורה הזאת סנכרון מרוחק היה מוחק את כל רשומות המקומות
       ומשאיר את הלשונית ריקה עד לרענון מקומי. */
    if (b.places) window.ANTISHIMON_PLACES = b.places;
      if (b.support) { SUP = b.support; expandSupportLists(); }
      if (b.signers) { window.ANTISHIMON_SIGNERS = b.signers; }
      INCOMING = b.incoming || null;

      loadDB(); fillCountries(); render();
      var diff = DB.length - was;
      toast(diff > 0 ? t("עודכן") + " — " + diff + " " + t("רשומות חדשות") : t("המאגר עודכן"));
    })
    .catch(function (err) {
      /* אין רשת או שהשרת לא זמין — ממשיכים עם מה שיש, אבל מסמנים.
         אתר שמראה נתונים מלפני שבועיים ואומר "הכול תקין" גרוע יותר
         מאתר שאומר שהבדיקה נכשלה. */
      lsSet(LSR.status, { ok: false, at: Date.now(), error: String(err && err.message || err) });
    });
}

/* ── אתחול ────────────────────────────────────────────────────────────── */

function init() {
  setTheme(lsGet(LS.theme, "dark"));
  setLang(LANG);
  loadDB();
  fillSelects();
  render();

  /* חשבון: נטען ברקע. האתר לא ממתין לו — מרשם קריאה עובד בלי שרת.
     init הוא זה שקובע אם יש שרת, ולכן אסור לתלות אותו ב-API.ready:
     הדגל נקבע בתוכו, וכל תנאי מקדים היה מונע ממנו לרוץ לעולם.

     העדויות נטענות רק אחריו, כי הן מגיעות מהשרת ולא מהמכשיר — ומי
     שמחובר צריך לראות גם את ההגשות שעדיין ממתינות לו. */
  if (API.init) {
    API.init().then(function () {
      renderAccount(); render();
      return stLoad();
    }).then(function () {
      if (STORIES.length || VIEW === "stories") render();
    });
  }
  renderAccount();

  heroCanvas();
  navShrink();
  reveal();

  if (!disclaimerSeen()) setTimeout(disclaimerModal, 350);

  var m = /^#\/e\/(.+)$/.exec(location.hash);
  if (m) openEntry(decodeURIComponent(m[1]));

  /* אחרי שהמסך כבר עלה — בודקים ברקע אם יש עדכון */
  setTimeout(syncRemote, 1200);

  /* Service Worker — מאפשר התקנה למסך הבית ועבודה בלי רשת.
     נרשם רק ב-http/https; מ-file:// הדפדפן חוסם אותו וזה תקין. */
  if ("serviceWorker" in navigator && location.protocol.indexOf("http") === 0) {
    navigator.serviceWorker.register("sw.js").catch(function () {});
  }

  /* חיפוש */
  var q = $("#q"), qT;
  q.addEventListener("input", function () {
    $(".seek__x").hidden = !q.value;
    clearTimeout(qT);
    qT = setTimeout(function () {
      var wasEmpty = !S.q;
      S.q = q.value;

      /* חיפוש גובר על הסינון. קודם, מי שעמד על ״מקומות״ וחיפש ״פומה״
         קיבל ״אין התאמה״ — התוצאה הייתה במאגר אבל מחוץ לקטגוריה
         שנבחרה, והמשתמש לא ידע שהיא שם. שדה חיפוש שמחזיר ריק כשיש
         תשובה הוא שדה שבור, ולכן תחילת חיפוש מנקה את המסננים. */
      if (S.q && wasEmpty) {
        S.cat = ""; S.sev = ""; S.region = ""; S.country = "";
        S.city = ""; S.status = ""; S.actor = ""; S.watchOnly = false;
        $("#fRegion").value = ""; $("#fStatus").value = ""; $("#fActor").value = "";
        fillCountries();
      }
      reRender();
    }, 130);
  });
  $(".seek").addEventListener("submit", function (e) { e.preventDefault(); });

  /* בוררים */
  [["#fRegion", "region"], ["#fCountry", "country"], ["#fCity", "city"], ["#fActor", "actor"],
   ["#fStatus", "status"], ["#fSort", "sort"]].forEach(function (p) {
    $(p[0]).addEventListener("change", function (ev) {
      S[p[1]] = ev.target.value;
      if (p[1] === "region" || p[1] === "country") fillCountries();
      reRender();
    });
  });




  /* שיוך ברקוד שהמשתמש תרם */
  $("#scanOut").addEventListener("submit", function (ev) {
    var f = ev.target;
    if (f.id !== "contribForm") return;
    ev.preventDefault();
    var brand = String(new FormData(f).get("brand") || "").trim();
    if (!brand) { toast("הזינו שם מותג"); return; }
    var code = String(f.dataset.code || "").replace(/\D/g, "");
    var map = myCodes();
    map[code] = brand;
    lsSet(LS.codes, map);
    toast("שויך ל־" + brand + " — תודה");
    showVerdict(code);
  });

  /* הקלדה ידנית של הברקוד — עובדת גם בלי מצלמה ובלי HTTPS */
  $("#scanForm").addEventListener("submit", function (ev) {
    ev.preventDefault();
    var code = String(new FormData(ev.target).get("code") || "").replace(/\D/g, "");
    if (code.length < 6) { toast("הזינו לפחות 6 ספרות"); return; }
    if (!validGtin(code)) {
      $("#scanMsg").textContent = "ספרת הביקורת לא מסתדרת — ייתכן שנפלה טעות בהקלדה. בודקים בכל זאת:";
    }
    stopCamera();
    showVerdict(code);
  });

  /* קליק גלובלי */
  /* המשתנה נקרא tgt ולא t: השם t תפוס בידי פונקציית התרגום, והצללה
     שלו כאן הפילה כל קריאת t() בתוך המאזין ב-"t is not a function". */
  document.addEventListener("click", function (ev) {
    var tgt = ev.target;
    if (!tgt || !tgt.closest) return;

    var act = tgt.closest("[data-act]");
    if (act) {
      var a = act.dataset.act;
      if (a !== "burger") {
        var nax = $(".nav__acts");
        if (nax && nax.classList.contains("is-open")) {
          nax.classList.remove("is-open");
          var bb = $('[data-act="burger"]');
          if (bb) bb.setAttribute("aria-expanded", "false");
        }
      }

      switch (a) {
        /* התפריטים הנפתחים נבנים ב-JS, ולכן applyStaticLang לא נוגע
           בהם — בלי בנייה מחדש הם נשארים בשפה הקודמת ומופיע "All"
           באמצע ממשק עברי. */
        case "lang":
          setLang(LANG === "he" ? "en" : "he");
          fillSelects();
          render();
          return;
        case "theme":
          setTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark");
          return;
        case "about": aboutModal(); return;
    case "terms": termsModal(); return;
    case "go-cat": {
      VIEW = "registry"; S.q = ""; $("#q").value = ""; $(".seek__x").hidden = true;
      S.cat = act.dataset.cat || ""; S.sev = ""; S.watchOnly = false;
      reRender();
      $("#resN").scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    case "go-support-tab": VIEW = "products"; reRender();
      $("#resN").scrollIntoView({ behavior: "smooth", block: "start" }); return;
    case "sources": sourcesModal(); return;
    case "burger": {
      var na = $(".nav__acts");
      var open = na.classList.toggle("is-open");
      act.setAttribute("aria-expanded", String(open));
      return;
    }

    /* ── חשבון ── */
    case "signin":  authModal("in"); return;
    case "signup":  authModal("up"); return;
    case "my-cancel":
      API.cancel(act.dataset.id).then(function () { accountModal(); toast(t("ההגשה בוטלה")); })
        .catch(function (e) { toast(String(e.message || e)); });
      return;
    case "account": accountModal(); return;
    case "signout":
      API.logout()
        .then(function () { renderAccount(); closeModal(); toast(t("יצאתם מהחשבון")); return stLoad(); })
        .then(render);
      return;

    /* ── תור ביקורת ── */
    case "queue": queueModal(); return;
    case "q-yes":
    case "q-no": {
      var card = act.closest(".qc");
      var note = card ? (card.querySelector(".qc__note") || {}).value : "";
      var yes = act.getAttribute("data-act") === "q-yes";
      if (!yes && !String(note || "").trim()) { toast(t("דחייה מחייבת נימוק")); return; }
      act.disabled = true;
      API.decide(act.dataset.id, yes, note)
        .then(function () {
          if (card) card.remove();
          refreshQueueBadge();
          toast(t(yes ? "אושר ופורסם" : "נדחה"));
        })
        .catch(function (e) { act.disabled = false; toast(String(e.message || e)); });
      return;
    }
    case "disclaimer-ok":
      lsSet("antishimon:disclaimer", DISCLAIMER_V);
      delete $("#modal").dataset.locked;
      closeModal();
      return;
    case "go-registry": VIEW = "registry"; reRender();
      $("#resN").scrollIntoView({ behavior: "smooth", block: "start" }); return;
    case "go-support": VIEW = "products"; reRender();
      $("#resN").scrollIntoView({ behavior: "smooth", block: "start" }); return;
        case "add": addModal(); return;
        case "more": shown += PAGE; render(); return;
        case "share": shareCard(act.dataset.id); return;
        case "watch": toggleWatch(act.dataset.id); return;
        case "news": newsModal(); return;
        case "news-ok": saveSnapshot(); closeModal(); render(); return;
        case "map-toggle": {
          var box = $("#mapBox"), hid = box.hasAttribute("data-min");
          if (hid) { box.removeAttribute("data-min"); $("#mapPlot").hidden = false; act.textContent = t("הסתרה"); }
          else { box.setAttribute("data-min", "1"); $("#mapPlot").hidden = true; act.textContent = t("הצגה"); }
          lsSet("antishimon:map-min", !hid);
          return;
        }
        case "travel": travelModal(); return;
        case "travel-pick": {
          /* לא ״var q״ — הכרזה כזו מוּרמת (hoisting) לראש הפונקציה
             ומאפילה על שדה החיפוש בכל ה-handler, מה ששבר את ״איפוס״. */
          var qp = act.dataset.q;
          var inp = $("#travelForm") && $("#travelForm").querySelector("input[name=dest]");
          if (inp) inp.value = qp;
          $("#travelOut").innerHTML = travelResultHTML(qp, travelCheck(qp));
          $("#travelOut").scrollIntoView({ behavior: "smooth", block: "nearest" });
          return;
        }
        case "open-from-travel": closeModal(); openEntry(act.dataset.id); return;

        /* מבדיקת היעד אל המרשם: מסנן למדינה ומאפס את שאר הבוררים,
           כדי שהמשתמש יראה בדיוק את מה שנספר לו בחלונית. */
        case "travel-scope": {
          closeModal();
          S.q = ""; S.cat = ""; S.sev = ""; S.status = ""; S.actor = ""; S.city = "";
          S.region = ""; S.watchOnly = false;
          $("#q").value = ""; $(".seek__x").hidden = true;
          $("#fRegion").value = "";
          S.country = act.dataset.q;
          fillCountries();
          $("#fCountry").value = S.country;
          reRender();
          $("#resN").scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }
        case "watchlist":
          VIEW = "registry"; S.watchOnly = !S.watchOnly; reRender();
          $("#resN").scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        case "scan": openScan(); return;
        case "sort-recent":
          VIEW = "registry"; S.sort = "recent"; $("#fSort").value = "recent"; render();
          $("#resN").scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        case "close-scan": closeScan(); return;
        case "gs1": gs1Modal(); return;
        case "see-support":
          closeScan();
          VIEW = "products"; render();
          $("#prodView").scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        case "open-from-scan": closeScan(); openEntry(act.dataset.id); return;
        case "datamenu": {
          var p = $(".menu__pop"), o = p.hidden;
          p.hidden = !o;
          act.setAttribute("aria-expanded", String(o));
          return;
        }
        /* ייצוא/ייבוא JSON הוסרו: הם היו צינור להוצאת המאגר כולו.
           השיתוף היחיד שנשאר הוא כרטיס תמונה בודד. */

        /* ── סיפורים אישיים ── */
        /* הגשת עדות דורשת חשבון — לא כדי לחסום אנשים אלא כדי שלכל
           עדות יהיה מגיש שאפשר לחזור אליו, ושהתור לא יוצף אנונימית. */
        case "story-write": needAuth(stForm); return;
        case "story-rec":   needAuth(stRecorder); return;
        case "story-card":  stCard(act.dataset.id); return;

        case "story-cancel": {
          var sdl = stById(act.dataset.id);
          if (!sdl) return;
          openModal(
            '<h2 class="modal__h">' + t("ביטול ההגשה") + "</h2>" +
            '<p class="modal__p">' + (LANG === "en" ? "“" : "״") + esc(sdl.title) +
              (LANG === "en"
                ? "” will be removed from the review queue, along with its recording. This cannot be undone."
                : "״ תוסר מתור הבדיקה, יחד עם ההקלטה שלה. אי אפשר לשחזר.") + "</p>" +
            '<div class="acts">' +
              '<button class="btn" data-act="story-cancel-yes" data-id="' + esc(sdl.id) + '">' +
                t("ביטול ההגשה") + "</button>" +
              '<button class="tl" data-act="close-modal">' + t("חזרה") + "</button>" +
            "</div>"
          );
          return;
        }
        case "story-cancel-yes":
          API.cancel(act.dataset.id).then(function () {
            closeModal();
            return stLoad();
          }).then(function () {
            render(); toast(t("ההגשה בוטלה"));
          }).catch(function (e) { toast(String(e.message || e)); });
          return;



        case "close-modal": closeModal(); return;
        case "close-dos": closeDos(); return;
        case "clearq":
          q.value = ""; S.q = ""; $(".seek__x").hidden = true; render(); q.focus();
          return;
        case "update-health": updateHealthModal(); return;
        case "update-recheck": {
          var rb = tgt;
          rb.disabled = true; rb.textContent = t("בודק…");
          syncRemote(true).then(function () { updateHealthModal(); });
          return;
        }
        case "clearfilters":
          S = { q: "", cat: "", region: "", country: "", city: "", sev: "", status: "", actor: "", sort: S.sort, watchOnly: false, fresh: 0 };
          q.value = ""; $(".seek__x").hidden = true;
          ["#fRegion", "#fCity", "#fActor", "#fStatus"].forEach(function (s) { $(s).value = ""; });
          fillCountries(); render();
          return;
        case "reset":
          ev.preventDefault();
          closeDos(); closeModal();
          window.scrollTo({ top: 0, behavior: "smooth" });
          return;
        case "permalink":
          copyText(location.origin + location.pathname + "#/e/" + act.dataset.id, "הקישור הועתק");
          return;
        case "correction": {
          var e2 = byId(act.dataset.id);
          if (e2) {
            copyText(
              "בקשת תיקון — אנטישימון\n" +
              "מזהה: " + e2.id + "\nשם: " + e2.name + "\n" +
              "סטטוס נוכחי: " + (STAT_BY[e2.status] || {}).label + "\n" +
              "דרגה נוכחית: 0" + e2.severity + "\n\n" +
              "מה שגוי ברשומה:\n(מלאו כאן)\n\nמקור תומך (קישור):\n(מלאו כאן)\n",
              "טופס התיקון הועתק — הדביקו אותו בפנייה לעורכי המרשם"
            );
          }
          return;
        }
        case "approve": {
          var ap = lsGet(LS.approved, []);
          if (ap.indexOf(act.dataset.id) === -1) ap.push(act.dataset.id);
          lsSet(LS.approved, ap);
          loadDB(); fillCountries(); render(); openEntry(act.dataset.id);
          toast("הרשומה אושרה");
          return;
        }
        case "reject": {
          var rj = lsGet(LS.rejected, []);
          if (rj.indexOf(act.dataset.id) === -1) rj.push(act.dataset.id);
          lsSet(LS.rejected, rj);
          loadDB(); fillCountries(); render(); closeDos();
          toast("המועמד נדחה והוסר");
          return;
        }
      }
      return;
    }

    /* תגית בתוך התיק → חיפוש */
    var tg = tgt.closest("[data-q]");
    if (tg) {
      closeDos();
      q.value = tg.dataset.q; S.q = tg.dataset.q;
      $(".seek__x").hidden = false;
      render();
      $("#grid").scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    var tab = tgt.closest(".tab");
    if (tab) { VIEW = tab.dataset.view; reRender(); return; }

    var sp = tgt.closest(".sp");
    if (sp) { S.sev = sp.dataset.sev; reRender(); return; }

    var fr = tgt.closest(".fresh__b");
    if (fr) {
      var w = +fr.dataset.fresh || 0;
      /* לחיצה שנייה על אותו חלון מבטלת אותו. אחרת הדרך היחידה לצאת
         מ"השבוע" היא למצוא את כפתור האיפוס, וזה לא ברור מאליו. */
      S.fresh = (S.fresh === w) ? 0 : w;
      if (S.fresh) { S.sort = "newest"; $("#fSort").value = "newest"; }
      reRender();
      return;
    }

    var chip = tgt.closest(".chip");
    if (chip) { S.cat = chip.dataset.cat; reRender(); return; }

    /* לחיצה על נקודה פותחת את תיק המקום. קודם היא סיננה לפי מדינה,
       אבל מאז שהמפה מציגה רשומות מקום בלבד, הרשומה עצמה היא היעד. */
    var mp = tgt.closest(".mp");
    if (mp) { openEntry(mp.dataset.place); return; }

    var tk = tgt.closest(".tick__i");
    if (tk) { openEntry(tk.dataset.id); return; }

    var rc = tgt.closest(".rc");
    if (rc) { openEntry(rc.dataset.id); return; }

    var card = tgt.closest(".card");
    if (card) { openEntry(card.dataset.id); return; }

    if (tgt.closest("#scrim")) { closeDos(); return; }
    if (tgt.id === "modal") { if (!tgt.dataset.locked) closeModal(); return; }

    closeMenu();
  });

  /* מקלדת */
  document.addEventListener("keydown", function (ev) {
    if (ev.key === "Escape") {
      if (!$("#modal").hidden) { if (!$("#modal").dataset.locked) closeModal(); return; }
      if (!$("#scan").hidden) { closeScan(); return; }
      if (!$("#dossier").hidden) { closeDos(); return; }
      closeMenu();
      return;
    }
    var tn = (ev.target.tagName || "").toLowerCase();
    if (tn === "input" || tn === "textarea" || tn === "select") return;
    if (ev.key === "/") { ev.preventDefault(); q.focus(); q.select(); }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else { init(); }

})();
