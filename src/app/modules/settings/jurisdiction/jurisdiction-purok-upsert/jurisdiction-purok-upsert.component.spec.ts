import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JurisdictionPurokUpsertComponent } from './jurisdiction-purok-upsert.component';

describe('JurisdictionPurokUpsertComponent', () => {
  let component: JurisdictionPurokUpsertComponent;
  let fixture: ComponentFixture<JurisdictionPurokUpsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JurisdictionPurokUpsertComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JurisdictionPurokUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
