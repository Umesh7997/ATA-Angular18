import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  http = inject(HttpClient)

  apiUrl="http://localhost:3000";

  constructor() { }

  userSignIn(data:any): Observable<any>{
   return this.http.post(this.apiUrl+'/users',data);
  }

 userLogin(data:any): Observable<any>{
   return this.http.post(this.apiUrl+'/loginUsers',data);
 }
  
}
