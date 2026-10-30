/* Area REVIEW（風俗・メンズエステ・セクキャバの口コミサイト）の店舗データ
   ・店舗を増やすときは、この一覧に1件足すだけでOK（トップの一覧と店舗ページの両方に出ます）
   ・店舗ページは shop.html?id=（id の値） で開きます
   ・hold: "理由" を入れると、一覧にも店舗ページにも出しません（理由は画面に出ません）
   ・soon: true は、一覧に「準備中」のカードだけ出します（店舗ページはまだ開けません）
   ・banner はお店のメイン画像、photos は店内写真（どちらもお店に使用OKをもらったものを入れる）。income はお店が出している月収例
   ・ext は、他サイトに投稿された「働いた女性の口コミ」の要約（本文は転載せず、出典リンク付きで別枠に表示）
   ・keys は、口コミの「お店の名前」と照らし合わせる言葉。どれかを含む口コミがこの店の口コミになります */
window.RV_SHOPS = [
  { id: "kanojonchi", name: "彼女ん家", kana: "カノジョンチ", genre: "メンズエステ", style: "マンション型",
    area: "新大阪", areaLabel: "新大阪", access: "JR・大阪メトロ 新大阪駅",
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

  /* ===== ピックアップ（2026-10-28 追加）：新大阪・梅田 =====
     求人媒体などの公開情報から確認できた範囲だけ載せています。空欄の項目は画面に「確認中」と出ます */

  // --- 新大阪・西中島：メンズエステ ---
  { id: "kiwamispa", name: "極SPA", kana: "キワミスパ", genre: "メンズエステ", style: "ルーム型",
    area: "新大阪", areaLabel: "新大阪", access: "新大阪駅 東口・7番出口から徒歩約3分",
    hours: "11:00〜翌5:00", wait: "個室待機（自宅待機も可）",
    pay: "60分 5,000〜8,000円", paySub: "90分 6,000〜10,000円／120分 9,000〜13,000円／150分 12,000〜15,000円",
    back: "指名料・オプションは全額バック", deduct: "雑費・罰金なし",
    other: "日払いOK／未経験歓迎（DVDと口頭の講習）／無料の寮あり／送迎あり",
    keys: ["極SPA", "極スパ", "きわみスパ", "gokuspa"], checked: "2026-10-28",
    ext: [{ site: "メンエス求人", url: "https://men-esthe-job.jp/area.php?id=80", checked: "2026-10-28", good: "バック50%に、オプション（3,000円〜）の分が上乗せになる", bad: "", note: "集客はそこそこある" }] },
  { id: "alivie", name: "Alivie", kana: "アリビエ", genre: "メンズエステ", style: "ルーム型（アロマオイル）",
    area: "新大阪", areaLabel: "新大阪・西中島", access: "JR新大阪駅 東口すぐ／西中島南方駅すぐ（2ルーム）",
    hours: "10:00〜翌5:00", wait: "完全個室待機",
    pay: "90分 7,000〜16,000円", back: "指名料・衣装・オリジナル 各最高3,000円",
    deduct: "罰金なし（雑費は確認中）",
    other: "当日払い可（規定あり）／未経験は無料研修／ノルマなし／制服貸与",
    keys: ["Alivie", "アリビエ"], checked: "2026-10-28",
    ext: [{ site: "メンエス求人", url: "https://men-esthe-job.jp/area.php?id=80", checked: "2026-10-28", good: "バック50%スタートで、指名が増えると上がる／客層は悪くない", bad: "バック単価が低めで、稼ぐには本数をこなす必要がある", note: "新人期間は比較的忙しい" }] },
  { id: "4h", name: "4h", kana: "フォーエイチ", genre: "メンズエステ",
    area: "新大阪", areaLabel: "新大阪", access: "大阪市東淀川区東中島",
    keys: ["4h", "フォーエイチ"], checked: "2026-10-28",
    ext: [{ site: "メンエス求人", url: "https://men-esthe-job.jp/area.php?id=80", checked: "2026-10-28", good: "オプション・雑費がない／フリー客が多く、そこそこ繁盛", bad: "性的なサービスを求める客が多め", note: "" }] },
  { id: "mokukindo", name: "もくきん堂", kana: "モクキンドウ", genre: "メンズエステ",
    area: "新大阪", areaLabel: "西中島", access: "大阪市淀川区西中島",
    keys: ["もくきん堂"], checked: "2026-10-28",
    ext: [{ site: "メンエス求人", url: "https://men-esthe-job.jp/area.php?id=80", checked: "2026-10-28", good: "100分8,000円バック、指名料・オプションは全額バック／交通費も出た", bad: "", note: "待機は少なめで、客層は悪くない" }] },

  // --- 新大阪・西中島：セクキャバ ---
  { id: "bijinkan", name: "びじん館 本店", kana: "ビジンカン", genre: "セクキャバ",
    area: "新大阪", areaLabel: "西中島", access: "大阪市淀川区西中島1-12-20 山よしビルB1F",
    pay: "体験 3時間 15,000円／5時間 22,000円（昼の部）", paySub: "本入店 時給2,000円〜＋ポイント",
    other: "昼の部あり",
    keys: ["びじん館", "美人館"], checked: "2026-10-28" },

  // --- 新大阪・西中島：ホテヘル・その他 ---
  { id: "fuzokujo", name: "風俗城", genre: "ホテヘル",
    area: "新大阪", areaLabel: "新大阪・西中島", access: "西中島・新大阪周辺",
    hours: "10:00〜翌5:00", wait: "個室待機",
    deduct: "ノルマ・罰金なし（雑費は確認中）",
    other: "完全日払い／週1日・2〜3時間からOK／未経験歓迎／託児所・寮・送迎あり／デリバリーも受付",
    keys: ["風俗城"], checked: "2026-10-28" },
  { id: "shinosaka-himitsu", name: "新大阪秘密倶楽部", genre: "その他風俗", style: "M性感",
    area: "新大阪", areaLabel: "西中島", access: "大阪市淀川区西中島3-16-8",
    keys: ["新大阪秘密倶楽部", "秘密倶楽部"], checked: "2026-10-28" },

  // --- 梅田：メンズエステ ---
  { id: "usaginoheya", name: "うさぎのお部屋", kana: "ウサギノオヘヤ", genre: "メンズエステ", style: "ルーム型",
    area: "梅田", areaLabel: "梅田", access: "梅田駅周辺（日本橋にも事務所）",
    pay: "90分 15,000円〜", other: "日払い可／未経験歓迎／送迎あり／週1日・3時間からOK",
    keys: ["うさぎのお部屋"], checked: "2026-10-28",
    ext: [{ site: "メンエス求人", url: "https://men-esthe-job.jp/area.php?id=70", checked: "2026-10-28", good: "集客が良く、客層も良い", bad: "", note: "バック50%（60分6,000円）" }] },
  { id: "madam-shinshi", name: "マダムと紳士", kana: "マダムトシンシ", genre: "メンズエステ", style: "ルーム型",
    area: "梅田", areaLabel: "梅田", access: "梅田駅 徒歩10分（日本橋にもルーム）",
    pay: "90分 14,000円〜", other: "日払い可／未経験歓迎／送迎あり／罰金・ノルマなし",
    keys: ["マダムと紳士"], checked: "2026-10-28" },
  { id: "darlin-premium", name: "Darlin Premium", kana: "ダーリンプレミアム", genre: "メンズエステ",
    area: "梅田", areaLabel: "梅田", access: "大阪市北区西天満4丁目",
    keys: ["Darlin Premium", "ダーリンプレミアム"], checked: "2026-10-28",
    ext: [{ site: "メンエス求人", url: "https://men-esthe-job.jp/area.php?id=70", checked: "2026-10-28", good: "", bad: "料金は店と折半（50%）／部屋が古い／お触りなどを求める客が多い", note: "求人では「指名料全額バック・客層良好」とあり、口コミと食い違う" }] },
  { id: "belchic", name: "BELCHIC", genre: "メンズエステ",
    area: "梅田", areaLabel: "梅田", access: "大阪市北区（梅田）",
    keys: ["BELCHIC", "ベルシック"], checked: "2026-10-28" },
  { id: "prince", name: "PRINCE", kana: "プリンス", genre: "メンズエステ",
    area: "梅田", areaLabel: "梅田", access: "大阪市北区（梅田）",
    keys: ["PRINCE", "プリンス"], checked: "2026-10-28",
    ext: [{ site: "メンエス求人", url: "https://men-esthe-job.jp/area.php?id=70", checked: "2026-10-28", good: "", bad: "90分コースで基本給は約7,000円", note: "求人の「最大バック70%」とは金額が合わない。水着はなく、ベビードールはオプション" }] },

  // --- 梅田：セクキャバ ---
  { id: "bakeneko", name: "BAKENEKO俱楽部", kana: "バケネコクラブ", genre: "セクキャバ",
    area: "梅田", areaLabel: "梅田", access: "大阪市北区神山町", hours: "20:00〜翌1:00",
    pay: "体験 時給7,000円保証", paySub: "本入店 時給4,000〜6,000円＋バック", deduct: "10%＋1,500円",
    other: "衣装：ドレス", keys: ["BAKENEKO", "バケネコ", "化け猫"], checked: "2026-10-28" },
  { id: "rich-collection", name: "RICH COLLECTION", kana: "リッチコレクション", genre: "セクキャバ", style: "ツーショットキャバクラ",
    area: "梅田", areaLabel: "梅田", access: "大阪市北区神山町8-9 マンビル 地下1階",
    hours: "18:00〜LAST（勤務時間は相談可／週1日〜OK）", wait: "個別待機",
    pay: "体験 時給4,000〜7,000円 確実保証", paySub: "日給保証 最低15,000円（6時間以上の勤務で）",
    back: "各種バック・ボトルバックあり／友達紹介ボーナスあり",
    deduct: "雑費1,000円＋10%",
    other: "体験入店は全額日払い／本入店後は一部日払い可／ノルマなし／衣装（ベビードール）無料貸与／鍵付きロッカー／送りあり（大阪府内・他県もOK）／面接〜体験時のお迎えあり／応募資格：18〜32歳くらいまで（高校生不可）／体験入店に必要なもの：顔写真付きの身分証と、本籍地入りのマイナンバーカードか住民票",
    income: ["月収173万円＋ボトルバック（週3〜4日・1日6時間）", "月収132万円＋ボトルバック（週6日・1日5〜8時間）", "月収113万円＋ボトルバック（週4日・1日4時間）", "月収83万円（週4日・1日4時間）", "月収74万円（週2〜3日・1日5〜6時間）"],
    banner: "img/shops/rich-collection/banner.jpg",
    photos: ["img/shops/rich-collection/1.jpg", "img/shops/rich-collection/2.jpg", "img/shops/rich-collection/3.jpg", "img/shops/rich-collection/4.jpg"],
    keys: ["RICH COLLECTION", "リッチコレクション", "リッチコレ"], checked: "2026-10-29" },
  { id: "rich-academy", name: "RICH ACADEMY", kana: "リッチアカデミー", genre: "セクキャバ", style: "ツーショットキャバクラ",
    area: "梅田", areaLabel: "梅田", access: "大阪市北区太融寺町7-1 大栄レジャービル 地下1階（最寄り 東梅田駅）",
    hours: "15:00〜LAST（勤務時間は相談可／週1日〜OK）", wait: "個別待機",
    pay: "体験 時給4,000〜最大7,000円", paySub: "体験時給は面接で決定／本入店後は売上の半分（例：月の売上160万円なら80万円）",
    back: "シャンパンバックあり／友達紹介ボーナスあり",
    deduct: "10%＋雑費1,000円",
    other: "体験入店は全額日払い／本入店後は一部日払い可／日給保証あり（最低15,000円〜）／ノルマなし／衣装：韓国風のJK制服を無料貸与／女性専用トイレ・更衣室・鍵付きロッカー・ドレッサー・ReFa・アメニティあり／ノンアルあり（お酒が飲めなくてもOK）／送りあり（大阪府内・他県もOK）／面接〜体験時のお迎えあり／女性スタッフ在籍／応募資格：18〜32歳くらいまで（高校生不可）／体験入店に必要なもの：顔写真付きの身分証と、本籍地入りのマイナンバーカードか住民票",
    incomeTitle: "月収例（2026年4月・強化イベントの月）",
    income: ["Yさん：220万円（シャンパンバック込み）　時給換算 約2万円／週4〜5日・指名57本・在籍 約6か月",
             "Mさん：120万円（シャンパンバック込み）　時給換算 約8,600円／週4日・指名29本・在籍1年",
             "Mさん：120万円（シャンパンバック込み）　時給換算 約8,500円／週3〜4日・指名54本・在籍1年",
             "Kさん：85万円（シャンパンバック込み）　時給換算 約6,500円／週5日・指名25本・在籍6か月",
             "Mさん：70万円（シャンパンバック込み）　時給換算 約5,000円／週3日・指名21本・在籍1年5か月"],
    keys: ["RICH ACADEMY", "リッチアカデミー"], checked: "2026-10-29" },
  { id: "club-kiss", name: "club Kiss", kana: "キス", genre: "セクキャバ", style: "ツーショットキャバクラ",
    area: "梅田", areaLabel: "梅田", access: "大阪市北区堂山町10-1 H&Iビル東通り 3階（梅田駅・大阪駅から徒歩約7分、東通り商店街の端）",
    hours: "20:00〜LAST（2〜3時間勤務OK／年中無休・完全自由シフト）", wait: "個別待機（待機スペースあり）",
    pay: "体験 4時間 25,000円／3時間 18,000円（以降 時給5,000円）", paySub: "本入店 時給4,000円〜（最低時給4,000円保証）",
    back: "各種バック・ドリンクバックあり／入店祝い金10万円（入店後 合計150時間の勤務で）",
    deduct: "10%＋雑費1,000円",
    other: "全額日払い（体験・本入店とも）／ノルマなし／衣装（ドレス）無料貸与／個人ロッカー・女の子専用トイレ・ドレッサーあり／送りあり（24時以降無料）／寮あり（空き状況要確認）／託児所の紹介あり／体験入店に必要なもの：本籍地記載の住民票と顔写真付きの身分証",
    keys: ["club Kiss", "clubキス", "クラブキス", "クラブ キス", "kissキス"], checked: "2026-10-29",
    ext: [
      { site: "キャバイト（ホンレポの体験レポート）", url: "https://www.cabaito.jp/umeda/shop-detail_1744.html", checked: "2026-10-29", kind: "体験入店レポート（要約）", payLabel: "手取り", when: "2026年10月2日", hours: 3, daily: 18000, extra: "接客したお客さん 7人",
        note: "セクキャバよりライトで、雰囲気はほぼキャバクラに近い（お触りはある）とのこと" },
      { site: "キャバイト（ホンレポの体験レポート）", url: "https://www.cabaito.jp/umeda/shop-detail_1744.html", checked: "2026-10-29", kind: "体験入店レポート（要約）", payLabel: "手取り", when: "2026年9月22日", hours: 4, daily: 25000, extra: "接客したお客さん 6人",
        good: "エリアの中で雰囲気がよく、店内がきれいだったので選んだ" },
      { site: "キャバイト（ホンレポの体験レポート）", url: "https://www.cabaito.jp/umeda/shop-detail_1744.html", checked: "2026-10-29", kind: "体験入店レポート（要約）", payLabel: "手取り", when: "2026年9月18日", hours: 3, daily: 19000, extra: "接客したお客さん 5人／出勤の女の子 11〜15人",
        good: "女性スタッフもいて、やさしく心強かった" },
      { site: "キャバイト（ホンレポの体験レポート）", url: "https://www.cabaito.jp/umeda/shop-detail_1744.html", checked: "2026-10-29", kind: "体験入店レポート（要約）", payLabel: "手取り", when: "2026年9月3日", hours: 4, daily: 25000, extra: "接客したお客さん 4人／出勤の女の子 6〜10人",
        note: "お客さんは30代くらいが多く、ドリンクも出た" }
    ] },
  { id: "peachpie-umeda", name: "ピーチパイ 梅田", kana: "ピーチパイ", genre: "セクキャバ",
    area: "梅田", areaLabel: "梅田", hours: "19:00〜LAST（土日 17:00〜）",
    pay: "体験 4時間 30,000円（以降 時給3,000円〜）", deduct: "10%＋500円",
    other: "衣装：ドレス", keys: ["ピーチパイ"], checked: "2026-10-28" },
  { id: "vacances", name: "Vacances", kana: "バカンス", genre: "セクキャバ",
    area: "梅田", areaLabel: "梅田", hours: "18:00〜LAST",
    pay: "体験 時給5,000円保証＋バック", paySub: "本入店 時給3,000円〜保証＋バック",
    other: "体験は日払い／本入店も日払い可", keys: ["Vacances", "バカンス"], checked: "2026-10-28" },
  { id: "kingdom", name: "KINGDOM", kana: "キングダム", genre: "セクキャバ", style: "ツーショットキャバクラ",
    area: "梅田", areaLabel: "梅田", access: "大阪市北区兎我野町10-15 58番館ビル 2階（梅田駅・大阪駅から徒歩5〜10分、東梅田寄り）",
    hours: "20:00〜LAST（希望の時間帯を相談可／週1日〜OK／水曜定休）", wait: "確認中",
    pay: "体験 時給5,000円保証（初回・バックなし）",
    paySub: "本入店は3パターンから選べる：①時給4,000円保証（1か月）②時給3,500円保証（2か月）③時給3,000円保証（3か月）＋各種バック。保証期間後の時給は期間中に決定",
    back: "各種バックあり",
    deduct: "10%＋雑費1,000円（1出勤ごと）",
    other: "全額日払いOK／ノルマ・罰金なし／衣装（ドレス・Yシャツ）無料貸与／無料の送りあり／鍵付き個人ロッカー・キャスト専用トイレあり／未経験歓迎／終電上がり・土日のみ・短期OK／履歴書不要／タトゥーOK／接客は2人掛けの席で、下半身のお触りはなし（お店の説明）／応募資格：18歳以上（高校生不可）、30歳くらいまで／完全独立店",
    keys: ["KINGDOM", "キングダム"], checked: "2026-10-29" },
  { id: "pamyu", name: "和風ぱみゅぱみゅ総本舗", kana: "ワフウパミュパミュ", genre: "セクキャバ",
    area: "梅田", areaLabel: "梅田", hours: "19:00〜LAST",
    pay: "体験 3時間 22,000円／5時間 30,000円", paySub: "本入店 時給4,000円〜＋バック", deduct: "10%＋1,500円",
    other: "衣装：和服", keys: ["ぱみゅぱみゅ", "パミュパミュ"], checked: "2026-10-28" },

  // --- 梅田：ホテヘル ---
  { id: "speed-umeda", name: "スピード 梅田", genre: "ホテヘル", style: "スピードグループ",
    area: "梅田", areaLabel: "梅田", access: "梅田（グループで京橋・難波・日本橋・天王寺・谷九にも）",
    keys: ["スピード"], checked: "2026-10-28" },
  { id: "tsumaten-umeda", name: "妻天 梅田", genre: "ホテヘル", style: "妻天グループ",
    area: "梅田", areaLabel: "梅田", access: "梅田（グループで日本橋・十三・京橋・尼崎にも）",
    keys: ["妻天"], checked: "2026-10-28" },
  { id: "yancha-umeda", name: "やんちゃな子猫 梅田", genre: "ホテヘル", style: "やんちゃな子猫グループ",
    area: "梅田", areaLabel: "梅田", access: "梅田（グループで大阪各地・神戸にも）",
    keys: ["やんちゃな子猫"], checked: "2026-10-28" },
  { id: "spark-umeda", name: "スパーク 梅田", genre: "ホテヘル", style: "スパークグループ",
    area: "梅田", areaLabel: "梅田", access: "梅田（グループで日本橋・京橋にも）",
    keys: ["スパーク"], checked: "2026-10-28" },
  { id: "gekiyasu-umeda", name: "激安商事 梅田", genre: "ホテヘル", style: "激安商事グループ",
    area: "梅田", areaLabel: "梅田", access: "大阪市北区",
    keys: ["激安商事"], checked: "2026-10-28" },

  // --- 梅田：デリヘル ---
  { id: "alice-umeda", name: "アリス 梅田", genre: "デリヘル", style: "アリスグループ",
    area: "梅田", areaLabel: "梅田", access: "梅田（グループで日本橋・谷九・堺にも）",
    keys: ["アリスグループ", "アリス梅田"], checked: "2026-10-28" },
  { id: "melvis", name: "メルビス＆アトリアーナ", genre: "デリヘル",
    area: "梅田", areaLabel: "梅田", keys: ["メルビス", "アトリアーナ"], checked: "2026-10-28" },
  { id: "casualrich5", name: "Casual Rich 5", kana: "カジュアルリッチファイブ", genre: "デリヘル",
    area: "梅田", areaLabel: "梅田", keys: ["Casual Rich", "カジュアルリッチ"], checked: "2026-10-28" },
  { id: "jukujoya-umeda", name: "熟女家 梅田", genre: "デリヘル", style: "熟女家グループ",
    area: "梅田", areaLabel: "梅田", keys: ["熟女家"], checked: "2026-10-28" },

  // --- 梅田：その他（店舗型ヘルスなど） ---
  { id: "umeda-golden", name: "梅田ゴールデン俱楽部", genre: "その他風俗", style: "店舗型ヘルス",
    area: "梅田", areaLabel: "梅田", keys: ["ゴールデン俱楽部", "ゴールデン倶楽部", "ゴールデンクラブ"], checked: "2026-10-28" }
];

/* ピックアップする地域（トップの「ピックアップ」のタブ）。area がこの key と同じお店が出ます */
window.RV_PICKUP_AREAS = [
  // main: true は「主要エリア」。大きいボタンで先に表示する
  { key: "梅田", label: "大阪キタ・梅田", main: true, sub: "兎我野町・堂山町" },
  { key: "難波", label: "難波・日本橋", main: true, sub: "ミナミ" },
  { key: "新大阪", label: "西中島・新大阪", main: true, sub: "淀川区" },
  { key: "京橋", label: "京橋・守口", main: true, sub: "城東区・都島区" },
  { key: "十三", label: "十三・西淀川" },
  { key: "江坂", label: "江坂・豊中" },
  { key: "天満", label: "天満・南森町" },
  { key: "心斎橋", label: "心斎橋" },
  { key: "本町", label: "本町・堺筋本町" },
  { key: "谷町九丁目", label: "谷町九丁目" },
  { key: "堺", label: "堺・南大阪" },
  { key: "東大阪", label: "東大阪・八尾" }
];

/* ジャンル（トップの「ジャンルで探す」）。お店が0件のジャンルは「準備中」と出ます
   お店の genre には、ここの key と同じ言葉（メンズエステ／セクキャバ／デリヘル／ホテヘル／その他風俗）を書く */
window.RV_GENRES = [
  { key: "メンズエステ", label: "メンズエステ" },
  { key: "セクキャバ", label: "セクキャバ" },
  { key: "デリヘル", label: "デリヘル" },
  { key: "ホテヘル", label: "ホテヘル" },
  { key: "その他風俗", label: "その他" }   // ヘルス・ソープ・ピンサロなど。お店の genre に "その他風俗" と書く
];

/* LINEの相談窓口（店舗のLINE担当が決まるまでの仮）。応募の受付ではなく、口コミ・掲載についての相談用 */
window.RV_LINE = "https://lin.ee/v7GLaD2";

/* 広告バナー（トップのヒーロー直下の枠）
   ・広告費をいただいているお店のバナーをここに足す。複数あると5秒ごとに切り替わる
   ・img：バナー画像（横長 1100×300 くらい）、url：押したときの行き先（例 "shop.html?id=kingdom"）
   ・until：掲載の最終日（この日を過ぎると自動で消える）。空なら期限なし
   ・ratio：バナー画像の縦横比（例 "976/211"）。枠がこの形になり、画像が切れずに全部見える
   ・1件もないときは「広告掲載店舗 募集中」の仮バナーが出る
   例） { name: "KINGDOM", img: "img/ads/kingdom.jpg", url: "shop.html?id=kingdom", until: "2026-11-30" } */
window.RV_ADS = [
  { name: "club Kiss", img: "img/ads/club-kiss.jpg?v=3", ratio: "1672/730", url: "shop.html?id=club-kiss", until: "" }
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
  // LINEの相談ボタン（画面左下に固定 ＋ data-line のリンクに URL を入れる）
  var line = function () {
    if (!window.RV_LINE) return;
    [].forEach.call(document.querySelectorAll("[data-line]"), function (a) { a.href = window.RV_LINE; a.target = "_blank"; a.rel = "noopener"; a.hidden = false; });
    var f = document.createElement("a"); f.className = "line-fab"; f.href = window.RV_LINE; f.target = "_blank"; f.rel = "noopener";
    f.innerHTML = '<b>LINE</b>相談・お問い合わせ'; document.body.appendChild(f);
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", line); else line();
  return { norm: norm, esc: esc, listed: listed, byId: byId, shopOf: shopOf, isOurs: isOurs,
           hoursOf: hoursOf, dailyOf: dailyOf, man: man, yen: yen, perHour: perHour, period: period, load: load, gate: gate };
})();
