import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-code-block',
  standalone: true,
  template: `
    <div class="wrap panel-subtle">
      <div class="bar">
        <div class="label">{{ label }}</div>
        <div class="spacer"></div>
        <button type="button" class="btn" (click)="copy()" [disabled]="!text">copy</button>
      </div>
      <pre class="pre"><code>{{ text }}</code></pre>
    </div>
  `,
  styles: [
    `
      .wrap {
        overflow: hidden;
      }
      .bar {
        display: flex;
        gap: 10px;
        align-items: center;
        padding: 10px 12px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      }
      .label {
        color: var(--muted);
        font-size: 12px;
        letter-spacing: 0.06em;
        text-transform: uppercase;
      }
      .spacer {
        flex: 1;
      }
      .btn {
        font: inherit;
        font-size: 12px;
        padding: 6px 10px;
        border-radius: 12px;
        background: rgba(255, 255, 255, 0.06);
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: var(--muted);
        cursor: pointer;
      }
      .btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      .pre {
        margin: 0;
        padding: 12px;
        color: rgba(255, 255, 255, 0.86);
        font-size: 12px;
        line-height: 1.55;
        overflow: auto;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeBlockComponent {
  @Input() label = 'payload';
  @Input() text = '';

  async copy(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.text ?? '');
    } catch {
      // Clipboard might be blocked; ignoring is fine for this portfolio UI.
    }
  }
}

