import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="h-full w-full flex flex-col justify-center p-8 md:p-20 relative">
      <div class="w-full max-w-7xl mx-auto flex flex-col items-center">
        <h2 i18n class="text-4xl md:text-6xl font-bold text-white mb-12 border-l-4 border-amber-500 pl-6 w-full max-w-4xl">
          À propos de moi
        </h2>
        <div class="space-y-12 w-full max-w-4xl">
          <!-- Description -->
          <p i18n class="text-xl md:text-2xl text-slate-300 leading-relaxed text-center md:text-justify">
            Étudiant en dernière année de Master et alternant, passionné par le développement web, je m'oriente principalement vers le backend, le DevOps et le cloud. Curieux et adaptable, je m'intègre rapidement et conçois des applications performantes et maintenables.
          </p>

          <!-- Statistiques -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
            <div class="flex flex-col items-center p-6 bg-slate-800/30 rounded-xl border border-slate-700/50 hover:border-amber-600/50 transition-all duration-300">
              <span class="text-4xl md:text-5xl font-bold text-amber-600">5+</span>
              <span i18n class="text-slate-400 text-sm md:text-base mt-2 text-center">Années d'études</span>
            </div>
            <div class="flex flex-col items-center p-6 bg-slate-800/30 rounded-xl border border-slate-700/50 hover:border-amber-600/50 transition-all duration-300">
              <span class="text-4xl md:text-5xl font-bold text-amber-600">10+</span>
              <span i18n class="text-slate-400 text-sm md:text-base mt-2 text-center">Projets réalisés</span>
            </div>
            <div class="flex flex-col items-center p-6 bg-slate-800/30 rounded-xl border border-slate-700/50 hover:border-amber-600/50 transition-all duration-300">
              <span class="text-4xl md:text-5xl font-bold text-amber-600">15+</span>
              <span i18n class="text-slate-400 text-sm md:text-base mt-2 text-center">Technologies</span>
            </div>
            <div class="flex flex-col items-center p-6 bg-slate-800/30 rounded-xl border border-slate-700/50 hover:border-amber-600/50 transition-all duration-300">
              <span class="text-4xl md:text-5xl font-bold text-amber-600">2+</span>
              <span i18n class="text-slate-400 text-sm md:text-base mt-2 text-center">Ans d'expérience</span>
            </div>
          </div>

          <!-- Call to Actions -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-2xl mx-auto">
            <a 
              href="mailto:andrew.marbach@example.com" 
              class="group px-8 py-4 border-2 border-amber-600 text-amber-500 font-semibold rounded-xl transition-all duration-200 flex items-center gap-2 w-full sm:w-auto justify-center bg-transparent hover:bg-amber-600 hover:text-white hover:shadow-[0_0_8px_2px_rgba(251,191,36,0.35)] hover:drop-shadow-[0_0_8px_rgba(251,191,36,0.35)] focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span i18n>Me contacter</span>
            </a>
            <a 
              href="#"
              (click)="showWipToast($event)"
              class="group px-8 py-4 border-2 border-slate-400 text-white font-semibold rounded-xl transition-all duration-200 flex items-center gap-2 w-full sm:w-auto justify-center bg-transparent hover:bg-white hover:text-amber-600 hover:border-amber-600 hover:shadow-[0_0_8px_2px_rgba(255,255,255,0.35)] hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.35)] focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span i18n>Télécharger CV</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  `
})
export class AboutMeComponent {
  private toast = inject(ToastService);
  showWipToast(e: Event) {
    e.preventDefault();
    this.toast.show({ message: 'WIP', type: 'warning', duration: 3000 });
  }
}
