import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CartItem } from '../../../../core/models/cart.model';
import { CurrencyCopPipe } from '../../../../shared/pipes/currency-cop.pipe';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CurrencyCopPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="cart-item">
      <img [src]="item.product.thumbnail" [alt]="item.product.title" class="cart-item__img" />

      <div class="cart-item__details">
        <h4 class="cart-item__title">{{ item.product.title }}</h4>
        <span class="cart-item__price">{{ item.product.price | currencyCop }}</span>

        <div class="cart-item__qty">
          <button class="cart-item__qty-btn" (click)="decrease.emit()">−</button>
          <span class="cart-item__qty-value">{{ item.quantity }}</span>
          <button class="cart-item__qty-btn" (click)="increase.emit()">+</button>
        </div>
      </div>

      <button class="cart-item__remove" (click)="remove.emit()" aria-label="Eliminar">
        ✕
      </button>
    </div>
  `,
  styles: [`
    .cart-item {
      display: flex;
      gap: 14px;
      padding: 16px 0;
      border-bottom: 1px solid var(--color-border-light);
      align-items: flex-start;
      animation: fadeInUp 0.25s var(--ease-out);

      &:last-child { border-bottom: none; }

      &__img {
        width: 72px;
        height: 72px;
        object-fit: contain;
        border-radius: var(--radius-md);
        background: var(--color-bg-tertiary);
        flex-shrink: 0;
        padding: 6px;
      }

      &__details {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 4px;
        min-width: 0;
      }

      &__title {
        font-size: 14px;
        font-weight: 500;
        line-height: 1.35;
        color: var(--color-text);
        margin: 0;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      &__price {
        font-size: 14px;
        font-weight: 700;
        color: var(--color-text);
        letter-spacing: -0.01em;
      }

      &__qty {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        margin-top: 6px;
        background: var(--color-bg-tertiary);
        border-radius: var(--radius-full);
        padding: 2px;
        width: fit-content;
      }

      &__qty-btn {
        width: 26px;
        height: 26px;
        border-radius: 50%;
        border: none;
        background: transparent;
        font-size: 13px;
        font-weight: 600;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--color-text);
        transition: background-color 0.15s var(--ease-out);

        &:hover {
          background: #fff;
        }
      }

      &__qty-value {
        font-size: 13px;
        font-weight: 600;
        min-width: 22px;
        text-align: center;
        color: var(--color-text);
      }

      &__remove {
        background: none;
        border: none;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        color: var(--color-text-tertiary);
        font-size: 13px;
        padding: 0;
        flex-shrink: 0;
        margin-top: 2px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.18s var(--ease-out);

        &:hover {
          color: var(--color-danger);
          background: rgba(255, 59, 48, 0.08);
        }
      }
    }
  `]
})
export class CartItemComponent {
  @Input({ required: true }) item!: CartItem;
  @Output() increase = new EventEmitter<void>();
  @Output() decrease = new EventEmitter<void>();
  @Output() remove = new EventEmitter<void>();
}
