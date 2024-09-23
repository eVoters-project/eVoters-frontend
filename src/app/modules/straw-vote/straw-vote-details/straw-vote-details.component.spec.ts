import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrawVoteDetailsComponent } from './straw-vote-details.component';

describe('StrawVoteDetailsComponent', () => {
  let component: StrawVoteDetailsComponent;
  let fixture: ComponentFixture<StrawVoteDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StrawVoteDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StrawVoteDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
