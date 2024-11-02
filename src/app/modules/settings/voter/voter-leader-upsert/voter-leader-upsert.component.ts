import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PerformApiService } from '../../../../service';
import { MessageService } from 'primeng/api';
import { VoterLeaderApiService } from '../../../../service/api/voter-leader/voter-leader.api.service';
import { VoterLeaderSubApiService } from '../../../../service/api';
import { VoterLeaderInterface } from '../../../../interface';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-voter-leader-upsert',
  templateUrl: './voter-leader-upsert.component.html',
  styleUrl: './voter-leader-upsert.component.scss',
  providers: [
    PerformApiService,
    VoterLeaderApiService,
    VoterLeaderSubApiService
  ]
})
export class VoterLeaderUpsertComponent {
  private fb = inject(FormBuilder);
  private performApi = inject(PerformApiService);
  private voterLeaderApi = inject(VoterLeaderApiService);
  private voterLeaderSubApi = inject(VoterLeaderSubApiService);
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
    voter_leader_sub: this.fb.control(''),
    remarks: this.fb.control('')
  });

  voterleaders: VoterLeaderInterface[] = [];

  constructor() { }

  ngOnInit(): void {
    const unsub$ = new Subject<void>();
    this.performApi.performApi([
      { action: () => this.voterLeaderSubApi.getVoterLeadersSub(), tag: 'voterleaders' }
    ], unsub$).subscribe({
      next: ((res) => {
        this.isLoading = false;
        this.voterleaders = res.find(r => r.tag === "voterleaders")?.result?.data.map((d: any) => { return { id: d.id, description: d.description } });
        unsub$.next();
        unsub$.complete();
      })
    });
  }

  protected voterLeaderSave() {
    this.isSaving = true;

    const data = this.rf.getRawValue();

    this.isSaving = true;

    const unsub$ = new Subject<void>();

    this.performApi.performApi([
      { action: () => this.voterLeaderApi.createVoterLeader(data), tag: 'create-voterleader' }
    ], unsub$).subscribe({
      next: (res) => {
        this.isSaving = false;
        if (res[0].error !== null) {
          this.messageService.add({ severity: 'error', summary: '', detail: '' });
        }

        this.messageService.add({ severity: 'success', summary: 'Voter Leader Created', detail: '' })

        unsub$.next();
        unsub$.complete();

        this.rf.reset();
        // this.saveCount++;
      }
    });
  }
}
