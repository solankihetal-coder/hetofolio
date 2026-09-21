/**
 * Hetal Solanki Portfolio
 * Cleaned page interaction layer
 *
 * Focus: navigation, project filtering, shared reveal animations,
 * journey motion, beyond-design interactions, and small UI utilities.
 */

"use strict";

const CONFIG = {
  mobileBreakpoint: 820,
  revealThreshold: 0.12
};

const DOM = {
  navToggle: document.getElementById("nav-toggle"),
  siteNav: document.getElementById("site-nav"),
  header: document.getElementById("site-header"),
  projectGrid: document.getElementById("project-grid"),
  filterButtons: document.querySelectorAll(".filter-btn"),
  year: document.getElementById("current-year")
};

/* =========================================================
   NAVIGATION
   ========================================================= */

const Navigation = {
  init() {
    if (!DOM.navToggle || !DOM.siteNav) return;

    DOM.navToggle.addEventListener("click", () => this.toggle());

    DOM.siteNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => this.close());
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") this.close();
    });

    document.addEventListener("click", (event) => {
      const clickedInsideNav =
        DOM.siteNav.contains(event.target) ||
        DOM.navToggle.contains(event.target);

      if (!clickedInsideNav && DOM.siteNav.classList.contains("is-open")) {
        this.close();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > CONFIG.mobileBreakpoint) this.close();
    });
  },

  toggle() {
    const isOpen = DOM.siteNav.classList.toggle("is-open");
    DOM.navToggle.setAttribute("aria-expanded", String(isOpen));
    DOM.navToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );

    DOM.navToggle.innerHTML = isOpen
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars"></i>';

    document.body.classList.toggle("menu-open", isOpen);
  },

  close() {
    DOM.siteNav.classList.remove("is-open");
    DOM.navToggle?.setAttribute("aria-expanded", "false");
    DOM.navToggle?.setAttribute("aria-label", "Open navigation");

    if (DOM.navToggle) {
      DOM.navToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    }

    document.body.classList.remove("menu-open");
  }
};

/* =========================================================
   PROJECT FILTER
   ========================================================= */

const ProjectFilter = {
  init() {
    if (!DOM.projectGrid || !DOM.filterButtons.length) return;

    DOM.filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        this.apply(button.dataset.filter);
      });
    });
  },

  apply(filter) {
    DOM.filterButtons.forEach((button) => {
      const active = button.dataset.filter === filter;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    const cards = DOM.projectGrid.querySelectorAll(".project-card");

    cards.forEach((card) => {
      const shouldShow =
        filter === "all" || card.dataset.category === filter;

      card.classList.toggle("is-hidden", !shouldShow);
    });
  }
};

/* =========================================================
   SCROLL REVEAL
   ========================================================= */

const Reveal = {
  init() {
    const elements = document.querySelectorAll(".reveal");

    if (!elements.length) return;

    if (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        });
      },
      {
        threshold: CONFIG.revealThreshold,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    elements.forEach((element) => observer.observe(element));
  }
};

/* =========================================================
   HEADER SCROLL STATE
   ========================================================= */

