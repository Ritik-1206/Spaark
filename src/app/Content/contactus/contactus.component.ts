import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ApiserviceService } from '../../apiservice.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contactus',
  imports: [FormsModule, CommonModule],
  templateUrl: './contactus.component.html',
  styleUrl: './contactus.component.css'
})
export class ContactusComponent {

  fileToUpload: File | null = null;
  fileName: string = "";

  constructor(private route: ActivatedRoute, private titleService: Title, private metaService: Meta, private http: HttpClient , private apiservice: ApiserviceService) {}

  ngOnInit() {
    const routeData = this.route.snapshot.data;
    this.titleService.setTitle(routeData['title']);
    this.metaService.updateTag({ name: 'description', content: routeData['description'] });  // Use ['description']
  }

  cvData: File | null = null;


  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.fileToUpload = event.target.files[0];
      this.fileName = this.fileToUpload?.name || '';
    }
  }

  onSubmit(form: any) {
    if (form.valid) {

      const date = form.value.date;
      const time = form.value.time;

      const contactDateTime = new Date(`${date}T${time}:00`).toISOString();

      const formData: FormData = new FormData();
      formData.append('Name', form.value.name);
      formData.append('Phone_No', form.value.phone_No);
      formData.append('Email', form.value.email);
      formData.append('ContactDatetime', contactDateTime);
      formData.append('City', form.value.city);
      formData.append('State', form.value.state);
      formData.append('Country', form.value.country);
  
      if (this.fileToUpload) {
        formData.append('files', this.fileToUpload);
        formData.append('CV_Filename', this.fileName);
      }

      this.http.post(this.apiservice.enquire, formData).subscribe({

        next: (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Form submitted successfully!',
            confirmButtonText: 'OK',
          });
          form.resetForm();
          this.fileToUpload = null;
          this.fileName = '';
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Submission Failed',
            text: `Failed to submit the form. Server returned: ${error.statusText} (${error.status}).`,
            confirmButtonText: 'OK',
          });
        },
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'Please fill out all required fields correctly.',
        confirmButtonText: 'OK',
      });
    }
  }
  


  
}
