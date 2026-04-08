import { ApiEndpointSpec } from '../models/api';
import { CareerItem } from '../models/career';
import { Profile } from '../models/profile';
import { Project, ProjectDetail } from '../models/project';
import { Skill } from '../models/skill';
import { LogEntry, ServiceStatus, SystemMetrics } from '../models/system';

export const MOCK_PROFILE: Profile = {
  name: 'Fakhriddin',
  title: 'Backend Engineer',
  summary:
    'I build reliable services: clean contracts, observable systems, pragmatic performance, and calm incident response. This site is intentionally "tool-like": everything is modeled as typed data and rendered as tables, logs, and metrics.',
  contact: {
    location: 'US (remote)',
    email: 'you@example.com',
    github: 'https://github.com/you',
    linkedin: 'https://linkedin.com/in/you',
  },
  metrics: {
    yearsExperience: 6,
    projectCount: 9,
    servicesOwned: 12,
    incidentsResolved: 37,
  },
};

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'svc-mesh-audit',
    name: 'Service Mesh Audit',
    description: 'Policy + tracing validation across services; produces a drift report and SLO risk score.',
    techStack: ['Go', 'Kubernetes', 'OpenTelemetry', 'PostgreSQL'],
    status: 'active',
    repoUrl: 'https://github.com/you/svc-mesh-audit',
    docsUrl: 'https://github.com/you/svc-mesh-audit#readme',
  },
  {
    id: 'event-pipeline',
    name: 'Event Pipeline',
    description:
      'Durable event ingestion with backpressure + idempotency; late-arrival handling and replay tooling.',
    techStack: ['Java', 'Kafka', 'Redis', 'ClickHouse'],
    status: 'active',
  },
  {
    id: 'auth-gateway',
    name: 'Auth Gateway',
    description: 'JWT/OIDC edge auth with rate-limits and audit trails.',
    techStack: ['Node.js', 'OAuth', 'Nginx', 'PostgreSQL'],
    status: 'archived',
  },
  {
    id: 'payments-ledger',
    name: 'Payments Ledger',
    description: 'Double-entry ledger primitives, reconciliation jobs, and dispute investigation views.',
    techStack: ['Python', 'PostgreSQL', 'Airflow'],
    status: 'active',
  },
];

