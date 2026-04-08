import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-metric-card',
  standalone: true,
  template: `
    <div class="panel card">
      <div class="k">{{ title }}</div>
      <div class="v">{{ value }}</div>
      @if (hint) {
        <div class="h">{{ hint }}</div>
      }
    </div>
  `,
  styles: [
    `
      .card {
        padding: 14px;
        border-radius: 16px;
      }
      .k {
        color: var(--muted);
        font-size: 12px;
        letter-spacing: 0.06em;
        text-transform: uppercase;
      }
      .v {
        margin-top: 10px;
        font-size: 28px;
        font-weight: 800;
        letter-spacing: -0.03em;
      }
      .h {
        margin-top: 8px;
        color: var(--faint);
        font-size: 12px;
        line-height: 1.4;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetricCardComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) value!: string | number;
  @Input() hint?: string;
}

