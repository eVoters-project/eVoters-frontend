import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { debounceTime, delay, Subscription, tap } from 'rxjs';
import { VoterBaseColumns } from '../definition/voter-base.columns';
import { VoterBaseInterface } from '../../../../interface';
import { VoterBaseService } from '../service';
import { VoterBaseApiService } from '../../../../service/api';
import { VoterBaseUpsertComponent } from '../voter-base-upsert/voter-base-upsert.component';

@Component({
  selector: 'app-voter-base',
  templateUrl: './voter-base.component.html',
  styleUrl: './voter-base.component.scss',
  providers: [
    VoterBaseService,
    VoterBaseApiService
  ]
})
export class VoterBaseComponent implements OnInit, OnDestroy {
  protected voterbaseService = inject(VoterBaseService);
  private dialogService = inject(DialogService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  private arr_subs = new Array<Subscription>();

  protected cols = VoterBaseColumns;
  protected voterbases!: VoterBaseInterface[];

  protected isLoading = false;

  constructor() {
    this.voterbaseService.onInit();
  }

  ngOnInit(): void {
    this.arr_subs.push(
      this.voterBaseDataSubscription()
    );
    this.voterbaseService.requestData();
  }

  ngOnDestroy(): void {
    this.arr_subs.forEach(sub => {
      sub.unsubscribe();
    });
  }

  protected voterBaseEntry() {
    const ref = this.dialogService
      .open(VoterBaseUpsertComponent, {
        header: 'New Voter Base',
        footer: ' ',
        position: 'right',
        contentStyle: { overflow: 'auto' },
        modal: true,
        width: '45rem',
        height: 'calc(100vh - 100px)'
      })
  }

  private voterBaseDataSubscription(): Subscription {
    return this.voterbaseService.voterBaseData$.
      pipe(
        tap(() => {
          this.voterbases = [];
          this.isLoading = true
        }),
        delay(500),
        debounceTime(1000)
      )
      .subscribe((data) => {
        this.voterbases = data;
        this.isLoading = false;
      })
  }
}
