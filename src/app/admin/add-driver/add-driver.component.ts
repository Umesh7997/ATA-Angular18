import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { DriverService } from '../services/driver.service';
import { ViewDriverComponent } from '../view-driver/view-driver.component';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-driver',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatButtonModule, ViewDriverComponent, MatListModule, MatCardModule],
  templateUrl: './add-driver.component.html',
  styleUrl: './add-driver.component.css'
})
export class AddDriverComponent implements AfterViewInit,OnInit {

  @ViewChild(ViewDriverComponent) viewDriverComponent !: ViewDriverComponent;
  http = inject(HttpClient);
  fb = inject(FormBuilder);
  actiRoute = inject(ActivatedRoute);
  driverSer = inject(DriverService);
  router= inject(Router);
  driverForm: FormGroup;
  isEditMode = false;
  driverId: string | null = null;


  constructor() {
    this.driverForm = this.fb.group({
      driver_name: ['', Validators.required],
      driver_address: ['', Validators.required],
      driver_cont: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]*$')]],
      driver_ln: ['', [Validators.required, Validators.maxLength(10)]]
    })
  }

  ngAfterViewInit(): void {
    this.viewDriverComponent.getDrivers();
  }
  ngOnInit(): void {
    this.actiRoute.paramMap.subscribe(params => {
      this.driverId = params.get('id');
      if (this.driverId) {
        this.isEditMode = true;
        this.loadDriverData(this.driverId);
      } else {
        this.isEditMode = false;
      }
    });
  }

  loadDriverData(id: string) {
    this.driverSer.getDriverById(id).subscribe(driver => {
      this.driverForm.patchValue(driver);
    });
  }


  driverSubmit() {
    if (this.driverForm.valid) {
      if (this.isEditMode && this.driverId) {
        this.driverSer.updateDriver(this.driverId, this.driverForm.value).subscribe({
          next: (res: any) => {
            console.log(res);
            this.resetForm();
            this.viewDriverComponent.getDrivers();

          },
          error: (err: any) => {
            console.log(err);
          }
        })
      } else {
        this.driverSer.addDriver(this.driverForm.value).subscribe({
          next: (res: any) => {
            this.driverForm.reset();
            this.viewDriverComponent.getDrivers();
            console.log(res);
          },
          error: (err: any) => {
            console.log(err);
          }
        })
      }
    }
  }


  private resetForm(): void {
    this.driverForm.reset();
    this.isEditMode = false;
    this.driverId = null;
    this.router.navigate(['/admin-dashboard/add-driver']);
  }
}

