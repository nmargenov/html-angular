import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserServiceService } from 'src/app/services/user-service.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private cookie:CookieService,private router:Router, private userService:UserServiceService){}

  errorMsg="";

  userModel={
    username:"",
    password:''
  }

  private password = '';
  private username = '';
  onSubmit() {
    this.username = this.userModel.username;
    this.password = this.userModel.password;
    this.userService.login(this.username, this.password).subscribe(
      (data: string) => {
        const token = data;
        this.cookie.set(environment.TOKEN, token);
        this.router.navigate(['/']);
      },
      (err) => {
        this.errorMsg=err;
      }
    );
  }
}
