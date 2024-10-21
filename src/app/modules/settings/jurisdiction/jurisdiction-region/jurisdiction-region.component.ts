import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { debounceTime, delay, Subscription, tap } from 'rxjs';
import { RegionInterface } from '../../../../interface';
import { JurisdictionRegionColumns } from '../definitions/jurisdiction-region.columns';
import { JurisdictionRegionService } from '../service';
import { RegionApiService } from '../../../../service/api';

@Component({
  selector: 'app-jurisdiction-region',
  templateUrl: './jurisdiction-region.component.html',
  styleUrl: './jurisdiction-region.component.scss',
  providers: [
    JurisdictionRegionService,
    RegionApiService
  ]
})
export class JurisdictionRegionComponent implements OnInit, OnDestroy {

  protected regionService = inject(JurisdictionRegionService);
  private dialogService = inject(DialogService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  private arr_subs = new Array<Subscription>();

  protected cols = JurisdictionRegionColumns;
  protected regions: RegionInterface[] = [];

  protected isLoading = false;

  constructor() {
    this.regionService.onInit();
  }

  ngOnInit(): void {
    this.arr_subs.push(
      this.regionDataSubscription()
    );
    this.regionService.requestData();
  }

  ngOnDestroy(): void {
    this.arr_subs.forEach(sub => {
      sub.unsubscribe();
    });
  }

  private regionDataSubscription(): Subscription {
    return this.regionService.regionData$.
      pipe(
        tap(() => {
          this.regions = [];
          this.isLoading = true
        }),
        delay(500),
        debounceTime(1000)
      )
      .subscribe((data) => {
        this.regions = data;
        this.isLoading = false;
      })
  }
}
