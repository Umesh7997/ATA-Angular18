import { Component, inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RouteService } from '../services/route.service';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ViewDetailsComponent } from '../../reusable/view-details/view-details.component';

@Component({
  selector: 'app-view-route',
  standalone: true,
  imports: [MatTableModule,CommonModule,MatCardModule,ViewDetailsComponent],
  templateUrl: './view-route.component.html',
  styleUrl: './view-route.component.css'
})
export class ViewRouteComponent implements OnInit,OnChanges{
  ngOnChanges(changes: SimpleChanges): void {
   if(changes){
    this.getRoute();
   }
  }

  columns: string[] = ['route_source', 'route_destination', 'route_distance', 'route_duration'];
  dataSource: any[] = [];
  routerSer = inject(RouteService);
  
  ngOnInit(): void {
   this.getRoute();
  }

  getRoute(){
    this.routerSer.getRoute().subscribe(data=>{
      this.dataSource = data;
      console.log("getroutes",this.dataSource);
    })
  }
  
}
