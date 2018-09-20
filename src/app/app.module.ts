import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NewsComponent } from './news/news.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MomentModule } from 'angular2-moment';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { PostsComponent } from './posts/posts.component';
import { NewsFrComponent } from './news-fr/news-fr.component';

@NgModule({
  declarations: [
    AppComponent,
    NewsComponent,
    PostsComponent,
    NewsFrComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MomentModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
