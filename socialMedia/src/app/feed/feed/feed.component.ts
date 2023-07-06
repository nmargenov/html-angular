import { Component, Input } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent {
  feed: string="following";

  onFeedChange(feed: string) {
    this.feed = feed;
  }

  constructor(private postService:PostService){}

  post = [];

  ngOnInit(){
    this.postService.getAllPosts().subscribe(
      (data:[])=>{
        this.post = [];
        console.log(this.post);
      },
      (err)=>{
        console.log(err);
      }
    )
  }

}
