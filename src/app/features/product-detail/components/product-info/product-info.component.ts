import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, computed, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Product } from '../../../../core/models/product.model';
import { CurrencyCopPipe } from '../../../../shared/pipes/currency-cop.pipe';
import { StarRatingComponent } from '../../../../shared/components/star-rating/star-rating.component';

@Component({
  selector: 'app-product-info',
  standalone: true,
  imports: [DecimalPipe, CurrencyCopPipe, StarRatingComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './product-info.component.html',
  styleUrl: './product-info.component.scss'
})
export class ProductInfoComponent {
  private _product = signal<Product | null>(null);

  @Input({ required: true })
  set product(value: Product) {
    this._product.set(value);
  }
  get product(): Product {
    return this._product()!;
  }

  @Output() addToCart = new EventEmitter<void>();

  /**
   * Calcula el precio original antes del descuento
   */
  originalPrice = computed(() => {
    const p = this._product();
    if (!p || p.discountPercentage <= 0) return 0;
    return p.price / (1 - p.discountPercentage / 100);
  });
}
