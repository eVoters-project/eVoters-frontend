import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PerformApiService } from '../../../../service';
import { VoterBaseApiService, VoterInfluenceApiService } from '../../../../service/api';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { VoterBaseInterface } from '../../../../interface';

@Component({
  selector: 'app-voter-influence-upsert',
  templateUrl: './voter-influence-upsert.component.html',
  styleUrl: './voter-influence-upsert.component.scss',
  providers: [
    PerformApiService,
    VoterInfluenceApiService,
    VoterBaseApiService
  ]
})
export class VoterInfluenceUpsertComponent {
  private fb = inject(FormBuilder);
  private performApi = inject(PerformApiService);
  private voterBaseApi = inject(VoterBaseApiService);
  private voterInfluenceApi = inject(VoterInfluenceApiService);
  private messageService = inject(MessageService);

  protected isLoading = true;
  protected isSaving = false;

  VOTER_INFLUENCE_STATUS = [
    'Active', 'Inactive'
  ]

  protected rf = this.fb.group({
    code: this.fb.control(''),
    description: this.fb.control('', { validators: [Validators.required] }),
    status: this.fb.control('Active'),
    voter_base: this.fb.control(''),
    remarks: this.fb.control('')
  });

  voterbases: VoterBaseInterface[] = [];

  constructor() { }

  ngOnInit(): void {
    const unsub$ = new Subject<void>();
    this.performApi.performApi([
      { action: () => this.voterBaseApi.getVoterBases(), tag: 'voterbases' }
    ], unsub$).subscribe({
      next: ((res) => {
        this.isLoading = false;
        this.voterbases = res.find(r => r.tag === "voterbases")?.result?.data.map((d: any) => { return { id: d.id, description: d.description } });
        unsub$.next();
        unsub$.complete();
      })
    });
  }

  protected voterInfluenceSave() {
    this.isSaving = true;

    const data = this.rf.getRawValue();

    this.isSaving = true;

    const unsub$ = new Subject<void>();

    this.performApi.performApi([
      { action: () => this.voterInfluenceApi.createVoterInfluence(data), tag: 'create-voterinfluence' }
    ], unsub$).subscribe({
      next: (res) => {
        this.isSaving = false;
        if (res[0].error !== null) {
          this.messageService.add({ severity: 'error', summary: '', detail: '' });
        }

        this.messageService.add({ severity: 'success', summary: 'Voter Influence Created', detail: '' })

        unsub$.next();
        unsub$.complete();

        this.rf.reset();
        // this.saveCount++;
      }
    });
  }
}
