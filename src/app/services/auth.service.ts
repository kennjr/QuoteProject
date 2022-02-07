import { Injectable } from '@angular/core';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authStatus = false;

  private loggedInStatus = JSON.parse(localStorage.getItem('isLoggedIn') || 'false')
  private userInfo = JSON.parse(localStorage.getItem('userInfo') || this.authStatus.toString())

  constructor() { }

  addUser (user :User, status:boolean){
    let userInfoString = JSON.stringify(user)
    this.authStatus = status;

    localStorage.setItem("userInfo", userInfoString);
    localStorage.setItem("isLoggedIn", status.toString());
  }

  get isLoggedIn (){
    return this.loggedInStatus;
  }

  get userDetails (){
    return this.userInfo;
  }
}