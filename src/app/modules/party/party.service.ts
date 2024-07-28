import { inject, Injectable } from '@angular/core';
import { PartyInterface } from '../../interface';
import { concatMap, Observable, Subject, take, takeUntil } from 'rxjs';
import { PartyApiService } from '../../service/api';

@Injectable()
export class PartyService {

  private partyApi = inject(PartyApiService);

  private partyDataSubject = new Subject<PartyInterface[]>;
  private partyDataRequestSubject = new Subject();
  private partyDataRequestCancelled = new Subject<boolean>();

  private partyDataUpdateRequestSubject = new Subject<Partial<PartyInterface>>();
  private partyDataUpdatedSubject = new Subject<boolean>();

  private partyDataRequestSaveSubject = new Subject<PartyInterface>();
  private partyDataSavedSubject = new Subject<boolean>();

  constructor() { }

  onInit() {
    this.setPartyDataSubscription();
  }

  requestData() {
    this.partyDataRequestSubject.next(null);
  }

  saveData(voter: PartyInterface) {
    this.partyDataRequestSaveSubject.next(voter);
    return this.partyDataSavedSubject.asObservable();
  }

  updateData(voter: Partial<PartyInterface>) {
    this.partyDataUpdateRequestSubject.next(voter);
    return this.partyDataUpdatedSubject.asObservable();
  }

  setPartyDataSubscription() {
    this.partyDataRequestSubject.pipe(
      concatMap(() =>
        this.partyApi.getAll().pipe(
          takeUntil(this.partyDataRequestCancelled),
          take(1)
        )
      )
    )
      .subscribe((res: any) => {
        if (res) {
          this.partyDataSubject.next(res.data);
        }
      });

    this.partyDataRequestSaveSubject
      .pipe(
        concatMap((party) =>
          this.partyApi.create(party)
            .pipe(
              take(1)
            )
        )
      )
      .subscribe(() => {
        this.partyDataSavedSubject.next(true);
      });

    this.partyDataUpdateRequestSubject.pipe(
      concatMap((party) =>
        this.partyApi.update(party)
          .pipe(
            take(1)
          )
      )
    )
      .subscribe((res: any) => {
        if (res) {
          this.partyDataUpdatedSubject.next(true);
        }
      })
  }

  get partyData$(): Observable<PartyInterface[]> {
    return this.partyDataSubject.asObservable();
  }

}
