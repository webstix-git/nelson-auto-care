# Nelson Auto Care (Next.js)

Conversion of the original static HTML site into a Next.js App Router application. Visual design, content, assets, and interactions are preserved from the HTML source.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm start` — serve production build

## Routes

| Original HTML | Next.js route |
| --- | --- |
| `index.html` | `/` |
| `about.html` | `/about` |
| `services.html` | `/services` |
| `brake-service.html` | `/brake-service` |
| `contact.html` | `/contact` |
| `thank-you.html` | `/thank-you` |
| `site-map.html` | `/site-map` |
| `privacy-policy.html` | `/privacy-policy` |
| `ai-policy.html` | `/ai-policy` |
| `ai-readiness-service-index.html` | `/ai-readiness-service-index` |
| `404.html` | `not-found` |

Original HTML snapshots live in `_original-html/`. Page body markup used by the app is in `content/`. Shared styles are in `styles/style.css`. Images are in `public/images/`.
