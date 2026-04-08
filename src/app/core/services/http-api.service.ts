import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiEndpointSpec } from '../models/api';
import { CareerItem } from '../models/career';
import { Profile } from '../models/profile';
import { Project, ProjectDetail } from '../models/project';
import { Skill } from '../models/skill';
import { LogEntry, SystemStatus } from '../models/system';
import { ApiService, ProjectsFilter } from './api.service';

type ApiEnvelope<T extends Record<string, unknown>> = T;

function joinUrl(base: string, path: string): string {
  if (!base) return path;
  if (base.endsWith('/') && path.startsWith('/')) return base.slice(0, -1) + path;
  if (!base.endsWith('/') && !path.startsWith('/')) return base + '/' + path;
  return base + path;
}

@Injectable()
export class HttpApiService extends ApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiBaseUrl;

  override getProfile(): Observable<Profile> {
    return this.http.get<Profile>(joinUrl(this.baseUrl, '/api/profile'));
  }

  override getProjects(filter: ProjectsFilter = {}): Observable<Project[]> {
    let params = new HttpParams();
    if (filter.tech) params = params.set('tech', filter.tech);
    if (filter.status) params = params.set('status', filter.status);
    return this.http
      .get<ApiEnvelope<{ projects: Project[] }>>(joinUrl(this.baseUrl, '/api/projects'), { params })
      .pipe(map((r) => r.projects));
  }

  override getProjectById(id: string): Observable<ProjectDetail> {
    return this.http
      .get<ApiEnvelope<{ project: ProjectDetail }>>(joinUrl(this.baseUrl, `/api/projects/${encodeURIComponent(id)}`))
      .pipe(map((r) => r.project));
  }

  override getSkills(): Observable<Record<string, Skill[]>> {
    return this.http
      .get<ApiEnvelope<{ skillsByCategory: Record<string, Skill[]> }>>(joinUrl(this.baseUrl, '/api/skills'))
      .pipe(map((r) => r.skillsByCategory));
  }

  override getCareer(): Observable<CareerItem[]> {
    return this.http
      .get<ApiEnvelope<{ jobs: CareerItem[] }>>(joinUrl(this.baseUrl, '/api/career'))
      .pipe(map((r) => r.jobs));
  }

  override getSystemStatus(): Observable<SystemStatus> {
    return this.http.get<SystemStatus>(joinUrl(this.baseUrl, '/api/system/status'));
  }

  override getSystemLogs(paramsIn: { serviceId?: string; limit?: number } = {}): Observable<LogEntry[]> {
    let params = new HttpParams();
    if (paramsIn.serviceId) params = params.set('serviceId', paramsIn.serviceId);
    if (paramsIn.limit) params = params.set('limit', String(paramsIn.limit));
    return this.http
      .get<ApiEnvelope<{ logs: LogEntry[] }>>(joinUrl(this.baseUrl, '/api/system/logs'), { params })
      .pipe(map((r) => r.logs));
  }

  override getApiSpecs(): Observable<ApiEndpointSpec[]> {
    // Usually docs are static, but you can serve them dynamically.
    return this.http.get<ApiEndpointSpec[]>(joinUrl(this.baseUrl, '/api/api-specs'));
  }
}

