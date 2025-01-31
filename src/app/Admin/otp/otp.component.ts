import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ApiserviceService } from '../../apiservice.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-otp',
  imports: [FormsModule , CommonModule],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css'
})
export class OtpComponent {

  otp: string = '';
  email: string = '';
  isOtp: boolean = false;
  password1: string = '';
  password2: string = '';
  constructor(private router: Router , private http: HttpClient , private toastr: ToastrService, private apiservice : ApiserviceService) { }

  validateEmail(): void {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    let params = new HttpParams()
    .set('EmailId', this.email);

    debugger;
    if(emailRegex.test(this.email))
    {
        this.http.post(this.apiservice.resetPassword,null, {params}).subscribe(
          (response) => {
            this.toastr.success('OTP has been sent successfully!', 'Success', {
              timeOut: 1000, // 2 seconds
              progressBar: true // Show progress bar
            });
            this.isOtp = true;
          },
          (error) => {
            this.toastr.error('Failed to send OTP. Please try again.', 'Error', {
              timeOut: 1000,
              progressBar: true
            });
          }
        );
    }
    else{
        this.toastr.error('Some Error Occured. Please try again.', 'Error', {
          timeOut: 1000,
          progressBar: true
        });
    }
  }

  resetPassword(): void {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!this.password1 || !this.password2 || !this.otp) {
      this.toastr.error('All fields are required!', 'Error', { timeOut: 1000, progressBar: true });
      return;
    }




    if (!passwordRegex.test(this.password2)) {
      this.toastr.error('Password must be at least 6 characters long, contain at least one letter, one number, and one special character!', 'Error', { timeOut: 2000, progressBar: true });
      return;
    }

    if (this.password1 !== this.password1) {
      this.toastr.error('Passwords do not match!', 'Error', { timeOut: 1000, progressBar: true });
      return;
    }

    let params = new HttpParams()
    .set('EmailId', this.email)
    .set('newpassword', this.password2)
    .set('otp', this.otp);

    this.http.post(this.apiservice.resetOTP, null , {params}).subscribe(
      (response) => {
        this.toastr.success('Password reset successful!', 'Success', {
          timeOut: 1000, // 2 seconds
          progressBar: true // Show progress bar
        });
        this.router.navigate(['login']);
      },
      (error) => {
        this.toastr.error('Failed to reset password. Please try again.', 'Error', { timeOut: 1000, progressBar: true });
      }
    )
  }

}
