import { Component , inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from "./footer/footer.component";
import { TranslateModule } from '@ngx-translate/core';
import { MultilangService } from './multilang.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  multiLangService = inject(MultilangService);

    
  toggleLanguage(language: string){
    if(this.multiLangService.languageSignal() !== language){
      this.multiLangService.updateLanguage(language);
      console.log('language changed to', language);
    }
  }


  title = 'Spaark';
}
