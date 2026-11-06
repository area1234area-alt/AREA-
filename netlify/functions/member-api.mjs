// 会員・店舗・管理のAPI（/api/m/...）
import {
  configured, json, err, session, isAdmin, store, getMember, putMember, listMembers, cleanProfile, cleanSns, ageOf,
  publicView, selfView, listOffers, deleteMemberAll, randomId, shopKey, DAY, MONTHLY_OFFER_LIMIT, SAME_MEMBER_COOLDOWN_DAYS,
} from "../lib/member-core.mjs";

const NG_WORDS = /紹介料|スカウトバック|バック.{0,4}紹介|紹介.{0,4}バック/;
const monthKey = (t = Date.now()) => new Date(t + 9 * 3600e3).toISOString().slice(0, 7);
const body = async (req) => { try { return await req.json(); } catch { return {}; } };
const newMemberId = () => "M" + Math.floor(100000 + Math.random() * 900000) + randomId(2).toUpperCase().replace(/[^A-Z0-9]/g, "X");

async function getShop(sub) { return await store().get(shopKey(sub), { type: "json" }); }
async function putShop(s) { await store().setJSON(shopKey(s.sub), s); }

export default async (req) => {
  const url = new URL(req.url);
  const route = url.pathname.replace(/^\/api\/m\/?/, "");
  const method = req.method;

  if (route === "config") return json({ enabled: configured() });
  if (!configured()) return err("準備中です", 503);

  const sess = session(req);
  if (!sess) return err("ログインしてください", 401);
  const sub = sess.sub, admin = isAdmin(sub);

  // ===== 自分の情報 =====
  if (route === "me" && method === "GET") {
    const m = await getMember(sub);
    if (m) { m.lastLogin = Date.now(); m.warnedAt = 0; await putMember(m); }
    const shop = await getShop(sub);
    return json({ lineName: sess.name || "", member: m ? selfView(m) : null, shop: shop ? { name: shop.name, status: shop.status, url: shop.url } : null, admin });
  }
  if (route === "me" && method === "POST") { // 新規登録
    if (await getMember(sub)) return err("すでに登録されています");
    const b = await body(req);
    const username = String(b.username || "").trim().slice(0, 20);
    if (!username) return err("ユーザー名を入力してください");
    const a = ageOf(b.birth); if (a === null) return err("生年月日を入力してください"); if (a < 18) return err("18歳未満の方は登録できません");
    if (!b.agree) return err("利用規約とプライバシーポリシーへの同意が必要です");
    const email = String(b.email || "").trim().toLowerCase().slice(0, 120);
    if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return err("メールアドレスを正しく入力してください");
    const t = Date.now();
    const m = { sub, id: newMemberId(), username, email, plan: b.plan === "premium" ? "premium" : "free", createdAt: t, lastLogin: t, warnedAt: 0,
      profile: cleanProfile({ name: username, birth: b.birth }), sns: cleanSns({}) };
    await putMember(m);
    return json({ member: selfView(m) });
  }
  if (route === "me" && method === "PUT") { // プロフィール更新
    const m = await getMember(sub); if (!m) return err("会員登録がまだです", 404);
    const b = await body(req);
    const p = cleanProfile(b.profile || {});
    const a = ageOf(p.birth); if (a !== null && a < 18) return err("18歳未満の生年月日は登録できません");
    if (!p.birth) p.birth = m.profile.birth;
    m.profile = p; m.sns = cleanSns(b.sns || {});
    if (b.username) m.username = String(b.username).trim().slice(0, 20);
    if (typeof b.email === "string") { const e = b.email.trim().toLowerCase().slice(0, 120); if (e && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e)) return err("メールアドレスを正しく入力してください"); m.email = e; }
    if (b.plan) m.plan = b.plan === "premium" ? "premium" : "free";
    m.lastLogin = Date.now(); await putMember(m);
    return json({ member: selfView(m) });
  }
  if (route === "me" && method === "DELETE") { // 退会
    const m = await getMember(sub); if (m) await deleteMemberAll(m, "本人が退会");
    return json({ ok: true });
  }

  // ===== 届いたオファー =====
  if (route === "offers" && method === "GET") {
    const m = await getMember(sub); if (!m) return json({ offers: [] });
    return json({ offers: await listOffers(m.id) });
  }
  if (route.startsWith("offers/") && method === "POST") { // 既読・返事
    const m = await getMember(sub); if (!m) return err("会員登録がまだです", 404);
    const oid = route.split("/")[1]; const key = "offer/" + m.id + "/" + oid;
    const o = await store().get(key, { type: "json" }); if (!o) return err("見つかりません", 404);
    const b = await body(req);
    o.read = true;
    if (b.reply && !o.reply && ["興味があります", "今回は見送ります"].includes(b.reply)) { o.reply = b.reply; o.repliedAt = Date.now(); }
    await store().setJSON(key, o);
    return json({ offer: o });
  }

  // ===== 店舗 =====
  if (route === "shop/apply" && method === "POST") { // 申し込み（運営の承認待ち）
    const b = await body(req); const exist = await getShop(sub);
    if (exist && exist.status !== "rejected") return err("すでに申し込み済みです");
    const name = String(b.name || "").trim().slice(0, 60), shopUrl = String(b.url || "").trim().slice(0, 80), contact = String(b.contact || "").trim().slice(0, 80);
    if (!name || !contact) return err("店名と連絡先を入力してください");
    await putShop({ sub, name, url: /^[a-z0-9-]+\.html$/.test(shopUrl) ? shopUrl : "", contact, status: "pending", appliedAt: Date.now(), sent: {} });
    return json({ ok: true, status: "pending" });
  }
  if (route === "shop/redeem" && method === "POST") { // 招待コードで店舗アカウントにする
    const b = await body(req); const code = String(b.code || "").trim().toUpperCase();
    const key = "invite/" + code; const inv = await store().get(key, { type: "json" });
    if (!inv || inv.usedBy) return err("招待コードが正しくないか、使用済みです");
    await putShop({ sub, name: inv.name, url: inv.url, contact: inv.contact || "", status: "approved", appliedAt: Date.now(), approvedAt: Date.now(), sent: {} });
    inv.usedBy = "shop"; inv.usedAt = Date.now(); await store().setJSON(key, inv);
    return json({ ok: true, status: "approved" });
  }
  if (route.startsWith("shop/")) {
    const shop = await getShop(sub);
    if (!shop || shop.status !== "approved") return err("オファーを送れるのは、承認済みの店舗だけです", 403);
    const mk = monthKey();
    if (route === "shop/members" && method === "GET") {
      const t = Date.now(); const all = await listMembers();
      const list = all.filter((m) => m.profile && m.profile.public !== false && m.profile.area)
        .sort((a, b) => (b.plan === "premium") - (a.plan === "premium") || b.lastLogin - a.lastLogin)
        .map((m) => ({ ...publicView(m, t), sentByMe: (shop.sent[m.id] || 0) > t - SAME_MEMBER_COOLDOWN_DAYS * DAY }));
      return json({ shop: { name: shop.name, url: shop.url, remaining: MONTHLY_OFFER_LIMIT - ((shop.month === mk && shop.count) || 0) }, members: list });
    }
    if (route === "shop/offers" && method === "POST") {
      const b = await body(req);
      const text = String(b.body || "").trim().slice(0, 600), wage = String(b.wage || "").trim().slice(0, 120);
      if (!text) return err("メッセージを入力してください");
      if (NG_WORDS.test(text + wage)) return err("紹介料などの内容は送れません");
      const used = shop.month === mk ? shop.count || 0 : 0;
      if (used >= MONTHLY_OFFER_LIMIT) return err("今月の送信数の上限に達しました");
      const target = (await listMembers()).find((m) => m.id === b.memberId && m.profile && m.profile.public !== false);
      if (!target) return err("この会員は非公開か、退会・削除されています", 404);
      if ((shop.sent[target.id] || 0) > Date.now() - SAME_MEMBER_COOLDOWN_DAYS * DAY) return err("同じ会員には30日に1回まで送れます");
      const o = { id: "O" + Date.now().toString(36) + randomId(3), shop: shop.name, shopUrl: shop.url, body: text, wage, sentAt: Date.now(), read: false, reply: "" };
      await store().setJSON("offer/" + target.id + "/" + o.id, o);
      shop.sent[target.id] = Date.now(); shop.month = mk; shop.count = used + 1; await putShop(shop);
      return json({ ok: true, remaining: MONTHLY_OFFER_LIMIT - shop.count });
    }
  }

  // ===== 管理 =====
  if (route.startsWith("admin/")) {
    if (!admin) return err("管理者だけが使えます", 403);
    const s = store(), t = Date.now();
    if (route === "admin/overview" && method === "GET") {
      const members = await listMembers();
      const shops = (await Promise.all((await s.list({ prefix: "shop/" })).blobs.map((b) => s.get(b.key, { type: "json" })))).filter(Boolean);
      const invites = (await Promise.all((await s.list({ prefix: "invite/" })).blobs.map(async (b) => ({ code: b.key.slice(7), ...(await s.get(b.key, { type: "json" })) }))));
      const deleted = (await Promise.all((await s.list({ prefix: "deleted/" })).blobs.slice(-200).map((b) => s.get(b.key, { type: "json" })))).filter(Boolean);
      const mem = await Promise.all(members.map(async (m) => ({ id: m.id, username: m.username, email: m.email, plan: m.plan, createdAt: m.createdAt, lastLogin: m.lastLogin,
        public: m.profile.public !== false, area: m.profile.area, job: m.profile.job, offers: (await s.list({ prefix: "offer/" + m.id + "/" })).blobs.length })));
      return json({ now: t, members: mem, shops: shops.map((x) => ({ key: x.sub, name: x.name, url: x.url, contact: x.contact, status: x.status, appliedAt: x.appliedAt, month: x.month, count: x.count || 0 })), invites, deleted });
    }
    if (route === "admin/invite" && method === "POST") {
      const b = await body(req); const name = String(b.name || "").trim().slice(0, 60);
      if (!name) return err("店名を入力してください");
      const code = randomId(6).toUpperCase().replace(/[^A-Z0-9]/g, "7").slice(0, 8);
      await s.setJSON("invite/" + code, { name, url: /^[a-z0-9-]+\.html$/.test(b.url || "") ? b.url : "", createdAt: t });
      return json({ code });
    }
    if (route === "admin/shop" && method === "POST") { // 承認・停止・却下
      const b = await body(req); const x = await getShop(b.key); if (!x) return err("見つかりません", 404);
      if (!["approved", "suspended", "rejected"].includes(b.status)) return err("状態が正しくありません");
      x.status = b.status; x.reviewedAt = t; if (b.url && /^[a-z0-9-]+\.html$/.test(b.url)) x.url = b.url; await putShop(x);
      return json({ ok: true });
    }
    if (route === "admin/member" && method === "DELETE") {
      const b = await body(req); const m = (await listMembers()).find((x) => x.id === b.id); if (!m) return err("見つかりません", 404);
      await deleteMemberAll(m, "運営が削除"); return json({ ok: true });
    }
  }
  return err("not found", 404);
};

export const config = { path: "/api/m/*" };
