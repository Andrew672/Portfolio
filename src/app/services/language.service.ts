import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private _language$ = new BehaviorSubject<string>('fr');
  readonly language$ = this._language$.asObservable();

  setLanguage(lang: string) {
    console.debug('[LanguageService] setLanguage', lang);
    this._language$.next(lang);
  }
}
