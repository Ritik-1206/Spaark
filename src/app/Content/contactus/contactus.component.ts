import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ApiserviceService } from '../../apiservice.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contactus',
  imports: [FormsModule],
  templateUrl: './contactus.component.html',
  styleUrl: './contactus.component.css'
})
export class ContactusComponent {

  constructor(private route: ActivatedRoute, private titleService: Title, private metaService: Meta, private http: HttpClient , private apiervice: ApiserviceService) {}

  ngOnInit() {
    const routeData = this.route.snapshot.data;
    this.titleService.setTitle(routeData['title']);  // Use ['title'] to access
    this.metaService.updateTag({ name: 'description', content: routeData['description'] });  // Use ['description']
  }

  cvData: File | null = null;


  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.cvData = file;
    }
  }

  onSubmit(form: any) {
    if (form.valid && this.cvData) {
      debugger;
      const requestBody = {
        registerID: 0,
        name: form.value.name,
        phone_No: form.value.phone_No,
        email: form.value.email,
        contactDatetime: `${form.value.date} ${form.value.time}`,
        city: form.value.city,
        state: form.value.state,
        country: form.value.country,
        cV_Data: this.cvData.name,
        cV_Filename: this.cvData.name,
        isActive: true,
      };


      console.log(requestBody);

      this.http.post(this.apiervice.enquire, requestBody).subscribe({
        next: (response) => console.log('Registration successful', response),
        error: (err) => console.error('Error during registration', err)
      });
    } else {
      alert('Please fill all the fields and upload a CV.');
    }
  }


  
}
