import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { debounceTime, delay, Subscription, tap } from 'rxjs';
import { ElectionPrecinctService } from '../service/election-precinct.service';
import { ElectionPrecinctInterface } from '../../../../interface';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ElectionPrecinctUpsertComponent } from '../election-precinct-upsert/election-precinct-upsert.component';
import { ElectionPrecinctColumns } from '../definition/election-precinct.column';
import { ElectionPrecinctApiService } from '../../../../service/api';

@Component({
  selector: 'app-election-precinct',
  templateUrl: './election-precinct.component.html',
  styleUrl: './election-precinct.component.scss',
  providers: [
    ElectionPrecinctService,
    ElectionPrecinctApiService
  ]
})
export class ElectionPrecinctComponent implements OnInit, OnDestroy {

  protected electionPrecinctService = inject(ElectionPrecinctService);
  private dialogService = inject(DialogService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  private arr_subs = new Array<Subscription>();

  protected cols = ElectionPrecinctColumns;
  protected electionPrecincts: ElectionPrecinctInterface[] = [];

  protected isLoading = false;

  constructor() {
    this.electionPrecinctService.onInit();
  }

  ngOnInit(): void {
    this.arr_subs.push(
      this.electionPositionDataSubscription()
    );
    this.electionPrecinctService.requestData();
  }

  ngOnDestroy(): void {
    this.arr_subs.forEach(sub => {
      sub.unsubscribe();
    });
  }

  protected electionPrecinctEntry() {
    const ref = this.dialogService
      .open(ElectionPrecinctUpsertComponent, {
        header: 'New Election Precinct',
        footer: ' ',
        position: 'right',
        contentStyle: { overflow: 'auto' },
        modal: true,
        width: '45rem',
        height: 'calc(100vh - 100px)'
      })
  }

  private electionPositionDataSubscription(): Subscription {
    return this.electionPrecinctService.electionPrecinctData$.
      pipe(
        tap(() => {
          this.electionPrecincts = [];
          this.isLoading = true
        }),
        delay(500),
        debounceTime(1000)
      )
      .subscribe((data) => {
        this.electionPrecincts = data;
        this.isLoading = false;
      })
  }
}
