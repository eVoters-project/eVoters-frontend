import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoterStatusComponent } from './voter-status.component';

describe('VoterStatusComponent', () => {
  let component: VoterStatusComponent;
  let fixture: ComponentFixture<VoterStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoterStatusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VoterStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
