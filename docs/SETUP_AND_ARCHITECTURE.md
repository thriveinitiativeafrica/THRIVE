# THRIVE Initiative Website — Setup & Architecture Guide

This document explains the full architecture, services, credentials, and deployment workflow for the THRIVE Initiative website (`https://www.thriveinitiativeafrica.com`).

---

## 1. System Overview & Tech Stack

* **Framework:** Next.js 15 (App Router, Server Components, ISR & Dynamic Rendering)
* **Styling:** Tailwind CSS with custom editorial brand tokens:
  * Brand Deep Purple: `#2E1650`
  * Brand Warm Gold: `#D4A017` / `#E5B83B`
  * Brand Warm Cream: `#FAF6EC`
  * Accent Purple: `#5C165E`
* **Hosting & CDN:** Vercel (Production branch: `main`)
* **Primary Database:** Supabase Postgres (Managed PostgreSQL with Transaction Connection Pooling)
* **Image & Media Storage:** Supabase Storage (Public bucket: `blog-images`) with automatic WebP compression via `sharp`
* **Admin Portal:** Custom lightweight editorial workstation at `/admin` (session cookies, protected API endpoints, no heavy third-party CMS required)

---

## 2. Supabase Setup Details

### Project Info
* **Organization:** `THRIVE` (`ralltjukdsbyfnvsrvoj`)
* **Project Name:** `thrive-initiative`
* **Project Reference:** `rpkrggisiamjzdmkerql`
* **Region:** `eu-west-1` (Ireland, Europe)
* **Dashboard URL:** `https://supabase.com/dashboard/project/rpkrggisiamjzdmkerql`

### Database Architecture
Connected via the universal `postgres` driver (`postgres-js`) and Drizzle ORM. Configured with `prepare: false` to be 100% compatible with Supabase's transaction pooler (port 6543).

The app features **zero-maintenance auto-migration** (`ensureTables()` in `db/index.ts`): the first time any database query runs, it automatically executes:

```sql
CREATE TABLE IF NOT EXISTS posts (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  body TEXT NOT NULL,
  cover_image_url TEXT,
  cover_image_alt TEXT,
  cover_images TEXT,
  author TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft',
  published_at TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  seo_title TEXT,
  seo_description TEXT
);

CREATE TABLE IF NOT EXISTS contact_messages (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
```

### Storage Setup
* **Bucket Name:** `blog-images` (Public)
* **Auto-Creation:** Handled automatically in `app/api/upload/route.ts` if missing.
* **Compression:** Every uploaded image is automatically resized (max 1600px) and converted into high-efficiency WebP format before being uploaded. This ensures Supabase's free 1 GB tier accommodates up to 10,000 blog photos.

---

## 3. Vercel Environment Variables

Set these in **Vercel → THRIVE Project → Settings → Environment Variables**:

| Variable Name | Production Value | Purpose |
| :--- | :--- | :--- |
| `DATABASE_URL` | `postgresql://postgres.rpkrggisiamjzdmkerql:ThriveAbuja2026DbPass99@aws-0-eu-west-1.pooler.supabase.com:6543/postgres` | Connects Next.js to the Supabase Postgres Database |
| `SUPABASE_URL` | `https://rpkrggisiamjzdmkerql.supabase.co` | Supabase API endpoint |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` | Admin key for uploading to Supabase Storage |
| `SUPABASE_STORAGE_BUCKET` | `blog-images` | Name of the public storage bucket |
| `ADMIN_PASSWORD` | `admin123` *(or your chosen password)* | Password to log in to `/admin` |
| `SESSION_SECRET` | `thrive_abuja_production_secret_2026_9f8a7b6c` | Secret used to sign admin session cookies |
| `NEXT_PUBLIC_SITE_URL` | `https://www.thriveinitiativeafrica.com` | Base URL used for OpenGraph images and canonical URLs |

---

## 4. How the Admin Editorial Portal Works

* **Login URL:** `https://www.thriveinitiativeafrica.com/admin`
* **Features:**
  * **Visual Rich-Text Editor:** Natural language writing surface with headings, bold, italics, underline, lists, quotes, dividers, and inline images.
  * **Direct Google Docs Paste:** Writers can copy an article from Google Docs and paste directly with `Ctrl+V`. Headings, bullet points, links, and bold text are preserved while Google Docs background clutter is stripped.
  * **Multi-Cover Carousel:** Upload one or multiple cover photos for an article. The first image displays on the blog listing card, and all uploaded photos turn into an interactive carousel on the article page.
  * **Publish / Draft Toggle:** Allows creating draft stories that are only visible when logged in to `/admin`.

---

## 5. Deployment Workflow

1. All project code lives in the GitHub repository: `github.com/thriveinitiativeafrica/THRIVE`.
2. When changes are pushed to the `main` branch, Vercel automatically runs `npm run build` and deploys the update within 60 seconds.
3. Every page revalidates automatically when a new post is published in the Admin portal.
