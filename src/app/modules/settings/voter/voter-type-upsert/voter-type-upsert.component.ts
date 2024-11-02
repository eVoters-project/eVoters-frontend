import { Component, inject } from '@angular/core';
import { PerformApiService } from '../../../../service';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { VoterTypeApiService } from '../../../../service/api';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-voter-type-upsert',
  templateUrl: './voter-type-upsert.component.html',
  styleUrl: './voter-type-upsert.component.scss',
  providers: [
    PerformApiService,
    VoterTypeApiService
  ]
})
export class VoterTypeUpsertComponent {
  private fb = inject(FormBuilder);
  private performApi = inject(PerformApiService);
  private voterTypeApi = inject(VoterTypeApiService);
  private messageService = inject(MessageService);

  protected VOTER_TYPE_STATUS = [
    'Active',
    'Inactive'
  ]
  protected isLoading = true;
  protected isSaving = false;

  protected rf = this.fb.group({
    code: this.fb.control(''),
    description: this.fb.control('', { validators: [Validators.required] }),
    status: this.fb.control('Active')
  });

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  protected voterTypeSave() {
    this.isSaving = true;

    const data = this.rf.getRawValue();

    this.isSaving = true;

    const unsub$ = new Subject<void>();

    this.performApi.performApi([
      { action: () => this.voterTypeApi.createVoterType(data), tag: 'create-votertype' }
    ], unsub$).subscribe({
      next: (res) => {
        this.isSaving = false;
        if (res[0].error !== null) {
          this.messageService.add({ severity: 'error', summary: '', detail: '' });
        }

        this.messageService.add({ severity: 'success', summary: 'Voter Typed Created', detail: '' })

        unsub$.next();
        unsub$.complete();

        this.rf.reset();
        // this.saveCount++;
      }
    });
  }
}
