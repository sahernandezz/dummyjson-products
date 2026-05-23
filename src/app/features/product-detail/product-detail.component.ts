import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { switchMap, finalize } from 'rxjs';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { NotificationService } from '../../core/services/notification.service';
import { Product } from '../../core/models/product.model';
import { ImageCarouselComponent } from '../../shared/components/image-carousel/image-carousel.component';
import { ProductInfoComponent } from './components/product-info/product-info.component';
import { ProductDimensionsComponent } from './components/product-dimensions/product-dimensions.component';
import { ProductReviewsComponent } from './components/product-reviews/product-reviews.component';
import { DetailSkeletonComponent } from './components/detail-skeleton/detail-skeleton.component';
import { RelatedProductsComponent } from './components/related-products/related-products.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    RouterLink,
    ImageCarouselComponent,
    ProductInfoComponent,
    ProductDimensionsComponent,
    ProductReviewsComponent,
    DetailSkeletonComponent,
    RelatedProductsComponent
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private notification = inject(NotificationService);

  product = signal<Product | null>(null);
  isLoading = signal(true);
  hasError = signal(false);

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap(params => {
          this.isLoading.set(true);
          this.hasError.set(false);
          // scroll al top al cambiar de producto
          window.scrollTo({ top: 0, behavior: 'smooth' });
          const id = Number(params['id']);
          return this.productService.getProductById(id);
        }),
        finalize(() => this.isLoading.set(false))
      )
      .subscribe({
        next: (product) => {
          this.product.set(product);
          this.isLoading.set(false);
        },
        error: () => {
          this.hasError.set(true);
          this.isLoading.set(false);
        }
      });
  }

  onAddToCart(): void {
    const p = this.product();
    if (p) {
      this.cartService.addToCart(p);
      this.notification.show(`${p.title} agregado al carrito`);
    }
  }
}
