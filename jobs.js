/* Areaの求人データ（トップページとエリア一覧ページの両方がここを読みます）
   求人を増やすときは、この一覧に1件足すだけでOK。
   area（地域名）と type（職種）が、エリア・職種ボタンの名前と同じなら自動でその一覧に出ます。 */
window.AREA_JOBS = [
  { name: "club Lilith（リリス）", type: "キャバクラ", area: "梅田", address: "大阪府 大阪市 堂山町",
    pay: "時給制＋各種バック", trial: true, url: "lilith.html", photo: "img/lilith/photo1.jpg", // photo＝カードの右に出る写真
    // ↓ 大阪の求人一覧（osaka.html）で使う詳しい情報
    pickup: true, banner: "", kana: "リリス", pref: "大阪府", city: "大阪市",
    catchCopy: "週1日・1日3時間から。はじめての方も体験入店から始められるキャバクラ",
    hours: "20:00〜LAST（1日3時間〜OK・終電上がりOK）", station: "大阪メトロ谷町線「中崎町駅」徒歩4分",
    transport: "要確認", qualify: "18歳以上（高校生不可）・未経験歓迎・経験者優遇・Wワーク歓迎",
    payDetail: "時給制＋各種バック（金額は面接時に確認）／未経験の方は時給保証あり／体験入店の日は当日全額払い",
    tags: ["即日体験入店OK", "未経験歓迎", "日払いOK", "ノルマなし", "送りあり", "レンタルドレス", "履歴書不要", "週1日〜OK", "Wワーク歓迎"],
    features: ["シフトは1週間ごとの自己申告制", "終電後は車での送りあり", "手ぶらで体験入店OK（ドレス・ロッカーあり）"],
    tel: "09063988010", line: "", reviewKey: "lilith|リリス", added: "2026-10-12" },
  { name: "CLUB BLANC（ブラン）", nameEn: "Club Blanc", kana: "ブラン", type: "キャバクラ", area: "梅田", address: "大阪府 大阪市 堂山町",
    pay: "お店に確認中", url: "blanc.html", photo: "img/blanc/main.jpg", logoInPhoto: true, pickup: true, pref: "大阪府", city: "大阪市",
    catchCopy: "黒とダークグレーでまとめた、シックで落ち着いた店内のキャバクラ",
    hours: "営業時間 19:00〜LAST", station: "東梅田駅・梅田駅・中崎町駅 徒歩圏内", transport: "要確認",
    qualify: "18歳以上（高校生不可）", payDetail: "お店に確認中（面接時に確認）", tags: [],
    features: ["黒・ダークグレー基調のシックな店内", "テーブル11卓", "定休日：火曜日"],
    tel: "0643015115", reviewKey: "blanc|ブラン", added: "2026-10-12" },
  { name: "Candy Pop（キャンディーポップ）", nameEn: "Candy Pop", kana: "キャンディーポップ", type: "キャバクラ", area: "梅田", address: "大阪府 大阪市 堂山町",
    pay: "お店に確認中", url: "candy.html", photo: "img/candy/main.jpg", logoInPhoto: true, pickup: true, pref: "大阪府", city: "大阪市",
    catchCopy: "ミニドレスでお迎えする、きれいで快適な店内のキャバクラ",
    hours: "営業時間 19:00〜LAST", station: "東梅田駅・梅田駅・中崎町駅 徒歩圏内", transport: "要確認",
    qualify: "18歳以上（高校生不可）", payDetail: "お店に確認中（面接時に確認）", tags: [],
    features: ["きれいで快適な店内・分煙", "テーブル7卓", "衣装はミニドレス"],
    tel: "0665850181", reviewKey: "candy ?pop|キャンディ", added: "2026-10-12" },
  { name: "club 華門（昼の部）", nameEn: "Club Kamon", kana: "華門・昼の部", type: "昼キャバ", area: "梅田", address: "大阪府 大阪市 堂山町",
    pay: "お店に確認中", url: "kamon.html", photo: "img/kamon/main.jpg", logoInPhoto: true, pickup: true, pref: "大阪府", city: "大阪市",
    catchCopy: "13:30〜21:00、お昼の時間に働ける和モダンの昼キャバ",
    hours: "営業時間 13:30〜21:00", station: "梅田駅・大阪駅・中崎町駅 徒歩圏内", transport: "要確認",
    qualify: "18歳以上（高校生不可）", payDetail: "お店に確認中（面接時に確認）", tags: [],
    features: ["お昼から夕方に働ける", "和モダンの店内・VIPルームあり", "定休日：月曜日"],
    tel: "0647928802", reviewKey: "華門|カモン|kamon", added: "2026-10-12" },
  { name: "梅田のキャバクラ", type: "キャバクラ", area: "梅田", address: "大阪府 大阪市", pay: "2万5千円〜3万円" },
  { name: "北新地のキャバクラ", type: "キャバクラ", area: "北新地", address: "大阪府 大阪市", pay: "3万5千円〜5万円" },
  { name: "梅田のキャバクラ", type: "キャバクラ", area: "梅田", address: "大阪府 大阪市", pay: "2万5千円〜2万8千円" },
  { name: "梅田のセクキャバ", type: "セクキャバ", area: "梅田", address: "大阪府 大阪市", pay: "2万8千円〜3万5千円" },
  { name: "梅田のセクキャバ", type: "セクキャバ", area: "梅田", address: "大阪府 大阪市", pay: "" }
];

