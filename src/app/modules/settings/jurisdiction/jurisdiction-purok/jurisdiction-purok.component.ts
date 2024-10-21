import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { debounceTime, delay, Subscription, tap } from 'rxjs';
import { PurokInterface } from '../../../../interface';
import { JurisdictionPurokColumns } from '../definitions/jurisdiction-purok.columns';
import { PurokApiService } from '../../../../service/api';
import { JurisdictionPurokService } from '../service';

@Component({
  selector: 'app-jurisdiction-purok',
  templateUrl: './jurisdiction-purok.component.html',
  styleUrl: './jurisdiction-purok.component.scss',
  providers: [
    JurisdictionPurokService,
    PurokApiService
  ]
})
export class JurisdictionPurokComponent implements OnInit, OnDestroy {

  protected purokService = inject(JurisdictionPurokService);
  private dialogService = inject(DialogService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  private arr_subs = new Array<Subscription>();

  protected cols = JurisdictionPurokColumns;
  protected puroks!: PurokInterface[];

  protected isLoading = false;

  constructor() {
    this.purokService.onInit();
  }

  ngOnInit(): void {
    this.arr_subs.push(
      this.voterDataSubscription()
    );
    this.purokService.requestData();
  }

  ngOnDestroy(): void {
    this.arr_subs.forEach(sub => {
      sub.unsubscribe();
    });
  }

  private voterDataSubscription(): Subscription {
    return this.purokService.purokData$.
      pipe(
        tap(() => {
          this.puroks = [];
          this.isLoading = true
        }),
        delay(500),
        debounceTime(1000)
      )
      .subscribe((data) => {
        this.puroks = data;
        this.isLoading = false;
      })
  }

}
