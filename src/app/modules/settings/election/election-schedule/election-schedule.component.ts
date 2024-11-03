import { Component, inject } from '@angular/core';
import { ElectionScheduleService } from '../service/election-schedule.service';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { debounceTime, delay, Subscription, tap } from 'rxjs';
import { ElectionScheduleInterface } from '../../../../interface';
import { ElectionScheduleUpsertComponent } from '../election-schedule-upsert/election-schedule-upsert.component';
import { ElectionScheduleColumns } from '../definition/election-schedule.column';
import { ElectionScheduleApiService } from '../../../../service/api';

@Component({
  selector: 'app-election-schedule',
  templateUrl: './election-schedule.component.html',
  styleUrl: './election-schedule.component.scss',
  providers: [
    ElectionScheduleService,
    ElectionScheduleApiService
  ]
})
export class ElectionScheduleComponent {

  protected electionPosition = inject(ElectionScheduleService);
  private dialogService = inject(DialogService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  private arr_subs = new Array<Subscription>();

  protected cols = ElectionScheduleColumns;
  protected electionSchedules: ElectionScheduleInterface[] = [];

  protected isLoading = false;

  constructor() {
    this.electionPosition.onInit();
  }

  ngOnInit(): void {
    this.arr_subs.push(
      this.electionPositionDataSubscription()
    );
    this.electionPosition.requestData();
  }

  ngOnDestroy(): void {
    this.arr_subs.forEach(sub => {
      sub.unsubscribe();
    });
  }

  protected electionScheduleEntry() {
    const ref = this.dialogService
      .open(ElectionScheduleUpsertComponent, {
        header: 'New Election Schedule',
        footer: ' ',
        position: 'right',
        contentStyle: { overflow: 'auto' },
        modal: true,
        width: '45rem',
        height: 'calc(100vh - 100px)'
      })
  }

  private electionPositionDataSubscription(): Subscription {
    return this.electionPosition.electionScheduleData$.
      pipe(
        tap(() => {
          this.electionSchedules = [];
          this.isLoading = true
        }),
        delay(500),
        debounceTime(1000)
      )
      .subscribe((data) => {
        this.electionSchedules = data;
        this.isLoading = false;
      })
  }
}
