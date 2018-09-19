import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  page: number = 0;

  constructor(private http: HttpClient) { }

  getNews(url: string) {
    return this.http.get<any>(`${environment.api}/${url}`);
  }

}
