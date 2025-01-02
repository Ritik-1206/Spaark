import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-blog-description',
  imports: [],
  templateUrl: './blog-description.component.html',
  styleUrl: './blog-description.component.css'
})
export class BlogDescriptionComponent {

  htmlContent: SafeHtml;
  constructor(private sanitizer: DomSanitizer) {
    const rawHtml = '<h1>Heading</h1><p>This is a paragraph.</p><strong>Bold text</strong>';
    this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(rawHtml);
  }
}
