import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="filter-bar">
      <button
        class="filter-bar__chip"
        [class.filter-bar__chip--active]="!selectedCategory"
        (click)="onCategorySelect('')">
        Todos
      </button>
      @for (cat of categories; track cat) {
        <button
          class="filter-bar__chip"
          [class.filter-bar__chip--active]="selectedCategory === cat"
          (click)="onCategorySelect(cat)">
          {{ cat }}
        </button>
      }
    </div>
  `,
  styles: [`
    .filter-bar {
      display: flex;
      gap: 8px;
      overflow-x: auto;
      padding: 4px 0;
      scrollbar-width: none;

      &::-webkit-scrollbar { display: none; }

      &__chip {
        white-space: nowrap;
        padding: 7px 16px;
        border-radius: 20px;
        border: 1px solid #d2d2d7;
        background: #fff;
        color: #1d1d1f;
        font-size: 13px;
        font-weight: 500;
        font-family: inherit;
        transition: all 0.2s ease;
        flex-shrink: 0;

        &:hover:not(&--active) {
          background: #f5f5f7;
        }

        &--active {
          background: #1d1d1f;
          color: #fff;
          border-color: #1d1d1f;
        }
      }
    }
  `]
})
export class FilterBarComponent {
  @Input() categories: string[] = [];
  @Input() selectedCategory = '';
  @Output() categoryChange = new EventEmitter<string>();

  onCategorySelect(category: string): void {
    this.categoryChange.emit(category);
  }
}
