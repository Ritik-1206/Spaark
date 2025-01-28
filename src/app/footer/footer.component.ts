import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  constructor(private router: Router) {}

  navigateTo(route?: string) {
    if (route) {
      this.router.navigate([route]).then(() => {
        window.scrollTo(0, 0);
      });
    } else {
      console.error('Route is undefined!');
    }
  }


  onSubscribe(email: string, emailInput: HTMLInputElement): void {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (emailRegex.test(email)) {
      Swal.fire({
        icon: 'success',
        title: 'Subscribed!',
        text: 'You have successfully subscribed.',
        timer: 1500, // Popup visible for 5 seconds
        showConfirmButton: false,
        timerProgressBar: true, // Show progress bar for the timer
      });

      // Clear the input field
      emailInput.value = '';
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Email',
        text: 'Please enter a valid email address.',
        confirmButtonText: 'Try Again',
      });
    }
  }
}
