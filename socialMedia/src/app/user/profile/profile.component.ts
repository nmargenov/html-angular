import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';
import { IUser } from 'src/app/types/IUser';
import { decodeBuffer } from 'src/app/utils/pictureHelper';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  constructor(private userService:UserServiceService,private route:ActivatedRoute,private router:Router){}

  user:IUser|null = null;

  hasError = false;
  isLoading = true;

  imageUrl = '';
  userId=''
  isOwner = false;
  isLoggedIn=false;
  followers = 0;

  isLoggedUserFollowing = false;
  ngOnInit(){
    const userId = this.route.snapshot.paramMap.get('userId');
    if(this.userService.decodedToken?._id == userId){
      this.isOwner=true;
      this.router.navigate(['/profile']);
      this.isLoading=false;
      return;
    }
    this.userService.getUserData(userId!).subscribe(
      (data)=>{
        this.user = data;
        this.isLoggedIn=this.userService.isLoggedIn;
        this.userId = this.route.snapshot.paramMap.get('userId')!;
        this.imageUrl = decodeBuffer(this.user!.profilePicture!.data);
        this.isLoading=false;
      },(err)=>{
        console.log(err);
        this.isLoading=false;
        this.hasError = true;
      }
    )
  }
}
