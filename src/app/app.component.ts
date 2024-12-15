import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'automation-travel-agency';
  constructor(private dialog: MatDialog) {}

  // showLoginForm = false;
  // showSignupForm = false;


  // showLogin() {
  //   this.showLoginForm = true;
  //   this.showSignupForm = false;
  // }

  // showSignup() {
  //   this.showLoginForm = false;
  //   this.showSignupForm = true;   
  // }

 
}
