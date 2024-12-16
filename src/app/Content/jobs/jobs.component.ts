import { CommonModule } from '@angular/common';
import { Component ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

@Component({
  selector: 'app-jobs',
  imports: [CommonModule],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JobsComponent {
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

}








