import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="panel wrap">
      <div class="k">404</div>
      <div class="t">route not found</div>
      <div class="hr"></div>
      <a class="btn" routerLink="/">go to dashboard</a>
    </div>
  `,
  styles: [
    `
      .wrap {
        padding: 16px;
        border-radius: 16px;
        max-width: 520px;
      }
      .k {
        color: var(--muted);
        font-size: 12px;
        letter-spacing: 0.06em;
        text-transform: uppercase;
      }
      .t {
        margin-top: 10px;
        font-size: 18px;
        font-weight: 900;
        letter-spacing: -0.03em;
      }
      .btn {
        display: inline-flex;
        margin-top: 10px;
        font-size: 12px;
        padding: 8px 12px;
        border-radius: 12px;
        cursor: pointer;
        background: rgba(102, 166, 255, 0.12);
        border: 1px solid rgba(102, 166, 255, 0.25);
        color: rgba(255, 255, 255, 0.92);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundPage {}

