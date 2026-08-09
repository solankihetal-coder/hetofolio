/**
 * Hetal Solanki Portfolio — Visual Gallery
 * Phase 5
 *
 * Data source: /data/gallery-data.js
 * Images: /assets/images/gallery/<category>/
 */
"use strict";

const Gallery = {
  state: {
    filter: "all",
    activeIndex: -1,
    items: []
  },

  elements: {},

  init() {
    this.cache();
    if (!this.elements.grid) return;

    this.state.items = Array.isArray(window.GALLERY_ITEMS)
      ? window.GALLERY_ITEMS
      : [];

    const requestedCategory = new URLSearchParams(window.location.search).get("category");
    const validCategories = new Set(["all", "branding", "social", "graphics", "print"]);
    if (requestedCategory && validCategories.has(requestedCategory)) {
      this.state.filter = requestedCategory;
    }

    this.bindFilters();
    this.syncFilterButtons();
    this.bindLightbox();
    this.render();
  },

  cache() {
    this.elements.grid = document.getElementById("gallery-grid");
    this.elements.empty = document.getElementById("gallery-empty");
    this.elements.count = document.getElementById("gallery-count");
    this.elements.filters = document.querySelectorAll("[data-gallery-filter]");
    this.elements.lightbox = document.getElementById("gallery-lightbox");
    this.elements.lightboxImage = document.getElementById("gallery-lightbox-image");
    this.elements.lightboxTitle = document.getElementById("gallery-lightbox-title");
    this.elements.lightboxCategory = document.getElementById("gallery-lightbox-category");
    this.elements.lightboxCaption = document.getElementById("gallery-lightbox-caption");
    this.elements.previous = document.getElementById("gallery-prev");
    this.elements.next = document.getElementById("gallery-next");
  },

  bindFilters() {
    this.elements.filters.forEach((button) => {
      button.addEventListener("click", () => {
        this.state.filter = button.dataset.galleryFilter || "all";
        this.syncFilterButtons();
        this.render();
      });
    });
  },

  syncFilterButtons() {
    this.elements.filters.forEach((button) => {
      const active = button.dataset.galleryFilter === this.state.filter;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  },

  filteredItems() {
    if (this.state.filter === "all") return this.state.items;
    return this.state.items.filter((item) => item.category === this.state.filter);
  },

  render() {
    const items = this.filteredItems();
    this.elements.grid.innerHTML = "";

    if (this.elements.count) {
      this.elements.count.textContent = `${items.length} ${items.length === 1 ? "piece" : "pieces"}`;
    }

    if (!items.length) {
      this.elements.empty.hidden = false;
      return;
    }

    this.elements.empty.hidden = true;

    items.forEach((item, index) => {
      const card = document.createElement("article");
      card.className = `gallery-item gallery-item--${this.escape(item.category)}`;
      card.tabIndex = 0;
      card.dataset.index = String(index);

      card.innerHTML = `
        <button class="gallery-item-button" type="button" aria-label="Open ${this.escape(item.title)}">
          <div class="gallery-item-media">
            <img src="${this.escape(item.image)}" alt="${this.escape(item.alt || item.title)}" loading="lazy">
          </div>
          <div class="gallery-item-info">
            <span>${this.formatCategory(item.category)}</span>
            <h2>${this.escape(item.title)}</h2>
            <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
          </div>
        </button>
      `;

      card.querySelector(".gallery-item-button")?.addEventListener("click", () => {
        this.open(index, items);
      });

      card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          this.open(index, items);
        }
      });

      this.elements.grid.appendChild(card);
    });
  },

  bindLightbox() {
    const lightbox = this.elements.lightbox;
    if (!lightbox) return;

    lightbox.querySelectorAll("[data-gallery-close]").forEach((element) => {
      element.addEventListener("click", () => this.close());
    });

    this.elements.previous?.addEventListener("click", () => this.step(-1));
    this.elements.next?.addEventListener("click", () => this.step(1));

    document.addEventListener("keydown", (event) => {
      if (!lightbox.classList.contains("is-open")) return;

      if (event.key === "Escape") this.close();
      if (event.key === "ArrowLeft") this.step(-1);
      if (event.key === "ArrowRight") this.step(1);
    });
  },

  open(index, visibleItems) {
    const item = visibleItems[index];
    if (!item || !this.elements.lightbox) return;

    this.state.activeIndex = index;
    this.state.visibleItems = visibleItems;

    this.elements.lightboxImage.src = item.image;
    this.elements.lightboxImage.alt = item.alt || item.title;
    this.elements.lightboxTitle.textContent = item.title;
    this.elements.lightboxCategory.textContent = this.formatCategory(item.category);
    this.elements.lightboxCaption.textContent = item.caption || "";

    this.elements.lightbox.classList.add("is-open");
    this.elements.lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");
    this.elements.lightbox.querySelector(".gallery-lightbox-close")?.focus();
  },

  step(direction) {
    const items = this.state.visibleItems || [];
    if (!items.length) return;

    const nextIndex =
      (this.state.activeIndex + direction + items.length) % items.length;

    this.open(nextIndex, items);
  },

  close() {
    if (!this.elements.lightbox) return;

    this.elements.lightbox.classList.remove("is-open");
    this.elements.lightbox.setAttribute("aria-hidden", "true");
    this.elements.lightboxImage.removeAttribute("src");
    document.body.classList.remove("lightbox-open");
  },

  formatCategory(category = "") {
    return category
      .replace(/-/g, " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  },

  escape(value = "") {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }
};

document.addEventListener("DOMContentLoaded", () => Gallery.init());
