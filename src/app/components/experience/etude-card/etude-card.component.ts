import { Component, Input, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Etude } from '../../../models/etude.model';

@Component({
  selector: 'app-etude-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="py-6 transition-all duration-500 ease-out w-full group/card text-left"
    >
      <div class="flex flex-col items-start space-y-3">
        <h3 class="font-bold text-xl" [ngClass]="etude.current ? 'text-amber-600' : 'text-white'">
          {{ etude.title }}
        </h3>
        
        @if (etude.institution) {
          <p class="text-slate-300 font-medium flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
            </svg>
            {{ etude.institution }}
          </p>
        }
        
        @if (etude.degree || etude.field) {
          <p class="text-slate-400 text-sm">
            @if (etude.degree) {
              <span>{{ etude.degree }}</span>
            }
            @if (etude.degree && etude.field) {
              <span> - </span>
            }
            @if (etude.field) {
              <span>{{ etude.field }}</span>
            }
          </p>
        }
        
        <div class="flex flex-wrap items-center gap-3 text-sm text-slate-400">
          <span class="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            {{ etude.startDate | date:'MMM yyyy' | titlecase }} - 
            @if (etude.current) {
              <ng-container i18n="@@presentLabelEtude">En cours</ng-container>
            } @else {
              {{ etude.endDate | date:'MMM yyyy' | titlecase }}
            }
          </span>
          <span class="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {{ etude.location }}
          </span>
        </div>
        
        <div class="text-slate-300 text-sm leading-relaxed" [innerHTML]="etude.description"></div>

      </div>
    </div>
  `
})
export class EtudeCardComponent {
  @Input({ required: true }) etude!: Etude;
  @Input() isLeft: boolean = true;
  
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
}
