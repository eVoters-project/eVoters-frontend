import { inject, Injectable } from "@angular/core";
import { ElectionCandidateApiService } from "../../../../service/api";
import { ElectionCandidateInterface } from "../../../../interface";
import { concatMap, Observable, Subject, take, takeUntil } from "rxjs";

@Injectable()
export class ElectionCandidateService {
  private electionCandidateApi = inject(ElectionCandidateApiService);

  private electionPrecinctDataSubject = new Subject<ElectionCandidateInterface[]>;
  private electionCandidateDataRequestSubject = new Subject();
  private electionCandidateDataRequestCancelled = new Subject<boolean>();

  private electionCandidateDataUpdateRequestSubject = new Subject<Partial<ElectionCandidateInterface>>();
  private electionCandidateDataUpdatedSubject = new Subject<boolean>();

  private electionCandidateDataRequestSaveSubject = new Subject<ElectionCandidateInterface>();
  private electionCandidateDataSavedSubject = new Subject<boolean>();

  private electionCandidateDataRequestDeleteSubject = new Subject<string>();
  private electionCandidateDataDeletedSubject = new Subject<boolean>();

  constructor() { }

  onInit() {
    this.setElectionCandidateDataSubscription();
  }

  requestData() {
    this.electionCandidateDataRequestSubject.next(null);
  }

  saveData(barangay: ElectionCandidateInterface) {
    this.electionCandidateDataRequestSaveSubject.next(barangay);
    return this.electionCandidateDataSavedSubject.asObservable();
  }

  updateData(barangay: Partial<ElectionCandidateInterface>) {
    this.electionCandidateDataUpdateRequestSubject.next(barangay);
    return this.electionCandidateDataUpdatedSubject.asObservable();
  }

  deleteData(id: string) {
    this.electionCandidateDataRequestDeleteSubject.next(id);
    return this.electionCandidateDataDeletedSubject.asObservable();
  }

  setElectionCandidateDataSubscription() {
    this.electionCandidateDataRequestSubject.pipe(
      concatMap(() =>
        this.electionCandidateApi.getElectionCandidates().pipe(
          takeUntil(this.electionCandidateDataRequestCancelled),
          take(1)
        )
      )
    )
      .subscribe((res: any) => {
        if (res) {
          this.electionPrecinctDataSubject.next(res.data);
        }
      });

    this.electionCandidateDataRequestSaveSubject
      .pipe(
        concatMap((candidate) =>
          this.electionCandidateApi.createElectionCandidate(candidate)
            .pipe(
              take(1)
            )
        )
      )
      .subscribe(() => {
        this.electionCandidateDataSavedSubject.next(true);
      });

    this.electionCandidateDataUpdateRequestSubject.pipe(
      concatMap((candidate) =>
        this.electionCandidateApi.updateElectionCandidate(candidate)
          .pipe(
            take(1)
          )
      )
    )
      .subscribe((res: any) => {
        if (res) {
          this.electionCandidateDataUpdatedSubject.next(true);
        }
      })

    this.electionCandidateDataRequestDeleteSubject.pipe(
      concatMap((id) =>
        this.electionCandidateApi.deleteElectionCandidate(id)
          .pipe(
            take(1)
          )
      )
    ).subscribe((res: any) => {
      if (res) {
        this.electionCandidateDataDeletedSubject.next(true);
      }
    });
  }

  get electionCandidateData$(): Observable<ElectionCandidateInterface[]> {
    return this.electionPrecinctDataSubject.asObservable();
  }
}
