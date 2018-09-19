import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news.service';
import { Article } from '../../../server/src/entities/article';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
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
