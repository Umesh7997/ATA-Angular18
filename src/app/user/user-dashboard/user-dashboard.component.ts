import { Component, inject } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router,RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../auth/navbar/navbar.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [NavbarComponent,MatSidenavModule,RouterOutlet,
    MatCardModule,MatToolbarModule,MatIconModule,MatButtonModule,
    MatListModule,CommonModule,RouterLink],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {

  authSer = inject(AuthService);
  router =inject(Router);
  menuItems :any[] =[
    {
      icon:'dashboard',
      label:'Dashboard',
      route:'/user-dashboard'
    },
    {
      icon:'local_taxi',
      label:'Book Vehicle',
      route:'/user-dashboard/book-vehicle'
    },
    {
      icon:'assignment_turned_in',
      label:'Booking Status',
      route:'/user-dashboard/view-booking-status'
    }
  ]
constructor(){
 
}

logout(){
  this.authSer.logout();
}
}
