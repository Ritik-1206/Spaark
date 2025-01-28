import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiserviceService } from '../../apiservice.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-news',
  imports: [CommonModule],
  templateUrl: './admin-news.component.html',
  styleUrl: './admin-news.component.css'
})
export class AdminNewsComponent {


  @ViewChild('fileInput') fileInput: any;
  images: any[] = [];
  imageUrl: string = '';

  constructor(private http: HttpClient , private apiservice: ApiserviceService)
  {

  }

  ngOnInit(): void {
    this.fetchImages();
  }

  triggerFileInput() {

    if (this.fileInput) {
      this.fileInput.nativeElement.click();
    }
  }

  // Handle file change (file selection)
  onFileChange(event: any) {
    const file = event.target.files[0];
    
    const formData = new FormData();
    formData.append('IsNews', 'true');
    formData.append('IsActive', 'true');
    formData.append('files', file);
    formData.append('isActive','true');

    this.http.post(this.apiservice.images, formData).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Image Uploaded',
          text: 'Your Image has been Uploaded successfully.',
        });
        this.fetchImages();
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

  fetchImages(): void{
    this.http.get<any[]>(this.apiservice.images).subscribe({
      next: (data) => {
        // Fetch all jobs without filtering
        this.images = data;
        this.images = data.filter((images) => images.isNews === true);
      },
      error: (error) => {
        console.error('Error fetching jobs:', error);
      },
    });
  }



hideImage(image:any): void {
 
}

showImage(image: any) : void {

}


deleteImage(id:number): void
{
  this.imageUrl = this.apiservice.getImageUrl(id);
  this.http.delete(this.imageUrl).subscribe(
    (response) => {
      Swal.fire({
        icon: 'success',
        title: 'Image Deleted',
        text: 'Image has been deleted successfully.',
      });
      this.fetchImages();
    },
    (error) => {
      console.error('Error adding image:', error);
      Swal.fire({
        icon: 'error',
        title: 'Deletion Failed',
        text: 'Failed to delete the image. Please try again.',
      });
    }
  );
}
}
