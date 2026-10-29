# Google Search Console & SEO Submission Guide
## Getting THRIVE Initiative Indexed and Ranked on Google

This guide details how to verify domain ownership with Google and submit your sitemap so Google's web crawlers index all pages of `https://www.thriveinitiativeafrica.com`.

---

## 1. Automated SEO Features Already Built Into the Website

* **Dynamic XML Sitemap:** Automatically generated at `https://www.thriveinitiativeafrica.com/sitemap.xml`. Every time a new article is published or updated in `/admin`, the sitemap reflects it immediately.
* **Robots.txt:** Configured at `https://www.thriveinitiativeafrica.com/robots.txt` instructing Googlebot to crawl all public pages while protecting private admin endpoints.
* **Semantic Schema.org Structured Data:** JSON-LD structured data is embedded on the Homepage (`Organization`) and Blog article pages (`Article`, `author`, `datePublished`, `publisher`).
* **OpenGraph & Twitter Card Metadata:** Configured on every route with titles, descriptions, and shareable preview images.

---

## 2. Step-by-Step Google Search Console Verification

### Step 1: Open Google Search Console
1. Go to [https://search.google.com/search-console](https://search.google.com/search-console).
2. Sign in with your Google account (`thriveinitiative.nig@gmail.com`).
3. Click **Add property** (top-left dropdown).

### Step 2: Choose Property Type
Google will present two options:
* **Option A: Domain (Recommended)**
  * Enter: `thriveinitiativeafrica.com` (without `https://` or `www`).
  * Click **Continue**.
  * Google will provide a **TXT verification record** (for example: `google-site-verification=abcdef123456...`).
  * Copy this value.
* **Option B: URL Prefix**
  * Enter: `https://www.thriveinitiativeafrica.com`.
  * Google provides an HTML tag or HTML file.

### Step 3: Add the DNS TXT Record in Cloudflare
*(If you completed the Cloudflare DNS setup from the Email guide)*:
1. Open your [Cloudflare Dashboard](https://dash.cloudflare.com/) → click **`thriveinitiativeafrica.com`** → **DNS** → **Records**.
2. Click **Add record**:
   * **Type:** `TXT`
   * **Name:** `@`
   * **Content:** Paste the `google-site-verification=...` string from Google.
   * **TTL:** Auto
3. Click **Save**.
4. Return to Google Search Console and click **Verify**.
5. Once verified, click **Go to property**.

---

## 3. Submit Your Sitemap to Google

1. In the left navigation menu of Google Search Console, click **Sitemaps** (under the "Indexing" section).
2. Under **Add a new sitemap**, you will see:
   ```text
   https://www.thriveinitiativeafrica.com/
   ```
3. Type:
   ```text
   sitemap.xml
   ```
4. Click **Submit**.
5. Google will display **"Sitemap submitted successfully"** with status **Success**. Google will begin crawling and indexing your pages within 24 to 72 hours.

---

## 4. Request Immediate Indexing for Priority Pages

To speed up initial appearance in search results:
1. In the top search bar of Search Console ("Inspect any URL in..."), paste your homepage:
   ```text
   https://www.thriveinitiativeafrica.com
   ```
2. Press **Enter**.
3. Click **Request Indexing**.
4. Repeat for key landing pages (such as `/programs` and `/about/story`).
