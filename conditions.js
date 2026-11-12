/* Area 求人の「条件で探す」
   求人データ（jobs.js）の 給与・タグ・特徴・応募資格 などの文字から、条件に合うお店を自動で判定します。
   条件を増やすときは、下の一覧に { key, label, re（当てはまる言葉）, no（当てはまらない言葉・任意） } を足すだけです。 */
window.AREA_CONDS = [
  { group: "お給料", items: [
    { key: "zengaku", label: "全額日払いOK", re: /全額日払い(OK|・|可|$|\s)|体験日は全額日払い|体験入店の日は(当日)?全額|体入全額日払い|当日全額払い/, no: /全額日払い(は)?不可/ },
    { key: "hibarai", label: "日払いOK", re: /日払い(OK|あり|可|相談)|まで日払い|即日払い|日払いは決|日払い\d|日払い・週払い|全額日払い(OK|・)|当日全額払い/ },
    { key: "kouji", label: "時給5,000円以上", fn: function (j) { return maxPay(j) >= 5000; } },
    { key: "hosho", label: "時給保証あり", re: /保証/ },
    { key: "shimei", label: "指名バックあり", re: /指名(バック|・|料|スライド|売上|\s?小計|[0-9０-９])|本指名|A指名|場内指名|指名・同伴/ },
    { key: "douhan", label: "同伴バックあり", re: /同伴/ },
    { key: "norma", label: "ノルマなし", re: /ノルマ(なし|・ペナルティなし)/, no: /ノルマあり/ },
    { key: "penalty", label: "罰金・ペナルティなし", re: /ペナルティ(なし|免除)|罰金なし/ },
    { key: "hikare", label: "引かれものなし", re: /引かれものなし|厚生費なし|差し引きなし/ }
  ]},
  { group: "待遇・サポート", items: [
    { key: "mikeiken", label: "未経験歓迎", re: /未経験|はじめて|素人さん/ },
    { key: "keiken", label: "経験者優遇", re: /経験者(優遇|は面談のうえ)/ },
    { key: "sokujitsu", label: "即日体験入店OK", re: /即日体験入店|面接(後)?(の日に)?そのまま体験入店|当日体験入店|その日のうちに体験入店/ },
    { key: "okuri", label: "送りあり", re: /送り(あり|・|は無料|代)|送迎あり|まで(無料の)?送り|へ無料の送り|まで送り|タクシー代支給/, no: /送り(なし|：なし)/ },
    { key: "kotsuhi", label: "交通費支給", re: /交通費支給|タクシー代支給|航空券支給/ },
    { key: "ryo", label: "寮あり", re: /寮/ },
    { key: "dress", label: "ドレス・衣装貸出", re: /ドレス|衣装の貸し出し|衣装貸出|レンタル衣装/ },
    { key: "hairmake", label: "ヘアメイクあり", re: /ヘアメイク/ },
    { key: "takuji", label: "託児所あり", re: /託児/ },
    { key: "age18", label: "18歳OK", re: /18歳OK/ },
    { key: "open", label: "新規オープン", re: /新規(オープン|店)|オープニング|完全新規/ },
    { key: "shifuku", label: "私服OK", re: /私服/ },
    { key: "rirekisho", label: "履歴書不要", re: /履歴書不要/ }
  ]},
  { group: "働き方", items: [
    { key: "shu1", label: "週1日〜OK", re: /週1日|月1回|数日だけ/ },
    { key: "shuden", label: "終電上がりOK", re: /終電(上がり|で上がる|OK)/ },
    { key: "jiyu", label: "自由シフト", re: /自由シフト|自己申告|シフト自由/ },
    { key: "tanjikan", label: "短時間OK", re: /1日[0-9]時間|短時間/ },
    { key: "double", label: "Wワーク・掛け持ちOK", re: /Wワーク|掛け持ち/ },
    { key: "hiru", label: "昼・早い時間から", re: /昼キャバ|昼の部|お昼から|18時から|早い時間/ },
    { key: "resort", label: "リゾートバイト", re: /リゾートバイト/ }
  ]}
];
function maxPay(j) {
  var s = String(j.pay || "") + " " + String(j.payDetail || "");
  if (!/時給/.test(s)) return 0;
  var m = 0; s.replace(/([0-9]{1,2}),?([0-9]{3})円/g, function (_, a, b) { var v = +(a + b); if (v > m && v <= 60000) m = v; });
  return m;
}
window.areaCondText = function (j) {
  return [j.pay, j.payDetail, j.catchCopy, j.hours, j.station, j.qualify, j.transport].concat(j.tags || [], j.features || []).join(" ／ ");
};
window.areaCondFind = function (key) {
  for (var g = 0; g < AREA_CONDS.length; g++) for (var i = 0; i < AREA_CONDS[g].items.length; i++) if (AREA_CONDS[g].items[i].key === key) return AREA_CONDS[g].items[i];
  return null;
};
window.areaCondMatch = function (j, c) {
  if (!j || !j.url || !c) return false;            // 求人ページがある掲載店だけ
  if (c.fn) return !!c.fn(j);
  var t = areaCondText(j);
  return c.re.test(t) && !(c.no && c.no.test(t));
};
window.areaRegionOfJobLite = function (j) {
  var t = [j.pref, j.area, j.address].join(" ");
  if (/東京|神奈川|埼玉|千葉|茨城|栃木|群馬|歌舞伎町|新宿|六本木|銀座|池袋|上野|横浜|渋谷|錦糸町|吉祥寺|町田|川崎|大宮/.test(t)) return "kanto";
  if (/大阪|京都|兵庫|奈良|滋賀|和歌山|梅田|北新地|心斎橋|難波|なんば|ミナミ|本町|天満|十三|江坂|豊中|三宮|神戸|祇園|木屋町|先斗町|京橋|堺/.test(t)) return "kansai";
  return "";
};
