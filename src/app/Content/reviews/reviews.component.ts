import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiserviceService } from '../../apiservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reviews',
  imports: [CommonModule , FormsModule],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent implements OnInit {

  isFormVisible = false;
  reviews: any = [];
  name: string = '';
  companyname: string = '';
  designation: string = '';
  email: string = '';
  phone: string = '';
  review: string = '';
  formError: boolean = true;
  emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  phoneRegex: RegExp = /^\+?(\d{1,4})?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
  isValidEmail(): boolean {
    return this.emailRegex.test(this.email);
  }

  ngOnInit(): void {
    this.getReviews();
  }
  isValidPhone(): boolean {
    const sanitizedPhone = this.phone.replace(/\D/g, '');

    // Check if the phone number is exactly 10 digits long
    return sanitizedPhone.length === 10;
  }

  constructor(private http : HttpClient , private apiservice: ApiserviceService){
    
  }

  toggleForm() {
    this.isFormVisible = !this.isFormVisible;

    this.name = '';
    this.companyname = '';
    this.email = '';
    this.designation = '';
    this.phone = '';
    this.review = '';
  }

  generateStars(rating: number | undefined): string[] {
    const stars = [];
    const actualRating = rating ?? 0; // Use 0 if rating is undefined
    const fullStars = Math.floor(actualRating);
    const hasHalfStar = actualRating % 1 !== 0;
  
    for (let i = 0; i < fullStars; i++) {
      stars.push('full');
    }
    if (hasHalfStar) {
      stars.push('half');
    }
    while (stars.length < 5) {
      stars.push('empty');
    }
    return stars;
  }

  getReviews(): void {
    this.http.get<any[]>(this.apiservice.reviews).subscribe({
      next: (data) => {
        this.reviews = data.filter((review) => review.isActive === true);
      },
      error: (error) => {
        console.error('Error fetching reviews:', error);
      },
    });
  }

  submitReview(): void {
     this.formError = false;

    if (!this.name || !this.email || !this.companyname || !this.designation || !this.phone || !this.review) {
      this.formError = true;
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'Please fill out all required fields correctly.',
        confirmButtonText: 'OK',
      });
      return;
    }

    if (!this.isValidEmail()) {
      this.formError = true;
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Email',
        text: 'Please enter a valid email address.',
        confirmButtonText: 'OK',
      });
      return;
    }

    if (!this.isValidPhone()) {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Phone Number',
        text: 'Please enter a valid 10-digit phone number.',
        confirmButtonText: 'OK',
      });
      return; // Stop form submission
    }


    const queryPayload = {
      reviewID: 0,
      name: this.name,
      companyName: this.companyname,
      designation: this.designation,
      email: this.email,
      phoneNo: this.phone,
      review: this.review,
      isActive: false
    }

    this.http.post(this.apiservice.reviews , queryPayload).subscribe({
      next: (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Review Submitted',
          text: 'Your review has been successfully submitted.',
          confirmButtonText: 'OK',
        });

        // Reset form after submission
        this.name = '';
        this.email = '';
        this.designation = '';
        this.companyname = '';
        this.phone = '';
        this.review = '';
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'There was an issue submitting your review. Please try again later.',
          confirmButtonText: 'OK',
        });
        console.error(err);  // Log the error for debugging
      }
    });
  }
}
