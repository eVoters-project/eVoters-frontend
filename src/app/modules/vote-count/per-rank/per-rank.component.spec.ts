import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerRankComponent } from './per-rank.component';

describe('PerRankComponent', () => {
  let component: PerRankComponent;
  let fixture: ComponentFixture<PerRankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerRankComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PerRankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
