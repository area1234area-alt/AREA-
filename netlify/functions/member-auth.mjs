// LINEログイン：/api/auth/line/start → LINE → /api/auth/line/callback → /member/
// ログアウト：/api/auth/logout
import { configured, sign, verify, cookies, setCookie, clearCookie, randomId, origin, getMember, putMember, err } from "../lib/member-core.mjs";

const SESSION_DAYS = 30;
const SAFE_NEXT = /^\/member\/(index\.html|shop\.html|admin\.html)?(#[a-z]*)?$/;

export default async (req) => {
  const url = new URL(req.url);
  const path = url.pathname;

  if (path.endsWith("/logout")) {
    return new Response(null, { status: 302, headers: { location: "/member/", "set-cookie": clearCookie("as_s") } });
  }
  if (!configured()) return err("LINEログインはまだ設定されていません", 503);

  const redirectUri = origin(req) + "/api/auth/line/callback";

  if (path.endsWith("/start")) {
    const next = SAFE_NEXT.test(url.searchParams.get("next") || "") ? url.searchParams.get("next") : "/member/";
    const state = randomId(), nonce = randomId();
    const q = new URLSearchParams({
      response_type: "code", client_id: process.env.LINE_LOGIN_CHANNEL_ID, redirect_uri: redirectUri,
      state, scope: "openid profile", nonce, bot_prompt: "aggressive",
    });
    const st = sign({ state, nonce, next, exp: Date.now() + 10 * 60e3 });
    return new Response(null, { status: 302, headers: { location: "https://access.line.me/oauth2/v2.1/authorize?" + q, "set-cookie": setCookie("as_st", st, 600) } });
  }

  if (path.endsWith("/callback")) {
    const st = verify(cookies(req).as_st);
    const fail = (why) => new Response(null, { status: 302, headers: { location: "/member/?login=" + why, "set-cookie": clearCookie("as_st") } });
    if (url.searchParams.get("error")) return fail("cancel");
    if (!st || st.state !== url.searchParams.get("state")) return fail("state");
    // コードをトークンに交換
    const tr = await fetch("https://api.line.me/oauth2/v2.1/token", {
      method: "POST", headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ grant_type: "authorization_code", code: url.searchParams.get("code") || "", redirect_uri: redirectUri,
        client_id: process.env.LINE_LOGIN_CHANNEL_ID, client_secret: process.env.LINE_LOGIN_CHANNEL_SECRET }),
    });
    if (!tr.ok) return fail("token");
    const tok = await tr.json();
    // IDトークンをLINEで検証（署名・有効期限・nonce）
    const vr = await fetch("https://api.line.me/oauth2/v2.1/verify", {
      method: "POST", headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ id_token: tok.id_token || "", client_id: process.env.LINE_LOGIN_CHANNEL_ID, nonce: st.nonce }),
    });
    if (!vr.ok) return fail("verify");
    const idt = await vr.json();
    const sub = idt.sub; if (!sub) return fail("verify");
    // ログインしたら最終ログイン日時を更新（5日のカウントをリセット）
    const m = await getMember(sub);
    if (m) { m.lastLogin = Date.now(); m.warnedAt = 0; await putMember(m); }
    const sess = sign({ sub, name: (idt.name || "").slice(0, 30), exp: Date.now() + SESSION_DAYS * 86400e3 });
    const h = new Headers({ location: st.next || "/member/" });
    h.append("set-cookie", setCookie("as_s", sess, SESSION_DAYS * 86400));
    h.append("set-cookie", clearCookie("as_st"));
    return new Response(null, { status: 302, headers: h });
  }
  return err("not found", 404);
};

export const config = { path: ["/api/auth/line/start", "/api/auth/line/callback", "/api/auth/logout"] };
