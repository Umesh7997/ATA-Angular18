import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { AboutComponent } from './auth/about/about.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';



export const routes: Routes = [
   {path:'home',component:HomeComponent},
   {path:'',redirectTo:'home',pathMatch:'full'},
   {path:'user-dashboard',component:UserDashboardComponent}
];
