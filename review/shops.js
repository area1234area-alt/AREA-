/* Area REVIEW（風俗・メンズエステ・セクキャバの口コミサイト）の店舗データ
   ・店舗を増やすときは、この一覧に1件足すだけでOK（トップの一覧と店舗ページの両方に出ます）
   ・店舗ページは shop.html?id=（id の値） で開きます
   ・hold: "理由" を入れると、一覧にも店舗ページにも出しません（理由は画面に出ません）
   ・soon: true は、一覧に「準備中」のカードだけ出します（店舗ページはまだ開けません）
   ・keys は、口コミの「お店の名前」と照らし合わせる言葉。どれかを含む口コミがこの店の口コミになります */
window.RV_SHOPS = [
  { id: "kanojonchi", name: "彼女ん家", kana: "カノジョンチ", genre: "メンズエステ", style: "マンション型",
    area: "十三", areaLabel: "新大阪", access: "JR・大阪メトロ 新大阪駅",
    hours: "12:00〜翌5:00（受付 11:30〜）", wait: "マンションの個室待機",
    pay: "60分 6,000円〜", paySub: "90分 7,800円〜／120分 10,200円〜／180分 15,000円〜",
    back: "パネル指名 500円／本指名 1,000円／延長15分 2,000円",
    deduct: "雑費なし（お客様への割引分はお店と折半）",
    other: "全額日払い／衣装（ルームウェア）無料／顔出しなし可／出稼ぎOK／抜きなしの健全店",
    keys: ["彼女ん家", "かのじょんち", "カノジョンチ"], added: "2026-10-15" },

  { id: "galsselection", name: "ギャルズセレクション", kana: "ギャルズセレクション", genre: "メンズエステ", style: "ルーム型",
    area: "本町", areaLabel: "堺筋本町", access: "大阪メトロ 堺筋本町駅",
    hours: "10:00〜翌5:00", wait: "お店に確認中",
    pay: "コース料金の 50〜70%", paySub: "フリー・パネル指名 50〜60%／本指名 60〜70%",
    back: "オプション（衣装）は全額バック／指名料 1,000〜3,000円",
    deduct: "雑費なし",
    other: "写メ日記・Xからの予約は本指名扱い／顔出しは目出しか口出し（相談可）／お給料の交渉OK",
    keys: ["ギャルズセレクション", "ギャルセレ", "gals selection", "galsselection"], added: "2026-10-15" },

  { id: "zero", name: "ZERO", kana: "ゼロ", genre: "メンズエステ", style: "ホテル型・派遣型",
    area: "梅田", areaLabel: "梅田", access: "大阪市北区（梅田）",
    hours: "12:00〜翌5:00（最終受付 3:30）", wait: "集団待機",
    pay: "75分 5,000円〜", paySub: "コース・指名の種類で変わります（最低額）",
    back: "パネル指名 +1,000円／本指名 +2,000円／延長15分 2,500円",
    deduct: "雑費・初期費用なし（ホテル代は実費）",
    other: "交通費支給あり（7日出勤で片道、10日以上で往復）",
    keys: ["ZERO", "ゼロ"], hold: "届出の確認待ち", added: "2026-10-15" },

  { id: "aromaone", name: "アロマワン", kana: "アロマワン", genre: "メンズエステ", style: "ホテル型",
    area: "難波", areaLabel: "日本橋", access: "日本橋エリア",
    hours: "13:00〜翌5:00（梅田店 11:00〜）", wait: "要相談",
    pay: "60分 5,000円〜", paySub: "90分 8,000円／120分 10,000円",
    back: "本指名 1,000円／ランク別の指名料",
    deduct: "雑費 10%",
    other: "宣材撮影はお店負担／衣装の貸し出しあり",
    keys: ["アロマワン", "aroma one", "aromaone"], hold: "届出の確認待ち", added: "2026-10-15" },

  { id: "umeda-sk01", name: "梅田のセクキャバ", genre: "セクキャバ", area: "梅田", areaLabel: "梅田",
    pay: "日給 2万8千円〜3万5千円", soon: true },
  { id: "umeda-sk02", name: "梅田のセクキャバ", genre: "セクキャバ", area: "梅田", areaLabel: "梅田",
    pay: "", soon: true }
];

/* ジャンル（トップの「ジャンルで探す」）。お店が0件のジャンルは「準備中」と出ます */
window.RV_GENRES = [
  { key: "メンズエステ", label: "メンズエステ" },
  { key: "セクキャバ", label: "セクキャバ" },
  { key: "風俗", label: "風俗（デリヘル・ヘルスなど）" }
];

/* 口コミの読み込み先（Areaの口コミ台帳と同じ） */
window.RV_API = "https://script.google.com/macros/s/AKfycbxV6TXowRKiK_Z6MVrdsMwkZdnJ622lR388-dIBGZJud2FyxwcCpaUfUpmw1szI2lg/exec";

