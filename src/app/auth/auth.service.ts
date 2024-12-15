
import {  HttpClient } from '@angular/common/http';
import {  inject, Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, map, Observable, of } from 'rxjs';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private jwtHelper = new JwtHelperService();
  private apiUrl ="http://localhost:3000";
  
  http = inject(HttpClient)
  constructor() { }

  login(email:string,password:string): Observable<any>{
    debugger
    return this.http.get<any>(`${this.apiUrl}/users`).pipe(
      map(users=>{
        const user = users.find((u:any)=> u.email === email && u.password === password);
        if(user){
          const token = this.generateToken();
          localStorage.setItem(TOKEN_KEY,token);
          localStorage.setItem(USER_KEY,JSON.stringify(user));
          console.log('user added',user);
          return {token};
        }
        else{
          return {error :'Invalid credentials'};
        }
      })
    )
  }

  logout(){
    localStorage.removeItem('TOKEN_KEY');
    localStorage.removeItem('USER_KEY');
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(TOKEN_KEY);
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }

  private generateToken(): string {
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ1bWVzaCIsImlhdCI6MTYxNjIzOTAyMn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
  }
}
