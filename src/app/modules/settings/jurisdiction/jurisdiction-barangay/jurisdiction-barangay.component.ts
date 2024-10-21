import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { debounceTime, delay, Subscription, tap } from 'rxjs';
import { BarangayInterface } from '../../../../interface';
import { JurisdictionBarangayColumns } from '../definitions/jurisdiction-barangay.columns';
import { JurisdictionBarangayService } from '../service';
import { BarangayApiService } from '../../../../service/api';

@Component({
  selector: 'app-jurisdiction-barangay',
  templateUrl: './jurisdiction-barangay.component.html',
  styleUrl: './jurisdiction-barangay.component.scss',
  providers: [
    JurisdictionBarangayService,
    BarangayApiService
  ]
})
export class JurisdictionBarangayComponent implements OnInit, OnDestroy {

  protected barangayService = inject(JurisdictionBarangayService);
  private dialogService = inject(DialogService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  private arr_subs = new Array<Subscription>();

  protected cols = JurisdictionBarangayColumns;
  protected barangays: BarangayInterface[] = [];

  protected isLoading = false;

  constructor() {
    this.barangayService.onInit();
  }

  ngOnInit(): void {
    this.arr_subs.push(
      this.voterDataSubscription()
    );
    this.barangayService.requestData();
  }

  ngOnDestroy(): void {
    this.arr_subs.forEach(sub => {
      sub.unsubscribe();
    });
  }

  private voterDataSubscription(): Subscription {
    return this.barangayService.barangayData$.
      pipe(
        tap(() => {
          this.barangays = [];
          this.isLoading = true
        }),
        delay(500),
        debounceTime(1000)
      )
      .subscribe((data) => {
        this.barangays = data;
        this.isLoading = false;
      })
  }
}