/* ---- ここから下は共通の部品（ふだんは触らなくてOK） ---- */
window.RV = (function () {
  var norm = function (s) { return String(s || "").toLowerCase().replace(/[\s　「」『』【】()（）!！?？・。、,.\-ー〜~]/g, ""); };
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };
  var listed = function () { return window.RV_SHOPS.filter(function (s) { return !s.hold; }); };
  var byId = function (id) { for (var i = 0; i < window.RV_SHOPS.length; i++) if (window.RV_SHOPS[i].id === id && !window.RV_SHOPS[i].hold) return window.RV_SHOPS[i]; return null; };
  var shopOf = function (r) {
    var n = norm(r.shop);
    if (!n) return null;
    var all = window.RV_SHOPS;
    for (var i = 0; i < all.length; i++) {
      var ks = all[i].keys || [];
      for (var k = 0; k < ks.length; k++) { var kk = norm(ks[k]); if (kk && (n.indexOf(kk) >= 0 || (kk.indexOf(n) >= 0 && n.length >= 3))) return all[i]; }
    }
    return null;
  };
  // このサイトで扱う口コミか（登録した店の口コミ、または業種が風俗・メンエス・セクキャバ）
  var FUZOKU = /風俗|デリヘル|ヘルス|ホテヘル|ソープ|ピンサロ|メンズエステ|メンエス|エステ|セクキャバ|おっパブ|いちゃキャバ|オナクラ|M性感|性感/i;
  var isOurs = function (r) { return !!shopOf(r) || FUZOKU.test(String(r.genre || "") + " " + String(r.style || "")); };

  // 勤務時間・日給（数字で入っている口コミだけ使う）
  var pick = function (r, names) { for (var i = 0; i < names.length; i++) { var v = r[names[i]]; if (v !== undefined && v !== null && String(v).trim() !== "") return String(v); } return ""; };
  var hoursOf = function (r) {
    var v = pick(r, ["hours", "workHours", "work_hours", "worktime", "勤務時間"]).replace(/[０-９．]/g, function (c) { return String.fromCharCode(c.charCodeAt(0) - 0xFEE0); });
    var m = v.match(/(\d+(?:\.\d+)?)/); var h = m ? parseFloat(m[1]) : 0;
    return h > 0 && h <= 24 ? h : 0;
  };
  var dailyOf = function (r) {
    var v = pick(r, ["daily", "dailyPay", "daily_pay", "payDay", "日給"]).replace(/[０-９．]/g, function (c) { return String.fromCharCode(c.charCodeAt(0) - 0xFEE0); }).replace(/[,，円\s]/g, "");
    var m = v.match(/(\d+(?:\.\d+)?)(万)?/); if (!m) return 0;
    var y = parseFloat(m[1]) * (m[2] ? 10000 : 1);
    if (y > 0 && y < 1000) y = y * 10000; // 「3.2」のように万円で入っている場合
    return y >= 1000 && y <= 1000000 ? Math.round(y) : 0;
  };
  var man = function (y) { return (Math.round(y / 1000) / 10).toFixed(1).replace(/\.0$/, "") + "万円"; };
  var yen = function (y) { return Math.round(y).toLocaleString("ja-JP") + "円"; };
  var perHour = function (y, h) { return Math.round(y / h / 100) * 100; };

  var period = function (v) {
    v = String(v || "");
    if (!/GMT|^\d{4}-\d{2}-\d{2}T/.test(v)) return v;
    var d = new Date(v); if (isNaN(d)) return "";
    return d.getFullYear() + "年" + (d.getMonth() + 1) + "月頃";
  };
  var load = function () {
    return fetch(window.RV_API + "?view=reviews").then(function (r) { return r.json(); })
      .then(function (j) { return j && j.ok && j.rows ? j.rows.filter(isOurs) : []; })
      .catch(function () { return []; });
  };
  // 年齢確認（一度「はい」を押せば、同じブラウザでは次から出ない）
  var gate = function () {
    try { if (localStorage.getItem("rvAge") === "ok") return; } catch (e) {}
    var g = document.createElement("div"); g.className = "gate";
    g.innerHTML = '<div class="gate-box"><div class="f-logo" style="font-family:var(--en);font-weight:700;font-size:1.6rem;background:var(--goldgrad);-webkit-background-clip:text;background-clip:text;color:transparent">Area REVIEW</div>' +
      '<h2>18歳以上の方ですか？</h2><p>このサイトには、風俗・メンズエステ・セクキャバで働いた方の口コミを掲載しています。18歳未満の方はご覧になれません。</p>' +
      '<div class="row"><a class="btn btn-line" style="color:#B7AEA6;border-color:#3A3440" href="https://www.google.com/">いいえ</a><button type="button" class="btn btn-gold">はい</button></div></div>';
    document.body.appendChild(g); document.body.style.overflow = "hidden";
    g.querySelector("button").onclick = function () {
      try { localStorage.setItem("rvAge", "ok"); } catch (e) {}
      g.remove(); document.body.style.overflow = "";
    };
  };
  return { norm: norm, esc: esc, listed: listed, byId: byId, shopOf: shopOf, isOurs: isOurs,
           hoursOf: hoursOf, dailyOf: dailyOf, man: man, yen: yen, perHour: perHour, period: period, load: load, gate: gate };
})();
