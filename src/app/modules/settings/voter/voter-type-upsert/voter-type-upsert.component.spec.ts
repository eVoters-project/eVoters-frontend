import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoterTypeUpsertComponent } from './voter-type-upsert.component';

describe('VoterTypeUpsertComponent', () => {
  let component: VoterTypeUpsertComponent;
  let fixture: ComponentFixture<VoterTypeUpsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoterTypeUpsertComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VoterTypeUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
