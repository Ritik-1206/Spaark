import { Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
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
  displayedBlogs: any[] = [];
  loadMoreStep = 3;
  currentDisplayCount = 4;
  showViewMoreButton: boolean = true;

  mostRead: { image: string; title: string; id:number }[] = [];

  constructor(private route: ActivatedRoute,
    private titleService: Title,
    private metaService: Meta,
    private http: HttpClient,
    private router: Router,
    private translateService: TranslateService,
    private apiservice : ApiserviceService) {}

  ngOnInit() {

    const routeData = this.route.snapshot.data;
    this.titleService.setTitle(routeData['title']);
    this.metaService.updateTag({ name: 'description', content: routeData['description'] });
    this.fetchBlogs();
  }

  fetchBlogs(): void {
    this.http.get<any[]>(this.apiservice.blogApi).subscribe({
      next: (data) => {
        const activeBlogs = data.filter(blog => blog.isActive);
        this.blogs = activeBlogs.map((blog) => {
          const div = document.createElement('div');
          div.innerHTML = blog.description || '';

          const heading = div.querySelector('h1, h2, h3, h4, h5, h6');
          let articleSummary = '';

          if (heading && heading.nextElementSibling) {
            articleSummary = heading.nextElementSibling.textContent || '';
            articleSummary = this.trimText(articleSummary, 250);
          }

          return {
            ...blog,
            articleSummary,
          };
        });

        this.displayedBlogs = this.blogs.slice(0, this.currentDisplayCount);

        debugger;
        this.mostRead = this.blogs.slice(1, 5).map((blog) => ({
          image: blog.imageUrl || '/default-image.png',
          title: this.trimText(blog.title || 'Untitled Blog', 60),
          id: blog.blogID,
        }));
      },
      error: (error) => {
        console.error('Error fetching blogs:', error);
      },
    });
  }

  loadMoreBlogs(): void {
    const nextCount = this.currentDisplayCount + this.loadMoreStep;
    this.displayedBlogs = this.blogs.slice(0, nextCount);
    this.currentDisplayCount = nextCount;
  }

  canLoadMore(): boolean {
    return this.displayedBlogs.length < this.blogs.length;
  }

  trimText(text: string, maxLength: number): string {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  }

  navigateToBlogDescription(blogId: number): void {
    this.router.navigate(['blog/blog-description', blogId]);
    
  }
}
