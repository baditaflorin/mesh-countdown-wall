# Countdown Wall

**Live → https://baditaflorin.github.io/mesh-countdown-wall/**

Countdown Wall is a browser-local shared timer board. A Yjs room shares timer
lifecycle actions; each peer derives elapsed time locally, so the countdown
stays smooth without sending a write every second.

## Run locally

Clone this repository beside `mesh-common`, then run `npm install` and `npm run dev`.
The service has no account or app backend. See `docs/privacy.md` after building
for the room-data model.

## Verify

`npm run fmt:check`, `npm run typecheck`, `npm run test:unit`, and `npm run smoke`.

GitHub Pages publishes the committed `docs/` directory from `main`.
