// Area 会員機能（オファー）— サーバー側の共通処理
// 保存先：Netlify Blobs（ストア名 area-members）。会員・オファー・店舗・招待コード・削除記録を保存する
// ログイン：LINEログイン。セッションは署名付きCookie（as_s）
// 必要な環境変数（Netlifyの管理画面で設定）：
//   LINE_LOGIN_CHANNEL_ID / LINE_LOGIN_CHANNEL_SECRET … LINEログインのチャネル
//   SESSION_SECRET … Cookie署名用のランダムな長い文字列（32文字以上）
//   ADMIN_LINE_IDS … 管理者のLINEユーザーID（カンマ区切り）
//   LINE_MESSAGING_TOKEN …（任意）公式アカウントのチャネルアクセストークン。削除前日のお知らせに使う
import { getStore } from "@netlify/blobs";
import crypto from "node:crypto";

export const DAY = 86400000;
export const DELETE_DAYS = 5;          // 最終ログインからこの日数で削除
export const WARN_DAYS = 4;            // この日数でお知らせ
export const MONTHLY_OFFER_LIMIT = 30; // 1店舗が1か月に送れるオファー数
export const SAME_MEMBER_COOLDOWN_DAYS = 30; // 同じ店から同じ会員への再送までの日数

export const store = () => getStore({ name: "area-members", consistency: "strong" });
export const configured = () => !!(process.env.LINE_LOGIN_CHANNEL_ID && process.env.LINE_LOGIN_CHANNEL_SECRET && (process.env.SESSION_SECRET || "").length >= 32);

// ---------- 応答 ----------
export const json = (data, status = 200, headers = {}) =>
  new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", ...headers } });
export const err = (msg, status = 400) => json({ error: msg }, status);

// ---------- 署名付きCookie ----------
const b64u = (buf) => Buffer.from(buf).toString("base64url");
const hmac = (s) => crypto.createHmac("sha256", process.env.SESSION_SECRET).update(s).digest("base64url");
export function sign(obj) { const p = b64u(JSON.stringify(obj)); return p + "." + hmac(p); }
export function verify(tok) {
  if (!tok || tok.indexOf(".") < 0) return null;
  const [p, s] = tok.split(".");
  const good = hmac(p);
  if (s.length !== good.length || !crypto.timingSafeEqual(Buffer.from(s), Buffer.from(good))) return null;
  try { const o = JSON.parse(Buffer.from(p, "base64url").toString()); return o.exp && o.exp < Date.now() ? null : o; } catch { return null; }
}
export function cookies(req) {
  const out = {}; (req.headers.get("cookie") || "").split(/;\s*/).forEach((c) => { const i = c.indexOf("="); if (i > 0) out[c.slice(0, i)] = decodeURIComponent(c.slice(i + 1)); }); return out;
}
export const setCookie = (name, val, maxAgeSec) => `${name}=${encodeURIComponent(val)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAgeSec}`;
export const clearCookie = (name) => `${name}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`;
export function session(req) { const s = verify(cookies(req).as_s); return s && s.sub ? s : null; }
export const randomId = (n = 16) => crypto.randomBytes(n).toString("base64url");
export const isAdmin = (sub) => (process.env.ADMIN_LINE_IDS || "").split(",").map((x) => x.trim()).filter(Boolean).includes(sub);

