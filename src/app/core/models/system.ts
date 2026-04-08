export interface ServiceStatus {
  id: string;
  name: string;
  healthy: boolean;
  latencyP95Ms: number;
  errorRate: number; // 0..1
}

export interface SystemMetrics {
  cpu: number; // 0..100
  memory: number; // 0..100
  rps: number;
}

export interface LogEntry {
  ts: string; // ISO
  serviceId: string;
  level: 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';
  message: string;
}

export interface SystemStatus {
  uptime: string;
  services: ServiceStatus[];
  metrics: SystemMetrics;
  recentLogs: LogEntry[];
}

