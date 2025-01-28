import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp',
  imports: [],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css'
})
export class OtpComponent {

  constructor(private router: Router) { }

  navigateTo(route?: string): void {
    this.router.navigate([route]).then(() => {
      window.scrollTo(0, 0);
    });
}
}
