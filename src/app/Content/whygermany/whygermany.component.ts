import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-whygermany',
  imports: [CommonModule],
  templateUrl: './whygermany.component.html',
  styleUrl: './whygermany.component.css'
})
export class WhygermanyComponent {

  constructor(private route: ActivatedRoute, private router: Router, private titleService: Title, private metaService: Meta) {}

  ngOnInit() {
    const routeData = this.route.snapshot.data;
    this.titleService.setTitle(routeData['title']);  // Use ['title'] to access
    this.metaService.updateTag({ name: 'description', content: routeData['description'] });  // Use ['description']
  }

  reasons = [
    {
      title: 'Learning German',
      imageUrl: '/WhyGermany/learning.png',
      path: 'why-germany/learning-german'
    },
    {
      title: 'Discover Germany',
      imageUrl: '/WhyGermany/discover.png',
      path: 'why-germany/discover-germany'
    },
    {
      title: 'Family Life in Germany',
      imageUrl: '/WhyGermany/family.png',
      path: 'why-germany/family-life'
    },
    {
      title: 'Housing & Mobility',
      imageUrl: '/WhyGermany/housing.png',
      path: 'why-germany/housing-mobility'
    },
    {
      title: 'Money & Insurance',
      imageUrl: '/WhyGermany/insurance.png',
      path: 'why-germany/insurance'
    },
    {
      title: 'Settling',
      imageUrl: '/WhyGermany/back.png',
      path: 'why-germany/settling'
    }
  ];

  navigateTo(route?: string) {
    this.router.navigate([route]).then(() => {
      window.scrollTo(0, 0);
    });
  }

}
