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
      padding: 2px 0;
      scrollbar-width: none;
      -webkit-overflow-scrolling: touch;
      mask-image: linear-gradient(to right, #000 0, #000 calc(100% - 24px), transparent 100%);

      &::-webkit-scrollbar { display: none; }

      &__chip {
        white-space: nowrap;
        padding: 8px 16px;
        border-radius: 999px;
        border: 1px solid var(--color-border-light);
        background: #fff;
        color: var(--color-text);
        font-size: 13px;
        font-weight: 500;
        font-family: inherit;
        letter-spacing: -0.005em;
        transition: all 0.2s var(--ease-out);
        flex-shrink: 0;
        text-transform: capitalize;

        &:hover:not(&--active) {
          background: var(--color-bg-tertiary);
          border-color: var(--color-border);
          transform: translateY(-1px);
        }

        &:active {
          transform: scale(0.96);
        }

        &--active {
          background: var(--color-text);
          color: #fff;
          border-color: var(--color-text);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
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
