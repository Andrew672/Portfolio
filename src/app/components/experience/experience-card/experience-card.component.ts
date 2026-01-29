import { Component, EventEmitter, Input, Output, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Experience } from '../../../models/experience.model';

@Component({
  selector: 'app-experience-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="py-6 transition-all duration-500 ease-out w-full group/card cursor-pointer text-left"
    >
      <div class="flex flex-col items-start space-y-3">
        <div class="flex items-start gap-3">
          <h3 class="font-bold text-xl" [ngClass]="experience.current ? 'text-amber-600' : 'text-white'">
            {{ experience.title }}
          </h3>
        </div>

        @if (experience.company) {
          <p class="text-slate-300 font-medium flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
            </svg>
            {{ experience.company }}
          </p>
        }
        
        <div class="flex flex-wrap items-center gap-3 text-sm text-slate-400">
          <span class="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            {{ experience.startDate | date:'MMM yyyy' | titlecase }} - 
            @if (experience.current) {
              <ng-container i18n="@@presentLabel">Actuellement</ng-container>
            } @else {
              {{ experience.endDate | date:'MMM yyyy' | titlecase }}
            }
          </span>
          <span class="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {{ experience.location }}
          </span>
        </div>
        
        <p class="text-slate-300 text-sm leading-relaxed line-clamp-3">
          {{ experience.description }}
        </p>

        @if (experience.technologies && experience.technologies.length > 0) {
          <div class="flex items-center gap-2 flex-wrap">
            @for (tech of experience.technologies.slice(0, maxVisibleTags); track tech) {
              <span class="px-2 py-0.5 text-xs font-medium bg-amber-600/90 text-white border border-amber-500/30 rounded-md whitespace-nowrap">
                {{ tech }}
              </span>
            }
            @if (experience.technologies.length > maxVisibleTags) {
              <span class="px-2 py-0.5 text-xs font-medium bg-amber-600/70 text-white border border-amber-500/30 rounded-md">
                +{{ experience.technologies.length - maxVisibleTags }}
              </span>
            }
          </div>
        }

        @if (showDetailsButton) {
          <button 
            (click)="onOpenDetails($event)"amber-4
            class="text-xs uppercase tracking-widest font-bold text-amber-600 hover:text-amber-700 transition-all duration-300 flex items-center gap-1.5 group/btn mt-2"
            i18n="@@seeDetailsButton"
          >
            <span>Voir les détails</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transform transition-transform group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
          </button>
        }

      </div>
    </div>
  `
})
export class ExperienceCardComponent {
  @Input({ required: true }) experience!: Experience;
  @Input() isLeft: boolean = true;
  @Input() showDetailsButton: boolean = true;
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
