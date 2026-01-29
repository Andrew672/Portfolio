import { Component, ElementRef, QueryList, ViewChildren, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Experience } from '../../models/experience.model';
import { Etude } from '../../models/etude.model';
import { ExperienceCardComponent } from './experience-card/experience-card.component';
import { EtudeCardComponent } from './etude-card/etude-card.component';
import { ExperienceModalComponent } from './experience-modal/experience-modal.component';
import { ExperienceService } from '../../services/API/experience.service';
import { EtudeService } from '../../services/API/etude.service';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, ExperienceCardComponent, EtudeCardComponent, ExperienceModalComponent],
  template: `
    <section class="h-full w-full flex flex-col justify-center p-4 md:p-20 relative">
      <h2 i18n class="text-4xl md:text-6xl font-bold text-white mb-8 md:mb-12 border-l-4 border-amber-500 pl-6 w-full max-w-7xl mx-auto">
        Mon parcours
      </h2>
      
      <div class="flex justify-center gap-8 mb-8 md:mb-12 w-full max-w-7xl mx-auto">
        <button 
          (click)="switchView('experience')"
          class="flex items-center gap-2 px-4 py-2 font-semibold transition-all duration-300 text-lg"
          [ngClass]="currentView() === 'experience' 
            ? 'text-white underline decoration-2 decoration-amber-600 underline-offset-4 font-bold' 
            : 'text-slate-400 hover:text-slate-200'">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
          </svg>
          <span i18n>Professionnel</span>
        </button>
        <button 
          (click)="switchView('etude')"
          class="flex items-center gap-2 px-4 py-2 font-semibold transition-all duration-300 text-lg"
          [ngClass]="currentView() === 'etude' 
            ? 'text-white underline decoration-2 decoration-amber-600 underline-offset-4 font-bold' 
            : 'text-slate-400 hover:text-slate-200'">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"/>
          </svg>
          <span i18n>Formation</span>
        </button>
      </div>
      
      <div class="relative w-full max-w-7xl mx-auto h-[70vh] group">
        
        <div class="h-full overflow-y-auto scrollbar-hide py-8 px-4 md:px-10 space-y-8 mask-gradient" #scrollContainer>
          
          <div class="relative min-h-full">
            
            <!-- Ligne verticale de timeline -->
            <div class="absolute left-[10px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-slate-600/50 to-transparent"></div>
            
            <!-- Items avec point + carte sur chaque ligne -->
            <div class="space-y-8">
              @for (exp of currentItems(); track exp.id; let i = $index) {
                <div class="flex gap-8 items-start" #experienceItems>
                  <!-- Point de timeline -->
                  <button 
                      (click)="scrollToIndex(i)"
                      class="w-5 h-5 rounded-full z-20 transition-all duration-300 cursor-pointer focus:outline-none border-2 border-slate-900 flex-shrink-0 mt-6"
                      [ngClass]="(selectedItem()?.id === exp.id || exp.current) ? 'bg-white scale-150 animate-pulse' : 'bg-slate-600 hover:bg-slate-400 hover:scale-125 shadow-lg'">
                  </button>
                  
                  <!-- Carte -->
                  <div class="flex-1 transition-all duration-500">
                    @if (currentView() === 'experience') {
                      <app-experience-card 
                          class="cursor-pointer block"
                          [experience]="asExperience(exp)" 
                          [isLeft]="false"
                          [showDetailsButton]="true"
                          (click)="openModal(exp)"
                          (openDetails)="openModal(exp)">
                      </app-experience-card>
                    } @else {
                      <app-etude-card 
                          class="block"
                          [etude]="asEtude(exp)" 
                          [isLeft]="false">
                      </app-etude-card>
                    }
                  </div>
                </div>
              }
            </div>

          </div>
        </div>
      </div>

      @if (selectedItem() && currentView() === 'experience') {
        <app-experience-modal 
          [experience]="selectedItem()!"
          (close)="closeModal()">
        </app-experience-modal>
      }

    </section>
  `
})
export class ExperienceComponent {
  @ViewChildren('experienceItems') experienceItems!: QueryList<ElementRef>;
  selectedItem = signal<Experience | Etude | undefined>(undefined);
  currentView = signal<'experience' | 'etude'>('experience');

  private experienceService = inject(ExperienceService);
  private etudeService = inject(EtudeService);
  readonly experiences = this.experienceService.experiences;
  readonly etudes = this.etudeService.etudes;

  currentItems = signal<(Experience | Etude)[]>([]);

  constructor() {
    // Initialize with experiences
    this.updateCurrentItems();
  }

  switchView(view: 'experience' | 'etude') {
    this.currentView.set(view);
    this.selectedItem.set(undefined);
    this.updateCurrentItems();
  }

  private updateCurrentItems() {
    if (this.currentView() === 'experience') {
      this.currentItems.set(this.experiences());
    } else {
      this.currentItems.set(this.etudes());
    }
  }

  asExperience(item: Experience | Etude): Experience {
    return item as Experience;
  }

  asEtude(item: Experience | Etude): Etude {
    return item as Etude;
  }

  openModal(item: Experience | Etude) {
    this.selectedItem.set(item);
  }

  closeModal() {
    this.selectedItem.set(undefined);
  }

  scrollToIndex(index: number) {
    const element = this.experienceItems.get(index)?.nativeElement;
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
}
