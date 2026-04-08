export interface ProfileMetrics {
  yearsExperience: number;
  projectCount: number;
  servicesOwned: number;
  incidentsResolved: number;
}

export interface Profile {
  name: string;
  title: string;
  summary: string;
  contact: {
    email?: string;
    github?: string;
    linkedin?: string;
    location?: string;
  };
  metrics: ProfileMetrics;
}

