import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  template: `
    <span class="badge" [attr.data-tone]="tone">
      <span class="dot"></span>
      {{ label }}
    </span>
  `,
  styles: [
    `
      .badge {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 5px 10px;
        border-radius: 999px;
        font-size: 12px;
        color: var(--muted);
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
      }
      .dot {
        width: 7px;
        height: 7px;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.35);
      }
      .badge[data-tone='good'] {
        color: rgba(255, 255, 255, 0.92);
        border-color: rgba(46, 229, 157, 0.25);
        background: rgba(46, 229, 157, 0.12);
      }
      .badge[data-tone='good'] .dot {
        background: var(--good);
      }
      .badge[data-tone='bad'] {
        color: rgba(255, 255, 255, 0.92);
        border-color: rgba(255, 93, 108, 0.25);
        background: rgba(255, 93, 108, 0.12);
      }
      .badge[data-tone='bad'] .dot {
        background: var(--bad);
      }
      .badge[data-tone='warn'] {
        color: rgba(255, 255, 255, 0.92);
        border-color: rgba(255, 204, 102, 0.3);
        background: rgba(255, 204, 102, 0.12);
      }
      .badge[data-tone='warn'] .dot {
        background: var(--warn);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusBadgeComponent {
  @Input({ required: true }) label!: string;
  @Input() tone: 'neutral' | 'good' | 'warn' | 'bad' = 'neutral';
}

