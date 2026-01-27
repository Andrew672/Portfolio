import { Injectable, signal, Inject, LOCALE_ID, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Etude } from '../../models/etude.model';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../../models/API/responseEtude';
import { LexicalParserService } from '../lexical-parser.service';


@Injectable({ providedIn: 'root' })
export class EtudeService {

  private http = inject(HttpClient);
  private lexicalParser = inject(LexicalParserService);

  constructor(@Inject(LOCALE_ID) public locale: string) {
    this.fetchEtudes();
  }

  private readonly _etudes = signal<Etude[]>([]);
  readonly etudes = this._etudes.asReadonly();

  private fetchEtudes() {
    this.http.get<ApiResponse>(`https://cms.andrew-marbach.fr/api/studies?depth=2&draft=false&locale=${this.locale}&trash=false`)
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
        } as Etude)))
      )
      .subscribe({
        next: (etudes) => {
          etudes.sort((a, b) => {
            if (a.current === b.current) {
              return b.startDate.getTime() - a.startDate.getTime();
            }
            return a.current ? -1 : 1;
          });
          this._etudes.set(etudes);
        },
        error: (error) => console.error('Failed to load etudes', error)
      });
  }
}
