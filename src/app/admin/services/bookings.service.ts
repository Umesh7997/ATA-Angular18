import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  constructor() { }
  http=inject(HttpClient);
  private apiUrl = "http://localhost:3000"

  getBookings():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/bookVehicle`)
  }
}
