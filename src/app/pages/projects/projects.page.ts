import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { combineLatest, map, switchMap } from 'rxjs';
import { ApiService } from '../../core/services/api.service';
import { toLoadable } from '../../core/services/loadable';
import { Project } from '../../core/models/project';
import { LoadingSkeletonComponent } from '../../shared/components/loading-skeleton.component';
import { ErrorPanelComponent } from '../../shared/components/error-panel.component';
import { PillComponent } from '../../shared/components/pill.component';
import { StatusBadgeComponent } from '../../shared/components/status-badge.component';
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    LoadingSkeletonComponent,
    ErrorPanelComponent,
    PillComponent,
    StatusBadgeComponent,
    AsyncPipe,
  ],
  templateUrl: './projects.page.html',
  styleUrl: './projects.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsPage {
  tech = '';
  status: '' | 'active' | 'archived' = '';

  private readonly api =  inject(ApiService);
  private readonly route =  inject(ActivatedRoute);
  private readonly router =  inject(Router);

  readonly vm$ = toLoadable(
    combineLatest([this.route.queryParamMap]).pipe(
      map(([q]) => {
        const tech = q.get('tech') ?? '';
        const status = (q.get('status') ?? '') as '' | 'active' | 'archived';
        return { tech, status };
      }),
      switchMap(({ tech, status }) => {
        this.tech = tech;
        this.status = status;
        return this.api.getProjects({
          tech: tech || undefined,
          status: status || undefined,
        });
      }),
      map((projects) => ({
        projects,
        techIndex: buildTechIndex(projects),
      })),
    ),
  );

  applyFilters(): void {
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        tech: this.tech || null,
        status: this.status || null,
      },
      queryParamsHandling: 'merge',
    });
  }
}

function buildTechIndex(projects: Project[]): string[] {
  const set = new Set<string>();
  for (const p of projects) for (const t of p.techStack) set.add(t);
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}
