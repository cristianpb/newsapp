import { Component , OnInit} from '@angular/core';
import { NewsService } from './news.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [NewsService]
})
export class AppComponent implements OnInit {
  title = 'newsapp';
  burger: boolean = false;
  selectedTab: string = 'posts';

  constructor(private newsservice: NewsService) {}

  toggleBurger() {
    this.burger = !this.burger;
  }

  ngOnInit() {
  }
}

