import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { HomeService } from '../services/home.service';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  loginForm: FormGroup;
  homeSer = inject(HomeService);
 // authSer = inject(AuthService);
  fb = inject(FormBuilder);
  router = inject(Router);
  dialogRef = inject(MatDialogRef<LoginComponent>)



  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@gmail\\.com$')]],
      password: ['', [Validators.maxLength(7), Validators.required]]
    })
  }

  loginSubmit() {
    if (this.loginForm.valid) {
      this.homeSer.userLogin(this.loginForm.value).subscribe({
        next: (res: any) => {
          
            alert("Login Success");
            this.loginForm.reset();
            this.dialogRef.close();
            this.router.navigateByUrl('/user-dashboard');

        },
        error: (err) => {
          alert("Login Failed");
        }
      })
    }
  }
}
