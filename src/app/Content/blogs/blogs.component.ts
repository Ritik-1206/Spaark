import { Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ApiserviceService } from '../../apiservice.service';

@Component({
  selector: 'app-blogs',
  imports: [CommonModule , TranslateModule],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.css'
})
export class BlogsComponent {

  blogs: any[] = [];

  constructor(private route: ActivatedRoute,
    private titleService: Title,
    private metaService: Meta,
    private http: HttpClient,
    private translateService: TranslateService,
    private apiservice : ApiserviceService) {}

  ngOnInit() {
    // Use bracket notation to access dynamic keys in route data
    const routeData = this.route.snapshot.data;
    this.titleService.setTitle(routeData['title']);  // Use ['title'] to access
    this.metaService.updateTag({ name: 'description', content: routeData['description'] });  // Use ['description']\
    this.fetchBlogs();
  }

  fetchBlogs(): void {
    this.http.get<any[]>(this.apiservice.blogApi).subscribe({
      next: (data) => {
        this.blogs = data;
      },
      error: (error) => {
        console.error('Error fetching jobs:', error);
      },
    });
  }

  articles = [
    {
      image: '/Blogs/blog_1.png',
      title: 'Opportunities In Germany For Indian Youth',
      date: 'November 12, 2024',
      summary: 'For young Indians, Germany offers an incredible opportunity...',
    },
    {
      image: '/Blogs/blog_2.png',
      title: 'Germany FACTS v/s MYTHS',
      date: 'December 13, 2023',
      summary: 'Ever dream of working in a beautiful place in Europe?...',
    },
    {
      image: '/Blogs/blog_3.png',
      title: 'Benifits of studying in Germany',
      date: 'October 30, 2023',
      summary: 'In today\'s interconnected world, overseas careers...',
    },
    {
      image: '/Blogs/blog_4.png',
      title: 'Spaark Overseas: Your Journey To Reliable...',
      date: 'October 23, 2023',
      summary: 'Embarking on a journey to work abroad can be both...',
    },
  ];

  mostRead = [
    { image: '/Blogs/blog_1.png', title: 'Opportunities In Germany For Indian Youth' },
    { image: '/Blogs/blog_2.png', title: 'Embark On A European Career Odyssey...' },
    { image: '/Blogs/blog_3.png', title: 'Empowering Women In Overseas Careers...' },
    { image: '/Blogs/blog_4.png', title: 'Spaark Overseas: Your Journey To Reliable...' },
    { image: '/Blogs/blog_5.png', title: 'Top 10 Reasons To Choose A Career...' },
  ];
}
