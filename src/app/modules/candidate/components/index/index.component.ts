import { Component, inject, Type } from '@angular/core';
import { CandidateService } from '../../service/candidate.service';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService, PrimeIcons } from 'primeng/api';
import { catchError, debounceTime, delay, of, Subject, Subscription, take, tap } from 'rxjs';
import { CandidateInterface, RequestElectionCandidateInterface, ResponseElectionScheduleInterface } from '../../../../interface';
import { CandidateColumns } from '../../data/candidate.column';
import { CandidateApiService, ElectionScheduleApiService } from '../../../../service/api';
import { FormBuilder } from '@angular/forms';
import { PerformApiService } from '../../../../service';
import { format } from 'date-fns';
import { EntryPartyCandidateComponent } from '../entry-party-candidate/entry-party-candidate.component';
import { EntryIndependentCandidateComponent } from '../entry-independent-candidate/entry-independent-candidate.component';

type CandidateType = 'Party' | 'Independent';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss',
  providers: [
    CandidateService,
    CandidateApiService,
    ElectionScheduleApiService,
    PerformApiService
  ]
})
export class IndexComponent {
  protected candidateService = inject(CandidateService);
  protected scheduleApiService = inject(ElectionScheduleApiService);
  private performApi = inject(PerformApiService);
  private dialogService = inject(DialogService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  protected title = 'Leader'
  protected isLoading = false;

  private arr_subs = new Array<Subscription>();
  protected leaders!: CandidateInterface[];
  protected leader!: CandidateInterface;

  protected schedules: ResponseElectionScheduleInterface[] | null = null;

  protected cols = CandidateColumns;

  protected gridContextMenus = [
    {
      label: 'Delete',
      icon: PrimeIcons.TRASH,
      command: () => this.candidateDelete()
    }
  ]

  protected fb = inject(FormBuilder);
  protected rf = this.fb.group({
    schedule: this.fb.control(''),
    type: this.fb.control('schedule')
  });

  constructor() {
    this.preloadData();
    this.candidateService.onInit();
  }

  ngOnInit(): void {
    this.arr_subs.push(
      this.leaderDataSubscription(),
      this.scheduleChange()
    );

  }

  ngOnDestroy(): void {
    this.arr_subs.forEach(sub => {
      sub.unsubscribe();
    });
  }

  ngAfterViewInit(): void {
    this.candidateService.requestData(null);
  }

  private leaderDataSubscription(): Subscription {
    return this.candidateService.candidateData$.
      pipe(
        tap(() => {
          this.leaders = [];
          this.isLoading = true
        }),
        delay(500),
        debounceTime(1000),
        catchError((err) => {
          console.log(err);
          return of([])
        })
      )
      .subscribe((data) => {
        this.leaders = data; console.log('candidate', data);
        this.isLoading = false;
      })
  }

  private preloadData() {
    const unsub$ = new Subject<void>();
    this.performApi.performApi([
      { action: () => this.scheduleApiService.getElectionSchedules(), tag: 'schedules' }
    ], unsub$).subscribe({
      next: ((res) => {
        // this.isLoading = false;
        this.schedules = res.find(r => r.tag === "schedules")
          ?.result?.data.map((d: any) => { return { id: d.id, name: `${format(d.date, 'yyyy')} ${d.type}` } });
        unsub$.next();
        unsub$.complete();
      })
    });
  }

  private scheduleChange(): Subscription {
    return this.rf.valueChanges.subscribe(() => {
      this.candidateService.requestData(this.rf.getRawValue().schedule as RequestElectionCandidateInterface);
    });
  }

  protected candidateEntry(candidateType: CandidateType) {
    const ref = this.dialogService
      .open(
        this.entryComponentType(candidateType),
        this.entryComponentConfig(candidateType)
      );

    ref.onClose.subscribe((res: any) => {
      if (Object.keys(res).includes('reload')) {
        this.candidateService.requestData(null);
      }
    });
  }

  private entryComponentType(candidateType: CandidateType): Type<any> {
    switch (candidateType) {
      case 'Party':
        return EntryPartyCandidateComponent;
      default:
        return EntryIndependentCandidateComponent
    }
  }

  private entryComponentConfig(candidateType: CandidateType): DynamicDialogConfig {
    switch (candidateType) {
      case 'Party':
        return <DynamicDialogConfig>{
          header: 'New Party Candidate',
          footer: ' ',
          position: 'right',
          modal: true,
          width: '40rem',
          height: '45rem'
        };
      default:
        return <DynamicDialogConfig>{
          header: 'New Independent Candidate',
          footer: ' ',
          position: 'right',
          modal: true,
          width: '40rem',
          height: '45rem'
        }
    }
  }

  protected candidateDelete() {
    this.confirmationService.confirm({
      target: event?.target as EventTarget,
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: "none",
      rejectIcon: "none",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        const { id } = this.leader;
        this.candidateService.deleteData(id)
          .pipe(take(1))
          .subscribe({
            next: () => {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Candidate Deleted!', life: 2000 });
              this.candidateService.requestData(this.rf.getRawValue() as RequestElectionCandidateInterface);
            }
          })
      },
      reject: () => {
        // this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
      }
    });
  }
}