/* 求人カードのHTMLを作る（両ページ共通） */
window.areaJobCard = function (j) {
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
  // 写真がある求人：雑誌風（写真の後ろにずらした金の額縁＋縦書きのエリア・職種）
  if (j.photo || j.url) {
    var href = j.url ? ' href="' + esc(j.url) + '"' : '';
    // 縦書きは1文字ずつ縦に積む（端末によって文字が重なるのを防ぐ）
    var tate = function (s) { return Array.from(String(s || "")).map(function (c) { return '<i>' + esc(c) + '</i>'; }).join(""); };
    var en = j.nameEn || String(j.name).replace(/（.*?）|\(.*?\)/g, "").trim();
    var kana = j.kana || ((String(j.name).match(/（(.*?)）/) || [])[1] || "");
    return '<div class="job-card photo-card">' +
      '<a class="dc-pw"' + href + '><span class="dc-ph' + (j.photo ? '' : ' noimg') + (j.logoInPhoto ? ' logo' : '') + '">' + (j.photo ? '<img src="' + esc(j.photo) + '" alt="' + esc(j.name) + 'の店内" loading="lazy">' : '<span class="dc-noimg">画像準備中</span>') + '</span>' +
        '<span class="dc-tate' + (j.logoInPhoto ? ' right' : '') + '">' + tate(j.area) + '<i class="dot"></i>' + tate(j.type) + '</span>' +
        (j.logoInPhoto ? (j.trial ? '<span class="dc-over"><span class="dc-badge">体験入店あり</span></span>' : '') :
        '<span class="dc-over">' + (j.trial ? '<span class="dc-badge">体験入店あり</span>' : '') +
          '<span class="dc-name">' + esc(en) + '</span>' +
          (kana ? '<span class="dc-kana">' + esc(kana) + '</span>' : '') + '</span>') + '</a>' +
      '<div class="dc-in dc-bottom">' +
        '<dl class="dc-dl">' +
          '<div><dt>給与</dt><dd>' + esc(j.pay || "確認中") + '</dd></div>' +
          (j.hours ? '<div><dt>勤務</dt><dd>' + esc(String(j.hours).split("（")[0]) + '</dd></div>' : '') +
          (j.station ? '<div><dt>最寄</dt><dd>' + esc(j.station) + '</dd></div>' : '') +
        '</dl>' +
        ((j.tags || []).length ? '<div class="dc-tags">' + j.tags.slice(0, 4).map(function (t) { return '<span>' + esc(t) + '</span>'; }).join("") + '</div>' : '') +
        (j.url ? '<a class="dc-btn" href="' + esc(j.url) + '"><span>詳しく見る</span></a>' : '<span class="dc-btn off"><span>準備中</span></span>') +
      '</div></div>';
  }
  return '<div class="job-card' + (j.photo ? ' has-photo' : '') + '"><div class="job-body">' +
    '<div class="job-tags"><span class="tag">' + esc(j.type) + '</span>' + (j.trial ? '<span class="tag gold">体験入店あり</span>' : '') + '</div>' +
    '<h3>' + esc(j.name) + '</h3>' +
    '<div class="area">' + esc(j.address) + ' ' + esc(j.area) + '</div>' +
    (j.pay ? '<div class="pay">' + esc(j.pay) + '</div>' : '<div class="pay pay-ask">給与は確認中です</div>') +
    (j.url ? '<a class="job-detail-link" href="' + esc(j.url) + '">求人の詳細を見る →</a>'
           : '<div class="job-apply-note">応募先（店舗の窓口）は準備中です</div>') +
    '</div>' +
    (j.photo ? '<a class="job-photo"' + (j.url ? ' href="' + esc(j.url) + '"' : '') + '><img src="' + esc(j.photo) + '" alt="' + esc(j.name) + 'の店内" loading="lazy"></a>' : '') +
    '</div>';
};

/* 口コミで「店名だけ非公開」にするお店（口コミの本文はそのまま表示し、店名を「店名非公開」に置きかえる）
   ここに店名を足すだけでOK。空白・記号・大文字小文字の違いは気にしなくて大丈夫です。 */
