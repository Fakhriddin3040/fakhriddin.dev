import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import { forkJoin, map } from 'rxjs';
import { ApiService } from '../../core/services/api.service';
import { toLoadable } from '../../core/services/loadable';
import { MetricCardComponent } from '../../shared/components/metric-card.component';
import { LogStreamComponent } from '../../shared/components/log-stream.component';
import { LoadingSkeletonComponent } from '../../shared/components/loading-skeleton.component';
import { ErrorPanelComponent } from '../../shared/components/error-panel.component';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [AsyncPipe, MetricCardComponent, LogStreamComponent, LoadingSkeletonComponent, ErrorPanelComponent],
  templateUrl: './dashboard.page.html',
  styleUrl: './dashboard.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPage {
    private readonly api = inject(ApiService);

  readonly vm$ = toLoadable(
    forkJoin({
      profile: this.api.getProfile(),
      system: this.api.getSystemStatus(),
    }).pipe(
      map(({ profile, system }) => ({
        profile,
        system,
        computed: {
          healthyServices: system.services.filter((s) => s.healthy).length,
          totalServices: system.services.length,
        },
      })),
    ),
  );

}
