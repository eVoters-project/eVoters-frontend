import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { VoterInfluenceSubColumns } from '../definition/voter-influence-sub.columns';
import { VoterInfluenceSubInterface } from '../../../../interface';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { debounceTime, delay, Subscription, tap } from 'rxjs';
import { VoterInfluenceSubService } from '../service';
import { VoterInfluenceSubApiService } from '../../../../service/api';

@Component({
  selector: 'app-voter-influence-sub',
  templateUrl: './voter-influence-sub.component.html',
  styleUrl: './voter-influence-sub.component.scss',
  providers: [
    VoterInfluenceSubService,
    VoterInfluenceSubApiService
  ]
})
export class VoterInfluenceSubComponent implements OnInit, OnDestroy {
  protected voterinfluencesubService = inject(VoterInfluenceSubService);
  private dialogService = inject(DialogService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  private arr_subs = new Array<Subscription>();

  protected cols = VoterInfluenceSubColumns;
  protected voterinfluencessub!: VoterInfluenceSubInterface[];

  protected isLoading = false;

  constructor() {
    this.voterinfluencesubService.onInit();
  }

  ngOnInit(): void {
    this.arr_subs.push(
      this.voterInfluenceSubDataSubscription()
    );
    this.voterinfluencesubService.requestData();
  }

  ngOnDestroy(): void {
    this.arr_subs.forEach(sub => {
      sub.unsubscribe();
    });
  }

  private voterInfluenceSubDataSubscription(): Subscription {
    return this.voterinfluencesubService.voterInfluenceSubData$.
      pipe(
        tap(() => {
          this.voterinfluencessub = [];
          this.isLoading = true
        }),
        delay(500),
        debounceTime(1000)
      )
      .subscribe((data) => {
        this.voterinfluencessub = data;
        this.isLoading = false;
      })
  }
}
