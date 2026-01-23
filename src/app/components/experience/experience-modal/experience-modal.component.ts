import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Experience } from '../../../models/experience.model';

@Component({
  selector: 'app-experience-modal',
  standalone: true,
  imports: [CommonModule],
  styleUrl: './experience-modal.component.css',
  template: `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 modal-overlay" 
         role="dialog" 
         aria-modal="true"
         [class.closing]="isClosing"
         (click)="handleBackdropClick($event)">
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"></div>

      <div class="relative w-full max-w-2xl bg-[#0f172a] border border-teal-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] modal-content"
           [class.closing]="isClosing"
           (click)="$event.stopPropagation()">
        
        <div class="p-6 md:p-8 border-b border-white/10 bg-white/5 relative">
          <button (click)="handleClose()" class="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div class="flex flex-col gap-2">
            <h2 class="text-2xl md:text-3xl font-bold text-white pr-8">{{ experience.title }}</h2>
            <div class="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm md:text-base">
              <span class="text-teal-400 font-medium">@ {{ experience.company }}</span>
              <span class="hidden sm:block w-1 h-1 bg-slate-500 rounded-full"></span>
              <span class="text-slate-300 bg-slate-800/50 px-3 py-1 rounded-full border border-white/10">{{ experience.period }}</span>
            </div>
          </div>
        </div>

        <div class="p-6 md:p-8 overflow-y-auto custom-scrollbar space-y-8">
            
            <div class="space-y-4">
                <h3 class="text-lg font-semibold text-teal-200 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Mission
                </h3>
                <p class="text-slate-300 leading-relaxed">{{ experience.description }}</p>
                @if (experience.details && experience.details.length > 0) {
                  <ul class="space-y-2 mt-2">
                      @for (detail of experience.details; track detail) {
                        <li class="flex items-start gap-2 text-slate-400 text-sm md:text-base">
                            <span class="text-teal-500 mt-1.5 w-1.5 h-1.5 rounded-full bg-teal-500 flex-shrink-0"></span>
                            <span>{{ detail }}</span>
                        </li>
                      }
                  </ul>
                }
            </div>

            <div class="grid md:grid-cols-2 gap-8">
                @if (experience.technologies?.length) {
                  <div class="space-y-3">
                      <h3 class="text-lg font-semibold text-teal-200 flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                          </svg>
                          Stack Technique
                      </h3>
                      <div class="flex flex-wrap gap-2">
                          @for (tech of experience.technologies; track tech) {
                            <span class="px-3 py-1 rounded bg-slate-800 text-teal-300 text-sm border border-teal-900/50">
                                {{ tech }}
                            </span>
                          }
                      </div>
                  </div>
                }

                @if (experience.skills?.length) {
                  <div class="space-y-3">
                      <h3 class="text-lg font-semibold text-teal-200 flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          Compétences
                      </h3>
                      <div class="flex flex-wrap gap-2">
                          @for (skill of experience.skills; track skill) {
                            <span class="px-3 py-1 rounded bg-slate-800/50 text-slate-300 text-sm border border-white/5">
                                {{ skill }}
                            </span>
                          }
                      </div>
                  </div>
                }
            </div>

        </div>

        <div class="p-4 md:p-6 border-t border-white/5 bg-slate-900/50 flex justify-end">
            <button (click)="handleClose()" class="px-6 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-lg transition-colors font-medium text-sm">
                Fermer
            </button>
        </div>

      </div>
    </div>
  `
})
export class ExperienceModalComponent {
  @Input({ required: true }) experience!: Experience;
  @Output() close = new EventEmitter<void>();
  
  isClosing = false;

  handleClose() {
    this.isClosing = true;
    setTimeout(() => {
      this.close.emit();
    }, 400);
  }

  handleBackdropClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.handleClose();
    }
  }
}
