import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectionCandidateUpsertComponent } from './election-candidate-upsert.component';

describe('ElectionCandidateUpsertComponent', () => {
  let component: ElectionCandidateUpsertComponent;
  let fixture: ComponentFixture<ElectionCandidateUpsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElectionCandidateUpsertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElectionCandidateUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
