import { Injectable, Inject, LOCALE_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Filter } from '../../models/API/filter.model';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = 'https://cms.andrew-marbach.fr';
  private http : HttpClient = Inject(HttpClient);
  private locale = Inject(LOCALE_ID);

  getContents<T = any>(collection: string, sort?: string, filter?: Filter, limit = 50, page = 1) {
    const whereParam = filter ? `&where=${encodeURIComponent(JSON.stringify(filter))}` : '';
    const sortParam = sort ? `&sort=${sort}` : '';
    const limitParam = `&limit=${limit}`;
    const pageParam = `&page=${page}`;
    const localeParam = `&locale=${this.locale}`;

    const url = `${this.baseUrl}/api/${collection}?trash=false${whereParam}${sortParam}${limitParam}${pageParam}${localeParam}`;

    return this.http.get<T>(url);
  }
}