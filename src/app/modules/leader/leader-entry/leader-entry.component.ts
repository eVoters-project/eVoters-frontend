import { Component, inject, OnInit } from '@angular/core';
import { Status } from '../../../data';
import { FormBuilder, Validators } from '@angular/forms';
import { PerformApiService } from '../../../service';
import { LeaderApiService, VoterApiService } from '../../../service/api';
import { VoterLeaderApiService } from '../../../service/api/voter-leader/voter-leader.api.service';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

interface LeaderTypeInterface {
  id: string;
  description: string;
}

interface VoterInterface {
  id: string;
  name: string;
}

@Component({
  selector: 'app-leader-entry',
  templateUrl: './leader-entry.component.html',
  styleUrl: './leader-entry.component.scss',
  providers: [PerformApiService, VoterLeaderApiService, VoterApiService]
})
export class LeaderEntryComponent implements OnInit {
  isLoading = true;
  isSaving = false;
  status = Status;

  performApi = inject(PerformApiService);
  leaderApi = inject(LeaderApiService);
  voterApi = inject(VoterApiService);
  voterLeaderApi = inject(VoterLeaderApiService);
  dialogRef = inject(DynamicDialogRef);
  messageService = inject(MessageService);

  protected fb = inject(FormBuilder);
  protected voters: VoterInterface[] = [];
  protected leader_types: LeaderTypeInterface[] = [];
  protected rf = this.fb.group({
    voter: this.fb.control(null, { validators: [Validators.required] }),
    voter_leader: this.fb.control(null, { validators: [Validators.required] }),
    status: this.fb.control(null, { validators: [Validators.required] })
  });

  ngOnInit(): void {
    const unsub$ = new Subject<void>();
    this.performApi.performApi([
      { action: () => this.voterApi.getVoters(), tag: 'voters' },
      { action: () => this.voterLeaderApi.getVoterLeaders(), tag: 'voter-leaders' }
    ], unsub$).subscribe({
      next: ((res) => {
        this.isLoading = false;
        this.voters = res.find(r => r.tag === "voters")?.result?.data.map((d: any) => { return { id: d.id, name: `${d.firstname} ${d.middlename} ${d.lastname}` } });
        this.leader_types = res.find(r => r.tag === "voter-leaders")?.result?.data.map((d: any) => { return { id: d.id, description: d.description } });
        unsub$.next();
        unsub$.complete();
      })
    });
  }

  leaderSave() {
    if (this.rf.invalid) {
      this.rf.markAllAsTouched();
      return;
    };

    this.isSaving = true;

    const unsub$ = new Subject<void>();

    this.performApi.performApi([
      { action: () => this.leaderApi.create(this.rf.getRawValue()), tag: 'create-leader' }
    ], unsub$).subscribe({
      next: (res) => {
        if (res[0].error !== null) {
          this.messageService.add({ severity: 'error', summary: '', detail: '' });
          this.isSaving = false;
        }

        this.messageService.add({ severity: 'success', summary: 'Leader Created', detail: '' })

        unsub$.next();
        unsub$.complete();

        setTimeout(() => {
          this.dialogRef.close({ reload: true });
        }, 500);
      }
    });

  }
}
