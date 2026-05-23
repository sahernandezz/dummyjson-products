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
      padding-top: 16px;
      border-top: 1px solid #d2d2d7;
      display: flex;
      flex-direction: column;
      gap: 8px;

      &__row {
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        color: #6e6e73;

        &--total {
          padding-top: 8px;
          font-weight: 600;
          color: #1d1d1f;
          font-size: 16px;
        }
      }

      &__value {
        font-weight: 500;
      }

      &__total-value {
        font-size: 18px;
      }
    }
  `]
})
export class CartSummaryComponent {
  @Input() totalItems = 0;
  @Input() totalPrice = 0;
}
