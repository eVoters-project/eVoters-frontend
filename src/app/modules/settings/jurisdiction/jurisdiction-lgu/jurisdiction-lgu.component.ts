import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { debounceTime, delay, Subscription, tap } from 'rxjs';
import { LGUInterface } from '../../../../interface';
import { JurisdictionLguColumns } from '../definitions/jurisdiction-lgu.columns';
import { JurisdictionLGUService } from '../service';
import { LGUApiService } from '../../../../service/api';

@Component({
  selector: 'app-jurisdiction-lgu',
  templateUrl: './jurisdiction-lgu.component.html',
  styleUrl: './jurisdiction-lgu.component.scss',
  providers: [
    JurisdictionLGUService,
    LGUApiService
  ]
})
export class JurisdictionLguComponent implements OnInit, OnDestroy {

  protected lguService = inject(JurisdictionLGUService);
  private dialogService = inject(DialogService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  private arr_subs = new Array<Subscription>();

  protected cols = JurisdictionLguColumns;
  protected lgus: LGUInterface[] = [];

  protected isLoading = false;

  constructor() {
    this.lguService.onInit();
  }

  ngOnInit(): void {
    this.arr_subs.push(
      this.voterDataSubscription()
    );
    this.lguService.requestData();
  }

  ngOnDestroy(): void {
    this.arr_subs.forEach(sub => {
      sub.unsubscribe();
    });
  }

  private voterDataSubscription(): Subscription {
    return this.lguService.lguData$.
      pipe(
        tap(() => {
          this.lgus = [];
          this.isLoading = true
        }),
        delay(500),
        debounceTime(1000)
      )
      .subscribe((data) => {
        this.lgus = data;
        this.isLoading = false;
      })
  }
}
