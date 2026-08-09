/**
 * Signature page loader
 *
 * The loader is readiness-aware. It does not use a fake progress counter or
 * a fixed "wait 3 seconds" timer. The signature animation starts immediately
 * and the overlay can leave only after the document, critical assets and
 * fonts are ready. A small animation-completion guard prevents the signature
 * from being cut off on very fast connections.
 */
(() => {
  "use strict";

  const loader = document.getElementById("page-loader");
  if (!loader) return;

  const mark = loader.querySelector(".signature-loader__mark");
  const paths = [...loader.querySelectorAll(".signature-loader__logo path")];

  const ANIMATION_READY_MS = 1080;
  const MAX_FAILSAFE_MS = 8000;
  const STARTED_AT = performance.now();

  const state = {
    domReady: document.readyState !== "loading",
    windowLoaded: document.readyState === "complete",
    fontsReady: !document.fonts,
    criticalReady: false,
    animationReady: false,
    finished: false
  };

  // Give every SVG path its actual length so the draw animation remains
  // reliable if the logo geometry changes later.
  function prepareStrokeLengths() {
    paths.forEach((path) => {
      try {
        const length = Math.ceil(path.getTotalLength());
        path.style.setProperty("--path-length", length);
        path.style.strokeDasharray = `${length}`;
        path.style.strokeDashoffset = `${length}`;
      } catch (_) {
        // SVG path measurement is not supported everywhere. CSS fallback is safe.
      }
    });
  }

  function getCriticalImages() {
    return [...document.querySelectorAll("img[data-loader-critical]")];
  }

  function waitForImage(image) {
    if (image.complete) return Promise.resolve();

    return new Promise((resolve) => {
      const done = () => {
        image.removeEventListener("load", done);
        image.removeEventListener("error", done);
        resolve();
      };

      image.addEventListener("load", done, { once: true });
      image.addEventListener("error", done, { once: true });
    });
  }

  async function waitForCriticalAssets() {
    await Promise.all(getCriticalImages().map(waitForImage));
    state.criticalReady = true;
    maybeFinish();
  }

  function maybeFinish() {
    if (
      state.finished ||
      !state.domReady ||
      !state.windowLoaded ||
      !state.fontsReady ||
      !state.criticalReady ||
      !state.animationReady
    ) return;

    state.finished = true;
    loader.classList.add("is-done");
    loader.setAttribute("aria-hidden", "true");
    document.documentElement.classList.add("page-ready");

    window.setTimeout(() => loader.remove(), 680);
  }

  function onDomReady() {
    state.domReady = true;
    waitForCriticalAssets();
    maybeFinish();
  }

  prepareStrokeLengths();

  // Animation completion is a visual constraint only; it does not fake page
  // readiness. If the page takes longer to load, the overlay simply remains.
  window.setTimeout(() => {
    state.animationReady = true;
    maybeFinish();
  }, ANIMATION_READY_MS);

  document.addEventListener("DOMContentLoaded", onDomReady, { once: true });

  window.addEventListener("load", () => {
    state.windowLoaded = true;
    state.fontsReady = true;
    maybeFinish();
  }, { once: true });

  if (document.fonts?.ready) {
    document.fonts.ready
      .then(() => {
        state.fontsReady = true;
        maybeFinish();
      })
      .catch(() => {
        state.fontsReady = true;
        maybeFinish();
      });
  }

  // Safety only. This is never the normal completion path.
  window.setTimeout(() => {
    if (state.finished) return;
    state.finished = true;
    loader.classList.add("is-done");
    loader.setAttribute("aria-hidden", "true");
    document.documentElement.classList.add("page-ready");
    window.setTimeout(() => loader.remove(), 680);
  }, MAX_FAILSAFE_MS);
})();
