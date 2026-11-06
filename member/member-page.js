/* Area 会員マイページ（LINEログイン＋サーバー保存） */
(function () {
  var A = AreaAPI, E = A.esc, $ = function (id) { return document.getElementById(id); };
  var AREAS = ["梅田","北新地","心斎橋","難波","十三","天満","江坂","京橋","祇園","三宮","池袋","上野","銀座","六本木","歌舞伎町","渋谷"];
  var JOBS = ["キャバクラ","ラウンジ","クラブ","ガールズバー","スナック","昼キャバ"];
  var PF = ["name","shop","birth","blood","height","bust","hometown","area","job","wageHour","wageDay","hours","prTitle","prBody"];
  var me = null, offers = [];
  function opts(sel, list){ sel.innerHTML = '<option value="">未選択</option>' + list.map(function(x){ return '<option>'+x+'</option>'; }).join(""); }
  opts($("areaSel"), AREAS); opts($("jobSel"), JOBS);
  function show(el, text, kind){ el.innerHTML = text ? '<div class="msg '+(kind||"err")+'">'+E(text)+'</div>' : ""; }
  function busy(btn, on){ if (!btn) return; btn.disabled = on; btn.style.opacity = on ? .6 : 1; }

  [].forEach.call(document.querySelectorAll("[data-tab]"), function(b){ b.onclick = function(){ tab(b.dataset.tab); }; });
  function tab(name){
    [].forEach.call(document.querySelectorAll("[data-tab]"), function(b){ b.classList.toggle("on", b.dataset.tab === name); });
    [].forEach.call(document.querySelectorAll("[data-pane]"), function(p){ p.classList.toggle("hidden", p.dataset.pane !== name); });
    if (name === "offers") renderOffers(true); if (name === "public") renderPublic(); window.scrollTo(0, 0);
  }
  function view(which){
    $("vAuth").classList.toggle("hidden", which === "my"); $("vMy").classList.toggle("hidden", which !== "my");
    $("loginBox").classList.toggle("hidden", which !== "login"); $("fReg").classList.toggle("hidden", which !== "reg");
    $("nav").innerHTML = '<a href="../index.html">求人を探す</a>' + (which === "login" || which === "prep" ? '' : '<a href="/api/auth/logout">ログアウト</a>');
  }

  function offerHTML(o, full){
    var h = '<div class="offer'+(o.read?'':' unread')+'"><div class="top"><span>'+(o.read?'既読':'<span class="pill new">NEW</span>')+'</span><span>'+A.fmt(o.sentAt,true)+'</span></div>'
      + '<div class="shop">'+E(o.shop)+' からオファーが届いています</div>';
    if (full) h += '<div class="body">'+E(o.body)+'</div>' + (o.wage ? '<div class="cond">提示条件：'+E(o.wage)+'</div>' : '')
      + (o.reply ? '<div class="cond" style="color:var(--gold-lt)">あなたの返事：'+E(o.reply)+'</div>' : '')
      + '<div class="acts">' + (o.shopUrl ? '<a class="btn gold sm" href="../'+E(o.shopUrl)+'">お店の求人ページを見る</a>' : '')
      + (o.reply ? '' : '<button class="btn ghost sm" data-reply="'+E(o.id)+'" data-v="興味があります">興味があります</button><button class="btn ghost sm" data-reply="'+E(o.id)+'" data-v="今回は見送ります">今回は見送ります</button>') + '</div>';
    return h + '</div>';
  }
  function badge(){ var n = offers.filter(function(o){ return !o.read; }).length; $("unread").innerHTML = n ? '<span class="badge">'+n+'</span>' : ''; }
  function renderOffers(markRead){
    $("offerList").innerHTML = offers.length ? offers.map(function(o){ return offerHTML(o, true); }).join("") : '<div class="empty">まだオファーは届いていません</div>';
    [].forEach.call(document.querySelectorAll("[data-reply]"), function(b){ b.onclick = async function(){ busy(b, true); try { var r = await A.offerAct(b.dataset.reply, { reply: b.dataset.v }); offers = offers.map(function(o){ return o.id === r.offer.id ? r.offer : o; }); renderOffers(); } catch (e) { alert(e.message); busy(b, false); } }; });
    if (markRead) offers.filter(function(o){ return !o.read; }).forEach(function(o){ o.read = true; A.offerAct(o.id).catch(function(){}); });
    badge();
  }
  function renderPublic(){
    var p = me.profile, s = me.sns, age = A.ageOf(p.birth);
    var rows = [["名前",p.name],["年齢",age!=null?age+"歳":""],["在籍店舗",p.shop],["血液型",p.blood?p.blood+"型":""],["身長",p.height?p.height+"cm":""],["バスト",p.bust?p.bust+"カップ":""],["出身地",p.hometown],["希望勤務地",p.area],["希望職種",p.job],["希望時給",p.wageHour],["希望日給",p.wageDay],["希望出勤時間",p.hours]];
    var sns = [["Instagram",s.instagram],["TikTok",s.tiktok],["Facebook",s.facebook]].filter(function(x){ return x[1]; });
    $("pubView").innerHTML = (p.public ? '' : '<div class="msg warn">いまは非公開です。お店の検索には出ません。</div>')
      + (!p.area ? '<div class="msg warn">「希望勤務地」を入れると、お店の検索に出るようになります。</div>' : '')
      + '<dl class="prof">' + rows.filter(function(r){ return r[1]; }).map(function(r){ return '<dt>'+r[0]+'</dt><dd>'+E(r[1])+'</dd>'; }).join("") + '</dl>'
      + (p.prTitle || p.prBody ? '<h3>'+E(p.prTitle||"自己PR")+'</h3><p style="white-space:pre-wrap;margin:0">'+E(p.prBody)+'</p>' : '')
      + (sns.length ? '<h3>SNS</h3><div class="sns">'+sns.map(function(x){ return '<a href="'+E(x[1])+'" target="_blank" rel="noopener">'+x[0]+'</a>'; }).join("")+'</div>' : '');
  }
  function fillEdit(){
    var f = $("fEdit"), p = me.profile;
    f.username.value = me.username; f.email.value = me.email || ""; f.plan.value = me.plan; f.public.checked = p.public !== false;
    PF.forEach(function(k){ f[k].value = p[k] || ""; });
    ["instagram","tiktok","facebook"].forEach(function(k){ f[k].value = me.sns[k] || ""; });
  }
  function renderHome(){
    $("hello").textContent = (me.profile.name || me.username) + " さんのマイページ";
    $("sId").textContent = me.id; $("sPlan").textContent = A.planName(me.plan);
    $("sCreated").textContent = A.fmt(me.createdAt); $("sLast").textContent = A.fmt(me.lastLogin, true);
    $("sLeft").textContent = A.fmt(me.deleteAt, true) + " に自動削除（ログインするたびに5日後へ延長）";
    var list = offers.slice(0, 3);
    $("homeOffers").innerHTML = list.length ? list.map(function(o){ return offerHTML(o, false); }).join("") + '<button class="btn ghost" type="button" id="goOffers">オファー履歴をすべて見る</button>' : '<div class="empty">まだオファーは届いていません。<br>プロフィールを入力すると、お店から見つけてもらいやすくなります。</div>';
    var g = $("goOffers"); if (g) g.onclick = function(){ tab("offers"); };
    badge();
  }

  $("fReg").onsubmit = async function(e){ e.preventDefault(); var f = e.target, b = f.querySelector("button[type=submit]"); busy(b, true);
    try { var r = await A.register({ username: f.username.value.trim(), email: f.email.value.trim(), birth: f.birth.value, plan: f.plan.value, agree: f.agree.checked });
      me = r.member; offers = []; enterMy("edit"); show($("editMsg"), "登録しました。希望勤務地などを入れると、お店から見つけてもらいやすくなります。", "ok");
    } catch (x) { show($("regMsg"), x.message); } busy(b, false); };
  $("fEdit").onsubmit = async function(e){ e.preventDefault(); var f = e.target, b = f.querySelector("button[type=submit]");
    var bad = ["instagram","tiktok","facebook"].filter(function(k){ return f[k].value && !/^https:\/\//.test(f[k].value); });
    if (bad.length) return show($("editMsg"), "SNSは https:// から始まるURLで入力してください");
    var profile = {}; PF.forEach(function(k){ profile[k] = f[k].value.trim(); }); profile.public = f.public.checked;
    busy(b, true);
    try { var r = await A.update({ username: f.username.value.trim(), email: f.email.value.trim(), plan: f.plan.value, profile: profile, sns: { instagram: f.instagram.value.trim(), tiktok: f.tiktok.value.trim(), facebook: f.facebook.value.trim() } });
      me = r.member; show($("editMsg"), "保存しました", "ok"); renderHome();
    } catch (x) { show($("editMsg"), x.message); } busy(b, false); };
  $("btnQuit").onclick = async function(){
    if (!confirm("退会すると、プロフィール・SNS情報・オファー履歴がすべて削除され、元に戻せません。退会しますか？")) return;
    try { await A.quit(); location.href = "/api/auth/logout"; } catch (x) { alert(x.message); } };
  var gc = $("guideCta"); if (gc) gc.onclick = function(e){ e.preventDefault(); if (me) tab("edit"); window.scrollTo(0, 0); };

  function enterMy(startTab){ view("my"); fillEdit(); renderHome(); tab(startTab || "home"); }

  (async function init(){
    var cfg = await A.config();
    if (!cfg.enabled) { view("prep"); $("prepBar").classList.remove("hidden"); $("loginBox").classList.remove("hidden"); var lb = $("lineBtn"); lb.removeAttribute("href"); lb.textContent = "LINEログイン（準備中）"; lb.style.opacity = .5; return; }
    show($("loginMsg"), A.loginMsg());
    try {
      var r = await A.me();
      if (!r.member) { view("reg"); return; }
      me = r.member;
      try { offers = (await A.offers()).offers || []; } catch (e) { offers = []; }
      enterMy();
    } catch (e) { view("login"); }
  })();
})();
