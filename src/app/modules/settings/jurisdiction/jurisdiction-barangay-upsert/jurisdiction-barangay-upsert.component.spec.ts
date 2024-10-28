import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JurisdictionBarangayUpsertComponent } from './jurisdiction-barangay-upsert.component';

describe('JurisdictionBarangayUpsertComponent', () => {
  let component: JurisdictionBarangayUpsertComponent;
  let fixture: ComponentFixture<JurisdictionBarangayUpsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JurisdictionBarangayUpsertComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JurisdictionBarangayUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
