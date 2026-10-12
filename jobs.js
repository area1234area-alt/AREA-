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
    pay: "お店に確認中", url: "blanc.html", pickup: true, pref: "大阪府", city: "大阪市",
    catchCopy: "黒とダークグレーでまとめた、シックで落ち着いた店内のキャバクラ",
    hours: "営業時間 19:00〜LAST", station: "東梅田駅・梅田駅・中崎町駅 徒歩圏内", transport: "要確認",
    qualify: "18歳以上（高校生不可）", payDetail: "お店に確認中（面接時に確認）", tags: [],
    features: ["黒・ダークグレー基調のシックな店内", "テーブル11卓", "定休日：火曜日"],
    tel: "0643015115", reviewKey: "blanc|ブラン", added: "2026-10-12" },
  { name: "Candy Pop（キャンディーポップ）", nameEn: "Candy Pop", kana: "キャンディーポップ", type: "キャバクラ", area: "梅田", address: "大阪府 大阪市 堂山町",
    pay: "お店に確認中", url: "candy.html", pickup: true, pref: "大阪府", city: "大阪市",
    catchCopy: "ミニドレスでお迎えする、きれいで快適な店内のキャバクラ",
    hours: "営業時間 19:00〜LAST", station: "東梅田駅・梅田駅・中崎町駅 徒歩圏内", transport: "要確認",
    qualify: "18歳以上（高校生不可）", payDetail: "お店に確認中（面接時に確認）", tags: [],
    features: ["きれいで快適な店内・分煙", "テーブル7卓", "衣装はミニドレス"],
    tel: "0665850181", reviewKey: "candy ?pop|キャンディ", added: "2026-10-12" },
  { name: "club 華門（昼の部）", nameEn: "Club Kamon", kana: "華門・昼の部", type: "昼キャバ", area: "梅田", address: "大阪府 大阪市 堂山町",
    pay: "お店に確認中", url: "kamon.html", pickup: true, pref: "大阪府", city: "大阪市",
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
      '<a class="dc-pw"' + href + '><span class="dc-ph' + (j.photo ? '' : ' noimg') + '">' + (j.photo ? '<img src="' + esc(j.photo) + '" alt="' + esc(j.name) + 'の店内" loading="lazy">' : '<span class="dc-noimg">画像準備中</span>') + '</span>' +
        '<span class="dc-tate">' + tate(j.area) + '<i class="dot"></i>' + tate(j.type) + '</span>' +
        '<span class="dc-over">' + (j.trial ? '<span class="dc-badge">体験入店あり</span>' : '') +
          '<span class="dc-name">' + esc(en) + '</span>' +
          (kana ? '<span class="dc-kana">' + esc(kana) + '</span>' : '') + '</span></a>' +
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
