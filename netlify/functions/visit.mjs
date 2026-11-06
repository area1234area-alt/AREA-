// Area 遊ぶ：来店の紹介ID（お客様がお店を選ぶ → 紹介IDを発行して記録）
// 保存先：Netlify Blobs（ストア area-visits、キー visit/<月>/<紹介ID>）
// ・接待のあるお店（大阪府の条例の対象）は、日本時間0時〜6時は発行しない
// ・同じ回線からの発行は1時間に6件まで
import { getStore } from "@netlify/blobs";
import crypto from "node:crypto";
import SHOPS from "../lib/asobu-shops.json";
import { session, isAdmin } from "../lib/member-core.mjs";

const json = (d, s = 200) => new Response(JSON.stringify(d), { status: s, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" } });
const jst = () => new Date(Date.now() + 9 * 3600e3);
const store = () => getStore({ name: "area-visits", consistency: "strong" });

export default async (req) => {
  const url = new URL(req.url);
  // 管理者だけ：一覧（?month=2026-11）
  if (req.method === "GET") {
    const s = session(req);
    if (!s || !isAdmin(s.sub)) return json({ error: "管理者だけが見られます" }, 401);
    const month = url.searchParams.get("month") || jst().toISOString().slice(0, 7);
    const st = store(), { blobs } = await st.list({ prefix: "visit/" + month + "/" });
    const list = (await Promise.all(blobs.map((b) => st.get(b.key, { type: "json" })))).filter(Boolean).sort((a, b) => b.at - a.at);
    return json({ month, list });
  }
  if (req.method !== "POST") return json({ error: "使えない方法です" }, 405);
  let body = {}; try { body = await req.json(); } catch (e) {}
  const shop = SHOPS[body.shop];
  const people = Math.max(1, Math.min(10, parseInt(body.people, 10) || 1));
  if (!shop || !shop.partner) return json({ error: "このお店は紹介IDの対象ではありません" }, 400);
  const now = jst(), h = now.getUTCHours();
  if (shop.settai && h < 6) return json({ error: "0時〜6時は、このお店の紹介IDは発行していません。" }, 403);
  const st = store();
  const ip = req.headers.get("x-nf-client-connection-ip") || "";
  const ipKey = "rate/" + crypto.createHash("sha256").update(ip + now.toISOString().slice(0, 13)).digest("hex").slice(0, 24);
  const n = ((await st.get(ipKey, { type: "json" })) || { n: 0 }).n;
  if (n >= 6) return json({ error: "短い時間に何度も発行されています。しばらくしてからお試しください。" }, 429);
  await st.setJSON(ipKey, { n: n + 1 });
  const id = "AR-" + crypto.randomBytes(3).toString("hex").toUpperCase().slice(0, 5);
  const rec = { id, shop: body.shop, name: shop.name, settai: !!shop.settai, people, at: Date.now(), status: "issued", src: String(body.src || "web").slice(0, 20) };
  await st.setJSON("visit/" + now.toISOString().slice(0, 7) + "/" + id, rec);
  return json({ id, name: shop.name, people, expires: Date.now() + 3 * 3600e3 });
};

export const config = { path: "/api/visit" };
