import { Injectable, signal, Inject, LOCALE_ID, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../../models/projet.model';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../../models/API/responseProject.model';


@Injectable({ providedIn: 'root' })
export class ProjectService {
  private http = inject(HttpClient);

  constructor(@Inject(LOCALE_ID) public locale: string) {
    this.fetchProjects();
  }

  private readonly _projects = signal<Project[]>([]);
  readonly projects = this._projects.asReadonly();

  private fetchProjects() {
    this.http.get<ApiResponse>(`https://cms.andrew-marbach.fr/api/projects?depth=2&draft=false&locale=${this.locale}&trash=false`)
      .pipe(
        map(response => response.docs.map(proj => ({
          title: proj.title,
          description: proj.description,
          details: proj.detail,
          functionalities: proj.functionnalities?.map(f => f.functionnality) || [],
          gradient: 'from-slate-700 to-slate-800 hover:from-amber-900/50 hover:to-slate-800',
          imageUrl: proj.image ? `https://cms.andrew-marbach.fr${proj.image.url}` : undefined,
          thumbnailUrl: proj.thumbnail ? `https://cms.andrew-marbach.fr${proj.thumbnail.url}` : undefined,
          technologies: proj.technologies?.map(t => t.name) || [],
          wip: proj.isCurrentlyWorkingOn,
          githubUrl: proj.repoURL || undefined,
          siteUrl: proj.siteURL || undefined
        } as Project))
        )
      )
      .subscribe({
        next: (projects) => {
          this._projects.set(projects);
        },
        error: (error) => console.error('Failed to load projects', error)
      });
  }
}