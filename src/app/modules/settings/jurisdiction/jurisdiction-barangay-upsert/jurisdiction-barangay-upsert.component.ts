import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LGUInterface } from '../../../../interface';
import { PerformApiService } from '../../../../service';
import { BarangayApiService, LGUApiService } from '../../../../service/api';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-jurisdiction-barangay-upsert',
  templateUrl: './jurisdiction-barangay-upsert.component.html',
  styleUrl: './jurisdiction-barangay-upsert.component.scss',
  providers: [PerformApiService, BarangayApiService, LGUApiService]
})
export class JurisdictionBarangayUpsertComponent implements OnInit {

  private fb = inject(FormBuilder);
  private performApi = inject(PerformApiService);
  private barangayApi = inject(BarangayApiService);
  private lguApi = inject(LGUApiService);
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
    area_lgu: this.fb.control('', { validators: [Validators.required] }),
    status: this.fb.control('Active')
  });

  lgus: LGUInterface[] = [];

  constructor() { }

  ngOnInit(): void {
    const unsub$ = new Subject<void>();
    this.performApi.performApi([
      { action: () => this.lguApi.getLGUs(), tag: 'lgus' }
    ], unsub$).subscribe({
      next: ((res) => {
        this.isLoading = false;
        this.lgus = res.find(r => r.tag === "lgus")?.result?.data.map((d: any) => { return { id: d.id, name: d.name } });
        unsub$.next();
        unsub$.complete();
      })
    });
  }

  barangaySave() {
    this.isSaving = true;

    const data = this.rf.getRawValue();

    this.isSaving = true;

    const unsub$ = new Subject<void>();

    this.performApi.performApi([
      { action: () => this.barangayApi.createBarangay(data), tag: 'create-barangay' }
    ], unsub$).subscribe({
      next: (res) => {
        this.isSaving = false;
        if (res[0].error !== null) {
          this.messageService.add({ severity: 'error', summary: '', detail: '' });
        }

        this.messageService.add({ severity: 'success', summary: 'Barangay Created', detail: '' })

        unsub$.next();
        unsub$.complete();

        this.rf.reset();
        // this.saveCount++;
      }
    });
  }

}
