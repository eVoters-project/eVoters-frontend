import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoterInfluenceSubComponent } from './voter-influence-sub.component';

describe('VoterInfluenceSubComponent', () => {
  let component: VoterInfluenceSubComponent;
  let fixture: ComponentFixture<VoterInfluenceSubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoterInfluenceSubComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VoterInfluenceSubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
