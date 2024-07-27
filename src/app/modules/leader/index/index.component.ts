import { AfterViewChecked, AfterViewInit, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { LeaderInterface } from '../../../interface/modules/leader/leader.interface';
import { LeaderGridColumns } from '../data/leader.column';
import { LeaderEntryComponent } from '../leader-entry/leader-entry.component';
import { DialogService } from 'primeng/dynamicdialog';
import { LeaderService } from '../leader.service';
import { catchError, debounceTime, delay, of, Subscription, tap } from 'rxjs';

@Component({
  selector: 'ev-leader-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent implements OnInit, OnDestroy, AfterViewInit {

  protected leaderService = inject(LeaderService);
  private dialogService = inject(DialogService);

  title = 'Leader'
  isLoading = false;

  arr_subs = new Array<Subscription>();
  leaders!: LeaderInterface[];
  leader!: LeaderInterface;

  cols = LeaderGridColumns;

  constructor() {
    this.leaderService.onInit();
  }

  ngOnInit(): void {
    this.arr_subs.push(
      this.leaderDataSubscription()
    );

  }

  ngOnDestroy(): void {
    this.arr_subs.forEach(sub => {
      sub.unsubscribe();
    });
  }

  ngAfterViewInit(): void {
    this.leaderService.requestData();
  }

  private leaderDataSubscription(): Subscription {
    return this.leaderService.leaderData$.
      pipe(
        tap(() => {
          this.leaders = [];
          this.isLoading = true
        }),
        delay(500),
        debounceTime(1000),
        catchError((err) => {
          console.log(err);
          return of([])
        })
      )
      .subscribe((data) => {
        this.leaders = data; console.log('leaders', data);
        this.isLoading = false;
      })
  }

  leaderEntry() {
    const ref = this.dialogService
      .open(LeaderEntryComponent, {
        header: 'New Leader',
        footer: ' ',
        position: 'right',
        modal: true,
        width: '40rem',
        height: '45rem'
      });
  }
}
