/* NIGHT STYLE 最新店舗コラム集
   新しいコラムを書いたら、AREA_COLUMNS のいちばん上に1行足すだけでトップとコラム一覧に出ます。
   region: "kansai"（関西）／"kanto"（関東）／"special"（特集：石垣島・宮古島などのリゾート。関西・関東の両方に出る）
   hook はカードに大きく出す短いひとこと。「|」で改行位置を決める（スマホで1行8字まで・3行まで）。
   date から7日以内のコラムには「NEW」が付きます。 */
window.AREA_COLUMNS = [
  { url: "column/ueno-luxor.html", hook: "上野で選ぶなら|まず広さを見て", region: "kanto", area: "上野", shop: "Club LUXOR", date: "2026-11-18", img: "img/ueno-c11/main.jpg",
    title: "上野で働くなら、まず“お店の広さ”を見て。70坪の「Club LUXOR」" },
  { url: "column/akiba-hugmo.html", hook: "安いのに稼げる、|はありえない", region: "kanto", area: "秋葉原", shop: "HUGMO", date: "2026-11-18", img: "img/akiba-cf01/main.jpg",
    title: "安いのに稼げる、はありえない。秋葉原のコンカフェ「HUGMO」が稼げる理由" },
  { url: "column/umeda-ajito.html", hook: "指名を取るほど|時給1万円へ", region: "kansai", area: "梅田", shop: "AJITO", date: "2026-11-17", img: "img/umeda-c04/main.jpg",
    title: "指名を取っても、時給が変わらない…そんな人に知ってほしい梅田「AJITO」" },
  { url: "column/gion-hanakomachi.html", hook: "祇園が不安な|人ほど、ここ", region: "kansai", area: "祇園", shop: "華小町", date: "2026-11-17", img: "img/gion-c04/g01.jpg",
    title: "祇園で働くのは不安…そんな人ほど「華小町」を選んでほしい理由" },
  { url: "column/minami-arrow.html", hook: "時給か売上|60％の高い方", region: "kansai", area: "ミナミ", shop: "club ARROW", date: "2026-11-15", img: "img/minami-c07/main.jpg",
    title: "時給か売上60％か、高いほうがもらえる。ミナミの「club ARROW」はどんなお店？" },
  { url: "column/umeda-bijinchaya.html", hook: "桜と朱色の|和モダンで働く", region: "kansai", area: "梅田", shop: "美人茶屋 梅田", date: "2026-11-15", img: "img/umeda-c08/main.jpg",
    title: "桜の和モダン空間で働く。梅田の高級キャバクラ「美人茶屋 梅田」はどんなお店？" },
  { url: "column/umeda-vancool.html", hook: "15時から働ける|高級店", region: "kansai", area: "梅田", shop: "VANCOOL", date: "2026-11-12", img: "img/umeda-c07/main.jpg",
    title: "15時から働ける梅田の高級キャバクラ。「VANCOOL」はどんなお店？" },
  { url: "column/nipponbashi-aromaone.html", hook: "未経験は|講習で決まる", region: "kansai", area: "日本橋", shop: "アロマワン", date: "2026-11-11", img: "",
    title: "未経験からメンズエステを始めるなら。日本橋「アロマワン」が講習に力を入れる理由" },
  { url: "column/miyakojima-resort.html", hook: "冬こそ|南の島で稼ぐ", region: "special", area: "沖縄・宮古島", shop: "リゾートキャバクラ", date: "2026-11-10", img: "img/miyako-c01/g01.jpg",
    title: "冬こそ南の島へ。宮古島のリゾートキャバクラで働くってどんな感じ？" },
  { url: "column/minami-cross.html", hook: "キャバが|合わなかった|人へ", region: "kansai", area: "ミナミ", shop: "CLUB CROSS", date: "2026-11-10", img: "img/minami-k01/main.jpg",
    title: "キャバクラが合わなかった人へ。ミナミのクラブ「CLUB CROSS」で働くってどんな感じ？" },
  { url: "column/umeda-fama.html", hook: "20代中心の|ラウンジって？", region: "kansai", area: "梅田", shop: "fama", date: "2026-11-10", img: "img/umeda-s01/main.jpg",
    title: "20代が中心の、梅田・兎我野町のガールズラウンジ「fama」で働くってどんな感じ？" },
  { url: "column/gion-4shops.html", hook: "祇園の|注目4店を比較", region: "kansai", area: "祇園", shop: "祇園4店", date: "2026-11-01", img: "img/gion/feature.jpg",
    title: "祇園でキャバクラを探すなら知っておきたい4店" },
  { url: "column/regent-club-ikebukuro.html", hook: "池袋に|1.4億円の新店", region: "kanto", area: "池袋", shop: "Regent Club", date: "2026-11-01", img: "",
    title: "池袋に1.4億円の大型新店「Regent Club」が12月オープン。お給料のしくみと、向いている人をまとめました" }
];