export const MOCK_PROJECT_DETAILS: Record<string, ProjectDetail> = {
  'svc-mesh-audit': {
    ...MOCK_PROJECTS[0],
    architecture: [
      { id: 'collector', name: 'Collector', description: 'Scrapes configs + traces; normalizes into facts.' },
      { id: 'scorer', name: 'Scorer', description: 'Computes risk score per service and per route.' },
      { id: 'api', name: 'API', description: 'Serves drift reports and per-service audit history.' },
      { id: 'worker', name: 'Worker', description: 'Scheduled scans + replay pipeline.' },
    ],
    endpoints: [
      { method: 'GET', path: '/api/projects', description: 'List projects (filtered).' },
      { method: 'GET', path: '/api/projects/:id', description: 'Project detail (arch + endpoints).' },
      { method: 'GET', path: '/api/system/status', description: 'System health snapshot.' },
    ],
    recentLogs: [
      '[INFO] scan completed: 41 services, 6 drift findings',
      '[WARN] trace gap: payments-ledger missing span.kind on 3 routes',
      '[INFO] slo score updated: auth-gateway risk=0.17',
    ],
  },
  'event-pipeline': {
    ...MOCK_PROJECTS[1],
    architecture: [
      { id: 'ingress', name: 'Ingress', description: 'HTTP ingestion with idempotency keys.' },
      { id: 'stream', name: 'Stream', description: 'Kafka topics with compaction + DLQ strategy.' },
      { id: 'sink', name: 'Sink', description: 'ClickHouse optimized for query patterns.' },
    ],
    endpoints: [
      { method: 'POST', path: '/ingest', description: 'Accept events with idempotency key.' },
      { method: 'POST', path: '/replay', description: 'Replay by time window.' },
      { method: 'GET', path: '/health', description: 'Basic readiness/liveness.' },
    ],
    recentLogs: [
      '[INFO] consumer lag stable: topic=events.v1 lag=21',
      '[INFO] dedupe hits: 0.7% (last 15m)',
      '[WARN] DLQ spike: 34 messages (schema mismatch)',
    ],
  },
  'auth-gateway': {
    ...MOCK_PROJECTS[2],
    architecture: [
      { id: 'edge', name: 'Edge', description: 'Nginx + JWT validation + rate limiting.' },
      { id: 'audit', name: 'Audit', description: 'Stores auth decisions for forensics.' },
    ],
    endpoints: [
      { method: 'POST', path: '/auth/login', description: 'Authenticate and mint token.' },
      { method: 'POST', path: '/auth/refresh', description: 'Refresh access token.' },
      { method: 'GET', path: '/auth/introspect', description: 'Token debugging endpoint.' },
    ],
    recentLogs: [
      '[INFO] rollout completed: 100%',
      '[WARN] rate-limit burst: route=/auth/login ip=203.0.113.4',
      '[INFO] audit retention job OK',
    ],
  },
  'payments-ledger': {
    ...MOCK_PROJECTS[3],
    architecture: [
      { id: 'api', name: 'API', description: 'Ledger ops + invariants; idempotent writes.' },
      { id: 'recon', name: 'Reconciliation', description: 'Daily reconciliation and mismatch reports.' },
      { id: 'jobs', name: 'Jobs', description: 'Backfills, alerts, and dispute tooling.' },
    ],
    endpoints: [
      { method: 'POST', path: '/entries', description: 'Create ledger entry (double-entry).' },
      { method: 'GET', path: '/accounts/:id/balance', description: 'Balance with point-in-time support.' },
      { method: 'POST', path: '/reconcile', description: 'Kick reconciliation job.' },
    ],
    recentLogs: [
      '[INFO] reconcile: completed in 43s (0 mismatches)',
      '[INFO] backfill: 12,410 rows processed',
      '[WARN] dispute: manual review required id=DP-1842',
    ],
  },
};

export const MOCK_SKILLS: Skill[] = [
  { id: 'go', name: 'Go', category: 'Languages', level: 'advanced', years: 3, relatedProjectIds: ['svc-mesh-audit'] },
  { id: 'java', name: 'Java', category: 'Languages', level: 'advanced', years: 4, relatedProjectIds: ['event-pipeline'] },
  { id: 'py', name: 'Python', category: 'Languages', level: 'advanced', years: 5, relatedProjectIds: ['payments-ledger'] },
  { id: 'ts', name: 'TypeScript', category: 'Languages', level: 'advanced', years: 4, relatedProjectIds: ['auth-gateway'] },
  { id: 'postgres', name: 'PostgreSQL', category: 'Data', level: 'expert', years: 6, relatedProjectIds: ['svc-mesh-audit', 'payments-ledger'] },
  { id: 'kafka', name: 'Kafka', category: 'Data', level: 'advanced', years: 3, relatedProjectIds: ['event-pipeline'] },
  { id: 'k8s', name: 'Kubernetes', category: 'Cloud', level: 'advanced', years: 3, relatedProjectIds: ['svc-mesh-audit'] },
  { id: 'otel', name: 'OpenTelemetry', category: 'Observability', level: 'advanced', years: 2, relatedProjectIds: ['svc-mesh-audit'] },
  { id: 'sre', name: 'Incident Response', category: 'DevEx', level: 'advanced', years: 4, relatedProjectIds: [] },
  { id: 'sec', name: 'OAuth/OIDC', category: 'Security', level: 'intermediate', years: 2, relatedProjectIds: ['auth-gateway'] },
];