const HeaderState = {
  init() {
    if (!DOM.header) return;

    const update = () => {
      DOM.header.classList.toggle("is-scrolled", window.scrollY > 20);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
  }
};



/* =========================================================
   CURRENT YEAR
   ========================================================= */

const FooterYear = {
  init() {
    if (DOM.year) {
      DOM.year.textContent = new Date().getFullYear();
    }
  }
};

/* =========================================================
   INITIALIZE
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  Navigation.init();
  ProjectFilter.init();
  Reveal.init();
  HeaderState.init();
  FooterYear.init();

});


/* =========================================================
   MY JOURNEY — INTERACTIVE MOTION
   ========================================================= */

(() => {

  const journey = document.querySelector(".journey-section");
  const grid = document.querySelector(".journey-grid");
  const path = document.querySelector(".journey-path");
  const progress = document.querySelector(".journey-path-progress");
  const dot = document.querySelector(".journey-path-dot");

  if (!journey || !grid || !path || !progress || !dot) return;


  /* =======================================================
     SCROLL PROGRESS
     ======================================================= */

  let ticking = false;

  function updateJourneyProgress() {

    const rect = grid.getBoundingClientRect();

    const viewportHeight = window.innerHeight;

    const start = viewportHeight * 0.72;
    const end = viewportHeight * 0.18;

    const total = rect.height + start - end;

    const current = start - rect.top;

    let percentage = current / total;

    percentage = Math.max(0, Math.min(1, percentage));

    progress.style.height = `${percentage * 100}%`;

    dot.style.top = `${percentage * 100}%`;

    ticking = false;
  }


  function requestJourneyUpdate() {

    if (!ticking) {

      window.requestAnimationFrame(
        updateJourneyProgress
      );

      ticking = true;
    }
  }


  window.addEventListener(
    "scroll",
    requestJourneyUpdate,
    { passive: true }
  );

  window.addEventListener(
    "resize",
    requestJourneyUpdate
  );

  updateJourneyProgress();


  /* =======================================================
     CURSOR FOLLOWING GLOW
     ======================================================= */

  const cards =
    document.querySelectorAll(
      ".journey-item"
    );


  cards.forEach((card) => {

    card.addEventListener(
      "pointermove",
      (event) => {

        const rect =
          card.getBoundingClientRect();

        const x =
          event.clientX - rect.left;

        const y =
          event.clientY - rect.top;

        card.style.setProperty(
          "--mouse-x",
          `${x}px`
        );

        card.style.setProperty(
          "--mouse-y",
          `${y}px`
        );

      }
    );


    card.addEventListener(
      "pointerleave",
      () => {

        card.style.setProperty(
          "--mouse-x",
          "50%"
        );

        card.style.setProperty(
          "--mouse-y",
          "50%"
        );

      }
    );

  });


  /* =======================================================
     ACTIVE JOURNEY CARD
     ======================================================= */

  const items =
    document.querySelectorAll(
      ".journey-item"
    );


  const observer =
    new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              "journey-active"
            );

          }

        });

      },
      {
        threshold: 0.45
      }
    );


  items.forEach((item) => {

    observer.observe(item);

  });

})();


