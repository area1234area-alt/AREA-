// Area 遊ぶ：お店ページ（/asobu/{店舗キー}.html）と一覧データ（/asobu/shops.js）をサーバーで作る
// 管理画面で変えた内容がすぐ反映される。公開中でないお店は管理者にだけ確認用に見せる
import { loadAll, loadOne, listJS, shopPage, listNews } from "../lib/guide-core.mjs";
import { session, isAdmin, configured } from "../lib/member-core.mjs";

const admin = (req) => { try { const s = configured() && session(req); return !!(s && isAdmin(s.sub)); } catch (e) { return false; } };
const notFound = () => new Response(`<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>お店が見つかりません｜Area 遊ぶ</title><link rel="stylesheet" href="/asobu/asobu.css"></head><body><main class="wrap" style="padding-top:60px;text-align:center"><h1 style="font-size:20px">お店が見つかりません</h1><p style="color:var(--soft)">掲載が終わったか、URLが変わった可能性があります。</p><a class="call" href="/asobu/">梅田のお店一覧へ</a></main></body></html>`, { status: 404, headers: { "content-type": "text/html; charset=utf-8" } });

export default async (req) => {
  const path = new URL(req.url).pathname;
  if (path === "/asobu/shops.js") {
    return new Response(listJS(await loadAll(), await listNews()), { headers: { "content-type": "application/javascript; charset=utf-8", "cache-control": "public, max-age=0, s-maxage=60" } });
  }
  const key = (path.match(/^\/asobu\/([a-z0-9-]+)\.html$/) || [])[1];
  const s = key && await loadOne(key);
  if (!s) return notFound();
  const isAdm = admin(req);
  if (s.status !== "published" && !isAdm) return notFound();
  return new Response(shopPage(s, { preview: isAdm, news: await listNews({ shop: s.key }) }), { headers: { "content-type": "text/html; charset=utf-8", "cache-control": isAdm ? "no-store" : "public, max-age=0, s-maxage=60" } });
};

export const config = { path: ["/asobu/shops.js", "/asobu/:key.html"], excludedPath: ["/asobu/index.html", "/asobu/kanto.html", "/asobu/keisai.html"] };
