import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExploreComponent } from './explore/explore.component';
import { FollowingComponent } from './following/following.component';
import { FeedComponent } from './feed/feed.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { StateComponent } from './state/state.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ExploreComponent,
    FollowingComponent,
    FeedComponent,
    CreatePostComponent,
    StateComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    ExploreComponent,
    FollowingComponent,
    FeedComponent,
    CreatePostComponent,
    StateComponent
  ]
})
export class FeedModule { }
