(() => {
  'use strict';
  const connect = document.querySelector('.dock-connect');
  if (!connect) return;
  const label = connect.querySelector('.dock-label');
  const dialogs = [...document.querySelectorAll('.dock-sheet')];
  const inline = document.querySelector('.email-copy-row, .gallery-direct-email');
  const footer = document.querySelector('.site-footer');
  const sections = [...document.querySelectorAll('main section[id]')];
  let trigger = null, timer = null, frame = 0;
  let desired = label.textContent;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const labels = {home:'Say Hi!', investment:'Let’s talk', work:'Like this? Let’s talk', visuals:'Like this? Let’s talk', testimonial:'Let’s work together', about:'Let’s work together', journey:'Let’s work together', skills:'Let’s work together', 'beyond-design':'Let’s work together', contact:'Let’s talk'};
  function update() {
    frame = 0;
    const mid = innerHeight / 2;
    const active = sections.find(section => { const r = section.getBoundingClientRect(); return r.top <= mid && r.bottom > mid; });
    const text = active ? (labels[active.id] || 'Say Hi!') : 'Say Hi!';
    if (text !== desired) {
      desired = text; clearTimeout(timer);
      if (reduced.matches) { label.textContent = text; connect.classList.remove('is-swapping'); }
      else { connect.classList.add('is-swapping'); timer = setTimeout(() => { label.textContent = desired; connect.classList.remove('is-swapping'); }, 180); }
    }
    const r = inline?.getBoundingClientRect();
    // Hide the floating contact action only when its in-page replacement is usable.
    const f = footer?.getBoundingClientRect();
    const visible = (r && r.top >= 0 && r.bottom <= innerHeight - 84 && r.width > 0) || (f && f.top < innerHeight * .65 && f.bottom > 0) || active?.id === "contact";
    if (visible && document.activeElement === connect) document.querySelector('.dock-menu').focus({preventScroll:true});
    connect.hidden = !!visible;
  }
  function schedule() { if (!frame) frame = requestAnimationFrame(update); }
  addEventListener('scroll', schedule, {passive:true}); addEventListener('resize', schedule); addEventListener('load', schedule); update();
  document.querySelectorAll('[data-dock-open]').forEach(button => button.addEventListener('click', () => {
    const dialog = document.getElementById(`dock-${button.dataset.dockOpen}-dialog`);
    if (!dialog || dialog.open) return;
    trigger = button; button.setAttribute('aria-expanded','true');
    dialog.showModal(); document.body.classList.add('dock-modal-open');
    dialog.querySelector('.dock-close').focus();
  }));
  dialogs.forEach(dialog => {
    dialog.querySelector('[data-dock-close]').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', e => { if (e.target === dialog) { const r = dialog.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close(); } });
    dialog.addEventListener('close', () => {
      document.body.classList.remove('dock-modal-open');
      if (trigger) { trigger.setAttribute('aria-expanded','false'); if (!trigger.hidden) trigger.focus({preventScroll:true}); trigger = null; }
      schedule();
    });
    dialog.querySelectorAll('.dock-nav a').forEach(a => a.addEventListener('click', () => dialog.close()));
  });
  document.querySelector('[data-dock-copy]').addEventListener('click', async () => {
    const status = document.querySelector('.dock-copy-status');
    const email = 'hetaljsolanki01@gmail.com';
    try { await navigator.clipboard.writeText(email); status.textContent = 'Email copied.'; }
    catch { status.textContent = `Couldn’t copy automatically. Email: ${email}`; }
  });
})();
