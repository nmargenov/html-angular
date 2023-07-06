import { Component, Input } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserServiceService } from 'src/app/services/user-service.service';
import { IUser } from 'src/app/types/IUser';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css'],
})
export class FieldComponent {
  constructor(private userService: UserServiceService, private cookieService:CookieService) {}

  @Input() isOwner!: boolean;
  @Input() user!: IUser | null;
  @Input() fieldName!: string;

  isChanging = false;
  isLoading = false;

  updated: string | undefined;
  errorMsg='';

  ngOnInit() {
    this.updated = this.user?.[this.fieldName];
  }

  onSave(inputType: string) {
    if(this.updated == this.user?.[this.fieldName]){
      this.isChanging=false;
      return;
    }
    this.isLoading=true;
    this.userService
      .updateProfile(this.user?._id!, inputType, this.updated!)
      .subscribe(
        (data) => {
          this.cookieService.set(environment.TOKEN,data);
         this.user = this.userService.decodedToken;
          this.isChanging = false;
          this.isLoading=false;
          this.errorMsg='';
        },
        (err) => {
          this.errorMsg = err;
          this.isLoading=false;
        }
      );

  }

  isInvalid(): boolean {
    switch (this.fieldName) {
      case 'username':
        return this.isUsernameInvalid();
      case 'firstName':
        return this.isFirstNameInvalid();
      case 'lastName':
        return this.isLastNameInvalid();
      case 'age':
        return this.isAgeInvalid();
      case 'email':
        return this.isEmailInvalid();
      default:
        return false;
    }
  }

  isUsernameInvalid(): boolean {
    const username = this.updated;
    return !username || username.length < 3;
  }

  isFirstNameInvalid(): boolean {
    const firstName = this.updated;
    return !firstName || firstName.length < 6;
  }

  isLastNameInvalid(): boolean {
    const lastName = this.updated;
    return !lastName || lastName.length < 6;
  }

  isAgeInvalid(): boolean {
    const age = this.updated;
    return !age || isNaN(Number(age)) || Number(age) < 16 || Number(age) > 100;
  }

  isEmailInvalid(): boolean {
    const email = this.updated;
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return !email || !emailRegex.test(email);
  }

  getErrorMessage(): string {
    switch (this.fieldName) {
      case 'username':
        return 'Username must be at least 3 characters long';
      case 'firstName':
        return 'First name must be at least 6 characters long';
      case 'lastName':
        return 'Last name must be at least 6 characters long';
      case 'age':
        return 'Age must be a number between 16 and 100';
      case 'email':
        return 'Invalid email address';
      default:
        return '';
    }
  }
}
