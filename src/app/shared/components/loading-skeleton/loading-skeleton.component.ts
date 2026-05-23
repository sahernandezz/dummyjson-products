import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-loading-skeleton',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="skeleton-grid">
      @for (item of skeletonItems; track item) {
        <div class="skeleton-card">
          <div class="skeleton-card__image skeleton-pulse"></div>
          <div class="skeleton-card__body">
            <div class="skeleton-card__line skeleton-pulse" style="width: 60%"></div>
            <div class="skeleton-card__line skeleton-card__line--short skeleton-pulse" style="width: 40%"></div>
            <div class="skeleton-card__line skeleton-card__line--price skeleton-pulse" style="width: 30%"></div>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .skeleton-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 24px;
    }

    .skeleton-card {
      border-radius: 16px;
      overflow: hidden;
      background: #fff;

      &__image {
        aspect-ratio: 1 / 1;
        background: #f5f5f7;
      }

      &__body {
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      &__line {
        height: 14px;
        border-radius: 4px;
        background: #f5f5f7;

        &--short { height: 12px; }
        &--price { height: 18px; }
      }
    }

    .skeleton-pulse {
      animation: pulse 1.5s ease-in-out infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.4; }
    }
  `]
})
export class LoadingSkeletonComponent {
  @Input() count = 8;

  get skeletonItems(): number[] {
    return Array.from({ length: this.count }, (_, i) => i);
  }
}
