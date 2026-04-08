export type ProjectStatus = 'active' | 'archived';

export interface ArchComponent {
  id: string;
  name: string;
  description: string;
}

export interface ApiEndpoint {
  method: string;
  path: string;
  description: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  status: ProjectStatus;
  repoUrl?: string;
  docsUrl?: string;
}

export interface ProjectDetail extends Project {
  architecture: ArchComponent[];
  endpoints: ApiEndpoint[];
  recentLogs: string[];
}

