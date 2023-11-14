import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { authToken, baseUrl } from '../constants/constants';
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
    return this.http.post<AuthSuccess>(`${baseUrl}/auth/login`, data).pipe(
      tap(res => this.setItem(authToken, res.token)),
      map(({ token, ...rest }) => ({ ...rest })),
      tap(data => console.log(data))
    )
  }

  isAuthorized(): boolean {
    return this.itemExist(authToken)
  }
}
