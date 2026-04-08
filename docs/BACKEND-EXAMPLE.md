# Backend Example (Minimal REST API)

This is a small example of how you can implement the API that `HttpApiService` expects.

It is intentionally boring: a few endpoints, clear envelopes, and predictable status codes.

## Example (Node + Express)

Create a tiny server that runs on `http://localhost:3000` and returns JSON.

```js
// server.js
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json());

const profile = {
  name: 'Fakhriddin',
  title: 'Backend Engineer',
  summary: '...'
};

const projects = [
  { id: 'event-pipeline', name: 'Event Pipeline', description: '...', techStack: ['Kafka'], status: 'active' }
];

app.get('/api/profile', (req, res) => {
  res.json(profile);
});

app.get('/api/projects', (req, res) => {
  const tech = req.query.tech;
  const status = req.query.status;
  let out = projects;
  if (tech) out = out.filter((p) => p.techStack.some((t) => String(t).toLowerCase() === String(tech).toLowerCase()));
  if (status) out = out.filter((p) => p.status === status);
  res.json({ projects: out });
});

app.get('/api/projects/:id', (req, res) => {
  const p = projects.find((x) => x.id === req.params.id);
  if (!p) return res.status(404).json({ code: 'NOT_FOUND', message: 'project not found', traceId: 'demo-trace' });
  res.json({
    project: {
      ...p,
      architecture: [],
      endpoints: [],
      recentLogs: []
    }
  });
});

app.get('/api/skills', (req, res) => {
  res.json({ skillsByCategory: { Languages: [{ id: 'go', name: 'Go', category: 'Languages', level: 'advanced', years: 3, relatedProjectIds: [] }] } });
});

app.get('/api/career', (req, res) => {
  res.json({ jobs: [] });
});

app.get('/api/system/status', (req, res) => {
  res.json({
    uptime: '1 day',
    services: [{ id: 'api', name: 'api', healthy: true, latencyP95Ms: 40, errorRate: 0.001 }],
    metrics: { cpu: 22, memory: 58, rps: 120 },
    recentLogs: []
  });
});

app.get('/api/system/logs', (req, res) => {
  res.json({ logs: [] });
});

app.listen(3000, () => console.log('API listening on http://localhost:3000'));
```

If you use this approach, set `src/environments/environment.ts`:

```ts
apiMode: 'http',
apiBaseUrl: 'http://localhost:3000',
```

## Notes

- Keep the response shapes aligned with the frontend models under `src/app/core/models/`.
- If you introduce envelopes (recommended), do it consistently:
  - list endpoints return `{ items: [...] }` or `{ projects: [...] }`
  - detail endpoints return `{ project: {...} }`
- Include a `traceId` on errors so the UI can show something actionable.

