import { Injectable, computed, effect, signal } from '@angular/core';
import { CartItem } from '../models/cart.model';
import { Product } from '../models/product.model';

const STORAGE_KEY = 'cart_v1';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = signal<CartItem[]>(this.loadFromStorage());

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

  constructor() {
    // Persiste automáticamente cualquier cambio del carrito en localStorage
    effect(() => {
      this.saveToStorage(this.cartItems());
    });
  }

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

  // ============================================
  // Persistencia en localStorage
  // ============================================

  /**
   * Carga el carrito desde localStorage. Tolerante a errores (SSR,
   * modo privado del navegador, datos corruptos).
   */
  private loadFromStorage(): CartItem[] {
    if (typeof localStorage === 'undefined') return [];

    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];

      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];

      // Filtrado defensivo: solo items con la forma esperada
      return parsed.filter(this.isValidCartItem);
    } catch {
      // JSON corrupto o cualquier error: empezar limpio
      return [];
    }
  }

  /**
   * Guarda el carrito en localStorage
   */
  private saveToStorage(items: CartItem[]): void {
    if (typeof localStorage === 'undefined') return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // QuotaExceededError u otros — ignoramos silenciosamente
    }
  }

  /**
   * Valida que un objeto tenga la forma de CartItem
   */
  private isValidCartItem(item: unknown): item is CartItem {
    if (!item || typeof item !== 'object') return false;
    const candidate = item as Partial<CartItem>;
    return (
      candidate.product != null &&
      typeof candidate.product === 'object' &&
      typeof candidate.product.id === 'number' &&
      typeof candidate.quantity === 'number' &&
      candidate.quantity > 0
    );
  }
}
