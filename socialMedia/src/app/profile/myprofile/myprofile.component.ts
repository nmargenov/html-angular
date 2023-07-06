import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/services/user-service.service';
import { IUser } from 'src/app/types/IUser';
import { decodeBuffer } from 'src/app/utils/pictureHelper';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css'],
})
export class MyprofileComponent implements OnInit {
  
  constructor(private userService: UserServiceService) {}



  user: IUser | null = null;

  imageUrl = '';

  isOwner = false;
  isLoading = true;
  userId = '';
  ngOnInit() {
    this.userId = this.userService.decodedToken!._id;
    if(this.userId == this.userService.decodedToken?._id){
      this.isOwner=true;
    }
    this.userService.getUserData(this.userId).subscribe(
      (data) => {
        this.user = data;
        this.imageUrl = decodeBuffer(this.user!.profilePicture!.data);
        this.isLoading = false;
      },
      (err) => {
        this.isLoading = false;
        console.log(err);
      }
    );
  }
}
