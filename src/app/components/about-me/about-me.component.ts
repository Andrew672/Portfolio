import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="h-full w-full flex flex-col justify-center px-4 py-8 md:p-20 relative">
      <div class="w-full max-w-7xl mx-auto flex flex-col items-center">
        <h2 i18n class="text-4xl md:text-6xl font-bold text-white mb-12 border-l-4 border-amber-500 pl-6 w-full max-w-4xl">
          À propos de moi
        </h2>
        <div class="space-y-12 w-full max-w-4xl">
          <p i18n class="text-lg md:text-2xl text-slate-300 leading-relaxed text-justify">
            Étudiant en dernière année de Master et alternant, passionné par le développement web, je m'oriente principalement vers le backend, le DevOps et le cloud. Curieux et adaptable, je m'intègre rapidement et conçois des applications performantes et maintenables.
          </p>
          <p i18n class="text-lg md:text-2xl text-slate-300 leading-relaxed text-justify">
            Je travaille également sur divers petits projets au sein de l'organisation <strong>CambouisCORP</strong>. (Un groupe de développeurs passionnés par la création de projets open-source et l'apprentissage collaboratif.)
          </p>
          

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

          <div class="flex flex-col md:flex-row gap-4 justify-center items-center w-full max-w-2xl mx-auto">
            <a 
              href="mailto:andrew.marbach@sport-partout.fr" 
              class="group px-4 py-4 border-2 border-slate-400 text-white font-semibold rounded-xl transition-all duration-200 flex items-center gap-2 w-full sm:w-auto justify-center bg-transparent  hover:text-amber-600 hover:border-amber-600 hover:shadow-[0_0_8px_2px_rgba(255,255,255,0.35)] hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.35)] focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span i18n>Me contacter</span>
            </a>
              <a
                href="https://github.com/CambouisCORP"
                target="_blank"
                rel="noopener noreferrer"
                class="group px-4 py-4 border-2 border-blue-600 text-blue-400 font-semibold rounded-xl transition-all duration-200 flex items-center gap-2 w-full sm:w-auto justify-center bg-transparent hover:text-white hover:shadow-[0_0_8px_2px_rgba(37,99,235,0.35)] hover:drop-shadow-[0_0_8px_rgba(37,99,235,0.35)] focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.484 2 12.012c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.833.091-.646.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.254-.446-1.272.098-2.653 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 7.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.747-1.025 2.747-1.025.546 1.381.202 2.399.1 2.653.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .268.18.579.688.481C19.138 20.19 22 16.436 22 12.012 22 6.484 17.523 2 12 2z"/>
                </svg>
                <span i18n>Voir l'organisation</span>
              </a>
            <a 
              href="#"
              (click)="showWipToast($event)"
              class="group px-4 py-4 border-2 border-slate-400 text-white font-semibold rounded-xl transition-all duration-200 flex items-center gap-2 w-full sm:w-auto justify-center bg-transparent  hover:text-amber-600 hover:border-amber-600 hover:shadow-[0_0_8px_2px_rgba(255,255,255,0.35)] hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.35)] focus:outline-none focus:ring-2 focus:ring-amber-500"
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
