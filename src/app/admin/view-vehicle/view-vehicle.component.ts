import { Component, inject, OnInit } from '@angular/core';
import { VehicleService } from '../services/vehicle.service';
import { ViewDetailsComponent } from '../../reusable/view-details/view-details.component';

@Component({
  selector: 'app-view-vehicle',
  standalone: true,
  imports: [ViewDetailsComponent],
  templateUrl: './view-vehicle.component.html',
  styleUrl: './view-vehicle.component.css'
})
export class ViewVehicleComponent implements OnInit{
 
  columns: string[] = ['vehicle_no', 'vehicle_name', 'seating_capacity', 'driver_id','vehicle_type','vehicle_fare_per_km'];
  dataSource: any[] = [];
  vehicleSer = inject(VehicleService);

  ngOnInit(): void {
   this.vehicleSer.getVehicles().subscribe(data=>{
    this.dataSource = data;
   })
  }
}
