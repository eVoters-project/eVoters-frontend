import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PerformApiService } from '../../../../service';
import { MessageService } from 'primeng/api';
import { VoterLeaderSubApiService } from '../../../../service/api';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-voter-leader-sub-upsert',
  templateUrl: './voter-leader-sub-upsert.component.html',
  styleUrl: './voter-leader-sub-upsert.component.scss',
  providers: [
    PerformApiService,
    VoterLeaderSubApiService
  ]
})
export class VoterLeaderSubUpsertComponent {
  private fb = inject(FormBuilder);
  private performApi = inject(PerformApiService);
  private voterLeaderSubApi = inject(VoterLeaderSubApiService);
  private messageService = inject(MessageService);

  protected VOTER_LEADER_SUB_STATUS = [
    'Active',
    'Inactive'
  ]
  protected isLoading = true;
  protected isSaving = false;

  protected rf = this.fb.group({
    code: this.fb.control(''),
    description: this.fb.control('', { validators: [Validators.required] }),
    status: this.fb.control('Active')
  });

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  protected voterLeaderSubSave() {
    this.isSaving = true;

    const data = this.rf.getRawValue();

    this.isSaving = true;

    const unsub$ = new Subject<void>();

    this.performApi.performApi([
      { action: () => this.voterLeaderSubApi.createVoterLeaderSub(data), tag: 'create-voterleadersub' }
    ], unsub$).subscribe({
      next: (res) => {
        this.isSaving = false;
        if (res[0].error !== null) {
          this.messageService.add({ severity: 'error', summary: '', detail: '' });
        }

        this.messageService.add({ severity: 'success', summary: 'Voter Leader Sub Created', detail: '' })

        unsub$.next();
        unsub$.complete();

        this.rf.reset();
        // this.saveCount++;
      }
    });
  }
}
