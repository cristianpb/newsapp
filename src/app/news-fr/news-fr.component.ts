import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news.service';
import { Article } from '../article';

@Component({
  selector: 'app-news-fr',
  templateUrl: './news-fr.component.html',
  styleUrls: ['./news-fr.component.scss']
})
export class NewsFrComponent implements OnInit {

  articles: Article[] = [];

  constructor(private newsservice: NewsService) {}

  ngOnInit() {
    this.getNews()
  }

  getNews() {
    this.newsservice.getNews('news_fr').subscribe(articles => {
      console.log(articles);
      this.articles = articles.data;
    });
  }

}
