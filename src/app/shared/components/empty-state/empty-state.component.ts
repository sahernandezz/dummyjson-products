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
      padding: 64px 24px;
      text-align: center;

      &__icon {
        font-size: 48px;
        margin-bottom: 16px;
      }

      &__title {
        font-size: 20px;
        font-weight: 600;
        color: #1d1d1f;
        margin-bottom: 8px;
      }

      &__message {
        font-size: 15px;
        color: #6e6e73;
        max-width: 360px;
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
