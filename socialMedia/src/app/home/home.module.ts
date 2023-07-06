import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { MostLikedPostsComponent } from './most-liked-posts/most-liked-posts.component';
import { RecentPostsComponent } from './recent-posts/recent-posts.component';



@NgModule({
  declarations: [
    HomeComponent,
    MostLikedPostsComponent,
    RecentPostsComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    HomeComponent,
    MostLikedPostsComponent,
    RecentPostsComponent,
  ]
})
export class HomeModule { }
