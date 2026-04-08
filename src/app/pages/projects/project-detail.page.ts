import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {AsyncPipe, NgFor, NgIf} from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { ApiService } from '../../core/services/api.service';
import { toLoadable } from '../../core/services/loadable';
import { LoadingSkeletonComponent } from '../../shared/components/loading-skeleton.component';
import { ErrorPanelComponent } from '../../shared/components/error-panel.component';
import { PillComponent } from '../../shared/components/pill.component';
import { LogStreamComponent } from '../../shared/components/log-stream.component';

@Component({
  selector: 'app-project-detail-page',
  standalone: true,
    imports: [RouterLink, LoadingSkeletonComponent, ErrorPanelComponent, PillComponent, LogStreamComponent, AsyncPipe],
  templateUrl: './project-detail.page.html',
  styleUrl: './project-detail.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectDetailPage {
  private readonly api = inject(ApiService);
  private readonly route = inject(ActivatedRoute);

  readonly vm$ = toLoadable(
    this.route.paramMap.pipe(
      switchMap((p) => {
        const id = p.get('id');
        if (!id) throw new Error('Missing project id');
        return this.api.getProjectById(id);
      }),
    ),
  );
}
