import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxEditorModule } from "ngx-editor";
import { Editor } from "ngx-editor";
import { ActivatedRoute, Router } from '@angular/router'; // For route params
import { HttpClient } from '@angular/common/http'; // For API calls
import { Toolbar } from 'ngx-editor';
import Swal from 'sweetalert2'
import { ApiserviceService } from '../../apiservice.service';

@Component({
  selector: 'app-editblogs',
  imports: [NgxEditorModule , CommonModule , FormsModule],
  templateUrl: './editblogs.component.html',
  styleUrl: './editblogs.component.css'
})
export class EditblogsComponent implements OnInit {
  editor!: Editor;
  html: string = '';
  title: string = ''; // Blog title
  selectedImage: File | null = null; // Selected image
  isEditMode: boolean = false; // Flag for edit mode
  blogId!: number; // Blog ID (if editing)
  blogUrl: string = '';
  fileName: string = "";

  toolbar: Toolbar = [

    ["bold", "italic" , "underline"],
    ["ordered_list", "bullet_list"],
    [{ heading: ["h1", "h2", "h3", "h4", "h5", "h6"] }],
    ["text_color", "background_color"],
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private apiservice: ApiserviceService
  ) {}

  ngOnInit(): void {
    this.editor = new Editor();

  }

  onImageChange(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedImage = event.target.files[0];
      this.fileName = this.selectedImage?.name || '';
    }
  }

  saveBlog(): void {


    if (!this.title || !this.html || !this.selectedImage) {
      Swal.fire({
        icon: 'error',
        title: 'Submission Failed',
        text: `Please fill in all fields before saving.`,
        confirmButtonText: 'OK',
      });
      return;
    }

    const formData = new FormData();
    formData.append('Title', this.title);
    formData.append('Description', this.html);
    formData.append('files', this.selectedImage);
    formData.append('isActive','true');

    
    this.http.post(this.apiservice.blogApi, formData).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Blog Added',
          text: 'Your blog has been added successfully.',
        });
        this.router.navigate(['admin/bloglist']); // Navigate to blog list or another page
      },
      (error) => {
        console.error('Error adding blog:', error);
        Swal.fire({
          icon: 'error',
          title: 'Addition Failed',
          text: 'Failed to add the blog. Please try again.',
        });
      }
    );


  }


}
