import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectionCandidateComponent } from './election-candidate.component';

describe('ElectionCandidateComponent', () => {
  let component: ElectionCandidateComponent;
  let fixture: ComponentFixture<ElectionCandidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElectionCandidateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElectionCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
