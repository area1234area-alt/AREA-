/* Area 遊ぶ：このお店に行く（紹介IDの発行） */
(function () {
  var box = document.getElementById("go"); if (!box) return;
  var shop = box.dataset.shop, settai = !!box.dataset.settai, out = document.getElementById("goOut"), btn = document.getElementById("goBtn"), num = 2;
  function esc(s){ return String(s).replace(/[&<>"]/g, function(c){ return { "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;" }[c]; }); }
  function jstHour(){ return new Date(Date.now() + 9 * 3600e3).getUTCHours(); }
  var KEY = "asobu-go-" + shop;
  function planText(){
    var r = box.querySelector('input[name="plan"]:checked'); if (!r) return "";
    var o = box.querySelector('[data-opt="' + r.value + '"]');
    return r.dataset.t + "（" + r.dataset.d + "）" + (o && o.checked ? "＋" + o.dataset.o.replace(/をご希望の場合.*$/, "") : "");
  }
  // 選んでいないプランのオプションは外す
  [].forEach.call(box.querySelectorAll('input[name="plan"]'), function (r) { r.onchange = function () { [].forEach.call(box.querySelectorAll("[data-opt]"), function (c) { if (c.dataset.opt !== r.value) c.checked = false; }); }; });
  [].forEach.call(box.querySelectorAll("[data-opt]"), function (c) { c.onchange = function () { if (c.checked) { var r = box.querySelector('input[name="plan"][value="' + c.dataset.opt + '"]'); if (r) { r.checked = true; r.onchange(); } } }; });
  function show(t){
    box.querySelector(".go-body").hidden = true;
    var left = Math.max(0, Math.round((t.expires - Date.now()) / 60000));
    out.innerHTML = '<div class="ticket"><div class="t-k">紹介ID</div><div class="t-id">' + esc(t.id) + '</div>'
      + (t.plan ? '<div class="t-plan">' + esc(t.plan) + '</div>' : '') + '<div class="t-d">' + esc(t.name) + '・' + t.people + '名／あと' + Math.floor(left / 60) + '時間' + (left % 60) + '分 有効</div></div>'
      + '<ol class="t-how"><li>お店に入ったら「<b>Areaを見ました</b>」と伝える</li><li>この画面の<b>紹介ID</b>を見せる（選んだプランもお店に伝わります）</li></ol>'
      + '<p class="t-note">この画面はスクリーンショットしておくと安心です。</p>';
  }
  try { var saved = JSON.parse(localStorage.getItem(KEY) || "null"); if (saved && saved.expires > Date.now()) show(saved); } catch (e) {}
  if (settai && jstHour() < 6) { box.querySelector(".go-body").hidden = true; out.innerHTML = '<p class="t-note">0時〜6時は、このお店の紹介IDは発行していません。</p>'; }
  [].forEach.call(box.querySelectorAll("[data-n]"), function (b) { b.onclick = function () { num = +b.dataset.n; [].forEach.call(box.querySelectorAll("[data-n]"), function (x) { x.classList.toggle("on", x === b); }); }; });
  btn.onclick = async function () {
    btn.disabled = true; btn.textContent = "発行しています…";
    try {
      var r = await fetch("/api/visit", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ shop: shop, people: num, plan: planText(), src: "web" }) });
      var d = await r.json().catch(function(){ return {}; });
      if (!r.ok) throw new Error(d.error || "発行できませんでした。時間をおいてお試しください。");
      if (!d.plan) d.plan = planText();
      try { localStorage.setItem(KEY, JSON.stringify(d)); } catch (e) {}
      show(d);
    } catch (e) { out.innerHTML = '<p class="t-err">' + esc(e.message) + '</p>'; btn.disabled = false; btn.textContent = "紹介IDをもらう"; }
  };
  if (location.hash === "#go") setTimeout(function(){ box.scrollIntoView({ behavior: "smooth", block: "start" }); }, 200);
})();
