import { Component, inject, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Import the plugin
Chart.register(...registerables, ChartDataLabels); // Register the plugin
import { BookingsService } from '../admin/services/bookings.service';
import { HomeService } from '../auth/services/home.service';
import { forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [CommonModule, MatCard],
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  bookingSer = inject(BookingsService);
  homeSer = inject(HomeService);

  bookingsData: any[] = [];
  usersData: any[] = [];

  statusCounts: { [key: string]: number } = {};
  labelData: string[] = [];
  valueData: number[] = [];
  colorData: string[] = ['rgba(235, 208, 54, 0.5)', 'rgba(226, 26, 26, 0.5)', 'rgba(31, 141, 77, 0.5)'];

  ngOnInit() {
    this.getBookings();
  }

  charts() {
    const totalBookings = this.valueData.reduce((acc, value) => acc + value, 0);

    const myChart = new Chart('doughnutchart', {
      type: 'doughnut',
      data: {
        labels: this.labelData,
        datasets: [{
          label: 'Bookings Data',
          data: this.valueData,
          backgroundColor: this.colorData,
          borderColor: this.colorData,
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
            position: 'top'
          },
          tooltip: {
            callbacks: {
              label: function (context: any) {
                const percentage = ((context.raw / totalBookings) * 100).toFixed(2);
                return `${context.label}: ${context.raw} bookings (${percentage}%)`;
              }
            }
          },
          datalabels: {
            formatter: function (value: number, context: any) {
              const percentage = ((value / totalBookings) * 100).toFixed(1);
              return `${percentage}%`;
            },
            color: '#lll',
            font: {
              size: 14,
              weight: 'bold'
            }
          }
        }
      }
    });
  }

  getBookings() {
    forkJoin({
      bookingsData: this.bookingSer.getBookings(),
      usersData: this.homeSer.getUser()
    }).subscribe(data => {
      console.log(data);
      this.bookingsData = data.bookingsData;
      this.usersData = data.usersData;

      if (this.bookingsData && this.bookingsData.length > 0) {
        this.bookingsData.forEach((booking: any) => {
          const status = booking.status;
          if (this.statusCounts[status]) {
            this.statusCounts[status]++;
          } else {
            this.statusCounts[status] = 1;
          }
        });

        this.labelData = Object.keys(this.statusCounts);
        this.valueData = Object.values(this.statusCounts);

        this.charts();
      }
    }, (error) => {
      console.error('Error fetching data', error);
    });
  }
}
