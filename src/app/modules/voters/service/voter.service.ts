import { inject, Injectable } from "@angular/core";
import { VoterApiService } from "../../../service/api";
import { concatMap, Observable, Subject, take, takeUntil } from "rxjs";
import { VoterInterface } from "../../../interface";

@Injectable()
export class VoterService {

  private voterApi = inject(VoterApiService);

  private voterDataSubject = new Subject<VoterInterface[]>;
  private voterDataRequestSubject = new Subject();
  private voterDataRequestCancelled = new Subject<boolean>();

  constructor() { }

  onInit() {
    this.setVoterDataSubscription();
  }

  requestData() {
    this.voterDataRequestSubject.next(null);
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
      })
  }

  get voterData$(): Observable<VoterInterface[]> {
    return this.voterDataSubject.asObservable();
  }

}
