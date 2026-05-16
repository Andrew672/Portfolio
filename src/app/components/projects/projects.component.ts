import { Component, inject, OnInit, signal, LOCALE_ID, DestroyRef, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { startWith, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { LanguageService } from '../../services/language.service';
import { CommonModule } from '@angular/common';
import { ProjectCardComponent } from './project-card/project-card.component';
import { ProjectModaleComponent } from './project-modale/project-modale.component';
import { Project } from '../../models/projet.model';
import { ProjectService } from '../../services/API/project.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent, ProjectModaleComponent],
  template: `
    <section class="h-full w-full flex flex-col justify-center p-8 md:p-20 relative">
      <h2 i18n class="text-4xl md:text-6xl font-bold text-white mb-12 border-l-4 border-amber-500 pl-6 w-full max-w-7xl mx-auto">Mes Projets</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl mx-auto">
        @for (project of projects(); track project.title) {
          <app-project-card 
            [project]="project" 
            (select)="selectProject($event)"
          ></app-project-card>
        }
      </div>

      @if (selectedProject()) {
        <app-project-modale 
          [project]="selectedProject()!" 
          (close)="clearSelection()"
        ></app-project-modale>
      }
    </section>
  `,
})
export class ProjectsComponent {
  private readonly projectService = inject(ProjectService);
  readonly projects = signal<Project[]>([]);
  private locale = inject(LOCALE_ID) as string;
  private languageService = inject(LanguageService);
  private destroyRef = inject(DestroyRef);
  private platformId = inject(PLATFORM_ID);

  selectedProject = signal<Project | null>(null);

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      console.debug('[ProjectsComponent] ngOnInit - wiring language subscription for', this.locale);
      const sub = this.languageService.language$
        .pipe(startWith(this.locale), distinctUntilChanged(), switchMap((lang) => this.projectService.loadProjects(lang)))
        .subscribe({
          next: (projects) => {
            console.debug('[ProjectsComponent] received projects', projects?.length ?? 0);
            this.projects.set(projects);
          },
          error: (error) => console.error('Failed to load projects', error)
        });
      this.destroyRef.onDestroy(() => sub.unsubscribe());
    }
  }

  private loadProjects() {
    // kept for manual refresh; delegate to service and let subscription handle initial/load-on-language
    console.debug('[ProjectsComponent] manual refresh requested');
    this.projectService.loadProjects(this.locale).subscribe({
      next: (projects) => this.projects.set(projects),
      error: (error) => console.error('Failed to load projects', error)
    });
  }

  refresh() {
    this.loadProjects();
  }

  selectProject(project: Project) {
    this.selectedProject.set(project);
    document.body.style.overflow = 'hidden';
  }

  clearSelection() {
    this.selectedProject.set(null);
    document.body.style.overflow = 'auto';
  }
}
