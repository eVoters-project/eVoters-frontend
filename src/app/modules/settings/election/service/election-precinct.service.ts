import { inject, Injectable } from "@angular/core";
import { ElectionPrecinctInterface } from "../../../../interface";
import { concatMap, Observable, Subject, take, takeUntil } from "rxjs";
import { ElectionPrecinctApiService } from "../../../../service/api";

@Injectable()
export class ElectionPrecinctService {
  private electionPrecinctApi = inject(ElectionPrecinctApiService);

  private electionPrecinctDataSubject = new Subject<ElectionPrecinctInterface[]>;
  private electionPrecinctDataRequestSubject = new Subject();
  private electionPrecinctDataRequestCancelled = new Subject<boolean>();

  private electionPrecinctDataUpdateRequestSubject = new Subject<Partial<ElectionPrecinctInterface>>();
  private electionPrecinctDataUpdatedSubject = new Subject<boolean>();

  private electionPrecinctDataRequestSaveSubject = new Subject<ElectionPrecinctInterface>();
  private electionPrecinctDataSavedSubject = new Subject<boolean>();

  private electionPrecinctDataRequestDeleteSubject = new Subject<string>();
  private electionPrecinctDataDeletedSubject = new Subject<boolean>();

  constructor() { }

  onInit() {
    this.setElectionPrecinctDataSubscription();
  }

  requestData() {
    this.electionPrecinctDataRequestSubject.next(null);
  }

  saveData(barangay: ElectionPrecinctInterface) {
    this.electionPrecinctDataRequestSaveSubject.next(barangay);
    return this.electionPrecinctDataSavedSubject.asObservable();
  }

  updateData(barangay: Partial<ElectionPrecinctInterface>) {
    this.electionPrecinctDataUpdateRequestSubject.next(barangay);
    return this.electionPrecinctDataUpdatedSubject.asObservable();
  }

  deleteData(id: string) {
    this.electionPrecinctDataRequestDeleteSubject.next(id);
    return this.electionPrecinctDataDeletedSubject.asObservable();
  }

  setElectionPrecinctDataSubscription() {
    this.electionPrecinctDataRequestSubject.pipe(
      concatMap(() =>
        this.electionPrecinctApi.getElectionPrecincts().pipe(
          takeUntil(this.electionPrecinctDataRequestCancelled),
          take(1)
        )
      )
    )
      .subscribe((res: any) => {
        if (res) {
          this.electionPrecinctDataSubject.next(res.data);
        }
      });

    this.electionPrecinctDataRequestSaveSubject
      .pipe(
        concatMap((voter) =>
          this.electionPrecinctApi.createElectionPrecinct(voter)
            .pipe(
              take(1)
            )
        )
      )
      .subscribe(() => {
        this.electionPrecinctDataSavedSubject.next(true);
      });

    this.electionPrecinctDataUpdateRequestSubject.pipe(
      concatMap((voter) =>
        this.electionPrecinctApi.updateElectionPrecinct(voter)
          .pipe(
            take(1)
          )
      )
    )
      .subscribe((res: any) => {
        if (res) {
          this.electionPrecinctDataUpdatedSubject.next(true);
        }
      })

    this.electionPrecinctDataRequestDeleteSubject.pipe(
      concatMap((id) =>
        this.electionPrecinctApi.deleteElectionPrecinct(id)
          .pipe(
            take(1)
          )
      )
    ).subscribe((res: any) => {
      if (res) {
        this.electionPrecinctDataDeletedSubject.next(true);
      }
    });
  }

  get electionPrecinctData$(): Observable<ElectionPrecinctInterface[]> {
    return this.electionPrecinctDataSubject.asObservable();
  }
}
