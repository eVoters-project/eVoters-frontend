import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PerformApiService } from '../../../../service';
import { ElectionPositionApiService, ElectionScheduleApiService, PositionApiService } from '../../../../service/api';
import { MessageService } from 'primeng/api';
import { Subject, Subscription } from 'rxjs';
import { ElectionScheduleInterface, PositionInterface } from '../../../../interface';
import { format } from 'date-fns';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

interface GenericObject {
  id?: string;
}

@Component({
  selector: 'app-election-position-upsert',
  templateUrl: './election-position-upsert.component.html',
  styleUrl: './election-position-upsert.component.scss',
  providers: [
    PerformApiService,
    ElectionPositionApiService,
    ElectionScheduleApiService,
    PositionApiService
  ]
})
export class ElectionPositionUpsertComponent {
  private fb = inject(FormBuilder);
  private performApi = inject(PerformApiService);
  private electionScheduleApiService = inject(ElectionScheduleApiService);
  private positionApiService = inject(PositionApiService);
  private electionPositionApiService = inject(ElectionPositionApiService);
  private messageService = inject(MessageService);
  private dynamicDialogRef = inject(DynamicDialogRef);

  protected electionSchedules: ElectionScheduleInterface[] | null = null;
  protected positions: PositionInterface[] | null = null;

  protected isLoading = true;
  protected isSaving = false;

  protected rf = this.fb.group({
    sequence: this.fb.control(0),
    election_schedule: this.fb.control('', { validators: [Validators.required] }),
    position: this.fb.control('', { validators: [Validators.required] }),
    description: this.fb.control(''),
    seat: this.fb.control(1),
    remarks: this.fb.control('')
  });

  constructor() {
    this.preloadData();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  protected electionPositionSave() {
    this.isSaving = true;

    const { description, ...data } = this.rf.getRawValue();

    this.isSaving = true;

    const unsub$ = new Subject<void>();

    this.performApi.performApi([
      { action: () => this.electionPositionApiService.createElectionPosition(data), tag: 'create-electionposition' }
    ], unsub$).subscribe({
      next: (res) => {
        this.isSaving = false;
        if (res[0].error !== null) {
          this.messageService.add({ severity: 'error', summary: '', detail: '' });
        }

        this.messageService.add({ severity: 'success', summary: 'Election Position Created', detail: '' })

        unsub$.next();
        unsub$.complete();

        setTimeout(() => {
          this.dynamicDialogRef.close();
        }, 300);
      }
    });
  }

  private preloadData() {
      const unsub$ = new Subject<void>();
      this.performApi.performApi([
        { action: () => this.positionApiService.getPositions(), tag: 'positions' },
        { action: () => this.electionScheduleApiService.getElectionSchedules(), tag: 'election-schedules' }
      ], unsub$).subscribe({
        next: ((res) => {
          this.isLoading = false;
          this.positions = res.find(r => r.tag === "positions")
            ?.result?.data.map((d: any) => { return { id: d.id, name: d.name } });
          this.electionSchedules = res.find(r => r.tag === "election-schedules")
            ?.result?.data.map((d: any) => { return { id: d.id, name: `${format(d.date, 'yyyy')} ${d.type}` } });
          unsub$.next();
          unsub$.complete();
        })
      });
  }
}
