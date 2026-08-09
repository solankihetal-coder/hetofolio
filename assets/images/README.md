# Image Asset Structure

This folder is intentionally organized by purpose so the portfolio can be maintained without rebuilding the site.

## Structure

- `logo/` — site logo variants
- `profile/` — profile/hero photography
- `projects/` — project presentation assets, grouped by project
- `project-ui/` — UI screens used inside project pages
- `gallery/` — Brand & Visual Work gallery assets, grouped by category
- `hobbies/` — personal-interest visuals
- `certificates/` — learning/certification visuals, kept available for a later credentials section

## Workflow

When adding a new project:

1. Create `projects/<project-slug>/`.
2. Put hero/mockup assets there.
3. Put interface screenshots in `project-ui/<project-slug>/`.
4. Update the relevant project page.
5. Update the project card in `index.html`.
6. Keep filenames descriptive and lowercase/kebab-case where possible.

When adding visual work:

1. Put the asset in `gallery/branding`, `gallery/social`, `gallery/graphics`, or `gallery/print`.
2. Add one entry to `data/gallery-data.js`.
3. Do not place gallery assets directly in the HTML.

Unused/future assets are deliberately kept under `projects/future/` rather than being forced into the current portfolio.
