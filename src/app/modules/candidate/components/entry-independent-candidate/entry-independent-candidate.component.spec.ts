import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryIndependentCandidateComponent } from './entry-independent-candidate.component';

describe('EntryIndependentCandidateComponent', () => {
  let component: EntryIndependentCandidateComponent;
  let fixture: ComponentFixture<EntryIndependentCandidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntryIndependentCandidateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntryIndependentCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
