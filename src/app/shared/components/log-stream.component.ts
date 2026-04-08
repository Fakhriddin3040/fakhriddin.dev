import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { LogEntry } from '../../core/models/system';

@Component({
  selector: 'app-log-stream',
  standalone: true,
  imports: [NgIf, NgFor],
  template: `
    <div class="panel-subtle wrap">
      <div class="head">
        <div class="title">{{ title }}</div>
        <div class="spacer"></div>
        @if (subtitle) {
          <div class="sub">{{ subtitle }}</div>
        }
      </div>

      <div class="body">
        @if (lines?.length) {
          <div class="row" *ngFor="let line of lines">
            <span class="line">{{ line }}</span>
          </div>
        } @else if (entries?.length) {
          <div class="row" *ngFor="let e of entries">
            <span class="ts">{{ e.ts }}</span>
            <span class="svc">{{ e.serviceId }}</span>
            <span class="lvl" [attr.data-lvl]="e.level">{{ e.level }}</span>
            <span class="msg">{{ e.message }}</span>
          </div>
        } @else {
          <div class="empty">no logs</div>
        }
      </div>
    </div>
  `,
  styles: [
    `
      .wrap {
        overflow: hidden;
      }
      .head {
        display: flex;
        gap: 10px;
        align-items: center;
        padding: 10px 12px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      }
      .title {
        color: var(--muted);
        font-size: 12px;
        letter-spacing: 0.06em;
        text-transform: uppercase;
      }
      .sub {
        color: var(--faint);
        font-size: 12px;
      }
      .spacer {
        flex: 1;
      }
      .body {
        padding: 8px 0;
      }
      .row {
        display: grid;
        grid-template-columns: 180px 110px 70px 1fr;
        gap: 10px;
        padding: 6px 12px;
        border-top: 1px solid rgba(255, 255, 255, 0.04);
        font-size: 12px;
        color: rgba(255, 255, 255, 0.84);
      }
      .row:first-child {
        border-top: none;
      }
      .ts,
      .svc {
        color: var(--faint);
      }
      .lvl {
        color: var(--muted);
      }
      .lvl[data-lvl='ERROR'] {
        color: var(--bad);
      }
      .lvl[data-lvl='WARN'] {
        color: var(--warn);
      }
      .lvl[data-lvl='INFO'] {
        color: var(--good);
      }
      .line {
        grid-column: 1 / -1;
        color: rgba(255, 255, 255, 0.84);
      }
      .empty {
        padding: 14px 12px;
        color: var(--muted);
        font-size: 12px;
      }
      @media (max-width: 980px) {
        .row {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogStreamComponent {
  @Input() title = 'logs';
  @Input() subtitle?: string;
  @Input() lines?: string[];
  @Input() entries?: LogEntry[];
}

