// Area 遊ぶ：毎日、表示期間（7日）が過ぎたお知らせを消す
import { store } from "../lib/guide-core.mjs";
export default async () => {
  const st = store(), { blobs } = await st.list({ prefix: "news/" }), now = Date.now();
  for (const b of blobs) { const n = await st.get(b.key, { type: "json" }); if (n && n.expires < now) await st.delete(b.key); }
};
export const config = { schedule: "@daily" };
