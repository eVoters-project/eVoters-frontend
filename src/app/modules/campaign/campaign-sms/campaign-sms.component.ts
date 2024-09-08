import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ResponseVoterInterface } from '../../../interface';
import { VoterService } from '../../voters/service/voter.service';
import { debounceTime, delay, Subject, Subscription, tap } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CampaignService } from '../campaign.service';
import { PerformApiService } from '../../../service';
import { MessageService } from 'primeng/api';
import { CampaignApiService } from '../../../service/api';
import { PickList } from 'primeng/picklist';

@Component({
  selector: 'app-campaign-sms',
  templateUrl: './campaign-sms.component.html',
  styleUrl: './campaign-sms.component.scss'
})
export class CampaignSmsComponent implements OnInit, OnDestroy {

  protected voterService = inject(VoterService);
  protected cdr = inject(ChangeDetectorRef);
  protected isLoading = false;
  protected isSending = false;

  private campaignApi = inject(CampaignApiService);
  private performApi = inject(PerformApiService);
  private messageService = inject(MessageService);
  private fb = inject(FormBuilder);
  private arr_subs = new Array<Subscription>();

  sourceVoters!: ResponseVoterInterface[];
  targetVoters: ResponseVoterInterface[] = [];

  rf: FormGroup = this.fb.group({
    number: this.fb.control([]),
    message: this.fb.control('', { validators: [Validators.required] })
  })

  @ViewChild('picklist', { static: true }) picklist!: PickList;

  constructor() {
    this.voterService.onInit();
  }

  ngOnInit(): void {
    this.arr_subs.push(
      this.voterDataSubscription()
    );
    this.voterService.requestData();
  }

  ngOnDestroy(): void {
    this.arr_subs.forEach(sub => {
      sub.unsubscribe();
    });
  }

  protected sendSMS() {
    const numbers = this.targetVoters?.map(v => v.mobile_no);

    this.isSending = true;

    const data = this.rf.getRawValue();
    data.number = numbers;

    this.isSending = true;

    const unsub$ = new Subject<void>();

    this.performApi.performApi([
      { action: () => this.campaignApi.sendSMS(data), tag: 'send-sms' }
    ], unsub$).subscribe({
      next: (res) => {
        this.isSending = false;
        if (res[0].error !== null) {
          this.messageService.add({ severity: 'error', summary: '', detail: '' });
        }

        this.messageService.add({ severity: 'success', summary: 'SMS message sent', detail: '' })

        unsub$.next();
        unsub$.complete();

        this.rf.reset();
        this.picklist.moveAllLeft();
        this.targetVoters = [];
        // this.saveCount++;
      }
    });

  }

  private voterDataSubscription(): Subscription {
    return this.voterService.voterData$.
      pipe(
        tap(() => {
          this.sourceVoters = [];
          this.isLoading = true
        }),
        delay(500),
        debounceTime(1000)
      )
      .subscribe((data) => {
        this.sourceVoters = data;
        this.cdr.markForCheck();
        this.isLoading = false;
      })
  }
}
