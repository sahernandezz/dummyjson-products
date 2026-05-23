import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

export type SortOption = 'default' | 'price-asc' | 'price-desc' | 'rating-asc' | 'rating-desc';

@Component({
  selector: 'app-sort-controls',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="sort-controls">
      <label class="sort-controls__label" for="sortSelect">Ordenar por:</label>
      <select
        id="sortSelect"
        class="sort-controls__select"
        [value]="currentSort"
        (change)="onSortChange($event)">
        <option value="default">Relevancia</option>
        <option value="price-asc">Precio: menor a mayor</option>
        <option value="price-desc">Precio: mayor a menor</option>
        <option value="rating-desc">Mejor calificación</option>
        <option value="rating-asc">Menor calificación</option>
      </select>
    </div>
  `,
  styles: [`
    .sort-controls {
      display: flex;
      align-items: center;
      gap: 10px;

      &__label {
        font-size: 13px;
        color: #6e6e73;
        white-space: nowrap;
      }

      &__select {
        appearance: none;
        padding: 8px 32px 8px 12px;
        border: 1px solid #d2d2d7;
        border-radius: 8px;
        font-size: 14px;
        color: #1d1d1f;
        background: #fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M6 8L1 3h10z' fill='%236e6e73'/%3E%3C/svg%3E") no-repeat right 10px center;
        cursor: pointer;
        outline: none;
        font-family: inherit;

        &:focus {
          border-color: #0071e3;
        }
      }
    }
  `]
})
export class SortControlsComponent {
  @Input() currentSort: SortOption = 'default';
  @Output() sortChange = new EventEmitter<SortOption>();

  onSortChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value as SortOption;
    this.sortChange.emit(value);
  }
}
