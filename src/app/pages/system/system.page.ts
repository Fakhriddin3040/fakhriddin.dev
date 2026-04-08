import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {AsyncPipe, DecimalPipe, NgFor, NgIf} from '@angular/common';
import { ApiService } from '../../core/services/api.service';
import { toLoadable } from '../../core/services/loadable';
import { LoadingSkeletonComponent } from '../../shared/components/loading-skeleton.component';
import { ErrorPanelComponent } from '../../shared/components/error-panel.component';
import { MetricCardComponent } from '../../shared/components/metric-card.component';
import { StatusBadgeComponent } from '../../shared/components/status-badge.component';
import { LogStreamComponent } from '../../shared/components/log-stream.component';

@Component({
  selector: 'app-system-page',
  standalone: true,
  imports: [
    DecimalPipe,
    LoadingSkeletonComponent,
    ErrorPanelComponent,
    MetricCardComponent,
    StatusBadgeComponent,
    LogStreamComponent,
    AsyncPipe,
  ],
  templateUrl: './system.page.html',
  styleUrl: './system.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SystemPage {
  private readonly api = inject(ApiService);

  readonly vm$ = toLoadable(this.api.getSystemStatus());
}
