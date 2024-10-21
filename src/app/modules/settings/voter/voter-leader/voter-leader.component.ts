import { Component, inject } from '@angular/core';
import { VoterLeaderColumns } from '../definition/voter-leader.columns';
import { VoterLeaderInterface } from '../../../../interface';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { debounceTime, delay, Subscription, tap } from 'rxjs';
import { VoterLeaderService } from '../service';
import { VoterLeaderApiService } from '../../../../service/api/voter-leader/voter-leader.api.service';

@Component({
  selector: 'app-voter-leader',
  templateUrl: './voter-leader.component.html',
  styleUrl: './voter-leader.component.scss',
  providers: [
    VoterLeaderService,
    VoterLeaderApiService
  ]
})
export class VoterLeaderComponent {
  protected voterleaderService = inject(VoterLeaderService);
  private dialogService = inject(DialogService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  private arr_subs = new Array<Subscription>();

  protected cols = VoterLeaderColumns;
  protected voterleaders!: VoterLeaderInterface[];

  protected isLoading = false;

  constructor() {
    this.voterleaderService.onInit();
  }

  ngOnInit(): void {
    this.arr_subs.push(
      this.voterLeaderDataSubscription()
    );
    this.voterleaderService.requestData();
  }

  ngOnDestroy(): void {
    this.arr_subs.forEach(sub => {
      sub.unsubscribe();
    });
  }

  private voterLeaderDataSubscription(): Subscription {
    return this.voterleaderService.voterLeaderData$.
      pipe(
        tap(() => {
          this.voterleaders = [];
          this.isLoading = true
        }),
        delay(500),
        debounceTime(1000)
      )
      .subscribe((data) => {
        this.voterleaders = data;
        this.isLoading = false;
      })
  }
}
