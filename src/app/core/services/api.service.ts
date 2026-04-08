import { Observable } from 'rxjs';
import { ApiEndpointSpec } from '../models/api';
import { CareerItem } from '../models/career';
import { Profile } from '../models/profile';
import { Project, ProjectDetail, ProjectStatus } from '../models/project';
import { Skill } from '../models/skill';
import { LogEntry, SystemStatus } from '../models/system';

export interface ProjectsFilter {
  tech?: string;
  status?: ProjectStatus;
}

// Abstract service used throughout the app.
// We bind this to either MockApiService (in-memory) or HttpApiService (real backend).
export abstract class ApiService {
  abstract getProfile(): Observable<Profile>;
  abstract getProjects(filter?: ProjectsFilter): Observable<Project[]>;
  abstract getProjectById(id: string): Observable<ProjectDetail>;
  abstract getSkills(): Observable<Record<string, Skill[]>>;
  abstract getCareer(): Observable<CareerItem[]>;
  abstract getSystemStatus(): Observable<SystemStatus>;
  abstract getSystemLogs(params?: { serviceId?: string; limit?: number }): Observable<LogEntry[]>;
  abstract getApiSpecs(): Observable<ApiEndpointSpec[]>;
}

