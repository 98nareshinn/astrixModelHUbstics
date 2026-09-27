# भूमि साथी — Bhoomi Saathi

A location-based real estate + home services marketplace for **Beawar, Rajasthan (305901)** — built as a bilingual (Hindi/English), mobile-first web platform.

> आपका घर | आपकी ज़मीन | आपका साथी

## What's included

This is a **full project**, matching the documented architecture:

```
bhoomi-saathi/
├── frontend/       React + Vite + TypeScript SPA (this is what you run first)
├── backend/        Node.js + Express API (server.js is the entry point)
└── database/       MySQL schema.sql — full schema + seed data
```

### Frontend (`/frontend`)
- React 19 + Vite + TypeScript, React Router, Lucide icons
- Fully bilingual (Hindi default, English toggle) — not just labels, real translated copy
- Light/dark theme toggle
- Property feed, search & filters, property details with Khasra-number specs, enquiry form, comments, share, like
- Property submission flow (public user → pending review → admin approval → published)
- Admin dashboard + shared admin login (demo: `admin@bhoomisaathi.in` / `admin123`)
- Area maps catalogue with a pay-to-unlock flow (demo)
- Home services marketplace (8 services, matching the doc)
- Local news section
- Real Beawar map (OpenStreetMap embed, actual city coordinates)
- Circular logo (`/frontend/public/logo.svg`) generated to match the uploaded brand mark
- Currently runs on **demo/local data** (localStorage-backed) so it works immediately with zero setup — see "Connecting the backend" below to wire it to the real API

### Backend (`/backend`)
- Express API boundary matching the documented routes (`/api/properties`, `/api/maps`, `/api/services`, `/api/news`, `/api/auth`, `/api/cities`, `/api/areas`)
- JWT auth, shared admin login, property approval workflow
- MySQL via `mysql2`

### Database (`/database/schema.sql`)
- Full schema: cities, areas, users, properties, images, likes, comments, enquiries, approvals, map products/orders, services, service requests, news cache
- Pre-seeded with Beawar + its colonies, the 3-person admin team, and all 8 services

## Quick start — frontend only (fastest way to see it)

```bash
cd frontend
npm install
npm run dev
```

Open the printed local URL. This runs entirely on demo data — no backend or database needed. Property submissions, likes, comments and admin approvals all persist to your browser's localStorage.

## Full stack — connecting frontend to the real backend

1. **Set up MySQL and import the schema:**
   ```bash
   mysql -u root -p < database/schema.sql
   ```

2. **Configure and start the backend:**
   ```bash
   cd backend
   cp .env.example .env
   # edit .env with your MySQL credentials
   npm install
   npm run dev
   ```
   The API will run on `http://localhost:4000` (health check: `GET /api/health`).

3. **Point the frontend at the API:**
   The frontend currently reads/writes through React Context + localStorage (`src/context/DataContext.tsx`), exactly as scoped for the demo phase described in the documentation. To connect it to the live backend, replace the calls in that file with `fetch("http://localhost:4000/api/...")` calls — the API shapes already match the frontend's data types in `src/data/types.ts`.

## Production checklist

The documentation this was built from calls out these as next steps before going live — none of them are done yet, by design, since this is the MVP/demo phase:

- Move admin credentials server-side with proper password hashing (already scaffolded in the schema as `password_hash`, not yet wired to bcrypt)
- Real payment gateway for map purchases (Razorpay is a good fit for India)
- Private object storage for property photos and paid maps (signed URLs)
- A scheduled job to populate `news_cache` from a real RSS/news source
- Rate limiting, CSRF/CORS hardening, audit logging
- SEO metadata, sitemap, and the PWA manifest is already in place (`frontend/public/manifest.json`) for installability

## Notes on this build

- **Map embed:** the "Beawar Map" component uses a real OpenStreetMap embed of the actual city coordinates (26.1011° N, 74.3197° E). It includes a graceful fallback if the embed can't load (e.g. restrictive network policies) — it will display normally on any standard hosting or local network.
- **Property art:** property cards use generated SVG illustrations (no stock photos) so the demo has zero external image dependencies. Swap in `property_images` from the schema once real photo uploads are wired up.
- **Logo:** `frontend/public/logo.svg` is a simplified, scalable circular version of the uploaded brand mark, plus generated PNGs at 32/180/512px for favicons and the PWA manifest.
