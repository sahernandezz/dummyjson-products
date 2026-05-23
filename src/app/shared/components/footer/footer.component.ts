import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="footer">
      <div class="footer__container">
        <div class="footer__brand">
          <span class="footer__logo">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 7L12 2L21 7V17L12 22L3 17V7Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
              <path d="M3 7L12 12L21 7" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
              <path d="M12 12V22" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
            </svg>
          </span>
          <span class="footer__brand-name">Catálogo</span>
        </div>

        <p class="footer__text">
          Datos provistos por
          <a href="https://dummyjson.com" target="_blank" rel="noopener">DummyJSON</a>.
          Prueba técnica desarrollada con Angular {{ angularVersion }}.
        </p>

        <div class="footer__meta">
          <span>© {{ currentYear }}</span>
          <span class="footer__dot">·</span>
          <a href="https://github.com/sahernandezz/dummyjson-products" target="_blank" rel="noopener">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      margin-top: 64px;
      padding: 48px 0 40px;
      border-top: 1px solid var(--color-border-light);
      background: var(--color-bg-secondary);

      &__container {
        max-width: var(--max-width);
        margin: 0 auto;
        padding: 0 28px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 14px;
        text-align: center;
      }

      &__brand {
        display: flex;
        align-items: center;
        gap: 10px;
        color: var(--color-text);
      }

      &__logo {
        width: 22px;
        height: 22px;
        color: var(--color-primary);
        display: flex;

        svg { width: 100%; height: 100%; }
      }

      &__brand-name {
        font-size: 15px;
        font-weight: 600;
        letter-spacing: -0.01em;
      }

      &__text {
        font-size: 13px;
        color: var(--color-text-secondary);
        line-height: 1.6;
        max-width: 540px;
        margin: 0;

        a {
          color: var(--color-text);
          font-weight: 500;
          text-decoration: underline;
          text-decoration-color: var(--color-border);
          text-underline-offset: 3px;
          transition: text-decoration-color 0.18s var(--ease-out);

          &:hover {
            text-decoration-color: var(--color-primary);
          }
        }
      }

      &__meta {
        font-size: 12px;
        color: var(--color-text-tertiary);
        display: flex;
        align-items: center;
        gap: 8px;

        a {
          color: var(--color-text-secondary);
          font-weight: 500;
          text-decoration: none;

          &:hover {
            color: var(--color-text);
          }
        }
      }

      &__dot {
        opacity: 0.6;
      }
    }

    @media (max-width: 480px) {
      .footer {
        padding: 36px 0 32px;
        margin-top: 40px;
      }
    }
  `]
})
export class FooterComponent {
  readonly currentYear = new Date().getFullYear();
  readonly angularVersion = '21';
}
