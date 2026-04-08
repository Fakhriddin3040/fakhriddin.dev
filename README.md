# fakhriddin.io (Angular)

Backend-leaning portfolio UI built as a data-first "internal tool" style dashboard.

## Docs

- `docs/ARCHITECTURE.md` Project structure, data flow, and why things are organized this way
- `docs/API-INTEGRATION.md` How to switch from mock data to a real backend API
- `docs/ADDING-FEATURES.md` How to add a new endpoint + page (end-to-end)
- `docs/BACKEND-EXAMPLE.md` Minimal example backend implementing the expected REST endpoints

## Local dev

```bash
npm install
npm start
```

## Pages

- `/` Dashboard
- `/projects` Projects list
- `/projects/:id` Project detail
- `/skills` Skills
- `/career` Career timeline
- `/api-docs` API docs (mock contract)
- `/system` System status (mock observability)

## API mode (mock vs real)

This app intentionally treats the UI as a consumer of an API contract.

- Mock mode is default: `src/environments/environment.ts` has `apiMode: 'mock'`
- Real backend mode: set `apiMode: 'http'` and `apiBaseUrl` to your server URL
