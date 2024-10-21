import { Component, inject } from '@angular/core';
import { VoterPositionColumns } from '../definition/voter-position.columns';
import { VoterPositionInterface } from '../../../../interface';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { debounceTime, delay, Subscription, tap } from 'rxjs';
import { VoterPositionService } from '../service';
import { VoterPositionApiService } from '../../../../service/api';

@Component({
  selector: 'app-voter-position',
  templateUrl: './voter-position.component.html',
  styleUrl: './voter-position.component.scss',
  providers: [
    VoterPositionService,
    VoterPositionApiService
  ]
})
export class VoterPositionComponent {
  protected voterpositionService = inject(VoterPositionService);
  private dialogService = inject(DialogService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  private arr_subs = new Array<Subscription>();

  protected cols = VoterPositionColumns;
  protected voterpositions!: VoterPositionInterface[];

  protected isLoading = false;

  constructor() {
    this.voterpositionService.onInit();
  }

  ngOnInit(): void {
    this.arr_subs.push(
      this.voterPositionDataSubscription()
    );
    this.voterpositionService.requestData();
  }

  ngOnDestroy(): void {
    this.arr_subs.forEach(sub => {
      sub.unsubscribe();
    });
  }

  private voterPositionDataSubscription(): Subscription {
    return this.voterpositionService.voterPositionData$.
      pipe(
        tap(() => {
          this.voterpositions = [];
          this.isLoading = true
        }),
        delay(500),
        debounceTime(1000)
      )
      .subscribe((data) => {
        this.voterpositions = data;
        this.isLoading = false;
      })
  }
}
