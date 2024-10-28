import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoterLeaderUpsertComponent } from './voter-leader-upsert.component';

describe('VoterLeaderUpsertComponent', () => {
  let component: VoterLeaderUpsertComponent;
  let fixture: ComponentFixture<VoterLeaderUpsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoterLeaderUpsertComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VoterLeaderUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
