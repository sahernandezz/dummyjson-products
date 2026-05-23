import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { NotificationService } from '../../core/services/notification.service';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CartItemComponent, CartSummaryComponent, EmptyStateComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cartService = inject(CartService);
  private notification = inject(NotificationService);
  private router = inject(Router);

  onIncrease(productId: number): void {
    const item = this.cartService.items().find(i => i.product.id === productId);
    if (item) {
      this.cartService.updateQuantity(productId, item.quantity + 1);
    }
  }

  onDecrease(productId: number): void {
    const item = this.cartService.items().find(i => i.product.id === productId);
    if (item) {
      this.cartService.updateQuantity(productId, item.quantity - 1);
    }
  }

  onRemove(productId: number): void {
    this.cartService.removeFromCart(productId);
    this.notification.show('Producto eliminado del carrito', 'info');
  }

  onClearCart(): void {
    this.cartService.clearCart();
    this.notification.show('Carrito vaciado', 'info');
  }

  onContinueShopping(): void {
    this.cartService.closeCart();
    this.router.navigate(['/']);
  }
}
