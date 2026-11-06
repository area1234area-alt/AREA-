/* 管理画面：遊ぶ（UMEDA NIGHT GUIDE）の店舗・審査・紹介ID */
(function () {
  var $ = function (id) { return document.getElementById(id); };
  var E = function (s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };
  var D = null, editing = null;
  async function api(path, opt) {
    opt = opt || {};
    var r = await fetch("/api/guide/admin/" + path, { method: opt.method || "GET", headers: opt.body ? { "content-type": "application/json" } : {}, body: opt.body ? JSON.stringify(opt.body) : undefined, credentials: "same-origin" });
    var d = {}; try { d = await r.json(); } catch (e) {}
    if (!r.ok) throw new Error(d.error || "通信に失敗しました（" + r.status + "）");
    return d;
  }
  var PILL = { published: "ok-txt", pending: "", draft: "", rejected: "danger-txt", suspended: "danger-txt" };
  function msg(t, k) { $("gMsg").innerHTML = t ? '<div class="msg ' + (k || "err") + '">' + E(t) + '</div>' : ""; }
  async function load() {
    D = await api("overview");
    $("gCnt").textContent = D.shops.filter(function (s) { return s.status === "published"; }).length + "店 公開中／全" + D.shops.length + "店";
    $("gTb").innerHTML = D.shops.map(function (s) {
      var acts = [];
      if (s.status !== "published") acts.push('<button class="btn gold sm" data-st="published" data-k="' + s.key + '">承認・公開</button>');
      if (s.status === "pending") acts.push('<button class="btn ghost sm" data-st="rejected" data-k="' + s.key + '">却下</button>');
      if (s.status === "published") acts.push('<button class="btn ghost sm" data-st="suspended" data-k="' + s.key + '">停止</button>');
      return '<tr><td><a href="/asobu/' + s.key + '.html" target="_blank">' + E(s.name) + '</a><br><span class="note">' + s.key + '</span></td><td>' + E(s.genre) + (s.settai ? '<br><span class="note">接待あり</span>' : '') + '</td>'
        + '<td class="' + (PILL[s.status] || "") + '">' + E(D.status[s.status] || s.status) + '</td>'
        + '<td><label class="check" style="margin:0"><input type="checkbox" data-ref="' + s.key + '"' + (s.ref ? ' checked' : '') + '> 対象</label></td>'
        + '<td>' + (s.license && s.license.checkedAt ? '<span class="ok-txt">確認済</span>' : '<span class="note">未確認</span>') + '</td>'
        + '<td style="white-space:nowrap">' + acts.join(" ") + ' <button class="btn ghost sm" data-ed="' + s.key + '">編集</button></td></tr>';
    }).join("");
    $("gCat").innerHTML = D.cats.map(function (c) { return '<option>' + E(c) + '</option>'; }).join("");
    $("gLog").innerHTML = D.logs.map(function (l) { var t = new Date(l.t); return '<tr><td>' + (t.getMonth() + 1) + "/" + t.getDate() + " " + String(t.getHours()).padStart(2, "0") + ":" + String(t.getMinutes()).padStart(2, "0") + '</td><td>' + E(l.who) + '</td><td>' + E(l.what) + '</td></tr>'; }).join("") || '<tr><td colspan="3" class="empty">まだありません</td></tr>';
    [].forEach.call(document.querySelectorAll("#gTb [data-st]"), function (b) { b.onclick = async function () {
      var reason = "";
      if (b.dataset.st !== "published") { reason = (window.prompt && prompt("理由（任意）")) || ""; }
      try { await api("status", { method: "POST", body: { key: b.dataset.k, status: b.dataset.st, reason: reason } }); load(); } catch (x) { msg(x.message); } }; });
    [].forEach.call(document.querySelectorAll("#gTb [data-ref]"), function (c) { c.onchange = async function () { try { await api("ref", { method: "POST", body: { key: c.dataset.ref, ref: c.checked } }); load(); } catch (x) { msg(x.message); c.checked = !c.checked; } }; });
    [].forEach.call(document.querySelectorAll("#gTb [data-ed]"), function (b) { b.onclick = function () { openForm(D.shops.filter(function (s) { return s.key === b.dataset.ed; })[0]); }; });
    loadVisits();
  }
  async function loadVisits() {
    try {
      var v = await api("visits?month=" + ($("gMonth").value || ""));
      $("gVis").innerHTML = v.list.map(function (x) { var t = new Date(x.at); return '<tr><td><b>' + E(x.id) + '</b></td><td>' + E(x.name) + '</td><td>' + x.people + '名</td><td>' + E(x.plan || "—") + '</td><td>' + (t.getMonth() + 1) + "/" + t.getDate() + " " + String(t.getHours()).padStart(2, "0") + ":" + String(t.getMinutes()).padStart(2, "0") + '</td></tr>'; }).join("") || '<tr><td colspan="5" class="empty">この月の紹介IDはまだありません</td></tr>';
      $("gVisCnt").textContent = v.list.length + "件";
    } catch (x) { msg(x.message); }
  }
  var F = ["key", "name", "kana", "genre", "sub", "town", "station", "address", "tel", "telNote", "hours", "holiday", "from", "facility", "intro", "planFrom", "job", "licenseType", "licenseChecked", "order"];
  function openForm(s) {
    editing = s || null; var f = $("gForm");
    f.reset(); $("gFormTtl").textContent = s ? s.name + " を編集" : "お店を登録";
    f.key.readOnly = !!s;
    if (s) {
      F.forEach(function (k) { if (f[k] && s[k] != null) f[k].value = s[k]; });
      f.licenseType.value = (s.license && s.license.type) || "";
      f.licenseChecked.value = s.license && s.license.checkedAt ? new Date(s.license.checkedAt).toISOString().slice(0, 10) : "";
      f.price.value = (s.price || []).map(function (r) { return r[0] + "｜" + r[1]; }).join("\n");
      f.plan.value = (s.plan || []).map(function (p) { return [p.t, p.d, p.opt].join("｜"); }).join("\n");
      f.images.value = (s.images || []).join("\n");
    }
    $("gFormBox").classList.remove("hidden"); $("gFormBox").scrollIntoView({ behavior: "smooth" });
  }
  $("gNew").onclick = function () { openForm(null); };
  $("gCancel").onclick = function () { $("gFormBox").classList.add("hidden"); };
  $("gMonth").onchange = loadVisits;
  $("gForm").onsubmit = async function (e) {
    e.preventDefault(); var f = e.target, b = { isNew: !editing };
    F.forEach(function (k) { if (f[k]) b[k] = f[k].value; });
    b.price = f.price.value.split("\n").map(function (l) { return l.split(/[｜|]/); }).filter(function (r) { return r.length >= 2; });
    b.plan = f.plan.value.split("\n").map(function (l) { var r = l.split(/[｜|]/); return { t: r[0] || "", d: r[1] || "", opt: r[2] || "" }; }).filter(function (p) { return p.t.trim(); });
    b.images = f.images.value.split("\n").map(function (x) { return x.trim(); }).filter(Boolean);
    try { await api("shop", { method: "POST", body: b }); $("gFormBox").classList.add("hidden"); msg(editing ? "保存しました。お店のページにすぐ反映されます。" : "登録しました。「承認・公開」を押すと一覧に出ます。", "ok"); load(); } catch (x) { $("gFormMsg").innerHTML = '<div class="msg err">' + E(x.message) + '</div>'; }
  };
  window.initGuideAdmin = function () { var d = new Date(Date.now() + 9 * 3600e3); $("gMonth").value = d.toISOString().slice(0, 7); load().catch(function (x) { msg(x.message); }); };
})();
