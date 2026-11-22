/* NIGHT STYLE 共有ボタン（全ページ）
   店舗ページは上のバーに「共有」、それ以外のページは右下に丸いボタンを出します。
   スマホでは端末の共有メニュー（LINE・インスタ・メッセージなど）を開き、
   使えない環境では LINE／X／Threads／Facebook／リンクコピー のメニューを出します。 */
(function () {
  var BRAND = 'NIGHT STYLE';
  var ICON = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 15V3"/><path d="M7 8l5-5 5 5"/><path d="M5 12v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6"/></svg>';
  var css = ''
    + '.ar-share{flex:0 0 52px;border:0;border-left:1px solid rgba(224,127,163,.3);background:transparent;color:#D96690;cursor:pointer;display:grid;place-items:center;padding:0}'
    + '.ar-share span{display:block;font-size:9px;letter-spacing:.06em;margin-top:2px;color:#756E88}'
    + '.ar-share-fab{position:fixed;right:14px;bottom:calc(96px + env(safe-area-inset-bottom));z-index:60;width:52px;height:52px;border-radius:50%;border:0;background:linear-gradient(135deg,#F7B0C9,#C9B6F2);color:#fff;display:grid;place-items:center;box-shadow:0 8px 20px rgba(200,120,170,.35);cursor:pointer}'
    + '.ar-share-fab:focus-visible,.ar-share:focus-visible{outline:3px solid #8A73D1;outline-offset:2px}'
    + '.ar-share-menu{position:fixed;left:0;right:0;bottom:0;z-index:100;background:#fff;border-radius:22px 22px 0 0;padding:18px 18px calc(18px + env(safe-area-inset-bottom));box-shadow:0 -10px 30px rgba(150,110,160,.22);font-family:inherit;max-width:560px;margin:0 auto}'
    + '.ar-share-menu p{margin:0 0 12px;font-size:13px;color:#756E88;text-align:center;font-weight:700}'
    + '.ar-share-menu .row{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}'
    + '.ar-share-menu a,.ar-share-menu button{display:block;text-align:center;padding:13px 4px;border-radius:14px;border:1px solid #EEE6F4;background:#FFF7FA;color:#46405A;font-size:13px;font-weight:700;text-decoration:none;cursor:pointer;font-family:inherit}'
    + '.ar-share-menu a.line{background:#06C755;border-color:#06C755;color:#fff}'
    + '.ar-share-menu a.x{background:#46405A;border-color:#46405A;color:#fff}'
    + '.ar-share-menu .close{margin-top:10px;width:100%;background:transparent;border-color:transparent;color:#9C96AC;font-weight:400}'
    + '.ar-share-toast{position:fixed;left:50%;bottom:120px;transform:translateX(-50%);z-index:110;background:#46405A;color:#fff;font-size:14px;font-weight:700;padding:10px 18px;border-radius:999px}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  function clean(s) { return (s || '').replace(/​/g, '').replace(/\s+/g, ' ').trim(); }
  function data() {
    var url = location.href.split('#')[0];
    var n = document.querySelector('.shop-name strong');
    var text;
    if (n) text = clean(n.textContent) + (document.querySelector('.shop-bar') ? 'の求人｜' : '｜') + BRAND;
    else text = clean(document.title) || BRAND;
    return { title: text, text: text, url: url };
  }
  function toast(t) {
    var d = document.createElement('div'); d.className = 'ar-share-toast'; d.setAttribute('role', 'status'); d.textContent = t;
    document.body.appendChild(d); setTimeout(function () { d.remove(); }, 1800);
  }
  function copy(u) {
    function ok() { toast('リンクをコピーしました'); }
    function fallback() { var i = document.createElement('input'); i.value = u; document.body.appendChild(i); i.select(); try { document.execCommand('copy'); ok(); } catch (e) {} i.remove(); }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(u).then(ok, fallback); else fallback();
  }
  function menu() {
    var d = data(), old = document.querySelector('.ar-share-menu'); if (old) { old.remove(); return; }
    var m = document.createElement('div'); m.className = 'ar-share-menu'; m.setAttribute('role', 'dialog'); m.setAttribute('aria-label', 'このページを共有');
    var e = encodeURIComponent;
    m.innerHTML = '<p>このページを共有する</p><div class="row">'
      + '<a class="line" target="_blank" rel="noopener" href="https://social-plugins.line.me/lineit/share?url=' + e(d.url) + '">LINE</a>'
      + '<a class="x" target="_blank" rel="noopener" href="https://x.com/intent/post?text=' + e(d.text) + '&url=' + e(d.url) + '">X</a>'
      + '<a target="_blank" rel="noopener" href="https://www.threads.net/intent/post?text=' + e(d.text + ' ' + d.url) + '">Threads</a>'
      + '<a target="_blank" rel="noopener" href="https://www.facebook.com/sharer/sharer.php?u=' + e(d.url) + '">Facebook</a>'
      + '<button type="button" data-copy>リンクをコピー</button>'
      + (navigator.share ? '<button type="button" data-more>その他</button>' : '<span></span>')
      + '</div><button type="button" class="close">閉じる</button>';
    m.querySelector('[data-copy]').onclick = function () { copy(d.url); m.remove(); };
    var more = m.querySelector('[data-more]'); if (more) more.onclick = function () { m.remove(); navigator.share(d).catch(function () {}); };
    m.querySelector('.close').onclick = function () { m.remove(); };
    document.body.appendChild(m);
  }
  function init() {
    if (document.querySelector('.ar-share,.ar-share-fab')) return;
    var bar = document.querySelector('.shop-bar-in'), menuBtn = bar && bar.querySelector('.menu-btn');
    var b = document.createElement('button'); b.type = 'button'; b.setAttribute('aria-label', 'このページを共有する');
    if (bar && menuBtn) { b.className = 'ar-share'; b.innerHTML = '<div>' + ICON + '<span>共有</span></div>'; bar.insertBefore(b, menuBtn); }
    else { b.className = 'ar-share-fab'; b.innerHTML = ICON; document.body.appendChild(b); }
    b.addEventListener('click', menu);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
