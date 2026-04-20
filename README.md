# Chhetrapal Secondary School Website

Production-ready school website built with Next.js (App Router) and integrated with a local WordPress CMS powered by WordPress Playground.

## What This Project Includes

- Public-facing school website (home, about, academics, admissions, gallery, notices, contact)
- CMS-managed content through WordPress admin
- Same-origin WordPress proxy routes through Next.js
- Responsive UI with reusable components
- Fallback content when CMS is temporarily unavailable

## Actual Tech Stack

### Frontend

- Next.js 16 (App Router)
- React 19
- TypeScript 5
- Tailwind CSS 4
- Lucide React icons
- shadcn-style component setup

### CMS and Content

- WordPress (local) via @wp-playground/cli
- Custom WordPress plugin:
	- Custom post types (notices, staff, programs, facilities, downloads, gallery, contact)
	- Taxonomies and metadata fields
	- Custom REST endpoint for homepage payload

### Tooling

- ESLint 9 with eslint-config-next
- PostCSS with @tailwindcss/postcss
- concurrently for running frontend + CMS together

## Repository Structure

```text
.
|- src/
|  |- app/                 # Next.js routes and page sections
|  |- components/          # Shared UI components
|  |- lib/wordpress.ts     # WordPress fetch + fallback handling
|- wordpress/
|  |- setup.blueprint.json # Playground bootstrapping and admin seed
|- wordpress-plugin/
|  |- chhetrapal-school-cms.php # Custom CMS logic
|- next.config.ts          # Rewrite proxy for /wp-admin, /wp-json, and assets
|- package.json            # Scripts and dependencies
```

## Prerequisites

- Node.js 20+
- npm 10+

## Quick Start

1. Install dependencies.

```bash
npm install
```

2. Start frontend and CMS together.

```bash
npm run dev:full
```

3. Open the website.

```text
http://localhost:3000
```

4. Open WordPress admin (proxied through Next.js).

```text
http://localhost:3000/wp-admin/
```

5. Default local admin credentials.

```text
Username: schooladmin
Password: SchoolAdmin@12345!
```

## Available Scripts

- `npm run dev` - Start only Next.js frontend
- `npm run wp:start` - Start only WordPress Playground server on port 9400
- `npm run dev:full` - Start frontend + WordPress together
- `npm run build` - Production build
- `npm run start` - Run production server
- `npm run lint` - Run ESLint

## Frontend <-> WordPress Integration

The integration works through two layers:

1. Next.js rewrites in next.config.ts proxy WordPress paths to http://127.0.0.1:9400
2. Frontend requests content from proxied routes, primarily:
	 - `/wp-json/chhetrapal/v1/homepage`
	 - `/wp-json/wp/v2/...` fallback APIs

This keeps CMS and frontend on one browser origin (localhost:3000) while WordPress runs internally on port 9400.

## Environment Variables (Optional)

The frontend supports optional overrides for WordPress endpoints:

- `WORDPRESS_INTERNAL_ORIGIN`
- `NEXT_PUBLIC_WORDPRESS_ORIGIN`
- `NEXT_PUBLIC_WORDPRESS_API_BASE`
- `NEXT_PUBLIC_WORDPRESS_HOMEPAGE_API`

If not set, defaults in src/lib/wordpress.ts are used.

## Content Model (WordPress)

Custom content is managed in the plugin under the following sections:

- Notices
- Staff and Principal
- Programs
- Facilities
- Downloads
- Contacts
- Gallery Items

These are aggregated into a homepage payload consumed by the Next.js frontend.

## Publishing Workflow for School Staff

1. Log in to WordPress admin.
2. Create or edit content in the relevant content type.
3. Add title, body, taxonomy terms, and featured image.
4. Preview and publish.
5. Refresh frontend pages to verify updates.

## Build and Production Run

```bash
npm run build
npm run start
```

## Troubleshooting

- First CMS startup can take 1-2 minutes.
- If CMS is down, the frontend uses fallback content from src/lib/wordpress.ts.
- If /wp-admin or /wp-json does not load, ensure wp:start is running and port 9400 is free.
- On Windows, transient file-lock warnings may appear during Playground startup; retry if needed.

## Contributing

1. Create a feature branch.
2. Keep changes scoped and tested locally.
3. Run lint and build before opening a PR.
4. Include screenshots for UI changes.

## Contributors

<a href="https://github.com/rishavdevtiwari/chhetrapal-website/graphs/contributors">
	<img src="https://contrib.rocks/image?repo=rishavdevtiwari/chhetrapal-website" alt="Contributors" />
</a>

## Team Members

- Kunjang
- Rishav
- Rijin
- Rubina
- Suchit
- Sharad
