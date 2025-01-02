import { CommonModule } from '@angular/common';
import { Component ,CUSTOM_ELEMENTS_SCHEMA, OnInit} from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute, Route } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiserviceService } from '../../apiservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jobs',
  imports: [CommonModule],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JobsComponent implements OnInit {

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
        this.jobs = data;
        this.displayedJobs = this.jobs.slice(0, this.currentIndex);
      },
      error: (error) => {
        console.error('Error fetching jobs:', error);
      },
    });
  }
  loadMoreJobs(): void {
    this.currentIndex += this.jobsPerLoad;
    this.displayedJobs = this.jobs.slice(0, this.currentIndex);

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








