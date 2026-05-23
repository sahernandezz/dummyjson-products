import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-loading-skeleton',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="skeleton-grid">
      @for (item of skeletonItems; track item) {
        <div class="skeleton-card">
          <div class="skeleton-card__image skeleton-shimmer"></div>
          <div class="skeleton-card__body">
            <div class="skeleton-card__line skeleton-shimmer" style="width: 60%"></div>
            <div class="skeleton-card__line skeleton-card__line--short skeleton-shimmer" style="width: 40%"></div>
            <div class="skeleton-card__line skeleton-card__line--price skeleton-shimmer" style="width: 30%"></div>
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
      border-radius: var(--radius-lg);
      overflow: hidden;
      background: #fff;
      border: 1px solid var(--color-border-light);

      &__image {
        aspect-ratio: 1 / 1;
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

        &--short { height: 12px; }
        &--price { height: 20px; }
      }
    }

    @media (max-width: 480px) {
      .skeleton-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
      }
    }
  `]
})
export class LoadingSkeletonComponent {
  @Input() count = 8;

  get skeletonItems(): number[] {
    return Array.from({ length: this.count }, (_, i) => i);
  }
}
