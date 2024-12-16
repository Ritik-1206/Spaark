import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

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
}