export const MOCK_CAREER: CareerItem[] = [
  {
    id: 'c1',
    company: 'Company A',
    role: 'Backend Engineer',
    location: 'Remote',
    startDate: '2019-01',
    endDate: '2021-06',
    responsibilities: ['Built REST APIs', 'Owned on-call rotations', 'Improved DB query performance'],
    technologies: ['Java', 'PostgreSQL', 'Docker'],
    achievements: ['Cut p95 latency 38% on core API', 'Introduced structured logging'],
    projectIds: ['auth-gateway'],
  },
  {
    id: 'c2',
    company: 'Company B',
    role: 'Senior Backend Engineer',
    location: 'Remote',
    startDate: '2021-07',
    endDate: '2024-02',
    responsibilities: ['Designed event pipeline', 'Built replay tooling', 'Defined API contracts across teams'],
    technologies: ['Kafka', 'Redis', 'ClickHouse'],
    achievements: ['Reduced incident MTTR by 24%', 'Led migration to OpenTelemetry'],
    projectIds: ['event-pipeline', 'svc-mesh-audit'],
  },
  {
    id: 'c3',
    company: 'Company C',
    role: 'Staff Engineer',
    location: 'Remote',
    startDate: '2024-03',
    responsibilities: ['Platform reliability', 'SLOs and alerting', 'Security posture improvements'],
    technologies: ['Kubernetes', 'PostgreSQL', 'OpenTelemetry'],
    achievements: ['Implemented SLO-based alerting', 'Shipped audit tooling for service mesh'],
    projectIds: ['svc-mesh-audit', 'payments-ledger'],
  },
];

export const MOCK_SERVICES: ServiceStatus[] = [
  { id: 'api', name: 'api', healthy: true, latencyP95Ms: 84, errorRate: 0.002 },
  { id: 'worker', name: 'worker', healthy: true, latencyP95Ms: 0, errorRate: 0.0 },
  { id: 'db', name: 'postgres', healthy: true, latencyP95Ms: 12, errorRate: 0.0 },
  { id: 'kafka', name: 'kafka', healthy: false, latencyP95Ms: 0, errorRate: 0.041 },
];

export const MOCK_METRICS: SystemMetrics = {
  cpu: 37,
  memory: 62,
  rps: 148,
};

export const MOCK_LOGS: LogEntry[] = [
  { ts: '2026-04-08T13:44:10Z', serviceId: 'api', level: 'INFO', message: 'GET /api/projects 200 (11ms)' },
  { ts: '2026-04-08T13:44:11Z', serviceId: 'kafka', level: 'WARN', message: 'consumer lag rising: topic=events.v1' },
  { ts: '2026-04-08T13:44:12Z', serviceId: 'api', level: 'INFO', message: 'GET /api/system/status 200 (8ms)' },
  { ts: '2026-04-08T13:44:13Z', serviceId: 'kafka', level: 'ERROR', message: 'broker unavailable: connection reset' },
  { ts: '2026-04-08T13:44:15Z', serviceId: 'db', level: 'INFO', message: 'checkpoint complete: 0.7s' },
];

export const MOCK_API_SPECS: ApiEndpointSpec[] = [
  {
    method: 'GET',
    path: '/api/profile',
    description: 'Engineer overview and summary metrics.',
    responseShape: '{ name, title, summary, contact, metrics }',
  },
  {
    method: 'GET',
    path: '/api/projects',
    description: 'Projects list. Supports optional filtering.',
    requestShape: 'query: tech?, status?',
    responseShape: '{ projects: Project[] }',
  },
  {
    method: 'GET',
    path: '/api/projects/:id',
    description: 'Project detail including architecture + endpoints + recent logs.',
    responseShape: '{ project: ProjectDetail }',
  },
  {
    method: 'GET',
    path: '/api/skills',
    description: 'Skills grouped by category.',
    responseShape: '{ skillsByCategory: Record<string, Skill[]> }',
  },
  {
    method: 'GET',
    path: '/api/career',
    description: 'Chronological career items.',
    responseShape: '{ jobs: CareerItem[] }',
  },
  {
    method: 'GET',
    path: '/api/system/status',
    description: 'System status snapshot (services + metrics + recent logs).',
    responseShape: '{ uptime, services, metrics, recentLogs }',
  },
  {
    method: 'GET',
    path: '/api/system/logs',
    description: 'Recent logs (query: serviceId?, limit?).',
    requestShape: 'query: serviceId?, limit?',
    responseShape: '{ logs: LogEntry[] }',
  },
];

