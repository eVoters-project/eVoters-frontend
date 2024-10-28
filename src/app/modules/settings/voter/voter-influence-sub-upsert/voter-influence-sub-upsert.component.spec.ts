import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoterInfluenceSubUpsertComponent } from './voter-influence-sub-upsert.component';

describe('VoterInfluenceSubUpsertComponent', () => {
  let component: VoterInfluenceSubUpsertComponent;
  let fixture: ComponentFixture<VoterInfluenceSubUpsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VoterInfluenceSubUpsertComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VoterInfluenceSubUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
