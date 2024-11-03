import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PerformApiService } from '../../../../service';
import { ElectionPositionApiService } from '../../../../service/api';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-election-position-upsert',
  templateUrl: './election-position-upsert.component.html',
  styleUrl: './election-position-upsert.component.scss',
  providers: [
    PerformApiService,
    ElectionPositionApiService
  ]
})
export class ElectionPositionUpsertComponent {
  private fb = inject(FormBuilder);
  private performApi = inject(PerformApiService);
  private electionPositionApi = inject(ElectionPositionApiService);
  private messageService = inject(MessageService);

  protected ELECTIVE_POSITION_STATUS = [
    'Active',
    'Inactive'
  ]
  protected isLoading = true;
  protected isSaving = false;

  protected rf = this.fb.group({
    sequence: this.fb.control(0),
    code: this.fb.control(''),
    name: this.fb.control('', { validators: [Validators.required] }),
    description: this.fb.control(''),
    status: this.fb.control('Active')
  });

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  protected electionPositionSave() {
    this.isSaving = true;

    const data = this.rf.getRawValue();

    this.isSaving = true;

    const unsub$ = new Subject<void>();

    this.performApi.performApi([
      { action: () => this.electionPositionApi.createElectionPosition(data), tag: 'create-electionposition' }
    ], unsub$).subscribe({
      next: (res) => {
        this.isSaving = false;
        if (res[0].error !== null) {
          this.messageService.add({ severity: 'error', summary: '', detail: '' });
        }

        this.messageService.add({ severity: 'success', summary: 'Election Position Created', detail: '' })

        unsub$.next();
        unsub$.complete();

        this.rf.reset();
        // this.saveCount++;
      }
    });
  }
}
