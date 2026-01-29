import { Component, Input, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Etude } from '../../../models/etude.model';

@Component({
  selector: 'app-etude-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="p-6 rounded-xl transition-all duration-500 ease-out w-full group/card hover:-translate-y-2 text-left"
      [style.background]="'rgba(30, 41, 59, 0.4)'"
      [style.backdropFilter]="'blur(20px)'"
      [style.border]="etude.current ? '1px solid rgba(20, 184, 166, 0.3)' : '1px solid rgba(255, 255, 255, 0.1)'"
      [style.boxShadow]="etude.current ? 'inset 0 0 60px rgba(20, 184, 166, 0.05), 0 8px 32px rgba(0, 0, 0, 0.3)' : 'inset 0 0 60px rgba(255, 255, 255, 0.03), 0 8px 32px rgba(0, 0, 0, 0.3)'"
    >
      <div class="flex flex-col items-start">
        <h3 class="font-bold text-lg mb-1" [ngClass]="etude.current ? 'text-teal-300' : 'text-slate-200'">
          {{ etude.title }}
        </h3>
        
        <div class="flex items-center gap-2 mb-2">
          <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
          </svg>
          <span class="text-base font-medium text-slate-300">{{ etude.institution }}</span>
        </div>
        
        @if (etude.degree || etude.field) {
          <div class="text-sm text-slate-400 mb-2">
            @if (etude.degree) {
              <span>{{ etude.degree }}</span>
            }
            @if (etude.degree && etude.field) {
              <span> - </span>
            }
            @if (etude.field) {
              <span>{{ etude.field }}</span>
            }
          </div>
        }
        
        <div class="flex flex-wrap items-center gap-2 mb-3">
          <span class="text-sm font-medium inline-block py-0.5 rounded"
            [ngClass]="etude.current ? 'bg-teal-500/20 text-teal-300 px-2' : 'text-slate-500'"
          >
            {{ etude.startDate | date:'MMM yyyy' | titlecase }} - 
            @if (etude.current) {
            <ng-container i18n="@@presentLabelEtude">
              En cours
            </ng-container>
            } @else {
              {{ etude.endDate | date:'MMM yyyy' | titlecase }}
            }
          </span>
          <span class="text-xs text-slate-500 flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {{ etude.location }}
          </span>
        </div>
        
        <div class="text-slate-400 text-sm leading-relaxed mb-4" [innerHTML]="etude.description"></div>

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
