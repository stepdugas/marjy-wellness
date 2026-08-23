# Marjy Wellness

Static site for Marjy — professional organizer, craniosacral & polarity therapy practitioner, and holistic guide.

## Stack

- Vanilla HTML / CSS / JS. No build step.
- Header & footer are a single source of truth in `js/main.js` and injected on every page.
- Contact form is a native Netlify form (`data-netlify="true"`) — submissions email straight to Marjy once deployed to Netlify.

## Local development

Because pages fetch assets with absolute paths (`/css/styles.css`), open the site via a local server, not `file://`:

```bash
cd ~/Documents/marjy-wellness
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Structure

```
marjy-wellness/
├── index.html         # Home
├── about.html         # About Marjy
├── work-with-me.html  # Ways to work together (pricing lives here)
├── contact.html       # Netlify contact form
├── css/styles.css     # Design system + all page styles
├── js/main.js         # Header + footer HTML, mobile nav, current-page state
├── images/            # Photography
└── partials/          # (reserved — currently unused; header/footer live in js/main.js)
```

## Editing the header or footer

Edit `js/main.js` — the `headerHTML` and `footerHTML` template strings at the top. Changes appear on every page automatically.

## Deploy

1. Push to GitHub (`stepdugas/marjy-wellness`).
2. Enable GitHub Pages (Settings → Pages → Deploy from `main` branch).
3. When ready, connect the repo to Netlify for the contact form + custom domain.
