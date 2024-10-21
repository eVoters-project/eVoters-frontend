import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { VoterInfluenceColumns } from '../definition/voter-influence.columns';
import { VoterInfluenceInterface } from '../../../../interface';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { debounceTime, delay, Subscription, tap } from 'rxjs';
import { VoterInfluenceService } from '../service';
import { VoterInfluenceApiService } from '../../../../service/api';

@Component({
  selector: 'app-voter-influence',
  templateUrl: './voter-influence.component.html',
  styleUrl: './voter-influence.component.scss',
  providers: [
    VoterInfluenceService,
    VoterInfluenceApiService
  ]
})
export class VoterInfluenceComponent implements OnInit, OnDestroy {
  protected voterinfluenceService = inject(VoterInfluenceService);
  private dialogService = inject(DialogService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  private arr_subs = new Array<Subscription>();

  protected cols = VoterInfluenceColumns;
  protected voterinfluences!: VoterInfluenceInterface[];

  protected isLoading = false;

  constructor() {
    this.voterinfluenceService.onInit();
  }

  ngOnInit(): void {
    this.arr_subs.push(
      this.voterInfluenceDataSubscription()
    );
    this.voterinfluenceService.requestData();
  }

  ngOnDestroy(): void {
    this.arr_subs.forEach(sub => {
      sub.unsubscribe();
    });
  }

  private voterInfluenceDataSubscription(): Subscription {
    return this.voterinfluenceService.voterInfluenceData$.
      pipe(
        tap(() => {
          this.voterinfluences = [];
          this.isLoading = true
        }),
        delay(500),
        debounceTime(1000)
      )
      .subscribe((data) => {
        this.voterinfluences = data;
        this.isLoading = false;
      })
  }
}
