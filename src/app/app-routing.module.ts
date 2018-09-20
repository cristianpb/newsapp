import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component'
import { NewsComponent } from './news/news.component';
import { PostsComponent } from './posts/posts.component';
import { NewsFrComponent } from './news-fr/news-fr.component';

const routes: Routes = [
  { path: '', redirectTo: 'newsapp/posts', pathMatch: 'full' },
  { path: 'newsapp/news', component: NewsComponent },
  { path: 'newsapp/news_fr', component: NewsFrComponent },
  { path: 'newsapp/posts', component: PostsComponent },
  { path: '**', component: PostsComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { 
}
