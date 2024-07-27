import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { VoterColumns } from '../data/voter.column';
import { FormBuilder, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { VoterApiService } from '../../../service/api';
import { HttpUltils } from '../../../utils/http';
import { VoterInterface } from '../../../interface';
import { VoterService } from '../service/voter.service';
import { debounce, debounceTime, delay, Subscription, tap } from 'rxjs';
import { DialogService } from 'primeng/dynamicdialog';
import { VoterFindCoordinatesComponent } from '../voter-find-coordinates/voter-find-coordinates.component';
import { getVoterFullname } from './helpers';
import { VoterEntryComponent } from '../voter-entry/voter-entry.component';
import { PrimeIcons } from 'primeng/api';

@Component({
  selector: 'ev-voters-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent implements OnInit, OnDestroy {

  protected voterService = inject(VoterService);
  private dialogService = inject(DialogService);

  arr_subs = new Array<Subscription>();

  voters!: VoterInterface[];
  voter!: VoterInterface;

  cols = VoterColumns;

  isLoading = false;
  addVoterSidebarVisible = false;

  protected gridContextMenus = [
    {
      label: 'Set Coordinates',
      icon: 'pi pi-map-marker',
      command: () => this.findCoordinates(this.voter)
    },
    {
      label: 'Delete',
      icon: PrimeIcons.TRASH,
      command: () => this.voterDelete()
    }
  ]

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

  private findCoordinates(voter: VoterInterface) {
    const ref = this.dialogService
      .open(VoterFindCoordinatesComponent, {
        data: {
          id: voter.id,
          name: getVoterFullname(voter)
        },
        header: 'Find and Set Voter Coordinates',
        width: '80rem',
        height: '55rem'
      });
  }

  protected voterEntry() {
    const ref = this.dialogService
      .open(VoterEntryComponent, {
        header: 'New Voter',
        footer: ' ',
        position: 'right',
        contentStyle: { overflow: 'auto' },
        modal: true,
        width: '45rem',
        height: 'calc(100vh - 100px)'
      })
  }

  private voterDelete() {

  }

  protected getVoteStatus(status: string) {
    switch (status.toUpperCase()) {
      case 'ACTIVE':
        return 'success';
      default:
        return 'warning'
    }
  }

  protected getVoterLatLngInvalid(voter: VoterInterface) {

    const { latitude, longitude } = voter;

    if (!latitude && !longitude) {
      return true;
    }

    return false

  }

}
