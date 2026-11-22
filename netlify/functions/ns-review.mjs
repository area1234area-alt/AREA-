// NIGHT STYLE 口コミ（/api/ns-review）
// 保存先：Netlify Blobs（ストア名 ns-reviews）。投稿は「承認待ち」で保存し、管理画面で承認したものだけ公開する
//   POST /api/ns-review               … 口コミを投稿（誰でも）。7桁の投稿IDを返す
//   GET  /api/ns-review?view=reviews  … 公開中（承認済み）の口コミ一覧（誰でも）
//   GET  /api/ns-review/admin         … すべての口コミ（管理者のみ・LINEログイン）
//   POST /api/ns-review/admin         … { id, action: "approve" | "hide" | "delete" }（管理者のみ）
import { getStore } from "@netlify/blobs";
import { json, err, session, isAdmin } from "../lib/member-core.mjs";

const store = () => getStore({ name: "ns-reviews", consistency: "strong" });
const S = (v, n) => String(v == null ? "" : v).replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, "").trim().slice(0, n);
const num = (v, lo, hi) => { const n = Number(String(v || "").replace(/[０-９．]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0))); return Number.isFinite(n) && n >= lo && n <= hi ? Math.round(n) : 0; };
const AGES = ["18〜19歳", "20代前半", "20代後半", "30代前半", "30代後半", "40代以上"];
const GENRES = ["デリヘル", "ホテヘル", "メンズエステ", "セクキャバ", "キャバクラ", "ラウンジ", "ガールズバー", "スナック", "その他"];

// 公開する項目だけ（表示側は Area の口コミと同じ項目名で読む）
function publicRow(r) {
  const spec = r.height && r.weight ? `${r.height}-${r.weight}` : "";
  return {
    shop: r.shop, area: r.area, style: r.genre, genre: r.genre, period: r.period,
    hours: r.hours || "", daily: r.daily || "", overall: r.overall || "", good: r.good, bad: r.bad,
    ageGroup: r.age || "", spec,
    // 既存の表示はどのページも age を出すので、年代とスペックをここにまとめて入れる
    age: [r.age, spec ? "スペック " + spec : ""].filter(Boolean).join("・"),
    timestamp: new Date(r.createdAt).toISOString(), postId: undefined, src: "ns",
  };
}

async function all() {
  const s = store();
  const { blobs } = await s.list({ prefix: "r/" });
  return (await Promise.all(blobs.map((b) => s.get(b.key, { type: "json" })))).filter(Boolean).sort((a, b) => b.createdAt - a.createdAt);
}

export default async (req) => {
  const url = new URL(req.url);
  const route = url.pathname.replace(/^\/api\/ns-review\/?/, "");

  if (route === "" && req.method === "GET") {
    const rows = (await all()).filter((r) => r.status === "approved").map(publicRow);
    return json({ ok: true, rows });
  }

  if (route === "" && req.method === "POST") {
    let b = {}; try { b = await req.json(); } catch {}
    if (b.website) return json({ ok: true, postId: "0000000" }); // ボット対策（見えない欄に入力があれば保存しない）
    const r = {
      shop: S(b.shop, 60), area: S(b.area, 40), genre: GENRES.includes(b.genre) ? b.genre : "",
      period: /^\d{4}-\d{2}$/.test(b.period || "") ? b.period : "",
      hours: num(b.hours, 1, 24) || "", daily: num(b.daily, 1000, 1000000) || "", overall: num(b.overall, 1, 5) || "",
      good: S(b.good, 1000), bad: S(b.bad, 1000),
      age: AGES.includes(b.age) ? b.age : "", height: num(b.height, 130, 200) || "", weight: num(b.weight, 30, 150) || "",
    };
    if (!r.shop) return err("お店の名前を入力してください");
    if (!r.genre) return err("業種を選んでください");
    if (!r.good && !r.bad) return err("良かった点か気になった点を書いてください");
    if (!b.agree) return err("18歳以上であることと、投稿のルールへの同意が必要です");
    if ((r.height && !r.weight) || (!r.height && r.weight)) return err("スペックは身長と体重の両方を入れてください（どちらも空でもOKです）");
    const postId = String(Math.floor(1000000 + Math.random() * 9000000));
    const now = Date.now();
    await store().setJSON(`r/${now}-${postId}`, { ...r, id: `${now}-${postId}`, postId, status: "pending", createdAt: now });
    return json({ ok: true, postId });
  }

  if (route === "admin") {
    const sess = session(req);
    if (!sess) return err("ログインしてください", 401);
    if (!isAdmin(sess.sub)) return err("管理者だけが使えます", 403);
    if (req.method === "GET") return json({ ok: true, rows: await all() });
    if (req.method === "POST") {
      let b = {}; try { b = await req.json(); } catch {}
      const key = "r/" + S(b.id, 40);
      const s = store(); const r = await s.get(key, { type: "json" });
      if (!r) return err("口コミが見つかりません", 404);
      if (b.action === "delete") { await s.delete(key); return json({ ok: true }); }
      if (b.action === "approve" || b.action === "hide") {
        r.status = b.action === "approve" ? "approved" : "hidden"; r.updatedAt = Date.now();
        await s.setJSON(key, r); return json({ ok: true });
      }
      return err("操作が正しくありません");
    }
  }
  return err("見つかりません", 404);
};

export const config = { path: ["/api/ns-review", "/api/ns-review/*"] };
