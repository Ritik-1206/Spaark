import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternsshipsComponent } from './internsships.component';

describe('InternsshipsComponent', () => {
  let component: InternsshipsComponent;
  let fixture: ComponentFixture<InternsshipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InternsshipsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InternsshipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
