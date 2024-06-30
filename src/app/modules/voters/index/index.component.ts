import { Component, OnInit, inject } from '@angular/core';
import { VoterColumns } from '../data/voter.column';
import { Gender } from '../../../data';
import { FormBuilder, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { VoterApiService } from '../../../service/api';
import { HttpUltils } from '../../../utils/http';
import { VoterInterface } from '../../../interface';

@Component({
  selector: 'ev-voters-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss',
  providers: [VoterApiService]
})
export class IndexComponent implements OnInit {

  // data = new HttpUltils<VoterInterface>();
  fb = inject(FormBuilder);
  voterApi = inject(VoterApiService);

  genders = Gender;

  cols = VoterColumns;
  voters!: VoterInterface[];
  isLoading = false;
  addVoterSidebarVisible = false;

  rf: FormGroup = this.fb.group({
    firstname: 'Ranel',
    middlename: 'L',
    lastname: 'Parba',
    nickname: '',
    gender: '',
    date_of_birth:'',
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
  })

  constructor() {}

  ngOnInit(): void {

    this.voterApi.getVoters().subscribe((data: any) => {
      console.log(data);
      this.voters = data.data as VoterInterface[];
    })

  }

  submit() {

  }
}
