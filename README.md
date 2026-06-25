# Student Housing Platform — Frontend

A React (Create React App) front-end for a student housing platform. Students
browse and book listings, owners publish and manage their own listings, and
admins approve owners and moderate all listings.

## ✨ Features

- Email/password authentication with role-based redirects (student / owner / admin)
- Owner sign-up flow with an admin-approval waiting screen
- Listing CRUD for owners and admins (create, edit, delete)
- Student booking flow with pending / paid / cancelled status tracking
- Admin dashboard: manage users, manage listings (with search), approve/reject pending owners
- Shared design system (CSS variables, reusable buttons/cards/badges/forms) and a
  role-aware navigation bar across every authenticated page

## 🗂 Project structure

```
src/
├── api.js                 # Central API base URL (reads REACT_APP_API_URL)
├── App.js                 # Route definitions
├── Login.js / WaitingApproval.js / Dashboard.js / Listings.js ...
├── admin/                 # Admin-only pages
├── user/                  # Student/owner pages (browse listings, bookings)
├── components/            # Shared UI: Navbar, Loading, EmptyState
└── styles/main.css        # Design system (colors, buttons, cards, forms, tables...)
```

## 🚀 Getting started

```bash
npm install
npm start          # runs on http://localhost:3000
```

This app expects a backend API. By default it talks to `http://localhost:5000`.
To point it at a different backend, create a `.env` file in this folder:

```
REACT_APP_API_URL=https://your-api-domain.com
```

## 📦 Available scripts

| Command          | Description                          |
| ----------------- | ------------------------------------- |
| `npm start`        | Run the app in development mode       |
| `npm test`         | Run the test suite                    |
| `npm run build`     | Create an optimized production build  |

## 🔌 Backend

This repository currently only contains the frontend. The pages call a REST
API (`/api/login`, `/api/register`, `/api/listings`, `/api/bookings`,
`/api/admin/*`, ...) — pair it with your own backend implementing those
routes, or set `REACT_APP_API_URL` to point at an existing one.
