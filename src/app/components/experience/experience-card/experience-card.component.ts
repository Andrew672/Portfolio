import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Experience } from '../../../models/experience.model';

@Component({
  selector: 'app-experience-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10 transition-all duration-300 w-full group hover:bg-white/10 hover:-translate-y-1 hover:shadow-xl"
      [ngClass]="{
        'hover:border-teal-500/30': !experience.current,
        'border-teal-500/50 bg-teal-900/10 hover:border-teal-500/80 shadow-[0_0_15px_rgba(20,184,166,0.15)]': experience.current,
        'text-left md:text-right': !isLeft, 
        'text-left': isLeft
      }"
    >
      <div class="flex flex-col" [ngClass]="{'md:items-end': !isLeft, 'md:items-start': isLeft}">
        <h3 class="font-bold text-lg" [ngClass]="experience.current ? 'text-teal-300' : 'text-slate-200'">
          {{ experience.title }}
          <span *ngIf="experience.company" class="text-slate-400 font-normal">@ {{ experience.company }}</span>
        </h3>
        
        <span class="text-sm font-medium mb-3 inline-block px-2 py-0.5 rounded"
          [ngClass]="experience.current ? 'bg-teal-500/20 text-teal-300' : 'text-slate-500'"
        >
          {{ experience.period }}
        </span>
        
        <p class="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3">
          {{ experience.description }}
        </p>

        <button 
          (click)="onOpenDetails($event)"
          class="text-xs uppercase tracking-widest font-bold text-teal-500 hover:text-teal-300 transition-colors flex items-center gap-1 group/btn"
          [ngClass]="{'flex-row-reverse': !isLeft}">
          Voir Détail
          <span class="transform transition-transform group-hover/btn:translate-x-1" *ngIf="isLeft">→</span>
          <span class="transform transition-transform group-hover/btn:-translate-x-1" *ngIf="!isLeft">←</span>
        </button>

      </div>
    </div>
  `
})
export class ExperienceCardComponent {
  @Input({ required: true }) experience!: Experience;
  @Input() isLeft: boolean = true;
  @Output() openDetails = new EventEmitter<number>();

  onOpenDetails(event: Event) {
    event.stopPropagation();
    this.openDetails.emit(this.experience.id);
  }
}
