import { Injectable, Inject, LOCALE_ID, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Experience } from '../../models/experience.model';
import { map, tap } from 'rxjs/operators';
import { ApiResponse } from '../../models/API/responseExperience.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ExperienceService {

  private http = inject(HttpClient);

  constructor(@Inject(LOCALE_ID) public locale: string) {
  }

  loadExperiences(locale?: string) {
    const useLocale = locale ?? this.locale;
    console.debug('[ExperienceService] loadExperiences', useLocale);
    return this.http.get<ApiResponse>(`${environment.cmsApiBaseUrl}/api/experiences?locale=${useLocale}&trash=false`)
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
        } as Experience))),
        tap((experiences: Experience[]) => console.debug('[ExperienceService] loaded', experiences?.length ?? 0, 'experiences for', useLocale)),
        map((experiences: Experience[]) => experiences.sort((a, b) => {
          if (a.current === b.current) {
            return b.startDate.getTime() - a.startDate.getTime();
          }
          return a.current ? -1 : 1;
        }))
      );
  }
}
