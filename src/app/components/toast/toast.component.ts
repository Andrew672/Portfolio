import { Component, Input, signal, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Toast, ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed top-6 right-6 z-[9999] flex flex-col gap-3 items-end">
        @for (toast of toasts(); track toast) {
            <div 
              class="min-w-[250px] max-w-sm px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-fade-in-up"
              [ngClass]="toastClass(toast)"
            >
              <div class="flex-1">
                <p class="font-medium">{{ toast.message }}</p>
              </div>
              <button 
                (click)="toastService.dismiss(toast)" 
                class="text-white hover:text-gray-200 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
        }   
    </div>
  `,
  styles: [
    `
    .animate-fade-in-up {
      animation: fadeInUp 0.3s;
    }
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    `
  ]
})
export class ToastComponent {

  toastService = inject(ToastService);
  toasts = this.toastService.toasts;

  toastClass(toast: Toast) {
    switch (toast.type) {
      case 'success': return 'bg-emerald-600 text-white';
      case 'error': return 'bg-red-600 text-white';
      case 'warning': return 'bg-amber-500 text-white';
      default: return 'bg-slate-800 text-white';
    }
  }
}
