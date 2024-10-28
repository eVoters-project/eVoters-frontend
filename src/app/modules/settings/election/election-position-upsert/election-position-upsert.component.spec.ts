import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectionPositionUpsertComponent } from './election-position-upsert.component';

describe('ElectionPositionUpsertComponent', () => {
  let component: ElectionPositionUpsertComponent;
  let fixture: ComponentFixture<ElectionPositionUpsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ElectionPositionUpsertComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ElectionPositionUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
