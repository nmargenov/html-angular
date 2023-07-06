import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { CoreModule } from '../core/core.module'
import { ProfileModule } from '../profile/profile.module';



@NgModule({
  declarations: [
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    ProfileModule
  ],exports:[
    ProfileComponent
  ]
})
export class UserModule { }
