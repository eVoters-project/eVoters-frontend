import { AfterViewInit, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CampaignColumns } from '../data/campaign.column';
import { CampaignInterface } from '../data/interface';
import { debounceTime, delay, Subscription, tap } from 'rxjs';
import { CampaignEntryComponent } from '../campaign-entry/campaign-entry.component';
import { DialogService } from 'primeng/dynamicdialog';
import { CampaignService } from '../campaign.service';

@Component({
  selector: 'ev-campaign-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent implements OnInit, OnDestroy, AfterViewInit {

  protected campaignService = inject(CampaignService);
  private dialogService = inject(DialogService);

  title = 'Campaign';
  isLoading = false;

  arr_subs = new Array<Subscription>();
  campaigns!: CampaignInterface[];
  campaign!: CampaignInterface;

  cols = CampaignColumns;

  constructor() {
    this.campaignService.onInit();
  }

  ngOnInit(): void {
    this.arr_subs.push(
      this.campaignDataSubscription()
    );
  }

  ngOnDestroy(): void {
    this.arr_subs.forEach(sub => {
      sub.unsubscribe();
    });
  }

  ngAfterViewInit(): void {
    this.campaignService.requestData();
  }

  campaignEntry() {
    const ref = this.dialogService
      .open(CampaignEntryComponent, {
        header: 'New Campaign',
        footer: ' ',
        position: 'right',
        modal: true,
        width: '40rem',
      });
  }

  private campaignDataSubscription(): Subscription {
    return this.campaignService.campaignData$.
      pipe(
        tap(() => {
          this.campaigns = [];
          this.isLoading = true
        }),
        delay(500),
        debounceTime(1000)
      )
      .subscribe((data) => {
        this.campaigns = data; console.log('campaign', data);
        this.isLoading = false;
      })
  }
}
