import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerPositionComponent } from './per-position.component';

describe('PerPositionComponent', () => {
  let component: PerPositionComponent;
  let fixture: ComponentFixture<PerPositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerPositionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PerPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
