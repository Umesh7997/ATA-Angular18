import { Component } from '@angular/core';
import { NavbarComponent } from '../auth/navbar/navbar.component';
import { AboutComponent } from '../auth/about/about.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent,AboutComponent,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  showAboutC :boolean =true;

}
