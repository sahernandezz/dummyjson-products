import { Component, Input, ChangeDetectionStrategy, signal } from '@angular/core';
import { LazyImageDirective } from '../../directives/lazy-image.directive';

@Component({
  selector: 'app-image-carousel',
  standalone: true,
  imports: [LazyImageDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './image-carousel.component.html',
  styleUrl: './image-carousel.component.scss'
})
export class ImageCarouselComponent {
  @Input() images: string[] = [];
  @Input() alt = 'Imagen del producto';

  currentIndex = signal(0);

  next(): void {
    if (this.images.length === 0) return;
    this.currentIndex.update(i => (i + 1) % this.images.length);
  }

  prev(): void {
    if (this.images.length === 0) return;
    this.currentIndex.update(i => (i - 1 + this.images.length) % this.images.length);
  }

  goTo(index: number): void {
    this.currentIndex.set(index);
  }
}