// ---------- 会員 ----------
export const memberKey = (sub) => "member/" + sub;
export const shopKey = (sub) => "shop/" + sub;
export async function getMember(sub) { return await store().get(memberKey(sub), { type: "json" }); }
export async function putMember(m) { await store().setJSON(memberKey(m.sub), m); }
export async function listMembers() {
  const s = store(); const { blobs } = await s.list({ prefix: "member/" });
  const out = await Promise.all(blobs.map((b) => s.get(b.key, { type: "json" })));
  return out.filter(Boolean);
}
export function ageOf(birth, t = Date.now()) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(birth || "")) return null;
  const b = new Date(birth + "T00:00:00+09:00"), n = new Date(t + 9 * 3600e3);
  let a = n.getUTCFullYear() - b.getUTCFullYear(); const m = n.getUTCMonth() - b.getUTCMonth();
  if (m < 0 || (m === 0 && n.getUTCDate() < new Date(b.getTime() + 9 * 3600e3).getUTCDate())) a--;
  return a;
}
const S = (v, max = 100) => String(v == null ? "" : v).trim().slice(0, max);
const URLOK = (v) => !v || /^https:\/\/[^\s<>"']{4,300}$/.test(v);
// 会員が送ってきたプロフィールを、決まった項目・長さだけに整える
export function cleanProfile(p = {}) {
  return {
    name: S(p.name, 20), shop: S(p.shop, 40), birth: S(p.birth, 10), blood: ["", "A", "B", "O", "AB"].includes(p.blood) ? p.blood : "",
    height: /^\d{0,3}$/.test(S(p.height, 3)) ? S(p.height, 3) : "", bust: S(p.bust, 6), hometown: S(p.hometown, 20),
    area: S(p.area, 20), job: S(p.job, 20), wageHour: S(p.wageHour, 30), wageDay: S(p.wageDay, 30), hours: S(p.hours, 40),
    prTitle: S(p.prTitle, 40), prBody: S(p.prBody, 600), public: p.public !== false,
  };
}
export function cleanSns(s = {}) {
  const o = { instagram: S(s.instagram, 300), tiktok: S(s.tiktok, 300), facebook: S(s.facebook, 300) };
  for (const k in o) if (!URLOK(o[k])) o[k] = "";
  return o;
}
// お店に見せる形（LINEのID・メール・生年月日は出さない）
export function publicView(m, t = Date.now()) {
  const p = m.profile || {};
  return { id: m.id, plan: m.plan, recent: t - m.lastLogin < DAY, age: ageOf(p.birth, t),
    name: p.name, shop: p.shop, blood: p.blood, height: p.height, bust: p.bust, hometown: p.hometown, area: p.area, job: p.job,
    wageHour: p.wageHour, wageDay: p.wageDay, hours: p.hours, prTitle: p.prTitle, prBody: p.prBody, sns: m.sns || {} };
}
// 本人に見せる形
export function selfView(m) {
  return { id: m.id, username: m.username, email: m.email || "", plan: m.plan, createdAt: m.createdAt, lastLogin: m.lastLogin,
    deleteAt: m.lastLogin + DELETE_DAYS * DAY, profile: m.profile, sns: m.sns };
}

// ---------- オファー ----------
export const offerPrefix = (memberId) => "offer/" + memberId + "/";
export async function listOffers(memberId) {
  const s = store(); const { blobs } = await s.list({ prefix: offerPrefix(memberId) });
  const out = (await Promise.all(blobs.map((b) => s.get(b.key, { type: "json" })))).filter(Boolean);
  return out.sort((a, b) => b.sentAt - a.sentAt);
}
export async function deleteMemberAll(m, reason) {
  const s = store();
  const { blobs } = await s.list({ prefix: offerPrefix(m.id) });
  await Promise.all(blobs.map((b) => s.delete(b.key)));
  await s.delete(memberKey(m.sub));
  // 個人情報は残さず、会員ID・日時・理由だけ記録
  await s.setJSON("deleted/" + Date.now() + "-" + m.id, { id: m.id, deletedAt: Date.now(), reason });
}

// ---------- LINE ----------
export async function linePush(to, text) {
  const tok = process.env.LINE_MESSAGING_TOKEN; if (!tok) return false;
  const r = await fetch("https://api.line.me/v2/bot/message/push", {
    method: "POST", headers: { "content-type": "application/json", authorization: "Bearer " + tok },
    body: JSON.stringify({ to, messages: [{ type: "text", text }] }),
  });
  return r.ok;
}
export const origin = (req) => new URL(req.url).origin;
