import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { BarangayInterface } from '../../../../interface';
import { PerformApiService } from '../../../../service';
import { BarangayApiService, PurokApiService } from '../../../../service/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-jurisdiction-purok-upsert',
  templateUrl: './jurisdiction-purok-upsert.component.html',
  styleUrl: './jurisdiction-purok-upsert.component.scss',
  providers: [PerformApiService, BarangayApiService, PurokApiService]
})
export class JurisdictionPurokUpsertComponent implements OnInit {

  private fb = inject(FormBuilder);
  private performApi = inject(PerformApiService);
  private barangayApi = inject(BarangayApiService);
  private purokApi = inject(PurokApiService);
  private messageService = inject(MessageService);

  protected PUROK_STATUS = [
    'Active',
    'Inactive'
  ]
  protected isLoading = true;
  protected isSaving = false;

  protected rf = this.fb.group({
    code: this.fb.control(''),
    name: this.fb.control('', { validators: [Validators.required] }),
    area_barangay: this.fb.control('', { validators: [Validators.required] }),
    status: this.fb.control('Active')
  });

  barangays: BarangayInterface[] = [];

  constructor() { }

  ngOnInit(): void {
    const unsub$ = new Subject<void>();
    this.performApi.performApi([
      { action: () => this.barangayApi.getBarangays(), tag: 'barangays' }
    ], unsub$).subscribe({
      next: ((res) => {
        this.isLoading = false;
        this.barangays = res.find(r => r.tag === "barangays")?.result?.data.map((d: any) => { return { id: d.id, name: d.name } });
        unsub$.next();
        unsub$.complete();
      })
    });
  }

  protected purokSave() {
    this.isSaving = true;

    const data = this.rf.getRawValue();

    this.isSaving = true;

    const unsub$ = new Subject<void>();

    this.performApi.performApi([
      { action: () => this.purokApi.createPurok(data), tag: 'create-purok' }
    ], unsub$).subscribe({
      next: (res) => {
        this.isSaving = false;
        if (res[0].error !== null) {
          this.messageService.add({ severity: 'error', summary: '', detail: '' });
        }

        this.messageService.add({ severity: 'success', summary: 'Purok Created', detail: '' })

        unsub$.next();
        unsub$.complete();

        this.rf.reset();
        // this.saveCount++;
      }
    });
  }
}
