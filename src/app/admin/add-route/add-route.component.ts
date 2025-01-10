import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouteService } from '../services/route.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatNavList } from '@angular/material/list';
import { ViewRouteComponent } from '../view-route/view-route.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-route',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, ViewRouteComponent],
  templateUrl: './add-route.component.html',
  styleUrl: './add-route.component.css'
})
export class AddRouteComponent implements AfterViewInit, OnInit {

  @ViewChild(ViewRouteComponent) viewRouteComponent !: ViewRouteComponent;
  http = inject(HttpClient);
  fb = inject(FormBuilder);
  routeSer = inject(RouteService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  routeForm: FormGroup;
  isEditMode = false;
  routeId: string | null = null;


  constructor() {
    this.routeForm = this.fb.group({
      route_source: ['', Validators.required],
      route_destination: ['', Validators.required],
      route_distance: ['', [Validators.required, Validators.maxLength(4)]],
      route_duration: ['', [Validators.required, Validators.maxLength(2)]],
      boarding_point: ['', Validators.required],
      drop_point: ['', Validators.required]
    })
  }
  ngAfterViewInit(): void {
    this.viewRouteComponent.getRoute();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.routeId = params.get('id');
      if (this.routeId) {
        this.isEditMode = true;
        this.loadRouteData(this.routeId);
      }
      else {
        this.isEditMode = false;
      }
    })
  }

  loadRouteData(id:string){
    this.routeSer.getRouteById(id).subscribe(route =>{
      this.routeForm.patchValue(route);
    });
  }

  routeSubmit() {
    if (this.routeForm.valid) {
      if(this.isEditMode && this.routeId){
this.routeSer.updateRoute(this.routeId,this.routeForm.value).subscribe({
  next:(res:any)=>{
    console.log(res);
    this.resetForm();
    this.viewRouteComponent.getRoute();
  },
  error:(err:any)=>{
    console.log(err);
  }
})
      }else{
      this.routeSer.addRoute(this.routeForm.value).subscribe({
        next: (res: any) => {
          this.routeForm.reset();
          console.log(res);
          this.viewRouteComponent.getRoute();
        },
        error: (err: any) => {
          console.log(err);
        }
      })
    }
    }
  }

  private resetForm():void{
    this.routeForm.reset();
    this.isEditMode = false;
    this.routeId =null;
    this.router.navigate(['/admin-dashboard/add-route'])
  }

}
