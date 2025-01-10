import { Component, inject, OnInit } from '@angular/core';
import { DriverService } from '../services/driver.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { ViewDetailsComponent } from '../../reusable/view-details/view-details.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-driver',
  standalone: true,
  imports: [ViewDetailsComponent,MatCardModule,CommonModule],
  templateUrl: './view-driver.component.html',
  styleUrl: './view-driver.component.css'
})
export class ViewDriverComponent implements OnInit{
 

  columns: string[] = ['driver_name', 'driver_address', 'driver_cont', 'driver_ln','action'];
  dataSource: any[] = [];

  driverSer = inject(DriverService);
  router = inject (Router);
 
  ngOnInit(): void {
 this.getDrivers();
  }

  getDrivers(){
    this.driverSer.getDrivers().subscribe(data=>{
      this.dataSource = data;
      console.log("jkjkjl",this.dataSource);
     })
  }

  onEditDriver(driver: any): void {
    this.router.navigate(['/admin-dashboard/add-driver', driver.id]);
  }


}