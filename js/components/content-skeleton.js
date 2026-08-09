/* Content skeletons — separate from the signature page loader. */
(() => {
  "use strict";
  const skeleton = document.querySelector("[data-content-skeleton]");
  if (!skeleton) return;

  const hide = () => {
    skeleton.classList.add("is-hidden");
    window.setTimeout(() => skeleton.remove(), 260);
  };

  // The skeleton is a genuine fallback for content that is still settling;
  // it never creates an artificial wait. On fast loads it disappears immediately.
  if (document.readyState === "complete") {
    requestAnimationFrame(hide);
  } else {
    window.addEventListener("load", () => requestAnimationFrame(hide), { once: true });
  }
})();
