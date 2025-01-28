import { Injectable, inject, signal , PLATFORM_ID , effect } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';  // Import to detect the platform

@Injectable({
  providedIn: 'root'
})
export class MultilangService {

  translateService = inject(TranslateService);
  platformId = inject(PLATFORM_ID);

  languageSignal = signal<string>('en'); // Default to 'en'

  constructor() {
    // Only access localStorage and window on the client-side
    if (isPlatformBrowser(this.platformId)) {
      const savedLanguage = window.localStorage.getItem('languageSignal');
      if (savedLanguage) {
        this.languageSignal.set(JSON.parse(savedLanguage)); // Update signal with saved language
      } else {
        this.languageSignal.set('en'); // Set default language if none found
      }
      
      effect(() => {
        window.localStorage.setItem('languageSignal', JSON.stringify(this.languageSignal()));
        this.translateService.use(this.languageSignal());
        console.log(this.languageSignal());
      });
    }
  }

  updateLanguage(language: string): void {
    this.languageSignal.update(() => {
      switch (language) {
        case 'en':
          return 'en';
        case 'de':
          return 'de';
        default:
          return 'en';
      }
    });
  }
}