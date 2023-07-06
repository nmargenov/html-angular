import { Component } from '@angular/core';
import { UserServiceService } from 'src/app/services/user-service.service';
import { decodeBuffer } from 'src/app/utils/pictureHelper';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent {
  constructor (private userService:UserServiceService){}
  tweetImg = '';
  username = '';
  firstName = '';
  lastName = '';
  ngOnInit(){
    const user = this.userService.decodedToken;
    this.tweetImg= decodeBuffer(user?.profilePicture?.data!);
    this.username = user?.username!;
    this.firstName = user?.firstName!;
    this.lastName = user?.lastName!;
  }
}
