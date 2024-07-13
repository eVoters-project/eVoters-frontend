import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { VoterColumns } from '../data/voter.column';
import { Gender } from '../../../data';
import { FormBuilder, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { VoterApiService } from '../../../service/api';
import { HttpUltils } from '../../../utils/http';
import { VoterInterface } from '../../../interface';
import { VoterService } from '../service/voter.service';
import { debounce, debounceTime, delay, Subscription, tap } from 'rxjs';
import { DialogService } from 'primeng/dynamicdialog';
import { VoterFindCoordinatesComponent } from '../voter-find-coordinates/voter-find-coordinates.component';
import { getVoterFullname } from './helpers';

@Component({
  selector: 'ev-voters-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss',
  providers: [VoterService, VoterApiService, DialogService]
})
export class IndexComponent implements OnInit, OnDestroy {

  fb = inject(FormBuilder);
  protected voterService = inject(VoterService);
  private dialogService = inject(DialogService);

  arr_subs = new Array<Subscription>();

  genders = Gender;

  voters!: VoterInterface[];
  voter!: VoterInterface;

  cols = VoterColumns;

  isLoading = false;
  addVoterSidebarVisible = false;

  protected gridMenus = [
    {
      label: 'Voter Actions',
      items: [
        {
          label: 'Set Coordinates',
          icon: 'pi pi-map-marker',
          command: () => this.findCoordinates()
        }
      ]
    }
  ]

  rf: FormGroup = this.fb.group({
    firstname: 'Ranel',
    middlename: 'L',
    lastname: 'Parba',
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

  constructor() {
    this.voterService.onInit();
  }

  ngOnInit(): void {
    this.arr_subs.push(
      this.voterDataSubscription()
    );
    this.voterService.requestData();
  }

  ngOnDestroy(): void {
    this.arr_subs.forEach(sub => {
      sub.unsubscribe();
    });
  }

  private voterDataSubscription(): Subscription {
    return this.voterService.voterData$.
      pipe(
        tap(() => {
          this.voters = [];
          this.isLoading = true
        }),
        delay(500),
        debounceTime(1000)
      )
      .subscribe((data) => {
        this.voters = data;
        this.isLoading = false;
      })
  }

  private findCoordinates() {
    const ref = this.dialogService
      .open(VoterFindCoordinatesComponent, {
        data: {
          id: this.voter.id,
          name: getVoterFullname(this.voter)
        },
        header: 'Find and Set Voter Coordinates',
        width: '80rem',
        height: '55rem'
      });
  }

}
