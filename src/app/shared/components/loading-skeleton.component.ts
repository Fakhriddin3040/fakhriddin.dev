import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-loading-skeleton',
  standalone: true,
  imports: [NgFor],
  template: `
    <div class="grid">
      <div class="sk panel" *ngFor="let _ of items"></div>
    </div>
  `,
  styles: [
    `
      .grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 12px;
      }
      .sk {
        height: 96px;
        position: relative;
        overflow: hidden;
        border-radius: 16px;
      }
      .sk::after {
        content: '';
        position: absolute;
        inset: -40% -30%;
        transform: rotate(8deg);
        background: linear-gradient(
          90deg,
          transparent,
          rgba(255, 255, 255, 0.08),
          transparent
        );
        animation: shimmer 1.2s infinite;
      }
      @keyframes shimmer {
        0% {
          transform: translateX(-40%) rotate(8deg);
        }
        100% {
          transform: translateX(40%) rotate(8deg);
        }
      }
      @media (max-width: 980px) {
        .grid {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingSkeletonComponent {
  @Input() count = 6;
  get items(): unknown[] {
    return Array.from({ length: Math.max(1, this.count) });
  }
}

