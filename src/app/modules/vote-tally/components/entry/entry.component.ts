import { AfterViewInit, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Status } from '../../../../data';
import { PerformApiService } from '../../../../service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { FormBuilder, Validators } from '@angular/forms';
import { format } from 'date-fns';
import { BarangayApiService, ElectionCandidateApiService, ElectionPositionApiService, ElectionPrecinctApiService, ElectionScheduleApiService } from '../../../../service/api';
import { Subject, Subscription } from 'rxjs';
import { BarangayInterface, ElectionCandidateInterface, ElectionPositionInterface, ElectionPrecinctInterface, ElectionScheduleInterface } from '../../../../interface';

interface GenericObject {
  id?: string;
}

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrl: './entry.component.scss',
  providers: [
    PerformApiService,
    BarangayApiService,
    ElectionPrecinctApiService,
    ElectionScheduleApiService,
    ElectionPositionApiService,
    ElectionCandidateApiService
  ]
})
export class EntryComponent implements OnInit, OnDestroy, AfterViewInit {
  isLoading = true;
  isSaving = false;
  status = Status;

  performApiService = inject(PerformApiService);
  barangayApiService = inject(BarangayApiService);
  electionPrecinctApiService = inject(ElectionPrecinctApiService);
  electionScheduleApiService = inject(ElectionScheduleApiService);
  electPositionApiService = inject(ElectionPositionApiService);
  electionCandidateApiService = inject(ElectionCandidateApiService);
  dialogRef = inject(DynamicDialogRef);
  messageService = inject(MessageService);

  protected fb = inject(FormBuilder);
  // protected voters: VoterInterface[] = [];
  // protected leader_types: LeaderTypeInterface[] = [];
  protected rf = this.fb.group({
    date: this.fb.control(format(new Date(), 'MM/dd/yyyy'), { validators: [Validators.required] }),
    barangay: this.fb.control(null, { validators: [Validators.required] }),
    precinct: this.fb.control(null, { validators: [Validators.required] }),
    schedule: this.fb.control(null, { validators: [Validators.required] }),
    position: this.fb.control(null, { validators: [Validators.required] }),
    candidate: this.fb.control(null, { validators: [Validators.required] }),
    count: this.fb.control(0, { validators: [Validators.required, Validators.min(0)] })
  });


  protected barangays: BarangayInterface[] | null = null;
  protected precincts: ElectionPrecinctInterface[] | null = [];
  protected schedules: ElectionScheduleInterface[] | null = null;
  protected positions: ElectionPositionInterface[] | null = [];
  protected candidates: ElectionCandidateInterface[] | null = [];

  private arr_subs = new Array<Subscription>();

  constructor() {
    this.preloadData();
  }

  ngOnInit(): void {
    this.arr_subs.push(
      this.barangayChanged(),
      this.scheduleChanged(),
      this.positionChanged()
    );
  }

  ngOnDestroy(): void {
    this.arr_subs.forEach(sub => {
      sub.unsubscribe();
    });
  }

  ngAfterViewInit(): void {
    this.isLoading = false;
  }

  protected voteTallySave() {

  }

  private preloadData() {
    const unsub$ = new Subject<void>();
    this.performApiService.performApi([
      { action: () => this.barangayApiService.getBarangays(), tag: 'barangays' },
      { action: () => this.electionScheduleApiService.getElectionSchedules(), tag: 'schedules' }
    ], unsub$).subscribe({
      next: ((res) => {
        this.isLoading = false;
        this.barangays = res.find(r => r.tag === "barangays")
          ?.result?.data.map((d: any) => { return { id: d.id, name: d.name } });
        this.schedules = res.find(r => r.tag === "schedules")
          ?.result?.data.map((d: any) => { return { id: d.id, name: `${format(d.date, 'yyyy')} ${d.type}` } });
        unsub$.next();
        unsub$.complete();
      })
    });
  }

  private barangayChanged(): Subscription {
    return this.rf.controls['barangay']
      .valueChanges
      .subscribe((param: GenericObject | null) => {

        if (!param) return;

        this.precincts = null;

        const unsub$ = new Subject<void>();
        this.performApiService.performApi([
          { action: () => this.electionPrecinctApiService.getElectionPrecinctByBarangay(param.id!), tag: 'precincts' }
        ], unsub$).subscribe({
          next: ((res) => {
            // this.isLoading = false;
            this.precincts = res.find(r => r.tag === "precincts")
              ?.result?.data.map((d: any) => { return { id: d.id, name: `${d.cluster} ${d.sub_cluster} ${d.polling_center}` } });
            unsub$.next();
            unsub$.complete();
          })
        });

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

      });
  }

  private positionChanged(): Subscription {
    return this.rf.controls['position']
      .valueChanges
      .subscribe((param: GenericObject | null) => {

        if (!param) return;

        this.candidates = null;

        const unsub$ = new Subject<void>();
        this.performApiService.performApi([
          { action: () => this.electionCandidateApiService.getElectionCandidateByPosition(param.id!), tag: 'candidates' }
        ], unsub$).subscribe({
          next: ((res) => {
            console.log(res);
            // this.isLoading = false;
            this.candidates = res.find(r => r.tag === "candidates")
              ?.result?.data.map((d: any) => { return { id: d.id, name: `${d.name} -- (${d.type})` } });
            unsub$.next();
            unsub$.complete();
          })
        });

      });
  }
}
