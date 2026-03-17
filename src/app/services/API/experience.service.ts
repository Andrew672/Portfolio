import { Injectable, signal, Inject, LOCALE_ID, inject } from '@angular/core';
import { Experience } from '../../models/experience.model';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../../models/API/responseExperience.model';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class ExperienceService {

  constructor(private apiService: ApiService) {}

  private experiences$ = this.apiService.getContents<ApiResponse>({
      collection: 'experiences',
      sort: '-endDate', // tri décroissant
    }).pipe(
      map(response => response.docs.map(exp => this.mapExperience(exp)))
    );

  readonly experiences = toSignal(this.experiences$, { initialValue: [] as Experience[] });

  private mapExperience(exp: any): Experience {
    return {
      id: exp.id,
      title: exp.title,
      company: exp.company,
      startDate: new Date(exp.startDate),
      link: exp.link,
      location: exp.location,
      description: exp.description,
      details: exp.details?.map((d: any) => d.detail) || [],
      skills: exp.skills?.map((s: any) => s.name) || [],
      technologies: exp.technologies?.map((t: any) => t.name) || [],
      current: exp.isCurrentlyWorkingHere,
      endDate: exp.endDate ? new Date(exp.endDate) : undefined
    } as Experience;
  }
}
