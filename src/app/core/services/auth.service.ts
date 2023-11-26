import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { authToken, baseUrl, rembemberMe } from '../constants/constants';
import { AuthSuccess, SignIn, UserData } from '../intrefaces/auth.interface';
import { LocalStorageSevice } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends LocalStorageSevice {

  constructor(private http: HttpClient) {
    super();
  }

  authUser(data: SignIn): Observable<UserData> {
    const { rememberUser, ...rest } = data;
    return this.http.post<AuthSuccess>(`${baseUrl}/auth/login`, data).pipe(
      tap(res => this.setItem(authToken, res.token)),
      tap((_) => this.setItem(rembemberMe, rememberUser)),
      catchError((err) => throwError(() => new Error(err))),
      //tap(data => console.log(data))

      map(({ token, ...rest }) => ({ ...rest })),
    )
  }

  isAuthorized(): boolean {
    return this.itemExist(authToken)
  }
}
