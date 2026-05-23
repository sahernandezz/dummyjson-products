import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="stars" [attr.aria-label]="'Calificación: ' + rating + ' de 5'">
      @for (star of starsArray; track star) {
        <span class="star" [class.star--filled]="star <= Math.floor(rating)"
              [class.star--half]="star === Math.ceil(rating) && rating % 1 >= 0.3 && rating % 1 <= 0.7">
          ★
        </span>
      }
      <span class="rating-text">{{ rating.toFixed(1) }}</span>
    </div>
  `,
  styles: [`
    .stars {
      display: inline-flex;
      align-items: center;
      gap: 1px;
    }
    .star {
      color: var(--color-border);
      font-size: 14px;
      line-height: 1;
      transition: color 0.2s var(--ease-out);
    }
    .star--filled {
      color: #ff9500;
    }
    .star--half {
      color: #ffb84d;
    }
    .rating-text {
      margin-left: 8px;
      font-size: 13px;
      color: var(--color-text-secondary);
      font-weight: 600;
      letter-spacing: -0.005em;
    }
  `]
})
export class StarRatingComponent {
  @Input() rating = 0;

  starsArray = [1, 2, 3, 4, 5];
  Math = Math;
}
