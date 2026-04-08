export const environment = {
  production: false,
  // `mock`: uses in-memory data with simulated latency.
  // `http`: uses HttpClient to call a real backend.
  apiMode: 'mock' as const,
  apiBaseUrl: 'http://localhost:3000',
};

