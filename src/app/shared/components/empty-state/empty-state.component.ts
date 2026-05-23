import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="empty-state">
      <span class="empty-state__icon">{{ icon }}</span>
      <h3 class="empty-state__title">{{ title }}</h3>
      <p class="empty-state__message">{{ message }}</p>
    </div>
  `,
  styles: [`
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 80px 24px;
      text-align: center;
      animation: fadeInUp 0.4s var(--ease-out);

      &__icon {
        font-size: 56px;
        margin-bottom: 20px;
        opacity: 0.7;
      }

      &__title {
        font-size: 20px;
        font-weight: 700;
        letter-spacing: -0.02em;
        color: var(--color-text);
        margin-bottom: 8px;
      }

      &__message {
        font-size: 14px;
        color: var(--color-text-secondary);
        max-width: 320px;
        line-height: 1.5;
      }
    }
  `]
})
export class EmptyStateComponent {
  @Input() icon = '🔍';
  @Input() title = 'Sin resultados';
  @Input() message = 'No encontramos productos que coincidan con tu búsqueda.';
}
