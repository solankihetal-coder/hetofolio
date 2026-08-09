# Hetal Solanki Portfolio — Phase 4

Phase 4 upgrades the first content-complete case study from a generic project template into a mature, compact technical case study.

## Completed in this phase

### Table Generator
- Reframed as a **Logic & Algorithm Practice Project** rather than a generic UX case study.
- Rewrote the narrative around the actual project material provided by Hetal.
- Added sections for:
  - Project overview
  - Challenge
  - What I wanted to explore
  - Feature system
  - Architecture / data flow
  - Core generation logic
  - Edge cases
  - Performance
  - Interaction and UI
  - Technical decisions
  - Learnings
  - Final takeaway
  - Live project CTA
- Added the supplied dark-theme and light-theme screenshots as evidence.
- Kept the supplied tablet presentation image available as a project visual.
- Kept Font Awesome as the icon system via CDN.
- Did not invent metrics, user research, client outcomes or unsupported claims.

## Asset structure

```text
assets/
└── images/
    └── projects/
        └── table-generator/
            ├── table-generator-dark.png
            ├── table-generator-light.png
            ├── table-generator-device-preview.png
            └── table-generator-banner.svg
```

The presentation/mockup image is included because it was supplied with the project material. New AI-generated project mockups for the rest of the portfolio remain a later phase as previously planned.

## CTA system update

Project cards now use short, destination-based CTAs:

- **Case Study ↗** — external detailed case study (Swachhata → Behance)
- **Prototype ↗** — external Figma prototype
- **Project →** — internal portfolio project page
- **Live ↗** — external live project link inside an internal project page

The CTAs are intentionally short so the work cards stay visually clean and do not feel button-heavy.

## Remaining Phase 4 work

The other case-study pages are intentionally **not rewritten from guesses**. Their final copy should be based on their original case-study/source material, just as Table Generator was.

Next source material needed:
- Swachhata case study
- Twirl Around World project material
- Play Scape Shippers project material
- Smart E-Commerce project material
- Calculator project material

Once each source is supplied, it can be rewritten into the appropriate case-study depth rather than forcing every project into the same template.

## Deployment

The Table Generator live link is:
https://solankihetal-coder.github.io/Table-Generator/

The case-study page links to that external project and does not attempt to embed or recreate the live application.

## Phase 5 — Visual Gallery System

The visual-work gallery is intentionally separated from the main project/case-study system.

### Add work

1. Put the finished image in the correct folder:
   - `assets/images/gallery/branding/`
   - `assets/images/gallery/social/`
   - `assets/images/gallery/graphics/`
   - `assets/images/gallery/print/`
2. Add one item to `data/gallery-data.js`.
3. Use a stable filename and descriptive `alt` text.
4. Open `pages/gallery.html` and verify the filter + lightbox behavior.

### Gallery item template

```js
{
  id: "brand-001",
  category: "branding",
  title: "Business Identity",
  caption: "Logo and supporting brand graphics.",
  image: "../assets/images/gallery/branding/business-identity.jpg",
  alt: "Business identity design"
}
```

### Rule

Do not add visual work to the gallery just to make it look full. Keep it selective. A smaller collection of strong work is better than a wall of average work.


## Maintenance / Component Structure

The page loader is intentionally isolated from the main stylesheet and application logic:

```text
css/
  components/
    page-loader.css
js/
  components/
    page-loader.js
docs/
  PAGE-LOADER.md
```

This keeps future loader changes independent from the portfolio's core layout and interactions.

## GitHub Pages Deployment

This portfolio is prepared for direct deployment on GitHub Pages.

1. Create or open the repository that will host the portfolio.
2. Upload the **contents of this ZIP**, not the ZIP file itself, to the repository root.
3. Keep `index.html` at the repository root.
4. Keep the `assets/`, `css/`, `js/`, `data/`, `pages/` and `docs/` folders in the same relative structure.
5. Commit and push the files.
6. In GitHub, open **Settings → Pages**.
7. Under **Build and deployment**, choose **Deploy from a branch**.
8. Select the branch containing the portfolio (normally `main`) and the `/ (root)` folder, then save.
9. Wait for the Pages deployment to finish, then open the generated Pages URL.

### Important GitHub Pages files

- `.nojekyll` is included so GitHub Pages serves the static project structure without Jekyll processing.
- `404.html` provides a custom fallback page.
- `robots.txt` and `sitemap.xml` are included for search-engine discovery.
- The homepage uses the GitHub Pages canonical URL configured for this project.

### Before going live

- Replace any remaining placeholder contact details with your real contact destination.
- Confirm every external project, Behance and live-project link opens correctly.
- Test the site on desktop and mobile after Pages finishes deploying.
- Test a hard refresh on a case-study URL and the custom 404 page.
- Submit the final sitemap to Google Search Console after the site is publicly reachable.
