import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JurisdictionRegionComponent } from './jurisdiction-region.component';

describe('JurisdictionRegionComponent', () => {
  let component: JurisdictionRegionComponent;
  let fixture: ComponentFixture<JurisdictionRegionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JurisdictionRegionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JurisdictionRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
