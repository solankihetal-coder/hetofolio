# Page Loader Component

The portfolio uses an isolated page-loader component so the loading experience can be maintained without touching the main layout.

## Files

- `css/components/page-loader.css` — loader UI and animations.
- `js/components/page-loader.js` — real readiness logic.
- `index.html` — loader markup and critical hero image marker.

## How it works

The loader progresses from **Think → Design → Build** using real browser milestones rather than an arbitrary long timer:

1. DOM becomes ready.
2. Critical images and fonts are ready.
3. The browser fires `load`.
4. The overlay exits.

A short 520ms minimum presentation prevents a one-frame flash on extremely fast loads. An 8-second failsafe prevents the loader from trapping a visitor if a browser/network event behaves unexpectedly.

## Adding another critical asset

Add `data-loader-critical` to an image that genuinely needs to be ready before the hero is revealed. Avoid marking every image as critical; below-the-fold gallery assets should remain lazy so they do not slow the initial experience.
