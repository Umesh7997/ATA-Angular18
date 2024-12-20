import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  constructor() { }

 private apiUrl ="http://localhost:3000";
  http = inject(HttpClient)

  addDriver(data:any):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/drivers`,data);
  }

  getDrivers():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/drivers`);
  }
}
