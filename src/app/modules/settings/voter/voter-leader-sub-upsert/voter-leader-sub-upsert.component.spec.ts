import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoterLeaderSubUpsertComponent } from './voter-leader-sub-upsert.component';

describe('VoterLeaderSubUpsertComponent', () => {
  let component: VoterLeaderSubUpsertComponent;
  let fixture: ComponentFixture<VoterLeaderSubUpsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoterLeaderSubUpsertComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VoterLeaderSubUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
