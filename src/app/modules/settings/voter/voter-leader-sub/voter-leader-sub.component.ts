import { Component, inject } from '@angular/core';
import { VoterLeaderSubColumns } from '../definition/voter-leader-sub.columns';
import { VoterLeaderSubInterface } from '../../../../interface';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { debounceTime, delay, Subscription, tap } from 'rxjs';
import { VoterLeaderSubService } from '../service';
import { VoterLeaderSubApiService } from '../../../../service/api';

@Component({
  selector: 'app-voter-leader-sub',
  templateUrl: './voter-leader-sub.component.html',
  styleUrl: './voter-leader-sub.component.scss',
  providers: [
    VoterLeaderSubService,
    VoterLeaderSubApiService
  ]
})
export class VoterLeaderSubComponent {
  protected voterleadersubService = inject(VoterLeaderSubService);
  private dialogService = inject(DialogService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  private arr_subs = new Array<Subscription>();

  protected cols = VoterLeaderSubColumns;
  protected voterleaderssub!: VoterLeaderSubInterface[];

  protected isLoading = false;

  constructor() {
    this.voterleadersubService.onInit();
  }

  ngOnInit(): void {
    this.arr_subs.push(
      this.voterLeaderSubDataSubscription()
    );
    this.voterleadersubService.requestData();
  }

  ngOnDestroy(): void {
    this.arr_subs.forEach(sub => {
      sub.unsubscribe();
    });
  }

  private voterLeaderSubDataSubscription(): Subscription {
    return this.voterleadersubService.voterLeaderSubData$.
      pipe(
        tap(() => {
          this.voterleaderssub = [];
          this.isLoading = true
        }),
        delay(500),
        debounceTime(1000)
      )
      .subscribe((data) => {
        this.voterleaderssub = data;
        this.isLoading = false;
      })
  }
}
