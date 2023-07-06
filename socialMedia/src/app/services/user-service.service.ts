import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { IUser } from '../types/IUser';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  constructor(
    private cookieService: CookieService,
    private http: HttpClient,
    private router: Router
  ) {}

  get isLoggedIn() {
    return !!this.cookieService.get(environment.TOKEN);
  }

  get decodedToken() {
    const token = this.cookieService.get(environment.TOKEN);
    if (token !== '') {
      const decodedToken: IUser = jwtDecode(token);
      return decodedToken;
    }
    return null;
  }

  login(username: string, password: string): Observable<string> {
    return this.http
      .post<string>(environment.REST_API + '/users/login', {
        username,
        password,
      })
      .pipe(catchError(this.errorHandler));
  }

  register(
    username: string,
    password: string,
    rePassword: string,
    email: string,
    age: number,
    firstName: string,
    lastName: string
  ): Observable<string> {
    return this.http
      .post<string>(environment.REST_API + '/users/register', {
        username,
        password,
        rePassword,
        email,
        age,
        firstName,
        lastName,
      })
      .pipe(catchError(this.errorHandler));
  }

  getUserData(userId: string): Observable<IUser> {
    return this.http
      .get<IUser>(environment.REST_API + `/users/${userId}`)
      .pipe(catchError(this.errorHandler));
  }

  updateProfilePicture(userId: string, formData: FormData): Observable<string> {
    return this.http
      .post<string>(
        environment.REST_API + `/users/profilePicture/${userId}`,
        formData
      )
      .pipe(catchError(this.errorHandler));
  }

  updateProfile(
    userId: string,
    field: string,
    value: string | number | { oldPassword: string; newPassword: string }
  ): Observable<string> {
    return this.http
      .patch<string>(environment.REST_API + `/users/${userId}`, {
        field,
        value,
      })
      .pipe(catchError(this.errorHandler));
  }

  follow(userToFollowId: string, userId: string): Observable<IUser> {
    return this.http
      .post<IUser>(environment.REST_API + `/users/follow/${userToFollowId}`, {
        userToFollowId,
        userId,
      })
      .pipe(catchError(this.errorHandler));
  }

  unFollow(userToUnfollowId: string, userId: string): Observable<IUser> {
    return this.http
      .post<IUser>(
        environment.REST_API + `/users/unfollow/${userToUnfollowId}`,
        { userToUnfollowId, userId }
      )
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.error.message || 'Unknown error!');
  }
}
