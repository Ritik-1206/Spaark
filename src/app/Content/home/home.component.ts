import { CommonModule } from '@angular/common';
import { Component ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { FooterComponent } from "../../footer/footer.component";
import { ActivatedRoute, Route, Router } from '@angular/router';
import Swiper from 'swiper';
import { Meta, Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { ApiserviceService } from '../../apiservice.service';
import { link } from 'fs';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  host: {
    '[attr.ngSkipHydration]': 'true'  // Skip hydration for the component
  }
})
export class HomeComponent {
  isClient = false;
  jobs: any[] = [];
  newsImages: any = [];
  reviews : any = [];
  displayedJobs: any[] = [];
  currentIndex: number = 3; 

  candidatesPlaced: number = 0;
  globalEmployers: number = 0;
  visaSuccessRate: number = 0;

  constructor(private router: Router,
    private route: ActivatedRoute, 
    private titleService: Title, 
    private metaService: Meta,
    private http: HttpClient,
    private apiservice: ApiserviceService
  ) {
    if (typeof window !== 'undefined') {
      this.isClient = true;
    }
  }

  ngOnInit() {
    
    const routeData = this.route.snapshot.data;
    this.titleService.setTitle(routeData['title']);
    this.metaService.updateTag({ name: 'description', content: routeData['description'] }); 
    this.animateNumber(200, 'candidatesPlaced', 3000);
    this.animateNumber(10, 'globalEmployers', 3000);
    this.animateNumber(98, 'visaSuccessRate', 3000);
    this.fetchJobs();
    this.getNewsImages();
    this.getReviews();
  }

  animateNumber(finalValue: number, property: 'candidatesPlaced' | 'globalEmployers' | 'visaSuccessRate', duration: number): void {
    let start = 0;
    const step = finalValue / (duration / 16); // Approximate frame rate of 60fps

    const interval = setInterval(() => {
      if (start >= finalValue) {
        this[property] = finalValue; // Ensure final value is set
        clearInterval(interval);
      } else {
        this[property] = Math.ceil(start);
        start += step;
      }
    }, 10);
  }

  services = [
    {
      title: 'Job Placements',
      content: 'Embarking on an international career journey can be both exciting and challenging. At Spaark Overseas, we guide you through the process of securing a job overseas, ensuring a smooth professional experience.',
      imageUrl: '/Home/JobService.png'
    },
    {
      title: 'Language Training',
      content: 'We offer German language training for levels A1, A2, B1, and B2, led by GOETHE-certified teachers. Classes are flexible and include extra doubt-clearing sessions.',
      imageUrl: '/Home/TrainingService.png'
    },
    {
      title: 'Abroad Study Consultants',
      content: 'We guide aspiring students through the process of pursuing education in international institutions, ensuring a transformative experience and quality education.',
      imageUrl: '/Home/Consulting.png'
    }
  ];

  // Jobs data as a plain array of objects
  fetchJobs(): void {
    this.http.get<any[]>(this.apiservice.jobApi).subscribe({
      next: (data) => {
        this.jobs = data.filter((job) => job.isActive === true);
        this.displayedJobs = this.jobs.slice(0, this.currentIndex);
      },
      error: (error) => {
        console.error('Error fetching jobs:', error);
      },
    });
  }


  navigateToJobDescription(jobId: number): void {
    this.router.navigate(['/jobs/job-description', jobId]).then(() => {
      window.scrollTo(0, 0);
    });
  }

  navigateToInternDescription(jobId: number): void {
    this.router.navigate(['/internships/internship-description', jobId]).then(() => {
      window.scrollTo(0, 0);
    });
  }

  social_media = [
    {
      title: 'Facebook',
      icon_image: '/icons/facebook.png',
      imageUrl: '/Home/facebook.png',
      link: 'https://www.facebook.com/spaarkoverseasofficial/'
    },
    {
      title: 'Instagram',
      icon_image: '/icons/instagram.png',
      imageUrl: '/Home/Instagram.jpeg',
      link: 'https://www.instagram.com/spaarkoverseasofficial/'
    },
    {
      title: 'Youtube',
      icon_image: '/icons/youtube.png',
      imageUrl: '/Home/Youtube.jpeg',
      link: 'https://www.youtube.com/@spaarkoverseasofficial/'
    },
    {
      title: 'Linkedin',
      icon_image: '/icons/linkedin.png',
      imageUrl: '/Home/Linkedin.png',
      link: 'https://www.linkedin.com/company/spaark-overseas-noida/'
    }
  ];

  navigateTo(route?: string) {
    if (route) {
      this.router.navigate([route]).then(() => {
        window.scrollTo(0, 0);
      });
    } else {
      console.error('Route is undefined!');
    }
  }

  redirectToMedia(link: string): void {
    window.open(link, '_blank');
  }

    getNewsImages(): void {
      this.http.get<any[]>(this.apiservice.images).subscribe({
        next: (data) => {
          this.newsImages = data.filter((images) => images.isNews === true);
        },
        error: (error) => {
          console.error('Error fetching jobs:', error);
        },
      });
    }

    getReviews(): void {
      this.http.get<any[]>(this.apiservice.reviews).subscribe({
        next: (data) => {
          this.reviews = data.filter((review) => review.isActive === true);
        },
        error: (error) => {
          console.error('Error fetching reviews:', error);
        },
      });
    }
  
}
