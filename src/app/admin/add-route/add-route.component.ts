import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouteService } from '../services/route.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatNavList } from '@angular/material/list';

@Component({
  selector: 'app-add-route',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,MatButtonModule],
  templateUrl: './add-route.component.html',
  styleUrl: './add-route.component.css'
})
export class AddRouteComponent {
 http = inject(HttpClient);
  fb = inject(FormBuilder);
  routeSer = inject(RouteService);
  routeForm: FormGroup;
  constructor() {
    this.routeForm = this.fb.group({
      route_source: ['', Validators.required],
      route_destination: ['', Validators.required],
      route_distance: ['', [Validators.required,Validators.maxLength(4)]],
      route_duration: ['', [Validators.required,Validators.maxLength(2)]]
    })
  }

  routeSubmit() {
    if(this.routeForm.valid){
      this.routeSer.addRoute(this.routeForm.value).subscribe({
        next: (res: any) => {
          this.routeForm.reset();
          console.log(res);
        },
        error: (err: any) => {
          console.log(err);
        }
      })
    }
    }

}
