import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
@Component({
  selector: 'app-view-details',
  standalone: true,
  imports: [MatTableModule,CommonModule,MatCardModule],
  templateUrl: './view-details.component.html',
  styleUrl: './view-details.component.css'
})
export class ViewDetailsComponent implements OnInit {
  @Input() columns: string[] = [];
  @Input() dataSource: any[] = [];

  displayedColumns: string[] = [];
  tableDataSource = new MatTableDataSource<any>();

  ngOnInit(): void {
    this.displayedColumns = this.columns;
    this.tableDataSource.data = this.dataSource;
  }
}
