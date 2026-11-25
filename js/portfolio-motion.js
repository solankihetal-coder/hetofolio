"use strict";
(() => {
 const reduced = matchMedia('(prefers-reduced-motion: reduce)');
 const mouse = matchMedia('(hover: hover) and (pointer: fine)');
 const animate = (element, frames, duration = 220) => {
   if (!element || reduced.matches || !element.animate) return;
   element.getAnimations().forEach(a => a.cancel());
   element.animate(frames, {duration, easing: 'cubic-bezier(.2,.7,.3,1)'});
 };
 reduced.addEventListener('change', () => {
   if (reduced.matches) document.getAnimations().forEach(a => a.cancel());
 });
 // Decorative sticker follows the pointer; existing links remain the only actions.
 const playCards = [...document.querySelectorAll('.play-card')];
 if (playCards.length) {
   const sticker = document.createElement('span');
   sticker.className = 'play-sticker'; sticker.hidden = true;
   sticker.setAttribute('aria-hidden', 'true');
   document.body.append(sticker);
   const hideSticker = () => { sticker.hidden = true; };
   playCards.forEach(card => {
     const theme = card.classList.contains('play-card--kuromi') ? 'kuromi'
       : card.classList.contains('play-card--retro') ? 'retro' : 'table';
     const labels = {kuromi: '🎀 💀', retro: '＋ − ＝', table: '× ÷ ∞'};
     card.addEventListener('pointermove', event => {
       if (!mouse.matches || reduced.matches || event.pointerType !== 'mouse'
         || event.target.closest('a,button')) return hideSticker();
       sticker.dataset.theme = theme;
       sticker.textContent = labels[theme]; sticker.hidden = false;
       sticker.style.transform = `translate(${Math.max(8, Math.min(event.clientX + 18, innerWidth - 130))}px, ${Math.max(8, Math.min(event.clientY + 18, innerHeight - 60))}px)`;
     });
     card.addEventListener('pointerleave', hideSticker);
     card.addEventListener('pointerdown', hideSticker);
   });
   addEventListener('scroll', hideSticker, {passive:true});
   addEventListener('blur', hideSticker);
   document.addEventListener('keydown', hideSticker);
   mouse.addEventListener('change', hideSticker);
   reduced.addEventListener('change', hideSticker);
 }
 document.querySelectorAll('details.case-documentation').forEach(detail => {
   detail.addEventListener('toggle', () => {
     if (detail.open) animate(detail.querySelector('.case-documentation-content'), [{opacity:.4,translate:'0 4px'},{opacity:1,translate:'0 0'}]);
   });
 });
 const contact = document.querySelector('.final-cta');
 if (contact) {
   const observer = new IntersectionObserver(entries => {
     if (entries.some(entry => entry.isIntersecting)) {
       contact.classList.add('is-contact-visible');
       observer.disconnect();
     }
   }, {threshold: .25});
   observer.observe(contact);
 }
 const preview = document.getElementById('gallery-lightbox-image');
 preview?.addEventListener('load', () => animate(preview, [{opacity:.25},{opacity:1}],180));
 document.querySelector('.personal-shuffle')?.addEventListener('click', event => {
   const button = event.currentTarget;
   const notes = [...document.querySelectorAll('.personal-layout > figure')];
   const before = notes.map(note => note.getBoundingClientRect());
   requestAnimationFrame(() => {
     animate(button.querySelector('span'), [{rotate:'0deg'},{rotate:'180deg'}],300);
     notes.forEach((note, i) => {
       const after = note.getBoundingClientRect();
       animate(note, [{translate:`${before[i].left-after.left}px ${before[i].top-after.top}px`},{translate:'0 0'}],320);
     });
   });
 }, true);
 const cursor = document.createElement('span');
 cursor.className = 'project-cursor'; cursor.hidden = true; cursor.setAttribute('aria-hidden','true');
 document.body.append(cursor);
 let active;
 function hide() { cursor.hidden = true; active?.removeAttribute('data-cursor-active'); active = null; }
 document.querySelectorAll('#work .project-card').forEach(card => {
   const media = card.querySelector('.project-image');
   const links = [...card.querySelectorAll('.project-content a[href], .project-info a[href], .project-actions a[href]')];
   const destination = links.find(a => /case study/i.test(a.textContent));
   if (!media || media.querySelector('a') || !destination) return;
   const link = document.createElement('a');
   link.className = 'project-image-link'; link.href = destination.href;
   if(destination.target) link.target = destination.target;
   link.rel = destination.rel;
   const label = 'View case study';
   link.setAttribute('aria-label', label + ': ' + (card.querySelector('h3')?.textContent || 'project'));
   while(media.firstChild) link.append(media.firstChild);
   media.append(link);
   link.addEventListener('pointermove', event => {
     if (!mouse.matches || reduced.matches || event.pointerType !== 'mouse') return hide();
     active = link; link.setAttribute('data-cursor-active',''); cursor.textContent = label; cursor.hidden = false;
     cursor.style.transform = `translate(${Math.max(8,Math.min(event.clientX+14,innerWidth-160))}px,${Math.max(8,Math.min(event.clientY+14,innerHeight-50))}px)`;
   });
   link.addEventListener('pointerleave',hide); link.addEventListener('click',hide);
 });
 addEventListener('scroll',hide,{passive:true}); addEventListener('blur',hide);
 document.addEventListener('keydown',hide); mouse.addEventListener('change',hide); reduced.addEventListener('change',hide);
})();
