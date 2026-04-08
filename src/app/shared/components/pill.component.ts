import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-pill',
  standalone: true,
  template: `<span class="pill" [attr.data-tone]="tone">{{ text }}</span>`,
  styles: [
    `
      .pill {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 4px 10px;
        border-radius: 999px;
        font-size: 12px;
        color: var(--muted);
        background: rgba(255, 255, 255, 0.06);
        border: 1px solid rgba(255, 255, 255, 0.1);
        white-space: nowrap;
      }
      .pill[data-tone='accent'] {
        color: rgba(255, 255, 255, 0.92);
        background: rgba(102, 166, 255, 0.14);
        border-color: rgba(102, 166, 255, 0.25);
      }
      .pill[data-tone='good'] {
        color: rgba(255, 255, 255, 0.92);
        background: rgba(46, 229, 157, 0.13);
        border-color: rgba(46, 229, 157, 0.25);
      }
      .pill[data-tone='bad'] {
        color: rgba(255, 255, 255, 0.92);
        background: rgba(255, 93, 108, 0.13);
        border-color: rgba(255, 93, 108, 0.25);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PillComponent {
  @Input({ required: true }) text!: string;
  @Input() tone: 'neutral' | 'accent' | 'good' | 'bad' = 'neutral';
}

