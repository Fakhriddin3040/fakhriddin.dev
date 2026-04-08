# Architecture

This project is an Angular portfolio site that behaves like an internal tool: tables, logs, metrics, and strict typed contracts.

## Goals

- Emphasize backend skills by presenting system architecture and data.
- Keep UI components simple and “contract-driven”.
- Make it easy to swap between mock data and a real HTTP API without changing pages.

## How The App Is Wired

### Entry points

- `src/main.ts` bootstraps the standalone Angular app.
- `src/app/app.config.ts` provides router + HttpClient + the selected API implementation.
- `src/app/app.routes.ts` declares routes for each page.
- `src/app/app.component.html` is the shell: sidebar nav + topbar + `<router-outlet />`.

### Data flow (page → API → UI)

Most pages follow the same pattern:

1. A page component requests data from `ApiService`.
1. The page wraps the Observable with `toLoadable(...)` to get a `loading|error|success` state.
1. The template uses Angular control flow (`@if`) to show a skeleton, an error panel, or the real content.

Key pieces:

- `src/app/core/services/api.service.ts`
  - Abstract contract (what the UI needs).
  - Pages only depend on this contract.
- `src/app/core/services/mock-api.service.ts`
  - In-memory implementation.
  - Adds artificial latency and implements filtering.
- `src/app/core/services/http-api.service.ts`
  - Real implementation using `HttpClient`.
  - Uses `environment.apiBaseUrl` + REST endpoints.
- `src/app/core/services/loadable.ts`
  - Small helper that converts an `Observable<T>` into a `Loadable<T>`.
- `src/environments/environment.ts`
  - Controls whether the app uses mock or real HTTP mode.

### UI building blocks

Reusable components live here:

- `src/app/shared/components/metric-card.component.ts`
- `src/app/shared/components/log-stream.component.ts`
- `src/app/shared/components/loading-skeleton.component.ts`
- `src/app/shared/components/error-panel.component.ts`
- `src/app/shared/components/pill.component.ts`
- `src/app/shared/components/status-badge.component.ts`

Pages are standalone components under:

- `src/app/pages/dashboard/`
- `src/app/pages/projects/`
- `src/app/pages/skills/`
- `src/app/pages/career/`
- `src/app/pages/api-docs/`
- `src/app/pages/system/`

### Styling

- `src/styles.scss` defines CSS variables and a “dashboard” look:
  - subtle panels
  - mono-ish typography
  - radial gradients in the background
  - shared utility classes like `.panel`, `.panel-subtle`, `.container`, `.hr`

Component styles are intentionally local and minimal; the global file establishes the “visual language”.

## What To Read First

- `src/app/app.config.ts` to understand dependency wiring (mock vs http API).
- `src/app/pages/dashboard/dashboard.page.ts` for the “standard” page pattern.
- `src/app/core/services/api.service.ts` for the app-wide API contract.

