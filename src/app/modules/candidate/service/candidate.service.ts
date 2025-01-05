import { inject, Injectable } from "@angular/core";
import { CandidateApiService } from "../../../service/api";
import { concatMap, Observable, Subject, take, takeUntil } from "rxjs";
import { CandidateInterface, RequestElectionCandidateInterface } from "../../../interface";

@Injectable()
export class CandidateService {
  private candidateApi = inject(CandidateApiService);

  private candidateDataSubject = new Subject<CandidateInterface[]>();
  private candidateDataRequestSubject = new Subject<RequestElectionCandidateInterface | null>();
  private candidateDataRequestCancelled = new Subject<boolean>();

  private candidateDataUpdateRequestSubject = new Subject<Partial<CandidateInterface>>();
  private candidateDataUpdatedSubject = new Subject<boolean>();

  private candidateDataRequestSaveSubject = new Subject<CandidateInterface>();
  private candidateDataSavedSubject = new Subject<boolean>();

  private candidateDataRequestDeleteSubject = new Subject<string>();
  private candidateDataDeletedSubject = new Subject<boolean>();

  constructor() { }

  onInit() {
    this.setCandidateDataSubscription();
  }

  requestData(payload: RequestElectionCandidateInterface | null) {
    this.candidateDataRequestSubject.next(payload);
  }

  saveData(leader: CandidateInterface) {
    this.candidateDataRequestSaveSubject.next(leader);
    return this.candidateDataSavedSubject.asObservable();
  }

  updateData(leader: Partial<CandidateInterface>) {
    this.candidateDataUpdateRequestSubject.next(leader);
    return this.candidateDataUpdatedSubject.asObservable();
  }

  deleteData(id: string) {
    this.candidateDataRequestDeleteSubject.next(id);
    return this.candidateDataDeletedSubject.asObservable();
  }

  setCandidateDataSubscription() {
    this.candidateDataRequestSubject.pipe(
      concatMap((payload) => {
        if (payload && payload.id) {
          /*
            possible additional switch or if statement if we have different types we are looking for,
            for now default to schedule
          */
          return this.candidateApi.getBySchedule(payload.id).pipe(
            takeUntil(this.candidateDataRequestCancelled),
            take(1)
          )
        } else {
          return this.candidateApi.getAll().pipe(
            takeUntil(this.candidateDataRequestCancelled),
            take(1)
          )
        }
      }
      )
    )
      .subscribe((res: any) => {
        if (res) {
          this.candidateDataSubject.next(res.data);
        };
      });

    this.candidateDataRequestSaveSubject
      .pipe(
        concatMap((voter) =>
          this.candidateApi.create(voter)
            .pipe(
              take(1)
            )
        )
      )
      .subscribe(() => {
        this.candidateDataSavedSubject.next(true);
      });

    this.candidateDataUpdateRequestSubject.pipe(
      concatMap((leader) =>
        this.candidateApi.update(leader)
          .pipe(
            take(1)
          )
      )
    ).subscribe((res: any) => {
      if (res) {
        this.candidateDataUpdatedSubject.next(true);
      }
    });

    this.candidateDataRequestDeleteSubject.pipe(
      concatMap((id) =>
        this.candidateApi.delete(id)
          .pipe(
            take(1)
          )
      )
    ).subscribe((res: any) => {
      if (res) {
        this.candidateDataDeletedSubject.next(true);
      }
    });
  }

  get candidateData$(): Observable<CandidateInterface[]> {
    return this.candidateDataSubject.asObservable();
  }
}
