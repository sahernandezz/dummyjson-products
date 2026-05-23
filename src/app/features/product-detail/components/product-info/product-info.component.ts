import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
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
  @Input({ required: true }) product!: Product;
  @Output() addToCart = new EventEmitter<void>();
}
