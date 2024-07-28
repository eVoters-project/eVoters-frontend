import { AfterViewInit, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { PartyGridColumns } from '../party.data';
import { PartyInterface } from '../../../interface/modules/party/party.interface';
import { DialogService } from 'primeng/dynamicdialog';
import { PartyService } from '../party.service';
import { debounceTime, delay, Subscription, tap } from 'rxjs';
import { PartyEntryComponent } from '../party-entry/party-entry.component';

@Component({
  selector: 'ev-party-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent implements OnInit, OnDestroy, AfterViewInit {

  protected partyService = inject(PartyService);
  private dialogService = inject(DialogService);

  title = 'Party';
  isLoading = false;

  arr_subs = new Array<Subscription>();
  parties: PartyInterface[] | undefined | null;
  party: PartyInterface | undefined | null;

  cols = PartyGridColumns;

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

  partyEntry() {
    const ref = this.dialogService
      .open(PartyEntryComponent, {
        header: 'New Party',
        footer: ' ',
        position: 'right',
        modal: true,
        width: '40rem',
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
}
