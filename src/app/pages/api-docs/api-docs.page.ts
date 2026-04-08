import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { toLoadable } from '../../core/services/loadable';
import { LoadingSkeletonComponent } from '../../shared/components/loading-skeleton.component';
import { ErrorPanelComponent } from '../../shared/components/error-panel.component';
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-api-docs-page',
  standalone: true,
  imports: [LoadingSkeletonComponent, ErrorPanelComponent, AsyncPipe],
  templateUrl: './api-docs.page.html',
  styleUrl: './api-docs.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApiDocsPage {
  private readonly api = inject(ApiService);

  readonly vm$ = toLoadable(this.api.getApiSpecs());
}
