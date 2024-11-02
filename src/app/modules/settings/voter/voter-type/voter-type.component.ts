import { Component, inject } from '@angular/core';
import { VoterTypeColumns } from '../definition/voter-type.columns';
import { VoterTypeInterface } from '../../../../interface';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { debounceTime, delay, Subscription, tap } from 'rxjs';
import { VoterTypeService } from '../service';
import { VoterTypeApiService } from '../../../../service/api';
import { VoterTypeUpsertComponent } from '../voter-type-upsert/voter-type-upsert.component';

@Component({
  selector: 'app-voter-type',
  templateUrl: './voter-type.component.html',
  styleUrl: './voter-type.component.scss',
  providers: [
    VoterTypeService,
    VoterTypeApiService
  ]
})
export class VoterTypeComponent {
  protected votertypeService = inject(VoterTypeService);
  private dialogService = inject(DialogService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  private arr_subs = new Array<Subscription>();

  protected cols = VoterTypeColumns;
  protected votertypes!: VoterTypeInterface[];

  protected isLoading = false;

  constructor() {
    this.votertypeService.onInit();
  }

  ngOnInit(): void {
    this.arr_subs.push(
      this.voterTypeDataSubscription()
    );
    this.votertypeService.requestData();
  }

  ngOnDestroy(): void {
    this.arr_subs.forEach(sub => {
      sub.unsubscribe();
    });
  }

  protected voterTypeEntry() {
    const ref = this.dialogService
      .open(VoterTypeUpsertComponent, {
        header: 'New Voter Type',
        footer: ' ',
        position: 'right',
        contentStyle: { overflow: 'auto' },
        modal: true,
        width: '45rem',
        height: 'calc(100vh - 100px)'
      })
  }

  private voterTypeDataSubscription(): Subscription {
    return this.votertypeService.voterTypeData$.
      pipe(
        tap(() => {
          this.votertypes = [];
          this.isLoading = true
        }),
        delay(500),
        debounceTime(1000)
      )
      .subscribe((data) => {
        this.votertypes = data;
        this.isLoading = false;
      })
  }
}
