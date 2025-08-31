import { Injectable } from '@angular/core';
import { HttpProvider } from '../providers/http.provider';
import { NewsApiResponse, News } from '../../interfaces/news.interface';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private httpProvider: HttpProvider) { }

  getTopHeadlines(country: string = 'us'): Observable<NewsApiResponse> {
    const url = `${environment.apiUrl.news}/top-headlines?country=${country}`;
    return this.httpProvider.get<NewsApiResponse>(url);
  }

  searchNews(query: string): Observable<NewsApiResponse> {
    const url = `${environment.apiUrl.news}/everything?q=${query}`;
    return this.httpProvider.get<NewsApiResponse>(url);
  }
}