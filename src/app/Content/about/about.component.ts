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

  constructor(private route: ActivatedRoute, private translateService: TranslateService, private titleService: Title, private metaService: Meta)
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
    { name: 'Mrs Aashita', image: '/About/Aashita.png' , profile: 'Co Founder'},
    { name: 'Mrs Priya Ojha', image: '/About/PriyaOjha.png' , profile: 'HR Head'},
    { name: 'Mr Adarsh Pandey', image: '/About/AdarshPandey.png' , profile: 'Business Development'},
    { name: 'Mr Paras Bisht', image: '/About/ParasBisht.png' , profile: 'Senior Career Counsellor'},
    { name: 'Mr Aryan Yadav', image: '/About/AryanYadav.png' , profile: 'Digital Marleting'},
  ];

  galleryImages = [
    { image_url: "/Home/Gallery/Image_1.jpeg", title: "Image_1" },
    { image_url: "/Home/Gallery/Image_2.jpeg", title: "Image_2" },
    { image_url: "/Home/Gallery/Image_3.jpeg", title: "Image_3" },
    { image_url: "/Home/Gallery/Image_4.jpeg", title: "Image_4" },
    { image_url: "/Home/Gallery/Image_5.jpeg", title: "Image_5" },
    { image_url: "/Home/Gallery/Image_6.jpeg", title: "Image_6" },
    { image_url: "/Home/Gallery/Image_7.jpeg", title: "Image_7" },
    { image_url: "/Home/Gallery/Image_8.jpeg", title: "Image_8" },
    { image_url: "/Home/Gallery/Image_9.jpeg", title: "Image_9" },
    { image_url: "/Home/Gallery/Image_10.jpeg", title: "Image_10" },
    { image_url: "/Home/Gallery/Image_11.jpeg", title: "Image_11" },
    { image_url: "/Home/Gallery/Image_12.jpeg", title: "Image_12" },
    { image_url: "/Home/Gallery/Image_13.jpeg", title: "Image_13" },
    { image_url: "/Home/Gallery/Image_14.jpeg", title: "Image_14" },
    { image_url: "/Home/Gallery/Image_15.jpeg", title: "Image_15" },
    { image_url: "/Home/Gallery/Image_16.jpeg", title: "Image_16" },
    { image_url: "/Home/Gallery/Image_17.jpeg", title: "Image_17" },
    { image_url: "/Home/Gallery/Image_18.jpeg", title: "Image_18" },
    { image_url: "/Home/Gallery/Image_19.jpeg", title: "Image_19" },
    { image_url: "/Home/Gallery/Image_20.jpeg", title: "Image_20" },
    { image_url: "/Home/Gallery/Image_21.jpeg", title: "Image_20" }
    ];
  

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
