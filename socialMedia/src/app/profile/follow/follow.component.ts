import { Component, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';
import { IUser } from 'src/app/types/IUser';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.css'],
})
export class FollowComponent {
  constructor(
    private userService: UserServiceService,
    private route: ActivatedRoute
  ) {}

  @Input() user!: IUser | null;
 
  isFollowing = false;
  canFollow = this.userService.isLoggedIn;

  userToFollowId = '';
  userToUnfollow = '';
  userId = this.userService.decodedToken?._id;
  ngOnChanges(changes: SimpleChanges) {
    if (changes['user']) {
      this.canFollow = this.userService.isLoggedIn && this.user?._id !== this.userService.decodedToken?._id;
      if (this.user && this.user.followers) {
        this.isFollowing = this.user.followers.includes(this.userId!);
      }
    }
  }


  onFollow() {
    const userId = this.userService.decodedToken?._id;
    if (!userId) {
      return;
    }
    this.userToFollowId = this.route.snapshot.paramMap.get('userId')!;
    this.userService.follow(this.userToFollowId, userId).subscribe(
      (data) => {
        this.user = data;
        this.isFollowing = this.user?.followers.includes(this.userId!)!;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onUnfollow() {
    const userId = this.userService.decodedToken?._id;
    if (!userId) {
      return;
    }
    this.userToUnfollow = this.route.snapshot.paramMap.get('userId')!;
    this.userService.unFollow(this.userToUnfollow, userId).subscribe(
      (data) => {
        this.user = data;
        this.isFollowing = this.user?.followers.includes(this.userId!)!;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
