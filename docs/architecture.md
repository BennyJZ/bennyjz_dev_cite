# Architecture and next steps

This is an incremental cleanup, not a claim that the application is production ready. The existing React components, Express routes, SQL models, endpoint names, and database schema remain familiar.

## Current module boundaries

- `backend/server.js` starts the HTTP listener. Run `npm start` or `npm run dev` from `backend`.
- `backend/app.js` assembles middleware, authentication, routes, static frontend hosting, and error handling. Importing it does not start a server.
- `backend/config/env.js` loads the root `.env` relative to its own location. Both the app and database connection import this module; ES modules run it once per process.
- `backend/routes` handles HTTP requests and responses; `backend/models` contains database queries. Keep SQL in models rather than adding it to routes.
- `frontend/src/api/config.js` owns the backend base URL. Existing components still use `fetch` directly to keep this change small.
- `frontend/src/api/authCheck.js` exports the authentication request without making a request during import. `frontend/index.js` preserves its old `baseurl` export using the shared configuration.
- Vite's `@` alias now points to `frontend/src`. Browser imports use `@/api/...`.
- `frontend/src/components/Home/sections.js` supplies section labels to Home and its page map. The hero no longer reads rendered DOM elements into state to discover navigation labels.
- `frontend/utils/resize.js` now accepts a callback and returns listener cleanup. It remains unused; components keep their existing resize handlers.

## Configuration and checks

Keep secrets in the root `.env`: `SESSION_SECRET`, `PORT`, `FRONTEND`, `PG_HOST`, `PG_USER`, `PG_DB`, and `PG_PASS`. The app checks for a session secret; the server defaults to port 3000 and validates the configured port. `FRONTEND` must match the browser origin exactly when using credentialed requests.

The frontend reads `VITE_BASEURL` from `frontend/.env`. An empty value uses the frontend's origin, suitable when Express serves the frontend build. Separate Vite development hosting requires the backend URL. Restart Vite after changing this value. Never place secrets in `VITE_` variables.

From `frontend`, run `npm run lint` and `npm run build`. From `backend`, run `npm test`. The backend smoke test uses a temporary port and exercises ping, unauthenticated auth checking, CORS response headers, unknown API routes, password-update access control, and the unfinished comments response. It does not query or modify the database. Database-backed operations and browser flows still need integration testing.

## Small behavior fixes included

- Password updates call `/auth/updateuser`, inspect the actual response, await password storage, and check authentication once on mount. Passwords are no longer logged.
- Registration sends a single JSON response instead of combining a redirect with JSON.
- Project creation completes its response after saving.
- Unknown `/api` and `/auth` endpoints return JSON 404s instead of the React page. Errors return JSON without exposing server internals.
- Removed the authentication request made merely by importing the auth module and the unused request in Home.
- Comments remain a prototype: sample comments still display, the submit button is disabled, and the unfinished backend endpoint returns 501 instead of leaving the request open. The frontend no longer mistakenly calls the likes endpoint when submitting a comment.
- Removed unused state and corrected lint errors without disabling lint rules.

## Larger changes for you to implement

These are intentionally deferred because they change application behavior or need coordinated work.

1. **Authorization and validation — first priority before exposing write endpoints.** Public registration currently accepts the submitted role, including privileged roles; experience and project creation lack access checks. Decide which operations each role may perform. Assign a safe role on the server during public registration, apply the existing `requireAuth` middleware to protected writes, and validate request bodies and uploads before calling models. Test allowed and forbidden requests for each role. The image-serving endpoint also needs its allowed file root restricted, and upload handling needs file-size/type rules.
2. **Shared authentication and API functions.** ActivityIcon, project cards, and other components independently check authentication. Add an AuthProvider that loads the current user once and exposes login/logout refresh methods. Then move component fetch functions into `src/api/auth.js`, `projects.js`, and `experience.js`, with consistent HTTP error handling. Migrate one screen at a time; avoid mixing this with a folder-wide component rename.
3. **Complete comments as one feature.** Define the request/response shape and project/user relationships, implement model queries and authenticated routes, then replace sample data with API state. Add loading, failure, and empty states. Keep submit disabled until persistence works.
4. **Database lifecycle and transactions.** `db/runMigrations.js` still runs `tempSetup()` on import and manually manages schema creation. Introduce an explicit migration command with version tracking and dependency-aware ordering; keep imports free of database mutations. Wrap user-plus-credentials creation in one transaction so registration cannot leave a partially created account. Do not run existing setup/drop functions against valuable data while redesigning this.
5. **Production sessions and verification.** Replace the default in-memory session store with a persistent store. Serialize a user ID and reload the user so role changes take effect; coordinate this with the authorization work. Configure cookie/proxy behavior for your actual HTTPS deployment. Add integration tests against an isolated test database for registration, login, password changes, uploads, and likes, followed by browser tests of their user flows.

A separate controller/service layer is optional at this size. Introduce services when transactions or business rules span models; avoid adding files that merely forward the same arguments. Moving page components into a `pages` folder and standardizing filename casing can be a later standalone change once these behavior boundaries are stable.
