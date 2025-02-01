import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PerformApiService } from '../../../../../service';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { PositionApiService } from '../../../../../service/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-settings-general-position-upsert',
  templateUrl: './upsert.component.html',
  styleUrl: './upsert.component.scss',
  providers: [
    PerformApiService,
    PositionApiService
  ]
})
export class UpsertComponent implements OnInit {
  private fb = inject(FormBuilder);
    private performApi = inject(PerformApiService);
    private messageService = inject(MessageService);
    private positionApiService = inject(PositionApiService);
    private dynamicDialogService = inject(DynamicDialogRef);
  
    protected POSITION_STATUS = [
      'Active',
      'Inactive'
    ]

    protected POSITION_LEVEL = [
      'National',
      'Local'
    ];

    protected ELECTION_CYCLE = [
      'Presidential',
      'Midterm'
    ];

    protected isLoading = true;
    protected isSaving = false;
  
    protected rf = this.fb.group({
      sequence: this.fb.control<number | null | undefined>(1),
      code: this.fb.control(''),
      name: this.fb.control('', { validators: [Validators.required] }),
      description: this.fb.control(''),
      level: this.fb.control('', { validators: [Validators.required] }),
      election_cycle: this.fb.control('', { validators: [Validators.required] }),
      type: this.fb.control(''),
      status: this.fb.control('Active'),
    });
  
    constructor() { }
  
    ngOnInit(): void {
      setTimeout(() => {
        this.isLoading = false;
      }, 500);
    }
  
    protected positionSave() {
      this.isSaving = true;
  
      const data = this.rf.getRawValue();
  
      this.isSaving = true;
  
      const unsub$ = new Subject<void>();
  
      this.performApi.performApi([
        { action: () => this.positionApiService.createPosition(data), tag: 'create-position' }
      ], unsub$).subscribe({
        next: (res) => {
          this.isSaving = false;
          if (res[0].error !== null) {
            this.messageService.add({ severity: 'error', summary: '', detail: '' });
          }
  
          this.messageService.add({ severity: 'success', summary: 'Position Created', detail: '' })
  
          unsub$.next();
          unsub$.complete();

          // auto close this dialog
          this.dynamicDialogService.close();
        }
      });
    }
}
