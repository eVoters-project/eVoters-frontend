import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JurisdictionLguComponent } from './jurisdiction-lgu.component';

describe('JurisdictionLguComponent', () => {
  let component: JurisdictionLguComponent;
  let fixture: ComponentFixture<JurisdictionLguComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JurisdictionLguComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JurisdictionLguComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
