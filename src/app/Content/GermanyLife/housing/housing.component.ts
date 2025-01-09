import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-housing',
  imports: [],
  templateUrl: './housing.component.html',
  styleUrl: './housing.component.css'
})
export class HousingComponent implements OnInit{

  constructor(private route: ActivatedRoute, 
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
