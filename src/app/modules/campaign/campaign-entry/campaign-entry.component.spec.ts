import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignEntryComponent } from './campaign-entry.component';

describe('CampaignEntryComponent', () => {
  let component: CampaignEntryComponent;
  let fixture: ComponentFixture<CampaignEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampaignEntryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CampaignEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
