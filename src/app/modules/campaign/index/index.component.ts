import { AfterViewInit, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CampaignColumns } from '../data/campaign.column';
import { CampaignInterface } from '../data/interface';
import { debounceTime, delay, Subscription, take, tap } from 'rxjs';
import { CampaignEntryComponent } from '../campaign-entry/campaign-entry.component';
import { DialogService } from 'primeng/dynamicdialog';
import { CampaignService } from '../campaign.service';
import { ConfirmationService, MessageService, PrimeIcons } from 'primeng/api';

@Component({
  selector: 'ev-campaign-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent implements OnInit, OnDestroy, AfterViewInit {

  protected campaignService = inject(CampaignService);
  private dialogService = inject(DialogService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  title = 'Campaign';
  isLoading = false;

  arr_subs = new Array<Subscription>();
  campaigns!: CampaignInterface[];
  campaign!: CampaignInterface;

  cols = CampaignColumns;

  protected gridContextMenus = [
    {
      label: 'Delete',
      icon: PrimeIcons.TRASH,
      command: () => this.campaignDelete()
    }
  ]

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

  protected campaignEntry() {
    const ref = this.dialogService
      .open(CampaignEntryComponent, {
        header: 'New Campaign',
        footer: ' ',
        position: 'right',
        modal: true,
        width: '40rem',
      });
  }

  private campaignDelete() {
    this.confirmationService.confirm({
      target: event?.target as EventTarget,
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: "none",
      rejectIcon: "none",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        const { id } = this.campaign;
        this.campaignService.deleteData(id)
          .pipe(take(1))
          .subscribe({
            next: () => {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Campaign Deleted!', life: 2000 });
              this.campaignService.requestData();
            }
          })
      },
      reject: () => {
        // this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
      }
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
