import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectionPrecinctUpsertComponent } from './election-precinct-upsert.component';

describe('ElectionPrecinctUpsertComponent', () => {
  let component: ElectionPrecinctUpsertComponent;
  let fixture: ComponentFixture<ElectionPrecinctUpsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElectionPrecinctUpsertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElectionPrecinctUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
