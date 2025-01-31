import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiserviceService } from '../../apiservice.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-internship-description',
  imports: [CommonModule],
  templateUrl: './internship-description.component.html',
  styleUrl: './internship-description.component.css'
})
export class InternshipDescriptionComponent {

  jobID: number = 0;
  job: any;
  jobs: any[] = [];
  jobUrl: string = '';
  safeVideoUrl: SafeResourceUrl | null = null; // To store the sanitized video URL

  constructor(
    private route: ActivatedRoute,
    private apiservice: ApiserviceService,
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {

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

  getSafeImageUrl(imageUrl: string) {
    const formattedUrl = imageUrl.replace(/\\/g, '/');
    return formattedUrl; // Encodes spaces and special characters properly
  }

  

  fetchJobDetails(): void {
    this.jobUrl = this.apiservice.getInternUrl(this.jobID);
      this.http.get<any[]>(this.jobUrl).subscribe({
        next: (data) => {
          //this.jobs = data;
          this.job = data;

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
