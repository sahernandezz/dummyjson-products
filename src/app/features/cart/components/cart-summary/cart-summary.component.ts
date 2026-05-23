import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CurrencyCopPipe } from '../../../../shared/pipes/currency-cop.pipe';

@Component({
  selector: 'app-cart-summary',
  standalone: true,
  imports: [CurrencyCopPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="cart-summary">
      <div class="cart-summary__row">
        <span>Subtotal ({{ totalItems }} artículos)</span>
        <span class="cart-summary__value">{{ totalPrice | currencyCop }}</span>
      </div>
      <div class="cart-summary__row cart-summary__row--total">
        <span>Total</span>
        <span class="cart-summary__total-value">{{ totalPrice | currencyCop }}</span>
      </div>
    </div>
  `,
  styles: [`
    .cart-summary {
      display: flex;
      flex-direction: column;
      gap: 10px;

      &__row {
        display: flex;
        justify-content: space-between;
        font-size: 13px;
        color: var(--color-text-secondary);

        &--total {
          padding-top: 12px;
          margin-top: 4px;
          border-top: 1px solid var(--color-border-light);
          font-weight: 600;
          color: var(--color-text);
          font-size: 15px;
          letter-spacing: -0.01em;
        }
      }

      &__value {
        font-weight: 500;
        color: var(--color-text);
      }

      &__total-value {
        font-size: 20px;
        font-weight: 700;
        letter-spacing: -0.025em;
      }
    }
  `]
})
export class CartSummaryComponent {
  @Input() totalItems = 0;
  @Input() totalPrice = 0;
}
