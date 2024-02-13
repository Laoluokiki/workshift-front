import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ILogin, IRegister, UserInfoType } from '../model/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private baseUrl = environment.baseUrl;

  private jwtHelper: JwtHelperService = new JwtHelperService();

  public loggedInUser$: BehaviorSubject<any> = new BehaviorSubject({});

  constructor(private httpClient: HttpClient, private router: Router) {}

  private get getToken(): string | null {
    return localStorage['token']?.replaceAll('"', '');
  }

  private get getRefreshToken(): string | null {
    return localStorage['refresh']?.replaceAll('"', '');
  }

  public get getUserInfo(): any | null {
    const userInfo: any | null = localStorage['userInfo'];
    return userInfo && JSON.parse(userInfo);
  }

  private setUserInfo(userInfo: UserInfoType): void {
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  }

  public setToken(token: string): void {
    localStorage.setItem('token', JSON.stringify(token));
  }

  private setRefreshToken(refresh: string): void {
    localStorage.setItem('refresh', JSON.stringify(refresh));
  }

  private clearStorage(): void {
    localStorage.clear();
  }

  public login(payload: ILogin, userType: 'admin' | 'user'): Observable<any> {
    return this.httpClient
      .post(`${this.baseUrl}/${userType}-login`, payload)
      .pipe(
        tap((result: any) => {
          this.clearStorage();
          const { success } = result;
          if (success) {
            const userInfo: UserInfoType = {
              username: payload.username,
              firstName: '',
              lastName: '',
              email: '',
            };

            this.setUserInfo(userInfo);
            this.setToken(result.token);
            //   this.setRefreshToken(data.refreshToken)
          }
        })
      );
  }

  public register(payload: IRegister): Observable<any>{
    return this.httpClient.post(this.baseUrl+`/create-user-account`, payload)
  }

  public refreshToken(): Observable<any> {
    return this.httpClient
      .post<any>(`${this.baseUrl}/refresh-token`, {
        token: this.getRefreshToken,
      })
      .pipe(
        tap((result: any) => {
          console.log('Refreshed Token: ', result);
          this.setToken(result.accessToken);
          this.setRefreshToken(result.refreshToken);
        })
      );
  }

  public isAuthenticated() {
    const token: string | null = this.getToken;
    if (token && !this.jwtHelper.isTokenExpired(token)) return true;
    return false;
  }

  public logout() {
    this.router.navigate(['/']);
    localStorage.clear();
  }
}
