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

  next(event?: Event): void {
    this.stopBubble(event);
    if (this.images.length === 0) return;
    this.currentIndex.update(i => (i + 1) % this.images.length);
  }

  prev(event?: Event): void {
    this.stopBubble(event);
    if (this.images.length === 0) return;
    this.currentIndex.update(i => (i - 1 + this.images.length) % this.images.length);
  }

  goTo(index: number, event?: Event): void {
    this.stopBubble(event);
    this.currentIndex.set(index);
  }

  /**
   * Evita que el click se propague al elemento padre (ej. <a routerLink>)
   * para que los controles del carrusel no abran el producto
   */
  private stopBubble(event?: Event): void {
    event?.stopPropagation();
    event?.preventDefault();
  }
}
