import { AfterViewInit, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { VoteTallyService } from '../vote-tally.service';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { debounceTime, delay, Subscription, tap } from 'rxjs';
import { VoteTallyInterface } from '../../../interface';
import { VoteTallyColumn } from '../grid-columns/vote-tally.column';
import { VoteTallyApiService } from '../../../service/api';
import { EntryComponent } from '../entry/entry.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss',
  providers: [
    VoteTallyApiService,
    VoteTallyService
  ]
})
export class IndexComponent implements OnInit, OnDestroy, AfterViewInit {
  protected voteTallyService = inject(VoteTallyService);
  private dialogService = inject(DialogService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  title = 'Vote Tally';
  isLoading = false;

  arr_subs = new Array<Subscription>();
  voteTallies: VoteTallyInterface[] | undefined | null;
  voteTally!: VoteTallyInterface;

  cols = VoteTallyColumn;

  constructor() {
    this.voteTallyService.onInit();
  }

  ngOnInit(): void {
    this.arr_subs.push(
      this.voteTallyDataSubscription()
    )
  }

  ngAfterViewInit(): void {
    this.voteTallyService.requestData();
  }

  ngOnDestroy(): void {
    this.arr_subs.forEach((sub) => {
      sub.unsubscribe();
    })
  }

  protected voteTallyEntry() {
    const ref = this.dialogService
      .open(EntryComponent, {
        header: 'New Vote Tally',
        footer: 'Please carefully double check before saving....',
        position: 'center',
        modal: true,
        width: '50rem'
      });
  }

  private voteTallyDataSubscription(): Subscription {
    return this.voteTallyService.voteTallyData$.
      pipe(
        tap(() => {
          this.voteTallies = [];
          this.isLoading = true;
        }),
        delay(500),
        debounceTime(1000)
      )
      .subscribe((data) => {
        console.log('this vote-tally get api is being fetched successfully', data)
        this.voteTallies = data;
        this.isLoading = false;
      })
  }
}
