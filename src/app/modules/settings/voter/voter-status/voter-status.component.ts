import { Component, inject } from '@angular/core';
import { VoterStatusColumns } from '../definition/voter-status.columns';
import { VoterStatusInterface } from '../../../../interface';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { debounceTime, delay, Subscription, tap } from 'rxjs';
import { VoterStatusService } from '../service';
import { VoterStatusApiService } from '../../../../service/api';

@Component({
  selector: 'app-voter-status',
  templateUrl: './voter-status.component.html',
  styleUrl: './voter-status.component.scss',
  providers: [
    VoterStatusService,
    VoterStatusApiService
  ]
})
export class VoterStatusComponent {
  protected voterstatusService = inject(VoterStatusService);
  private dialogService = inject(DialogService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  private arr_subs = new Array<Subscription>();

  protected cols = VoterStatusColumns;
  protected voterstatuses!: VoterStatusInterface[];

  protected isLoading = false;

  constructor() {
    this.voterstatusService.onInit();
  }

  ngOnInit(): void {
    this.arr_subs.push(
      this.voterStatusDataSubscription()
    );
    this.voterstatusService.requestData();
  }

  ngOnDestroy(): void {
    this.arr_subs.forEach(sub => {
      sub.unsubscribe();
    });
  }

  private voterStatusDataSubscription(): Subscription {
    return this.voterstatusService.voterStatusData$.
      pipe(
        tap(() => {
          this.voterstatuses = [];
          this.isLoading = true
        }),
        delay(500),
        debounceTime(1000)
      )
      .subscribe((data) => {
        this.voterstatuses = data;
        this.isLoading = false;
      })
  }
}
