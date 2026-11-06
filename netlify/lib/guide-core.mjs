// Area 遊ぶ（UMEDA NIGHT GUIDE）— データの保存と、お店ページ・一覧データの組み立て
// 保存先：Netlify Blobs ストア area-guide
//   biz/{店舗キー}                 店舗の基本情報（店名・住所・電話・写真・求人ページ）
//   listing/night_guide/{店舗キー}  「遊ぶ」への掲載情報（ジャンル・料金・プラン・紹介文・状態・紹介ID対象）
//   cat/{カテゴリー名} area/{キー} plan/{キー}
//   log/{年月}/{日時}               管理操作の履歴
//   meta/seeded                     初期データを入れた印
import { getStore } from "@netlify/blobs";
import SEED from "./guide-seed.json";

export const SERVICE = "night_guide";
export const store = () => getStore({ name: "area-guide", consistency: "strong" });
export const STATUS = { draft: "下書き", pending: "審査待ち", published: "公開中", rejected: "却下", suspended: "停止中" };
export const jstMonth = (t = Date.now()) => new Date(t + 9 * 3600e3).toISOString().slice(0, 7);
export const validKey = (k) => /^[a-z0-9][a-z0-9-]{1,30}$/.test(String(k || ""));

export async function ensureSeed() {
  const st = store();
  if (await st.get("meta/seeded")) return;
  for (const [k, b] of Object.entries(SEED.biz)) await st.setJSON("biz/" + k, { ...b, createdAt: Date.now(), updatedAt: Date.now() });
  for (const [k, l] of Object.entries(SEED.listing)) await st.setJSON(`listing/${SERVICE}/${k}`, { ...l, createdAt: Date.now(), updatedAt: Date.now(), publishedAt: Date.now() });
  for (const c of SEED.cats) await st.setJSON("cat/" + c.name, c);
  for (const a of SEED.areas) await st.setJSON("area/" + a.key, a);
  for (const p of SEED.plans) await st.setJSON("plan/" + p.key, p);
  await st.set("meta/seeded", String(Date.now()));
}

async function listJSON(prefix) {
  const st = store(), { blobs } = await st.list({ prefix });
  const out = await Promise.all(blobs.map(async (b) => [b.key.slice(prefix.length), await st.get(b.key, { type: "json" })]));
  return out.filter((x) => x[1]);
}

// 店舗＋掲載をまとめて（全部）
export async function loadAll() {
  await ensureSeed();
  const [biz, lst, cats] = await Promise.all([listJSON("biz/"), listJSON(`listing/${SERVICE}/`), listJSON("cat/")]);
  const B = Object.fromEntries(biz), C = Object.fromEntries(cats);
  return lst.filter(([k]) => B[k]).map(([k, l]) => ({ key: k, ...B[k], ...l, settai: !!(C[l.genre] && C[l.genre].settai) }))
    .sort((a, b) => (b.ref - a.ref) || ((a.order || 999) - (b.order || 999)) || a.name.localeCompare(b.name, "ja"));
}
export async function loadOne(key) {
  if (!validKey(key)) return null;
  await ensureSeed();
  const st = store();
  const [b, l] = await Promise.all([st.get("biz/" + key, { type: "json" }), st.get(`listing/${SERVICE}/${key}`, { type: "json" })]);
  if (!b || !l) return null;
  const c = await st.get("cat/" + l.genre, { type: "json" });
  return { key, ...b, ...l, settai: !!(c && c.settai) };
}
export async function addLog(who, what) {
  const t = Date.now();
  await store().setJSON(`log/${jstMonth(t)}/${t}-${Math.random().toString(36).slice(2, 6)}`, { t, who, what });
}

// ===== 公開ページ =====
const E = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const telHref = (t) => "tel:" + String(t).replace(/[^0-9+]/g, "");

export function listJS(shops) {
  const pick = (s) => ({ key: s.key, name: s.name, genre: s.genre, sub: s.sub || "", town: s.town, station: s.station, hours: s.hours, holiday: s.holiday || "", from: s.from, settai: s.settai, partner: !!s.ref, images: s.images || [], planFrom: s.planFrom || "" });
  return "/* Area 遊ぶ：お店一覧のデータ（サーバーで作成） */\nwindow.ASOBU_SHOPS=" + JSON.stringify(shops.filter((s) => s.status === "published").map(pick)) + ";\n";
}

