import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Dimensions } from '../../../../core/models/product.model';

@Component({
  selector: 'app-product-dimensions',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="dimensions">
      <h3 class="dimensions__title">Dimensiones</h3>
      <div class="dimensions__grid">
        <div class="dimensions__item">
          <span class="dimensions__label">Ancho</span>
          <span class="dimensions__value">{{ dimensions.width }} cm</span>
        </div>
        <div class="dimensions__item">
          <span class="dimensions__label">Alto</span>
          <span class="dimensions__value">{{ dimensions.height }} cm</span>
        </div>
        <div class="dimensions__item">
          <span class="dimensions__label">Profundidad</span>
          <span class="dimensions__value">{{ dimensions.depth }} cm</span>
        </div>
        <div class="dimensions__item">
          <span class="dimensions__label">Peso</span>
          <span class="dimensions__value">{{ weight }} g</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dimensions {
      &__title {
        font-size: 18px;
        font-weight: 600;
        margin: 0 0 16px;
        color: #1d1d1f;
      }

      &__grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
      }

      &__item {
        background: #f5f5f7;
        padding: 14px 16px;
        border-radius: 12px;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      &__label {
        font-size: 12px;
        color: #6e6e73;
        text-transform: uppercase;
        letter-spacing: 0.03em;
      }

      &__value {
        font-size: 16px;
        font-weight: 600;
        color: #1d1d1f;
      }
    }
  `]
})
export class ProductDimensionsComponent {
  @Input({ required: true }) dimensions!: Dimensions;
  @Input() weight = 0;
}
