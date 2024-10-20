import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoterLeaderSubComponent } from './voter-leader-sub.component';

describe('VoterLeaderSubComponent', () => {
  let component: VoterLeaderSubComponent;
  let fixture: ComponentFixture<VoterLeaderSubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoterLeaderSubComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VoterLeaderSubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
