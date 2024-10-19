import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JurisdictionPurokComponent } from './jurisdiction-purok.component';

describe('JurisdictionPurokComponent', () => {
  let component: JurisdictionPurokComponent;
  let fixture: ComponentFixture<JurisdictionPurokComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JurisdictionPurokComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JurisdictionPurokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
