import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectionPositionComponent } from './election-position.component';

describe('ElectionPositionComponent', () => {
  let component: ElectionPositionComponent;
  let fixture: ComponentFixture<ElectionPositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElectionPositionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ElectionPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
