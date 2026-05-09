# Setup and Handover Guide

This document is the working handover guide for anyone hosting, maintaining, or editing the Chhetrapal Secondary School website.

## 1. What this project is

The project has two parts:

- A public frontend built with Next.js
- A WordPress CMS that stores the school content, media, notices, downloads, alumni entries, and contact data

The frontend reads content from WordPress. The public site should not expose WordPress admin details to visitors.

## 2. What you need before hosting

Collect these items before deployment:

- A domain name or subdomain for the public site
- A hosting plan for the frontend that supports Node.js or a VPS
- A WordPress hosting environment with PHP and MySQL
- A MySQL database name, username, password, and database host
- WordPress admin credentials
- SMTP credentials if email forms must send mail reliably
- Google Maps embed URL for the contact page
- Social media URLs for the footer and header
- Media files for notices, gallery, alumni, and downloads

## 3. Where to obtain each item

- Domain and DNS: buy from any registrar or use an existing school domain
- Node hosting: Vercel, Netlify, a VPS, or cPanel only if Node apps are supported
- WordPress hosting: cPanel, managed WordPress hosting, or a VPS with PHP and MySQL
- Database details: create them in cPanel or ask the hosting provider
- WordPress admin: create during installation or reset from the hosting panel
- SMTP credentials: from the mail provider or domain hosting email service
- Maps embed URL: from Google Maps -> Share -> Embed a map
- Social links: from the school's official social accounts

## 4. Recommended production layout

Use this split in production:

- WordPress stores content and media
- Next.js serves the public website
- The frontend connects to WordPress over HTTP or HTTPS

Do not use WordPress Playground in production. Playground is for local development only.

## 5. Docker handoff setup

If you are handing over the code to another developer, the easiest local environment is Docker.

### Start the stack

```bash
docker compose up --build
```

### Services

- Frontend: `http://localhost:3000`
- WordPress admin: `http://localhost:8080`
- MySQL: internal Docker network only

### Important Docker rules

- Keep the database volume mounted
- Keep the WordPress volume mounted
- Do not delete the Docker volumes unless you want to reset the site
- The CMS seed is locked after first bootstrap, so restarting containers will not re-import sample content

### Useful checks

- Open the frontend and confirm the homepage loads
- Open `/wp-admin` and confirm the CMS is accessible
- Add or edit a notice in WordPress and refresh the frontend
- Restart the stack and confirm the same content is still there

## 6. Local development setup

### Frontend

```bash
npm install
npm run dev
```

### WordPress Playground for local CMS testing

```bash
npm run wp:start
```

This is only for local development and demo resets. It is not the production CMS.

## 7. WordPress first-time setup

If the site is being installed on a fresh WordPress database:

1. Install WordPress.
2. Create or import the database.
3. Activate the `Chhetrapal School CMS` plugin.
4. Confirm the custom post types appear in WordPress admin.
5. Create the first real school content.
6. Set the featured images for notices, alumni, gallery, and staff posts.
7. Add download file URLs for documents and forms.

The starter content is only inserted once. After that, restarts will not replace your real content.

## 8. Environment variables

### Frontend

- `WORDPRESS_INTERNAL_ORIGIN`: internal WordPress URL used by the server
- `NEXT_PUBLIC_WORDPRESS_ORIGIN`: browser-visible WordPress URL
- `NEXT_PUBLIC_WORDPRESS_API_BASE`: WordPress REST base path
- `NEXT_PUBLIC_WORDPRESS_HOMEPAGE_API`: custom homepage payload endpoint
- `CHHETRAPAL_INTERNAL_TOKEN`: shared token between frontend and WordPress

### WordPress

- `CHHETRAPAL_FRONTEND_URL`: public frontend URL used for redirects
- `CHHETRAPAL_INTERNAL_TOKEN`: must match the frontend token

## 9. Hosting on cPanel

If WordPress is hosted in cPanel:

1. Create a database and database user.
2. Install WordPress in the target domain or subdomain.
3. Upload the plugin to `wp-content/plugins/chhetrapal-school-cms`.
4. Activate the plugin.
5. Set the WordPress site URL and home URL correctly.
6. Configure permalinks.
7. Upload media and create content.

If the frontend is also hosted in cPanel, the plan must support Node.js. If it does not, use a VPS or a platform such as Vercel for the frontend.

## 10. Content ownership model

The WordPress CMS is the source of truth.

Editors should update content only in WordPress for:

- Notices
- Notice attachments and images
- Staff and principal profiles
- Programs and academic info
- Facilities
- Downloads
- Gallery items
- Alumni profiles
- Contact details

After publishing in WordPress, the frontend should reflect the change automatically after refresh or cache revalidation.

## 11. Backup and restore

Before any upgrade or content migration:

- Export the WordPress database
- Back up the `wp-content/uploads` folder
- Back up installed plugins and theme files
- Keep a copy of this repository

To restore:

1. Restore the database.
2. Restore the uploads folder.
3. Reinstall or re-enable the custom plugin.
4. Recheck the WordPress admin content types.
5. Confirm the frontend can read the CMS data.

## 12. What the next maintainer should edit

- WordPress content in the admin dashboard
- Environment variables for domain changes
- Docker compose values for local handoff
- Next.js pages only when the public layout or data mapping changes

Do not edit the public site by hardcoding new school content into the frontend unless it is a shared fallback.

## 13. Verification checklist

After any deployment or restart, confirm:

- The homepage loads
- Notices show the latest WordPress content
- Alumni content appears on the frontend
- Downloads still work
- Notice images still render
- `/wp-admin` is reachable
- The frontend does not expose WordPress branding to visitors
- Restarting the server does not re-import sample data

## 14. Support notes

If something looks wrong:

- Check the WordPress database first
- Check the WordPress plugin activation status
- Check the environment variables
- Check the Docker volumes
- Check the frontend build logs

If the site is moving to a new host, export the database and uploads before switching DNS.
