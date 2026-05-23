import { Injectable, computed, signal } from '@angular/core';
import { CartItem } from '../models/cart.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = signal<CartItem[]>([]);

  readonly items = this.cartItems.asReadonly();

  readonly totalItems = computed(() =>
    this.cartItems().reduce((acc, item) => acc + item.quantity, 0)
  );

  readonly totalPrice = computed(() =>
    this.cartItems().reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    )
  );

  readonly isCartOpen = signal(false);

  /**
   * Agrega un producto al carrito o incrementa su cantidad
   */
  addToCart(product: Product): void {
    const currentItems = this.cartItems();
    const existingIndex = currentItems.findIndex(
      item => item.product.id === product.id
    );

    if (existingIndex >= 0) {
      const updated = [...currentItems];
      updated[existingIndex] = {
        ...updated[existingIndex],
        quantity: updated[existingIndex].quantity + 1
      };
      this.cartItems.set(updated);
    } else {
      this.cartItems.set([...currentItems, { product, quantity: 1 }]);
    }
  }

  /**
   * Elimina un producto completamente del carrito
   */
  removeFromCart(productId: number): void {
    this.cartItems.set(
      this.cartItems().filter(item => item.product.id !== productId)
    );
  }

  /**
   * Actualiza la cantidad de un producto
   */
  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    const updated = this.cartItems().map(item =>
      item.product.id === productId ? { ...item, quantity } : item
    );
    this.cartItems.set(updated);
  }

  /**
   * Vacía el carrito completo
   */
  clearCart(): void {
    this.cartItems.set([]);
  }

  toggleCart(): void {
    this.isCartOpen.update(open => !open);
  }

  openCart(): void {
    this.isCartOpen.set(true);
  }

  closeCart(): void {
    this.isCartOpen.set(false);
  }
}
