import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectionScheduleComponent } from './election-schedule.component';

describe('ElectionScheduleComponent', () => {
  let component: ElectionScheduleComponent;
  let fixture: ComponentFixture<ElectionScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElectionScheduleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ElectionScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
