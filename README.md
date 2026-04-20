# Chhetrapal Government School Website

## Overview
This project is a responsive website developed for **Chhetrapal Government School**. It provides essential information about the school, including academics, notices, events, and contact details for students, parents, and staff.

The website is built using **HTML, CSS, and JavaScript**, focusing on simplicity, accessibility, and user-friendly design.

---

## Objectives
- Provide school information online  
- Share notices and announcements  
- Display academic and administrative details  
- Improve communication between school and community  

---

## Features
-  Home page with school introduction  
-  Notice/Announcement section  
-  Academic information (classes, faculty, routine)  
-  Gallery for school events and activities  
-  Contact page with school details  
-  Fully responsive design (mobile-friendly)  

---

## Tech Stack

### 🔹 HTML
- Provides the structure of the website  
- Includes pages like Home, About, Contact, Gallery  

### 🔹 CSS
- Handles styling and layout  
- Uses Flexbox/Grid for responsiveness  
- Ensures clean and modern UI  

### 🔹 JavaScript
- Adds interactivity  
- Handles navigation menu, form validation, and dynamic behavior  

---

## WordPress CMS (Local Setup)

This project includes a local WordPress CMS setup using WordPress Playground.

1. Install dependencies:
	npm install
2. Start frontend + CMS together:
	npm run dev:full
3. Open browser at (same origin as frontend):
	http://localhost:3000/wp-admin/
	(or alias: http://localhost:3000/admin)
4. Login using:
	Username: schooladmin
	Password: SchoolAdmin@12345!

Notes:
- WordPress still runs internally on port 9400, but it is proxied through Next.js so you can use one origin (`localhost:3000`) for both frontend and CMS.
- If you want to run services separately, use `npm run dev` and `npm run wp:start`.

## Frontend <-> WordPress Connection

1. Copy env file:
	copy .env.local.example .env.local
2. Start Next.js frontend:
	npm run dev
3. The homepage now fetches CMS content through same-origin routes (`/wp-json/...`) so frontend and CMS stay connected.

Content flow:
- Add or edit posts in WordPress admin.
- Frontend reads latest posts from /wp-json/wp/v2/posts.
- If WordPress is unavailable, homepage falls back to local placeholder data.

## WordPress Content Map

- Notices -> `Notices`
- Principal Message -> `Staff & Principal`
- Programs -> `Programs`
- Facilities -> `Facilities`
- Downloads -> `Downloads`
- Contact -> `Contacts`
- Gallery -> `Gallery Items`

## Admin Workflow

1. Create a draft in the correct menu.
2. Add title, body text, and featured image.
3. Pick the right taxonomy term like role, level, or album.
4. Use Preview to review the frontend.
5. Publish when the content looks correct.

Notes:
- First startup can take 1-2 minutes while WordPress initializes.
- You may see Windows file-lock warnings in terminal; WordPress still boots successfully.
- This setup does not require Docker, MySQL, or XAMPP.

---

## Contributors

This project automatically includes contributors from GitHub along with manually added team members.

## Contributors

<a href="https://github.com/rishavdevtiwari/chhetrapal-website/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=rishavdevtiwari/chhetrapal-website" />
</a>

## Team Members

<p align="center">
  <img src="https://ui-avatars.com/api/?name=Kunjang&size=100" title="Kunjang" style="border-radius:50%;" />
  <img src="https://ui-avatars.com/api/?name=Rishav&size=100" title="Rishav" style="border-radius:50%;" />
  <img src="https://ui-avatars.com/api/?name=Rubina&size=100" title="Rubina" style="border-radius:50%;" />
  <img src="https://ui-avatars.com/api/?name=Suchit&size=100" title="Suchit" style="border-radius:50%;" />
</p>

---