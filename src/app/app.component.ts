import { Component , OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from "./footer/footer.component";
import { TranslateModule } from '@ngx-translate/core';
import { MultilangService } from './multilang.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { AdminNavbarComponent } from "./admin-navbar/admin-navbar.component";
import { QueriesComponent } from './Content/queries/queries.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, AdminNavbarComponent, QueriesComponent , TranslateModule, CommonModule, AdminNavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  title = 'Spaark';
  showNavbarFooter = true;
  isadmin = true;
  isQueryModalVisible: boolean = false;
  multiLangService = inject(MultilangService);
  isExpanded = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}


  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const currentUrl = event.urlAfterRedirects;
        this.showNavbarFooter = !currentUrl.includes('login') && !currentUrl.includes('admin') && !currentUrl.includes('reset-password');
        this.isadmin = currentUrl.includes('admin');
      });
  }

  toggleLanguage(language: string){
    if(this.multiLangService.languageSignal() !== language){
      this.multiLangService.updateLanguage(language);
      console.log('language changed to', language);
    }
  }

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }



  openQueryModal(): void {
    this.isQueryModalVisible = true;
    this.isExpanded = false; 
  }

  closeQueryModal(): void {
    this.isQueryModalVisible = false;
  }

  openWhatsApp(): void {
    const phoneNumber = '918920019466';
    const url = `https://wa.me/${phoneNumber}`;
    window.open(url, '_blank');
    this.isExpanded = false; 
  }

}
