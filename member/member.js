/* Area 会員機能（試作）— データの保存と共通処理
   ※試作のため、データはこの端末のブラウザ（localStorage）だけに保存します。
     本番ではサーバー（データベース）に保存し、パスワードも安全な方法で管理します。 */
(function (w) {
  var KEY = "areaMemberDemo_v1", SESS = "areaMemberDemo_session";
  var DAY = 86400000;
  var DELETE_DAYS = 5;      // 最終ログインからこの日数で自動削除
  var WARN_DAYS = 4;        // この日数を過ぎたら「まもなく削除」の通知

  function load() {
    try { var d = JSON.parse(localStorage.getItem(KEY) || "null"); if (d && d.users) return d; } catch (e) {}
    return { users: [], offers: [], deleted: [], clockOffset: 0, seq: 1 };
  }
  function save(d) { try { localStorage.setItem(KEY, JSON.stringify(d)); } catch (e) { alert("保存できませんでした（ブラウザの設定をご確認ください）"); } }
  function now(d) { d = d || load(); return Date.now() + (d.clockOffset || 0); }

  // かんたんなハッシュ（試作用。本番ではサーバー側で bcrypt などを使う）
  function hash(s) { var h = 5381; s = String(s); for (var i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0; return "h" + (h >>> 0).toString(36); }
  function uid(d) { var n = d.seq++; return "U" + String(100000 + n); }

  function ageOf(birth, t) {
    if (!birth) return null; var b = new Date(birth + "T00:00:00"), n = new Date(t);
    var a = n.getFullYear() - b.getFullYear(); var m = n.getMonth() - b.getMonth();
    if (m < 0 || (m === 0 && n.getDate() < b.getDate())) a--; return a;
  }
  function fmt(t, withTime) {
    if (!t) return "—"; var x = new Date(t);
    var s = x.getFullYear() + "年" + (x.getMonth() + 1) + "月" + x.getDate() + "日";
    if (withTime) s += " " + String(x.getHours()).padStart(2, "0") + ":" + String(x.getMinutes()).padStart(2, "0");
    return s;
  }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }

  // 自動削除：最終ログインから5日たった会員を、プロフィール・SNS・届いた声かけも含めて削除
  function sweep(d) {
    var t = now(d), removed = [];
    d.users = d.users.filter(function (u) {
      if (t - u.lastLogin >= DELETE_DAYS * DAY) { removed.push(u); return false; } return true;
    });
    removed.forEach(function (u) {
      d.offers = d.offers.filter(function (o) { return o.userId !== u.id; });
      // 個人情報は残さず、管理用に「いつ・何件消したか」だけ記録
      d.deleted.push({ id: u.id, deletedAt: t, reason: "5日間ログインなし" });
    });
    return removed.length;
  }
  function daysLeft(u, d) { return Math.max(0, DELETE_DAYS - (now(d) - u.lastLogin) / DAY); }

  var M = {
    DELETE_DAYS: DELETE_DAYS, WARN_DAYS: WARN_DAYS, DAY: DAY,
    load: load, save: save, now: now, fmt: fmt, esc: esc, ageOf: ageOf, daysLeft: daysLeft,
    sweep: function () { var d = load(); var n = sweep(d); save(d); return n; },
    register: function (f) {
      var d = load(); sweep(d);
      var email = String(f.email || "").trim().toLowerCase();
      if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return { err: "メールアドレスを正しく入力してください" };
      if (d.users.some(function (u) { return u.email === email; })) return { err: "このメールアドレスはすでに登録されています" };
      if (!f.username) return { err: "ユーザー名を入力してください" };
      if (!f.password || f.password.length < 8) return { err: "パスワードは8文字以上にしてください" };
      var a = ageOf(f.birth, now(d));
      if (a === null) return { err: "生年月日を入力してください" };
      if (a < 18) return { err: "18歳未満の方は登録できません" };
      if (!f.agree) return { err: "利用規約とプライバシーポリシーへの同意が必要です" };
      var t = now(d);
      var u = {
        id: uid(d), username: f.username, email: email, pass: hash(f.password), plan: f.plan || "free",
        createdAt: t, lastLogin: t, warnedAt: 0,
        profile: { name: f.name || f.username, shop: "", birth: f.birth, blood: "", height: "", bust: "", hometown: "", area: "", job: "", wageHour: "", wageDay: "", hours: "", prTitle: "", prBody: "", public: true },
        sns: { instagram: "", tiktok: "", facebook: "" }
      };
      d.users.push(u); save(d); M.setSession(u.id); return { user: u };
    },
    login: function (email, password) {
      var d = load(); var n = sweep(d);
      email = String(email || "").trim().toLowerCase();
      var u = d.users.find(function (x) { return x.email === email; });
      if (!u) { save(d); return { err: n ? "アカウントが見つかりません（5日間ログインがなかったため削除された可能性があります）" : "メールアドレスまたはパスワードが違います" }; }
      if (u.pass !== hash(password)) { save(d); return { err: "メールアドレスまたはパスワードが違います" }; }
      u.lastLogin = now(d); u.warnedAt = 0; save(d); M.setSession(u.id); return { user: u };
    },
    // 画面を開いている間の操作もログインとして扱い、5日間のカウントをリセット
    touch: function () { var d = load(); sweep(d); var u = M.current(d); if (u) { u.lastLogin = now(d); } save(d); return u; },
    setSession: function (id) { try { sessionStorage.setItem(SESS, id); } catch (e) {} },
    logout: function () { try { sessionStorage.removeItem(SESS); } catch (e) {} },
    current: function (d) { d = d || load(); var id = null; try { id = sessionStorage.getItem(SESS); } catch (e) {} return id ? d.users.find(function (u) { return u.id === id; }) || null : null; },
    updateUser: function (id, fn) { var d = load(); var u = d.users.find(function (x) { return x.id === id; }); if (!u) return null; fn(u); save(d); return u; },
    deleteUser: function (id, reason) {
      var d = load(); var u = d.users.find(function (x) { return x.id === id; }); if (!u) return;
      d.users = d.users.filter(function (x) { return x.id !== id; });
      d.offers = d.offers.filter(function (o) { return o.userId !== id; });
      d.deleted.push({ id: id, deletedAt: now(d), reason: reason || "退会" }); save(d);
    },
    offersFor: function (id) { var d = load(); return d.offers.filter(function (o) { return o.userId === id; }).sort(function (a, b) { return b.sentAt - a.sentAt; }); },
    sendOffer: function (o) {
      var d = load(); sweep(d);
      if (!d.users.some(function (u) { return u.id === o.userId; })) { save(d); return { err: "この会員はすでに退会・削除されています" }; }
      var x = { id: "O" + (d.seq++), userId: o.userId, shop: o.shop, shopUrl: o.shopUrl || "", body: o.body, wage: o.wage || "", sentAt: now(d), read: false, reply: "" };
      d.offers.push(x); save(d); return { offer: x };
    },
    markRead: function (oid) { var d = load(); var o = d.offers.find(function (x) { return x.id === oid; }); if (o) { o.read = true; save(d); } },
    setReply: function (oid, r) { var d = load(); var o = d.offers.find(function (x) { return x.id === oid; }); if (o) { o.reply = r; o.read = true; o.repliedAt = now(d); save(d); } },
    advance: function (days) { var d = load(); d.clockOffset = (d.clockOffset || 0) + days * DAY; save(d); },
    resetClock: function () { var d = load(); d.clockOffset = 0; save(d); },
    wipe: function () { try { localStorage.removeItem(KEY); sessionStorage.removeItem(SESS); } catch (e) {} },
    planName: function (p) { return p === "premium" ? "プレミアム" : "フリー"; },
    seed: function () {
      var d = load(); if (d.users.length) return false;
      var t = now(d), mk = function (name, email, birth, area, job, wage, pr, lastAgoDays, plan) {
        var u = { id: uid(d), username: name, email: email, pass: hash("demo1234"), plan: plan || "free", createdAt: t - (lastAgoDays + 10) * DAY, lastLogin: t - lastAgoDays * DAY, warnedAt: 0,
          profile: { name: name, shop: "", birth: birth, blood: "A", height: "158", bust: "", hometown: "大阪府", area: area, job: job, wageHour: wage, wageDay: "", hours: "20:00〜LAST", prTitle: pr[0], prBody: pr[1], public: true },
          sns: { instagram: "", tiktok: "", facebook: "" } };
        d.users.push(u);
      };
      mk("みく", "miku@example.com", "2003-04-12", "梅田", "キャバクラ", "4,000円〜", ["週2から、明るく働きたい", "接客のアルバイト経験があります。まずは体験入店から始めたいです。"], 0.2, "premium");
      mk("れな", "rena@example.com", "2000-09-02", "北新地", "ラウンジ", "5,000円〜", ["落ち着いたお店希望", "昼は事務の仕事をしています。週1〜2日、終電上がりで働けるお店を探しています。"], 2.5);
      mk("さき", "saki@example.com", "1998-01-20", "祇園", "キャバクラ", "6,000円〜", ["経験3年・移籍を考え中", "京都で3年働いています。送りがあって日払いできるお店が希望です。"], 4.3);
      save(d); return true;
    }
  };
  w.AreaMember = M;
})(window);
