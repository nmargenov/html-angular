import { Component, Input } from '@angular/core';
import { UserServiceService } from 'src/app/services/user-service.service';
import { IUser } from 'src/app/types/IUser';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css'],
})
export class PasswordComponent {
  constructor(private userService:UserServiceService){}
  @Input() user!: IUser | null;

  isChanging = false;
  password: string | undefined;
  updatedPass: string | undefined;
  updatedRePass: string | undefined;
  errorMsg = '';
  isChangedPassword = false;
  isLoading=false;

  onCancel(){
    this.password="";
    this.updatedPass="";
    this.updatedRePass="";
    this.isChanging=false;
  }

  onSavePassword() {
    this.isLoading=true;
    const userId = this.userService.decodedToken?._id;
    const data = {
      oldPassword:this.password!,
      newPassword:this.updatedPass!
    }
    this.userService.updateProfile(userId!,'password',data).subscribe(
      (data)=>{
        this.isChangedPassword=true;
        this.errorMsg="";
        this.isLoading=false;
        this.onCancel();
      },
      (err)=>{
        this.isLoading=false;
        this.isChangedPassword=false;
        this.errorMsg=err;
      }
    )
  }

  isInvalidPassword(): boolean {
    return(((!this.updatedPass || this.updatedPass.length < 6)||(!this.updatedRePass || this.updatedRePass.length<6) || (!this.password ||this.password.length<6)) || this.updatedPass!==this.updatedRePass);
  }

  getPasswordErrorMessage(): string {
    if ((!this.updatedPass || this.updatedPass.length < 6)||(!this.updatedRePass || this.updatedRePass.length<6) || (!this.password ||this.password.length<6)) {
      return 'Password must be at least 6 characters long';
    }
    if (this.updatedPass !== this.updatedRePass) {
      return 'New password and confirm password must match';
    }
    return '';
  }

}
