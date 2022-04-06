import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as AppUtil from '../common/app.util';

@Injectable()
export class UserService {

  constructor(private _http:HttpClient) { }

  createAccount(user: any) {
    return this._http.post('/api/signup', user)
  }

  auth(user: any) {
    return this._http.post('/api/signin', user)
  }

  saveUserData(token: any, user: any) {
    localStorage.setItem(AppUtil.AUTH_TOKEN, token);
    localStorage.setItem(AppUtil.USER_INFO, JSON.stringify(user))
  }

  isLoggedIn() :boolean {
    return !!localStorage.getItem(AppUtil.AUTH_TOKEN);
  }

  logOut() {
    localStorage.removeItem(AppUtil.AUTH_TOKEN);
    localStorage.removeItem(AppUtil.USER_INFO);
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem(AppUtil.USER_INFO)!);
  }
}
