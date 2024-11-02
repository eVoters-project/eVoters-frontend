import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { VoterBaseApiService } from '../../../../service/api';
import { PerformApiService } from '../../../../service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-voter-base-upsert',
  templateUrl: './voter-base-upsert.component.html',
  styleUrl: './voter-base-upsert.component.scss',
  providers: [
    PerformApiService,
    VoterBaseApiService
  ]
})
export class VoterBaseUpsertComponent {
  private fb = inject(FormBuilder);
  private performApi = inject(PerformApiService);
  private voterBaseApi = inject(VoterBaseApiService);
  private messageService = inject(MessageService);

  protected JURISDICTION_STATUS = [
    'Active',
    'Inactive'
  ]
  protected isLoading = true;
  protected isSaving = false;

  protected rf = this.fb.group({
    code: this.fb.control(''),
    description: this.fb.control('', { validators: [Validators.required] })
  });

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  protected voterBaseSave() {
    this.isSaving = true;

    const data = this.rf.getRawValue();

    this.isSaving = true;

    const unsub$ = new Subject<void>();

    this.performApi.performApi([
      { action: () => this.voterBaseApi.createVoterBase(data), tag: 'create-voterbase' }
    ], unsub$).subscribe({
      next: (res) => {
        this.isSaving = false;
        if (res[0].error !== null) {
          this.messageService.add({ severity: 'error', summary: '', detail: '' });
        }

        this.messageService.add({ severity: 'success', summary: 'Voter Base Created', detail: '' })

        unsub$.next();
        unsub$.complete();

        this.rf.reset();
        // this.saveCount++;
      }
    });
  }
}
