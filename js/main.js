/**
 * Hetal Solanki Portfolio
 * Phase 1 application logic
 *
 * Keep this file focused on behavior:
 * navigation, filtering, reveal animations, form UX and small UI utilities.
 */

"use strict";

const CONFIG = {
  mobileBreakpoint: 820,
  revealThreshold: 0.12,
  formMessageMax: 1000
};

const DOM = {
  navToggle: document.getElementById("nav-toggle"),
  siteNav: document.getElementById("site-nav"),
  header: document.getElementById("site-header"),
  projectGrid: document.getElementById("project-grid"),
  filterButtons: document.querySelectorAll(".filter-btn"),
  contactForm: document.getElementById("contact-form"),
  message: document.getElementById("message"),
  characterCount: document.getElementById("current-char"),
  formStatus: document.getElementById("form-status"),
  submitButton: document.getElementById("submit-btn"),
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
   CONTACT FORM
   ========================================================= */

const ContactForm = {
  init() {
    if (!DOM.contactForm) return;

    this.updateCharacterCount();

    DOM.message?.addEventListener("input", () => this.updateCharacterCount());

    DOM.contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      this.submit();
    });
  },

  updateCharacterCount() {
    if (!DOM.message || !DOM.characterCount) return;
    DOM.characterCount.textContent = DOM.message.value.length;
  },

  setStatus(message, type = "") {
    if (!DOM.formStatus) return;
    DOM.formStatus.textContent = message;
    DOM.formStatus.className = `form-status ${type}`.trim();
  },

  async submit() {
    if (!DOM.submitButton) return;

    const formData = new FormData(DOM.contactForm);

    DOM.submitButton.disabled = true;
    DOM.submitButton.innerHTML =
      'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
    this.setStatus("");

    try {
      const response = await fetch(DOM.contactForm.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json"
        }
      });

      if (!response.ok) {
        throw new Error(`Form submission failed: ${response.status}`);
      }

      DOM.contactForm.reset();
      this.updateCharacterCount();
      this.setStatus(
        "Thanks! Your enquiry has been sent. I'll get back to you soon.",
        "success"
      );
    } catch (error) {
      console.error("Contact form error:", error);
      this.setStatus(
        "Something went wrong. Please try again or contact me directly.",
        "error"
      );
    } finally {
      DOM.submitButton.disabled = false;
      DOM.submitButton.innerHTML =
        'Send Enquiry <i class="fa-solid fa-paper-plane"></i>';
    }
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
   VISUAL GALLERY
   ========================================================= */

const VisualGallery = {
  init() {
    this.gallery = document.getElementById("visual-gallery");
    this.filters = document.querySelectorAll(".gallery-filter");
    this.empty = document.getElementById("gallery-empty");
    this.lightbox = document.getElementById("gallery-lightbox");
    this.image = document.getElementById("lightbox-image");
    this.title = document.getElementById("lightbox-title");
    this.category = document.getElementById("lightbox-category");
    this.description = document.getElementById("lightbox-description");

    if (!this.gallery) return;

    this.filters.forEach((button) => {
      button.addEventListener("click", () => this.filter(button.dataset.galleryFilter));
    });

    this.gallery.querySelectorAll(".gallery-card").forEach((card) => {
      card.addEventListener("click", () => this.open(card));

      const image = card.querySelector("img");
      image?.addEventListener("error", () => {
        image.style.display = "none";
        const media = image.closest(".gallery-media");
        if (media) media.classList.add("image-missing");
      });
    });

    this.lightbox?.querySelectorAll("[data-lightbox-close]").forEach((element) => {
      element.addEventListener("click", () => this.close());
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && this.lightbox?.classList.contains("is-open")) {
        this.close();
      }
    });
  },

  filter(category) {
    this.filters.forEach((button) => {
      const active = button.dataset.galleryFilter === category;
      button.classList.toggle("active", active);
      button.setAttribute("aria-selected", String(active));
    });

    let visible = 0;
    this.gallery.querySelectorAll(".gallery-card").forEach((card) => {
      const show = category === "all" || card.dataset.galleryCategory === category;
      card.classList.toggle("is-hidden", !show);
      if (show) visible += 1;
    });

    if (this.empty) this.empty.hidden = visible !== 0;
  },

  open(card) {
    if (!this.lightbox) return;

    const source = card.dataset.galleryImage;
    const title = card.dataset.galleryTitle || "Visual Work";
    const category = card.dataset.galleryCategory || "Selected Work";
    const description = card.dataset.galleryCaption || "";

    this.image.src = source;
    this.image.alt = title;
    this.title.textContent = title;
    this.category.textContent = category.replace(/-/g, " ");
    this.description.textContent = description;

    this.lightbox.classList.add("is-open");
    this.lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("menu-open");
    this.lightbox.querySelector(".lightbox-close")?.focus();
  },

  close() {
    if (!this.lightbox) return;
    this.lightbox.classList.remove("is-open");
    this.lightbox.setAttribute("aria-hidden", "true");
    this.image.src = "";
    document.body.classList.remove("menu-open");
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
  ContactForm.init();
  HeaderState.init();
  FooterYear.init();
  VisualGallery.init();

});
