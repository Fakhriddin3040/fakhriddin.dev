import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-panel',
  standalone: true,
  template: `
    <div class="panel err">
      <div class="t">error</div>
      <div class="m">{{ message }}</div>
    </div>
  `,
  styles: [
    `
      .err {
        padding: 14px;
        border-radius: 16px;
        border-color: rgba(255, 93, 108, 0.25);
        background: rgba(255, 93, 108, 0.09);
      }
      .t {
        color: var(--bad);
        font-size: 12px;
        letter-spacing: 0.06em;
        text-transform: uppercase;
      }
      .m {
        margin-top: 8px;
        color: rgba(255, 255, 255, 0.86);
        font-size: 12px;
        line-height: 1.4;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorPanelComponent {
  @Input({ required: true }) message!: string;
}

