import { Component, inject, OnInit } from '@angular/core';
import { ViewDetailsComponent } from '../view-details/view-details.component';
import { DriverService } from '../services/driver.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-view-driver',
  standalone: true,
  imports: [ViewDetailsComponent,MatCardModule,CommonModule],
  templateUrl: './view-driver.component.html',
  styleUrl: './view-driver.component.css'
})
export class ViewDriverComponent implements OnInit{
 

  columns: string[] = ['driver_name', 'driver_address', 'driver_cont', 'driver_ln'];
  dataSource: any[] = [];

  driverSer = inject(DriverService)
 
  ngOnInit(): void {
   this.driverSer.getDrivers().subscribe(data=>{
    this.dataSource = data;
    console.log("jkjkjl",this.dataSource);
   })
  }


}
