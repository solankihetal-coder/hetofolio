"use strict";

const portraitCaption = document.querySelector(".looking-toggle");
const portraitFrame = document.querySelector(".hero-frame");
const front = portraitCaption.querySelector(".looking-front");
const back = portraitCaption.querySelector(".looking-back");
let pinned = false;
let hovering = false;

function updatePortraitCaption() {
  const flipped = pinned || hovering;
  portraitCaption.toggleAttribute("data-flipped", flipped);
  portraitCaption.setAttribute("aria-pressed", String(flipped));
  front.setAttribute("aria-hidden", String(flipped));
  back.setAttribute("aria-hidden", String(!flipped));
}

portraitFrame.addEventListener("pointerenter", event => {
  if (event.pointerType !== "mouse") return;
  hovering = true;
  updatePortraitCaption();
});
portraitFrame.addEventListener("pointerleave", () => {
  hovering = false;
  updatePortraitCaption();
});
function togglePortraitCaption() {
  pinned = !pinned;
  hovering = false;
  updatePortraitCaption();
}
portraitCaption.addEventListener("click", togglePortraitCaption);
portraitFrame.querySelector("img").addEventListener("click", togglePortraitCaption);

const board = document.querySelector(".personal-layout");
const shuffle = document.querySelector(".personal-shuffle");
shuffle.hidden = false;
shuffle.addEventListener("click", () => {
  const shuffled = board.classList.toggle("is-shuffled");
  shuffle.setAttribute("aria-pressed", String(shuffled));
});

const track = document.querySelector(".strip-track");
const items = (window.GALLERY_ITEMS ?? []).filter(item => !["social-01", "social-02"].includes(item.id));
const featured = ["graphics-01", "branding-02", "branding-03"];
const descriptions = {
  "branding-01": "Trading brand identity",
  "branding-02": "Music & media identity",
  "branding-03": "Film & media identity",
  "branding-04": "Brand identity",
  "branding-05": "Identity for a trading company",
  "social-03": "Website campaign",
  "graphics-01": "Jewellery campaign",
  "graphics-02": "Jewellery campaign",
  "graphics-03": "Collection campaign",
  "graphics-04": "Jewellery banner",
  "print-01": "Business card design"
};

if (items.length) {
  const ordered = [
    ...featured.map(id => items.find(item => item.id === id)).filter(Boolean),
    ...items.filter(item => !featured.includes(item.id))
  ];

  let activeCard = null;
  ordered.forEach(item => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "strip-card";
    card.dataset.category = item.category;
    card.setAttribute("aria-pressed", "false");

    const image = document.createElement("img");
    image.src = new URL(item.image, new URL("pages/gallery.html", document.baseURI)).href;
    image.alt = "";
    image.loading = "lazy";
    image.decoding = "async";
    const detail = document.createElement("span");
    detail.className = "strip-detail";
    const title = document.createElement("strong");
    title.textContent = item.title;
    const description = document.createElement("small");
    description.textContent = descriptions[item.id] ?? item.caption;
    detail.append(title, description);
    card.append(image, detail);
    card.addEventListener("click", () => {
      const toggleOff = activeCard === card;
      activeCard?.setAttribute("aria-pressed", "false");
      activeCard = toggleOff ? null : card;
      activeCard?.setAttribute("aria-pressed", "true");
    });
    track.append(card);
  });

  const motion = matchMedia("(prefers-reduced-motion: reduce)");
  const mobileStrip = matchMedia("(max-width: 820px)");
  let manuallyScrolled = false;
  let inView = false;
  let previousFrame = null;
  let position = track.scrollLeft;

  function pauseForManualScroll() {
    manuallyScrolled = true;
  }
  track.addEventListener("pointerdown", pauseForManualScroll, { passive: true });
  track.addEventListener("wheel", event => {
    if (event.deltaX || event.shiftKey) pauseForManualScroll();
  }, { passive: true });
  track.addEventListener("keydown", event => {
    if (["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) pauseForManualScroll();
  });
  new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; }).observe(track);

  function advance(now) {
    const max = track.scrollWidth - track.clientWidth;
    const canMove = inView && !mobileStrip.matches && !motion.matches && !manuallyScrolled && !activeCard && !track.matches(":hover, :focus-within") && max > 1;
    if (canMove && previousFrame !== null) {
      if (Math.abs(track.scrollLeft - position) > 1) position = track.scrollLeft;
      position += Math.min(now - previousFrame, 50) * .035;
      if (position >= max) position = 0;
      track.scrollLeft = position;
    } else {
      position = track.scrollLeft;
    }
    previousFrame = canMove ? now : null;
    requestAnimationFrame(advance);
  }

  requestAnimationFrame(advance);
}

const copyEmail = document.getElementById("copy-email");
if (copyEmail) {
  const status = document.getElementById("copy-email-status");
  const label = copyEmail.querySelector("span");
  const icon = copyEmail.querySelector("i");
  let resetTimer;
  let attempt = 0;
  function resetCopy() {
    clearTimeout(resetTimer);
    copyEmail.disabled = false;
    copyEmail.removeAttribute("aria-busy");
    copyEmail.dataset.state = "idle";
    label.textContent = "Copy";
    icon.className = "fa-regular fa-copy";
    status.textContent = "";
  }
  copyEmail.addEventListener("click", async () => {
    const current = ++attempt;
    resetCopy();
    copyEmail.disabled = true;
    copyEmail.setAttribute("aria-busy", "true");
    label.textContent = "Copying";
    let timeout;
    try {
      if (!window.isSecureContext || !navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
      await Promise.race([
        navigator.clipboard.writeText("hetaljsolanki01@gmail.com"),
        new Promise((_, reject) => { timeout = setTimeout(() => reject(new Error("Clipboard timed out")), 5000); })
      ]);
      if (current !== attempt) return;
      copyEmail.dataset.state = "success";
      label.textContent = "Copied";
      icon.className = "fa-solid fa-check";
      status.textContent = "Email address copied.";
      resetTimer = setTimeout(resetCopy, 3000);
    } catch {
      if (current !== attempt) return;
      copyEmail.dataset.state = "error";
      label.textContent = "Retry";
      status.textContent = "Couldn’t copy. Select the address to copy it manually, or tap it to open your email app.";
      resetTimer = setTimeout(resetCopy, 8000);
    } finally {
      clearTimeout(timeout);
      if (current === attempt) {
        copyEmail.disabled = false;
        copyEmail.removeAttribute("aria-busy");
      }
    }
  });
}
