import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SignupComponent } from '../signup/signup.component';
import { LoginComponent } from '../login/login.component';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AboutComponent } from '../about/about.component';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [SignupComponent, LoginComponent, CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  dial = inject(MatDialog);
  router =inject(Router);

  home(){
    if (this.router.url === '/home') {
      window.location.reload();
    } else {
      this.router.navigate(['/home']);
  }
}
  openAbout() {
   this.closeDialog();
      this.dial.open(AboutComponent, {
       
        position: { left: '10%' },
      })
  }

  openSignUp() {
   this.closeDialog();
      this.dial.open(SignupComponent, {
        height: '95vh',
        position: { left: '10%' }
      })
  }

  openLogin() {
    this.closeDialog()
      this.dial.open(LoginComponent, {
        width:'50%',
        position: { right: '25%' }
      })
  }
  private closeDialog() {
    if (this.dial.openDialogs.length > 0) {
      this.dial.closeAll();
    }
  }
}
