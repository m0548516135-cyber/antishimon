/* =========================================================================
   אנטישימון — שכבת השרת בצד הלקוח
   -------------------------------------------------------------------------
   מדברת עם השרת שרץ באותו מארח (backend/server.js), ולכן הכתובת יחסית
   ואין צורך ב-CORS, במפתחות ציבוריים או בספק צד-שלישי.

   **אין כאן שום אכיפה.** קוד לקוח אפשר לערוך בדפדפן. כל בדיקה שנראית
   כאן כמו הגבלה היא נוחות בלבד; האכיפה יושבת בשרת, שם נבדק הטוקן ושם
   נקבע מי רשאי לאשר.

   כשהשרת אינו זמין האפליקציה ממשיכה לעבוד כמרשם קריאה בלבד — פשוט בלי
   כפתור הרשמה ובלי הגשות. האתר לא נופל בגלל שהשרת נפל.
   ========================================================================= */

(function () {
  "use strict";

  var CFG  = (window.ANTISHIMON_CONFIG || {}).api || {};
  /* הקידומת מגיעה מהתצורה. השרת שמאחוריה כבר יושב תחת /api, ולכן
     הנתיבים כאן הם /login ולא /api/login — אחרת הם היו מוכפלים. */
  var BASE = String(CFG.base || "").replace(/\/+$/, "");
  var LS   = "antishimon:token";

  var API = {
    ready: false,        /* נקבע ב-init לפי מה שהשרת עונה */
    user: null,
    token: null
  };

  function req(path, opts) {
    opts = opts || {};
    var h = { "Content-Type": "application/json" };
    if (API.token) h.Authorization = "Bearer " + API.token;

    return fetch(BASE + path, {
      method: opts.method || "GET",
      headers: h,
      body: opts.body ? JSON.stringify(opts.body) : undefined
    }).then(function (r) {
      return r.json().catch(function () { return {}; }).then(function (d) {
        if (!r.ok) throw new Error(d.error || "שגיאה " + r.status);
        return d;
      });
    });
  }

  function keep(res) {
    API.token = res.token;
    API.user = res.user;
    try { localStorage.setItem(LS, res.token); } catch (_) {}
    return API.user;
  }

  function forget() {
    API.token = null; API.user = null;
    try { localStorage.removeItem(LS); } catch (_) {}
  }

  /* ── חשבון ── */

  API.register = function (email, password, name) {
    return req("/register", { method: "POST", body: { email: email, password: password, name: name } })
      .then(keep);
  };

  API.login = function (email, password) {
    return req("/login", { method: "POST", body: { email: email, password: password } }).then(keep);
  };

  API.logout = function () { forget(); return Promise.resolve(); };

  API.isStaff = function () { return !!(API.user && API.user.role === "admin"); };

  /* ── הגשות ──
     שים לב: אין כאן שדה status. הוא נקבע בשרת בלבד, וגם אם ייכתב כאן
     ידנית — השרת מוחק אותו מהמטען לפני השמירה. */

  API.submit = function (kind, payload) {
    return req("/submit", { method: "POST", body: { kind: kind, payload: payload } });
  };

  API.mine   = function () { return req("/mine").then(function (d) { return d.items || []; }); };
  API.cancel = function (id) { return req("/cancel", { method: "POST", body: { id: id } }); };
  API.publicItems = function (kind) {
    return req("/public").then(function (d) {
      var items = d.items || [];
      return kind ? items.filter(function (i) { return i.kind === kind; }) : items;
    });
  };

  /* ── הקלטות ──
     נשלחות כגוף בינארי גולמי, לא כ-multipart. אין כאן טופס עם כמה
     שדות — יש קובץ אחד — ולכן פענוח גבולות multipart בשרת היה קוד
     מיותר שאפשר לטעות בו. השרת מחזיר מזהה, והוא זה שנשמר בעדות. */

  API.uploadAudio = function (blob) {
    if (!API.token) return Promise.reject(new Error("צריך חשבון"));
    return fetch(BASE + "/audio", {
      method: "POST",
      headers: {
        "Content-Type": blob.type || "audio/webm",
        Authorization: "Bearer " + API.token
      },
      body: blob
    }).then(function (r) {
      return r.json().catch(function () { return {}; }).then(function (d) {
        if (!r.ok) throw new Error(d.error || "העלאת ההקלטה נכשלה");
        return d.audio;
      });
    });
  };

  /* השמעה עוברת דרך השרת ולא דרך קישור ישיר לקובץ: כך הוא יכול
     לסרב להשמיע הקלטה שממתינה לאישור למי שאינו הבעלים.

     תג <audio> אינו יכול לשלוח כותרת Authorization, ולכן להקלטה שעוד
     לא אושרה הטוקן נוסע בשאילתה. זו פשרה — כתובת עם טוקן נכנסת
     להיסטוריה וללוגים — ולכן היא נעשית רק כשאין ברירה: להקלטה
     שאושרה הכתובת נקייה. */
  API.audioUrl = function (id, priv) {
    return BASE + "/audio?id=" + encodeURIComponent(id) +
           (priv && API.token ? "&t=" + encodeURIComponent(API.token) : "");
  };

  /* ── צוות ── */

  API.queue  = function () { return req("/queue").then(function (d) { return d.items || []; }); };
  API.decide = function (id, approve, note) {
    return req("/decide", { method: "POST", body: { id: id, approve: approve, note: note } });
  };

  /* ── עלייה ──
     בודקים אם יש שרת בכלל. אם אין — ready נשאר false והממשק פשוט לא
     מציג את פינת החשבון, במקום להציג כפתור שנשבר בלחיצה. */

  API.init = function () {
    try { API.token = localStorage.getItem(LS); } catch (_) {}

    return req("/health").then(function () {
      API.ready = true;
      if (!API.token) return null;
      return req("/me").then(function (d) { API.user = d.user; return API.user; })
                          .catch(function () { forget(); return null; });
    }).catch(function () {
      API.ready = false;
      return null;
    });
  };

  window.ANTISHIMON_API = API;
})();
