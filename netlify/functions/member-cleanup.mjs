// 1時間ごとに実行：最終ログインから4日の会員にLINEでお知らせ、5日の会員を削除
import { configured, listMembers, putMember, deleteMemberAll, linePush, DAY, DELETE_DAYS, WARN_DAYS } from "../lib/member-core.mjs";

export default async () => {
  if (!configured()) return;
  const t = Date.now(); let warned = 0, removed = 0;
  for (const m of await listMembers()) {
    const idle = t - m.lastLogin;
    if (idle >= DELETE_DAYS * DAY) { await deleteMemberAll(m, "5日間ログインなし"); removed++; continue; }
    if (idle >= WARN_DAYS * DAY && !m.warnedAt) {
      const ok = await linePush(m.sub, "【Area】最後のログインから4日たちました。明日、会員データ（プロフィール・オファー履歴）が自動で削除されます。続けて使う場合は、マイページにログインしてください。\nhttps://lambent-lebkuchen-007367.netlify.app/member/");
      m.warnedAt = t; m.warnedByLine = ok; await putMember(m); warned++;
    }
  }
  console.log(JSON.stringify({ warned, removed }));
};

export const config = { schedule: "@hourly" };
