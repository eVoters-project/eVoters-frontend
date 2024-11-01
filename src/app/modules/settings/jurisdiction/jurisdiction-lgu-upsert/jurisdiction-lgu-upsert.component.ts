import { Component, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { ProvinceInterface } from '../../../../interface';
import { FormBuilder, Validators } from '@angular/forms';
import { PerformApiService } from '../../../../service';
import { LGUApiService, ProvinceApiService } from '../../../../service/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-jurisdiction-lgu-upsert',
  templateUrl: './jurisdiction-lgu-upsert.component.html',
  styleUrl: './jurisdiction-lgu-upsert.component.scss',
  providers: [
    PerformApiService,
    LGUApiService,
    ProvinceApiService
  ]
})
export class JurisdictionLguUpsertComponent {
  private fb = inject(FormBuilder);
  private performApi = inject(PerformApiService);
  private lguApi = inject(LGUApiService);
  private provinceApi = inject(ProvinceApiService);
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
    area_province: this.fb.control('', { validators: [Validators.required] }),
    status: this.fb.control('Active')
  });

  provinces: ProvinceInterface[] = [];

  constructor() { }

  ngOnInit(): void {
    const unsub$ = new Subject<void>();
    this.performApi.performApi([
      { action: () => this.provinceApi.getProvinces(), tag: 'provinces' }
    ], unsub$).subscribe({
      next: ((res) => {
        this.isLoading = false;
        this.provinces = res.find(r => r.tag === "provinces")?.result?.data.map((d: any) => { return { id: d.id, name: d.name } });
        unsub$.next();
        unsub$.complete();
      })
    });
  }

  protected lguSave() {
    this.isSaving = true;

    const data = this.rf.getRawValue();

    this.isSaving = true;

    const unsub$ = new Subject<void>();

    this.performApi.performApi([
      { action: () => this.lguApi.createLGU(data), tag: 'create-lgu' }
    ], unsub$).subscribe({
      next: (res) => {
        this.isSaving = false;
        if (res[0].error !== null) {
          this.messageService.add({ severity: 'error', summary: '', detail: '' });
        }

        this.messageService.add({ severity: 'success', summary: 'LGU Created', detail: '' })

        unsub$.next();
        unsub$.complete();

        this.rf.reset();
        // this.saveCount++;
      }
    });
  }
}
