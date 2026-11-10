/* Area textfit.js
   1) お店の固定バー（店名・エリア）は1行に収め、入らないときは文字を小さくする。
      それでも入らない店名だけ、カナを次の行へ回す（単語の途中では折り返さない）。
   2) 本文・見出しは、ことばの切れ目（ひらがな→漢字・カタカナ等、句読点のあと）でだけ改行する。 */
(function () {
  var css = ''
    + '.shop-name strong{display:block;white-space:nowrap;overflow:hidden}'
    + '.shop-name strong small{font-size:.56em;white-space:nowrap}'
    + '.shop-name strong.tf-2l small{display:block;margin:2px 0 0;font-size:.62rem}'
    + '.shop-name span{white-space:nowrap;overflow:hidden;text-overflow:clip}'
    + '.shop-name span.tf-2l{white-space:normal;word-break:keep-all;line-height:1.35}'
    + '.tf-p{word-break:keep-all;overflow-wrap:anywhere;line-break:strict}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  function fit(el, minPx) {
    el.style.fontSize = '';
    var size = parseFloat(getComputedStyle(el).fontSize);
    var guard = 60;
    while (el.scrollWidth > el.clientWidth + 1 && size > minPx && guard--) {
      size -= 0.5; el.style.fontSize = size + 'px';
    }
    return el.scrollWidth <= el.clientWidth + 1;
  }

  function fitBar() {
    var names = document.querySelectorAll('.shop-name strong');
    for (var i = 0; i < names.length; i++) {
      var s = names[i]; s.classList.remove('tf-2l');
      if (!fit(s, 14)) { s.classList.add('tf-2l'); fit(s, 11); }
    }
    var subs = document.querySelectorAll('.shop-name span');
    for (var j = 0; j < subs.length; j++) { var u = subs[j]; u.classList.remove('tf-2l'); if (!fit(u, 9.5)) { u.classList.add('tf-2l'); u.style.fontSize = '10px'; } }
  }

  /* ことばの切れ目に改行位置（ゼロ幅スペース）を入れる */
  var HIRA = /[ぁ-ゟ]/, PUNCT = /[、。，．！？!?・／）」』】〉》]/;
  var OPEN = /[（「『【〈《]/;
  var SKIP = { SCRIPT: 1, STYLE: 1, TEXTAREA: 1, INPUT: 1, SELECT: 1, OPTION: 1, CODE: 1, PRE: 1, SVG: 1, NOSCRIPT: 1 };
  function seg(t) {
    var out = '', prev = '';
    for (var i = 0; i < t.length; i++) {
      var c = t.charAt(i);
      if (prev && !/\s/.test(c) && !PUNCT.test(c) && (
          (HIRA.test(prev) && !HIRA.test(c)) || PUNCT.test(prev) || OPEN.test(c))) out += '​';
      out += c; prev = c;
    }
    return out;
  }
  function phrase(root) {
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        for (var p = n.parentNode; p && p !== root; p = p.parentNode) {
          if (SKIP[p.nodeName.toUpperCase()] || (p.closest && p.closest('.shop-name'))) return NodeFilter.FILTER_REJECT;
        }
        return /[ぁ-ヿ一-鿿]/.test(n.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    var list = [], n; while ((n = w.nextNode())) list.push(n);
    list.forEach(function (t) { if (t.nodeValue.indexOf('​') < 0) t.nodeValue = seg(t.nodeValue); });
    var blocks = root.querySelectorAll('h1,h2,h3,h4,h5,p,li,dt,dd,th,td,figcaption,blockquote,label,button,a,b,strong,em,span,small,div');
    for (var i = 0; i < blocks.length; i++) if (!blocks[i].closest('.shop-name')) blocks[i].classList.add('tf-p');
  }

  function run() {
    fitBar();
    phrase(document.body);
    // 口コミなど後から入る文章にも適用
    if (window.MutationObserver) {
      var busy = false;
      new MutationObserver(function (ms) {
        if (busy) return; busy = true;
        ms.forEach(function (m) { m.addedNodes.forEach(function (a) { if (a.nodeType === 1) phrase(a); }); });
        busy = false;
      }).observe(document.body, { childList: true, subtree: true });
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run); else run();
  window.addEventListener('load', fitBar);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitBar);
  var rt; window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(fitBar, 120); });
})();
