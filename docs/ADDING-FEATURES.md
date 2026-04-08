# Adding Features (Endpoint + Page)

This guide shows the intended workflow: define a contract, implement it in mock mode, then implement it in HTTP mode.

## Add A New Endpoint

Example: add a "certifications" page driven by `GET /api/certifications`.

Steps:

1. Add a model.
1. Add a method to the API contract.
1. Implement it in mock mode.
1. Implement it in HTTP mode.
1. Build a page and route.

## 1) Add A Model

Create `src/app/core/models/certification.ts`:

- include fields like `id`, `name`, `issuer`, `issuedAt`, `expiresAt?`, `verificationUrl?`.

## 2) Extend The API Contract

Edit `src/app/core/services/api.service.ts`:

- add `abstract getCertifications(): Observable<Certification[]>;`

## 3) Implement Mock Data

Add mock data to `src/app/core/data/mock-data.ts` and implement the method in:

- `src/app/core/services/mock-api.service.ts`

Keep the pattern:

- `of(data).pipe(delay(...))`

## 4) Implement HTTP Calls

Implement the method in:

- `src/app/core/services/http-api.service.ts`

Keep the mapping logic here (envelopes, field renames, conversions).

## 5) Add The Page

Create a page under `src/app/pages/certifications/` and follow an existing page template:

- use `toLoadable(...)`
- show `app-loading-skeleton` and `app-error-panel`
- render the result in a table-like UI

Then register a route in `src/app/app.routes.ts`.

## Page Pattern To Copy

The simplest references are:

- `src/app/pages/dashboard/dashboard.page.ts`
- `src/app/pages/projects/projects.page.ts`

