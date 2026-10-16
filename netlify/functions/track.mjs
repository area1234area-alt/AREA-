// アクセス計測：店舗ページから「閲覧」「電話ボタン」を受け取り、日ごとに数える
// 保存先：Netlify Blobs（ストア名 area-stats、キー＝ページ名、例 umeda-c02）
import { getStore } from "@netlify/blobs";

const BOT = /bot|crawl|spider|slurp|preview|facebookexternalhit|headless|curl|wget|python|claude|gpt|lighthouse|monitor/i;

export default async (req) => {
  const url = new URL(req.url);
  const p = url.searchParams.get("p") || "";
  const e = url.searchParams.get("e") || "";
  const u = url.searchParams.get("u") === "1";
  const ua = req.headers.get("user-agent") || "";
  const selftest = p === "zz-selftest"; // 動作確認用（集計画面には出さない）
  const ok = /^[a-z0-9-]{2,40}$/.test(p) && (e === "view" || e === "tel") && (selftest || !BOT.test(ua));
  if (ok) {
    const store = getStore({ name: "area-stats", consistency: "strong" });
    const day = new Date(Date.now() + 9 * 3600e3).toISOString().slice(0, 10); // 日本時間の日付
    const rec = (await store.get(p, { type: "json" })) || { d: {} };
    const t = rec.d[day] || (rec.d[day] = { v: 0, u: 0, t: 0 });
    if (e === "view") { t.v++; if (u) t.u++; } else { t.t++; }
    await store.setJSON(p, rec);
  }
  return new Response(selftest ? "ok" : null, { status: selftest ? 200 : 204, headers: { "cache-control": "no-store" } });
};

export const config = { path: "/api/track" };
