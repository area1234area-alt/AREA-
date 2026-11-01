/* 飲み屋のArea：トップの広告バナー（ヒーロー直下の枠）
   ・広告費をいただいているお店のバナーをここに足す。複数あると5秒ごとに横にスライドして切り替わる
   ・img：バナー画像（横長。今の枠は 1672×730 の形）、url：押したときの行き先（例 "umeda-c01.html"。空なら押しても飛ばない）
   ・until：掲載の最終日（この日を過ぎると自動で消える）。空なら期限なし
   ・1件もないときは「広告掲載店舗 募集中」の仮バナーが出る */
window.AREA_ADS = [
  { name: "VANCOOL", img: "img/ads/vancool.jpg", url: "", until: "" }   // 求人ページができたら url に入れる
];
window.AREA_LINE = "https://lin.ee/v7GLaD2";

/* ピックアップ（広告枠の下）。新店オープンなど、運営がおすすめするお店を大きく出す（広告ではない）
   ・video か img、url（求人ページ）、column（コラム記事。空ならボタンなし）、until（最終日。過ぎると消える） */
window.AREA_PICKUP = [
  { label: "NEW OPEN", area: "東京・池袋（西口・ロマンス通り）／キャバクラ", name: "Regent Club", kana: "リージェントクラブ",
    video: "img/regent/opening.mp4", img: "img/regent/main.jpg", pay: "時給 6,000円〜15,000円",
    text: "池袋プリンスグループ4号店。内装費1.4億円の大型高級店が2026年12月1日にオープン。オープニングキャストを募集しています。",
    url: "regent.html", column: "column/regent-club-ikebukuro.html", until: "2027-01-31" }
];
(function () {
  var sec = document.getElementById("pickupNew"), box = document.getElementById("puBox"); if (!sec || !box) return;
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };
  var today = new Date(); today.setHours(0, 0, 0, 0);
  var p = (window.AREA_PICKUP || []).filter(function (a) { return a && (!a.until || new Date(a.until + "T23:59:59") >= today); })[0];
  if (!p) return;
  box.innerHTML = '<div class="pu-h">PICK UP<b>' + esc(p.label || "注目") + '</b></div><div class="pu-body">' +
    (p.video ? '<a href="' + esc(p.url) + '" aria-label="' + esc(p.name) + 'の求人を見る"><video src="' + esc(p.video) + '" poster="' + esc(p.img || "") + '" autoplay muted loop playsinline preload="metadata"></video></a>' : '<a href="' + esc(p.url) + '"><img src="' + esc(p.img) + '" alt="' + esc(p.name) + '"></a>') +
    '<div class="pu-tx"><span class="pu-area">' + esc(p.area) + '</span><h3>' + esc(p.name) + (p.kana ? '<small>' + esc(p.kana) + '</small>' : '') + '</h3>' +
    (p.pay ? '<span class="pu-pay">' + esc(p.pay) + '</span>' : '') + '<p>' + esc(p.text) + '</p>' +
    '<div class="pu-btns"><a class="go" href="' + esc(p.url) + '">求人を見る</a>' + (p.column ? '<a class="col" href="' + esc(p.column) + '">コラムを読む</a>' : '') + '</div></div></div>';
  sec.hidden = false;
})();
(function () {
  var box = document.getElementById("areaAd"); if (!box) return;
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };
  var today = new Date(); today.setHours(0, 0, 0, 0);
  var ads = window.AREA_ADS.filter(function (a) { return a && a.img && (!a.until || new Date(a.until + "T23:59:59") >= today); });
  if (!ads.length) {
    box.classList.add("ph");
    box.innerHTML = '<a class="aa-ph" href="' + esc(window.AREA_LINE) + '" target="_blank" rel="noopener"><span class="aa-t">この枠に、<b>あなたのお店</b>を。</span><span class="aa-s">トップページの特別枠に、お店のバナーを掲載できます。</span><span class="aa-go">広告掲載のご相談 ›</span></a><span class="aa-pr">広告枠</span>';
    return;
  }
  box.innerHTML = '<div class="aa-track">' + ads.map(function (a) {
      return '<a' + (a.url ? ' href="' + esc(a.url) + '"' + (/^https?:/.test(a.url) ? ' target="_blank" rel="noopener sponsored"' : '') : '') + '><img src="' + esc(a.img) + '" alt="' + esc(a.name || "広告") + '"></a>';
    }).join("") + '</div><span class="aa-pr">PR</span>' +
    (ads.length > 1 ? '<div class="aa-dots">' + ads.map(function (a, i) { return '<i data-i="' + i + '"' + (i ? '' : ' class="on"') + '></i>'; }).join("") + '</div>' : '');
  if (ads.length < 2) return;
  var n = 0, track = box.querySelector(".aa-track"), dots = box.querySelectorAll(".aa-dots i"), timer;
  var go = function (i) { n = (i + ads.length) % ads.length; track.style.transform = "translateX(" + (-100 * n) + "%)"; [].forEach.call(dots, function (d, k) { d.classList.toggle("on", k === n); }); };
  var start = function () { clearInterval(timer); timer = setInterval(function () { go(n + 1); }, 5000); };
  [].forEach.call(dots, function (d) { d.addEventListener("click", function () { go(+d.dataset.i); start(); }); });
  var x0 = null, moved = false;
  box.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; moved = false; }, { passive: true });
  box.addEventListener("touchmove", function (e) { if (x0 !== null && Math.abs(e.touches[0].clientX - x0) > 10) moved = true; }, { passive: true });
  box.addEventListener("touchend", function (e) { if (x0 === null) return; var dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 40) { go(n + (dx < 0 ? 1 : -1)); start(); } x0 = null; });
  box.addEventListener("click", function (e) { if (moved) { e.preventDefault(); moved = false; } }, true);
  start();
})();
