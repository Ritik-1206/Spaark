import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild, OnInit } from '@angular/core';
import { Router, NavigationEnd, Event as RouterEvent } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-admin-navbar',
  imports: [CommonModule , TranslateModule],
  templateUrl: './admin-navbar.component.html',
  styleUrl: './admin-navbar.component.css'
})
export class AdminNavbarComponent {
  @ViewChild('menuBtn', { static: true }) menuBtn!: ElementRef;

  activeItem: string = 'joblist'; // Default active item

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
    if (route.includes('admin/joblist')) {
      this.activeItem = 'joblist';
    } else if (route.includes('admin/bloglist')) {
      this.activeItem = 'bloglist';
    } else if (route.includes('admin/edit-blogs')) {
      this.activeItem = 'bloglist';
    } else if (route.includes('admin/edit-jobs')) {
      this.activeItem = 'joblist';
    } else if (route.includes('admin/gallery-images')) {
      this.activeItem = 'gallery-images';
    } else if (route.includes('admin/news-articles')) {
      this.activeItem = 'news-articles';
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
