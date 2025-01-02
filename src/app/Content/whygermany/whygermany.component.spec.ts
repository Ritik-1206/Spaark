import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhygermanyComponent } from './whygermany.component';

describe('WhygermanyComponent', () => {
  let component: WhygermanyComponent;
  let fixture: ComponentFixture<WhygermanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhygermanyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhygermanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
