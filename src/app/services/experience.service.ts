import { Injectable, signal, Inject, LOCALE_ID, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Experience } from '../models/experience.model';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../models/API/responseExperience.model';

@Injectable({ providedIn: 'root' })
export class ExperienceService {

  private http = inject(HttpClient);

  constructor(@Inject(LOCALE_ID) public locale: string) {
    this.fetchExperiences();
  }

  private readonly _experiences = signal<Experience[]>([]);
  readonly experiences = this._experiences.asReadonly();

  private fetchExperiences() {
    this.http.get<ApiResponse>(`https://cms.andrew-marbach.fr/api/experiences?locale=${this.locale}&trash=false`)
      .pipe(
        map(response => response.docs.map(exp => ({
          id: exp.id,
          title: exp.title,
          company: exp.company,
          startDate: new Date(exp.startDate),
          link: exp.link,
          location: exp.location,
          description: exp.description,
          details: exp.details?.map(d => d.detail) || [],
          skills: exp.skills?.map(s => s.name) || [],
          technologies: exp.technologies?.map(t => t.name) || [],
          current: exp.isCurrentlyWorkingHere,
          endDate: exp.endDate ? new Date(exp.endDate) : undefined
        } as Experience)))
      )

      .subscribe({
        next: (experiences) => {
          experiences.sort((a, b) => {
            if (a.current === b.current) {
              return b.startDate.getTime() - a.startDate.getTime();
            }
            return a.current ? -1 : 1;
          });
          this._experiences.set(experiences);
        },
        error: (error) => console.error('Failed to load experiences', error)
      });
  }
}
