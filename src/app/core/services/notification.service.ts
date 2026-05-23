import { Injectable, signal } from '@angular/core';

export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private counter = 0;
  private toastList = signal<Toast[]>([]);

  readonly toasts = this.toastList.asReadonly();

  show(message: string, type: 'success' | 'error' | 'info' = 'success'): void {
    const id = ++this.counter;
    const toast: Toast = { id, message, type };

    this.toastList.update(list => [...list, toast]);

    // auto-dismiss después de 3 segundos
    setTimeout(() => this.dismiss(id), 3000);
  }

  dismiss(id: number): void {
    this.toastList.update(list => list.filter(t => t.id !== id));
  }
}
