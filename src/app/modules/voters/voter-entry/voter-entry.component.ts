import { Component, inject, OnInit } from '@angular/core';
import { Gender, Status, VoterStatus } from '../../../data';
import { VoterService } from '../service/voter.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { catchError, delay, Subject, throwError } from 'rxjs';
import { format } from 'date-fns';
import { PerformApiService } from '../../../service';
import { BarangayApiService, GroupTypeApiService, PurokApiService, VoterApiService } from '../../../service/api';
import { MessageService } from 'primeng/api';

interface BarangayInterface {
  id: string;
  name: string;
}

interface PurokInterface {
  id: string;
  name: string;
}

interface GroupTypeInterface {
  id: string;
  name: string;
}

@Component({
  selector: 'app-voter-entry',
  templateUrl: './voter-entry.component.html',
  styleUrl: './voter-entry.component.scss',
  providers: [PerformApiService, BarangayApiService, PurokApiService, GroupTypeApiService, VoterApiService]
})
export class VoterEntryComponent implements OnInit {

  // injectables
  private performApi = inject(PerformApiService);
  private barangayApi = inject(BarangayApiService);
  private purokApi = inject(PurokApiService);
  private grouptypeApi = inject(GroupTypeApiService);
  protected dialog = inject(DynamicDialogRef);
  protected fb = inject(FormBuilder);
  private voterApi = inject(VoterApiService);
  private messageService = inject(MessageService);

  // data
  barangays: BarangayInterface[] = [];
  puroks: PurokInterface[] = [];
  groupTypes: GroupTypeInterface[] = [];
  genders = Gender;
  status = Status;

  // forms
  rf: FormGroup = this.fb.group({
    firstname: this.fb.control('', { validators: [Validators.required] }),
    middlename: this.fb.control(''),
    lastname: this.fb.control('', { validators: [Validators.required] }),
    nickname: this.fb.control(''),
    gender: this.fb.control('', { validators: [Validators.required] }),
    date_of_birth: this.fb.control('', { validators: [Validators.required] }),
    mobile_no: this.fb.control('', { validators: [Validators.required] }),
    address: this.fb.control(''),
    barangay: this.fb.control(''),
    purok: this.fb.control(''),
    precinct_no: this.fb.control(''),
    vin_no: this.fb.control(''),
    status: this.fb.control('', { validators: [Validators.required] }),
    category: this.fb.control(''),
    vote_group: this.fb.control(''),
    vote_type: this.fb.control(''),
    vote_status: this.fb.control(''),
    longitude: this.fb.control(''),
    latitude: this.fb.control(''),
    verified_voter: this.fb.control(false),
    confirmed_leader: this.fb.control(false),
    unassigned_voter: this.fb.control(true),
  });

  // props
  protected isLoading = true;
  protected isSaving = false;

  // constructor
  constructor() { }

  ngOnInit(): void {
    const unsub$ = new Subject<void>();
    this.performApi.performApi([
      { action: () => this.barangayApi.getBarangays(), tag: 'barangays' },
      { action: () => this.purokApi.getPuroks(), tag: 'puroks' },
      { action: () => this.grouptypeApi.getGroupTypes(), tag: 'group-types' }
    ], unsub$).subscribe({
      next: ((res) => {
        this.isLoading = false;
        this.barangays = res.find(r => r.tag === "barangays")?.result?.data.map((d: any) => { return { id: d.id, name: d.name } });
        this.puroks = res.find(r => r.tag === "puroks")?.result?.data.map((d: any) => { return { id: d.id, name: d.name } });
        this.groupTypes = res.find(r => r.tag === "group-types")?.result?.data.map((d: any) => { return { id: d.id, name: d.name } });
        unsub$.next();
        unsub$.complete();
      })
    });
  }

  // methods
  protected voterSave() {
    this.isSaving = true;

    const data = this.rf.getRawValue();
    data.date_of_birth = format(data.date_of_birth, 'yyyy-MM-dd');
    data.mobile_no = data.mobile_no.replace(/-/g, '');

    this.isSaving = true; console.log(data);

    const unsub$ = new Subject<void>();

    this.performApi.performApi([
      { action: () => this.voterApi.createVoter(data), tag: 'create-voter' }
    ], unsub$).subscribe({
      next: (res) => {
        this.isSaving = false;
        if (res[0].error !== null) {
          this.messageService.add({ severity: 'error', summary: '', detail: '' });
        }

        this.messageService.add({ severity: 'success', summary: 'Voter Created', detail: '' })

        unsub$.next();
        unsub$.complete();

        this.rf.reset();
        // this.saveCount++;
      }
    });
  }

}
