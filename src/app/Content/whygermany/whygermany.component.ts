import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-whygermany',
  imports: [CommonModule],
  templateUrl: './whygermany.component.html',
  styleUrl: './whygermany.component.css'
})
export class WhygermanyComponent {

  constructor(private route: ActivatedRoute, private titleService: Title, private metaService: Meta) {}

  ngOnInit() {
    const routeData = this.route.snapshot.data;
    this.titleService.setTitle(routeData['title']);  // Use ['title'] to access
    this.metaService.updateTag({ name: 'description', content: routeData['description'] });  // Use ['description']
  }

  reasons = [
    {
      title: 'Learning German',
      imageUrl: '/WhyGermany/learning.png'
    },
    {
      title: 'Discover German',
      imageUrl: '/WhyGermany/discover.png'
    },
    {
      title: 'Family Life in Germany',
      imageUrl: '/WhyGermany/family.png'
    },
    {
      title: 'Housing & Mobility',
      imageUrl: '/WhyGermany/housing.png'
    },
    {
      title: 'Money & Insurance',
      imageUrl: '/WhyGermany/insurance.png'
    },
    {
      title: 'Back to Germany',
      imageUrl: '/WhyGermany/back.png'
    }
  ];

}
