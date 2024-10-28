import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JurisdictionLguUpsertComponent } from './jurisdiction-lgu-upsert.component';

describe('JurisdictionLguUpsertComponent', () => {
  let component: JurisdictionLguUpsertComponent;
  let fixture: ComponentFixture<JurisdictionLguUpsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JurisdictionLguUpsertComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JurisdictionLguUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
