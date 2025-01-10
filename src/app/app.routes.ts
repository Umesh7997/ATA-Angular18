import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { AboutComponent } from './auth/about/about.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { BookVehicleComponent } from './user/book-vehicle/book-vehicle.component';
import { ViewBookingComponent } from './admin/view-booking/view-booking.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AddVehicleComponent } from './admin/add-vehicle/add-vehicle.component';
import { AddRouteComponent } from './admin/add-route/add-route.component';
import { AddDriverComponent } from './admin/add-driver/add-driver.component';
import { ViewBookingStatusComponent } from './user/view-booking-status/view-booking-status.component';
import { EditDriverComponent } from './admin/edit-driver/edit-driver.component';
import { EditVehicleComponent } from './admin/edit-vehicle/edit-vehicle.component';
import { EditRouteComponent } from './admin/edit-route/edit-route.component';
import { ChartsComponent } from './charts/charts.component';



export const routes: Routes = [
   {path:'home',component:HomeComponent},
   {path:'',redirectTo:'home',pathMatch:'full'},
   {path:'user-dashboard',component:UserDashboardComponent,
      children:[
         {path:'book-vehicle',component:BookVehicleComponent},
         {path:'view-booking-status',component:ViewBookingStatusComponent}      
      ]
   },


   {path:'admin-dashboard',component:AdminDashboardComponent,
      children:[
        {path:'charts',component:ChartsComponent},
        {path:'',redirectTo:'charts',pathMatch:'full'},
         {path:'add-vehicle',component:AddVehicleComponent},
         {path:'add-route',component:AddRouteComponent},
         {path:'add-driver',component:AddDriverComponent},
         {path:'view-bookings',component:ViewBookingComponent},
         {path:'edit-driver/:id',component:EditDriverComponent},
         {path:'add-driver/:id',component:AddDriverComponent},

         {path:'edit-vehicle/:id',component:EditVehicleComponent},
         {path:'add-vehicle/:id',component:AddVehicleComponent},

         {path:'edit-route/:id',component:EditRouteComponent},
         {path:'add-route/:id',component:AddRouteComponent}
      ]
   },

];
