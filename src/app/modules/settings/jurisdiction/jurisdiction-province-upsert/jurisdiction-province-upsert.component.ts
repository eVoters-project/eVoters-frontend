import { Component, inject } from '@angular/core';
import { RegionInterface } from '../../../../interface';
import { Subject } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { PerformApiService } from '../../../../service';
import { ProvinceApiService, RegionApiService } from '../../../../service/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-jurisdiction-province-upsert',
  templateUrl: './jurisdiction-province-upsert.component.html',
  styleUrl: './jurisdiction-province-upsert.component.scss',
  providers: [
    PerformApiService,
    ProvinceApiService,
    RegionApiService
  ]
})
export class JurisdictionProvinceUpsertComponent {
  private fb = inject(FormBuilder);
  private performApi = inject(PerformApiService);
  private provinceApi = inject(ProvinceApiService);
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
    area_region: this.fb.control('', { validators: [Validators.required] }),
    status: this.fb.control('Active')
  });

  regions: RegionInterface[] = [];

  constructor() { }

  ngOnInit(): void {
    const unsub$ = new Subject<void>();
    this.performApi.performApi([
      { action: () => this.regionApi.getRegions(), tag: 'regions' }
    ], unsub$).subscribe({
      next: ((res) => {
        this.isLoading = false;
        this.regions = res.find(r => r.tag === "regions")?.result?.data.map((d: any) => { return { id: d.id, name: d.name } });
        unsub$.next();
        unsub$.complete();
      })
    });
  }

  protected provinceSave() {
    this.isSaving = true;

    const data = this.rf.getRawValue();

    this.isSaving = true;

    const unsub$ = new Subject<void>();

    this.performApi.performApi([
      { action: () => this.provinceApi.createProvince(data), tag: 'create-province' }
    ], unsub$).subscribe({
      next: (res) => {
        this.isSaving = false;
        if (res[0].error !== null) {
          this.messageService.add({ severity: 'error', summary: '', detail: '' });
        }

        this.messageService.add({ severity: 'success', summary: 'Province Created', detail: '' })

        unsub$.next();
        unsub$.complete();

        this.rf.reset();
        // this.saveCount++;
      }
    });
  }
}
