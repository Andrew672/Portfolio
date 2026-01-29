import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="hidden md:flex fixed left-1/2 -translate-x-1/2 bottom-6 z-[100] justify-center items-center bg-slate-900/70 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl py-2 px-4 gap-4 md:gap-8 transition-all duration-300" style="min-width: 320px; max-width: 90vw;">
      <button i18n type="button" onclick="document.querySelector('#home').scrollIntoView({behavior: 'smooth'})" class="text-slate-300 hover:text-amber-500 font-semibold px-4 py-2 rounded-xl transition-colors duration-200 bg-transparent">Accueil</button>
      <button i18n type="button" onclick="document.querySelector('#about').scrollIntoView({behavior: 'smooth'})" class="text-slate-300 hover:text-amber-500 font-semibold px-4 py-2 rounded-xl transition-colors duration-200 bg-transparent">À propos</button>
      <button i18n type="button" onclick="document.querySelector('#projects').scrollIntoView({behavior: 'smooth'})" class="text-slate-300 hover:text-amber-500 font-semibold px-4 py-2 rounded-xl transition-colors duration-200 bg-transparent">Projets</button>
      <button i18n type="button" onclick="document.querySelector('#background').scrollIntoView({behavior: 'smooth'})" class="text-slate-300 hover:text-amber-500 font-semibold px-4 py-2 rounded-xl transition-colors duration-200 bg-transparent">Parcours</button>
    </nav>
  `
})
export class NavbarComponent {}
