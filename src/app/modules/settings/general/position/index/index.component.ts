import { Component, inject } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { debounceTime, delay, Subscription, tap } from 'rxjs';
import { UpsertComponent } from '../upsert/upsert.component';
import { PositionInterface } from '../../../../../interface';
import { PositionColumns } from '../../definition/position-columns';
import { SettingsGeneralPositionService } from '../settings-general-position.service';
import { PositionApiService } from '../../../../../service/api';

@Component({
  selector: 'app-settings-general-position-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss',
  providers: [
    SettingsGeneralPositionService,
    PositionApiService
  ]
})
export class IndexComponent {
protected positionService = inject(SettingsGeneralPositionService);
  private dialogService = inject(DialogService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  private arr_subs = new Array<Subscription>();

  protected cols = PositionColumns;
  protected positions!: PositionInterface[];

  protected isLoading = false;

  constructor() {
    this.positionService.onInit();
  }

  ngOnInit(): void {
    this.arr_subs.push(
      this.positionDataSubscription()
    );
    this.positionService.requestData();
  }

  ngOnDestroy(): void {
    this.arr_subs.forEach(sub => {
      sub.unsubscribe();
    });
  }

  protected positionEntry() {
    const ref = this.dialogService
      .open(UpsertComponent, {
        header: 'New Position',
        footer: ' ',
        position: 'right',
        contentStyle: { overflow: 'auto' },
        modal: true,
        width: '45rem',
        height: 'calc(100vh - 100px)'
      });

    ref.onClose.subscribe(() => {
      this.positionService.requestData();
    })
  }

  private positionDataSubscription(): Subscription {
    return this.positionService.positionData$.
      pipe(
        tap(() => {
          this.positions = [];
          this.isLoading = true
        }),
        delay(500),
        debounceTime(1000)
      )
      .subscribe((data) => {
        this.positions = data;
        this.isLoading = false;
      })
  }
}
