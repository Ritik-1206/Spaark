import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  constructor(private router: Router , private http: HttpClient , private apiservice: ApiserviceService) {}

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
        const queryPayload = {
          subID: 0,  // Assuming 0 for a new query
          email: email,
          isActive: true  // Assuming the query is active by default
        };
    
        this.http.post(this.apiservice.subscribe, queryPayload).subscribe({
          next: (response) => {
            Swal.fire({
              icon: 'success',
              title: 'Subscribed!',
              text: 'You have successfully subscribed.',
              timer: 1500, // Popup visible for 5 seconds
              showConfirmButton: false,
              timerProgressBar: true, 
            });
    
            emailInput.value = '';
          },
          error: (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'You have failed to subscribed. Please try again.',
              timer: 1500, // Popup visible for 5 seconds
              showConfirmButton: false,
              timerProgressBar: true, 
            });
            console.error(err);  // Log the error for debugging
          }
        });

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

