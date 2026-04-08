# API Integration (Mock → Real Backend)

This UI is built around an API contract. In mock mode, `MockApiService` returns in-memory data with simulated latency. In HTTP mode, `HttpApiService` calls a real backend.

## 1) Switch Modes

Edit `src/environments/environment.ts`:

```ts
export const environment = {
  production: false,
  apiMode: 'http', // 'mock' or 'http'
  apiBaseUrl: 'http://localhost:3000'
};
```

How it works:

- `src/app/app.config.ts` provides `ApiService` using either `MockApiService` or `HttpApiService`.
- Pages inject `ApiService` only, so they do not change when you switch modes.

## 2) Implement The Backend Endpoints

`HttpApiService` expects these endpoints (matching the shapes already used by the UI):

- `GET /api/profile` → `Profile`
- `GET /api/projects?tech=&status=` → `{ projects: Project[] }`
- `GET /api/projects/:id` → `{ project: ProjectDetail }`
- `GET /api/skills` → `{ skillsByCategory: Record<string, Skill[]> }`
- `GET /api/career` → `{ jobs: CareerItem[] }`
- `GET /api/system/status` → `SystemStatus`
- `GET /api/system/logs?serviceId=&limit=` → `{ logs: LogEntry[] }`

The frontend types are defined here:

- `src/app/core/models/profile.ts`
- `src/app/core/models/project.ts`
- `src/app/core/models/skill.ts`
- `src/app/core/models/career.ts`
- `src/app/core/models/system.ts`

### Example responses

```json
// GET /api/projects
{
  "projects": [
    {
      "id": "event-pipeline",
      "name": "Event Pipeline",
      "description": "Durable event ingestion with backpressure + idempotency...",
      "techStack": ["Java", "Kafka", "Redis", "ClickHouse"],
      "status": "active",
      "repoUrl": "https://github.com/you/event-pipeline",
      "docsUrl": "https://github.com/you/event-pipeline#readme"
    }
  ]
}
```

```json
// GET /api/projects/event-pipeline
{
  "project": {
    "id": "event-pipeline",
    "name": "Event Pipeline",
    "description": "Durable event ingestion with backpressure + idempotency...",
    "techStack": ["Java", "Kafka", "Redis", "ClickHouse"],
    "status": "active",
    "architecture": [
      { "id": "ingress", "name": "Ingress", "description": "HTTP ingestion with idempotency keys." }
    ],
    "endpoints": [
      { "method": "POST", "path": "/ingest", "description": "Accept events with idempotency key." }
    ],
    "recentLogs": [
      "[INFO] consumer lag stable: topic=events.v1 lag=21"
    ]
  }
}
```

## 3) CORS / Local Dev Tips

If the backend runs on a different origin than the Angular dev server, you will need CORS enabled on the backend.

Alternative: configure an Angular dev proxy and set `apiBaseUrl` to empty string, then call `/api/...` via the proxy.

## 4) Error Handling Contract (Recommended)

For a “backend engineer” portfolio, it’s worth making errors feel realistic and debuggable.

Recommended conventions:

- Return JSON error bodies with a stable shape:
  - `code` string
  - `message` string
  - `traceId` string
- Use HTTP status codes correctly:
  - 400 validation issues
  - 401/403 auth issues
  - 404 not found
  - 429 rate limited
  - 500+ server errors

The UI already renders errors via:

- `src/app/shared/components/error-panel.component.ts`
- `src/app/core/services/loadable.ts`

## 5) Where To Change URLs And Shapes

- `src/environments/environment.ts` sets `apiBaseUrl`.
- `src/app/core/services/http-api.service.ts` contains the concrete HTTP calls.

If your backend uses slightly different shapes, adapt in `HttpApiService`:

- map envelopes (`{ project: ... }`)
- rename fields
- convert dates
- normalize enums

## 6) Optional: Make API Docs Dynamic

`/api-docs` currently loads from `ApiService.getApiSpecs()`.

- Mock mode returns `MOCK_API_SPECS` from `src/app/core/data/mock-data.ts`.
- HTTP mode currently calls `GET /api/api-specs` (see `src/app/core/services/http-api.service.ts`).

You can implement `GET /api/api-specs` in your backend, or change `HttpApiService.getApiSpecs()` to return a static constant.

