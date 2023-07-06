import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { FeedModule } from './feed/feed.module';
import { ProfileModule } from './profile/profile.module';
import { authInterceptor } from './interceptors/auth-interceptor.interceptor';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    AuthModule,
    HomeModule,
    FeedModule,
    ProfileModule,
    SharedModule,
    UserModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,
    useClass:authInterceptor,
    multi:true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
