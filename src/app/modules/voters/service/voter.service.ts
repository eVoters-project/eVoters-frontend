import { inject, Injectable } from "@angular/core";
import { VoterApiService } from "../../../service/api";
import { catchError, concatMap, EMPTY, Observable, Subject, take, takeUntil, throwError } from "rxjs";
import { VoterInterface } from "../../../interface";

@Injectable()
export class VoterService {

  private voterApi = inject(VoterApiService);

  private voterDataSubject = new Subject<VoterInterface[]>;
  private voterDataRequestSubject = new Subject();
  private voterDataRequestCancelled = new Subject<boolean>();

  private voterDataUpdateRequestSubject = new Subject<Partial<VoterInterface>>();
  private voterDataUpdatedSubject = new Subject<boolean>();

  private voterDataRequestSaveSubject = new Subject<VoterInterface>();
  private voterDataSavedSubject = new Subject<boolean>();

  constructor() { }

  onInit() {
    this.setVoterDataSubscription();
  }

  requestData() {
    this.voterDataRequestSubject.next(null);
  }

  saveData(voter: VoterInterface) {
    this.voterDataRequestSaveSubject.next(voter);
    return this.voterDataSavedSubject.asObservable();
  }

  updateData(voter: Partial<VoterInterface>) {
    this.voterDataUpdateRequestSubject.next(voter);
    return this.voterDataUpdatedSubject.asObservable();
  }

  setVoterDataSubscription() {
    this.voterDataRequestSubject.pipe(
      concatMap(() =>
        this.voterApi.getVoters().pipe(
          takeUntil(this.voterDataRequestCancelled),
          take(1)
        )
      )
    )
      .subscribe((res: any) => {
        if (res) {
          this.voterDataSubject.next(res.data);
        }
      });

    this.voterDataRequestSaveSubject
      .pipe(
        concatMap((voter) =>
          this.voterApi.createVoter(voter)
            .pipe(
              take(1)
            )
        )
      )
      .subscribe(() => {
        this.voterDataSavedSubject.next(true);
      });

    this.voterDataUpdateRequestSubject.pipe(
      concatMap((voter) =>
        this.voterApi.updateVoter(voter)
          .pipe(
            take(1)
          )
      )
    )
      .subscribe((res: any) => {
        if (res) {
          this.voterDataUpdatedSubject.next(true);
        }
      })
  }

  get voterData$(): Observable<VoterInterface[]> {
    return this.voterDataSubject.asObservable();
  }

}
