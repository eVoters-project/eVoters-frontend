import { AfterViewInit, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { PartyGridColumns } from '../party.data';
import { PartyInterface } from '../../../interface/modules/party/party.interface';
import { DialogService } from 'primeng/dynamicdialog';
import { PartyService } from '../party.service';
import { debounceTime, delay, Subscription, take, tap } from 'rxjs';
import { PartyEntryComponent } from '../party-entry/party-entry.component';
import { ConfirmationService, MessageService, PrimeIcons } from 'primeng/api';

@Component({
  selector: 'ev-party-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent implements OnInit, OnDestroy, AfterViewInit {
  protected partyService = inject(PartyService);
  private dialogService = inject(DialogService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  title = 'Party';
  isLoading = false;

  arr_subs = new Array<Subscription>();
  parties: PartyInterface[] | undefined | null;
  party!: PartyInterface;

  cols = PartyGridColumns;

  protected gridContextMenus = [
    {
      label: 'Delete',
      icon: PrimeIcons.TRASH,
      command: () => this.partyDelete()
    }
  ]

  constructor() {
    this.partyService.onInit();
  }

  ngOnInit(): void {
    this.arr_subs.push(
      this.partyDataSubscription()
    );
  }

  ngOnDestroy(): void {
    this.arr_subs.forEach(sub => {
      sub.unsubscribe();
    });
  }

  ngAfterViewInit(): void {
    this.partyService.requestData();
  }

  protected partyEntry() {
    const ref = this.dialogService
      .open(PartyEntryComponent, {
        header: 'New Party',
        footer: ' ',
        position: 'right',
        modal: true,
        width: '40rem'
      });
  }

  private partyDataSubscription(): Subscription {
    return this.partyService.partyData$.
      pipe(
        tap(() => {
          this.parties = [];
          this.isLoading = true
        }),
        delay(500),
        debounceTime(1000)
      )
      .subscribe((data) => {
        this.parties = data;
        this.isLoading = false;
      })
  }

  private partyDelete() {
    this.confirmationService.confirm({
      target: event?.target as EventTarget,
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: "none",
      rejectIcon: "none",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        const { id } = this.party;
        this.partyService.deleteData(id)
          .pipe(take(1))
          .subscribe({
            next: () => {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Party Deleted!', life: 2000 });
              this.partyService.requestData();
            }
          })
      },
      reject: () => {
        // this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
      }
    });
  }
}
