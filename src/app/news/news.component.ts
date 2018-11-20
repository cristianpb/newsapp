import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news.service';
import { Article } from '../article';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  articles: Article[] = [];
  source: string = 'news';

  constructor(private newsservice: NewsService) {}

  ngOnInit() {
    this.getNews()
  }

  getNews() {
    this.newsservice.getNews(this.source).subscribe(articles => {
      this.articles = articles.data;
    });
  }

  likeNews(article: Article): void {
    this.newsservice.saveLike({'_id': article['_id'], 'source': this.source})
      .subscribe(message => this.getNews());
  }

  dislikeNews(article: Article): void {
    this.newsservice.saveDislike({'_id': article['_id'], 'source': this.source})
      .subscribe(message => this.getNews());
  }
}
