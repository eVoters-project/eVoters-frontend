import { Component, inject } from '@angular/core';
import { Gender, Status, VoterStatus } from '../../../data';
import { VoterService } from '../service/voter.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { catchError, delay, throwError } from 'rxjs';
import { format } from 'date-fns';

@Component({
  selector: 'app-voter-entry',
  templateUrl: './voter-entry.component.html',
  styleUrl: './voter-entry.component.scss'
})
export class VoterEntryComponent {

  // injectables
  dialog = inject(DynamicDialogRef);
  fb = inject(FormBuilder);
  protected voterService = inject(VoterService);

  // data
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
    address: this.fb.control(''),
    precinct_no: this.fb.control(''),
    vin_no: this.fb.control(''),
    status: this.fb.control(''),
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
  protected isLoading = false;

  // constructor
  constructor() { }

  // methods
  protected voterSave() {
    this.isLoading = true;

    const data = this.rf.getRawValue();
    data.date_of_birth = format(data.date_of_birth, 'yyyy-MM-dd');
    this.voterService.saveData(data)
      .pipe(
        delay(500),
        catchError((err) => {
          this.isLoading = false;
          return throwError(err);
        })
      )
      .subscribe((res) => {
        if (res) {
          this.isLoading = false;
          this.dialog.close({
            yeah: true
          })
        }
      })
  }

}
