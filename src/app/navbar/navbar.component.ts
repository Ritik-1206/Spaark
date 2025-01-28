import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild, OnInit } from '@angular/core';
import { Router, NavigationEnd, Event as RouterEvent } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @ViewChild('menuBtn', { static: true }) menuBtn!: ElementRef;

  activeItem: string = 'home'; // Default active item

  constructor(private eRef: ElementRef, private router: Router) {}

  // Handle document click to close menu if clicked outside
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const isClickInside = this.eRef.nativeElement.contains(target);

    if (!isClickInside) {
      this.menuBtn.nativeElement.checked = false;
    }
  }

  // Handle clicks on the navbar
  onNavbarClick(event: MouseEvent): void {
    event.stopPropagation();
    const target = event.target as HTMLElement; // Explicitly cast target to HTMLElement
    console.log('Navbar clicked:', target);
  }

  // Navigate to the given route and close the menu
  navigateTo(route?: string): void {
    if (route) {
      this.router.navigate([route]).then(() => {
        window.scrollTo(0, 0);
      });
    } else {
      console.error('Route is undefined!');
    }
    this.menuBtn.nativeElement.checked = false;
  }

  // Update active menu item based on current route
  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((event: RouterEvent): event is NavigationEnd => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
        this.updateActiveItem(event.urlAfterRedirects);
      });
  }

  updateActiveItem(route: string): void {
    if (route.includes('admin')) {
      return; // Skip updating activeItem if "admin" is found in the route
    }
    if (route.includes('home-page')) {
      this.activeItem = 'home-page';
    } else if (route.includes('about-us')) {
      this.activeItem = 'about-us';
    } else if (route.includes('jobs')) {
      this.activeItem = 'jobs';
    } else if (route.includes('internships')) {
      this.activeItem = 'internships';
    } else if (route.includes('service')) {
      this.activeItem = 'service';
    } else if (route.includes('blog')) {
      this.activeItem = 'blog';
    } else if (route.includes('privacy&policy')) {
      this.activeItem = 'privacy&policy';
    } else if (route.includes('why-germany')) {
      this.activeItem = 'why-germany';
    } else if (route.includes('contact-us')) {
      this.activeItem = 'contact-us';
    } else {
      this.activeItem = '';
    }
  }

   // Set the active item on menu click
   setActiveItem(item: string): void {
    this.activeItem = item;
  }

  // Check if the dropdown should be active
  isDropdownActive(): boolean {
    // Returns true if the dropdown should be shown based on the active item
    return (
      this.activeItem === 'privacy&policy' || 
      this.activeItem === 'why-germany' || 
      this.activeItem === 'contact-us' || 
      this.activeItem === 'more'
    );
  }
}