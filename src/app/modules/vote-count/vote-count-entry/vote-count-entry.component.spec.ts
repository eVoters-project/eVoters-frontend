import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteCountEntryComponent } from './vote-count-entry.component';

describe('VoteCountEntryComponent', () => {
  let component: VoteCountEntryComponent;
  let fixture: ComponentFixture<VoteCountEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoteCountEntryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VoteCountEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
