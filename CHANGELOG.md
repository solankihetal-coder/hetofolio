# Changelog

## Page Loader Integration

- Added an isolated `css/components/page-loader.css` component.
- Added an isolated `js/components/page-loader.js` readiness controller.
- Added the Think → Design → Build loading experience to the homepage, gallery and project pages.
- Loader progress responds to DOM readiness, critical asset/font readiness and the browser `load` event.
- Added a short 520ms minimum presentation time to prevent a one-frame flash.
- Added an 8-second failsafe so the loader can never trap visitors indefinitely.
- Added `prefers-reduced-motion` support.
- Marked the hero portrait as the only initial critical image on the homepage.
- Added `docs/PAGE-LOADER.md` for maintenance notes.
- Added `docs/SEO-PRE-DEPLOY.md` for the final launch checklist.

## Case-study content + UI update — 2026-08-09

- Reworked the Kuromi's Chaos Calculator, Table Generator, and SavvyShopper case-study pages around the supplied case-study content.
- Added structured section navigation, richer content cards, responsive tables, code blocks, algorithm/feature layouts, project-specific visual accents, and polished CTA treatment.
- Added compact **Live** CTAs to the Kuromi calculator and Table Generator case studies using their supplied live URLs.
- Kept SavvyShopper free of an invented live URL because none was supplied.
- Updated the homepage project cards to use the detailed case-study links and live links where available.
- Restored the portfolio asset set from the latest corrected portfolio build so the current deployable package retains the project/profile/gallery visuals.

## Final deployment polish — 2026-08-09

- Added lightweight content skeletons to the homepage, gallery and project pages.
- Kept the signature page loader completely separate from content skeleton behavior.
- Unified the signature loader across all primary portfolio pages.
- Added responsive shimmer states and reduced-motion support for content skeletons.
- Revalidated local HTML references and JavaScript syntax after the final update.
