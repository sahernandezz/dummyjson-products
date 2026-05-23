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
      gap: 12px;
      padding: 14px 0;
      border-bottom: 1px solid #f0f0f0;
      align-items: flex-start;

      &__img {
        width: 64px;
        height: 64px;
        object-fit: contain;
        border-radius: 8px;
        background: #f5f5f7;
        flex-shrink: 0;
        padding: 4px;
      }

      &__details {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      &__title {
        font-size: 14px;
        font-weight: 500;
        color: #1d1d1f;
        margin: 0;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      &__price {
        font-size: 14px;
        font-weight: 600;
        color: #1d1d1f;
      }

      &__qty {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-top: 4px;
      }

      &__qty-btn {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        border: 1px solid #d2d2d7;
        background: #fff;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #1d1d1f;

        &:hover {
          background: #f5f5f7;
        }
      }

      &__qty-value {
        font-size: 14px;
        font-weight: 500;
        min-width: 20px;
        text-align: center;
      }

      &__remove {
        background: none;
        border: none;
        color: #6e6e73;
        font-size: 14px;
        padding: 4px;
        flex-shrink: 0;
        margin-top: 2px;

        &:hover {
          color: #ff3b30;
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
