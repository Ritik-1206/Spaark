import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiserviceService } from '../../apiservice.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-review',
  imports: [CommonModule],
  templateUrl: './admin-review.component.html',
  styleUrl: './admin-review.component.css'
})
export class AdminReviewComponent implements OnInit {

  reviews: any = [];
  reviewUrl: string = '';
  reviewID: number = 0;
  @ViewChild('fileInput') fileInput: any;
  ngOnInit(): void {
    this.getReviews()
  }

  constructor(private http: HttpClient , private apiservice : ApiserviceService)
  {}

  getReviews(): void {
    this.http.get<any[]>(this.apiservice.reviews).subscribe({
      next: (data) => {
        this.reviews = data;
      },
      error: (error) => {
        console.error('Error fetching reviews:', error);
      },
    });
  }


deleteReview(id:number): void
{
  this.reviewUrl = this.apiservice.getReviewUrl(id);
  this.http.delete(this.reviewUrl).subscribe(
    (response) => {
      Swal.fire({
        icon: 'success',
        title: 'Review Deleted',
        text: 'Review has been deleted successfully.',
      });
      this.getReviews();
    },
    (error) => {
      console.error('Error deletinh review:', error);
      Swal.fire({
        icon: 'error',
        title: 'Deletion Failed',
        text: 'Failed to delete the review. Please try again.',
      });
    }
  );
}

triggerFileInput(id: number) {
  this.reviewID = id;
  if (this.fileInput) {
    this.fileInput.nativeElement.click();
  }
}

onFileChange(event: any) {

  debugger;
  this.reviewUrl = this.apiservice.getReviewUrl(this.reviewID);
  const file = event.target.files[0];
  
  const formData = new FormData();
  formData.append('files', file);

  this.http.put(this.reviewUrl, formData).subscribe(
    (response) => {
      Swal.fire({
        icon: 'success',
        title: 'Image Uploaded',
        text: 'Your Image has been Uploaded successfully.',
      });
      this.getReviews();
    },
    (error) => {
      console.error('Error adding Image:', error);
      Swal.fire({
        icon: 'error',
        title: 'Upload Failed',
        text: 'Failed to upload the image. Please try again.',
      });
    }
  );
}

hideReview(blog:any): void {
  
}

showReview(blog: any) : void {

  
}

}
