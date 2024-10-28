import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoterPositionUpsertComponent } from './voter-position-upsert.component';

describe('VoterPositionUpsertComponent', () => {
  let component: VoterPositionUpsertComponent;
  let fixture: ComponentFixture<VoterPositionUpsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoterPositionUpsertComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VoterPositionUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
