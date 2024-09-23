import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrawVoteSummaryComponent } from './straw-vote-summary.component';

describe('StrawVoteSummaryComponent', () => {
  let component: StrawVoteSummaryComponent;
  let fixture: ComponentFixture<StrawVoteSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StrawVoteSummaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StrawVoteSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
