import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-detail-skeleton',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="detail-skel">
      <div class="detail-skel__content">
        <!-- Galería -->
        <div class="detail-skel__gallery">
          <div class="detail-skel__main-img skeleton-shimmer"></div>
          <div class="detail-skel__dots">
            <div class="skeleton-shimmer"></div>
            <div class="skeleton-shimmer"></div>
            <div class="skeleton-shimmer"></div>
            <div class="skeleton-shimmer"></div>
          </div>
        </div>

        <!-- Info -->
        <div class="detail-skel__info">
          <div class="detail-skel__line detail-skel__line--eyebrow skeleton-shimmer"></div>
          <div class="detail-skel__line detail-skel__line--title skeleton-shimmer"></div>
          <div class="detail-skel__line detail-skel__line--title-2 skeleton-shimmer"></div>
          <div class="detail-skel__line detail-skel__line--brand skeleton-shimmer"></div>

          <div class="detail-skel__rating-row">
            <div class="detail-skel__rating skeleton-shimmer"></div>
          </div>

          <div class="detail-skel__line detail-skel__line--desc skeleton-shimmer"></div>
          <div class="detail-skel__line detail-skel__line--desc-2 skeleton-shimmer"></div>
          <div class="detail-skel__line detail-skel__line--desc-3 skeleton-shimmer"></div>

          <div class="detail-skel__price skeleton-shimmer"></div>

          <div class="detail-skel__meta">
            <div class="detail-skel__meta-row">
              <div class="detail-skel__line detail-skel__line--meta-label skeleton-shimmer"></div>
              <div class="detail-skel__line detail-skel__line--meta-value skeleton-shimmer"></div>
            </div>
            <div class="detail-skel__meta-row">
              <div class="detail-skel__line detail-skel__line--meta-label skeleton-shimmer"></div>
              <div class="detail-skel__line detail-skel__line--meta-value skeleton-shimmer"></div>
            </div>
            <div class="detail-skel__meta-row">
              <div class="detail-skel__line detail-skel__line--meta-label skeleton-shimmer"></div>
              <div class="detail-skel__line detail-skel__line--meta-value skeleton-shimmer"></div>
            </div>
          </div>

          <div class="detail-skel__btn skeleton-shimmer"></div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .detail-skel {
      &__content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 56px;
        align-items: start;
      }

      /* Galería */
      &__gallery {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      &__main-img {
        aspect-ratio: 1 / 1;
        border-radius: 12px;
      }

      &__dots {
        display: flex;
        justify-content: center;
        gap: 6px;

        > div {
          width: 7px;
          height: 7px;
          border-radius: 50%;
        }
      }

      /* Info */
      &__info {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding-top: 4px;
      }

      &__line {
        height: 14px;
        border-radius: 4px;

        &--eyebrow { height: 12px; width: 30%; }
        &--title { height: 36px; width: 95%; border-radius: 6px; }
        &--title-2 { height: 36px; width: 70%; border-radius: 6px; }
        &--brand { height: 14px; width: 25%; margin-bottom: 6px; }
        &--desc { height: 14px; width: 100%; margin-top: 6px; }
        &--desc-2 { height: 14px; width: 90%; }
        &--desc-3 { height: 14px; width: 75%; margin-bottom: 6px; }
        &--meta-label { height: 12px; width: 30%; }
        &--meta-value { height: 12px; width: 40%; }
      }

      &__rating-row {
        display: flex;
        align-items: center;
        gap: 8px;
        margin: 4px 0;
      }

      &__rating {
        height: 16px;
        width: 130px;
        border-radius: 4px;
      }

      &__price {
        height: 36px;
        width: 45%;
        border-radius: 6px;
        margin-top: 8px;
      }

      &__meta {
        display: flex;
        flex-direction: column;
        gap: 14px;
        padding: 20px 0;
        margin: 10px 0;
        border-top: 1px solid var(--color-border-light);
        border-bottom: 1px solid var(--color-border-light);
      }

      &__meta-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 12px;
      }

      &__btn {
        height: 50px;
        border-radius: 12px;
        margin-top: 4px;
      }

      /* Responsive */
      @media (max-width: 900px) {
        &__content {
          grid-template-columns: 1fr;
          gap: 32px;
        }
      }

      @media (max-width: 480px) {
        &__line {
          &--title, &--title-2 { height: 26px; }
        }
        &__price { height: 28px; }
        &__btn { height: 46px; }
      }
    }
  `]
})
export class DetailSkeletonComponent {}
