import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {NgFor, NgIf, KeyValuePipe, AsyncPipe} from '@angular/common';
import { ApiService } from '../../core/services/api.service';
import { toLoadable } from '../../core/services/loadable';
import { LoadingSkeletonComponent } from '../../shared/components/loading-skeleton.component';
import { ErrorPanelComponent } from '../../shared/components/error-panel.component';
import { PillComponent } from '../../shared/components/pill.component';

@Component({
  selector: 'app-skills-page',
  standalone: true,
  imports: [KeyValuePipe, LoadingSkeletonComponent, ErrorPanelComponent, PillComponent, AsyncPipe],
  templateUrl: './skills.page.html',
  styleUrl: './skills.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillsPage {
  private readonly api = inject(ApiService);

  readonly vm$ = toLoadable(this.api.getSkills());
}
