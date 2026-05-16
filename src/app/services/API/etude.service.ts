import { Injectable, Inject, LOCALE_ID, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Etude } from '../../models/etude.model';
import { map, tap } from 'rxjs/operators';
import { ApiResponse } from '../../models/API/responseEtude';
import { LexicalParserService } from '../lexical-parser.service';
import { environment } from '../../../environments/environment';


@Injectable({ providedIn: 'root' })
export class EtudeService {

  private http = inject(HttpClient);
  private lexicalParser = inject(LexicalParserService);

  constructor(@Inject(LOCALE_ID) public locale: string) {
  }

  loadEtudes(locale?: string) {
    const useLocale = locale ?? this.locale;
    console.debug('[EtudeService] loadEtudes', useLocale);
    return this.http.get<ApiResponse>(`${environment.cmsApiBaseUrl}/api/studies?depth=2&draft=false&locale=${useLocale}&trash=false`)
      .pipe(
        map(response => response.docs.map(etude => ({
          id: etude.id,
          title: etude.title,
          institution: etude.institution,
          startDate: new Date(etude.startDate),
          link: etude.link,
          location: etude.location,
          description: this.lexicalParser.parseLexicalDescription(etude.description),
          details: etude.details?.map(d => d.detail) || [],
          skills: etude.skills?.map(s => s.name) || [],
          technologies: etude.technologies?.map(t => t.name) || [],
          current: etude.isCurrentlyStudying || false,
          endDate: etude.endDate ? new Date(etude.endDate) : undefined,
          degree: etude.degree,
          field: etude.fieldOfStudy
        } as Etude))),
        tap((etudes: Etude[]) => console.debug('[EtudeService] loaded', etudes?.length ?? 0, 'etudes for', useLocale)),
        map((etudes: Etude[]) => etudes.sort((a, b) => {
          if (a.current === b.current) {
            return b.startDate.getTime() - a.startDate.getTime();
          }
          return a.current ? -1 : 1;
        }))
      );
  }
}
