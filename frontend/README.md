# Fintrack frontend

Responsive React app for the Fintrack Spring Boot API. The public home page at `/` introduces the product with a responsive bento feature grid and clear sign-up links. It includes Zod-validated React Hook Form auth and expense flows, email/password and Google sign-in, email verification, expense management, Recharts spending insights, spring animations, and persistent light/dark green themes. Routed screens live in `src/pages`, reusable UI lives in `src/components`, and hooks and helpers live in `src/lib`.

## Run locally

```sh
npm install
npm run dev
```

By default, Vite proxies `/api/v1` requests to `http://localhost:8000`, matching the backend's port and context path. Set `VITE_API_URL` to an absolute API base URL when connecting to a deployed backend.

The backend must be running with its database and mail settings configured. Set `FRONTEND_URL` to the frontend's exact origin (for local development, `http://localhost:5173`) so backend CORS permits API requests and OAuth can redirect back to the app. Google sign-in also requires valid `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` values and a matching Google OAuth redirect URI for the backend's `/api/v1/login/oauth2/code/google` callback.

## Checks

```sh
npm run lint
npm run build
```
