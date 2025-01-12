import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PerformApiService } from '../../../../service';
import { MessageService } from 'primeng/api';
import { ElectionScheduleApiService } from '../../../../service/api';
import { Subject } from 'rxjs';
import { format } from 'date-fns';

@Component({
  selector: 'app-election-schedule-upsert',
  templateUrl: './election-schedule-upsert.component.html',
  styleUrl: './election-schedule-upsert.component.scss',
  providers: [
    PerformApiService,
    ElectionScheduleApiService
  ]
})
export class ElectionScheduleUpsertComponent {
  private fb = inject(FormBuilder);
  private performApi = inject(PerformApiService);
  private electionScheduleApi = inject(ElectionScheduleApiService);
  private messageService = inject(MessageService);

  protected ELECTION_SCHEDULE_STATUS = [
    'Active',
    'Inactive'
  ]

  protected ELECTION_SCHEDULE_TYPES = [
    'Presidential Election',
    'Midterm Election'
  ]
  protected isLoading = true;
  protected isSaving = false;

  protected rf = this.fb.group({
    sequence: this.fb.control(0),
    date: this.fb.control(new Date()),
    type: this.fb.control('Presidential Election', { validators: [Validators.required] }),
    description: this.fb.control(''),
    status: this.fb.control('Active'),
    remarks: this.fb.control('')
  });

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  protected electionScheduleSave() {
    this.isSaving = true;

    const { sequence, description, ...data } = this.rf.getRawValue();

    this.isSaving = true;

    const unsub$ = new Subject<void>();

    this.performApi.performApi([
      { action: () => this.electionScheduleApi.createElectionSchedule(data), tag: 'create-electionschedule' }
    ], unsub$).subscribe({
      next: (res) => {
        this.isSaving = false;
        if (res[0].error !== null) {
          this.messageService.add({ severity: 'error', summary: '', detail: '' });
        }

        this.messageService.add({ severity: 'success', summary: 'Election Schedule Created', detail: '' })

        unsub$.next();
        unsub$.complete();

        this.rf.reset();
        // this.saveCount++;
      }
    });
  }
}
