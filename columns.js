/* Area 最新店舗コラム集
   新しいコラムを書いたら、AREA_COLUMNS のいちばん上に1行足すだけでトップとコラム一覧に出ます。
   region: "kansai"（関西）／"kanto"（関東）／"special"（特集：石垣島・宮古島などのリゾート。関西・関東の両方に出る）
   date から7日以内のコラムには「NEW」が付きます。 */
window.AREA_COLUMNS = [
  { url: "column/umeda-ajito.html", region: "kansai", area: "梅田", shop: "AJITO", date: "2026-11-17", img: "img/umeda-c04/main.jpg",
    title: "指名を取っても、時給が変わらない…そんな人に知ってほしい梅田「AJITO」" },
  { url: "column/gion-hanakomachi.html", region: "kansai", area: "祇園", shop: "華小町", date: "2026-11-17", img: "img/gion-c04/g01.jpg",
    title: "祇園で働くのは不安…そんな人ほど「華小町」を選んでほしい理由" },
  { url: "column/minami-arrow.html", region: "kansai", area: "ミナミ", shop: "club ARROW", date: "2026-11-15", img: "img/minami-c07/main.jpg",
    title: "時給か売上60％か、高いほうがもらえる。ミナミの「club ARROW」はどんなお店？" },
  { url: "column/umeda-bijinchaya.html", region: "kansai", area: "梅田", shop: "美人茶屋 梅田", date: "2026-11-15", img: "img/umeda-c08/main.jpg",
    title: "桜の和モダン空間で働く。梅田の高級キャバクラ「美人茶屋 梅田」はどんなお店？" },
  { url: "column/umeda-vancool.html", region: "kansai", area: "梅田", shop: "VANCOOL", date: "2026-11-12", img: "img/umeda-c07/main.jpg",
    title: "15時から働ける梅田の高級キャバクラ。「VANCOOL」はどんなお店？" },
  { url: "column/nipponbashi-aromaone.html", region: "kansai", area: "日本橋", shop: "アロマワン", date: "2026-11-11", img: "",
    title: "未経験からメンズエステを始めるなら。日本橋「アロマワン」が講習に力を入れる理由" },
  { url: "column/miyakojima-resort.html", region: "special", area: "沖縄・宮古島", shop: "リゾートキャバクラ", date: "2026-11-10", img: "img/miyako-c01/g01.jpg",
    title: "冬こそ南の島へ。宮古島のリゾートキャバクラで働くってどんな感じ？" },
  { url: "column/minami-cross.html", region: "kansai", area: "ミナミ", shop: "CLUB CROSS", date: "2026-11-10", img: "img/minami-k01/main.jpg",
    title: "キャバクラが合わなかった人へ。ミナミのクラブ「CLUB CROSS」で働くってどんな感じ？" },
  { url: "column/umeda-fama.html", region: "kansai", area: "梅田", shop: "fama", date: "2026-11-10", img: "img/umeda-s01/main.jpg",
    title: "20代が中心の、梅田・兎我野町のガールズラウンジ「fama」で働くってどんな感じ？" },
  { url: "column/gion-4shops.html", region: "kansai", area: "祇園", shop: "祇園4店", date: "2026-11-01", img: "img/gion/feature.jpg",
    title: "祇園でキャバクラを探すなら知っておきたい4店" },
  { url: "column/regent-club-ikebukuro.html", region: "kanto", area: "池袋", shop: "Regent Club", date: "2026-11-01", img: "",
    title: "池袋に1.4億円の大型新店「Regent Club」が12月オープン。お給料のしくみと、向いている人をまとめました" }
];

