import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-details',
  standalone: true,
  imports: [MatTableModule, CommonModule, MatCardModule, MatIconModule,MatPaginator],
  templateUrl: './view-details.component.html',
  styleUrl: './view-details.component.css'
})
export class ViewDetailsComponent implements AfterViewInit,OnInit,OnChanges {
 
  ngAfterViewInit(): void {
    this.tableDataSource.paginator = this.paginator;
  }
  @Input() columns: string[] = [];
  @Input() dataSource: any[] = [];
  @Output() edit = new EventEmitter<any>();

  router = inject(Router);
  displayedColumns: string[] = [];
  tableDataSource = new MatTableDataSource<any>();
  @ViewChild('paginator') paginator!: MatPaginator;
  pageSizes = [3,5,7];

  ngOnInit(): void {
    this.displayedColumns = this.columns;
    this.tableDataSource.data = this.dataSource;
  }
  ngOnChanges(): void {
     console.log("Data Source:", this.dataSource);
    this.tableDataSource.data = this.dataSource; 
  }

  getStatusIcon(status: string): string {
    const cleanStatus = status?.trim().toLowerCase() || '';
    console.log("icons",cleanStatus)
    switch (cleanStatus) {
      case 'pending':
        return 'history';
      case 'confirmed':
        return 'check_circle';
      case 'cancelled':
        return 'cancel';
      default:
        return 'help_outline';
    }
  }

  getStatusClass(status: string): string {
    const cleanStatus = status?.trim().toLowerCase() || '';
    switch (cleanStatus) {
      case 'pending':
        return 'custom-primary';
      case 'confirmed':
        return 'custom-accent';
      case 'cancelled':
        return 'custom-warn';
      default:
        return '';
    }
  }

  editBooking(element: any): void {
   this.edit.emit(element);
  }
}