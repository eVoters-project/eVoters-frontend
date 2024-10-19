import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JurisdictionProvinceComponent } from './jurisdiction-province.component';

describe('JurisdictionProvinceComponent', () => {
  let component: JurisdictionProvinceComponent;
  let fixture: ComponentFixture<JurisdictionProvinceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JurisdictionProvinceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JurisdictionProvinceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
