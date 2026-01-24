import { Component, ElementRef, QueryList, ViewChildren, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Experience } from '../../models/experience.model';
import { ExperienceCardComponent } from './experience-card/experience-card.component';
import { ExperienceModalComponent } from './experience-modal/experience-modal.component';
import { ExperienceService } from '../../services/experience.service';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, ExperienceCardComponent, ExperienceModalComponent],
  template: `
    <section class="h-full w-full flex flex-col justify-center p-4 md:p-20 z-10 relative">
      <h2 i18n class="text-4xl md:text-6xl font-bold text-white mb-8 md:mb-12 border-l-4 border-teal-500 pl-6">Mon Expérience</h2>
      
      <div class="relative w-full max-w-5xl mx-auto h-[70vh] group">
        
        <div class="h-full overflow-y-auto scrollbar-hide py-32 px-4 md:px-10 space-y-24 md:space-y-32 mask-gradient" #scrollContainer>
          
          <div class="relative min-h-full">
            
            <div class="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-teal-500/30 to-transparent -translate-x-1/2"></div>
            
            @for (exp of experiences(); track exp.id; let i = $index; let isEven = $even) {
              <div #experienceItems
                  class="relative flex flex-col md:flex-row items-center w-full min-h-[150px] mb-8 md:mb-0 group/item transition-all duration-500">
                  
                <div class="hidden md:block w-5/12 ml-auto" [ngClass]="{'order-1 pr-12': true}">
                  @if (isEven) {
                    <app-experience-card 
                        class="cursor-pointer block"
                        [experience]="exp" 
                        [isLeft]="true"
                        (click)="openModal(exp)"
                        (openDetails)="openModal(exp)">
                    </app-experience-card>
                  }
                </div>

                <button 
                    (click)="scrollToIndex(i)"
                    class="absolute left-4 md:left-1/2 -translate-x-1/2 w-5 h-5 rounded-full z-20 top-0 md:top-1/2 md:-translate-y-1/2 transition-all duration-300 cursor-pointer focus:outline-none border-2 border-slate-900"
                    [ngClass]="(selectedExperience()?.id === exp.id || exp.current) ? 'bg-teal-400 shadow-[0_0_20px_rgba(45,212,191,0.6)] scale-150' : 'bg-slate-600 hover:bg-teal-500 hover:scale-125 shadow-lg'">
                </button>

                <div class="w-full pl-12 md:pl-0 md:w-5/12 md:mr-auto" [ngClass]="{'md:order-3 md:pl-12': true}">
                  @if (!isEven || (isEven && true)) {
                    <app-experience-card 
                        class="cursor-pointer block"
                        [class.md:hidden]="isEven" 
                        [experience]="exp" 
                        [isLeft]="false"
                        (click)="openModal(exp)"
                        (openDetails)="openModal(exp)">
                    </app-experience-card>
                  }
                </div>

              </div>
            }
          </div>
        </div>
      </div>

      @if (selectedExperience()) {
        <app-experience-modal 
          [experience]="selectedExperience()!"
          (close)="closeModal()">
        </app-experience-modal>
      }

    </section>
  `
})
export class ExperienceComponent {
  @ViewChildren('experienceItems') experienceItems!: QueryList<ElementRef>;
  selectedExperience = signal<Experience | undefined>(undefined);

  private experienceService = inject(ExperienceService);
  readonly experiences = this.experienceService.experiences;

  openModal(exp: Experience) {
    this.selectedExperience.set(exp);
  }

  closeModal() {
    this.selectedExperience.set(undefined);
  }

  scrollToIndex(index: number) {
    const element = this.experienceItems.get(index)?.nativeElement;
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
}
