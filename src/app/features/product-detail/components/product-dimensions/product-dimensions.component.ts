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
        font-size: 20px;
        font-weight: 700;
        letter-spacing: -0.02em;
        margin: 0 0 22px;
        color: var(--color-text);
      }

      &__grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
      }

      &__item {
        background: var(--color-bg-secondary);
        padding: 16px 18px;
        border-radius: var(--radius-md);
        display: flex;
        flex-direction: column;
        gap: 4px;
        border: 1px solid var(--color-border-light);
        transition: background-color 0.2s var(--ease-out), transform 0.2s var(--ease-out);

        &:hover {
          background: var(--color-bg-tertiary);
          transform: translateY(-1px);
        }
      }

      &__label {
        font-size: 11px;
        color: var(--color-text-tertiary);
        text-transform: uppercase;
        letter-spacing: 0.06em;
        font-weight: 500;
      }

      &__value {
        font-size: 17px;
        font-weight: 700;
        color: var(--color-text);
        letter-spacing: -0.015em;
      }
    }
  `]
})
export class ProductDimensionsComponent {
  @Input({ required: true }) dimensions!: Dimensions;
  @Input() weight = 0;
}
