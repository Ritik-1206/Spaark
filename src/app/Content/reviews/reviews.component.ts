import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-reviews',
  imports: [CommonModule],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent {

  isFormVisible = false;
  toggleForm() {
    this.isFormVisible = !this.isFormVisible;
  }

  reviews = [
    {
      imageUrl: '/Home/Reviews/Review_1.jpeg',
      text: 'Spaark Overseas is highly professional and trustworthy. They guided me through the entire process, from documentation to interview preparation.',
      author: 'Jaspreet Singh',
      rating: 4.5
    },
    {
      imageUrl: '/Home/Reviews/Review_2.jpeg',
      text: 'Their expertise in the German nursing program is incredible. Spaark Overseas is undoubtedly the best in the business.',
      author: 'Divya Jain',
      rating: 5.0
    },
    {
      imageUrl: '/Home/Reviews/Review_3.jpeg',
      text: 'I was skeptical at first, but Spaark Overseas delivered on all their promises. I’m now part of the Ausbildung program in Germany. Thank you',
      author: 'Abhinav Singh',
      rating: 4.0
    },
    {
      imageUrl: '/Home/Reviews/Review_4.jpeg',
      text: 'Thanks to Spaark Overseas, I am now working as a physiotherapist in Germany. They are the best placement agency for healthcare professionals.',
      author: 'Sachin Rao',
      rating: 5.0
    },
    {
      imageUrl: '/Home/Reviews/Review_5.jpeg',
      text: 'The Ausbildung program through Spaark Overseas has changed my life. They were with me at every step and made the transition to Germany effortless.',
      author: 'Vivek Gupta',
      rating: 5.0
    },
    {
      imageUrl: '/Home/Reviews/Review_6.jpeg',
      text: 'I cannot thank Spaark Overseas enough for guiding me through the German Nursing program. The entire process was smooth, and their support was outstanding. Highly recommended!',
      author: 'Amit Sharma',
      rating: 5.0
    },
    {
      imageUrl: '/Home/Reviews/Review_7.jpeg',
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
}
