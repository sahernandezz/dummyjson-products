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
      top: 72px;
      right: 20px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 8px;
      max-width: 360px;
    }

    .toast {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 16px;
      border-radius: 12px;
      background: #1d1d1f;
      color: #fff;
      font-size: 14px;
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
      animation: slideIn 0.3s ease;

      &--success { background: #1d1d1f; }
      &--error { background: #ff3b30; }
      &--info { background: #0071e3; }

      &__icon {
        font-weight: 700;
        font-size: 13px;
        flex-shrink: 0;
      }

      &__message {
        flex: 1;
        line-height: 1.3;
      }

      &__close {
        background: none;
        border: none;
        color: rgba(255, 255, 255, 0.6);
        font-size: 12px;
        padding: 2px;
        flex-shrink: 0;

        &:hover { color: #fff; }
      }
    }

    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `]
})
export class ToastComponent {
  notificationService = inject(NotificationService);
}
