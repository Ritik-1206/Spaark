import { ActivatedRoute } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { Component ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { FooterComponent } from "../../footer/footer.component";
import Swiper from 'swiper';
import { HttpClient } from '@angular/common/http';
import { ApiserviceService } from '../../apiservice.service';
import { link } from 'fs';

@Component({
  selector: 'app-about',
  imports: [CommonModule , TranslateModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AboutComponent {
  isClient = false;
  galleryImages: any = [];

  constructor(private route: ActivatedRoute, private http: HttpClient , private apiservice: ApiserviceService, private translateService: TranslateService, private titleService: Title, private metaService: Meta)
   {
    if (typeof window !== 'undefined') {
      this.isClient = true;
    }
   }
  certificates: any[] = [];
  ngOnInit() {
    // Use bracket notation to access dynamic keys in route data
    const routeData = this.route.snapshot.data;
    this.titleService.setTitle(routeData['title']);  // Use ['title'] to access
    this.metaService.updateTag({ name: 'description', content: routeData['description'] });  // Use ['description']
    this.loadTranslations();
    this.getGalleryImages()
  }

  members = [
    { name: 'Dr. Chander Prakash', image: '/About/ChanderPrakash.png' },
    { name: 'Dr Sunita', image: '/About/Sunita.png' },
    { name: 'Mr Akshat Goel', image: '/About/AkshatGoel.png' },
    { name: 'Mr Umesh Yadav', image: '/About/UmeshYadav.png' },
    { name: 'Mr Awadhesh Sinha', image: '/About/Awadesh.png' },
    { name: 'Dr Ravi Ranjan', image: '/About/RaviRanjan.png' },
    { name: 'Mrs Kiran Ojha', image: '/About/KiranOjha.png' },
  ];

  employees = [
    { name: 'Mrs Aashita', image: '/About/Aashita.png' , profile: 'Co Founder' , linkedIn : 'https://www.linkedin.com/in/aashita-goel-4932b9298?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'},
    { name: 'Ms Priya Ojha', image: '/About/PriyaOjha.png' , profile: 'HR Head' ,linkedIn : 'https://www.linkedin.com/in/priya-ojha-a468b52ba?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'},
    { name: 'Mr Adarsh Pandey', image: '/About/AdarshPandey.png' , profile: 'Business Development' , linkedIn : 'https://www.linkedin.com/in/adarsh-pandey-08a776305?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'},
    { name: 'Mr Paras Bisht', image: '/About/ParasBisht.png' , profile: 'Senior Career Counsellor' , linkedIn : 'https://www.linkedin.com/in/paras-bisht-0367b9257?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'},
    { name: 'Mr Aryan Yadav', image: '/About/AryanYadav.png' , profile: 'Digital Marketing' , linkedIn : 'https://www.linkedin.com/in/aryan-yadav-7077aa2bb?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'},
  ];

    getGalleryImages(): void {
      this.http.get<any[]>(this.apiservice.images).subscribe({
        next: (data) => {
          this.galleryImages = data.filter((images) => images.isNews === false);
        },
        error: (error) => {
          console.error('Error fetching jobs:', error);
        },
      });
    }
  

  loadTranslations(): void {
    this.certificates = [
      {
        title: this.translateService.instant('about.certificates.Certificate1Title'),
        description: this.translateService.instant('about.certificates.Certificate1Description'),
        imageSrc: '/About/Coi.png',
        imageAlt: 'Incorporation Certificate'
      },
      {
        title: this.translateService.instant('about.certificates.Certificate2Title'),
        description: this.translateService.instant('about.certificates.Certificate2Description'),
        imageSrc: '/About/GST.png',
        imageAlt: 'GST Certificate'
      },
      {
        title: this.translateService.instant('about.certificates.Certificate3Title'),
        description: this.translateService.instant('about.certificates.Certificate3Description'),
        imageSrc: '/About/MSME.png',
        imageAlt: 'MSME Certificate'
      },
      {
        title: this.translateService.instant('about.certificates.Certificate4Title'),
        description: this.translateService.instant('about.certificates.Certificate4Description'),
        imageSrc: '/About/Establishment.png',
        imageAlt: 'Establishment Certificate'
      }
    ];
  }
}
