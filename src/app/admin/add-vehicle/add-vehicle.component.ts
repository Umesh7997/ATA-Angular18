import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { VehicleService } from '../services/vehicle.service';
import { DriverService } from '../services/driver.service';
import { FilterDriversPipe } from '../../pipes/filter-drivers.pipe';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-add-vehicle',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,MatButtonModule,FilterDriversPipe,NgSelectModule],
  templateUrl: './add-vehicle.component.html',
  styleUrl: './add-vehicle.component.css'
})
export class AddVehicleComponent implements OnInit{

  vehicleForm : FormGroup;
  fb = inject(FormBuilder);
  vehicleSer = inject(VehicleService);
  driverSer = inject(DriverService);

  driversData :any[] =[];


  constructor(){
    this.vehicleForm = this.fb.group({
      vehicle_no:['',[Validators.required,Validators.maxLength(10)]],
      vehicle_name:['',Validators.required],
      seating_capacity:['',[Validators.required,Validators.maxLength(2)]],
      driver_id:['',Validators.required],
      vehicle_type:['',Validators.required],
      vehicle_fare_per_km:['',[Validators.required,Validators.maxLength(3)]]
    });
  }

  ngOnInit(){
this.getDriver();
  }
 
  vehicleSubmit(){
    if(this.vehicleForm.valid){
      debugger
    this.vehicleSer.addVehicles(this.vehicleForm.value).subscribe({
      next: (res: any) => {
        this.vehicleForm.reset();
        console.log(res);
      },
      error:(err:any)=>{
        console.log(err);
      }
    })
    }
  }

  getDriver(){
    this.driverSer.getDrivers().subscribe(data=>{
      this.driversData =data;
      console.log("hello",this.driversData);
    });
  }
}
