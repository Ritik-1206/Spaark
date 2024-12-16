import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-internsships',
  imports: [CommonModule],
  templateUrl: './internsships.component.html',
  styleUrl: './internsships.component.css'
})
export class InternsshipsComponent {

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
