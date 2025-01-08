import { AfterViewInit, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { VoteTallyService } from '../../vote-tally.service';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { debounceTime, delay, Subject, Subscription, tap } from 'rxjs';
import { ElectionScheduleInterface, RequestVoteTallyInterface, VoteTallyInterface } from '../../../../interface';
import { VoteTallyColumn } from '../../grid-columns/vote-tally.column';
import { ElectionScheduleApiService, VoteTallyApiService } from '../../../../service/api';
import { EntryComponent } from '../../components/entry/entry.component';
import { FormBuilder } from '@angular/forms';
import { PerformApiService } from '../../../../service';
import { format } from 'date-fns';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss',
  providers: [
    VoteTallyApiService,
    VoteTallyService,
    PerformApiService,
    ElectionScheduleApiService
  ]
})
export class IndexComponent implements OnInit, OnDestroy, AfterViewInit {

  protected voteTallyService = inject(VoteTallyService);
  private performApi = inject(PerformApiService);
  protected scheduleApiService = inject(ElectionScheduleApiService);
  private dialogService = inject(DialogService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  title = 'Vote Tally';
  isLoading = false;

  arr_subs = new Array<Subscription>();
  voteTallies: VoteTallyInterface[] | undefined | null;
  voteTally!: VoteTallyInterface;

  schedules: ElectionScheduleInterface[] | null = [];

  private fb = inject(FormBuilder);
  protected rf = this.fb.group({
    schedule: this.fb.control('')
  });

  cols = VoteTallyColumn;

  constructor() {
    this.preloadData();
    this.voteTallyService.onInit();
  }

  ngOnInit(): void {
    this.arr_subs.push(
      this.voteTallyDataSubscription(),
      this.scheduleChange()
    )
  }

  ngAfterViewInit(): void {
    this.voteTallyService.requestData(null);
  }

  ngOnDestroy(): void {
    this.arr_subs.forEach((sub) => {
      sub.unsubscribe();
    })
  }

  protected voteTallyEntry() {
    const ref = this.dialogService
      .open(EntryComponent, {
        header: 'New Vote Tally',
        footer: 'Please carefully double check before saving....',
        position: 'center',
        modal: true,
        width: '50rem'
      });
  }

  private voteTallyDataSubscription(): Subscription {
    return this.voteTallyService.voteTallyData$.
      pipe(
        tap(() => {
          this.voteTallies = [];
          this.isLoading = true;
        }),
        delay(500),
        debounceTime(1000)
      )
      .subscribe((data) => {
        console.log('this vote-tally get api is being fetched successfully', data)
        this.voteTallies = data;
        this.isLoading = false;
      })
  }

  private scheduleChange(): Subscription {
    return this.rf.valueChanges.subscribe(() => {
      this.voteTallyService.requestData(this.rf.getRawValue().schedule as RequestVoteTallyInterface);
    });
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
}
