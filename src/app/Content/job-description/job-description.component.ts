import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiserviceService } from '../../apiservice.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CommonModule } from '@angular/common';

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

  constructor(
    private route: ActivatedRoute,
    private apiservice: ApiserviceService,
    private http: HttpClient
  ) {}

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
    const apiUrl = `https://webspaarkapi.azurewebsites.net/api/jobs/${this.jobID}`
      this.http.get<any[]>(apiUrl).subscribe({
        next: (data) => {
          this.jobs = data;
          this.job = data;
        },
        error: (error) => {
          console.error('Error fetching jobs:', error);
        },
      });
  }
}
