import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JurisdictionBarangayComponent } from './jurisdiction-barangay.component';

describe('JurisdictionBarangayComponent', () => {
  let component: JurisdictionBarangayComponent;
  let fixture: ComponentFixture<JurisdictionBarangayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JurisdictionBarangayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JurisdictionBarangayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
