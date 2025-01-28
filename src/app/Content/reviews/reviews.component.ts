import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiserviceService } from '../../apiservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reviews',
  imports: [CommonModule , FormsModule],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent {

  isFormVisible = false;
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

  reviews = [
    {
      imageUrl: '/Reviews/Review_1.jpeg',
      text: 'Spaark Overseas is highly professional and trustworthy. They guided me through the entire process, from documentation to interview preparation.',
      author: 'Jaspreet Singh',
      rating: 4.5
    },
    {
      imageUrl: '/Reviews/Review_2.jpeg',
      text: 'Their expertise in the German nursing program is incredible. Spaark Overseas is undoubtedly the best in the business.',
      author: 'Divya Jain',
      rating: 5.0
    },
    {
      imageUrl: '/Reviews/Review_3.jpeg',
      text: 'I was skeptical at first, but Spaark Overseas delivered on all their promises. I’m now part of the Ausbildung program in Germany. Thank you',
      author: 'Abhinav Singh',
      rating: 4.0
    },
    {
      imageUrl: '/Reviews/Review_4.jpeg',
      text: 'Thanks to Spaark Overseas, I am now working as a physiotherapist in Germany. They are the best placement agency for healthcare professionals.',
      author: 'Sachin Rao',
      rating: 5.0
    },
    {
      imageUrl: '/Reviews/Review_5.jpeg',
      text: 'The Ausbildung program through Spaark Overseas has changed my life. They were with me at every step and made the transition to Germany effortless.',
      author: 'Vivek Gupta',
      rating: 5.0
    },
    {
      imageUrl: '/Reviews/Review_6.jpeg',
      text: 'I cannot thank Spaark Overseas enough for guiding me through the German Nursing program. The entire process was smooth, and their support was outstanding. Highly recommended!',
      author: 'Amit Sharma',
      rating: 5.0
    },
    {
      imageUrl: '/Reviews/Review_7.jpeg',
      text: 'I had a fantastic experience with Spaark Overseas. They are experts in German placements and very supportive.',
      author: 'Rohit Jain',
      rating: 5.0
    }
  ];

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