(function () {
  var NEW_DAYS = 7;
  var css = ''
    + '.cl-tabs{display:flex;justify-content:center;gap:8px;margin:0 0 18px}'
    + '.cl-tabs button{font:inherit;font-weight:700;font-size:.9rem;padding:9px 22px;border-radius:999px;border:1px solid rgba(201,162,39,.55);background:transparent;color:#cfc3b2;cursor:pointer}'
    + '.cl-tabs button[aria-selected="true"]{background:linear-gradient(135deg,#B8892B,#F1DA9C 55%,#C9A227);color:#1a1408;border-color:transparent}'
    + '.cl-list{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:14px}'
    + '.cl-card{display:flex;flex-direction:column;min-width:0;text-decoration:none;color:inherit;border:1px solid rgba(201,162,39,.35);background:#141116;border-radius:12px;overflow:hidden}'
    + '.cl-img{position:relative;aspect-ratio:16/10;background:radial-gradient(circle at 50% 40%,#2a2016,#0b0a0d 70%);display:grid;place-items:center;overflow:hidden}'
    + '.cl-img img{width:100%;height:100%;object-fit:cover;display:block}'
    + '.cl-img .cl-ph{font-family:"Noto Serif JP",serif;color:#F1DA9C;font-size:1.3rem;letter-spacing:.08em;padding:0 12px;text-align:center}'
    + '.cl-badges{position:absolute;left:8px;top:8px;display:flex;gap:6px}'
    + '.cl-badge{font-size:.68rem;font-weight:800;letter-spacing:.08em;padding:3px 8px;border-radius:4px;line-height:1.3}'
    + '.cl-badge.new{background:#E0272F;color:#fff}'
    + '.cl-badge.sp{background:linear-gradient(135deg,#0E7C86,#3FC1C9);color:#fff}'
    + '.cl-body{padding:12px 14px 14px;display:flex;flex-direction:column;gap:6px}'
    + '.cl-meta{font-size:.72rem;color:#C9A227;letter-spacing:.04em}'
    + '.cl-title{font-size:.95rem;font-weight:700;line-height:1.55;color:#F4ECE0;margin:0}'
    + '.cl-date{font-size:.7rem;color:#9a9088}'
    + '.cl-empty{text-align:center;color:#9a9088;padding:24px 0}'
    + '@media (max-width:600px){.cl-list{grid-template-columns:1fr;gap:10px}.cl-card{flex-direction:row}.cl-img{flex:0 0 38%;aspect-ratio:1/1}.cl-body{padding:10px 12px;min-width:0}.cl-title{font-size:.86rem}.cl-img .cl-ph{font-size:.95rem}}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  function isNew(d) {
    var t = new Date(d + 'T00:00:00+09:00').getTime();
    return !isNaN(t) && (Date.now() - t) < NEW_DAYS * 86400000;
  }
  function esc(s) { return String(s || '').replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function fmt(d) { return d.replace(/-/g, '.'); }

  function list(region) {
    var all = (window.AREA_COLUMNS || []).slice();
    var sp = all.filter(function (c) { return c.region === 'special'; });
    var rg = all.filter(function (c) { return c.region === region; });
    var byDate = function (a, b) { return a.date < b.date ? 1 : a.date > b.date ? -1 : 0; };
    sp.sort(byDate); rg.sort(byDate);
    return sp.concat(rg);   // 特集はどちらの地域でも先頭に出す
  }

  function card(c, base) {
    var b = '';
    if (c.region === 'special') b += '<span class="cl-badge sp">特集</span>';
    if (isNew(c.date)) b += '<span class="cl-badge new">NEW</span>';
    var img = c.img ? '<img src="' + base + esc(c.img) + '" alt="" loading="lazy">' : '<span class="cl-ph">' + esc(c.shop) + '</span>';
    return '<a class="cl-card" href="' + base + esc(c.url) + '">'
      + '<div class="cl-img">' + img + (b ? '<div class="cl-badges">' + b + '</div>' : '') + '</div>'
      + '<div class="cl-body"><span class="cl-meta">' + esc(c.area) + '｜' + esc(c.shop) + '</span>'
      + '<p class="cl-title">' + esc(c.title) + '</p><span class="cl-date">' + fmt(c.date) + '</span></div></a>';
  }

  /* el: 差し込む要素／opts.limit: 表示件数／opts.base: リンクの前に付けるパス（コラムフォルダ内なら "../"） */
  window.areaRenderColumns = function (el, opts) {
    if (!el) return;
    opts = opts || {};
    var base = opts.base || '';
    var rg = window.AREA_REGION; if (!rg) { try { rg = localStorage.getItem('areaRegion'); } catch (e) {} }
    var start = rg === 'kanto' ? 'kanto' : 'kansai';
    el.innerHTML = '<div class="cl-tabs" role="tablist">'
      + '<button type="button" role="tab" data-r="kansai">関西</button>'
      + '<button type="button" role="tab" data-r="kanto">関東</button></div>'
      + '<div class="cl-list" role="tabpanel"></div>';
    var box = el.querySelector('.cl-list');
    function show(r) {
      el.querySelectorAll('.cl-tabs button').forEach(function (b) { b.setAttribute('aria-selected', String(b.dataset.r === r)); });
      var items = list(r);
      if (opts.limit) items = items.slice(0, opts.limit);
      box.innerHTML = items.length ? items.map(function (c) { return card(c, base); }).join('') : '<p class="cl-empty">コラムは準備中です。</p>';
    }
    el.querySelectorAll('.cl-tabs button').forEach(function (b) { b.addEventListener('click', function () { show(b.dataset.r); }); });
    show(start);
  };
})();
