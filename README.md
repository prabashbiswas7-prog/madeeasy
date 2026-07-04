# Made Easy — Setup Guide

A booking website for security guards, cleaners, cooks, drivers and other home/corporate staff.
Users sign up, save an address, pick a service, choose a date and time, and get handed off to
WhatsApp to finalise the booking with your team.

**Stack:** React + Vite · Firebase (Auth + Firestore) · GitHub · Cloudflare Pages

---

## 0. What's already built

- All pages from your brief: Home, About, Contact, Services (all + single service pages),
  Booking form, Pricing (comparison table), FAQs, Privacy Policy, Terms & Conditions.
- Email/password Sign up and Login (Firebase Auth).
- Address book + booking history under **My Account**.
- Booking flow that saves the request to Firestore, then hands off to WhatsApp with a
  pre-filled message containing all the booking details.
- Light/dark theme toggle, built entirely from CSS variables (see `src/index.css`) so you can
  re-theme the whole site by editing one file.
- No payment step — matches your brief. Deals are finalised over WhatsApp.

**Not included (say the word if you want these added later):**
- Admin dashboard (you asked to skip this for now — WhatsApp is your admin panel).
- Native mobile app (you said focus on the website first).
- Payments — add Razorpay later if you start taking payments on-site instead of over WhatsApp.

---

## 1. Install Node.js

You need Node.js 18 or newer. Check with:
```
node -v
```
If you don't have it, install from [nodejs.org](https://nodejs.org).

---

## 2. Run it locally

```bash
cd made-easy
npm install
cp .env.example .env
```

Open `.env` and fill in the Firebase values — you'll get these in Step 3 below. Leave it
half-filled for now if you just want to look at the UI; the site will load, but sign up/login and
bookings won't work until Firebase is connected.

```bash
npm run dev
```
Open the URL it prints (usually `http://localhost:5173`).

---

## 3. Set up Firebase

1. Go to [console.firebase.google.com](https://console.firebase.google.com) → **Add project** →
   name it (e.g. `made-easy`) → finish the wizard (Google Analytics is optional, skip it if unsure).
2. Inside the project: **Build → Authentication → Get started**. Under **Sign-in method**, enable
   **Email/Password**.
3. **Build → Firestore Database → Create database** → start in **Production mode** → pick a
   region close to your users (e.g. `asia-south1` for India).
4. Once created, go to the **Rules** tab in Firestore and paste in the contents of
   `firestore.rules` from this repo, then **Publish**. This makes sure users can only read and
   write their own data.
5. Go to **Project settings** (gear icon, top left) → scroll to **Your apps** → click the **Web**
   icon (`</>`) → register an app (any nickname) → you'll see a `firebaseConfig` object. Copy each
   value into your `.env` file:

   | Firebase config key | .env variable |
   |---|---|
   | apiKey | `VITE_FIREBASE_API_KEY` |
   | authDomain | `VITE_FIREBASE_AUTH_DOMAIN` |
   | projectId | `VITE_FIREBASE_PROJECT_ID` |
   | storageBucket | `VITE_FIREBASE_STORAGE_BUCKET` |
   | messagingSenderId | `VITE_FIREBASE_MESSAGING_SENDER_ID` |
   | appId | `VITE_FIREBASE_APP_ID` |

6. Also set `VITE_WHATSAPP_NUMBER` in `.env` — this is the number bookings get sent to. Use the
   full number with country code and no `+`, spaces or dashes, e.g. `919876543210`.

Restart `npm run dev` after editing `.env`.

---

## 4. Push the code to GitHub

```bash
cd made-easy
git init
git add .
git commit -m "Initial commit: Made Easy website"
```

Create a new empty repository on GitHub (don't initialise it with a README), then:
```bash
git remote add origin https://github.com/<your-username>/made-easy.git
git branch -M main
git push -u origin main
```

Your `.env` file is already excluded via `.gitignore` — never commit it. You'll re-enter these
values directly in Cloudflare Pages in the next step.

---

## 5. Deploy on Cloudflare Pages

1. Go to the [Cloudflare dashboard](https://dash.cloudflare.com) → **Workers & Pages** →
   **Create application** → **Pages** → **Connect to Git**.
2. Pick the `made-easy` GitHub repo you just pushed.
3. Build settings:
   - **Framework preset:** Vite
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. Before deploying, click **Environment variables** and add every `VITE_...` key from your
   `.env` file with the same values (Cloudflare needs these at build time, since Vite bakes them
   into the bundle).
5. Click **Save and Deploy**. First build takes a couple of minutes.
6. You'll get a `made-easy.pages.dev` URL. To use your own domain, go to the Pages project →
   **Custom domains** → add it and follow the DNS instructions (works well if the domain is
   already on Cloudflare).

Every time you `git push` to `main`, Cloudflare rebuilds and redeploys automatically.

**Note on SPA routing:** this repo includes `public/_redirects` with `/* /index.html 200` so
that refreshing a page like `/services/security-guard` doesn't 404 on Cloudflare Pages. This is
already set up — no action needed, just don't delete that file.

---

## 6. Firestore data shape (for reference / Jules prompts later)

```
users/{uid}
  name, email, phone
  addresses: [{ label, line1, line2, city, state, pincode }]
  createdAt

bookings/{bookingId}
  uid, serviceSlug, serviceName, subService
  name, phone, address, date, time, frequency, notes
  status: "pending_whatsapp"
  createdAt
```

Bookings are written by the signed-in user and never edited from the website — since there's no
admin dashboard yet, treat WhatsApp as the source of truth for status changes (confirmed,
completed, cancelled). If you want a dashboard later, this collection is already shaped to
support one.

---

## 7. Editing content

- **Services, pricing, sub-service options:** `src/data/services.js` — add a new object to add a
  new service everywhere (list, detail page, booking dropdown) at once.
- **Pricing table tiers/features:** `src/data/pricing.js`
- **FAQs:** `src/data/faqs.js`
- **Colors, fonts, spacing:** `src/index.css` — every color used across the site is a CSS
  variable defined once here (and its dark-theme override right below it). Change
  `--color-primary` and it updates buttons, links, and accents everywhere.
- **WhatsApp message format:** `src/utils/whatsapp.js`

---

## 8. Suggested next steps (not built yet)

- Add your real logo — swap `public/logo.svg` and `public/favicon.svg`.
- Fill in the `[bracketed]` placeholders in the Privacy Policy and Terms pages, and get both
  reviewed by a lawyer before launch — the current text is a starting template, not legal advice.
- Google/Facebook login — Firebase Auth supports this in a couple of extra lines if email/password
  alone isn't enough.
- An admin view (even a simple internal page reading the `bookings` collection) once you outgrow
  managing everything from WhatsApp chat.
- Analytics (Cloudflare Web Analytics is free and privacy-friendly, or Firebase Analytics if you
  already enabled it).
