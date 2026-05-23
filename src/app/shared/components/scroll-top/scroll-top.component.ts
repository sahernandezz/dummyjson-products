import { Component, HostListener, signal, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-scroll-top',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (visible()) {
      <button
        class="scroll-top"
        (click)="scrollToTop()"
        aria-label="Volver arriba">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5"/>
        </svg>
      </button>
    }
  `,
  styles: [`
    .scroll-top {
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      border: 1px solid var(--color-border-light);
      background: rgba(255, 255, 255, 0.92);
      backdrop-filter: saturate(180%) blur(20px);
      color: var(--color-text);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 90;
      box-shadow: var(--shadow-lg);
      animation: scaleIn 0.25s var(--ease-spring);
      transition: transform 0.2s var(--ease-spring), background-color 0.18s var(--ease-out);

      svg {
        width: 18px;
        height: 18px;
      }

      &:hover {
        background: #fff;
        transform: translateY(-2px);
      }

      &:active {
        transform: translateY(0) scale(0.94);
      }
    }

    @media (max-width: 480px) {
      .scroll-top {
        bottom: 16px;
        right: 16px;
        width: 40px;
        height: 40px;
      }
    }
  `]
})
export class ScrollTopComponent {
  visible = signal(false);

  @HostListener('window:scroll')
  onScroll(): void {
    // mostrar el botón cuando se haya scrolleado más de 400px
    this.visible.set(window.scrollY > 400);
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
