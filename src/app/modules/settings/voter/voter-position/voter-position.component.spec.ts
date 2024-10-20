import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoterPositionComponent } from './voter-position.component';

describe('VoterPositionComponent', () => {
  let component: VoterPositionComponent;
  let fixture: ComponentFixture<VoterPositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoterPositionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VoterPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
