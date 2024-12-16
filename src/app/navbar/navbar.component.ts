import { CommonModule } from '@angular/common';
import { Component , ElementRef , HostListener , ViewChild} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @ViewChild('menuBtn', { static: true }) menuBtn!: ElementRef;

  constructor(private eRef: ElementRef , private router: Router) {}

  // Listen for clicks anywhere on the document
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event): void {

    const isClickInside = this.eRef.nativeElement.contains(event.target);

    if (!isClickInside) {
      this.menuBtn.nativeElement.checked = false;
    }
  }
  onNavbarClick(event: Event): void {
    event.stopPropagation();
  }

  navigateTo(route?: string) {
    if (route) {
      this.router.navigate([route]);
    } else {
      console.error('Route is undefined!');
    }
    this.menuBtn.nativeElement.checked = false;
  }
  
}


