import { Injectable, signal } from '@angular/core';

export interface Toast {
  message: string;
  type?: 'info' | 'success' | 'error' | 'warning';
  duration?: number; // ms
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private _toasts = signal<Toast[]>([]);
  readonly toasts = this._toasts.asReadonly();

  show(toast: Toast) {
    this._toasts.update((toasts) => [...toasts, toast]);
    setTimeout(() => this.dismiss(toast), toast.duration ?? 3000);
  }

  dismiss(toast: Toast) {
    this._toasts.update((toasts) => toasts.filter(t => t !== toast));
  }

  clear() {
    this._toasts.set([]);
  }
}
