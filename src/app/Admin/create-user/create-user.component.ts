import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiserviceService } from '../../apiservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-user',
  imports: [CommonModule , FormsModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent {

  @Input() isOpen: boolean = false;
  @Output() close = new EventEmitter<void>();

  name: string = '';
  email: string = '';
  phone: string = '';

  constructor(private http: HttpClient , private apiservice : ApiserviceService , private toastr: ToastrService)
  {

  }


  closeModal(): void {
    this.close.emit();
  }

  CreateUser(): void{
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phoneRegex = /^[0-9]{10}$/;
  const usernameRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/;

  if (!this.name || !this.email || !this.phone) {
    this.toastr.error('All fields are required!', 'Error', { timeOut: 1000, progressBar: true });
    return;
  }

  if (!usernameRegex.test(this.name)) {
    this.toastr.error('Username must contain letters & numbers, no spaces!', 'Error', { timeOut: 3000, progressBar: true });
    return;
  }

  if (!emailRegex.test(this.email)) {
    this.toastr.error('Invalid email format!', 'Error', { timeOut: 1000, progressBar: true });
    return;
  }

  if (!phoneRegex.test(this.phone)) {
    this.toastr.error('Phone number must be 10 digits long!', 'Error', { timeOut: 1000, progressBar: true });
    return;
  }
  
  let params = new HttpParams()
  .set('username', this.name)
  .set('email', this.email)
  .set('phoneno', this.phone);

  this.http.post(this.apiservice.createUser, null , {params}).subscribe(
    (response) => {
      this.toastr.success('User created successfully!', 'Success', {
        timeOut: 1000, // 2 seconds
        progressBar: true // Show progress bar
      });
      this.closeModal();
    },
    (error) => {
      this.toastr.error('Failed to create user. Try again.', 'Error', { timeOut: 1000, progressBar: true });
    }
  )
  }
}
