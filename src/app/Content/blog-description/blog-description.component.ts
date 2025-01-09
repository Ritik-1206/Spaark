import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiserviceService } from '../../apiservice.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog-description',
  imports: [CommonModule],
  templateUrl: './blog-description.component.html',
  styleUrl: './blog-description.component.css'
})
export class BlogDescriptionComponent implements OnInit {

  blogID: number = 0;
  blog: any;
  blogs: any[] = [];

  constructor(private sanitizer: DomSanitizer ,
    private route: ActivatedRoute,
    private apiservice: ApiserviceService,
    private http: HttpClient,
     private router: Router) {

  }

  ngOnInit(): void {
    const blogIdParam = this.route.snapshot.paramMap.get('blogId');
    if (blogIdParam) {
      this.blogID = +blogIdParam; // Convert to number
      this.fetchBlogContent();
    } else {
      console.error('jobId is missing');
    }
  }

  fetchBlogContent(): void {
    const apiUrl = `https://webspaarkapi.azurewebsites.net/api/blogs/${this.blogID}`
      this.http.get<any[]>(apiUrl).subscribe({
        next: (data) => {
          this.blogs = data;
          this.blog = data;
        },
        error: (error) => {
          console.error('Error fetching jobs:', error);
        },
      });
  }


}
