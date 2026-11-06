/* Area 会員機能 — サーバー（/api/m/...）とのやりとり */
(function (w) {
  async function call(path, opt) {
    opt = opt || {};
    var r = await fetch("/api/m/" + path, { method: opt.method || "GET", headers: opt.body ? { "content-type": "application/json" } : {}, body: opt.body ? JSON.stringify(opt.body) : undefined, credentials: "same-origin" });
    var data = {}; try { data = await r.json(); } catch (e) {}
    if (!r.ok) { var e = new Error(data.error || "通信に失敗しました（" + r.status + "）"); e.status = r.status; throw e; }
    return data;
  }
  w.AreaAPI = {
    config: function () { return call("config").catch(function () { return { enabled: false }; }); },
    me: function () { return call("me"); },
    register: function (b) { return call("me", { method: "POST", body: b }); },
    update: function (b) { return call("me", { method: "PUT", body: b }); },
    quit: function () { return call("me", { method: "DELETE" }); },
    offers: function () { return call("offers"); },
    offerAct: function (id, b) { return call("offers/" + id, { method: "POST", body: b || {} }); },
    shopApply: function (b) { return call("shop/apply", { method: "POST", body: b }); },
    shopRedeem: function (code) { return call("shop/redeem", { method: "POST", body: { code: code } }); },
    shopMembers: function () { return call("shop/members"); },
    shopSend: function (b) { return call("shop/offers", { method: "POST", body: b }); },
    adminOverview: function () { return call("admin/overview"); },
    adminInvite: function (b) { return call("admin/invite", { method: "POST", body: b }); },
    adminShop: function (b) { return call("admin/shop", { method: "POST", body: b }); },
    adminDeleteMember: function (id) { return call("admin/member", { method: "DELETE", body: { id: id } }); },
    esc: function (s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); },
    fmt: function (t, withTime) {
      if (!t) return "—"; var x = new Date(t);
      var s = x.getFullYear() + "年" + (x.getMonth() + 1) + "月" + x.getDate() + "日";
      if (withTime) s += " " + String(x.getHours()).padStart(2, "0") + ":" + String(x.getMinutes()).padStart(2, "0");
      return s;
    },
    ageOf: function (birth) {
      if (!birth) return null; var b = new Date(birth + "T00:00:00"), n = new Date();
      var a = n.getFullYear() - b.getFullYear(), m = n.getMonth() - b.getMonth();
      if (m < 0 || (m === 0 && n.getDate() < b.getDate())) a--; return a;
    },
    planName: function (p) { return p === "premium" ? "プレミアム" : "フリー"; },
    loginMsg: function () {
      var q = new URLSearchParams(location.search).get("login");
      return { cancel: "LINEログインがキャンセルされました。", state: "ログインの有効期限が切れました。もう一度お試しください。", token: "LINEとの通信に失敗しました。もう一度お試しください。", verify: "LINEの確認に失敗しました。もう一度お試しください。" }[q] || "";
    }
  };
})(window);
