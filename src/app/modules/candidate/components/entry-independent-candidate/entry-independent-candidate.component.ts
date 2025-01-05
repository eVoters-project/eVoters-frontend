import { AfterViewInit, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CandidateApiService, ElectionPositionApiService, ElectionScheduleApiService, VoterApiService } from '../../../../service/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { FormBuilder, Validators } from '@angular/forms';
import { ElectionPositionInterface, ElectionScheduleInterface, VoterInterface } from '../../../../interface';
import { PerformApiService } from '../../../../service';
import { Status } from '../../../../data';
import { Subject, Subscription } from 'rxjs';
import { CandidateService } from '../../service/candidate.service';
import { format } from 'date-fns';

interface GenericObject {
  id?: string;
}

@Component({
  selector: 'app-entry-independent-candidate',
  templateUrl: './entry-independent-candidate.component.html',
  styleUrl: './entry-independent-candidate.component.scss',
  providers: [
    PerformApiService,
    ElectionScheduleApiService,
    ElectionPositionApiService,
    VoterApiService,
    CandidateApiService
  ]
})
export class EntryIndependentCandidateComponent implements OnInit, OnDestroy, AfterViewInit {
  isLoading = true;
  isSaving = false;
  status = Status;

  candidateApiService = inject(CandidateApiService);
  performApiService = inject(PerformApiService);
  electionScheduleApiService = inject(ElectionScheduleApiService);
  electPositionApiService = inject(ElectionPositionApiService);
  voterApiService = inject(VoterApiService);
  dialogRef = inject(DynamicDialogRef);
  messageService = inject(MessageService);

  protected fb = inject(FormBuilder);
  protected rf = this.fb.group({
    sequence: this.fb.control(1),
    date: this.fb.control(new Date(), { validators: [Validators.required] }),
    schedule: this.fb.control(null, { validators: [Validators.required] }),
    position: this.fb.control(null, { validators: [Validators.required] }),
    voter: this.fb.control(null, { validators: [Validators.required] }),
    remarks: this.fb.control(''),
    status: this.fb.control('Active')
  });

  protected voters: VoterInterface[] | null = null;
  protected schedules: ElectionScheduleInterface[] | null = null;
  protected positions: ElectionPositionInterface[] | null = [];

  private arr_subs = new Array<Subscription>();

  constructor() {
    this.preloadData();
  }

  ngOnInit(): void {
    this.arr_subs.push(
      this.scheduleChanged()
    );
  }

  ngOnDestroy(): void {
    this.arr_subs.forEach(sub => {
      sub.unsubscribe();
    });
  }

  ngAfterViewInit(): void {

  }

  private preloadData() {
    const unsub$ = new Subject<void>();
    this.performApiService.performApi([
      { action: () => this.electionScheduleApiService.getElectionSchedules(), tag: 'schedules' },
      { action: () => this.voterApiService.getVoters(), tag: 'voters' }
    ], unsub$).subscribe({
      next: ((res) => {
        this.isLoading = false;
        this.schedules = res.find(r => r.tag === "schedules")
          ?.result?.data.map((d: any) => { return { id: d.id, name: `${format(d.date, 'yyyy')} ${d.type}` } });
        this.voters = res.find(r => r.tag === "voters")
          ?.result?.data.map((d: any) => { return { id: d.id, name: `${d.firstname_middlename} ${d.lastname}` } });
        unsub$.next();
        unsub$.complete();
      })
    });
  }

  private scheduleChanged(): Subscription {
    return this.rf.controls['schedule']
      .valueChanges
      .subscribe((param: GenericObject | null) => {

        if (!param) return;

        this.positions = null;

        const unsub$ = new Subject<void>();
        this.performApiService.performApi([
          { action: () => this.electPositionApiService.getElectionPositionBySchedule(param.id!), tag: 'positions' }
        ], unsub$).subscribe({
          next: ((res) => {
            // this.isLoading = false;
            this.positions = res.find(r => r.tag === "positions")
              ?.result?.data.map((d: any) => { return { id: d.id, name: d.name } });
            unsub$.next();
            unsub$.complete();
          })
        });

      })
  }

  protected candidateSave() {
    if (this.rf.invalid) {
      this.rf.markAllAsTouched();
      return;
    };

    const { schedule, date, ...data } = this.rf.getRawValue();

    this.isSaving = true;

    const unsub$ = new Subject<void>();

    this.performApiService.performApi([
      { action: () => this.candidateApiService.create(data), tag: 'create-candidate' }
    ], unsub$).subscribe({
      next: (res) => {
        if (res[0].error !== null) {
          this.messageService.add({ severity: 'error', summary: '', detail: '' });
          this.isSaving = false;
        }

        this.messageService.add({ severity: 'success', summary: 'Independent Candidate Created', detail: '' })

        unsub$.next();
        unsub$.complete();

        setTimeout(() => {
          this.dialogRef.close({ reload: true });
        }, 500);
      }
    });
  }
}
