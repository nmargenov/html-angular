import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserServiceService } from 'src/app/services/user-service.service';

@Injectable({
  providedIn: 'root'
})
export class mustBeLoggedIn implements CanActivate {

  constructor(private userService: UserServiceService, private router: Router) {}

  canActivate() {
    if (this.userService.isLoggedIn) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}