export function shopPage(s, { preview = false } = {}) {
  const ims = s.images || [], pl = s.plan || [], ref = !!s.ref;
  const rows = (s.price || []).map(([a, b]) => `<tr><th>${E(a)}</th><td>${E(b)}</td></tr>`).join("");
  const tel = s.tel ? `<a href="${telHref(s.tel)}">${E(s.tel)}</a>${s.telNote ? "（" + E(s.telNote) + "）" : ""}` : "お店にご確認ください";
  const maps = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(s.address + " " + s.name);
  const info = [["ジャンル", E(s.genre + (s.sub ? "（" + s.sub + "）" : ""))], ["エリア", E("梅田（" + s.town + "）")], ["最寄り駅", E(s.station)], ["営業時間", E(s.hours)], ["定休日", E(s.holiday || "お店にご確認ください")],
    ["住所", E(s.address) + `<br><a class="mp" href="${maps}" target="_blank" rel="noopener">地図で見る</a>`], ["電話番号", tel]];
  if (s.facility) info.push(["席・設備", E(s.facility)]);
  const intro = (s.intro || "").trim();
  const introHtml = intro ? `<section class="intro"><p>${E(intro).replace(/\n/g, "<br>")}</p></section>` : (preview ? '<section class="intro empty"><p>紹介文（準備中）</p></section>' : "");
  const hero = ims.length ? `<div class="hero-img"><img src="../${E(ims[0])}" alt="${E(s.name)}" loading="eager"></div>` : "";
  const gal = ims.length > 1 ? `<section class="gal"><h2><span>PHOTO</span>店内</h2><div class="gal-row">${ims.slice(1).map((x) => `<img src="../${E(x)}" alt="${E(s.name)} 店内" loading="lazy">`).join("")}</div></section>` : "";
  const planNote = '<p class="note">どなたでもご利用いただけるお店の料金プランです。税・サービス料はお店にご確認ください。</p>';
  const planHtml = pl.length && !ref ? `<section class="plan"><h2><span>SET PLAN</span>飲み放題プラン</h2>${pl.map((x) => `<div class="pl"><div class="pl-t">${E(x.t)}</div><div class="pl-d">${E(x.d)}</div>${x.opt ? `<div class="pl-o">${E(x.opt)}</div>` : ""}</div>`).join("")}${planNote}</section>` : "";
  const planPick = pl.length ? `<div class="gstep">1. 飲み放題プランを選ぶ</div><div class="picks">${pl.map((x, i) => `<label class="pick"><input type="radio" name="plan" value="${i}" ${i === 0 ? "checked" : ""} data-t="${E(x.t)}" data-d="${E(x.d)}"><span class="pk-b"><span class="pl-t">${E(x.t)}</span><span class="pl-d">${E(x.d)}</span>${x.opt ? `<span class="pk-o"><input type="checkbox" data-opt="${i}" data-o="${E(x.opt)}"> ${E(x.opt)}</span>` : ""}</span></label>`).join("")}</div>${planNote}` : "";
  const n = pl.length ? 1 : 0;
  const go = ref ? `<section class="go" id="go" data-shop="${E(s.key)}" data-settai="${s.settai ? "1" : ""}"><h2>このお店に行く</h2><p class="go-ex">${pl.length ? "プランを選んで" : ""}紹介IDをもらい、お店で見せるだけ。予約ではないので、行けなくなっても連絡はいりません。</p><div class="go-body">${planPick}<div class="gstep">${1 + n}. 人数</div><div class="nums"><button type="button" data-n="1">1名</button><button type="button" data-n="2" class="on">2名</button><button type="button" data-n="3">3名</button><button type="button" data-n="4">4名〜</button></div><div class="gstep">${2 + n}. 紹介IDをもらってお店で見せる</div><button type="button" class="go-btn" id="goBtn">紹介IDをもらう</button></div><div id="goOut"></div></section>` : "";
  const job = s.job ? `<p class="joblink">このお店は女性スタッフも募集中です → <a href="../${E(s.job)}">求人ページ</a></p>` : "";
  const title = `${s.name}（${s.genre}・梅田${s.town}）料金・営業時間｜Area 遊ぶ`;
  const desc = `${s.name}（梅田・${s.town}の${s.genre}）の料金、営業時間、場所、電話番号。${s.from}。`;
  return `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${E(title)}</title>
<meta name="description" content="${E(desc)}">
${s.status !== "published" ? '<meta name="robots" content="noindex">' : ""}
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,600&family=Shippori+Mincho+B1:wght@700;800&family=Noto+Sans+JP:wght@400;500;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="asobu.css">
</head>
<body>
${s.status !== "published" ? `<div style="background:#5a3b0a;color:#ffe2a6;text-align:center;font-size:12px;padding:6px">管理者だけに見えている確認用の表示です（状態：${E(STATUS[s.status] || s.status)}）</div>` : ""}
<header class="hd"><a class="logo" href="/">Area</a><span class="lbl">遊ぶ</span><nav><a href="./">お店一覧</a><a href="/#work">求人をさがす</a></nav></header>
<main class="wrap">
<p class="crumb"><a href="./">梅田のお店一覧</a> ＞ ${E(s.name)}</p>
${hero}
<div class="shop-hd">
  <span class="chip">${E(s.genre)}</span>${s.sub ? `<span class="chip sub">${E(s.sub)}</span>` : ""}
  <h1>${E(s.name)}</h1>
  ${s.kana ? `<p class="kana">${E(s.kana)}</p>` : ""}
  <p class="loc">梅田・${E(s.town)}｜${E(s.station)}</p>
  <div class="from"><b>料金のめやす</b>${E(s.from)}</div>
</div>
${introHtml}
${planHtml}
${go}
<section class="box"><h2><span>PRICE</span>料金</h2><table>${rows}</table><p class="note">表示は1名様あたりの基本料金です。ドリンク・指名などは別途かかることがあります。</p></section>
${gal}
<section class="box"><h2><span>INFO</span>お店の情報</h2><table>${info.map(([a, b]) => `<tr><th>${a}</th><td>${b}</td></tr>`).join("")}</table></section>
${s.tel ? `<a class="call" href="${telHref(s.tel)}">電話でお店に問い合わせる</a>` : ""}
${job}
</main>
${ref ? '<script src="go.js"></script>' : ""}
<footer class="ft">
<p>Areaは、お店の情報を掲載する広告メディアです。料金・営業時間などは変わることがあります。ご来店の前にお店へご確認ください。</p>
<p>20歳未満の方の飲酒はできません。</p>
<p><a href="/">Areaトップ</a>｜<a href="./">お店一覧</a>｜<a href="/#work">求人をさがす</a></p>
</footer>
</body>
</html>
`;
}
