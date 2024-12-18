import { Component, inject } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import { AuthService } from '../../auth/auth.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [MatSidenavModule,MatCardModule,MatToolbarModule,
    MatIconModule,MatButtonModule,MatListModule,CommonModule,
  RouterOutlet,RouterLink],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
authSer = inject(AuthService);
  router =inject(Router);
  menuItems :any[] =[
    {
      icon:'dashboard',
      label:'Dashboard',
      route:'/admin-dashboard'
    },
    {
      icon:'local_taxi',
      label:'+ Vehicles',
      route:'/admin-dashboard/add-vehicle'
    },
    {
      icon:'person_add',
      label:'+ Drivers',
      route:'/admin-dashboard/add-driver'
    },
    {
      icon:'directions',
      label:'+ Routes',
      route:'/admin-dashboard/add-route'
    },
    {
      icon:'assignment_turned_in',
      label:'Bookings',
      route:'/admin-dashboard/view-bookings'
    }
  ]
constructor(){
 
}

logout(){
  this.authSer.logout();
}

}
