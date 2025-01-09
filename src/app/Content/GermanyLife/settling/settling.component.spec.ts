import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettlingComponent } from './settling.component';

describe('SettlingComponent', () => {
  let component: SettlingComponent;
  let fixture: ComponentFixture<SettlingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettlingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettlingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
