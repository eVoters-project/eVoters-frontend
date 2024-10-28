import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoterInfluenceUpsertComponent } from './voter-influence-upsert.component';

describe('VoterInfluenceUpsertComponent', () => {
  let component: VoterInfluenceUpsertComponent;
  let fixture: ComponentFixture<VoterInfluenceUpsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoterInfluenceUpsertComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VoterInfluenceUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
