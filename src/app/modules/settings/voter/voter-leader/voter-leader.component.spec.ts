import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoterLeaderComponent } from './voter-leader.component';

describe('VoterLeaderComponent', () => {
  let component: VoterLeaderComponent;
  let fixture: ComponentFixture<VoterLeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoterLeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VoterLeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
