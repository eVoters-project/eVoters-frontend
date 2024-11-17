import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectionPrecinctComponent } from './election-precinct.component';

describe('ElectionPrecinctComponent', () => {
  let component: ElectionPrecinctComponent;
  let fixture: ComponentFixture<ElectionPrecinctComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElectionPrecinctComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElectionPrecinctComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
