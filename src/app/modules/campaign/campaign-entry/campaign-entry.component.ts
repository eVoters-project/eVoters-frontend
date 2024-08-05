import { Component, inject } from '@angular/core';
import { Status } from '../../../data';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { PerformApiService } from '../../../service';
import { CampaignApiService } from '../../../service/api';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { format } from 'date-fns';

@Component({
  selector: 'app-campaign-entry',
  templateUrl: './campaign-entry.component.html',
  styleUrl: './campaign-entry.component.scss',
  providers: [PerformApiService]
})
export class CampaignEntryComponent {
  saveCount = 0;
  isLoading = false;
  isSaving = false;
  status = Status;

  performApi = inject(PerformApiService);
  campaignApi = inject(CampaignApiService);
  messageService = inject(MessageService);
  dialogRef = inject(DynamicDialogRef);

  private fb = inject(FormBuilder);
  protected rf = this.fb.group({
    code: this.fb.control(""),
    when: this.fb.control("", { validators: [Validators.required] }),
    what: this.fb.control("", { validators: [Validators.required] }),
    where: this.fb.control("", { validators: [Validators.required] }),
    remarks: this.fb.control("", { validators: [Validators.required] }),
    status: this.fb.control("", { validators: [Validators.required] }),
    attendees: 0
  })

  constructor() {

  }

  campaignSave() {
    if (this.rf.invalid) {
      this.rf.markAllAsTouched();
      return;
    }

    const data = this.rf.getRawValue();
    data.when = this.parseDateTime(data.when);

    this.isSaving = true;

    const unsub$ = new Subject<void>();
    this.performApi.performApi([
      { action: () => this.campaignApi.create(data), tag: 'create-campaign' }
    ], unsub$)
      .subscribe({
        next: (res) => {
          this.isSaving = false;

          if (res[0].error !== null) {
            this.messageService.add({ severity: 'error', summary: '', detail: '' });
            return;
          }

          this.messageService.add({ severity: 'success', summary: 'Campaign Created', detail: '' })

          unsub$.next();
          unsub$.complete();

          this.rf.reset();
          this.saveCount++;
        }
      });
  }

  private parseDateTime(date: any) {
    return format(date, "yyyy-MM-dd hh:mm:ss aa");
  }

}
