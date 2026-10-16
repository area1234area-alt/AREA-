// 集計：全ページの日ごとの数字をまとめて返す（stats.html が読む）
import { getStore } from "@netlify/blobs";

export default async () => {
  const store = getStore({ name: "area-stats", consistency: "strong" });
  const { blobs } = await store.list();
  const pages = {};
  for (const b of blobs) {
    const rec = await store.get(b.key, { type: "json" });
    pages[b.key] = (rec && rec.d) || {};
  }
  return Response.json({ generated: new Date().toISOString(), pages }, { headers: { "cache-control": "no-store" } });
};

export const config = { path: "/api/stats" };
