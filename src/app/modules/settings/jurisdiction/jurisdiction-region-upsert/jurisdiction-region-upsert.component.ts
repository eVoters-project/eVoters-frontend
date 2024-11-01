import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RegionApiService } from '../../../../service/api';
import { MessageService } from 'primeng/api';
import { PerformApiService } from '../../../../service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-jurisdiction-region-upsert',
  templateUrl: './jurisdiction-region-upsert.component.html',
  styleUrl: './jurisdiction-region-upsert.component.scss',
  providers: [
    PerformApiService,
    RegionApiService
  ]
})
export class JurisdictionRegionUpsertComponent {
  private fb = inject(FormBuilder);
  private performApi = inject(PerformApiService);
  private regionApi = inject(RegionApiService);
  private messageService = inject(MessageService);

  protected JURISDICTION_STATUS = [
    'Active',
    'Inactive'
  ]
  protected isLoading = true;
  protected isSaving = false;

  protected rf = this.fb.group({
    code: this.fb.control(''),
    name: this.fb.control('', { validators: [Validators.required] }),
    status: this.fb.control('Active')
  });

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  protected provinceSave() {
    this.isSaving = true;

    const data = this.rf.getRawValue();

    this.isSaving = true;

    const unsub$ = new Subject<void>();

    this.performApi.performApi([
      { action: () => this.regionApi.createRegion(data), tag: 'create-region' }
    ], unsub$).subscribe({
      next: (res) => {
        this.isSaving = false;
        if (res[0].error !== null) {
          this.messageService.add({ severity: 'error', summary: '', detail: '' });
        }

        this.messageService.add({ severity: 'success', summary: 'Region Created', detail: '' })

        unsub$.next();
        unsub$.complete();

        this.rf.reset();
        // this.saveCount++;
      }
    });
  }
}
