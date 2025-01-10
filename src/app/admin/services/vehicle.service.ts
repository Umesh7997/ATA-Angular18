import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  http= inject(HttpClient);
  private apiUrl ="http://localhost:3000";
  constructor() { }

  addVehicles(data:any):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/vehicles`,data);
  }
 
  getVehicles(){
    return this.http.get<any>(`${this.apiUrl}/vehicles`);
  }

  getVehicleById(id:string){
    return this.http.get<any>(`${this.apiUrl}/vehicles/${id}`);
  }

  updateVehicles(id:string,data:any){
    return this.http.put<any>(`${this.apiUrl}/vehicles/${id}`,data);
  }
}