/* =========================================================
   BEYOND DESIGN — PERSONAL MOODBOARD INTERACTIONS
   ========================================================= */

   (() => {

    const section =
      document.querySelector(".beyond-design");
  
    if (!section) return;
  
  
    /* =======================================================
       SCROLL REVEAL
       ======================================================= */
  
    const revealItems =
      section.querySelectorAll(".beyond-reveal");
  
  
    const revealObserver =
      new IntersectionObserver(
        (entries) => {
  
          entries.forEach((entry) => {
  
            if (entry.isIntersecting) {
  
              entry.target.classList.add(
                "is-visible"
              );
  
            }
  
          });
  
        },
        {
          threshold: 0.12
        }
      );
  
  
    revealItems.forEach((item) => {
  
      revealObserver.observe(item);
  
    });
  
  
    /* =======================================================
       CURSOR PARALLAX
       ======================================================= */
  
    const pieces =
      section.querySelectorAll(".mood-piece");
  
  
    pieces.forEach((piece) => {
  
      piece.addEventListener(
        "pointermove",
        (event) => {
  
          const rect =
            piece.getBoundingClientRect();
  
          const x =
            event.clientX - rect.left;
  
          const y =
            event.clientY - rect.top;
  
          const centerX =
            rect.width / 2;
  
          const centerY =
            rect.height / 2;
  
          const moveX =
            ((x - centerX) / centerX) * 7;
  
          const moveY =
            ((y - centerY) / centerY) * 7;
  
  
          piece.style.setProperty(
            "--mx",
            `${moveX}px`
          );
  
          piece.style.setProperty(
            "--my",
            `${moveY}px`
          );
  
        }
      );
  
  
      piece.addEventListener(
        "pointerleave",
        () => {
  
          piece.style.setProperty(
            "--mx",
            "0px"
          );
  
          piece.style.setProperty(
            "--my",
            "0px"
          );
  
        }
      );
  
    });
  
  
    /* =======================================================
       MUSIC PLAYER
       
       This controls the visual player state.
       It does not embed the copyrighted recording.
       ======================================================= */
  
    const musicCard =
      section.querySelector(
        ".music-player-card"
      );
  
    const musicButton =
      section.querySelector(
        ".music-play"
      );
  
  
    if (musicCard && musicButton) {
  
      let isPlaying = false;
  
  
      musicButton.addEventListener(
        "click",
        () => {
  
          isPlaying = !isPlaying;
  
          musicCard.classList.toggle(
            "is-playing",
            isPlaying
          );
  
          musicButton.setAttribute(
            "aria-label",
            isPlaying
              ? "Pause Wildflower"
              : "Play Wildflower"
          );
  
        }
      );
  
    }
  
  
    /* =======================================================
       SHUFFLE MY WORLD
       ======================================================= */
  
    const board =
      section.querySelector(
        "#beyondBoard"
      );
  
    const shuffleButton =
      section.querySelector(
        "#moodboardShuffle"
      );
  
  
    if (board && shuffleButton) {
  
      const layouts = [
  
        {
          fashion: {
            top: "20px",
            left: "5%",
            right: "auto",
            rotate: "-3.5deg"
          },
  
          music: {
            top: "165px",
            right: "5%",
            left: "auto",
            rotate: "3deg"
          },
  
          sketching: {
            top: "475px",
            left: "16%",
            right: "auto",
            rotate: "2.5deg"
          },
  
          poetry: {
            top: "650px",
            right: "8%",
            left: "auto",
            rotate: "-3deg"
          }
  
        },
  
  
        {
          fashion: {
            top: "100px",
            left: "11%",
            right: "auto",
            rotate: "2deg"
          },
  
          music: {
            top: "35px",
            right: "12%",
            left: "auto",
            rotate: "-4deg"
          },
  
          sketching: {
            top: "500px",
            left: "25%",
            right: "auto",
            rotate: "-3deg"
          },
  
          poetry: {
            top: "630px",
            right: "5%",
            left: "auto",
            rotate: "4deg"
          }
  
        },
  
  
        {
          fashion: {
            top: "390px",
            left: "7%",
            right: "auto",
            rotate: "-5deg"
          },
  
          music: {
            top: "70px",
            right: "20%",
            left: "auto",
            rotate: "2deg"
          },
  
          sketching: {
            top: "520px",
            left: "42%",
            right: "auto",
            rotate: "4deg"
          },
  
          poetry: {
            top: "700px",
            right: "9%",
            left: "auto",
            rotate: "-2deg"
          }
  
        }
  
      ];
  
  
      let currentLayout = 0;
  
  
      shuffleButton.addEventListener(
        "click",
        () => {
  
          currentLayout++;
  
          if (
            currentLayout >= layouts.length
          ) {
  
            currentLayout = 0;
  
          }
  
  
          const layout =
            layouts[currentLayout];
  
  
          Object.entries(layout).forEach(
            ([pieceName, values]) => {
  
              const piece =
                board.querySelector(
                  `[data-piece="${pieceName}"]`
                );
  
              if (!piece) return;
  
  
              piece.style.top =
                values.top;
  
              piece.style.left =
                values.left;
  
              piece.style.right =
                values.right;
  
              piece.style.setProperty(
                "--rotate",
                values.rotate
              );
  
            }
          );
  
        }
      );
  
    }
  
  
  /* =======================================================
     SUBTLE BOARD PARALLAX
     ======================================================= */

  let boardTicking = false;

  section.addEventListener("pointermove", (event) => {
    if (boardTicking) return;
    boardTicking = true;

    window.requestAnimationFrame(() => {
      const rect = section.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      section.style.setProperty("--board-x", `${x * 8}px`);
      section.style.setProperty("--board-y", `${y * 8}px`);
      boardTicking = false;
    });
  });

})();





  /* =========================================================
   HERO — "PSST... THERE'S MORE"
   Magnetic cursor interaction
   ========================================================= */

(() => {

  const psst =
    document.querySelector(".hero-psst");

  if (!psst) return;


  const isTouchDevice =
    window.matchMedia(
      "(hover: none)"
    ).matches;


  if (isTouchDevice) return;


  psst.addEventListener(
    "pointermove",
    (event) => {

      const rect =
        psst.getBoundingClientRect();

      const x =
        event.clientX -
        (rect.left + rect.width / 2);

      const y =
        event.clientY -
        (rect.top + rect.height / 2);


      const moveX =
        Math.max(
          -12,
          Math.min(12, x * 0.12)
        );

      const moveY =
        Math.max(
          -9,
          Math.min(9, y * 0.12)
        );


      psst.style.transform =
        `translateX(-50%)
         translate3d(${moveX}px, ${moveY - 5}px, 0)`;
    }
  );


  psst.addEventListener(
    "pointerleave",
    () => {

      psst.style.transform =
        "translateX(-50%)";

    }
  );


  /* =======================================================
     SMOOTH SCROLL
     ======================================================= */

  psst.addEventListener(
    "click",
    (event) => {

      const targetSelector =
        psst.getAttribute("href");

      const target =
        document.querySelector(
          targetSelector
        );

      if (!target) return;

      event.preventDefault();


      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    }
  );

})();
