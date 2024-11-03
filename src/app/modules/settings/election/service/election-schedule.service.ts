import { inject, Injectable } from "@angular/core";
import { ElectionScheduleApiService } from "../../../../service/api";
import { ElectionScheduleInterface } from "../../../../interface";
import { concatMap, Observable, Subject, take, takeUntil } from "rxjs";

@Injectable()
export class ElectionScheduleService {
  private electionScheduleApi = inject(ElectionScheduleApiService);

  private electionScheduleDataSubject = new Subject<ElectionScheduleInterface[]>;
  private electionScheduleDataRequestSubject = new Subject();
  private electionScheduleDataRequestCancelled = new Subject<boolean>();

  private electionScheduleDataUpdateRequestSubject = new Subject<Partial<ElectionScheduleInterface>>();
  private electionScheduleDataUpdatedSubject = new Subject<boolean>();

  private electionScheduleDataRequestSaveSubject = new Subject<ElectionScheduleInterface>();
  private electionScheduleDataSavedSubject = new Subject<boolean>();

  private electionScheduleDataRequestDeleteSubject = new Subject<string>();
  private electionScheduleDataDeletedSubject = new Subject<boolean>();

  constructor() { }

  onInit() {
    this.setElectionScheduleDataSubscription();
  }

  requestData() {
    this.electionScheduleDataRequestSubject.next(null);
  }

  saveData(electionSchedule: ElectionScheduleInterface) {
    this.electionScheduleDataRequestSaveSubject.next(electionSchedule);
    return this.electionScheduleDataSavedSubject.asObservable();
  }

  updateData(electionSchedule: Partial<ElectionScheduleInterface>) {
    this.electionScheduleDataUpdateRequestSubject.next(electionSchedule);
    return this.electionScheduleDataUpdatedSubject.asObservable();
  }

  deleteData(id: string) {
    this.electionScheduleDataRequestDeleteSubject.next(id);
    return this.electionScheduleDataDeletedSubject.asObservable();
  }

  setElectionScheduleDataSubscription() {
    this.electionScheduleDataRequestSubject.pipe(
      concatMap(() =>
        this.electionScheduleApi.getElectionSchedules().pipe(
          takeUntil(this.electionScheduleDataRequestCancelled),
          take(1)
        )
      )
    )
      .subscribe((res: any) => {
        if (res) {
          this.electionScheduleDataSubject.next(res.data);
        }
      });

    this.electionScheduleDataRequestSaveSubject
      .pipe(
        concatMap((electionSchedule) =>
          this.electionScheduleApi.createElectionSchedule(electionSchedule)
            .pipe(
              take(1)
            )
        )
      )
      .subscribe(() => {
        this.electionScheduleDataSavedSubject.next(true);
      });

    this.electionScheduleDataUpdateRequestSubject.pipe(
      concatMap((voter) =>
        this.electionScheduleApi.updateElectionSchedule(voter)
          .pipe(
            take(1)
          )
      )
    )
      .subscribe((res: any) => {
        if (res) {
          this.electionScheduleDataUpdatedSubject.next(true);
        }
      })

    this.electionScheduleDataRequestDeleteSubject.pipe(
      concatMap((id) =>
        this.electionScheduleApi.deleteElectionSchedule(id)
          .pipe(
            take(1)
          )
      )
    ).subscribe((res: any) => {
      if (res) {
        this.electionScheduleDataDeletedSubject.next(true);
      }
    });
  }

  get electionScheduleData$(): Observable<ElectionScheduleInterface[]> {
    return this.electionScheduleDataSubject.asObservable();
  }
}
