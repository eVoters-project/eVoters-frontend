import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrawVoteEntryComponent } from './straw-vote-entry.component';

describe('StrawVoteEntryComponent', () => {
  let component: StrawVoteEntryComponent;
  let fixture: ComponentFixture<StrawVoteEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StrawVoteEntryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StrawVoteEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
