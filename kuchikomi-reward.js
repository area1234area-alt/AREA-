/* Area 求人の口コミ：謝礼をお渡しした口コミの一覧
   口コミ台帳の「受付日時」（日本時間）と「投稿ID」を1行ずつ足すと、その口コミに「Areaから謝礼あり」と表示されます。
   例）["2026-11-12 21:05:33", "1234567"],
   支払いの記録は Googleドライブの「口コミ謝礼台帳」で管理します。 */
window.AREA_REWARD_LIST = [
];
(function () {
  var set = {};
  window.AREA_REWARD_LIST.forEach(function (x) {
    var m = String(x[0] || "").match(/(\d{4})[\/-](\d{1,2})[\/-](\d{1,2})\s+(\d{1,2}):(\d{2}):(\d{2})/);
    if (m) set[Date.UTC(+m[1], m[2] - 1, +m[3], m[4] - 9, +m[5], +m[6])] = 1;
  });
  window.AREA_RW = function (r) {
    var t = Date.parse(r && r.date || "");
    if (!(r && (r.reward || (t && set[t])))) return "";
    return '<div style="margin:6px 0 2px"><span style="display:inline-block;font-size:11px;line-height:1.6;padding:1px 8px;border:1px solid rgba(201,162,39,.6);border-radius:4px;color:#F1DA9C;letter-spacing:.04em">Areaから謝礼あり</span></div>';
  };
})();
