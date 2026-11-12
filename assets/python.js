/* python.shareyourgroup.com: copy buttons on code, and "lesson done" ticks kept in this browser only */
(function () {
  'use strict';
  var d = document, KEY = 'py-done';
  function load() { try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch (e) { return []; } }
  function save(a) { try { localStorage.setItem(KEY, JSON.stringify(a)); } catch (e) {} }
  d.addEventListener('click', function (e) {
    var b = e.target.closest('.cp');
    if (b) { var pre = b.parentNode.querySelector('pre.code'); if (pre && window.SYG) SYG.copy(pre.textContent, 'Code copied'); return; }
    b = e.target.closest('[data-done]');
    if (b) {
      var slug = b.closest('[data-lesson]').getAttribute('data-lesson'), a = load(), i = a.indexOf(slug);
      if (i > -1) a.splice(i, 1); else a.push(slug);
      save(a); paint();
    }
    b = e.target.closest('[data-print]');
    if (b) window.print();
  });
  function paint() {
    var a = load(), art = d.querySelector('[data-lesson]'), btn = d.querySelector('[data-done]');
    if (art && btn) {
      var on = a.indexOf(art.getAttribute('data-lesson')) > -1;
      btn.classList.toggle('on', on); btn.textContent = on ? 'Done \u2713 (tap to undo)' : 'Mark this lesson as done';
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    }
    var links = d.querySelectorAll('.ll a[data-l]'), n = 0, next = null;
    for (var i = 0; i < links.length; i++) {
      var done = a.indexOf(links[i].getAttribute('data-l')) > -1;
      links[i].classList.toggle('done', done);
      if (done) n++; else if (!next) next = links[i];
    }
    var p = d.querySelector('[data-progress]');
    if (p && links.length && n) {
      p.hidden = false;
      p.textContent = n + ' of ' + links.length + ' lessons done.' + (next ? ' Next: ' + next.querySelector('span').textContent : ' You have finished the course. Try the projects.');
    }
  }
  paint();
})();
