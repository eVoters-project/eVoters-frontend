import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryPartyCandidateComponent } from './entry-party-candidate.component';

describe('EntryPartyCandidateComponent', () => {
  let component: EntryPartyCandidateComponent;
  let fixture: ComponentFixture<EntryPartyCandidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntryPartyCandidateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntryPartyCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
