import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoterTypeComponent } from './voter-type.component';

describe('VoterTypeComponent', () => {
  let component: VoterTypeComponent;
  let fixture: ComponentFixture<VoterTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoterTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VoterTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
