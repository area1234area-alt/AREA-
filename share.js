/* Area 共有ボタン
   店舗ページ（求人ページ・遊ぶのお店ページ）に「共有」ボタンを付けます。
   スマホでは端末の共有メニュー（LINE・インスタ・メッセージなど）が開き、
   使えない環境では「LINEで送る／Xでポスト／リンクをコピー」の小さなメニューを出します。 */
(function () {
  var ICON = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 15V3"/><path d="M7 8l5-5 5 5"/><path d="M5 12v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6"/></svg>';
  var css = ''
    + '.ar-share{flex:0 0 52px;border:0;border-left:1px solid var(--line,rgba(201,162,39,.35));background:transparent;color:#F1DA9C;cursor:pointer;display:grid;place-items:center;padding:0}'
    + '.ar-share span{display:block;font-size:9px;letter-spacing:.06em;margin-top:2px;color:#cfc3b2}'
    + '.ar-share-fab{position:fixed;right:14px;bottom:96px;z-index:60;width:52px;height:52px;border-radius:50%;border:1px solid rgba(201,162,39,.6);background:rgba(11,10,13,.92);color:#F1DA9C;display:grid;place-items:center;box-shadow:0 6px 18px rgba(0,0,0,.45);cursor:pointer}'
    + '.ar-share-menu{position:fixed;left:0;right:0;bottom:0;z-index:100;background:#141116;border-top:1px solid rgba(201,162,39,.5);border-radius:18px 18px 0 0;padding:18px 18px calc(18px + env(safe-area-inset-bottom));box-shadow:0 -10px 30px rgba(0,0,0,.5);font-family:inherit}'
    + '.ar-share-menu p{margin:0 0 12px;font-size:13px;color:#cfc3b2;text-align:center}'
    + '.ar-share-menu .row{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}'
    + '.ar-share-menu a,.ar-share-menu button{display:block;text-align:center;padding:13px 6px;border-radius:10px;border:1px solid rgba(201,162,39,.45);background:#1d1a20;color:#F4ECE0;font-size:14px;font-weight:700;text-decoration:none;cursor:pointer;font-family:inherit}'
    + '.ar-share-menu a.line{background:#06C755;border-color:#06C755;color:#fff}'
    + '.ar-share-menu .close{margin-top:12px;width:100%;background:transparent;border-color:transparent;color:#b7aea6;font-weight:400}'
    + '.ar-share-toast{position:fixed;left:50%;bottom:120px;transform:translateX(-50%);z-index:110;background:#F1DA9C;color:#1a1620;font-size:14px;font-weight:700;padding:10px 18px;border-radius:999px}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  function shopName() {
    var n = document.querySelector('.shop-name strong');
    if (n) return n.textContent.replace(/\s+/g, ' ').replace(/​/g, '').trim();
    var h = document.querySelector('h1');
    return h ? h.textContent.replace(/​/g, '').trim() : document.title;
  }
  function data() {
    var url = location.href.split('#')[0];
    var isJob = !!document.querySelector('.shop-bar');
    var text = isJob ? shopName() + 'の求人｜Area' : shopName() + '｜Area';
    return { title: text, text: text, url: url };
  }
  function toast(t) {
    var d = document.createElement('div'); d.className = 'ar-share-toast'; d.textContent = t;
    document.body.appendChild(d); setTimeout(function () { d.remove(); }, 1800);
  }
  function copy(u) {
    function ok() { toast('リンクをコピーしました'); }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(u).then(ok, fallback); else fallback();
    function fallback() { var i = document.createElement('input'); i.value = u; document.body.appendChild(i); i.select(); try { document.execCommand('copy'); ok(); } catch (e) {} i.remove(); }
  }
  function menu() {
    var d = data(), old = document.querySelector('.ar-share-menu'); if (old) { old.remove(); return; }
    var m = document.createElement('div'); m.className = 'ar-share-menu'; m.setAttribute('role', 'dialog');
    var enc = encodeURIComponent;
    m.innerHTML = '<p>このお店をシェアする</p><div class="row">'
      + '<a class="line" target="_blank" rel="noopener" href="https://social-plugins.line.me/lineit/share?url=' + enc(d.url) + '">LINEで送る</a>'
      + '<a target="_blank" rel="noopener" href="https://x.com/intent/post?text=' + enc(d.text) + '&url=' + enc(d.url) + '">Xでポスト</a>'
      + '<button type="button" data-copy>リンクをコピー</button></div>'
      + '<button type="button" class="close">閉じる</button>';
    m.querySelector('[data-copy]').onclick = function () { copy(d.url); m.remove(); };
    m.querySelector('.close').onclick = function () { m.remove(); };
    document.body.appendChild(m);
  }
  function share() {
    var d = data();
    if (navigator.share) { navigator.share(d).catch(function (e) { if (e && e.name !== 'AbortError') menu(); }); }
    else menu();
  }
  function init() {
    if (document.querySelector('.ar-share,.ar-share-fab')) return;
    var bar = document.querySelector('.shop-bar-in'), menuBtn = bar && bar.querySelector('.menu-btn');
    var b = document.createElement('button'); b.type = 'button'; b.setAttribute('aria-label', 'このお店をシェアする');
    if (bar && menuBtn) {
      b.className = 'ar-share'; b.innerHTML = '<div>' + ICON + '<span>共有</span></div>';
      bar.insertBefore(b, menuBtn);
    } else {
      b.className = 'ar-share-fab'; b.innerHTML = ICON;
      document.body.appendChild(b);
    }
    b.addEventListener('click', share);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
