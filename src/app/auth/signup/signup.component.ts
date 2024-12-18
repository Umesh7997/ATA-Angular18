import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DateValidatorPipe } from '../../pipes/date-validator.pipe';
import { HomeService } from '../services/home.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from '../login/login.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatIconModule, MatSnackBarModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [DateValidatorPipe]
})
export class SignupComponent {

  dial = inject(MatDialog);
  signupForm: FormGroup;
  dateValid = inject(DateValidatorPipe);
  dialogRef = inject(MatDialogRef<SignupComponent>);
  snackbar = inject(MatSnackBar);
  authSer = inject(AuthService);
  isSubmitted = false;
  isLoading = false;


  constructor(private fb: FormBuilder, private homeSer: HomeService) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      dob: ['', [Validators.required, this.dateValidator.bind(this)]],
      gender: ['', Validators.required],
      address: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@gmail\\.com$')]],
      password: ['', [Validators.required, Validators.maxLength(7)]],
      role: ['admin'],
      roleRequest: ['']
    });
  }
  dateValidator(control: AbstractControl): ValidationErrors | null {
    const isValid = this.dateValid.transform(control.value);
    return isValid ? null : { invalidDate: true };
  }


  userSubmit() {
    if (this.signupForm.valid) {
      this.isLoading = true;
      this.isSubmitted = true;
      this.homeSer.userSignIn(this.signupForm.value).subscribe({

        next: (res: any) => {
          this.signupForm.reset();
          this.dialogRef.close();
          this.authSer.showSnackbar();
        },
        error: (err: any) => {
          alert("SignUp Failed");
          console.log("Error", err);
        }
      });
    }
    else {
      if (!this.dateValid.transform(this.signupForm.value.dob)) {
        this.signupForm.controls['dob'].setErrors({ invalidDate: true });
      }
    }
  }

  openLogin() {
    this.dial.closeAll();
    this.dial.open(LoginComponent, {
      width: '50%',
      position: { right: '25%' }
    })
  }
}