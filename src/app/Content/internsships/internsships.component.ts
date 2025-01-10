import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiserviceService } from '../../apiservice.service';

@Component({
  selector: 'app-internsships',
  imports: [CommonModule],
  templateUrl: './internsships.component.html',
  styleUrl: './internsships.component.css'
})
export class InternsshipsComponent implements OnInit {

  jobs: any[] = [];
  displayedJobs: any[] = [];
  currentIndex: number = 6;  // Initially display 6 jobs
  jobsPerLoad: number = 3;   // Load 3 more jobs each time
  showViewMoreButton: boolean = true;  // Initially show the 'View More' button
  constructor(private route: ActivatedRoute, 
    private titleService: Title,
     private metaService: Meta,
      private http:HttpClient ,
      private router : Router,
       private apiservice:ApiserviceService) {}

  ngOnInit() {
    this.setSeoMetaData();
    this.fetchJobs();
  }

  private setSeoMetaData(): void {
    const { title, description } = this.route.snapshot.data;
    this.titleService.setTitle(title);
    this.metaService.updateTag({ name: 'description', content: description });
  }

  fetchJobs(): void {
    this.http.get<any[]>(this.apiservice.jobApi).subscribe({
      next: (data) => {
        // Filter jobs for internships
        this.jobs = data.filter(
          (job) =>
            job.isInternship === 1 || 
            (job.openings && job.openings.toLowerCase().includes('internship'))
        );
  
        // Display initial jobs
        this.displayedJobs = this.jobs.slice(0, this.currentIndex);
  
        // Hide 'View More' button if there are fewer jobs than currentIndex
        this.showViewMoreButton = this.jobs.length > this.currentIndex;
      },
      error: (error) => {
        console.error('Error fetching jobs:', error);
      },
    });
  }
  
  loadMoreJobs(): void {
    this.currentIndex += this.jobsPerLoad; // Increment the job count
    this.displayedJobs = this.jobs.slice(0, this.currentIndex); // Update displayed jobs
  
    // Hide 'View More' button if all jobs are displayed
    if (this.displayedJobs.length >= this.jobs.length) {
      this.showViewMoreButton = false;
    }
  }
  
  navigateTo(route?: string) {
    this.router.navigate([route]).then(() => {
      window.scrollTo(0, 0);
    });
  }

  navigateToJobDescription(jobId: number): void {
    this.router.navigate(['/jobs/job-description', jobId]);
  }
}