window.AREA_HIDDEN_SHOPS = ["わたしのブラジャーどこ行った"];
window.areaShopName = function (name) {
  var norm = function (s) { return String(s || "").toLowerCase().replace(/[\s　「」『』【】()（）!！?？・。、,.\-ー〜~]/g, ""); };
  var n = norm(name);
  for (var i = 0; i < window.AREA_HIDDEN_SHOPS.length; i++) {
    var h = norm(window.AREA_HIDDEN_SHOPS[i]);
    if (h && (n.indexOf(h) >= 0 || h.indexOf(n) >= 0 && n.length >= 4)) return "店名非公開";
  }
  return String(name || "");
};

/* エリアの一覧（エリアページ・大阪ページ共通）
   key は求人データの area と同じ名前にする。stations は「駅で絞り込む」に出る駅、near は「近くのエリア」。 */
window.AREA_DIRECTORY = [
  { pref: "大阪府", group: "大阪", areas: [
    { key: "梅田", label: "梅田・キタ", en: "Umeda", stations: ["梅田駅", "大阪駅", "東梅田駅", "中崎町駅", "扇町駅"], near: ["北新地", "天満"] },
    { key: "北新地", label: "北新地", en: "Kitashinchi", stations: ["北新地駅", "西梅田駅", "大江橋駅"], near: ["梅田", "本町"] },
    { key: "天満", label: "天満・南森町", en: "Tenma", stations: ["天満駅", "天神橋筋六丁目駅", "南森町駅"], near: ["梅田", "京橋"] },
    { key: "本町", label: "本町・堺筋本町", en: "Honmachi", stations: ["本町駅", "堺筋本町駅"], near: ["北新地", "心斎橋"] },
    { key: "心斎橋", label: "心斎橋", en: "Shinsaibashi", stations: ["心斎橋駅", "長堀橋駅"], near: ["難波", "本町"] },
    { key: "難波", label: "難波・ミナミ", en: "Namba", stations: ["難波駅", "日本橋駅", "大阪難波駅"], near: ["心斎橋", "谷町九丁目"] },
    { key: "谷町九丁目", label: "谷町九丁目", en: "Tanimachi", stations: ["谷町九丁目駅", "大阪上本町駅"], near: ["難波", "心斎橋"] },
    { key: "京橋", label: "京橋・守口", en: "Kyobashi", stations: ["京橋駅", "守口市駅"], near: ["天満", "東大阪"] },
    { key: "十三", label: "十三・新大阪", en: "Juso", stations: ["十三駅", "新大阪駅", "西中島南方駅"], near: ["梅田", "江坂"] },
    { key: "江坂", label: "江坂・豊中", en: "Esaka", stations: ["江坂駅", "豊中駅"], near: ["十三", "梅田"] },
    { key: "東大阪", label: "東大阪・八尾", en: "Higashi-Osaka", stations: ["布施駅", "八尾駅"], near: ["京橋", "谷町九丁目"] },
    { key: "堺", label: "堺・南大阪", en: "Sakai", stations: ["堺東駅", "堺駅"], near: ["難波"] }
  ]},
  { pref: "兵庫県", group: "兵庫", areas: [
    { key: "三宮", label: "神戸・三宮", en: "Sannomiya", stations: ["三宮駅", "元町駅"], near: [] },
    { key: "尼崎", label: "尼崎・西宮", en: "Amagasaki", stations: ["尼崎駅", "西宮北口駅"], near: [] }
  ]},
  { pref: "京都府", group: "京都", areas: [
    { key: "祇園", label: "祇園・木屋町", en: "Gion", stations: ["祇園四条駅", "河原町駅"], near: ["京都駅"] },
    { key: "京都駅", label: "京都駅周辺", en: "Kyoto Sta.", stations: ["京都駅"], near: ["祇園"] }
  ]},
  { pref: "東京都・神奈川県", group: "関東", areas: [
    { key: "歌舞伎町", label: "歌舞伎町", en: "Kabukicho", stations: [], near: [] },
    { key: "六本木", label: "六本木", en: "Roppongi", stations: [], near: [] },
    { key: "銀座", label: "銀座", en: "Ginza", stations: [], near: [] },
    { key: "池袋", label: "池袋", en: "Ikebukuro", stations: [], near: [] },
    { key: "上野", label: "上野", en: "Ueno", stations: [], near: [] },
    { key: "横浜", label: "横浜", en: "Yokohama", stations: [], near: [] }
  ]}
];
window.areaInfo = function (key) {
  for (var g = 0; g < window.AREA_DIRECTORY.length; g++) {
    var G = window.AREA_DIRECTORY[g];
    for (var i = 0; i < G.areas.length; i++) if (G.areas[i].key === key) return Object.assign({ pref: G.pref, group: G.group }, G.areas[i]);
  }
  return null;
};
