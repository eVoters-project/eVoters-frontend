import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PerformApiService } from '../../../../service';
import { MessageService } from 'primeng/api';
import { VoterInfluenceApiService, VoterInfluenceSubApiService } from '../../../../service/api';
import { VoterInfluenceInterface } from '../../../../interface';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-voter-influence-sub-upsert',
  templateUrl: './voter-influence-sub-upsert.component.html',
  styleUrl: './voter-influence-sub-upsert.component.scss',
  providers: [
    PerformApiService,
    VoterInfluenceApiService,
    VoterInfluenceSubApiService
  ]
})
export class VoterInfluenceSubUpsertComponent {
  private fb = inject(FormBuilder);
  private performApi = inject(PerformApiService);
  private voterInfluenceApi = inject(VoterInfluenceApiService);
  private voterInfluenceSubApi = inject(VoterInfluenceSubApiService);
  private messageService = inject(MessageService);

  protected isLoading = true;
  protected isSaving = false;

  VOTER_INFLUENCE_SUB_STATUS = [
    'Active', 'Inactive'
  ]

  protected rf = this.fb.group({
    code: this.fb.control(''),
    description: this.fb.control('', { validators: [Validators.required] }),
    status: this.fb.control('Active'),
    voter_influence: this.fb.control(''),
    remarks: this.fb.control('')
  });

  voterinfluences: VoterInfluenceInterface[] = [];

  constructor() { }

  ngOnInit(): void {
    const unsub$ = new Subject<void>();
    this.performApi.performApi([
      { action: () => this.voterInfluenceApi.getVoterInfluences(), tag: 'voterinfluences' }
    ], unsub$).subscribe({
      next: ((res) => {
        this.isLoading = false;
        this.voterinfluences = res.find(r => r.tag === "voterinfluences")?.result?.data.map((d: any) => { return { id: d.id, description: d.description } });
        unsub$.next();
        unsub$.complete();
      })
    });
  }

  protected voterInfluenceSubSave() {
    this.isSaving = true;

    const data = this.rf.getRawValue();

    this.isSaving = true;

    const unsub$ = new Subject<void>();

    this.performApi.performApi([
      { action: () => this.voterInfluenceSubApi.createVoterInfluenceSub(data), tag: 'create-voterinfluence-sub' }
    ], unsub$).subscribe({
      next: (res) => {
        this.isSaving = false;
        if (res[0].error !== null) {
          this.messageService.add({ severity: 'error', summary: '', detail: '' });
        }

        this.messageService.add({ severity: 'success', summary: 'Voter Influence-Sub Created', detail: '' })

        unsub$.next();
        unsub$.complete();

        this.rf.reset();
        // this.saveCount++;
      }
    });
  }
}
