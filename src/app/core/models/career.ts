export interface CareerItem {
  id: string;
  company: string;
  role: string;
  location?: string;
  startDate: string; // ISO-ish, for display
  endDate?: string; // undefined => present
  responsibilities: string[];
  technologies: string[];
  achievements: string[];
  projectIds: string[];
}

