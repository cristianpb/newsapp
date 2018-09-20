import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  providers:[NewsService]
})
export class PostsComponent implements OnInit {
  news= []
  newsSources= [];
  searches = [];
  error: string;
  params: any;
  selectedCategory: string;
  selectedLanguage: string;
  selectedEndpoint: string;
  selectedValue: string;
  selectedSortBy: string;
  endpoints: any = [
    {value: 'top-headlines', viewValue: 'Top headlines'},
    {value: 'everything', viewValue: 'Everything'},
  ];
  categories: any = [
    {value: 'business', viewValue: 'Business'},
    {value: 'general', viewValue: 'General'},
    {value: 'health', viewValue: 'Health'},
    {value: 'science', viewValue: 'Science'},
    {value: 'sports', viewValue: 'Sports'},
    {value: 'technology', viewValue: 'Technology'},
    {value: 'entertainment', viewValue: 'Entertainment'},
    {value: '', viewValue: 'Empty'}
  ];
  languages: any = [
    {value: 'fr', viewValue: 'French'},
    {value: 'en', viewValue: 'English'},
    {value: 'pt', viewValue: 'Portuguese'},
    {value: 'it', viewValue: 'Italian'},
    {value: 'de', viewValue: 'German'},
    {value: 'nl', viewValue: 'Netherlands'},
    {value: 'es', viewValue: 'Spanish'},
    {value: '', viewValue: 'Empty'}
  ];
  sortBy: any = [
    {value: 'publishedAt', viewValue: 'Newsest firsts'},
    {value: 'relevancy', viewValue: 'More closely related to query'},
    {value: 'popularity', viewValue: 'Popular sources and publishers'},
    {value: '', viewValue: 'Empty'},
  ];
  addHero(newQuery: string) {
    //if (newQuery) {
      this.params = {
        query: newQuery,
        endpoint: this.selectedEndpoint,
        category: this.selectedCategory,
        language: this.selectedLanguage,
        sortBy: this.selectedSortBy,
      }
      this.newsService.getNewBySource(this.params)
        .subscribe(
          response => {
            this.error = ""
            this.news = response.articles
            this.searches.push(`${newQuery} ${response.articles.length}/${response.totalResults}`);
            //console.log(response);
          },
          error => {
            this.error = error.error.message;
            this.news = []
          }
        );
    //}
  }

  constructor(private newsService: NewsService){}

  ngOnInit() {
    this.selectedEndpoint = this.endpoints[0]['value'];
  }


  filterNews(source) {
    this.news=[];
    this.newsService.getNewBySource(source)
      .subscribe(
        response => this.news = response
      );
  }

  getnewsSources() {
    this.newsService.getSources()
      .subscribe(
        response => {
          this.newsSources = response
        }
      );
  } 

}
