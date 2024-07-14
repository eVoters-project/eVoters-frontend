import { Component, inject } from '@angular/core';
import { Gender, VoterStatus } from '../../../data';
import { VoterService } from '../service/voter.service';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  voterStatus = VoterStatus;

  // forms
  rf: FormGroup = this.fb.group({
    firstname: '',
    middlename: '',
    lastname: '',
    nickname: '',
    gender: '',
    date_of_birth: '',
    address: '',
    precinct_no: '',
    vin_no: '',
    status: '',
    category: '',
    vote_group: '',
    vote_type: '',
    vote_status: '',
    longitude: '',
    latitude: '',
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
