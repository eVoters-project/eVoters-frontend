import { Component, inject } from '@angular/core';
import { ElectionPositionService } from '../service/election-position.service';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { debounceTime, delay, Subscription, tap } from 'rxjs';
import { ElectionPositionInterface } from '../../../../interface';
import { ElectionPositionUpsertComponent } from '../election-position-upsert/election-position-upsert.component';
import { ElectionPositionColumns } from '../definition/election-position.columns';
import { ElectionPositionApiService } from '../../../../service/api';

@Component({
  selector: 'app-election-position',
  templateUrl: './election-position.component.html',
  styleUrl: './election-position.component.scss',
  providers: [
    ElectionPositionService,
    ElectionPositionApiService
  ]
})
export class ElectionPositionComponent {

  protected electionPosition = inject(ElectionPositionService);
  private dialogService = inject(DialogService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  private arr_subs = new Array<Subscription>();

  protected cols = ElectionPositionColumns;
  protected electionPositions: ElectionPositionInterface[] = [];

  protected isLoading = false;

  constructor() {
    this.electionPosition.onInit();
  }

  ngOnInit(): void {
    this.arr_subs.push(
      this.electionPositionDataSubscription()
    );
    this.electionPosition.requestData();
  }

  ngOnDestroy(): void {
    this.arr_subs.forEach(sub => {
      sub.unsubscribe();
    });
  }

  protected electionPositionEntry() {
    const ref = this.dialogService
      .open(ElectionPositionUpsertComponent, {
        header: 'New Election Position',
        footer: ' ',
        position: 'right',
        contentStyle: { overflow: 'auto' },
        modal: true,
        width: '45rem',
        height: 'calc(100vh - 100px)'
      })
  }

  private electionPositionDataSubscription(): Subscription {
    return this.electionPosition.electionPositionData$.
      pipe(
        tap(() => {
          this.electionPositions = [];
          this.isLoading = true
        }),
        delay(500),
        debounceTime(1000)
      )
      .subscribe((data) => {
        this.electionPositions = data;
        this.isLoading = false;
      })
  }
}
