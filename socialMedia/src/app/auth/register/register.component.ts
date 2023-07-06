import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserServiceService } from 'src/app/services/user-service.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {

  constructor(private userService:UserServiceService,private cookieService:CookieService,private router:Router){}

  userModel = {
    username: '',
    firstName: '',
    lastName: '',
    password: '',
    rePassword: '',
    email: '',
    age: '',
  };

  errorMsg = '';
  equalPasswords = false;

  private username = '';
  private firstName = '';
  private lastName = '';
  private email = '';
  private age = '';
  private password = '';
  private rePassword = '';

  onSubmit() {
    this.username = this.userModel.username;
    this.firstName = this.userModel.firstName;
    this.lastName = this.userModel.lastName;
    this.email = this.userModel.email;
    this.age = this.userModel.age;
    this.password = this.userModel.password;
    this.rePassword = this.userModel.rePassword;

    this.userService
      .register(
        this.username,
        this.password,
        this.rePassword,
        this.email,
        Number(this.age),
        this.firstName,
        this.lastName
      )
      .subscribe(
        (data: any) => {
          const token = data;
          this.cookieService.set(environment.TOKEN, token);
          this.router.navigate(['/']);
        },
        (err) => {
          this.errorMsg = err;
        }
      );
  }

  validatePasswords() {
    if (this.userModel.password !== this.userModel.rePassword) {
      this.equalPasswords = false;
    } else {
      this.equalPasswords = true;
    }
  }
}
