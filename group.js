/* Area グループ店の表示
   グループ運営のお店は、店名の近くに必ずグループ名を出します（ネームバリューと安心感のため）。
   グループやお店が増えたら、下の一覧に足すだけで、求人ページ・一覧カードの両方に反映されます。 */
window.AREA_GROUPS = [
  { name: "カイザーグループ", en: "KAISER GROUP",
    urls: ["umeda-c07.html", "gion-c01.html", "gion-c04.html", "gion-c02.html", "gion-c05.html", "umeda-c03.html", "umeda-c04.html", "miyako-c01.html", "miyako-c02.html"] },
  { name: "INSOUグループ", en: "INSOU GROUP",
    urls: ["umeda-c01.html", "umeda-c08.html"] },
  // グループ名を出さない系列店（name を空にする）。shops は「系列店」として名前を出すお店
  { name: "", en: "", urls: ["lilith.html", "blanc.html"],
    shops: { "lilith.html": "Club Lilith", "blanc.html": "CLUB BLANC" } }
];
/* カードや店名バーに出す短い文字（グループ名、なければ「系列店：〇〇」） */
window.areaGroupLabel = function (url) {
  var g = window.areaGroupOf(url); if (!g) return "";
  if (g.name) return g.name;
  url = String(url || "").split("/").pop();
  var others = (g.urls || []).filter(function (u) { return u !== url; }).map(function (u) { return (g.shops || {})[u] || ""; }).filter(Boolean);
  return others.length ? "系列店：" + others.join("・") : "";
};
window.areaGroupOf = function (url) {
  url = String(url || "").split("/").pop().split("?")[0].split("#")[0];
  for (var i = 0; i < window.AREA_GROUPS.length; i++) if (window.AREA_GROUPS[i].urls.indexOf(url) >= 0) return window.AREA_GROUPS[i];
  return null;
};
/* 求人ページ：店名バーと、トップの店名の下にグループ名を入れる */
(function () {
  function run() {
    var g = window.areaGroupOf(location.pathname); if (!g) return;
    var here = location.pathname.split("/").pop(), label = window.areaGroupLabel(here);
    var css = '.grp-chip{display:table;font-size:10px;font-weight:700;letter-spacing:.06em;color:#1A1620;background:linear-gradient(90deg,#B8892B,#F6E3A8,#C9A227);border-radius:3px;padding:1px 6px;margin:1px 0 2px;line-height:1.5;white-space:nowrap}'
      + '.grp-line{margin:14px auto 0;text-align:center}'
      + '.grp-line b{display:inline-block;font-family:var(--font-serif,serif);font-size:13px;letter-spacing:.24em;color:#F1DA9C;border-top:1px solid rgba(201,162,39,.55);border-bottom:1px solid rgba(201,162,39,.55);padding:6px 14px}'
      + '.grp-line small{display:block;font-size:12px;color:#cfc3b2;margin-top:6px;letter-spacing:.04em}';
    var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    var sub = document.querySelector('.shop-name span');
    if (sub && g.name && !sub.querySelector('.grp-chip')) {
      // 1行に収まるよう、住所は「エリア ／ 業種」だけに短くしてからグループ名を前に付ける
      var t = sub.textContent.replace(/\u200B/g, '').replace(/^(東京都|北海道|大阪府|京都府|\S{2,3}県)\s*/, '').replace(/^\S+[市区町村]\s*/, '').replace(/（[^）]*）/g, '').replace(/\s+/g, ' ').trim();
      sub.innerHTML = '<b class="grp-chip">' + g.name + '</b>' + t;
      window.dispatchEvent(new Event('resize'));   // 文字の大きさを合わせ直す（textfit.js）
    }
    var t = document.querySelector('.shop-title'), orn = t && t.querySelector('.orn');
    if (t && !t.querySelector('.grp-line')) {
      var d = document.createElement('div'); d.className = 'grp-line';
      if (g.name) d.innerHTML = '<b>' + g.en + '</b><small>' + g.name + ' 運営のお店です</small>';
      else {
        var links = (g.urls || []).filter(function (u) { return u !== here; }).map(function (u) { return '<a href="' + u + '" style="color:#F1DA9C">' + ((g.shops || {})[u] || u) + '</a>'; }).join('・');
        d.innerHTML = '<b>SISTER SHOP</b><small>系列店：' + links + '</small>';
      }
      orn ? t.insertBefore(d, orn) : t.appendChild(d);
    }
  }
  if (!document.querySelector('.shop-bar')) return;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run); else run();
})();
