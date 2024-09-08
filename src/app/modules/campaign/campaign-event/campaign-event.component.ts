import { AfterViewInit, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationService, MessageService, PrimeIcons } from 'primeng/api';
import { debounceTime, delay, Subscription, take, tap } from 'rxjs';
import { CampaignInterface } from '../data/interface';
import { CampaignColumns } from '../data/campaign.column';
import { CampaignService } from '../campaign.service';
import { DialogService } from 'primeng/dynamicdialog';
import { CampaignEntryComponent } from '../campaign-entry/campaign-entry.component';

@Component({
  selector: 'app-campaign-event',
  templateUrl: './campaign-event.component.html',
  styleUrl: './campaign-event.component.scss'
})
export class CampaignEventComponent implements OnInit, OnDestroy, AfterViewInit {

  protected campaignService = inject(CampaignService);
  private dialogService = inject(DialogService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  protected gridContextMenus = [
    {
      label: 'Delete',
      icon: PrimeIcons.TRASH,
      command: () => this.campaignDelete()
    }
  ]

  arr_subs = new Array<Subscription>();
  campaigns!: CampaignInterface[];
  campaign!: CampaignInterface;

  cols = CampaignColumns;
  isLoading = false;

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
        this.campaigns = data;
        this.isLoading = false;
      })
  }
}