(function () {
  var NEW_DAYS = 7;
  var G = 'linear-gradient(135deg,#F2A7C3,#F8C6D8 30%,#FDE7F0 50%,#D8C8F6 72%,#F2A7C3)';
  var css = ''
    + '.cl-tabs{display:flex;justify-content:center;gap:8px;margin:0 0 16px}'
    + '.cl-tabs button{font:inherit;font-weight:700;font-size:.92rem;min-width:96px;padding:9px 18px;border-radius:999px;border:1px solid rgba(224,127,163,.55);background:transparent;color:#46405A;cursor:pointer}'
    + '.cl-tabs button[aria-selected="true"]{background:' + G + ';color:#46405A;border-color:transparent}'
    + '.cl-tabs button:focus-visible,.cl-card:focus-visible,.cl-more:focus-visible{outline:2px solid #8A73D1;outline-offset:2px}'
    /* スマホ：横に3つ。写真＋短いひとこと（hook）だけにして、字は小さくしすぎない */
    + '.cl-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}'
    + '.cl-card{display:flex;flex-direction:column;min-width:0;text-decoration:none;color:inherit;border:1px solid rgba(224,127,163,.35);background:#FFFFFF;border-radius:10px;overflow:hidden;transition:transform .15s,border-color .15s}'
    + '.cl-card:hover{transform:translateY(-2px);border-color:rgba(241,218,156,.9)}'
    + '.cl-img{position:relative;aspect-ratio:1/1;background:radial-gradient(circle at 50% 40%,#FFEFF5,#FFFFFF 70%);display:grid;place-items:center;overflow:hidden}'
    + '.cl-img img{width:100%;height:100%;object-fit:cover;display:block}'
    + '.cl-img .cl-ph{font-family:"Zen Maru Gothic","Noto Serif JP",serif;color:#8A73D1;font-size:.95rem;letter-spacing:.04em;padding:0 6px;text-align:center;line-height:1.4}'
    + '.cl-badges{position:absolute;left:5px;top:5px;display:flex;flex-wrap:wrap;gap:4px}'
    + '.cl-badge{font-size:.62rem;font-weight:800;letter-spacing:.06em;padding:2px 6px;border-radius:3px;line-height:1.3;box-shadow:0 1px 4px rgba(150,110,160,.16)}'
    + '.cl-badge.new{background:#E0272F;color:#fff}'
    + '.cl-badge.sp{background:linear-gradient(135deg,#0E7C86,#3FC1C9);color:#fff}'
    + '.cl-body{padding:7px 7px 9px;display:flex;flex-direction:column;gap:3px;flex:1}'
    + '.cl-meta{font-size:.66rem;color:#E07FA3;letter-spacing:.02em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}'
    + '.cl-hook{font-size:min(.82rem,3.25vw);font-weight:800;line-height:1.5;color:#46405A;margin:0;letter-spacing:0}'
    + '.cl-hook .cl-l{display:block;white-space:nowrap}'
    + '.cl-title,.cl-foot,.cl-shop{display:none}'
    + '.cl-more{display:flex;align-items:center;justify-content:center;gap:6px;margin:16px auto 0;max-width:420px;padding:13px 16px;border-radius:999px;border:1px solid rgba(224,127,163,.75);color:#8A73D1;font-weight:700;text-decoration:none;font-size:.92rem}'
    + '.cl-more b{color:#fff}'
    + '.cl-empty{grid-column:1/-1;text-align:center;color:#9a9088;padding:24px 0}'
    /* PC：横に2つ。写真を左、ひとこと＋タイトル＋「読む」を右に */
    + '@media (min-width:700px){'
    + '.cl-list{grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}'
    + '.cl-card{flex-direction:row;border-radius:12px}'
    + '.cl-img{flex:0 0 40%;aspect-ratio:4/3}'
    + '.cl-badges{left:8px;top:8px;gap:6px}.cl-badge{font-size:.7rem;padding:3px 8px}'
    + '.cl-body{padding:14px 16px;gap:6px;min-width:0}'
    + '.cl-meta{font-size:.74rem}.cl-shop{display:inline}'
    + '.cl-hook{font-family:"Zen Maru Gothic","Noto Serif JP",serif;font-size:1.12rem;color:#8A73D1;letter-spacing:.02em}'
    + '.cl-hook .cl-l{display:inline;white-space:normal}'
    + '.cl-title{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;font-size:.86rem;font-weight:500;line-height:1.6;color:#D9D1C6;margin:0}'
    + '.cl-foot{display:flex;align-items:center;justify-content:space-between;margin-top:auto;padding-top:6px}'
    + '.cl-date{font-size:.72rem;color:#9a9088}'
    + '.cl-read{font-size:.8rem;font-weight:700;color:#46405A;background:' + G + ';border-radius:999px;padding:5px 14px}'
    + '}';
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
    return '<a class="cl-card" href="' + base + esc(c.url) + '" aria-label="' + esc(c.title) + '">'
      + '<div class="cl-img">' + img + (b ? '<div class="cl-badges">' + b + '</div>' : '') + '</div>'
      + '<div class="cl-body"><span class="cl-meta">' + esc(c.area) + '<span class="cl-shop">｜' + esc(c.shop) + '</span></span>'
      + '<p class="cl-hook">' + String(c.hook || c.title).split('|').map(function (l) { return '<span class="cl-l">' + esc(l) + '</span>'; }).join('') + '</p>'
      + '<p class="cl-title">' + esc(c.title) + '</p>'
      + '<div class="cl-foot"><span class="cl-date">' + fmt(c.date) + '</span><span class="cl-read">読む →</span></div></div></a>';
  }

  /* el: 差し込む要素／opts.limit: 表示件数／opts.base: リンクの前に付けるパス（コラムフォルダ内なら "../"）／opts.more: 「すべて見る」のリンク先 */
  window.areaRenderColumns = function (el, opts) {
    if (!el) return;
    opts = opts || {};
    var base = opts.base || '';
    var rg = window.AREA_REGION; if (!rg) { try { rg = localStorage.getItem('areaRegion'); } catch (e) {} }
    var start = rg === 'kanto' ? 'kanto' : 'kansai';
    var NAME = { kansai: '関西', kanto: '関東' };
    el.innerHTML = '<div class="cl-tabs" role="tablist">'
      + '<button type="button" role="tab" data-r="kansai">関西</button>'
      + '<button type="button" role="tab" data-r="kanto">関東</button></div>'
      + '<div class="cl-list" role="tabpanel"></div>'
      + (opts.more ? '<a class="cl-more" href="' + esc(opts.more) + '"></a>' : '');
    var box = el.querySelector('.cl-list'), more = el.querySelector('.cl-more');
    function show(r) {
      el.querySelectorAll('.cl-tabs button').forEach(function (b) { b.setAttribute('aria-selected', String(b.dataset.r === r)); });
      var all = list(r), items = opts.limit ? all.slice(0, opts.limit) : all;
      box.innerHTML = items.length ? items.map(function (c) { return card(c, base); }).join('') : '<p class="cl-empty">コラムは準備中です。</p>';
      if (more) {
        var rest = all.length - items.length;
        more.innerHTML = rest > 0 ? 'ほかの' + NAME[r] + 'のコラムも読む <b>あと' + rest + '本</b> →' : NAME[r] + 'のコラムをすべて見る →';
      }
    }
    el.querySelectorAll('.cl-tabs button').forEach(function (b) { b.addEventListener('click', function () { show(b.dataset.r); }); });
    show(start);
  };
})();
