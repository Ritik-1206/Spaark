import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-internsships',
  imports: [CommonModule],
  templateUrl: './internsships.component.html',
  styleUrl: './internsships.component.css'
})
export class InternsshipsComponent {


  constructor(private route: ActivatedRoute, private titleService: Title, private metaService: Meta) {}

  ngOnInit() {
    // Use bracket notation to access dynamic keys in route data
    const routeData = this.route.snapshot.data;
    this.titleService.setTitle(routeData['title']);  // Use ['title'] to access
    this.metaService.updateTag({ name: 'description', content: routeData['description'] });  // Use ['description']
  }

  internships = [
    {
      title: 'Nursing Program',
      imageUrl: '/JobsIntern/Nursing.png'
    },
    {
      title: 'Accountancy Program',
      imageUrl: '/JobsIntern/Accountancy.png'
    },
    {
      title: 'Physiotherapy Program',
      imageUrl: '/JobsIntern/Physiotherapist.png'
    },
    {
      title: 'Hospitality Program',
      imageUrl: '/JobsIntern/Hospitality.png'
    },
    {
      title: 'Business Management',
      imageUrl: '/JobsIntern/BusinessManagement.png'
    },
    {
      title: 'Food Processing Program',
      imageUrl: '/JobsIntern/FoodProcessing.png'
    },
    {
      title: 'Skill Development',
      imageUrl: '/JobsIntern/SkillDev.png'
    },
    {
      title: 'Communication Program',
      imageUrl: '/JobsIntern/Communication.png'
    }
  ];
}
