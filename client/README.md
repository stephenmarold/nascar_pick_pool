# NASCAR Picks Pool — Client

This is the React client for the "NASCAR Picks Pool" app — a lightweight app for creating race pools, inviting participants, and collecting driver picks for a given race. The client provides UI for creating events, selecting picks, viewing participants, and calculating standings.

## Key features

- Create and manage pick pools (event name, date, optional password)
- Submit picks (three driver selections per participant)
- View participant list and current standings
- Driver list management (backend-driven)

## Quick start (client)

Prerequisites: Node.js (16+ recommended) and npm.

From the `client` folder:

```bash
npm install
npm start
```

`npm start` runs the development server (React) and opens the app at http://localhost:3000. The client makes API calls to `/api/*` — in development those requests are proxied according to the `proxy` entry in `client/package.json`.

To build a production bundle:

```bash
npm run build
```

## Running the full stack locally

1. Start the backend server (creates and uses a SQLite DB):

```bash
# from the 'server' folder
npm install
npm start
```

The server listens on `process.env.PORT` or `3001` by default and exposes the API under `/api` (see [server/index.js](server/index.js)).

2. Start the client (see Quick start above). By default the client `proxy` in `client/package.json` points at the deployed API. To use a local backend during development, either:

- Update `client/package.json` -> `proxy` to `http://localhost:3001`, or
- Build the client and serve the `build/` assets against your backend.

## Important files

- Client entry: `src/index.jsx`
- Routes + pages: `src/routes/` (createEvent, selectPicks, eventPage, etc.)
- Shared utils: `src/utils/utils.js`
- Server entry: [server/index.js](server/index.js)
- Server DB init and access: [server/db/db.js](server/db/db.js) (SQLite DB: `server/db/nascar_pick_pool.db`)

## API notes

- Base path: `/api` (e.g. `/api/getPools`, `/api/picks/:poolId`, `/api/pools`)
- Default server port: `3001` (can be overridden with `PORT` env var)

## Tips and gotchas

- The client expects the backend to supply/update driver data and picks via the documented endpoints. If you see empty driver/pick lists, confirm the backend is running and the `proxy` is pointing to the correct host.
- Database is SQLite and is created/initialized automatically by the server on first run.
- If you change the server port, update the client `proxy` (or configure your own API base URL) so development requests resolve correctly.

## Learn more / next steps

- To extend functionality, check the React routes in `src/routes/` and the server endpoints in `server/index.js`.
- If you want a local development experience matching production, change `client/package.json` `proxy` to `http://localhost:3001`.
 
## TODOs

MVP
- Switch to `react-query` for all endpoints
- Can only select driver once
- Containerize app (for practice)

Version Version 1.0.0 Goal
- Save points each call
- Save winner
- Redux for login and race data, and driver list?
- Adjust git to run in terminal with auth
- Figure out transaction issue (see `notes.txt` for context)

If you want, I can start on any of these — say which one and I'll open a branch and implement it.
