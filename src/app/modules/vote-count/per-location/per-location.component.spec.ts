import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerLocationComponent } from './per-location.component';

describe('PerLocationComponent', () => {
  let component: PerLocationComponent;
  let fixture: ComponentFixture<PerLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerLocationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PerLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
