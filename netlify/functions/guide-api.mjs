// Area 遊ぶ：運営の管理API（/api/guide/admin/...）— 管理者だけ
import { store, loadAll, loadOne, addLog, ensureSeed, SERVICE, STATUS, jstMonth, validKey, listNews, NEWS_DAYS, NEWS_KINDS, NG_NEWS } from "../lib/guide-core.mjs";
import { session, isAdmin, configured } from "../lib/member-core.mjs";
import { getStore } from "@netlify/blobs";

const json = (d, s = 200) => new Response(JSON.stringify(d), { status: s, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" } });
const err = (m, s = 400) => json({ error: m }, s);
const str = (v, n = 200) => String(v == null ? "" : v).trim().slice(0, n);

function cleanShop(b) {
  const biz = { name: str(b.name, 60), kana: str(b.kana, 60), address: str(b.address, 120), tel: str(b.tel, 20), telNote: str(b.telNote, 30), town: str(b.town, 20), station: str(b.station, 60), job: /^[a-z0-9-]+\.html$/.test(b.job || "") ? b.job : "",
    images: (Array.isArray(b.images) ? b.images : []).map((x) => str(x, 120)).filter((x) => /^img\/[a-z0-9_\/-]+\.(jpe?g|png|webp)$/i.test(x)).slice(0, 8),
    license: { type: str(b.licenseType, 40), checkedAt: b.licenseChecked ? Date.parse(b.licenseChecked) || 0 : 0 } };
  const price = (Array.isArray(b.price) ? b.price : []).map((r) => [str(r[0], 40), str(r[1], 40)]).filter((r) => r[0] && r[1]).slice(0, 15);
  const plan = (Array.isArray(b.plan) ? b.plan : []).map((p) => ({ t: str(p.t, 30), d: str(p.d, 60), opt: str(p.opt, 60) })).filter((p) => p.t).slice(0, 4);
  const listing = { genre: str(b.genre, 20), sub: str(b.sub, 20), hours: str(b.hours, 80), holiday: str(b.holiday, 30), from: str(b.from, 40), facility: str(b.facility, 80), intro: str(b.intro, 800), price, plan, planFrom: str(b.planFrom, 30), order: parseInt(b.order, 10) || 0, area: "umeda" };
  return { biz, listing };
}

export default async (req) => {
  const url = new URL(req.url), route = url.pathname.replace(/^\/api\/guide\/admin\/?/, ""), m = req.method;
  if (!configured()) return err("ログインの設定が終わっていません（LINEログインの設定待ち）", 503);
  const s = session(req);
  if (!s) return err("ログインしてください", 401);
  if (!isAdmin(s.sub)) return err("管理者だけが使えます", 403);
  const who = s.name || s.sub;
  let b = {}; if (m !== "GET") { try { b = await req.json(); } catch (e) {} }
  await ensureSeed();
  const st = store();

  if (route === "overview" && m === "GET") {
    const shops = await loadAll();
    const cats = (await st.list({ prefix: "cat/" })).blobs.map((x) => x.key.slice(4));
    const { blobs } = await st.list({ prefix: "log/" + jstMonth() + "/" });
    const logs = (await Promise.all(blobs.slice(-60).map((x) => st.get(x.key, { type: "json" })))).filter(Boolean).sort((a, c) => c.t - a.t);
    return json({ shops, cats, status: STATUS, logs });
  }
  if (route === "shop" && m === "POST") { // 登録・編集（管理者の編集はそのまま反映）
    const key = str(b.key, 32).toLowerCase();
    if (!validKey(key)) return err("店舗キーは半角英小文字・数字・ハイフンで2〜31文字にしてください");
    const { biz, listing } = cleanShop(b);
    if (!biz.name || !biz.address || !listing.genre) return err("店名・住所・ジャンルは必須です");
    const cat = await st.get("cat/" + listing.genre, { type: "json" });
    if (!cat) return err("ジャンルが一覧にありません");
    const oldB = await st.get("biz/" + key, { type: "json" }), oldL = await st.get(`listing/${SERVICE}/${key}`, { type: "json" });
    if (b.isNew && oldB) return err("その店舗キーはもう使われています");
    const now = Date.now();
    await st.setJSON("biz/" + key, { ...(oldB || { createdAt: now }), ...biz, updatedAt: now });
    await st.setJSON(`listing/${SERVICE}/${key}`, { ...(oldL || { createdAt: now, status: "pending", ref: false }), ...listing, updatedAt: now });
    await addLog(who, `${biz.name}（${key}）を${oldB ? "編集" : "登録"}`);
    return json({ ok: true, shop: await loadOne(key) });
  }
  if (route === "status" && m === "POST") { // 承認・却下・停止・下書きに戻す
    const key = str(b.key, 32), to = str(b.status, 20);
    if (!["published", "rejected", "suspended", "pending", "draft"].includes(to)) return err("状態が正しくありません");
    const l = await st.get(`listing/${SERVICE}/${key}`, { type: "json" }); if (!l) return err("お店が見つかりません", 404);
    l.status = to; l.updatedAt = Date.now(); if (to === "published") l.publishedAt = Date.now(); if (b.reason) l.reason = str(b.reason, 200);
    await st.setJSON(`listing/${SERVICE}/${key}`, l);
    await addLog(who, `${key} を「${STATUS[to]}」に${b.reason ? "（理由：" + str(b.reason, 200) + "）" : ""}`);
    return json({ ok: true });
  }
  if (route === "ref" && m === "POST") { // 紹介IDの対象にする／外す
    const key = str(b.key, 32), l = await st.get(`listing/${SERVICE}/${key}`, { type: "json" }); if (!l) return err("お店が見つかりません", 404);
    l.ref = !!b.ref; l.updatedAt = Date.now(); await st.setJSON(`listing/${SERVICE}/${key}`, l);
    await addLog(who, `${key} の紹介IDを${l.ref ? "オン" : "オフ"}に`);
    return json({ ok: true });
  }
  if (route === "visits" && m === "GET") { // 紹介IDの一覧（月ごと）
    const month = /^\d{4}-\d{2}$/.test(url.searchParams.get("month") || "") ? url.searchParams.get("month") : jstMonth();
    const vs = getStore({ name: "area-visits", consistency: "strong" }), { blobs } = await vs.list({ prefix: "visit/" + month + "/" });
    const list = (await Promise.all(blobs.map((x) => vs.get(x.key, { type: "json" })))).filter(Boolean).filter((v) => v.src !== "selftest").sort((a, c) => c.at - a.at);
    return json({ month, list });
  }
  // ===== お知らせ（今は運営が代わりに投稿。店舗ログインができたら店舗も投稿） =====
  if (route === "news" && m === "GET") return json({ list: await listNews({ all: true }), kinds: NEWS_KINDS });
  if (route === "news" && m === "POST") {
    const shop = str(b.shop, 32), kind = NEWS_KINDS.includes(b.kind) ? b.kind : "お知らせ", title = str(b.title, 40), text = str(b.body, 300);
    if (!(await loadOne(shop))) return err("お店が見つかりません");
    if (!title) return err("タイトルを入れてください");
    if (NG_NEWS.test(title + text)) return err("使えない言葉が入っています（紹介料・スカウト・「Areaを見たら割引」など）");
    const id = "N" + Date.now().toString(36) + Math.random().toString(36).slice(2, 5), at = Date.now();
    await st.setJSON("news/" + id, { id, shop, kind, title, body: text, at, expires: at + NEWS_DAYS * 86400e3, by: who });
    await addLog(who, `${shop} のお知らせ「${title}」を投稿`);
    return json({ ok: true });
  }
  if (route === "news" && m === "DELETE") {
    const id = str(b.id, 30); await st.delete("news/" + id); await addLog(who, `お知らせ ${id} を削除`); return json({ ok: true });
  }
  // ===== 掲載の申請 =====
  if (route === "applies" && m === "GET") {
    const { blobs } = await st.list({ prefix: "apply/" });
    const list = (await Promise.all(blobs.map((x) => st.get(x.key, { type: "json" })))).filter(Boolean).sort((a, c) => c.at - a.at);
    return json({ list });
  }
  if (route === "apply" && m === "POST") {
    const id = str(b.id, 30), a = await st.get("apply/" + id, { type: "json" }); if (!a) return err("申請が見つかりません", 404);
    const to = ["新規", "対応中", "登録済み", "見送り"].includes(b.state) ? b.state : a.state;
    a.state = to; a.memo = str(b.memo != null ? b.memo : a.memo, 300); a.updatedAt = Date.now();
    await st.setJSON("apply/" + id, a); await addLog(who, `掲載申請 ${a.name} を「${to}」に`);
    return json({ ok: true });
  }
  return err("見つかりません", 404);
};

export const config = { path: "/api/guide/admin/*" };
