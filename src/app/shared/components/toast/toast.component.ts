import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="toast-container">
      @for (toast of notificationService.toasts(); track toast.id) {
        <div class="toast" [class]="'toast--' + toast.type">
          <span class="toast__icon">
            @switch (toast.type) {
              @case ('success') { ✓ }
              @case ('error') { ✕ }
              @case ('info') { ℹ }
            }
          </span>
          <span class="toast__message">{{ toast.message }}</span>
          <button class="toast__close" (click)="notificationService.dismiss(toast.id)">✕</button>
        </div>
      }
    </div>
  `,
  styles: [`
    .toast-container {
      position: fixed;
      top: calc(var(--header-height) + 16px);
      right: 20px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 10px;
      max-width: 380px;
      pointer-events: none;
    }

    .toast {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px 16px;
      border-radius: var(--radius-md);
      background: #1d1d1f;
      color: #fff;
      font-size: 14px;
      font-weight: 500;
      letter-spacing: -0.005em;
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
      animation: slideIn 0.35s var(--ease-out);
      pointer-events: auto;
      backdrop-filter: blur(12px);

      &--success { background: rgba(29, 29, 31, 0.95); }
      &--error { background: rgba(255, 59, 48, 0.95); }
      &--info { background: rgba(0, 113, 227, 0.95); }

      &__icon {
        font-weight: 700;
        font-size: 14px;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.15);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      &__message {
        flex: 1;
        line-height: 1.35;
      }

      &__close {
        background: none;
        border: none;
        color: rgba(255, 255, 255, 0.55);
        font-size: 12px;
        padding: 4px;
        flex-shrink: 0;
        border-radius: 50%;
        line-height: 1;
        transition: color 0.15s var(--ease-out);

        &:hover { color: #fff; }
      }
    }

    @keyframes slideIn {
      from {
        transform: translateX(120%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    @media (max-width: 480px) {
      .toast-container {
        right: 12px;
        left: 12px;
        max-width: none;
      }
    }
  `]
})
export class ToastComponent {
  notificationService = inject(NotificationService);
}
