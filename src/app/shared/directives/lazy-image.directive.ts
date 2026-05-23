import { Directive, ElementRef, Input, OnInit, OnDestroy, OnChanges, SimpleChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appLazyImage]',
  standalone: true
})
export class LazyImageDirective implements OnInit, OnChanges, OnDestroy {
  @Input('appLazyImage') src = '';
  @Input() placeholderSrc = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2Y1ZjVmNyIvPjwvc3ZnPg==';

  private observer: IntersectionObserver | null = null;
  private hasLoaded = false;

  constructor(
    private el: ElementRef<HTMLImageElement>,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    // mostrar placeholder mientras carga
    this.renderer.setAttribute(this.el.nativeElement, 'src', this.placeholderSrc);

    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              this.loadImage();
              this.observer?.unobserve(entry.target);
            }
          });
        },
        { rootMargin: '100px' }
      );
      this.observer.observe(this.el.nativeElement);
    } else {
      this.loadImage();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // si el src cambia después de la carga inicial (ej: navegación en carrusel),
    // actualizar la imagen directamente sin esperar al observer
    if (changes['src'] && !changes['src'].firstChange && this.hasLoaded) {
      this.loadImage();
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private loadImage(): void {
    if (!this.isValidUrl(this.src)) {
      return;
    }
    this.renderer.setAttribute(this.el.nativeElement, 'src', this.src);
    this.hasLoaded = true;
  }

  /**
   * Valida que la URL sea segura antes de cargarla
   */
  private isValidUrl(url: string): boolean {
    if (!url) return false;
    try {
      const parsed = new URL(url);
      return ['http:', 'https:'].includes(parsed.protocol);
    } catch {
      return false;
    }
  }
}
