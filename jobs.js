/* Areaの求人データ（トップページとエリア一覧ページの両方がここを読みます）
   求人を増やすときは、この一覧に1件足すだけでOK。
   area（地域名）と type（職種）が、エリア・職種ボタンの名前と同じなら自動でその一覧に出ます。 */
/* 風俗・メンズエステ・セクキャバは別サイト（review/ フォルダの Area REVIEW）に移しました（2026-10-21）。
   ここには飲み屋（キャバクラ・ラウンジ・クラブ・ガールズバー・スナックなど）だけを載せます。 */
window.AREA_JOBS = [
  { name: "Regent Club（リージェントクラブ）", nameEn: "Regent Club", kana: "リージェントクラブ", type: "キャバクラ", area: "池袋", address: "東京都 豊島区 池袋（西口・ロマンス通り）",
    pay: "時給 6,000円〜15,000円", url: "regent.html", photo: "img/regent/entrance.jpg", pickup: true, isNew: true, pref: "東京都", city: "豊島区",
    catchCopy: "池袋プリンスグループ4号店。内装費1.4億円の大型高級店が2026年12月1日オープン。オープニングキャスト募集",
    hours: "お店に確認", station: "池袋駅西口（ロマンス通り）", transport: "要確認",
    qualify: "18歳以上（高校生不可）・経験者優遇・週4日以上歓迎",
    payDetail: "時給6,000円〜15,000円／売上歩合（小計売上の40〜55％）と時給＋バックの高いほうを毎月支給",
    tags: ["新規オープン", "オープニングスタッフ", "高時給", "売上歩合", "経験者優遇", "大型店"],
    features: ["2026年12月1日グランドオープン", "完全フリー席の場内指名は小計30％を本指名売上に計上", "営業後のアフターバー「ANNEX」で売上を伸ばせる"],
    tel: "", line: "https://lin.ee/v7GLaD2", reviewKey: "regent|リージェント", column: "column/regent-club-ikebukuro.html", added: "2026-11-01" },
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
  { name: "ELENA HOUSE（エレナハウス）", nameEn: "ELENA HOUSE", kana: "エレナハウス", type: "キャバクラ", area: "梅田", address: "大阪府 大阪市 堂山町",
    pay: "時給 最大5,000円", url: "umeda-c01.html", photo: "", pickup: true, pref: "大阪府", city: "大阪市", // 写真が来たら photo: "img/umeda-c01/main.jpg"
    catchCopy: "経験・実績しだいで時給最大5,000円。送りあり・終電上がりOKの、梅田・堂山町のキャバクラ",
    hours: "営業時間 20:00〜翌1:00", station: "梅田駅", transport: "要確認",
    qualify: "19歳以上（18歳・高校生不可）", payDetail: "時給2,000円〜最大5,000円（経験・実績により面接で決定／本指名スライド制で指名に応じて時給アップ）／全額日払いは不可", tags: ["送りあり", "終電上がりOK", "ヘアメイク店内"],
    features: ["本指名スライド制", "客層はサラリーマン中心", "定休日：日曜日"],
    tel: "", reviewKey: "\\u0065\\u006c\\u0065\\u006e\\u0061|\\u30a8\\u30ec\\u30ca", added: "2026-10-15" },
  // ==自動追加 ここから==
  {"name": "Club ZiZi（ジジ）", "nameEn": "Club ZiZi", "kana": "ジジ", "type": "キャバクラ", "area": "梅田", "address": "大阪府 大阪市 堂山町", "pay": "平均時給 3,000円", "url": "umeda-c02.html", "photo": "img/umeda-c02/main.jpg", "logoInPhoto": true, "pickup": true, "pref": "大阪府", "city": "大阪市", "catchCopy": "平均時給3,000円、売上スライドで最大6,000円。ノルマなし・人間関係の良いキャバクラ", "hours": "営業時間 21:00〜翌5:00", "station": "泉の広場（M-2・6出口）徒歩2分", "transport": "要確認", "qualify": "18歳以上（高校生不可）", "payDetail": "平均時給3,000円（入店時2,500円〜3,500円）／A指名売上スライドで最大6,000円／全額日払い不可", "tags": ["ノルマなし", "送りあり", "18歳OK", "履歴書不要", "週1日〜OK", "レンタルドレス"], "features": ["A指名の売上スライド制", "客層はサラリーマン中心", "定休日：日曜日"], "tel": "0663145535", "reviewKey": "\\u007a\\u0069\\u007a\\u0069|\\u30b8\\u30b8", "added": "2026-10-15"},
  {"name": "CLUB Cronos（クロノス）", "nameEn": "CLUB Cronos", "kana": "クロノス", "type": "キャバクラ", "area": "梅田", "address": "大阪府 大阪市 北区神山町", "pay": "夜の部 時給 7,000円〜", "url": "umeda-c06.html", "photo": "img/umeda-c06/main.jpg", "logoInPhoto": true, "pickup": true, "trial": true, "pref": "大阪府", "city": "大阪市", "catchCopy": "夜の部は時給7,000円〜、昼の部は時給3,000円。週1日・1日3時間からOKの梅田のキャバクラ", "hours": "昼の部 13:00〜20:00／夜の部 20:00〜LAST", "station": "中崎町駅 徒歩6分", "transport": "要確認", "qualify": "18歳以上（高校生不可）・未経験歓迎・Wワーク歓迎", "payDetail": "夜の部 時給7,000円〜＋各種バック／昼の部 時給3,000円／日払いOK（手渡し）／入店祝い金3万円（条件あり）", "tags": ["昼キャバ", "日払いOK", "送りあり", "週1日〜OK", "未経験歓迎", "レンタルドレス"], "features": ["昼の部・夜の部どちらか一方でもOK", "終電以降は自宅まで送り", "面接後そのまま体験入店OK"], "tel": "0669404017", "reviewKey": "\\u0063\\u0072\\u006f\\u006e\\u006f\\u0073|\\u30af\\u30ed\\u30ce\\u30b9", "added": "2026-11-02"},
  {"name": "LISBOA（リスボア）", "nameEn": "LISBOA", "kana": "リスボア", "type": "キャバクラ", "area": "梅田", "address": "大阪府 大阪市 堂山町", "pay": "時給 3,000円〜5,500円", "url": "umeda-c03.html", "photo": "", "pickup": true, "pref": "大阪府", "city": "大阪市", "catchCopy": "時給3,000円〜最大5,500円、入店から2ヶ月の時給保証つき。終電上がりOKのキャバクラ", "hours": "営業時間 13:00〜翌1:00", "station": "東梅田駅 徒歩5分", "transport": "要確認", "qualify": "19歳以上（18歳・高校生不可）", "payDetail": "時給3,000円〜最大5,500円／入店から2ヶ月の時給保証／A指名スライド制／全額日払い不可", "tags": ["時給保証あり", "終電上がりOK", "送りあり"], "features": ["入店から2ヶ月の時給保証", "A指名スライド制", "東梅田駅 徒歩5分"], "tel": "", "reviewKey": "\\u006c\\u0069\\u0073\\u0062\\u006f\\u0061|\\u30ea\\u30b9\\u30dc\\u30a2", "added": "2026-10-15"},  // 写真が来たら photo に "img/umeda-c03/main.jpg"
  {"name": "AJITO（アジト）", "nameEn": "AJITO", "kana": "アジト", "type": "キャバクラ", "area": "梅田", "address": "大阪府 大阪市 堂山町", "pay": "時給 4,000円〜6,000円", "url": "umeda-c04.html", "photo": "", "pickup": true, "pref": "大阪府", "city": "大阪市", "catchCopy": "時給4,000円〜スタート、本指名スライドで最大時給10,000円のキャバクラ", "hours": "営業時間 20:00〜翌1:30", "station": "東梅田駅 徒歩5分", "transport": "要確認", "qualify": "19歳以上（18歳・高校生不可）", "payDetail": "時給4,000円〜6,000円／本指名スライドで最大10,000円／達成率で最大+3,000円／全額日払い不可", "tags": ["高時給", "ヘアメイク店内", "送りあり"], "features": ["本指名スライドで最大時給10,000円", "ヘアメイクはお店の中で", "定休日：日曜日"], "tel": "", "reviewKey": "\\u0061\\u006a\\u0069\\u0074\\u006f|\\u30a2\\u30b8\\u30c8", "added": "2026-10-15"},  // 写真が来たら photo に "img/umeda-c04/main.jpg"
  {"name": "VALLET（ヴァレット）", "nameEn": "VALLET", "kana": "ヴァレット", "type": "キャバクラ", "area": "梅田", "address": "大阪府 大阪市 堂山町", "pay": "平均時給 3,500円", "url": "umeda-c05.html", "photo": "", "pickup": true, "pref": "大阪府", "city": "大阪市", "catchCopy": "平均時給3,500円。18時から働けて終電上がりOKのキャバクラ", "hours": "営業時間 18:00〜翌3:00", "station": "梅田駅", "transport": "要確認", "qualify": "18歳以上（高校生不可）", "payDetail": "平均時給3,500円（入店時3,000円〜5,000円）／本指名売上スライド制／全額日払い不可", "tags": ["18時から勤務OK", "終電上がりOK", "ノルマなし", "18歳OK"], "features": ["早い時間から働ける", "週2日〜OK", "定休日：木曜日"], "tel": "", "reviewKey": "\\u0076\\u0061\\u006c\\u006c\\u0065\\u0074|\\u30f4\\u30a1\\u30ec\\u30c3\\u30c8|\\u0076\\u0061\\u006c\\u0065\\u0074", "added": "2026-10-15"},  // 写真が来たら photo に "img/umeda-c05/main.jpg"
  {"name": "SEEK（シーク）", "nameEn": "SEEK", "kana": "シーク", "type": "ラウンジ", "area": "江坂", "address": "大阪府 豊中市", "pay": "平均時給 2,500円", "url": "toyonaka-l01.html", "photo": "", "pickup": true, "pref": "大阪府", "city": "豊中市", "catchCopy": "平均時給2,500円、引かれもの一切なし・ノルマなしの会員制ラウンジ", "hours": "営業時間 20:00〜翌2:00", "station": "豊中駅 徒歩5分", "transport": "要確認", "qualify": "18歳以上（高校生不可）", "payDetail": "平均時給2,500円（入店時1,800円〜3,000円）／引かれものなし／日給の半分まで日払い可", "tags": ["引かれものなし", "ノルマなし", "制服あり", "送りあり"], "features": ["所得税・厚生費の差し引きなし", "客層は30〜50代の地元の方", "週2日〜OK"], "tel": "", "reviewKey": "\\u0073\\u0065\\u0065\\u006b|\\u30b7\\u30fc\\u30af", "added": "2026-10-15"},  // 写真が来たら photo に "img/toyonaka-l01/main.jpg"
  {"name": "ローズ", "nameEn": "ローズ", "kana": "", "type": "キャバクラ", "area": "十三", "address": "大阪府 大阪市 淀川区", "pay": "時給 2,500円〜5,000円", "url": "juso-c01.html", "photo": "", "pickup": true, "pref": "大阪府", "city": "大阪市", "catchCopy": "時給2,500円〜最大5,000円、2ヶ月の保証つき。ノルマなし・アットホームなキャバクラ", "hours": "営業時間 21:00〜翌3:00", "station": "十三駅", "transport": "要確認", "qualify": "18歳以上（高校生不可）", "payDetail": "時給2,500円〜最大5,000円／入店から2ヶ月保証／本指名 小計20%／1日5,000円まで日払い可", "tags": ["ノルマなし", "保証あり", "日払いあり", "18歳OK"], "features": ["入店から2ヶ月の保証", "本指名は小計の20%バック", "定休日：月曜日"], "tel": "", "reviewKey": "\\u30ed\\u30fc\\u30ba|\\u0072\\u006f\\u0073\\u0065", "added": "2026-10-15"},  // 写真が来たら photo に "img/juso-c01/main.jpg"
  {"name": "LA TOUR（ラトゥール）", "nameEn": "LA TOUR", "kana": "ラトゥール", "type": "キャバクラ", "area": "心斎橋", "address": "大阪府 大阪市 中央区", "pay": "平均時給 4,000円", "url": "minami-c01.html", "photo": "", "pickup": true, "pref": "大阪府", "city": "大阪市", "catchCopy": "平均時給4,000円・最大8,000円。完全新規店・未経験OK・寮ありのキャバクラ", "hours": "営業時間 20:00〜翌4:00", "station": "心斎橋駅", "transport": "要確認", "qualify": "18歳以上（高校生・通信制不可）・未経験OK", "payDetail": "平均時給4,000円（入店時3,000円〜8,000円）／入店から1ヶ月保証／1日10,000円まで日払い可", "tags": ["完全新規店", "未経験OK", "寮あり", "終電上がりOK"], "features": ["完全新規店・VIPルームあり", "入店から1ヶ月の保証", "週2日〜OK"], "tel": "", "reviewKey": "\\u006c\\u0061 ?\\u0074\\u006f\\u0075\\u0072|\\u30e9\\u30c8\\u30a5\\u30fc\\u30eb|\\u30e9\\u30fb\\u30c8\\u30a5\\u30fc\\u30eb", "added": "2026-10-15"},  // 写真が来たら photo に "img/minami-c01/main.jpg"
  {"name": "PALLAS（パラス）", "nameEn": "PALLAS", "kana": "パラス", "type": "キャバクラ", "area": "心斎橋", "address": "大阪府 大阪市 中央区", "pay": "平均時給 5,000円", "url": "minami-c02.html", "photo": "", "pickup": true, "pref": "大阪府", "city": "大阪市", "catchCopy": "平均時給5,000円・最大10,000円。小計60〜70%支給、客層の良いキャバクラ", "hours": "営業時間 21:00〜翌2:00", "station": "心斎橋駅 徒歩5分", "transport": "要確認", "qualify": "18歳以上（高校生・通信制不可）", "payDetail": "平均時給5,000円（入店時3,000円〜10,000円）／売上手当 小計の60〜70%／1日5,000円まで日払い可", "tags": ["高時給", "ノルマなし", "18歳OK", "送りあり"], "features": ["売上手当 小計の60〜70%", "客層は40代前後", "週3日〜"], "tel": "", "reviewKey": "\\u0070\\u0061\\u006c\\u006c\\u0061\\u0073|\\u30d1\\u30e9\\u30b9", "added": "2026-10-15"},  // 写真が来たら photo に "img/minami-c02/main.jpg"
  {"name": "GRACE（グレース）", "nameEn": "GRACE", "kana": "グレース", "type": "キャバクラ", "area": "心斎橋", "address": "大阪府 大阪市 中央区", "pay": "時給 4,000円〜7,000円", "url": "minami-c03.html", "photo": "", "pickup": true, "pref": "大阪府", "city": "大阪市", "catchCopy": "時給4,000円〜最大7,000円。新規オープンのアットホームなキャバクラ", "hours": "営業時間 21:00〜翌4:00", "station": "心斎橋駅", "transport": "要確認", "qualify": "18歳以上（高校生不可）", "payDetail": "時給4,000円〜最大7,000円／分配率に応じた小計バック／月2回払い", "tags": ["新規店", "アットホーム", "送りあり", "18歳OK"], "features": ["新規オープン", "月2回のお給料", "週2日〜OK"], "tel": "", "reviewKey": "\\u0067\\u0072\\u0061\\u0063\\u0065|\\u30b0\\u30ec\\u30fc\\u30b9", "added": "2026-10-15"},  // 写真が来たら photo に "img/minami-c03/main.jpg"
  {"name": "LUXY（ラグジー）", "nameEn": "LUXY", "kana": "ラグジー", "type": "キャバクラ", "area": "北新地", "address": "大阪府 大阪市 北区", "pay": "時給 5,000円〜6,000円", "url": "shinchi-c01.html", "photo": "", "pickup": true, "pref": "大阪府", "city": "大阪市", "catchCopy": "時給5,000円〜6,000円。オープン15年、固定客の多い北新地のキャバクラ", "hours": "営業時間 20:00〜翌3:00", "station": "JR北新地駅", "transport": "要確認", "qualify": "19歳以上（18歳・高校生不可）", "payDetail": "時給5,000円〜6,000円／ポイントスライド制／売上から3,000円を引いた額まで日払い可", "tags": ["高時給", "ノルマなし", "週1日〜OK", "ドレス貸し出し"], "features": ["オープン15年・固定客多め", "客層は自営業・医師・経営者", "定休日：日曜日"], "tel": "", "reviewKey": "\\u006c\\u0075\\u0078\\u0079|\\u30e9\\u30b0\\u30b8\\u30fc", "added": "2026-10-15"},  // 写真が来たら photo に "img/shinchi-c01/main.jpg"
  {"name": "45（ヨンゴー）", "nameEn": "45", "kana": "ヨンゴー", "type": "ラウンジ", "area": "祇園", "address": "京都府 京都市 東山区", "pay": "時給 7,000円〜20,000円", "url": "gion-l01.html", "photo": "", "pickup": true, "pref": "京都府", "city": "京都市", "catchCopy": "時給7,000円〜最大20,000円・全額日払いOK。東京の会員制ラウンジ発の新規店", "hours": "営業時間 20:00〜", "station": "祇園四条駅", "transport": "要確認", "qualify": "19歳以上（18歳・高校生不可）", "payDetail": "時給7,000円〜最大20,000円／全額日払いOK／同伴 小計20〜50%", "tags": ["高時給", "全額日払いOK", "完全新規店"], "features": ["東京の会員制ラウンジ発", "客層は経営者・富裕層", "週2日〜OK"], "tel": "", "reviewKey": "\\u0034\\u0035|\\u30e8\\u30f3\\u30b4\\u30fc|\\u3088\\u3093\\u3054\\u30fc", "added": "2026-10-15"},  // 写真が来たら photo に "img/gion-l01/main.jpg"
  {"name": "一期一会（祇園）", "nameEn": "一期一会", "kana": "", "type": "ラウンジ", "area": "祇園", "address": "京都府 京都市 東山区", "pay": "時給 5,000円〜20,000円", "url": "gion-l02.html", "photo": "", "pickup": true, "pref": "京都府", "city": "京都市", "catchCopy": "時給5,000円〜最大20,000円。東京スタイル・未経験OKの会員制ラウンジ", "hours": "営業時間 20:00〜翌1:00", "station": "祇園四条駅", "transport": "要確認", "qualify": "19歳以上（18歳・高校生不可）・未経験OK", "payDetail": "時給5,000円〜最大20,000円／本指名 小計20%／時給分の日払いOK", "tags": ["高時給", "未経験OK", "日払いあり", "終電上がりOK"], "features": ["東京スタイルの会員制ラウンジ", "数日だけの勤務もOK", "遠方まで送りあり"], "tel": "", "reviewKey": "\\u4e00\\u671f\\u4e00\\u4f1a", "added": "2026-10-15"},  // 写真が来たら photo に "img/gion-l02/main.jpg"
  {"name": "Club UNJOUR 祇園（アンジュール）", "nameEn": "Club UNJOUR 祇園", "kana": "アンジュール", "type": "キャバクラ", "area": "祇園", "address": "京都府 京都市 東山区", "pay": "時給 8,000円〜", "url": "gion-c01.html", "photo": "img/gion-c01/main.jpg", "pickup": true, "pref": "京都府", "city": "京都市", "catchCopy": "体験入店から時給8,000円。体験日は全額日払い、ヘアメイク店内の祇園のキャバクラ", "hours": "営業時間 20:00〜翌1:00", "station": "祇園四条駅", "transport": "要確認", "qualify": "18歳以上（高校生不可）", "payDetail": "時給8,000円〜（随時昇給）／体験日は全額日払い・入店後は7割まで", "tags": ["日払いあり", "ヘアメイク店内", "送りあり", "18歳OK"], "features": ["同伴バック5,000円", "ヘアメイクはお店で", "定休日：日曜日"], "tel": "07012771081", "reviewKey": "\\u30a2\\u30f3\\u30b8\\u30e5\\u30fc\\u30eb|\\u0061\\u006e\\u006a\\u006f\\u0075\\u0072", "added": "2026-10-15"},
  {"name": "GALLE（ガレ）", "nameEn": "GALLE", "kana": "ガレ", "type": "キャバクラ", "area": "祇園", "address": "京都府 京都市 東山区", "pay": "時給 4,000円〜", "url": "gion-c02.html", "photo": "img/gion-c02/main.jpg", "pickup": true, "pref": "京都府", "city": "京都市", "catchCopy": "時給4,000円〜、2ヶ月保証つき。元クラブで客層の良い祇園のキャバクラ", "hours": "営業時間 20:00〜翌1:00", "station": "祇園四条駅", "transport": "要確認", "qualify": "19歳以上（18歳・高校生不可）", "payDetail": "時給4,000円〜（売上スライド）／入店から2ヶ月保証／体験日は全額日払い", "tags": ["保証あり", "日払いあり", "送りあり"], "features": ["元クラブで客層が良い", "入店から2ヶ月の保証", "定休日：日曜日"], "tel": "", "reviewKey": "\\u0067\\u0061\\u006c\\u006c\\u0065|\\u30ac\\u30ec", "added": "2026-10-15"},  // 写真が来たら photo に "img/gion-c02/main.jpg"
  {"name": "ホワイトナイト", "nameEn": "ホワイトナイト", "kana": "", "type": "キャバクラ", "area": "祇園", "address": "京都府 京都市 東山区", "pay": "時給 4,000円〜6,000円", "url": "gion-c03.html", "photo": "", "pickup": true, "pref": "京都府", "city": "京都市", "catchCopy": "時給4,000円〜6,000円。「小計50%」か「時給＋バック」の高いほう、全額日払いOK", "hours": "営業時間 21:00〜翌3:00", "station": "祇園エリア", "transport": "要確認", "qualify": "18歳以上（高校生不可）", "payDetail": "時給4,000円〜6,000円／小計50%か時給＋バックの高いほう／全額日払いOK", "tags": ["全額日払いOK", "寮あり", "週1日〜OK", "18歳OK"], "features": ["保証はほぼ無期限", "客層は40〜50代の経営者", "送り代は厚生費に込み"], "tel": "", "reviewKey": "\\u30db\\u30ef\\u30a4\\u30c8\\u30ca\\u30a4\\u30c8|\\u0077\\u0068\\u0069\\u0074\\u0065 ?\\u006b\\u006e\\u0069\\u0067\\u0068\\u0074", "added": "2026-10-15"},  // 写真が来たら photo に "img/gion-c03/main.jpg"
  {"name": "BASE（ベース）", "nameEn": "BASE", "kana": "ベース", "type": "キャバクラ", "area": "心斎橋", "address": "大阪府 大阪市 中央区", "pay": "平均時給 5,000円", "url": "minami-c04.html", "photo": "", "pickup": true, "pref": "大阪府", "city": "大阪市", "catchCopy": "平均時給5,000円・最大10,000円。フリーが多く給料システムの良いキャバクラ", "hours": "営業時間 20:00〜翌3:00", "station": "心斎橋駅・なんば駅", "transport": "要確認", "qualify": "18歳以上（高校生不可）", "payDetail": "平均時給5,000円（入店時4,000円〜10,000円）／達成率で小計の5〜30%バック／ノルマあり", "tags": ["高時給", "18歳OK"], "features": ["フリーのお客様が多い", "小計バック5〜30%", "週4日〜"], "tel": "", "reviewKey": "\\u0062\\u0061\\u0073\\u0065|\\u30d9\\u30fc\\u30b9", "added": "2026-10-15"},  // 写真が来たら photo に "img/minami-c04/main.jpg"
  {"name": "ESPOIR（エスポワール）", "nameEn": "ESPOIR", "kana": "エスポワール", "type": "キャバクラ", "area": "心斎橋", "address": "大阪府 大阪市 中央区", "pay": "平均時給 3,000円", "url": "minami-c05.html", "photo": "", "pickup": true, "pref": "大阪府", "city": "大阪市", "catchCopy": "平均時給3,000円・最大5,000円。ノルマなし・ヘアメイク店内のキャバクラ", "hours": "営業時間 20:00〜翌5:30", "station": "心斎橋駅", "transport": "要確認", "qualify": "18歳以上（高校生不可）", "payDetail": "平均時給3,000円（入店時3,000円〜5,000円）／売上スライド制／ボトル大計10%", "tags": ["ノルマなし", "ヘアメイク店内", "送りあり", "18歳OK"], "features": ["ボトルは原価引きなしで大計10%", "客層は会社員〜経営者", "週3日〜"], "tel": "", "reviewKey": "\\u0065\\u0073\\u0070\\u006f\\u0069\\u0072|\\u30a8\\u30b9\\u30dd\\u30ef\\u30fc\\u30eb", "added": "2026-10-15"},  // 写真が来たら photo に "img/minami-c05/main.jpg"
  {"name": "OPUS（オーパス）", "nameEn": "OPUS", "kana": "オーパス", "type": "キャバクラ", "area": "心斎橋", "address": "大阪府 大阪市 中央区", "pay": "平均時給 3,000円", "url": "minami-c06.html", "photo": "", "pickup": true, "pref": "大阪府", "city": "大阪市", "catchCopy": "平均時給3,000円・最大6,000円。新規オープン・ドレス貸出無料のキャバクラ", "hours": "営業時間 20:00〜翌4:00", "station": "心斎橋駅・なんば駅", "transport": "要確認", "qualify": "18歳以上（高校生・通信制在学生不可）", "payDetail": "平均時給3,000円（入店時3,000円〜6,000円）／分配率で小計5〜15%バック／1日10,000円まで日払い可", "tags": ["新規オープン", "早上がりOK", "日払いあり", "18歳OK"], "features": ["内装きれい・VIPルームあり", "ドレス・ヒール貸出無料", "週4日〜"], "tel": "", "reviewKey": "\\u006f\\u0070\\u0075\\u0073|\\u30aa\\u30fc\\u30d1\\u30b9", "added": "2026-10-15"},  // 写真が来たら photo に "img/minami-c06/main.jpg"
  {"name":  "CLUB CROSS（クラブ クロス）", "nameEn":  "CLUB CROSS", "kana":  "クラブ クロス", "type":  "クラブ", "area":  "心斎橋", "address":  "大阪府 大阪市 中央区", "pay":  "平均時給 4,000円〜5,000円", "trial":  true, "url":  "minami-k01.html", "photo":  "", "pickup":  true, "pref":  "大阪府", "city":  "大阪市", "catchCopy":  "大手グループ運営のミナミの大型クラブ。もう一度始めたい方・30代からの方も歓迎", "hours":  "営業時間 20:00〜翌1:00（日曜・祝日休み）", "station":  "なんば・心斎橋周辺", "transport":  "要確認", "qualify":  "18歳以上（高校生不可）・久しぶりの方歓迎・30代歓迎", "payDetail":  "平均時給4,000円〜5,000円／体験入店は時給3,000円×3時間（一律）／同伴・本指名バック各2,000円／20日締め・翌月10日払い", "tags":  ["週2日〜OK", "30代歓迎", "終電上がり相談可", "大手グループ運営", "社長に相談できる"], "features":  ["経営者層中心の落ち着いた客層", "系列店：マルゴー／バカラ", "体験入店は時給3,000円×3時間"], "tel":  "", "reviewKey":  "cross|クロス", "added":  "2026-11-10"},
  {"name": "白い虹（シロイニジ）", "nameEn": "白い虹", "kana": "シロイニジ", "type": "スナック", "area": "心斎橋", "address": "大阪府 大阪市 中央区", "pay": "平均時給 2,000円", "url": "minami-s01.html", "photo": "", "pickup": true, "pref": "大阪府", "city": "大阪市", "catchCopy": "平均時給2,000円。ノルマなし・厚生費なしのミナミのスナック", "hours": "営業時間 20:30〜翌1:00", "station": "心斎橋駅", "transport": "要確認", "qualify": "19歳以上（18歳・高校生不可）", "payDetail": "平均時給2,000円（入店時2,000円〜2,500円）／時給＋バック／厚生費なし", "tags": ["ノルマなし", "厚生費なし", "送りあり"], "features": ["時給＋バックのわかりやすいお給料", "ドレス貸出あり", "週2日〜OK"], "tel": "", "reviewKey": "\\u767d\\u3044\\u8679|\\u30b7\\u30ed\\u30a4\\u30cb\\u30b8|\\u3057\\u308d\\u3044\\u306b\\u3058", "added": "2026-10-15"},  // 写真が来たら photo に "img/minami-s01/main.jpg"
  {"name": "エグゼ", "nameEn": "エグゼ", "kana": "", "type": "ガールズバー", "area": "難波", "address": "大阪府 大阪市 浪速区", "pay": "お店に確認中", "url": "namba-g01.html", "photo": "", "pickup": true, "pref": "大阪府", "city": "大阪市", "catchCopy": "ノルマなし・終電上がりOK・寮ありの日本橋のガールズバー", "hours": "営業時間 21:00〜翌5:00", "station": "日本橋駅", "transport": "要確認", "qualify": "18歳以上（高校生不可）", "payDetail": "お店に確認中（面接時に確認）／同伴 小計20%／1日3,000円まで日払い可", "tags": ["ノルマなし", "終電上がりOK", "寮あり", "18歳OK"], "features": ["私服でもOK", "ヘアメイクはお店で", "週2日〜OK"], "tel": "", "reviewKey": "\\u30a8\\u30b0\\u30bc|\\u0065\\u0078\\u0065", "added": "2026-10-15"},  // 写真が来たら photo に "img/namba-g01/main.jpg"
  {"name": "Y2（ワイツー）", "nameEn": "Y2", "kana": "ワイツー", "type": "ガールズバー", "area": "天満", "address": "大阪府 大阪市 北区", "pay": "時給 1,500円〜2,000円", "url": "tenma-g01.html", "photo": "", "pickup": true, "pref": "大阪府", "city": "大阪市", "catchCopy": "時給1,500円〜2,000円。厚生費なし・寮ありの天満のガールズバー", "hours": "営業時間 21:00〜翌6:00", "station": "天満駅", "transport": "要確認", "qualify": "18歳以上（高校生不可）", "payDetail": "時給1,500円〜2,000円／厚生費なし／1日4,000円まで日払い可", "tags": ["厚生費なし", "寮あり", "ヘアメイク店内", "18歳OK"], "features": ["朝6時まで営業", "同伴3,000円・本指名1,000円", "週3日〜"], "tel": "", "reviewKey": "\\u0079\\u0032|\\uff59\\uff12|\\u0079\\uff12|\\u30ef\\u30a4\\u30c4\\u30fc", "added": "2026-10-15"},  // 写真が来たら photo に "img/tenma-g01/main.jpg"
  {"name": "BUBO（ブーボ）", "nameEn": "BUBO", "kana": "ブーボ", "type": "クラブ", "area": "北新地", "address": "大阪府 大阪市 北区", "pay": "平均時給 6,000円", "url": "shinchi-k01.html", "photo": "", "pickup": true, "pref": "大阪府", "city": "大阪市", "catchCopy": "平均時給6,000円・最大10,000円。北新地の完全会員制ミニクラブ", "hours": "営業時間 20:00〜翌1:00", "station": "北新地駅", "transport": "要確認", "qualify": "20歳以上（19歳は面接で相談）", "payDetail": "平均時給6,000円（入店時5,000円〜10,000円）／同伴1本3,000円・月10回で賞金30,000円", "tags": ["高時給", "ノルマなし", "土日祝休み", "送りあり"], "features": ["完全会員制", "土日祝はお休み", "同伴賞金あり"], "tel": "", "reviewKey": "\\u0062\\u0075\\u0062\\u006f|\\u30d6\\u30fc\\u30dc", "added": "2026-10-15"},  // 写真が来たら photo に "img/shinchi-k01/main.jpg"
  {"name": "RUBY（ルビー）", "nameEn": "RUBY", "kana": "ルビー", "type": "キャバクラ", "area": "北新地", "address": "大阪府 大阪市 北区", "pay": "平均時給 6,000円", "url": "shinchi-c02.html", "photo": "", "pickup": true, "pref": "大阪府", "city": "大阪市", "catchCopy": "平均時給6,000円。素人大歓迎・ヘアメイク店内の北新地のキャバクラ", "hours": "営業時間 20:30〜翌3:00", "station": "北新地駅", "transport": "要確認", "qualify": "19歳以上（18歳・高校生不可）・未経験歓迎", "payDetail": "平均時給6,000円（入店時5,000円か6,000円）／ポイント制・査定時給", "tags": ["高時給", "未経験歓迎", "ヘアメイク店内"], "features": ["素人さん大歓迎", "客層は経営者など年齢層高め", "定休日：日曜・祝日"], "tel": "", "reviewKey": "\\u0072\\u0075\\u0062\\u0079|\\u30eb\\u30d3\\u30fc", "added": "2026-10-15"},  // 写真が来たら photo に "img/shinchi-c02/main.jpg"
  {"name": "SALON DE EAU（サロンドオゥ）", "nameEn": "SALON DE EAU", "kana": "サロンドオゥ", "type": "ラウンジ", "area": "三宮", "address": "兵庫県 神戸市 中央区", "pay": "時給 3,000円〜7,500円", "url": "sannomiya-l01.html", "photo": "", "pickup": true, "pref": "兵庫県", "city": "神戸市", "catchCopy": "時給3,000円〜7,500円。オープン25年以上、三宮で一番の大箱の高級ラウンジ", "hours": "営業時間 20:00〜翌0:30", "station": "三ノ宮駅", "transport": "要確認", "qualify": "20歳以上希望", "payDetail": "時給3,000円〜7,500円（同伴・導引の売上制）／皆勤賞30,000円など", "tags": ["ノルマなし", "終電上がりOK", "ヘアメイク店内"], "features": ["オープン25年以上の老舗", "三宮で一番の大箱", "週3日〜"], "tel": "", "reviewKey": "\\u0073\\u0061\\u006c\\u006f\\u006e ?\\u0064\\u0065 ?\\u0065\\u0061\\u0075|\\u30b5\\u30ed\\u30f3\\u30c9\\u30aa\\u30a5|\\u30b5\\u30ed\\u30f3\\u30c9\\u30aa\\u30fc", "added": "2026-10-15"},  // 写真が来たら photo に "img/sannomiya-l01/main.jpg"
  {"name": "CLUB S-CLASS（エスクラス）", "nameEn": "CLUB S-CLASS", "kana": "エスクラス", "type": "キャバクラ", "area": "三宮", "address": "兵庫県 神戸市 中央区加納町", "pay": "体入 時給 8,000円〜", "url": "sannomiya-c01.html", "photo": "img/sannomiya-c01/main.jpg", "pickup": true, "trial": true, "isNew": true, "pref": "兵庫県", "city": "神戸市", "catchCopy": "体験入店は時給8,000円〜で全額日払い。ノルマなし・送迎ありの三宮のキャバクラ", "hours": "19:00〜LAST（年中無休）", "station": "三宮駅 徒歩3分", "transport": "規定額を支給", "qualify": "18歳以上（高校生不可）・未経験歓迎・履歴書不要", "payDetail": "体験入店 時給8,000円〜（全額日払い）／入店後 時給6,000円〜＋各種バック／入店後も規定額まで即日払い", "tags": ["体入全額日払い", "ノルマなし", "送迎あり", "週1日〜OK", "履歴書不要", "レンタルドレス"], "features": ["年中無休・駅から徒歩3分", "個人ロッカー完備", "寮・託児所の紹介あり"], "tel": "09042759771", "reviewKey": "\\u0073\\u002d\\u0063\\u006c\\u0061\\u0073\\u0073|\\u30a8\\u30b9\\u30af\\u30e9\\u30b9", "added": "2026-11-02"},
  {"name": "Girl's Bar Rezel（レゼル）", "nameEn": "Girl's Bar Rezel", "kana": "レゼル", "type": "ガールズバー", "area": "上野", "address": "東京都 台東区 上野", "pay": "時給は相場より高め", "url": "ueno-g01.html", "photo": "", "pickup": true, "pref": "東京都", "city": "台東区", "catchCopy": "上野のガールズバーの中でも、時給の相場は高めです", "hours": "営業時間 18:00〜LAST", "station": "上野", "transport": "要確認", "qualify": "18歳以上（高校生不可）", "payDetail": "時給は相場より高め（くわしくはお店に確認中）", "tags": ["週1日〜OK", "私服OK", "終電上がりOK"], "features": ["週1日〜OK", "早い時間から営業", "私服で働ける", "定休日：なし（年中営業）"], "tel": "", "line": "https://lin.ee/v7GLaD2", "reviewKey": "\\u0072\\u0065\\u007a\\u0065\\u006c|\\u30ec\\u30bc\\u30eb", "added": "2026-11-01"},
  {"name": "CLUB H～EICHI～（エイチ）", "nameEn": "CLUB H～EICHI～", "kana": "エイチ", "type": "キャバクラ", "area": "上野", "address": "東京都 台東区 上野", "pay": "お店に確認中", "url": "ueno-c01.html", "photo": "", "pickup": true, "pref": "東京都", "city": "台東区", "catchCopy": "ノルマがないので、自分のペースで働けます", "hours": "営業時間 20:00〜LAST", "station": "上野", "transport": "要確認", "qualify": "18歳以上（高校生不可）", "payDetail": "お店に確認中（くわしくはお店に確認中）", "tags": ["ノルマなし", "ボトルの原価引きなし", "常連客多め"], "features": ["ボトルの原価引きなし", "常連のお客様が多い", "落ち着いた店内", "定休日：年中無休"], "tel": "", "line": "https://lin.ee/v7GLaD2", "reviewKey": "\\u0065\\u0069\\u0063\\u0068\\u0069|\\u30a8\\u30a4\\u30c1", "added": "2026-11-01"},
  {"name": "EPIC（エピック）", "nameEn": "EPIC", "kana": "エピック", "type": "キャバクラ", "area": "上野", "address": "東京都 台東区 上野", "pay": "高時給の相談OK", "url": "ueno-c02.html", "photo": "", "pickup": true, "pref": "東京都", "city": "台東区", "catchCopy": "経験や実績に合わせて、高い時給の相談ができます", "hours": "営業時間 20:00〜LAST", "station": "上野", "transport": "要確認", "qualify": "18歳以上（高校生不可）", "payDetail": "高時給の相談OK（くわしくはお店に確認中）", "tags": ["高時給の相談OK", "ノルマなし", "大箱"], "features": ["ノルマなし", "70坪の大箱", "客層が落ち着いている", "定休日：日曜日"], "tel": "", "line": "https://lin.ee/v7GLaD2", "reviewKey": "\\u0065\\u0070\\u0069\\u0063|\\u30a8\\u30d4\\u30c3\\u30af", "added": "2026-11-01"},
  {"name": "club 蓮（レン）", "nameEn": "club 蓮", "kana": "レン", "type": "キャバクラ", "area": "上野", "address": "東京都 台東区 上野", "pay": "お店に確認中", "url": "ueno-c03.html", "photo": "", "pickup": true, "pref": "東京都", "city": "台東区", "catchCopy": "ノルマがないので、自分のペースで働けます", "hours": "営業時間 20:00〜LAST", "station": "上野", "transport": "要確認", "qualify": "18歳以上（高校生不可）", "payDetail": "お店に確認中（くわしくはお店に確認中）", "tags": ["ノルマなし", "2フロア", "VIPルームあり"], "features": ["2階建て・2フロア", "客層がとても良い", "上野の大型店", "定休日：日曜日"], "tel": "", "line": "https://lin.ee/v7GLaD2", "reviewKey": "\\u0063\\u006c\\u0075\\u0062\\u84ee|\\u30af\\u30e9\\u30d6\\u84ee|\\u0063\\u006c\\u0075\\u0062\\u0020\\u84ee|\\u0063\\u006c\\u0075\\u0062\\u0020\\u0072\\u0065\\u006e", "added": "2026-11-01"},
  {"name": "Capone（カポネ）", "nameEn": "Capone", "kana": "カポネ", "type": "キャバクラ", "area": "上野", "address": "東京都 台東区 上野", "pay": "時給は控えめ・バックが高め", "url": "ueno-c04.html", "photo": "", "pickup": true, "pref": "東京都", "city": "台東区", "catchCopy": "時給は控えめなぶん、バックが高く稼ぎやすいお店です", "hours": "営業時間 20:00〜LAST", "station": "上野", "transport": "要確認", "qualify": "18歳以上（高校生不可）", "payDetail": "時給は控えめ・バックが高め（くわしくはお店に確認中）", "tags": ["バックが高め", "集客力◎", "客層◎"], "features": ["上野仲町通りでトップクラスの集客", "客層が良い", "広めの店内", "定休日：日曜日"], "tel": "", "line": "https://lin.ee/v7GLaD2", "reviewKey": "\\u0063\\u0061\\u0070\\u006f\\u006e\\u0065|\\u30ab\\u30dd\\u30cd", "added": "2026-11-01"},
  {"name": "Mint（ミント）", "nameEn": "Mint", "kana": "ミント", "type": "キャバクラ", "area": "上野", "address": "東京都 台東区 上野", "pay": "お店に確認中", "url": "ueno-c05.html", "photo": "", "pickup": true, "pref": "東京都", "city": "台東区", "catchCopy": "働く女の子への待遇を大切にしているお店です", "hours": "営業時間 19:00〜翌1:00", "station": "上野", "transport": "要確認", "qualify": "18歳以上（高校生不可）", "payDetail": "お店に確認中（くわしくはお店に確認中）", "tags": ["キャストへの高待遇", "豪華な内装", "広い店内"], "features": ["豪華な内装", "広い店内", "19時から営業", "定休日：日曜日"], "tel": "", "line": "https://lin.ee/v7GLaD2", "reviewKey": "\\u006d\\u0069\\u006e\\u0074|\\u30df\\u30f3\\u30c8", "added": "2026-11-01"},
  {"name": "grand cru（グランクリュ）", "nameEn": "grand cru", "kana": "グランクリュ", "type": "キャバクラ", "area": "上野", "address": "東京都 台東区 上野", "pay": "永久保証あり・高時給の相談OK", "url": "ueno-c06.html", "photo": "", "pickup": true, "pref": "東京都", "city": "台東区", "catchCopy": "ノルマがなく、保証もずっと続くうえに高時給の相談もできます", "hours": "営業時間 20:00〜LAST", "station": "上野", "transport": "要確認", "qualify": "18歳以上（高校生不可）", "payDetail": "永久保証あり・高時給の相談OK（くわしくはお店に確認中）", "tags": ["ノルマなし", "永久保証", "タトゥー相談OK"], "features": ["女子給の還元率が高め", "タトゥーの相談がしやすい", "月30万円の売上で勤怠ペナルティ免除", "定休日：日曜日"], "tel": "", "line": "https://lin.ee/v7GLaD2", "reviewKey": "\\u0067\\u0072\\u0061\\u006e\\u0064\\u0020\\u0063\\u0072\\u0075|\\u0067\\u0072\\u0061\\u006e\\u0064\\u0063\\u0072\\u0075|\\u30b0\\u30e9\\u30f3\\u30af\\u30ea\\u30e5", "added": "2026-11-01"},
  {"name": "BIYOND（ビヨンド）", "nameEn": "BIYOND", "kana": "ビヨンド", "type": "キャバクラ", "area": "上野", "address": "東京都 台東区 上野", "pay": "高時給の相談OK", "url": "ueno-c07.html", "photo": "", "pickup": true, "pref": "東京都", "city": "台東区", "catchCopy": "お客様が多く、接客の機会が多いお店です", "hours": "営業時間 20:00〜LAST", "station": "上野", "transport": "要確認", "qualify": "18歳以上（高校生不可）", "payDetail": "高時給の相談OK（くわしくはお店に確認中）", "tags": ["集客力◎", "2フロア", "系列店多数"], "features": ["2階建て・2フロア", "客層が良い", "系列店が多く安心", "定休日：年中無休"], "tel": "", "line": "https://lin.ee/v7GLaD2", "reviewKey": "\\u0062\\u0069\\u0079\\u006f\\u006e\\u0064|\\u0062\\u0065\\u0079\\u006f\\u006e\\u0064|\\u30d3\\u30e8\\u30f3\\u30c9", "added": "2026-11-01"},
  {"name": "DINO（ディーノ）", "nameEn": "DINO", "kana": "ディーノ", "type": "キャバクラ", "area": "上野", "address": "東京都 台東区 上野", "pay": "お店に確認中", "url": "ueno-c08.html", "photo": "", "pickup": true, "pref": "東京都", "city": "台東区", "catchCopy": "長く続いているお店で、教育の体制も整っています", "hours": "営業時間 18:00〜24:00", "station": "上野", "transport": "要確認", "qualify": "18歳以上（高校生不可）", "payDetail": "お店に確認中（くわしくはお店に確認中）", "tags": ["老舗店", "教育体制◎", "給料日は月2回"], "features": ["給料日は月2回", "18時〜24時の営業", "はじめてでも安心", "定休日：日曜日"], "tel": "", "line": "https://lin.ee/v7GLaD2", "reviewKey": "\\u0064\\u0069\\u006e\\u006f|\\u30c7\\u30a3\\u30fc\\u30ce", "added": "2026-11-01"},
  {"name": "Godfather（ゴッドファーザー）", "nameEn": "Godfather", "kana": "ゴッドファーザー", "type": "キャバクラ", "area": "上野", "address": "東京都 台東区 上野", "pay": "半永久保証・給料は週払い", "url": "ueno-c09.html", "photo": "", "pickup": true, "pref": "東京都", "city": "台東区", "catchCopy": "ノルマがないので、自分のペースで働けます", "hours": "営業時間 20:00〜翌1:00", "station": "上野", "transport": "要確認", "qualify": "18歳以上（高校生不可）", "payDetail": "半永久保証・給料は週払い（くわしくはお店に確認中）", "tags": ["ノルマなし", "半永久保証", "給料週払い"], "features": ["半永久保証", "給料は週払い", "集客はエリアトップクラス", "定休日：日曜日・祝日"], "tel": "", "line": "https://lin.ee/v7GLaD2", "reviewKey": "\\u0067\\u006f\\u0064\\u0066\\u0061\\u0074\\u0068\\u0065\\u0072|\\u30b4\\u30c3\\u30c9\\u30d5\\u30a1\\u30fc\\u30b6\\u30fc", "added": "2026-11-01"},
  {"name": "華小町（はなこまち）", "nameEn": "華小町", "kana": "はなこまち", "type": "キャバクラ", "area": "祇園", "address": "京都府 京都市 東山区", "pay": "時給 8,000円〜", "url": "gion-c04.html", "photo": "", "pickup": true, "pref": "京都府", "city": "京都市", "catchCopy": "京都・祇園で最大級のフロア面積。築130年以上の京町家をリノベーションした、祇園のデザイナーズキャバクラです。", "hours": "営業時間 19:00〜LAST", "station": "京阪「祇園四条駅」徒歩3分", "transport": "要確認", "qualify": "18歳以上（高校生不可）", "payDetail": "体験入店・入店とも時給8,000円〜。経験者は面談のうえ、さらに優遇", "tags": ["時給8,000円〜", "日払いOK", "週1日〜OK", "寮あり", "ヘアメイクあり"], "features": ["祇園最大級の4フロア", "ドレスショップ並みのレンタル衣装", "VIPのお客様が多い", "定休日：日曜日"], "tel": "08049819816", "line": "https://lin.ee/v7GLaD2", "reviewKey": "\\u83ef\\u5c0f\\u753a|\\u306f\\u306a\\u3053\\u307e\\u3061|\\u0068\\u0061\\u006e\\u0061\\u006b\\u006f\\u006d\\u0061\\u0063\\u0068\\u0069", "column": "column/gion-4shops.html", "added": "2026-11-01"},
  {"name": "MILANO（ミラノ）", "nameEn": "MILANO", "kana": "ミラノ", "type": "キャバクラ", "area": "祇園", "address": "京都府 京都市 東山区", "pay": "時給 8,000円〜", "url": "gion-c05.html", "photo": "", "pickup": true, "pref": "京都府", "city": "京都市", "catchCopy": "体験入店から時給8,000円。上下関係なし・ノルマなしで、ゆるく楽しく高収入をめざせる祇園のニュークラブです。", "hours": "営業時間 19:00〜LAST", "station": "京阪「祇園四条駅」徒歩5分", "transport": "要確認", "qualify": "18歳以上（高校生不可）", "payDetail": "体験入店も時給8,000円（全額日払い）。本入店後も時給8,000円〜＋各種バック・時給スライド制", "tags": ["時給8,000円〜", "全額日払い", "保証あり", "ノルマなし", "終電上がりOK"], "features": ["ノルマ・ペナルティなし", "何度でも体験入店OK", "福利厚生が充実", "定休日：日曜日（祝日は営業）"], "tel": "07031440767", "line": "https://lin.ee/v7GLaD2", "reviewKey": "\u006d\u0069\u006c\u0061\u006e\u006f|\u30df\u30e9\u30ce", "column": "column/gion-4shops.html", "added": "2026-11-01"},
  {"name": "Bar Ratel（ラーテル）", "nameEn": "Bar Ratel", "kana": "ラーテル", "type": "ガールズバー", "area": "天満", "address": "大阪府 大阪市 北区", "pay": "時給 2,000円〜", "url": "tenma-g02.html", "photo": "", "pickup": true, "isNew": true, "pref": "大阪府", "city": "大阪市", "catchCopy": "時給2,000円〜。週1日・1日3時間からの自由シフトで、日払い・送りありの天満のガールズバー", "hours": "営業時間 20:00〜LAST", "station": "天満駅 徒歩1分", "transport": "要確認", "qualify": "18歳以上（高校生不可）・未経験歓迎・Wワーク歓迎", "payDetail": "時給2,000円〜（体験入店も同じ）／指名・ドリンクのバックあり／日払いOK（体験入店の日は全額）", "tags": ["新規オープン", "週1日〜OK", "日払いOK", "送りあり", "ノルマなし", "履歴書不要", "18歳OK"], "features": ["完全自由シフト（1日3時間〜）", "閉店後の送りは無料", "衣装の貸し出し・ヘアメイク・ロッカーあり"], "tel": "", "reviewKey": "\\u0072\\u0061\\u0074\\u0065\\u006c|\\u30e9\\u30fc\\u30c6\\u30eb", "added": "2026-11-01"},
  {"name": "NOVA ROPPONGI（ノヴァ）", "nameEn": "NOVA ROPPONGI", "kana": "ノヴァ", "type": "キャバクラ", "area": "六本木", "address": "東京都 港区 六本木", "pay": "時給 10,000円〜60,000円", "url": "roppongi-c01.html", "photo": "", "pickup": true, "isNew": true, "pref": "東京都", "city": "港区", "catchCopy": "2026年9月28日リニューアルオープン。時給1万〜6万円、ノルマなし・ヘアメイク店内の六本木駅すぐのキャバクラ", "hours": "営業時間 20:00〜LAST", "station": "六本木駅 徒歩1分", "transport": "要確認", "qualify": "20歳以上・未経験歓迎・Wワーク歓迎", "payDetail": "時給10,000円〜60,000円（原則2ヶ月保証）／時給制か売上制（小計60%）を選択／日払いは1日20,000円まで", "tags": ["新規オープン", "高時給", "ノルマなし", "ヘアメイク店内", "私服OK", "週1日〜OK", "送りあり"], "features": ["2026年9月28日オープン", "メインフロア16卓・個室VIP4部屋", "遅刻・欠勤のペナルティなし"], "tel": "", "reviewKey": "\\u006e\\u006f\\u0076\\u0061|\\u30ce\\u30f4\\u30a1|\\u30ce\\u30d0", "added": "2026-11-01"},
  {"name": "銀座 BARCELONA 萌葱（もえぎ）", "nameEn": "BARCELONA 萌葱", "kana": "もえぎ", "type": "キャバクラ", "area": "銀座", "address": "東京都 中央区 銀座", "pay": "時給制（お問い合わせください）", "url": "ginza-c01.html", "photo": "", "pickup": true, "isNew": true, "pref": "東京都", "city": "中央区", "catchCopy": "2026年11月2日グランドオープン。銀座8丁目・2フロアの新しいキャバクラでオープニングキャスト募集", "hours": "営業時間 20:00〜", "station": "新橋駅・銀座駅", "transport": "要確認", "qualify": "お問い合わせください（18歳未満・高校生不可）", "payDetail": "時給制（金額は面接で決定）／ドリンク・場内などのバックあり／日払い10,000円〜相談可", "tags": ["新規オープン", "オープニングスタッフ", "ノルマなし", "日払いOK", "送りあり", "ドレス貸出無料", "寮あり"], "features": ["2026年11月2日オープン", "7F・8Fの2フロアと個室", "ヘアメイク代1,500円までお店負担"], "tel": "", "reviewKey": "\\u840c\\u8471|\\u3082\\u3048\\u304e|\\u30e2\\u30a8\\u30ae|\\u006d\\u006f\\u0065\\u0067\\u0069", "added": "2026-11-01"},
  {"name": "T.i.M -TIME is MATCH-（ティーアイエム）", "nameEn": "T.i.M -TIME is MATCH-", "kana": "ティーアイエム", "type": "ラウンジ", "area": "本町", "address": "大阪府 大阪市 中央区", "pay": "時給 4,000円〜", "url": "honmachi-l01.html", "photo": "", "pickup": true, "isNew": true, "pref": "大阪府", "city": "大阪市", "catchCopy": "2026年11月下旬オープン予定。月1回・1日1時間から入れる、私服OKの登録制ラウンジ", "hours": "営業時間 20:00〜LAST", "station": "本町駅 徒歩2分", "transport": "要確認", "qualify": "20歳以上・未経験歓迎・Wワーク歓迎", "payDetail": "時給4,000円〜（体験入店も同じ）／各種バック・保証あり／日払いOK", "tags": ["新規オープン", "オープニングスタッフ", "登録制", "私服OK", "ノルマなし", "日払いOK", "送りあり"], "features": ["2026年11月下旬オープン予定", "月1回・1日1時間からOK", "定休日：日曜日・祝日"], "tel": "09016651949", "reviewKey": "\\u0074\\u002e\\u0069\\u002e\\u006d|\\u30c6\\u30a3\\u30fc\\u30a2\\u30a4\\u30a8\\u30e0|\\u0074\\u0069\\u006d\\u0065\\u0020\\u0069\\u0073\\u0020\\u006d\\u0061\\u0074\\u0063\\u0068", "added": "2026-11-07"},
  {"name": "美魔女LOUNGE 夢宵（ユメヨイ）", "nameEn": "美魔女LOUNGE 夢宵", "kana": "ユメヨイ", "type": "ラウンジ", "area": "梅田", "address": "大阪府 大阪市 福島区", "pay": "時給 2,500円〜", "url": "fukushima-l01.html", "photo": "", "pickup": true, "isNew": true, "pref": "大阪府", "city": "大阪市", "catchCopy": "2026年9月オープン。20代〜40代の大人の女性が活躍する、野田阪神駅すぐのラウンジ", "hours": "営業時間 19:00〜LAST", "station": "野田阪神駅 徒歩1分", "transport": "要確認", "qualify": "お問い合わせください（18歳未満・高校生不可）・未経験歓迎・子育て中の方歓迎", "payDetail": "時給2,500円〜＋各種バック／体験入店の日は全額日払い", "tags": ["新規オープン", "週1日〜OK", "全額日払い", "送りあり", "ドレス貸出", "ノルマなし", "終電上がりOK"], "features": ["2026年9月1日オープン", "大阪全域へ無料の送り", "定休日：日曜日"], "tel": "09068336716", "reviewKey": "\\u5922\\u5bb5|\\u30e6\\u30e1\\u30e8\\u30a4|\\u3086\\u3081\\u3088\\u3044", "added": "2026-11-07"},
  {"name": "TŌU（トウ）", "nameEn": "TŌU", "kana": "トウ", "type": "ラウンジ", "area": "北新地", "address": "大阪府 大阪市 北区", "pay": "時給 3,000円〜", "url": "shinchi-l01.html", "photo": "", "pickup": true, "isNew": true, "pref": "大阪府", "city": "大阪市", "catchCopy": "2026年9月オープン。時給3,000円〜、指名・同伴フルバック、土日祝休みの北新地のラウンジ", "hours": "営業時間 20:00〜LAST", "station": "北新地駅 徒歩5分", "transport": "交通費支給", "qualify": "お問い合わせください（18歳未満・高校生不可）・未経験歓迎", "payDetail": "時給3,000円〜＋各種バック（指名・同伴フルバック）／時給保証あり／日払いは決まった金額まで", "tags": ["新規オープン", "オープニングスタッフ", "週1日〜OK", "交通費支給", "ドレス貸出", "ノルマなし", "終電上がりOK"], "features": ["2026年9月1日オープン", "土日祝はお休み", "終電後はタクシー代支給"], "tel": "07023230966", "reviewKey": "\\u0074\\u014d\\u0075|\\u30c8\\u30a6", "added": "2026-11-07"},
  // ==自動追加 ここまで==
  { name: "梅田のキャバクラ", type: "キャバクラ", area: "梅田", address: "大阪府 大阪市", pay: "2万5千円〜3万円" },
  { name: "北新地のキャバクラ", type: "キャバクラ", area: "北新地", address: "大阪府 大阪市", pay: "3万5千円〜5万円" },
  { name: "梅田のキャバクラ", type: "キャバクラ", area: "梅田", address: "大阪府 大阪市", pay: "2万5千円〜2万8千円" }
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
        '<span class="dc-over">' + (j.isNew ? '<span class="dc-badge">NEW OPEN</span>' : '') + (j.trial ? '<span class="dc-badge">体験入店あり</span>' : '') +
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

/* ===== 口コミ（飲み屋）共通 =====
   口コミ台帳から承認済みの口コミを読み、求人の reviewKey（店名の言い方を | で区切ったもの）で店ごとに振り分ける。
   口コミページは kuchikomi.html?u=（求人ページのファイル名） で開く */
window.AREA_REVIEW_API = "https://script.google.com/macros/s/AKfycbxV6TXowRKiK_Z6MVrdsMwkZdnJ622lR388-dIBGZJud2FyxwcCpaUfUpmw1szI2lg/exec";
window.areaReviews = (function () {
  var cache = null;
  var keyOf = function (j) {
    if (j.reviewKey) return j.reviewKey;
    var base = String(j.name || "").replace(/（.*?）|\(.*?\)/g, "").trim();
    return base.indexOf("●") >= 0 ? "" : base.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  };
  var match = function (j, r) {
    var k = keyOf(j); if (!k) return false;
    try { return new RegExp(k, "i").test(String(r.shop || "")); } catch (e) { return false; }
  };
  return {
    load: function () {
      if (!cache) cache = fetch(window.AREA_REVIEW_API + "?view=reviews").then(function (r) { return r.json(); })
        .then(function (d) { return d && d.rows ? d.rows : []; }).catch(function () { return []; });
      return cache;
    },
    of: function (j, rows) { return (rows || []).filter(function (r) { return match(j, r); }); },
    pageUrl: function (j) { return "kuchikomi.html?u=" + encodeURIComponent(j.url || ""); },
    writeUrl: function (j) { return window.AREA_REVIEW_API + "?shop=" + encodeURIComponent(String(j.name || "").replace(/（.*?）/g, "").trim()) + "&area=" + encodeURIComponent(j.area || ""); }
  };
})();
