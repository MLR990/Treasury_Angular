import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginUser } from '../models/login-user';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

export const TOKEN_NAME: string = 'jwt_token';
export const REFRESH_TOKEN_NAME: string = 'refresh_token';

const API_URL: string = `${environment.apiURL}/api/auth`;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public currentUserName: string | null = null;

  constructor(private httpClient: HttpClient) {}
  public login(loginUser: LoginUser): Observable<any> {
    const url = `${environment.apiURL}/`;
    return this.httpClient.post<any>(`${API_URL}/login`, loginUser).pipe(
      map((response) => {
        localStorage.setItem(TOKEN_NAME, response.token);
        localStorage.setItem(REFRESH_TOKEN_NAME, response.refreshToken);
      })
    );
  }

  public logout(): Observable<string> {
    localStorage.removeItem(TOKEN_NAME);
    return this.httpClient.get<string>(`${API_URL}/logout`);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(TOKEN_NAME) !== null;
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_NAME);
  }

  setToken(token: string): void {
    localStorage.setItem(TOKEN_NAME, token);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN_NAME);
  }

  setRefreshToken(token: string): void {
    localStorage.setItem(REFRESH_TOKEN_NAME, token);
  }

  public refreshToken(): Observable<any> {
    var token = this.getToken();
    var refreshToken = this.getRefreshToken();

    return this.httpClient
      .post<any>(`${API_URL}/generate-new-jwt-token`, {
        token: token,
        refreshToken: refreshToken,
      })
      .pipe(
        map((response) => {
          localStorage.setItem(TOKEN_NAME, response.token);
          localStorage.setItem(REFRESH_TOKEN_NAME, response.refreshToken);
        })
      );
  }
}
