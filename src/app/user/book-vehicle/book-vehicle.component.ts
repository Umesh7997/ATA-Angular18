import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { RouteService } from '../../admin/services/route.service';
import { BookingService } from '../booking.service';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-vehicle',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,NgSelectModule,MatButtonModule],
  templateUrl: './book-vehicle.component.html',
  styleUrl: './book-vehicle.component.css'
})
export class BookVehicleComponent implements OnInit{

  fb = inject(FormBuilder);
  routeSer = inject(RouteService);
  bookingSer=inject(BookingService);
  router =inject(Router);
  bookVehicleForm: FormGroup;
  todayDate:string;
  // tomorrowDate:string;

routeData:any[]=[];

  constructor(){
    this.todayDate = new Date().toISOString().split('T')[0];

    const today = new Date();
    // const tomorrow = new Date(today);
    // tomorrow.setDate(today.getDate() + 1);
    // this.tomorrowDate = tomorrow.toISOString().split('T')[0];
    this.bookVehicleForm = this.fb.group({
      booking_date:[{ value: this.todayDate, disabled: true },Validators.required],
      journey_date:['',Validators.required],
      route_source:['',Validators.required],
      route_destination:['',Validators.required],
      boarding_point:['',Validators.required],
      drop_point:['',Validators.required],
      no_of_passangers:['',[Validators.required,Validators.maxLength(2)]],
      status:['pending']
    })
  }
  ngOnInit(): void {
   this.getRouteData();
  }

  bookVehicleSubmit(){
    if(this.bookVehicleForm.valid){
      this.bookingSer.bookVehicle(this.bookVehicleForm.value).subscribe({
        next:(res:any)=>{
          console.log(res);
          this.router.navigate(['/user-dashboard/view-booking-status']);
        }
      })
    }
  }

  getRouteData(){
    this.routeSer.getRoute().subscribe(data=>{
      this.routeData =data;
      console.log("hello",this.routeData)
    })
  }
}


