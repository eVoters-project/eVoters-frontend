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

  constructor() { }

  onInit() {
    this.setVoterDataSubscription();
  }

  requestData() {
    this.voterDataRequestSubject.next(null);
  }

  updateData(voter: Partial<VoterInterface>) {
    this.voterDataUpdateRequestSubject.next(voter);
    return this.getVoterDataUpdated$;
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

  get getVoterDataUpdated$(): Observable<boolean> {
    return this.voterDataUpdatedSubject.asObservable();
  }

}
