// Area 遊ぶ：お店からの掲載申請（/api/guide/apply）— だれでも送れる。運営が管理画面で確認する
import { store } from "../lib/guide-core.mjs";
import crypto from "node:crypto";

const json = (d, s = 200) => new Response(JSON.stringify(d), { status: s, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" } });
const str = (v, n) => String(v == null ? "" : v).trim().slice(0, n);
const GENRES = ["キャバクラ", "昼キャバ", "ラウンジ", "熟女キャバクラ", "スナック", "ガールズバー", "コンカフェ", "バー", "一般飲食"];
const PLANS = ["FREE", "STANDARD", "PREMIUM", "SPONSOR", "相談したい"];

export default async (req) => {
  if (req.method !== "POST") return json({ error: "使えない方法です" }, 405);
  let b = {}; try { b = await req.json(); } catch (e) {}
  if (b.website2) return json({ ok: true }); // 機械的な送信よけ
  const a = { name: str(b.name, 60), genre: GENRES.includes(b.genre) ? b.genre : "", address: str(b.address, 120), tel: str(b.tel, 20), person: str(b.person, 30), contact: str(b.contact, 80),
    url: /^https?:\/\//.test(b.url || "") ? str(b.url, 200) : "", license: str(b.license, 40), plan: PLANS.includes(b.plan) ? b.plan : "相談したい", note: str(b.note, 500) };
  if (!a.name || !a.genre || !a.address || !a.person || !a.contact) return json({ error: "店名・ジャンル・住所・ご担当者・連絡先は必須です" }, 400);
  if (!b.agree) return json({ error: "掲載の条件への同意が必要です" }, 400);
  const st = store();
  const ip = req.headers.get("x-nf-client-connection-ip") || "", now = new Date(Date.now() + 9 * 3600e3);
  const rk = "rate-apply/" + crypto.createHash("sha256").update(ip + now.toISOString().slice(0, 10)).digest("hex").slice(0, 24);
  const n = ((await st.get(rk, { type: "json" })) || { n: 0 }).n;
  if (n >= 5) return json({ error: "本日の申請回数の上限に達しました。時間をおいてお試しください。" }, 429);
  await st.setJSON(rk, { n: n + 1 });
  const id = "A" + Date.now().toString(36) + crypto.randomBytes(2).toString("hex");
  await st.setJSON("apply/" + id, { id, ...a, state: "新規", at: Date.now() });
  return json({ ok: true, id });
};

export const config = { path: "/api/guide/apply" };
