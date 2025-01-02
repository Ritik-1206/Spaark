import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-about',
  imports: [CommonModule , TranslateModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

  constructor(private route: ActivatedRoute, private translateService: TranslateService, private titleService: Title, private metaService: Meta) {}
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
