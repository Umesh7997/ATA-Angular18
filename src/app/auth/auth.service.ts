
import {  HttpClient } from '@angular/common/http';
import {  inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, map, Observable, of } from 'rxjs';

export const TOKEN_KEY = 'auth-token';
export const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private jwtHelper = new JwtHelperService();
  private apiUrl ="http://localhost:3000";
  
  http = inject(HttpClient);
  snackbar = inject(MatSnackBar);
  router = inject(Router);
  constructor() { }

  showSnackbar() {
    this.snackbar.open('User added successfully','',{
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition:'top',
      panelClass:['custom-snackbar']
    });
  }

  showLoginSnackbar() {
    this.snackbar.open('User Logged In Successful','',{
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition:'top',
      panelClass:['custom-snackbar']
    });
  }

  login(email:string,password:string): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/users`).pipe(
      map(users=>{
        const user = users.find((u:any)=> u.email === email && u.password === password);
        if (user) {
          const token = this.generateToken();
          console.log('Setting token:', token);
          localStorage.setItem(TOKEN_KEY, token);
          console.log('Setting user:', user);
          localStorage.setItem(USER_KEY, JSON.stringify(user));
          console.log('User added', user);
          return { token,role:user.role };
        } else {
          console.log('Invalid credentials');
          return { error: 'Invalid credentials' };
        }
      }),
      catchError(error => {
        console.error('Error during login:', error);
        return of({ error: 'Login failed' });
      })
    );
    
  }

  logout(){
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this.router.navigate(['/home']);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(TOKEN_KEY);
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }

  private generateToken(): string {
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ1bWVzaCIsImlhdCI6MTYxNjIzOTAyMn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
  }
}
