import { Component } from '@angular/core';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  
  constructor(private userService:UserServiceService){}

  isMenuOpen = false;
  
  get isLoggedIn(){
    return this.userService.isLoggedIn;
  }

  toggleMenu():void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
