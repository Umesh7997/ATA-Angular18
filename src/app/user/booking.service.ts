import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  http = inject(HttpClient);
  private apiUrl ="http://localhost:3000";


  constructor() { }

  bookVehicle(data:any):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/bookVehicle`,data)
  }
}
