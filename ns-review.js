/* NIGHT STYLE 口コミの読み込み
   ・口コミの表示は「Areaで承認済みの口コミ（Googleのフォーム側）」と「NIGHT STYLEで承認した口コミ」を合わせて出す
   ・各ページは /review/write.html?view=reviews を読みに行くので、ここで2か所から集めて1つにまとめて返す
   ・口コミを書くボタンは /review/write.html（NIGHT STYLE専用の投稿フォーム）へ */
(function () {
  var GAS = "https://script.google.com/macros/s/AKfycbxV6TXowRKiK_Z6MVrdsMwkZdnJ622lR388-dIBGZJud2FyxwcCpaUfUpmw1szI2lg/exec";
  var orig = window.fetch.bind(window);
  var get = function (u) { return orig(u).then(function (r) { return r.json(); }).catch(function () { return { rows: [] }; }); };
  var cache = null;
  window.fetch = function (input, init) {
    var u = typeof input === "string" ? input : (input && input.url) || "";
    if (/\/review\/write\.html\?view=reviews/.test(u)) {
      if (!cache) cache = Promise.all([get("/api/ns-review?view=reviews"), get(GAS + "?view=reviews")]).then(function (x) {
        return { ok: true, rows: (x[0].rows || []).concat(x[1].rows || []) };
      });
      return cache.then(function (d) { return new Response(JSON.stringify(d), { headers: { "content-type": "application/json" } }); });
    }
    return orig(input, init);
  };
})();
// 求人ページの「このお店の口コミを書く」に店名を付けて、フォームで最初から入った状態にする
document.addEventListener("DOMContentLoaded", function () {
  var n = document.querySelector(".shop-name strong");
  if (!n) return;
  var name = (n.firstChild && n.firstChild.nodeType === 3 ? n.firstChild.textContent : n.textContent).replace(/​/g, "").trim();
  var area = (document.querySelector(".shop-name span") || {}).textContent || "";
  area = area.split(/[／/]/)[0].trim();
  [].forEach.call(document.querySelectorAll('a[href="/review/write.html"]'), function (a) {
    a.href = "/review/write.html?shop=" + encodeURIComponent(name) + (area ? "&area=" + encodeURIComponent(area) : "");
  });
});
