import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { DriverService } from '../services/driver.service';
import { ViewDriverComponent } from '../view-driver/view-driver.component';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-add-driver',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatButtonModule,ViewDriverComponent,MatListModule,MatCardModule],
  templateUrl: './add-driver.component.html',
  styleUrl: './add-driver.component.css'
})
export class AddDriverComponent {

  http = inject(HttpClient);
  fb = inject(FormBuilder);
  driverSer = inject(DriverService);
  driverForm: FormGroup;
  constructor() {
    this.driverForm = this.fb.group({
      driver_name: ['', Validators.required],
      driver_address: ['', Validators.required],
      driver_cont: ['', [Validators.required,Validators.maxLength(10),Validators.pattern('^[0-9]*$')]],
      driver_ln: ['', [Validators.required,Validators.maxLength(10)]]
    })
  }

  driverSubmit() {
    if(this.driverForm.valid){
      this.driverSer.addDriver(this.driverForm.value).subscribe({
        next: (res: any) => {
          this.driverForm.reset();
          console.log(res);
        },
        error: (err: any) => {
          console.log(err);
        }
      })
    }
    }
}
