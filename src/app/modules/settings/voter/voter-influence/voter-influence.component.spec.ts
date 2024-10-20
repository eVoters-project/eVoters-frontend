import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoterInfluenceComponent } from './voter-influence.component';

describe('VoterInfluenceComponent', () => {
  let component: VoterInfluenceComponent;
  let fixture: ComponentFixture<VoterInfluenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoterInfluenceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VoterInfluenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
