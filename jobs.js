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
  { name: "梅田のキャバクラ", type: "キャバクラ", area: "梅田", address: "大阪府 大阪市", pay: "2万5千円〜3万円" },
  { name: "北新地のキャバクラ", type: "キャバクラ", area: "北新地", address: "大阪府 大阪市", pay: "3万5千円〜5万円" },
  { name: "梅田のキャバクラ", type: "キャバクラ", area: "梅田", address: "大阪府 大阪市", pay: "2万5千円〜2万8千円" },
  { name: "梅田のセクキャバ", type: "セクキャバ", area: "梅田", address: "大阪府 大阪市", pay: "2万8千円〜3万5千円" },
  { name: "梅田のセクキャバ", type: "セクキャバ", area: "梅田", address: "大阪府 大阪市", pay: "" }
];

/* 求人カードのHTMLを作る（両ページ共通） */
window.areaJobCard = function (j) {
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
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
