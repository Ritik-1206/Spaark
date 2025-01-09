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
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent {
  isClient = false;
  jobs: any[] = [];
  displayedJobs: any[] = [];
  currentIndex: number = 3; 

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
    // Use bracket notation to access dynamic keys in route data
    const routeData = this.route.snapshot.data;
    this.titleService.setTitle(routeData['title']);  // Use ['title'] to access
    this.metaService.updateTag({ name: 'description', content: routeData['description'] });  // Use ['description']
    this.fetchJobs();
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
        this.jobs = data;
        this.displayedJobs = this.jobs.slice(0, this.currentIndex);
      },
      error: (error) => {
        console.error('Error fetching jobs:', error);
      },
    });
  }


  navigateToJobDescription(jobId: number): void {
    this.router.navigate(['/jobs/job-description', jobId]);
  }

  social_media = [
    {
      title: 'Facebook',
      icon_image: '/Home/icons/facebook.png',
      imageUrl: '/Home/facebook.png',
      link: 'https://www.facebook.com/spaarkoverseasofficial/'
    },
    {
      title: 'Instagram',
      icon_image: '/Home/icons/instagram.png',
      imageUrl: '/Home/Instagram.png',
      link: 'https://www.instagram.com/spaarkoverseasofficial/'
    },
    {
      title: 'Youtube',
      icon_image: '/Home/icons/youtube.png',
      imageUrl: '/Home/Instagram.png',
      link: 'https://www.youtube.com/@spaarkoverseasofficial/'
    },
    {
      title: 'Linkedin',
      icon_image: '/Home/icons/linkedin.png',
      imageUrl: '/Home/Instagram.png',
      link: 'https://www.linkedin.com/company/spaark-overseas-noida/'
    }
  ];

  reviews = [
    {
      imageUrl: '/Home/Reviews/Review_1.jpeg',
      text: 'Spaark Overseas is highly professional and trustworthy. They guided me through the entire process, from documentation to interview preparation.',
      author: 'Jaspreet Singh',
    },
    {
      imageUrl: '/Home/Reviews/Review_2.jpeg',
      text: 'Their expertise in the German nursing program is incredible. Spaark Overseas is undoubtedly the best in the business.',
      author: 'Divya Jain',
    },
    {
      imageUrl: '/Home/Reviews/Review_3.jpeg',
      text: 'I was skeptical at first, but Spaark Overseas delivered on all their promises. I’m now part of the Ausbildung program in Germany. Thank you',
      author: 'Abhinav Singh',
    },
    {
      imageUrl: '/Home/Reviews/Review_4.jpeg',
      text: 'Thanks to Spaark Overseas, I am now working as a physiotherapist in Germany. They are the best placement agency for healthcare professionals.',
      author: 'Sachin Rao',
    },
    {
      imageUrl: '/Home/Reviews/Review_5.jpeg',
      text: 'The Ausbildung program through Spaark Overseas has changed my life. They were with me at every step and made the transition to Germany effortless.',
      author: 'Vivek Gupta',
    },
    {
      imageUrl: '/Home/Reviews/Review_6.jpeg',
      text: 'I cannot thank Spaark Overseas enough for guiding me through the German Nursing program. The entire process was smooth, and their support was outstanding. Highly recommended!',
      author: 'Amit Sharma',
    },
    {
      imageUrl: '/Home/Reviews/Review_7.jpeg',
      text: 'I had a fantastic experience with Spaark Overseas. They are experts in German placements and very supportive.',
      author: 'Rohit Jain',
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

  galleryImages = [
    { image_url: "/Home/Gallery/Image_1.jpeg", title: "Image_1" },
    { image_url: "/Home/Gallery/Image_2.jpeg", title: "Image_2" },
    { image_url: "/Home/Gallery/Image_3.jpeg", title: "Image_3" },
    { image_url: "/Home/Gallery/Image_4.jpeg", title: "Image_4" },
    { image_url: "/Home/Gallery/Image_5.jpeg", title: "Image_5" },
    { image_url: "/Home/Gallery/Image_6.jpeg", title: "Image_6" },
    { image_url: "/Home/Gallery/Image_1.jpeg", title: "Image_7" },
    { image_url: "/Home/Gallery/Image_2.jpeg", title: "Image_8" },
    { image_url: "/Home/Gallery/Image_3.jpeg", title: "Image_9" },
    { image_url: "/Home/Gallery/Image_4.jpeg", title: "Image_10" },
    { image_url: "/Home/Gallery/Image_5.jpeg", title: "Image_11" },
    { image_url: "/Home/Gallery/Image_6.jpeg", title: "Image_12" },
    { image_url: "/Home/Gallery/Image_1.jpeg", title: "Image_13" },
    { image_url: "/Home/Gallery/Image_2.jpeg", title: "Image_14" },
    { image_url: "/Home/Gallery/Image_3.jpeg", title: "Image_15" },
    { image_url: "/Home/Gallery/Image_4.jpeg", title: "Image_16" },
    { image_url: "/Home/Gallery/Image_5.jpeg", title: "Image_17" },
    { image_url: "/Home/Gallery/Image_6.jpeg", title: "Image_18" },
    { image_url: "/Home/Gallery/Image_6.jpeg", title: "Image_19" },
    { image_url: "/Home/Gallery/Image_6.jpeg", title: "Image_20" }
    ];
  
}
