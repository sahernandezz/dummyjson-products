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
        color: var(--color-text-secondary);
        white-space: nowrap;
        font-weight: 500;
      }

      &__select {
        appearance: none;
        padding: 9px 36px 9px 14px;
        border: 1px solid var(--color-border-light);
        border-radius: var(--radius-md);
        font-size: 13px;
        font-weight: 500;
        color: var(--color-text);
        background: #fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10'%3E%3Cpath d='M5 7L1 3h8z' fill='%236e6e73'/%3E%3C/svg%3E") no-repeat right 14px center;
        cursor: pointer;
        outline: none;
        font-family: inherit;
        transition: all 0.18s var(--ease-out);

        &:hover {
          border-color: var(--color-border);
          background-color: var(--color-bg-tertiary);
        }

        &:focus {
          border-color: var(--color-primary);
          box-shadow: 0 0 0 3px rgba(0, 113, 227, 0.12);
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
