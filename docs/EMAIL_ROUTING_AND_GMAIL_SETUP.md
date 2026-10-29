# Official Email Setup Guide: hello@thriveinitiativeafrica.com
## Cloudflare Email Routing + Sending from Gmail (Free & Reliable)

This guide walks you step-by-step through setting up **`hello@thriveinitiativeafrica.com`** so that:
1. Anyone emailing `hello@thriveinitiativeafrica.com` is automatically delivered to your Gmail inbox (**`thriveinitiative.nig@gmail.com`**).
2. You can compose and reply to emails directly inside Gmail using **`hello@thriveinitiativeafrica.com`** as your official sender address.

---

## Architecture Overview

* **Domain Registrar:** Hostinger
* **DNS & Inbound Email Routing:** Cloudflare (Free)
* **Website Hosting:** Vercel (Uninterrupted)
* **Email Inbox & Outbound Sending:** Gmail (`thriveinitiative.nig@gmail.com`)

---

## Step 1: Add Your Domain to Cloudflare

1. Log in to [Cloudflare](https://dash.cloudflare.com/) (create a free account if you don't have one).
2. Click **Add a site** → enter `thriveinitiativeafrica.com` → select the **Free Plan**.
3. Cloudflare will scan your existing DNS records. Ensure these two website records for Vercel are present:
   * **Record 1 (Apex):**
     * **Type:** `A`
     * **Name:** `@` (or `thriveinitiativeafrica.com`)
     * **IPv4 address:** `76.76.21.21`
     * **Proxy status:** DNS only (Grey cloud)
   * **Record 2 (WWW):**
     * **Type:** `CNAME`
     * **Name:** `www`
     * **Target:** `cname.vercel-dns.com`
     * **Proxy status:** DNS only (Grey cloud)
4. Click **Continue**. Cloudflare will display **two assigned nameservers** (for example: `ada.ns.cloudflare.com` and `eric.ns.cloudflare.com`). Keep this page open.

---

## Step 2: Update Nameservers in Hostinger

1. Open your **Hostinger Dashboard** → **Domains** → click **`thriveinitiativeafrica.com`**.
2. Look for **DNS / Nameservers** (currently showing `ns1.vercel-dns.com` and `ns2.vercel-dns.com`).
3. Click **Edit** (or **Change Nameservers**).
4. Select **Change to custom nameservers** and replace the Vercel nameservers with the **two Cloudflare nameservers** from Step 1.
5. Click **Save**. Nameserver updates usually take between 5 to 30 minutes to propagate.
6. In Cloudflare, click **Check nameservers now**. Once confirmed, Cloudflare will display an **Active** badge.

---

## Step 3: Enable Inbound Email Routing in Cloudflare

1. In the Cloudflare dashboard for `thriveinitiativeafrica.com`, navigate to the left menu: **Email** → **Email Routing**.
2. Click **Get started**.
3. **Set Destination address:** Enter `thriveinitiative.nig@gmail.com`.
4. Cloudflare will send a confirmation email to `thriveinitiative.nig@gmail.com`. Open Gmail and click **Verify email address**.
5. **Create Custom address:**
   * Custom address: `hello` (to make `hello@thriveinitiativeafrica.com`)
   * Action: **Send to**
   * Destination: `thriveinitiative.nig@gmail.com`
6. Click **Save** and click **Add records automatically**. Cloudflare will automatically insert the necessary MX and TXT (SPF) records into your DNS.

*At this stage, any email sent to `hello@thriveinitiativeafrica.com` will arrive in your Gmail inbox.*

---

## Step 4: Configure Gmail to Send Emails as hello@thriveinitiativeafrica.com

To send emails from Gmail with your custom address, Gmail requires an outbound SMTP server. The simplest and free method is using **Google's SMTP with an App Password**:

### Part A: Generate a Google App Password
1. Go to your Google Account security settings: [https://myaccount.google.com/security](https://myaccount.google.com/security) (make sure you are logged in as `thriveinitiative.nig@gmail.com`).
2. Ensure **2-Step Verification** is turned **ON**.
3. In the search bar at the top of your Google Account page, search for **App passwords** (or go to [https://myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)).
4. Enter an App name: `THRIVE Website Mail` → click **Create**.
5. Google will generate a **16-character password** (for example: `abcd efgh ijkl mnop`). Copy this 16-character code (you will need it in the next step).

### Part B: Add the Address in Gmail Settings
1. Open **Gmail** (`thriveinitiative.nig@gmail.com`).
2. Click the **Gear icon (Settings)** at the top right → click **See all settings**.
3. Click the **Accounts and Import** tab.
4. Scroll to the **Send mail as:** section and click **Add another email address**.
5. A pop-up window will appear:
   * **Name:** `THRIVE Initiative`
   * **Email address:** `hello@thriveinitiativeafrica.com`
   * **Treat as an alias:** Checked (Yes)
   * Click **Next Step**.
6. Enter the Outbound SMTP server settings:
   * **SMTP Server:** `smtp.gmail.com`
   * **Port:** `587`
   * **Username:** `thriveinitiative.nig@gmail.com`
   * **Password:** Paste the **16-character App Password** you copied in Part A (remove any spaces).
   * **Secured connection using:** `TLS (recommended)`
7. Click **Add Account**.
8. Gmail will send a confirmation code to `hello@thriveinitiativeafrica.com` (which forwards to your Gmail inbox). Check your inbox for the code, paste it into the box, and click **Verify**.

---

## Step 5: Prevent Emails from Landing in Spam (SPF Alignment)

In your **Cloudflare Dashboard** → **DNS** → **Records**, look for the TXT record that starts with `v=spf1`.

Update it to authorize Google servers as well:

```text
v=spf1 include:_spf.mx.cloudflare.net include:_spf.google.com ~all
```

---

## How to Send an Email

When composing an email in Gmail:
1. Click **Compose**.
2. Click on the **From** field.
3. Select **`THRIVE Initiative <hello@thriveinitiativeafrica.com>`** from the dropdown.
4. Your recipient will see the email coming directly from **`hello@thriveinitiativeafrica.com`**.
