# ClearTrack

A website for a document-clearing business: attestation, visa support,
licence renewal, translation, Emirates ID and power of attorney services.
Built as a headless setup: WordPress.com holds the content and a Next.js
site renders it.

**Live site:** https://cleartrack-biizv04k0-karlinfrancis-4599s-projects.vercel.app/
**Mobile app:** https://expo.dev/accounts/karlinnn/projects/cleartrack/builds/405045c0-c6d8-4aea-a704-e44565de88ba 
**Video link(website):** https://www.boomshare.ai/shared/01M6C7QYY10Z3HK5E2AC89RRXQ
**Video link(app):** https://drive.google.com/file/d/1ei18g63nHBDH59crHK2ydzksodCs6NI5/view?usp=drive_link

## What it does

- Services pages fed by the WordPress REST API, with live search and filters
- Multi-step quote form with validation, a generated reference number and a review step
- Application tracker with a status timeline (demo data plus new quotes)
- SEO: per-page metadata, sitemap, robots and redirects from old WordPress URLs
- Accessible and responsive, with motion that respects reduced-motion settings
- Migration audit script that checks every migrated page (see below)

## Tech

Next.js (App Router), TypeScript, Tailwind CSS, WordPress.com REST API,
Vercel. [Add Expo / React Native once the app is built.]

## Run it locally

    git clone https://github.com/karlinnn/cleartrack.git
    cd cleartrack/web
    cp .env.example .env.local   # then set NEXT_PUBLIC_WP_API_URL
    npm install
    npm run dev

Environment variables:

| Name | Purpose |
|---|---|
| NEXT_PUBLIC_WP_API_URL : https://public-api.wordpress.com/wp/v2/sites/cleartrackdemo.wordpress.com | WordPress.com REST API base URL |
| NEXT_PUBLIC_SITE_URL: https://cleartrack-biizv04k0-karlinfrancis-4599s-projects.vercel.app/ | Public site URL, used for the sitemap and metadata |


## Known limits

- Track uses four demo applications plus quotes held in memory, which reset
  when the server restarts. Production would use a database, and a real
  tracker would need authentication or a secret token, because a reference
  number alone should not expose applicant details.
- The quote form logs submissions only. Production would send email and store the request.
- Privacy and Terms pages contain sample text.

## What I would build next

- Customer accounts and a dashboard
- Secure document upload with access control
- Email and WhatsApp notifications
- Payments and invoices
- Arabic and English with right-to-left layout
- Automated tests for the quote validation and checker logic


