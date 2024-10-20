import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoterBaseComponent } from './voter-base.component';

describe('VoterBaseComponent', () => {
  let component: VoterBaseComponent;
  let fixture: ComponentFixture<VoterBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoterBaseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VoterBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
