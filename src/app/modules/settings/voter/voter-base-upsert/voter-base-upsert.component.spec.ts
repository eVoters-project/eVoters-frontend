import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoterBaseUpsertComponent } from './voter-base-upsert.component';

describe('VoterBaseUpsertComponent', () => {
  let component: VoterBaseUpsertComponent;
  let fixture: ComponentFixture<VoterBaseUpsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoterBaseUpsertComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VoterBaseUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
