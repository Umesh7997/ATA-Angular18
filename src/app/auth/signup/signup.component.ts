import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HomeService } from '../services/home.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from '../login/login.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule,
 MatIconModule, MatSnackBarModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  dial = inject(MatDialog);
  signupForm: FormGroup;
  dialogRef = inject(MatDialogRef<SignupComponent>);
  snackbar = inject(MatSnackBar);
  authSer = inject(AuthService);
  isSubmitted = false;
  isLoading = false;
  


  constructor(private fb: FormBuilder, private homeSer: HomeService) {
    
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      dob: [ '', [Validators.required]],
      gender: ['', Validators.required],
      address: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@gmail\\.com$')]],
      password: ['', [Validators.required, Validators.maxLength(7)]],
      role: ['admin'],
      roleRequest: ['']
    });
  }
  ngAfterViewInit() {
    const dobField = document.getElementById('dob') as HTMLInputElement;
    const today = new Date();
    const maxDate = new Date(today.getFullYear() - 20, today.getMonth(), today.getDate() - 1);
    dobField.max = maxDate.toISOString().split('T')[0];
  }


  userSubmit() {
    if (this.signupForm.valid) {
      this.isLoading = true;
      this.isSubmitted = true;
      this.homeSer.userSignIn(this.signupForm.value).subscribe({

        next: (res: any) => {
          console.log(res);
          this.signupForm.reset();
          this.dialogRef.close();
          this.authSer.showSnackbar();
        },
        error: (err: any) => {
          alert("SignUp Failed");
          console.log("Error", err);
        }
      });    }
  }

  openLogin() {
    this.dial.closeAll();
    this.dial.open(LoginComponent, {
      width: '50%',
      position: { right: '25%' }
    })
  }
}