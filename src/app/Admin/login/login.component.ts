import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiserviceService } from '../../apiservice.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username: string = '';
  password: string = '';

  constructor(private router: Router , private http: HttpClient , private apiservice: ApiserviceService) { }

  

  navigateTo(route?: string): void {
      this.router.navigate([route]).then(() => {
        window.scrollTo(0, 0);
      });
  }

  login(): void {

    let params = new HttpParams()
    .set('username', this.username)
    .set('password', this.password);

    this.http.post(this.apiservice.login, null , { params }).subscribe(
      (response) => {
        Swal.fire({
          title: 'OTP Sent',
          position: 'top-end',
          showConfirmButton: false,  // Hide the OK button
          timer: 3000,customClass: {
            popup: 'success-popup',  // Custom class for success
          },
        });
        this.router.navigate(['otp']); // Navigate to OTP page
      },
      (error) => {
        Swal.fire({
          title: 'Login Failed. Try Again',
          position: 'top-end',
          showConfirmButton: false,  // Hide the OK button
          timer: 3000,
          customClass: {
            popup: 'error-popup',  // Custom class for error
          },
        });
      }
    );
    
  }
  
}
