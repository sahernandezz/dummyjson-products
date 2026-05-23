import { Component, Input, OnChanges, SimpleChanges, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { ProductService } from '../../../../core/services/product.service';
import { CartService } from '../../../../core/services/cart.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { Product } from '../../../../core/models/product.model';
import { ProductCardComponent } from '../../../catalog/components/product-card/product-card.component';

@Component({
  selector: 'app-related-products',
  standalone: true,
  imports: [ProductCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './related-products.component.html',
  styleUrl: './related-products.component.scss'
})
export class RelatedProductsComponent implements OnChanges {
  @Input({ required: true }) category!: string;
  @Input({ required: true }) excludeId!: number;

  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private notification = inject(NotificationService);

  products = signal<Product[]>([]);
  isLoading = signal(true);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['category'] || changes['excludeId']) {
      this.loadRelated();
    }
  }

  onAddToCart(product: Product): void {
    this.cartService.addToCart(product);
    this.notification.show(`${product.title} agregado al carrito`);
  }

  scrollLeft(): void {
    this.scrollContainer(-320);
  }

  scrollRight(): void {
    this.scrollContainer(320);
  }

  private scrollContainer(amount: number): void {
    const el = document.getElementById('related-scroll');
    if (el) {
      el.scrollBy({ left: amount, behavior: 'smooth' });
    }
  }

  private loadRelated(): void {
    if (!this.category) return;
    this.isLoading.set(true);

    this.productService.getProductsByCategory(this.category, 10, 0).subscribe({
      next: (response) => {
        const filtered = response.products.filter(p => p.id !== this.excludeId);
        this.products.set(filtered);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false)
    });
  }
}
