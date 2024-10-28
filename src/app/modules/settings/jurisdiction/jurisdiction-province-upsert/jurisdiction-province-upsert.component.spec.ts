import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JurisdictionProvinceUpsertComponent } from './jurisdiction-province-upsert.component';

describe('JurisdictionProvinceUpsertComponent', () => {
  let component: JurisdictionProvinceUpsertComponent;
  let fixture: ComponentFixture<JurisdictionProvinceUpsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JurisdictionProvinceUpsertComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JurisdictionProvinceUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
