import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { ProfilePictureComponent } from './profile-picture/profile-picture.component';
import { FormsModule } from '@angular/forms';
import { FieldComponent } from './field/field.component';
import { CapitalizeAndSpaceWordsPipe } from '../utils/pipes';
import { PasswordComponent } from './password/password.component';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { FollowComponent } from './follow/follow.component';



@NgModule({
  declarations: [
    MyprofileComponent,
    ProfilePictureComponent,
    FieldComponent,
    CapitalizeAndSpaceWordsPipe,
    PasswordComponent,
    FollowComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    CoreModule
  ],
  exports:[
    MyprofileComponent,
    ProfilePictureComponent,
    FieldComponent,
    CapitalizeAndSpaceWordsPipe,
    PasswordComponent,
    FollowComponent
  ]
})
export class ProfileModule { }
