import { Component, inject, OnInit, OnDestroy, signal, computed, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil, switchMap, tap, finalize } from 'rxjs';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { NotificationService } from '../../core/services/notification.service';
import { Product } from '../../core/models/product.model';
import { SortOption, SortControlsComponent } from './components/sort-controls/sort-controls.component';
import { FilterBarComponent } from './components/filter-bar/filter-bar.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { LoadingSkeletonComponent } from '../../shared/components/loading-skeleton/loading-skeleton.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [
    SortControlsComponent,
    FilterBarComponent,
    ProductCardComponent,
    LoadingSkeletonComponent,
    EmptyStateComponent
  ],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss'
})
export class CatalogComponent implements OnInit, OnDestroy {
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private notification = inject(NotificationService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private destroy$ = new Subject<void>();

  // estado
  products = signal<Product[]>([]);
  categories = signal<string[]>([]);
  isLoading = signal(true);
  isLoadingMore = signal(false);
  currentSort = signal<SortOption>('default');
  selectedCategory = signal('');
  searchQuery = signal('');
  totalProducts = signal(0);

  private readonly pageSize = 20;
  private currentSkip = 0;

  // computed
  hasMore = computed(() => this.products().length < this.totalProducts());

  sortedProducts = computed(() => {
    const items = [...this.products()];
    const sort = this.currentSort();

    switch (sort) {
      case 'price-asc':
        return items.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return items.sort((a, b) => b.price - a.price);
      case 'rating-asc':
        return items.sort((a, b) => a.rating - b.rating);
      case 'rating-desc':
        return items.sort((a, b) => b.rating - a.rating);
      default:
        return items;
    }
  });

  ngOnInit(): void {
    // cargar categorías
    this.productService.getCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe(cats => this.categories.set(cats));

    // escuchar cambios en query params (búsqueda + categoría)
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        const query = params['q'] || '';
        const category = params['category'] || '';
        this.searchQuery.set(query);
        this.selectedCategory.set(category);
        this.resetAndLoad();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSortChange(sort: SortOption): void {
    this.currentSort.set(sort);
  }

  onCategoryChange(category: string): void {
    // actualizar URL — el suscriptor de queryParams hará el resto
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { category: category || null },
      queryParamsHandling: 'merge'
    });
  }

  onAddToCart(product: Product): void {
    this.cartService.addToCart(product);
    this.notification.show(`${product.title} agregado al carrito`);
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (this.isLoadingMore() || !this.hasMore()) return;

    const scrollPos = window.innerHeight + window.scrollY;
    const docHeight = document.documentElement.scrollHeight;

    // cargar más cuando falta 300px para el final
    if (scrollPos >= docHeight - 300) {
      this.loadMore();
    }
  }

  trackByProductId(_index: number, product: Product): number {
    return product.id;
  }

  private resetAndLoad(): void {
    this.currentSkip = 0;
    this.products.set([]);
    this.isLoading.set(true);
    this.loadProducts();
  }

  private loadMore(): void {
    this.isLoadingMore.set(true);
    this.loadProducts();
  }

  private loadProducts(): void {
    const query = this.searchQuery();
    const category = this.selectedCategory();

    let request$;

    if (query) {
      request$ = this.productService.searchProducts(query, this.pageSize, this.currentSkip);
    } else if (category) {
      request$ = this.productService.getProductsByCategory(category, this.pageSize, this.currentSkip);
    } else {
      request$ = this.productService.getProducts(this.pageSize, this.currentSkip);
    }

    request$
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.isLoading.set(false);
          this.isLoadingMore.set(false);
        })
      )
      .subscribe(response => {
        this.products.update(current => [...current, ...response.products]);
        this.totalProducts.set(response.total);
        this.currentSkip += response.products.length;
      });
  }
}
