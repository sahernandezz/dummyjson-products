import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Review } from '../../../../core/models/product.model';
import { StarRatingComponent } from '../../../../shared/components/star-rating/star-rating.component';

@Component({
  selector: 'app-product-reviews',
  standalone: true,
  imports: [DatePipe, StarRatingComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './product-reviews.component.html',
  styleUrl: './product-reviews.component.scss'
})
export class ProductReviewsComponent {
  @Input() reviews: Review[] = [];
}
