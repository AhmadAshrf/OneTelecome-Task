import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginStatus:BehaviorSubject<boolean>
  constructor() { 
    this.loginStatus = new BehaviorSubject<boolean>(this.isLoggedIn)
  }

  signup(fullName:string, email:string, password:string){
    localStorage.setItem('fullName', fullName)
    localStorage.setItem('email', email)
    localStorage.setItem('password', password)

    //Handling BehaviorSubject Observable
    this.loginStatus.next(true)
  }

  logout(){
    localStorage.clear()
    this.loginStatus.next(false)
  }

  get isLoggedIn():boolean{
    let email = localStorage.getItem('email')
    return email != null
  }
}
