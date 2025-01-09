import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-language',
  imports: [],
  templateUrl: './language.component.html',
  styleUrl: './language.component.css'
})
export class LanguageComponent implements OnInit {

  constructor(
    private route: ActivatedRoute, 
    private titleService: Title,
    private metaService: Meta) {}

  ngOnInit() {
    this.setSeoMetaData();
  }

  private setSeoMetaData(): void {
    const { title, description } = this.route.snapshot.data;
    this.titleService.setTitle(title);
    this.metaService.updateTag({ name: 'description', content: description });
  }
}
