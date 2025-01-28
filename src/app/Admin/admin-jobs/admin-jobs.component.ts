import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiserviceService } from '../../apiservice.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-jobs',
  imports: [CommonModule],
  templateUrl: './admin-jobs.component.html',
  styleUrl: './admin-jobs.component.css'
})
export class AdminJobsComponent implements OnInit {

  constructor( private http: HttpClient , private router: Router , private apiservice: ApiserviceService) { }

  jobs: any[] = [];
  jobUrl: string = '';
  ngOnInit(): void {
    this.fetchJobs();
  }

  navigateTo(route?: string): void {
    debugger;
    this.router.navigate([route]).then(() => {
      window.scrollTo(0, 0);
    });
}
  
  fetchJobs(): void {
    this.http.get<any[]>(this.apiservice.jobApi).subscribe({
      next: (data) => {
        // Fetch all jobs without filtering
        this.jobs = data;
      },
      error: (error) => {
        console.error('Error fetching jobs:', error);
      },
    });
  }
  
  toggleActive(job: any): void {
    job.isActive = !job.isActive;  // Toggle between true and false
  }



hideJob(job:any): void {
  const id = Number(job.jobID);
  this.jobUrl = this.apiservice.getJobUrl(id);
  const queryPayload = {
    jobID: id,
    title: job.title,
    location: job.location,
    openings: job.openings,
    qualification: job.qualification,
    salary: job.salary,
    workTimings: job.workTimings,
    experience: job.eexperience,
    testExamRequired: job.testExamRequired,
    programStructure: job.programStructure,
    accommodationandTransportation: job.accommodationandTransportation,
    contract: job.contract,
    visaSuccessRate: job.visaSuccessRate,
    age: job.age,
    imageUrl: job.imageUrl,
    videoUrl: job.videoUrl,
    otherDescription: job.otherDescription,
    isInternship: job.isInternship,
    isActive: false
  }
  this.http.put(this.jobUrl, queryPayload).subscribe(
    (response) => {
      Swal.fire({
        icon: 'success',
        title: 'Job Status Updated',
        text: 'Your job has been updated successfully.',
      });
      this.fetchJobs();
    },
    (error) => {
      console.error('Error adding job:', error);
      Swal.fire({
        icon: 'error',
        title: 'Status Updation Failed',
        text: 'Failed to update the status of job. Please try again.',
      });
    }
  );
}

showJob(job: any) : void {

  const id = Number(job.jobID);
  this.jobUrl = this.apiservice.getJobUrl(id);
  const queryPayload = {
    jobID: id,
    title: job.title,
    location: job.location,
    openings: job.openings,
    qualification: job.qualification,
    salary: job.salary,
    workTimings: job.workTimings,
    experience: job.eexperience,
    testExamRequired: job.testExamRequired,
    programStructure: job.programStructure,
    accommodationandTransportation: job.accommodationandTransportation,
    contract: job.contract,
    visaSuccessRate: job.visaSuccessRate,
    age: job.age,
    imageUrl: job.imageUrl,
    videoUrl: job.videoUrl,
    otherDescription: job.otherDescription,
    isInternship: job.isInternship,
    isActive: true
  }

  this.http.put(this.jobUrl, queryPayload).subscribe(
    (response) => {
      Swal.fire({
        icon: 'success',
        title: 'Job Status Updated',
        text: 'Your job status has been updated successfully.',
      });
      this.fetchJobs();
    },
    (error) => {
      console.error('Error adding job:', error);
      Swal.fire({
        icon: 'error',
        title: 'Status Updation Failed',
        text: 'Failed to update the status of job. Please try again.',
      });
    }
  );
}
}
