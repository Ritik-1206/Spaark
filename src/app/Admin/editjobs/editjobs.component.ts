import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxEditorModule } from "ngx-editor";
import { Editor } from "ngx-editor";
import { Toolbar } from 'ngx-editor';
import Swal from 'sweetalert2';
import { ApiserviceService } from '../../apiservice.service';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-editjobs',
  imports: [NgxEditorModule, FormsModule],
  templateUrl: './editjobs.component.html',
  styleUrl: './editjobs.component.css'
})
export class EditjobsComponent implements OnInit {
  editor!: Editor;
  html: string = '';
  selectedImage: File | null = null; // Selected image
  fileName: string = "";

  jobName: string = '';
  jobLocation: string = '';
  jobType: string = '';
  qualification: string = '';
  age: string = '';
  vediourl: string = '';
  embedUrl: SafeResourceUrl | undefined;
  //isInternshhip: boolean = false;


  toolbar: Toolbar = [

    ["bold", "italic" , "underline"],
    ["ordered_list", "bullet_list"],
    ["text_color", "background_color"],
  ];

  isFeatureEnabled: boolean = false;


  constructor(private http: HttpClient, private apiservice: ApiserviceService , private router : Router , private sanitizer: DomSanitizer){

  }

  ngOnInit(): void {
    this.editor = new Editor();
  }

  onImageChange(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedImage = event.target.files[0];
      this.fileName = this.selectedImage?.name || '';
    }
  }

   saveJob(): void {

    if (!this.jobName || !this.jobLocation || !this.jobType || !this.qualification || !this.html || !this.selectedImage || !this.age)
    //if (!this.selectedImage || !this.age)
       {
      Swal.fire({
        icon: 'error',
        title: 'Submission Failed',
        text: `Please fill in all fields before saving.`,
        confirmButtonText: 'OK',
      });
      return;
    }
    const isInternship = /internship/i.test(this.jobType);
    //this.embedUrl = this.sanitizeUrl(this.vediourl);

    const embedurl = this.sanitizeUrl(this.vediourl); 
    const formData = new FormData();
    formData.append('Title', this.jobName);
    formData.append('Location', this.jobLocation);
    formData.append('Openings', this.jobType);
    formData.append('Qualification',this.qualification);
    formData.append('Age',this.age);
    formData.append('files',this.selectedImage );
    formData.append('IsActive','true');
    formData.append('IsInternship',isInternship.toString());
    formData.append('VideoUrl', embedurl);
    formData.append('OtherDescription',this.html);


    debugger;
    this.http.post(this.apiservice.jobApi, formData).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Job Added',
          text: 'Your job has been added successfully.',
        });
        this.router.navigate(['admin/joblist']); // Navigate to blog list or another page
      },
      (error) => {
        console.error('Error adding job:', error);
        Swal.fire({
          icon: 'error',
          title: 'Addition Failed',
          text: 'Failed to add the job. Please try again.',
        });
      }
    );

   }

   sanitizeUrl(url: string): string {
    const youtubeUrlPattern = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(youtubeUrlPattern);
  
    if (match && match[1]) {
      const videoId = match[1]; // Extract the video ID
      return `https://www.youtube.com/embed/${videoId}`; // Return the embedded URL
    } else {
      console.error('Invalid YouTube URL');
      return ''; // Return empty if it's not a valid YouTube URL
    }
  }
  
  }


