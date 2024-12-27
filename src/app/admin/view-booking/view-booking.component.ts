import { Component, inject, OnInit } from '@angular/core';
import { BookingsService } from '../services/bookings.service';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { ViewDetailsComponent } from '../../reusable/view-details/view-details.component';

@Component({
  selector: 'app-view-booking',
  standalone: true,
  imports: [ViewDetailsComponent,MatIconModule],
  templateUrl: './view-booking.component.html',
  styleUrl: './view-booking.component.css'
})
export class ViewBookingComponent implements OnInit{

  router = inject(Router);

  ngOnInit(): void {
   this.getBookingsDetails();
  }

  columns=[ "boarding_point",
    "drop_point",
    "journey_date",
    "no_of_passangers",
    "route_destination",
    "route_source",
    "status","action"];
  dataSource=[];

  bookingSer = inject(BookingsService);

  getBookingsDetails(){
    this.bookingSer.getBookings().subscribe(data=>{
      this.dataSource = data;
      console.log(this.dataSource);
    })
  }

}
