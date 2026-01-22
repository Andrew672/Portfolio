import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../../models/projet.model';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="group relative bg-gradient-to-br from-white/10 to-transparent backdrop-blur-xl border border-white/20 p-6 organic-shape-card transition-all duration-500 hover:scale-[1.02] hover:-skew-y-1 hover:shadow-2xl hover:shadow-teal-500/20 cursor-pointer hover:border-teal-500/50 hover:bg-white/5"
      (click)="handleSelect()"
    >
      <div 
        class="h-40 rounded-xl mb-4 bg-gradient-to-br transition-all duration-500 relative overflow-hidden"
        [ngClass]="project.thumbnailUrl ? '' : project.gradient"
      >
        @if (project.wip) {
          <div class="absolute top-2 right-2 px-2 py-1 bg-amber-500/20 backdrop-blur-md border border-amber-500/30 rounded-lg shadow-lg z-20">
            <span class="text-xs font-bold text-amber-300 tracking-wider flex items-center gap-1">
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              WIP
            </span>
          </div>
        }
        @if (project.thumbnailUrl) {
          <img 
            [src]="project.thumbnailUrl" 
            class="w-full h-full object-contain mix-blend-overlay group-hover:scale-110 transition-transform duration-700" 
            [alt]="project.title"
          >
        }
      </div>
      <h3 class="text-xl font-semibold text-teal-300 mb-2">{{ project.title }}</h3>
      <p class="text-slate-400 text-sm line-clamp-2">{{ project.description }}</p>
      <div class="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity text-teal-400">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </div>
    </div>
  `,
})
export class ProjectCardComponent {
  @Input({ required: true }) project!: Project;
  @Output() select = new EventEmitter<Project>();

  handleSelect() {
    this.select.emit(this.project);
  }
}
