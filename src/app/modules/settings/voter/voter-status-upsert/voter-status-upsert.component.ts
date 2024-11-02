import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PerformApiService } from '../../../../service';
import { MessageService } from 'primeng/api';
import { VoterStatusApiService } from '../../../../service/api';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-voter-status-upsert',
  templateUrl: './voter-status-upsert.component.html',
  styleUrl: './voter-status-upsert.component.scss',
  providers: [
    PerformApiService,
    VoterStatusApiService
  ]
})
export class VoterStatusUpsertComponent {
  private fb = inject(FormBuilder);
  private performApi = inject(PerformApiService);
  private voterStatusApi = inject(VoterStatusApiService);
  private messageService = inject(MessageService);

  protected VOTER_STATUS = [
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

  protected voterStatusSave() {
    this.isSaving = true;

    const data = this.rf.getRawValue();

    this.isSaving = true;

    const unsub$ = new Subject<void>();

    this.performApi.performApi([
      { action: () => this.voterStatusApi.createVoterStatus(data), tag: 'create-voterstatus' }
    ], unsub$).subscribe({
      next: (res) => {
        this.isSaving = false;
        if (res[0].error !== null) {
          this.messageService.add({ severity: 'error', summary: '', detail: '' });
        }

        this.messageService.add({ severity: 'success', summary: 'Voter Status Created', detail: '' })

        unsub$.next();
        unsub$.complete();

        this.rf.reset();
        // this.saveCount++;
      }
    });
  }
}
