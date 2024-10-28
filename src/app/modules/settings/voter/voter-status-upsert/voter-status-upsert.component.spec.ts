import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoterStatusUpsertComponent } from './voter-status-upsert.component';

describe('VoterStatusUpsertComponent', () => {
  let component: VoterStatusUpsertComponent;
  let fixture: ComponentFixture<VoterStatusUpsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoterStatusUpsertComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VoterStatusUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
