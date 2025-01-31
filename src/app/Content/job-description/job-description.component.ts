import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiserviceService } from '../../apiservice.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-job-description',
  imports: [CommonModule],
  templateUrl: './job-description.component.html',
  styleUrl: './job-description.component.css'
})
export class JobDescriptionComponent implements OnInit {

  jobID: number = 0;
  job: any;
  jobs: any[] = [];
  jobUrl: string = '';
  urlImage : string = '';
  safeVideoUrl: SafeResourceUrl | null = null; // To store the sanitized video URL

  constructor(
    private route: ActivatedRoute,
    private apiservice: ApiserviceService,
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {

  }

  getSafeImageUrl(imageUrl: string) {
    const formattedUrl = imageUrl.replace(/\\/g, '/');
    return formattedUrl; // Encodes spaces and special characters properly
  }

  ngOnInit(): void {
    const jobIdParam = this.route.snapshot.paramMap.get('jobId');
    if (jobIdParam) {
      this.jobID = +jobIdParam; // Convert to number
      this.fetchJobDetails();
    } else {
      console.error('jobId is missing');
    }
  }

  fetchJobDetails(): void {
    this.jobUrl = this.apiservice.getJobUrl(this.jobID);
      this.http.get<any[]>(this.jobUrl).subscribe({
        next: (data) => {
          //this.jobs = data;
          this.job = data;
          this.urlImage = this.job.imageUrl;
          console.log('Image_URL',this.job.imageUrl);

          this.safeVideoUrl = this.sanitizeUrl(this.job.videoUrl);
        },
        error: (error) => {
          console.error('Error fetching jobs:', error);
        },
      });
  }

  sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
