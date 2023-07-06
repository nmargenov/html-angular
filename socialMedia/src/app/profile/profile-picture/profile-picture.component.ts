import {
  Component,
  Input,
  OnChanges,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserServiceService } from 'src/app/services/user-service.service';
import { IUser } from 'src/app/types/IUser';

import { decodeBuffer } from 'src/app/utils/pictureHelper';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.css'],
})
export class ProfilePictureComponent implements OnChanges {
  constructor(
    private userService: UserServiceService,
    private cookieService: CookieService
  ) {}

  @Input() isOwner!: boolean;
  @Input() user!: IUser | null;
  @Input() userId!: string;
  @Input() imageUrl!: string;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['user']) {
      this.user = changes['user'].currentValue;
    }
    if (changes['userId']) {
      this.userId = changes['userId'].currentValue;
    }
  }

  isLoadingImage = true;

  onImageError() {
    this.isLoadingImage = false;
  }

  onImageLoad() {
    this.isLoadingImage = false;
  }

  errorMsg = '';

  selectedFile: File | undefined;

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.selectedFile = file;
  }
  isChanging = false;
  onUpdateProfilePicture() {
    this.isChanging = true;
    let formData = new FormData();
    formData.set('profilePicture', this.selectedFile!);
    this.selectedFile = undefined;
    
    this.userService.updateProfilePicture(this.userId, formData).subscribe(
      (data) => {
        this.cookieService.set(environment.TOKEN, data);
        this.user = this.userService.decodedToken;
        this.errorMsg != '' ? (this.errorMsg = '') : null;
        this.isChanging=false;
        this.isLoadingImage=true;
        this.imageUrl = decodeBuffer(this.user!.profilePicture!.data);
      },
      (err) => {
        this.isChanging=false;
        this.errorMsg = err;
      }
    );
  }
}
