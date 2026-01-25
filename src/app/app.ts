import { Component, Inject, LOCALE_ID, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ProjectsComponent } from "./components/projects/projects.component";
import { ExperienceComponent } from "./components/experience/experience.component";
import { Meta, Title } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, WelcomeComponent, ProjectsComponent, ExperienceComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('porfolio');

  constructor(
    @Inject(LOCALE_ID) public locale: string,
    @Inject(DOCUMENT) private document: Document,
    private siteTitle: Title,
    private meta: Meta
  ) {
    this.checkBrowserLanguage();

    this.siteTitle.setTitle(
      $localize`:@@title:Andrew Marbach – Portfolio FullStack`
    );


    this.meta.updateTag({
      name: 'description',
      content: $localize`:@@metaDescription:
        Portfolio d'Andrew Marbach, développeur FullStack Junior spécialisé en DevOps et Web Development.
      `
    });

    this.meta.updateTag({
      property: 'og:title',
      content: $localize`:@@ogTitle:Andrew Marbach – Portfolio FullStack`
    });

    this.meta.updateTag({
      property: 'og:description',
      content: $localize`:@@ogDescription:
        Découvrez le portfolio d'Andrew Marbach, développeur fullstack junior spécialisé en DevOps et développement web.
      `
    });

    this.meta.updateTag({
      property: 'twitter:title',
      content: $localize`:@@twitterTitle:Andrew Marbach – Portfolio FullStack`
    });

    this.meta.updateTag({
      property: 'twitter:description',
      content: $localize`:@@twitterDescription:
        Découvrez le portfolio d'Andrew Marbach, développeur fullstack junior spécialisé en DevOps et développement web.
      `
    });
  }

  private checkBrowserLanguage() {
    if (typeof window !== 'undefined' && !sessionStorage.getItem('lang_redirected')) {
      const browserLang = navigator.language;
      const currentLang = this.locale.substring(0, 2);
      
      if (browserLang.startsWith('en') && currentLang === 'fr') {
        sessionStorage.setItem('lang_redirected', 'true');
        this.switchLanguage('en');
      }
    }
  }

  toggleLanguage() {
    const newLocale = this.locale.startsWith('fr') ? 'en' : 'fr';
    this.switchLanguage(newLocale);
  }

  private switchLanguage(lang: string) {
    const currentUrl = this.document.location.href;
    const currentPath = this.document.location.pathname;
    let newUrl;

    if (lang === 'en') {
       if (currentPath.startsWith('/fr')) {
         newUrl = currentUrl.replace('/fr', '/en');
       } else {
         newUrl = `${this.document.location.origin}/en${currentPath}`;
       }
    } else {
       if (currentPath.startsWith('/en')) {
         newUrl = currentUrl.replace('/en', '/fr');
       } else {
         newUrl = `${this.document.location.origin}/fr${currentPath}`;
       }
    }

    this.document.location.href = newUrl;
  }
}
