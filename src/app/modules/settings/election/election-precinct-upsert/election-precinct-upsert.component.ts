import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PerformApiService } from '../../../../service';
import { MessageService } from 'primeng/api';
import { BarangayApiService, ElectionPrecinctApiService } from '../../../../service/api';
import { Subject } from 'rxjs';
import { BarangayInterface } from '../../../../interface';

@Component({
  selector: 'app-election-precinct-upsert',
  templateUrl: './election-precinct-upsert.component.html',
  styleUrl: './election-precinct-upsert.component.scss',
  providers: [
    PerformApiService,
    ElectionPrecinctApiService,
    BarangayApiService
  ]
})
export class ElectionPrecinctUpsertComponent {
  private fb = inject(FormBuilder);
  private performApi = inject(PerformApiService);
  private electionPositionApi = inject(ElectionPrecinctApiService);
  private areaBarangayApi = inject(BarangayApiService);
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
    cluster: this.fb.control(0, { validators: [Validators.required] }),
    sub_cluster: this.fb.control('', { validators: [Validators.required] }),
    polling_center: this.fb.control(''),
    area_barangay: this.fb.control(''),
    status: this.fb.control('Active')
  });

  barangays: BarangayInterface[] = [];

  constructor() { }

  ngOnInit(): void {
    const unsub$ = new Subject<void>();
    this.performApi.performApi([
      { action: () => this.areaBarangayApi.getBarangays(), tag: 'barangays' }
    ], unsub$).subscribe({
      next: ((res) => {
        this.isLoading = false;
        this.barangays = res.find(r => r.tag === "barangays")?.result?.data.map((d: any) => { return { id: d.id, name: d.name } });
        unsub$.next();
        unsub$.complete();
      })
    });
  }

  protected electionPrecinctSave() {
    this.isSaving = true;

    const data = this.rf.getRawValue();

    this.isSaving = true;

    const unsub$ = new Subject<void>();

    this.performApi.performApi([
      { action: () => this.electionPositionApi.createElectionPrecinct(data), tag: 'create-electionprecinct' }
    ], unsub$).subscribe({
      next: (res) => {
        this.isSaving = false;
        if (res[0].error !== null) {
          this.messageService.add({ severity: 'error', summary: '', detail: '' });
        }

        this.messageService.add({ severity: 'success', summary: 'Election Precinct Created', detail: '' })

        unsub$.next();
        unsub$.complete();

        this.rf.reset({
          sequence: 0,
          code: '',
          cluster: 0,
          sub_cluster: '',
          polling_center: '',
          status: 'Active'
        });
        // this.saveCount++;
      }
    });
  }
}
