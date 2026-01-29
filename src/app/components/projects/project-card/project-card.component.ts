import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../../models/projet.model';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule],
  styleUrl: './project-card.component.css',
  template: `
    <div 
      class="group relative cursor-pointer"
      (click)="handleSelect()"
      style="will-change: transform;"
    >
      <div 
        class="absolute inset-0 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 -z-10 animate-breathing-glow transition-opacity duration-500"
        [style.background]="project.gradient || 'radial-gradient(circle, #4a7c7e 0%, transparent 70%)'"
      ></div>

      <div 
        class="relative h-[400px] overflow-hidden rounded-3xl transition-all duration-500 ease-out group-hover:-translate-y-3 group-hover:scale-[1.02] animate-organic-morph"
        style="
          background: rgba(30, 41, 59, 0.4);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 
            inset 0 0 60px rgba(255, 255, 255, 0.03),
            0 8px 32px rgba(0, 0, 0, 0.3);
        "
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

        <div class="relative h-[200px] flex items-center justify-center overflow-hidden">
          @if (project.thumbnailUrl) {
            <img 
              [src]="project.thumbnailUrl" 
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
              [alt]="project.title"
            >
          } @else if (project.gradient) {
            <div 
              class="absolute inset-0"
              [style.background]="project.gradient"
            ></div>
          } @else {
            <div class="text-8xl animate-float">🚀</div>
          }
          
          <div class="absolute top-8 left-8 w-20 h-20 rounded-full bg-white/20 blur-2xl animate-light-float-1"></div>
          <div class="absolute bottom-8 right-8 w-16 h-16 rounded-full bg-cyan-300/15 blur-xl animate-light-float-2"></div>
          
          <div
            class="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
            style="background: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 70%);"
          ></div>
        </div>

        <div class="p-6 flex flex-col gap-3">
          <h3 
            class="text-2xl font-bold text-amber-600"
          >
            {{ project.title }}
          </h3>
          <p class="text-gray-300 text-sm leading-relaxed line-clamp-2 mb-3">
            {{ project.description }}
          </p>
          
          @if (project.technologies && project.technologies.length > 0) {
            <div class="flex items-center gap-2 flex-wrap">
              @for (tech of project.technologies.slice(0, maxVisibleTags); track tech) {
                <span class="px-2 py-0.5 text-xs font-medium bg-amber-600/90 text-white border border-amber-500/30 rounded-md whitespace-nowrap">
                  {{ tech }}
                </span>
              }
              @if (project.technologies.length > maxVisibleTags) {
                <span class="px-2 py-0.5 text-xs font-medium bg-amber-600/70 text-white border border-amber-500/30 rounded-md">
                  +{{ project.technologies.length - maxVisibleTags }}
                </span>
              }
            </div>
          }
          
          <div class="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity text-amber-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </div>
        </div>

        <div 
          class="absolute top-0 left-0 w-full h-1/2 pointer-events-none rounded-t-3xl animate-subtle-glow"
          style="background: linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, transparent 100%);"
        ></div>
      </div>
    </div>
  `,
})
export class ProjectCardComponent {
  @Input({ required: true }) project!: Project;
  @Output() select = new EventEmitter<Project>();
  
  maxVisibleTags = 3;

  constructor() {
    this.onResize();
  }

  @HostListener('window:resize')
  onResize() {
    if (typeof window !== 'undefined') {
      this.maxVisibleTags = window.innerWidth < 640 ? 2 : 3;
    }
  }

  handleSelect() {
    this.select.emit(this.project);
  }
}