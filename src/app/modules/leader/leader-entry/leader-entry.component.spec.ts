import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderEntryComponent } from './leader-entry.component';

describe('LeaderEntryComponent', () => {
  let component: LeaderEntryComponent;
  let fixture: ComponentFixture<LeaderEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaderEntryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LeaderEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
