import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectionScheduleUpsertComponent } from './election-schedule-upsert.component';

describe('ElectionScheduleUpsertComponent', () => {
  let component: ElectionScheduleUpsertComponent;
  let fixture: ComponentFixture<ElectionScheduleUpsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ElectionScheduleUpsertComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ElectionScheduleUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
