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

}








