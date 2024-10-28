import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JurisdictionRegionUpsertComponent } from './jurisdiction-region-upsert.component';

describe('JurisdictionRegionUpsertComponent', () => {
  let component: JurisdictionRegionUpsertComponent;
  let fixture: ComponentFixture<JurisdictionRegionUpsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JurisdictionRegionUpsertComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JurisdictionRegionUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
