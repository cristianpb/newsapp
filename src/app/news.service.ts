import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  key = environment.news_api_key;
  url: string;
  baseurl: string;
  page: number = 0;

  constructor(private http: HttpClient) { }

  getNews(url: string) {
    return this.http.get<any>(`${environment.api}/${url}`);
  }

  getNewBySource(params) {
    this.baseurl = `https://newsapi.org/v2/${params.endpoint}?apiKey=${this.key}`;
    if (params.query) {
      this.baseurl += `&q=${params.query}`;
    }
    if ( params.category ) {
      this.baseurl += `&category=${params.category}`;
    }
    if ( params.country ) {
      this.baseurl += `&category=${params.country}`;
    }
    if ( params.sortBy ) {
      this.baseurl += `&sortBy=${params.sortBy}`;
    }
    //console.log(this.baseurl);
    return this.http.get<any>(this.baseurl);
  }

  getSources() {
    return this.http.get<any>('https://newsapi.org/v2/sources?language=fr&apiKey='+this.key);
  }

}
