import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { env } from 'src/env';
import { BehaviorSubject, map } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private currentUserSubject: BehaviorSubject<User>;

  constructor(private httpClient:HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse((localStorage.getItem('currentUser')!)));
    if (this.currentUserSubject.value == null) {
      this.getLogOut();
      this.router.navigateByUrl('login')
    }
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  getConnexion(user:User){
    return this.httpClient.post<User>(`${env.apiUrl}/login`,user).
      pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        console.log(user.data)
        localStorage.setItem('currentUser', JSON.stringify(user.data?.token));
        localStorage.setItem('role', JSON.stringify(user.data?.roles));
        localStorage.setItem('img', JSON.stringify(user.data?.img));
        localStorage.setItem('email', JSON.stringify(user.data?.email));

        this.currentUserSubject.next(user);
        return user;
      }));

  }

  getLoggedIn(){

    if(!this.currentUserValue) {
      return false;
    }
    return localStorage.getItem('role');
  }

  getUsers(){
    return this.httpClient.get(`${env.apiUrl}/getAll`)
  };

  changeRole(id:any,user: User){
   
    return this.httpClient.patch<User>(`${env.apiUrl}/update/${id}`,user);
  };


  modifUsers(id:any,user: User){
   
    return this.httpClient.patch<User>(`${env.apiUrl}/update/${id}`,user);
  }

  addUsers(user: User){
    return this.httpClient.post<User>(`${env.apiUrl}/post`,user);
  }

  getLogOut(){
    // return this.httpClient.post<User>(`${env.apiUrl}/post`,user);
    localStorage.clear();
  }
}


