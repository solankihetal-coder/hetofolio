# SEO Pre-Deploy Checklist

## 1. Indexing essentials

- [ ] Add a production `robots.txt` at the site root.
- [ ] Add an XML `sitemap.xml` containing only the canonical URLs you want indexed.
- [ ] Verify the deployed property in Google Search Console.
- [ ] Submit the sitemap in Search Console.
- [ ] Inspect the homepage and important project URLs with URL Inspection.

Google recommends putting the sitemap at the site root and using absolute URLs. A sitemap is a crawl hint, not a guarantee of indexing.

## 2. Canonical URLs

Add a `<link rel="canonical" href="...">` to each indexable page once the final production domain is confirmed. Keep the canonical URL consistent with the URL listed in the sitemap.

Do not invent a final canonical domain before the domain is actually chosen.

## 3. Page metadata

For every important page, write a unique:

- `<title>`
- meta description
- Open Graph title/description/image
- descriptive page heading (`h1`)

Project pages should describe the actual project rather than repeating the homepage title.

## 4. Images

- [ ] Give every meaningful image a descriptive `alt`.
- [ ] Keep decorative images `alt=""`.
- [ ] Compress large JPEG/PNG files.
- [ ] Use WebP/AVIF where practical.
- [ ] Keep the hero image eager/high priority; keep below-the-fold gallery images lazy.
- [ ] Avoid loading the same image at multiple unnecessarily large dimensions.

## 5. Performance

Test the deployed site with Lighthouse/PageSpeed Insights and watch Core Web Vitals, especially LCP, INP and CLS.

The page loader in this project is deliberately tied to real browser readiness events and has a short visual minimum only to avoid a one-frame flash. It should not be used to delay content artificially.

## 6. Structured data

Consider adding `Person` structured data to the homepage and `CreativeWork`/`WebSite` structured data only where the markup accurately describes the page. Validate any structured data before launch.

## 7. Content

SEO should not turn this portfolio into keyword stuffing. Keep the copy human and specific:

- Product Designer
- Web Design & Development
- UI/UX
- Branding & Graphics
- Freelance Design

Use these naturally in headings, project descriptions and metadata.

## 8. Final technical checks

- [ ] HTTPS enabled.
- [ ] No broken internal links.
- [ ] No missing local assets.
- [ ] No placeholder dates such as `[Date]` remain.
- [ ] No empty project titles or buttons.
- [ ] Mobile navigation works.
- [ ] Contact form sends successfully.
- [ ] External links open correctly.
- [ ] Reduced-motion behavior works.
- [ ] 404 handling is configured if the host supports it.
