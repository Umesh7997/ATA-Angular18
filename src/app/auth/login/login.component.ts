import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { HomeService } from '../services/home.service';
import { AuthService, USER_KEY } from '../auth.service';
import {MatButtonModule} from '@angular/material/button';
import { NavbarComponent } from '../navbar/navbar.component';
import { SignupComponent } from '../signup/signup.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule,MatButtonModule,NavbarComponent,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  dial = inject(MatDialog);
  loginForm: FormGroup;
  homeSer = inject(HomeService);
 authSer = inject(AuthService);
  fb = inject(FormBuilder);
  router = inject(Router);
  dialogRef = inject(MatDialogRef<LoginComponent>)
  snackbar = inject(MatSnackBar);
  isSubmitted =false;
  isLoading = false;



  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@gmail\\.com$')]],
      password: ['', [Validators.maxLength(7), Validators.required]]
    })
  }

  loginSubmit() {
    this.isLoading = true;
    if (this.loginForm.valid) {
      this.isSubmitted = true;
      const { email, password } = this.loginForm.value;
      this.authSer.login(email, password).subscribe({
        next: (res: any) => {
          if (res) {
            this.loginForm.reset();
            this.dialogRef.close();
            const userRole = JSON.parse(localStorage.getItem(USER_KEY) || '{}');
            if(userRole.role === 'admin'){
              this.router.navigateByUrl('/admin-dashboard');
            }
            else{
              this.router.navigateByUrl('/user-dashboard');
            }
            this.authSer.showLoginSnackbar();
          } else {
            alert("Invalid credentials");
          }
        },
        error: (err) => {
          alert("Login Failed");
          console.error('Login error:', err);
        }
      });
    }
  }

 
  openSignUp() {
    this.dial.closeAll();
       this.dial.open(SignupComponent, {
         position: { left: '10%' }
       })
   }
}
