import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiserviceService } from '../../apiservice.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-blogs',
  imports: [CommonModule],
  templateUrl: './admin-blogs.component.html',
  styleUrl: './admin-blogs.component.css'
})
export class AdminBlogsComponent implements OnInit {
  
  constructor( private http: HttpClient , private router: Router , private apiservice: ApiserviceService) { }

  blogs: any[] = [];
  title: string = '';
  description: string = '';
  author:string = '';
  imageUrl: string = '';
  blogUrl: string = '';
  ngOnInit(): void {
    this.fetchBlogs();
  }

  fetchBlogs(): void {
    this.http.get<any[]>(this.apiservice.blogApi).subscribe({
      next: (data) => {
        // Fetch all jobs without filtering
        this.blogs = data;
      },
      error: (error) => {
        console.error('Error fetching jobs:', error);
      },
    });
  }
  
  toggleActive(blog: any): void {
    blog.isActive = !blog.isActive;  // Toggle between true and false
  }

  navigateTo(route?: string): void {
    debugger;
    this.router.navigate([route]).then(() => {
      window.scrollTo(0, 0);
    });
}

navigateToBlog(BlogId: number): void {
  this.router.navigate(['/admin/edit-blogs', BlogId]);
}

deleteBlog(id:number): void
{
  this.blogUrl = this.apiservice.getBlogUrl(id);
  this.http.delete(this.blogUrl).subscribe(
    (response) => {
      Swal.fire({
        icon: 'success',
        title: 'Blog Deleted',
        text: 'Your blog has been deleted successfully.',
      });
      this.fetchBlogs();
    },
    (error) => {
      console.error('Error adding blog:', error);
      Swal.fire({
        icon: 'error',
        title: 'Deletion Failed',
        text: 'Failed to delete the blog. Please try again.',
      });
    }
  );
}

hideBlog(blog:any): void {
  const id = Number(blog.blogID);
  this.blogUrl = this.apiservice.getBlogUrl(id);
  const queryPayload = {
    blogID: id,
    title: blog.title,
    description: blog.description,
    author: blog.author,
    imageUrl: blog.imageUrl,
    isActive: false
  }
  this.http.put(this.blogUrl, queryPayload).subscribe(
    (response) => {
      Swal.fire({
        icon: 'success',
        title: 'Blog Status Updated',
        text: 'Your blog has been updated successfully.',
      });
      this.fetchBlogs();
    },
    (error) => {
      console.error('Error adding blog:', error);
      Swal.fire({
        icon: 'error',
        title: 'Status Updation Failed',
        text: 'Failed to update the status of blog. Please try again.',
      });
    }
  );
}

showBlog(blog: any) : void {

  const id = Number(blog.blogID)

  this.blogUrl = this.apiservice.getBlogUrl(id);
  const queryPayload = {
    blogID: id,
    title: blog.title,
    description: blog.description,
    author: blog.author,
    imageUrl: blog.imageUrl,
    isActive: true
  }

  this.http.put(this.blogUrl, queryPayload).subscribe(
    (response) => {
      Swal.fire({
        icon: 'success',
        title: 'Blog Status Updated',
        text: 'Your blog status has been updated successfully.',
      });
      this.fetchBlogs();
    },
    (error) => {
      console.error('Error adding blog:', error);
      Swal.fire({
        icon: 'error',
        title: 'Status Updation Failed',
        text: 'Failed to update the status of blog. Please try again.',
      });
    }
  );
}

}
