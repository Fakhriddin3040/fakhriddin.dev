import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { MOCK_API_SPECS, MOCK_CAREER, MOCK_LOGS, MOCK_METRICS, MOCK_PROFILE, MOCK_PROJECT_DETAILS, MOCK_PROJECTS, MOCK_SERVICES, MOCK_SKILLS } from '../data/mock-data';
import { ApiEndpointSpec } from '../models/api';
import { CareerItem } from '../models/career';
import { Profile } from '../models/profile';
import { Project, ProjectDetail } from '../models/project';
import { Skill } from '../models/skill';
import { LogEntry, SystemStatus } from '../models/system';
import { ApiService, ProjectsFilter } from './api.service';

@Injectable()
export class MockApiService extends ApiService {
  private readonly baseLatencyMs = 380;

  override getProfile(): Observable<Profile> {
    return of(MOCK_PROFILE).pipe(delay(this.baseLatencyMs));
  }

  override getProjects(filter: ProjectsFilter = {}): Observable<Project[]> {
    return of(MOCK_PROJECTS).pipe(
      delay(this.baseLatencyMs + 120),
      map((projects) => {
        let out = projects;
        if (filter.tech) out = out.filter((p) => p.techStack.some((t) => t.toLowerCase() === filter.tech!.toLowerCase()));
        if (filter.status) out = out.filter((p) => p.status === filter.status);
        return out;
      }),
    );
  }

  override getProjectById(id: string): Observable<ProjectDetail> {
    const detail = MOCK_PROJECT_DETAILS[id];
    if (!detail) return throwError(() => new Error(`Project not found: ${id}`)).pipe(delay(this.baseLatencyMs));
    return of(detail).pipe(delay(this.baseLatencyMs + 160));
  }

  override getSkills(): Observable<Record<string, Skill[]>> {
    const grouped: Record<string, Skill[]> = {};
    for (const s of MOCK_SKILLS) {
      grouped[s.category] ??= [];
      grouped[s.category].push(s);
    }
    return of(grouped).pipe(delay(this.baseLatencyMs + 90));
  }

  override getCareer(): Observable<CareerItem[]> {
    return of(MOCK_CAREER).pipe(delay(this.baseLatencyMs + 150));
  }

  override getSystemStatus(): Observable<SystemStatus> {
    return of({
      uptime: '12 days 04:18:02',
      services: MOCK_SERVICES,
      metrics: MOCK_METRICS,
      recentLogs: MOCK_LOGS,
    }).pipe(delay(this.baseLatencyMs + 130));
  }

  override getSystemLogs(params: { serviceId?: string; limit?: number } = {}): Observable<LogEntry[]> {
    const limit = params.limit ?? 40;
    return of(MOCK_LOGS).pipe(
      delay(this.baseLatencyMs + 100),
      map((logs) => {
        let out = logs;
        if (params.serviceId) out = out.filter((l) => l.serviceId === params.serviceId);
        return out.slice(0, limit);
      }),
    );
  }

  override getApiSpecs(): Observable<ApiEndpointSpec[]> {
    return of(MOCK_API_SPECS).pipe(delay(this.baseLatencyMs));
  }
}

