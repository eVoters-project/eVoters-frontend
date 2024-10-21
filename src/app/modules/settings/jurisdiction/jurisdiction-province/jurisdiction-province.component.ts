import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { debounceTime, delay, Subscription, tap } from 'rxjs';
import { ProvinceInterface } from '../../../../interface';
import { JurisdictionProvinceColumns } from '../definitions/jurisdiction-province.columns';
import { JurisdictionProvinceService } from '../service';
import { ProvinceApiService } from '../../../../service/api';

@Component({
  selector: 'app-jurisdiction-province',
  templateUrl: './jurisdiction-province.component.html',
  styleUrl: './jurisdiction-province.component.scss',
  providers: [
    JurisdictionProvinceService,
    ProvinceApiService
  ]
})
export class JurisdictionProvinceComponent implements OnInit, OnDestroy {

  protected provinceService = inject(JurisdictionProvinceService);
  private dialogService = inject(DialogService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  private arr_subs = new Array<Subscription>();

  protected cols = JurisdictionProvinceColumns;
  protected provinces: ProvinceInterface[] = [];

  protected isLoading = false;

  constructor() {
    this.provinceService.onInit();
  }

  ngOnInit(): void {
    this.arr_subs.push(
      this.provinceDataSubscription()
    );
    this.provinceService.requestData();
  }

  ngOnDestroy(): void {
    this.arr_subs.forEach(sub => {
      sub.unsubscribe();
    });
  }

  private provinceDataSubscription(): Subscription {
    return this.provinceService.provinceData$.
      pipe(
        tap(() => {
          this.provinces = [];
          this.isLoading = true
        }),
        delay(500),
        debounceTime(1000)
      )
      .subscribe((data) => {
        this.provinces = data;
        this.isLoading = false;
      })
  }
}
