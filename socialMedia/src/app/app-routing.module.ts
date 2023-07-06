import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home/home.component';
import { FeedComponent } from './feed/feed/feed.component';
import { MyprofileComponent } from './profile/myprofile/myprofile.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { ProfileComponent } from './user/profile/profile.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { mustBeLoggedIn } from './auth/guards/must-be-logged-in.guard';
import { mustBeLoggedOut } from './auth/guards/must-be-logged-out.guard';

const routes: Routes = [
  {path:'',component:HomeComponent,title:'Home'},
  {path:'feed',component:FeedComponent,title:'Feed'},
  {path:'profile',component:MyprofileComponent,title:'Profile',canActivate:[mustBeLoggedIn]},
  {path:'user/:userId',component:ProfileComponent,title:'User'},
  {path:'login',component:LoginComponent,title:'Login',canActivate:[mustBeLoggedOut]},
  {path:'register',component:RegisterComponent,title:'Register',canActivate:[mustBeLoggedOut]},
  {path:'logout',component:LogoutComponent,title:'Logout',canActivate:[mustBeLoggedIn]},
  {path:'**',component:NotFoundComponent,title:"Not found"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
