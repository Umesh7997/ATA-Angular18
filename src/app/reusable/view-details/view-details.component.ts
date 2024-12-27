import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnChanges, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-details',
  standalone: true,
  imports: [MatTableModule, CommonModule, MatCardModule, MatIconModule],
  templateUrl: './view-details.component.html',
  styleUrl: './view-details.component.css'
})
export class ViewDetailsComponent implements OnInit,OnChanges {
  @Input() columns: string[] = [];
  @Input() dataSource: any[] = [];

  router = inject(Router);
  displayedColumns: string[] = [];
  tableDataSource = new MatTableDataSource<any>();

  ngOnInit(): void {
    this.displayedColumns = this.columns;
    this.tableDataSource.data = this.dataSource;
  }
  ngOnChanges(): void {
    this.tableDataSource.data = this.dataSource; // Update dataSource on changes
  }

  getStatusIcon(status: string): string {
    switch (status) {
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
    switch (status) {
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
    // Define your edit logic here
    console.log('Edit booking:', element);
    this.router.navigate(['/admin-dashboard/add-driver', element.id]);
  }
}