import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit , HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ApiserviceService } from '../../apiservice.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';
  isOtp: boolean = false;
  otp: string = '';

  constructor(private router: Router , private toastr: ToastrService, private http: HttpClient , private apiservice: ApiserviceService) { }

  
  ngOnInit(): void {
    sessionStorage.removeItem('isLoggedIn');

    //Prevent back navigation
    // history.pushState(null, '', location.href);
    // window.onpopstate = () => {
    //   history.pushState(null, '', location.href);
    // };
  }

  navigateTo(route?: string): void {
      this.router.navigate([route]).then(() => {
        window.scrollTo(0, 0);
    });
  }

  login(): void {

    if(!this.username && !this.password){
      this.toastr.error('Please enter username and password.', 'Error', {
        timeOut: 1000,
        progressBar: true
      });
      return;
    }

    let params = new HttpParams()
    .set('username', this.username)
    .set('password', this.password);

    this.http.post(this.apiservice.login, null , { params }).subscribe(
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

  validateOtp(): void {

    if(!this.otp) {
        this.toastr.error('Please enter otp.', 'Error', {
          timeOut: 1000,
          progressBar: true
        });
        return;
      }

    let params = new HttpParams()
      .set('otp', this.otp);
  
      this.http.post(this.apiservice.otpValidation, null , { params }).subscribe(
        (response) => {
          this.toastr.success('Login Success.', 'Success', {
            timeOut: 1000,
            progressBar: true
          });
          sessionStorage.setItem('isLoggedIn', 'true');
          this.router.navigate(['admin/joblist']);
          
        },
        (error) => {
          this.toastr.success('Something went wrong, Please try again.', 'Error', {
            timeOut: 1000,
            progressBar: true
          });
        }
      );
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event: Event) {
    this.router.navigate(['']); // Redirect to home page if back button is pressed
  }
  
}
