import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../../models/projet.model';



@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4 md:p-4 detail-overlay" 
      [class.closing]="isClosing"
      (click)="onBackdropClick($event)"
    >
=      <div 
        class="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
      ></div>

      <div 
        class="relative w-full max-w-4xl bg-slate-900/40 backdrop-blur-2xl border border-white/10 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] detail-content flex flex-col max-h-[80vh] md:max-h-[90vh] ring-1 ring-white/5 organic-shape"
        [class.closing]="isClosing"
        (click)="$event.stopPropagation()"
      >
        
        <div class="h-48 sm:h-64 w-full relative shrink-0 overflow-hidden">
          <div *ngIf="!project.imageUrl" class="absolute inset-0 w-full h-full" [ngClass]="project.gradient"></div>
          <img *ngIf="project.imageUrl" [src]="project.imageUrl" class="absolute inset-0 w-full h-full object-cover" [alt]="project.title">

          <button 
            (click)="handleClose()"
            class="absolute top-4 right-4 z-50 group flex items-center justify-center w-12 h-12 bg-white/5 backdrop-blur-md border border-white/10 rounded-full hover:bg-white/10 hover:scale-110 hover:border-teal-500/50 transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.1)] overflow-hidden cursor-pointer"
          >
            <div class="absolute inset-0 bg-gradient-to-tr from-teal-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 text-slate-300 group-hover:text-white relative z-10 transition-transform duration-300">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div class="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent flex flex-col items-start gap-3">
            <h2 class="text-3xl md:text-5xl font-bold text-white drop-shadow-lg">{{ project.title }}</h2>
            @if (project.wip) {
              <div class="px-3 py-1.5 bg-amber-500/20 backdrop-blur-md border border-amber-500/30 rounded-lg shadow-lg">
                <span class="text-sm font-bold text-amber-300 tracking-wider flex items-center gap-2">
                  <span class="relative flex h-2 w-2">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                  </span>
                  WIP
                </span>
              </div>
            }
          </div>
        </div>

        <div class="p-8 overflow-y-auto custom-scrollbar bg-gradient-to-b from-transparent to-slate-900/20">
          <div class="space-y-6">
            <div class="flex flex-wrap gap-2">

                @for (tech of project.technologies; track tech) {
                <span  
                    class="px-3 py-1 bg-teal-500/10 border border-teal-500/20 rounded-full text-teal-300 text-sm font-medium">
                    {{ tech }}
                </span>
                }
            </div>

            <div class="prose prose-invert max-w-none">
              <h3 class="text-xl font-semibold text-slate-200">À propos du projet</h3>
              <p class="text-slate-400 leading-relaxed">{{ project.description }}</p>
              
              <h3 class="text-xl font-semibold text-slate-200 mt-6">Détails techniques</h3>
              <p class="text-slate-400 leading-relaxed">{{ project.details }}</p>

                @if (project.functionalities && project.functionalities.length > 0) {
                  <h3 class="text-xl font-semibold text-slate-200 mt-6">Fonctionnalités principales</h3>
                  <ul class="list-disc list-inside text-slate-400 leading-relaxed">
                    @for (func of project.functionalities; track func) {
                      <li>{{ func }}</li>
                    }
                  </ul>
                }
             
            </div>

            <div class="flex flex-col sm:flex-row gap-4 pt-6">
              @if (project.siteUrl) {
                    <a class="btn-liquid cursor-pointer flex-1 relative group overflow-hidden py-3.5 px-6 rounded-xl backdrop-blur-md border border-teal-500/30 bg-gradient-to-br from-teal-500/20 to-teal-900/40 text-teal-100 font-semibold text-center transition-all duration-300 hover:border-teal-400/50 hover:shadow-[0_0_30px_rgba(20,184,166,0.3)] hover:-translate-y-0.5"
                        href="{{ project.siteUrl }}" target="_blank" rel="noopener noreferrer">
                        <span class="relative z-10 flex items-center justify-center gap-2">
                            <span>Voir le site</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                            </svg>
                        </span>
                        <div class="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-teal-400/20 to-transparent"></div>
                        <div class="absolute inset-0 border-t border-white/10 rounded-xl pointer-events-none"></div>
                    </a>
                }
                @if (project.githubUrl) {
                    <a class="btn-liquid cursor-pointer flex-1 relative group overflow-hidden py-3.5 px-6 rounded-xl backdrop-blur-md border border-white/10 bg-gradient-to-br from-slate-700/40 to-slate-900/40 text-slate-200 font-semibold text-center transition-all duration-300 hover:border-slate-400/30 hover:shadow-[0_0_30px_rgba(148,163,184,0.1)] hover:-translate-y-0.5"
                        href="{{ project.githubUrl }}" target="_blank" rel="noopener noreferrer">
                        <span class="relative z-10 flex items-center justify-center gap-2">
                            <span>Code source</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                            </svg>
                        </span>
                        <div class="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                        <div class="absolute inset-0 border-t border-white/10 rounded-xl pointer-events-none"></div>
                    </a>
                }
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ProjectDetailComponent {
  @Input({ required: true }) project!: Project;
  @Output() close = new EventEmitter<void>();
  
  isClosing = false;

  handleClose() {
    this.isClosing = true;
    setTimeout(() => {
      this.close.emit();
    }, 380);
  }

  onBackdropClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('detail-overlay')) {
      this.handleClose();
    }
  }
}
