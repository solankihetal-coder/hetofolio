# Hetal Solanki — Portfolio (v74)

Production target: https://solankihetal-coder.github.io/hetofolio/

Static HTML, CSS and JavaScript. No build step required.

## Local preview

Open the project folder in VS Code and use Live Server, or run `python -m http.server 8000` and open http://localhost:8000/. The custom 404 page is configured specifically for the GitHub Pages `/hetofolio/` path.

## Deployment

Merge these files into the existing repository root, preserving `.git`. Commit and push to the GitHub Pages publishing branch (normally `main`, root folder). Keep `.nojekyll`.

## Structure

- `index.html`: homepage
- `pages/`: gallery, projects and playground tools
- `css/`, `js/`, `data/`: styles, interactions and gallery data
- `assets/`: images and icons
- `about/`, `work/`, `visuals/`, `playground/`: compatibility redirects
- `docs/`: documentation and asset manifest

Google Fonts and Font Awesome require internet access. GitHub Pages is static; any external contact service must be tested after deployment.

The `robots.txt` file is included, but crawler rules on a GitHub project subpath are governed by the host-root robots.txt. Submit the project sitemap directly in Search Console if desired.
