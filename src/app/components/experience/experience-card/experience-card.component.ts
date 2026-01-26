import { Component, EventEmitter, Input, Output, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Experience } from '../../../models/experience.model';

@Component({
  selector: 'app-experience-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="p-6 rounded-xl transition-all duration-500 ease-out w-full group/card hover:-translate-y-2 cursor-pointer"
      [ngClass]="{
        'text-left md:text-right': !isLeft, 
        'text-left': isLeft
      }"
      [style.background]="'rgba(30, 41, 59, 0.4)'"
      [style.backdropFilter]="'blur(20px)'"
      [style.border]="experience.current ? '1px solid rgba(20, 184, 166, 0.3)' : '1px solid rgba(255, 255, 255, 0.1)'"
      [style.boxShadow]="experience.current ? 'inset 0 0 60px rgba(20, 184, 166, 0.05), 0 8px 32px rgba(0, 0, 0, 0.3)' : 'inset 0 0 60px rgba(255, 255, 255, 0.03), 0 8px 32px rgba(0, 0, 0, 0.3)'"
    >
      <div class="flex flex-col" [ngClass]="{'md:items-end': !isLeft, 'md:items-start': isLeft}">
        <h3 class="font-bold text-lg" [ngClass]="experience.current ? 'text-teal-300' : 'text-slate-200'">
          {{ experience.title }}
          <span *ngIf="experience.company" class="text-slate-400 font-normal">@ {{ experience.company }}</span>
        </h3>
        
        <div class="flex flex-wrap items-center gap-2 mb-3">
          <span class="text-sm font-medium inline-block px-2 py-0.5 rounded"
            [ngClass]="experience.current ? 'bg-teal-500/20 text-teal-300' : 'text-slate-500'"
          >
            {{ experience.startDate | date:'MMM yyyy' | titlecase }} - 
            @if (experience.current) {
            <ng-container i18n="@@presentLabel">
              Actuellement
            </ng-container>
            } @else {
              {{ experience.endDate | date:'MMM yyyy' | titlecase }}
            }
          </span>
          <span class="text-xs text-slate-500 flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {{ experience.location }}
          </span>
        </div>
        
        <p class="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3">
          {{ experience.description }}
        </p>

        @if (experience.technologies && experience.technologies.length > 0) {
            <div class="flex items-center gap-2 flex-wrap mb-4" [ngClass]="{'md:justify-end': !isLeft}">
              @for (tech of experience.technologies.slice(0, maxVisibleTags); track tech) {
                <span class="px-2 py-0.5 text-xs font-medium bg-teal-600/90 text-white border border-teal-500/30 rounded-md whitespace-nowrap">
                  {{ tech }}
                </span>
              }
              @if (experience.technologies.length > maxVisibleTags) {
                <span class="px-2 py-0.5 text-xs font-medium bg-teal-600/70 text-white border border-teal-500/30 rounded-md">
                  +{{ experience.technologies.length - maxVisibleTags }}
                </span>
              }
            </div>
          }

        <button 
          (click)="onOpenDetails($event)"
          class="text-xs uppercase tracking-widest font-bold text-teal-500 hover:text-teal-300 transition-all duration-300 flex items-center gap-1 group/btn opacity-0 group-hover/card:opacity-100"
          [ngClass]="{'flex-row-reverse': !isLeft}"
          i18n="@@seeDetailsButton"
        >
          Voir Détail
          @if (isLeft) {
            <span class="transform transition-transform group-hover/btn:translate-x-1">→</span>
          }
          @else {
            <span class="transform transition-transform group-hover/btn:-translate-x-1">←</span>
          }
        </button>

      </div>
    </div>
  `
})
export class ExperienceCardComponent {
  @Input({ required: true }) experience!: Experience;
  @Input() isLeft: boolean = true;
  @Output() openDetails = new EventEmitter<number>();
  
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

  onOpenDetails(event: Event) {
    event.stopPropagation();
    this.openDetails.emit(this.experience.id);
  }
}
