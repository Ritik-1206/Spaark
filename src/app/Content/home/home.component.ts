import { CommonModule } from '@angular/common';
import { Component ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { FooterComponent } from "../../footer/footer.component";
import { ActivatedRoute, Router } from '@angular/router';
import Swiper from 'swiper';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent {
  isClient = false;

  constructor(private router: Router,
    private route: ActivatedRoute, 
    private titleService: Title, 
    private metaService: Meta
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
  jobs = [
    {
      title: 'Sales Executive',
      location: 'Noida Sector 63',
      openings: '20+ Openings',
      qualification: 'Graduation',
      imageUrl: '/Home/SalesJob.png'
    },
    {
      title: 'Physiotherapy',
      location: 'Germany',
      openings: '10+ Openings',
      qualification: 'Bachelors of Physical Therapy',
      imageUrl: '/Home/PhysioJob.png'
    },
    {
      title: 'Nursing Staff',
      location: 'Germany',
      openings: '100+ Openings',
      qualification: '12th/Graduation',
      imageUrl: '/Home/NurseJob.png'
    },
    {
      title: 'Site Manager',
      location: 'Germany',
      openings: '10+ Openings',
      qualification: 'MBA',
      imageUrl: '/Home/SiteManager.png'
    }
  ];

  social_media = [
    {
      title: 'Facebook',
      icon_image: '/Footer/facebook.png',
      imageUrl: '/Home/facebook.png'
    },
    {
      title: 'Physiotherapy',
      location: 'Germany',
      openings: '10+ Openings',
      qualification: 'Bachelors of Physical Therapy',
      imageUrl: '/Home/PhysioJob.png'
    },
    {
      title: 'Nursing Staff',
      location: 'Germany',
      openings: '100+ Openings',
      qualification: '12th/Graduation',
      imageUrl: '/Home/NurseJob.png'
    },
    {
      title: 'Site Manager',
      location: 'Germany',
      openings: '10+ Openings',
      qualification: 'MBA',
      imageUrl: '/Home/SiteManager.png'
    }
  ];

  reviews = [
    {
      text: 'One of the best company in India for job seeker. Thanks Spaark Overseas to help me in searching the new job.',
      author: 'Ajeet Biswas',
    },
    {
      text: 'I am happy to be associated with this Manpower Services. It works with utmost responsibility & care.',
      author: 'Shweta Tamang',
    },
    {
      text: 'They were just great!..the process had some hurdles, but they still came through and walked with me till now, I highly recommend them.',
      author: 'Jaspreet Singh',
    },
    {
      text: 'Excellent service with proper guidance and a friendly approach. Highly satisfied!',
      author: 'Rahul Mehra',
    },
    {
      text: 'Professional and supportive throughout my journey. Thank you!',
      author: 'Priya Sharma',
    },
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
}
