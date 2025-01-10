import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, OnInit, ViewChild, viewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { VehicleService } from '../services/vehicle.service';
import { DriverService } from '../services/driver.service';
import { FilterDriversPipe } from '../../pipes/filter-drivers.pipe';
import { NgSelectModule } from '@ng-select/ng-select';
import { ViewVehicleComponent } from '../view-vehicle/view-vehicle.component';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-vehicle',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,MatButtonModule,
    FilterDriversPipe,NgSelectModule,ViewVehicleComponent],
  templateUrl: './add-vehicle.component.html',
  styleUrl: './add-vehicle.component.css'
})
export class AddVehicleComponent implements AfterViewInit,OnInit{

  @ViewChild(ViewVehicleComponent) viewVehicleComponent !: ViewVehicleComponent;
  
  http=inject(HttpClient);
  vehicleForm : FormGroup;
  fb = inject(FormBuilder);
  vehicleSer = inject(VehicleService);
  driverSer = inject(DriverService);
  actiRoute = inject(ActivatedRoute);
  router =inject(Router);
  isEditMode = false;
  vehicleId:string | null =null;

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
  ngAfterViewInit(): void {
    this.viewVehicleComponent.getVehicles();
  }

  ngOnInit(){
    this.getDriver();
this.actiRoute.paramMap.subscribe(params =>{
  this.vehicleId = params.get('id');
  if(this.vehicleId){
    this.isEditMode = true;
    this.loadVehicleData(this.vehicleId);
  }
  else{
    this.isEditMode = false;
  }
})
  }


  loadVehicleData(id:string){
    this.vehicleSer.getVehicleById(id).subscribe(vehIdRes =>{
      this.vehicleForm.patchValue(vehIdRes);
    });
  }
 
  vehicleSubmit(){
    if(this.vehicleForm.valid){
      if(this.isEditMode && this.vehicleId){
this.vehicleSer.updateVehicles(this.vehicleId,this.vehicleForm.value).subscribe({
  next:(res:any)=>{
    console.log(res);
    this.resetForm();
    this.viewVehicleComponent.getVehicles();
  }
})
      }else{
    this.vehicleSer.addVehicles(this.vehicleForm.value).subscribe({
      next: (res: any) => {
        this.vehicleForm.reset();
        console.log(res);
        this.viewVehicleComponent.getVehicles();
      },
      error:(err:any)=>{
        console.log(err);
      }
    })
  }
    }
  }

  getDriver(){
    this.driverSer.getDrivers().subscribe(data=>{
      this.driversData =data;
      console.log("hello",this.driversData);
    });
  }

  private resetForm():void{
    this.vehicleForm.reset();
    this.isEditMode =false;
    this.vehicleId=null;
    this.router.navigate(['/admin-dashboard/add-vehicle']);
  }
}
