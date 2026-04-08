import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { toLoadable } from '../../core/services/loadable';
import { LoadingSkeletonComponent } from '../../shared/components/loading-skeleton.component';
import { ErrorPanelComponent } from '../../shared/components/error-panel.component';
import { PillComponent } from '../../shared/components/pill.component';

@Component({
  selector: 'app-career-page',
  standalone: true,
  imports: [RouterLink, LoadingSkeletonComponent, ErrorPanelComponent, PillComponent, AsyncPipe],
  templateUrl: './career.page.html',
  styleUrl: './career.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CareerPage {
  private readonly api = inject(ApiService);

  readonly vm$ = toLoadable(this.api.getCareer());
}
