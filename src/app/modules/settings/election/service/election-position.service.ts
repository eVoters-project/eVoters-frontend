import { inject, Injectable } from "@angular/core";
import { ElectionPositionApiService } from "../../../../service/api";
import { ElectionPositionInterface } from "../../../../interface";
import { concatMap, Observable, Subject, take, takeUntil } from "rxjs";

@Injectable()
export class ElectionPositionService {
  private electionPositionApi = inject(ElectionPositionApiService);

  private electionPositionDataSubject = new Subject<ElectionPositionInterface[]>;
  private electionPositionDataRequestSubject = new Subject();
  private electionPositionDataRequestCancelled = new Subject<boolean>();

  private electionPositionDataUpdateRequestSubject = new Subject<Partial<ElectionPositionInterface>>();
  private electionPositionDataUpdatedSubject = new Subject<boolean>();

  private electionPositionDataRequestSaveSubject = new Subject<ElectionPositionInterface>();
  private electionPositionDataSavedSubject = new Subject<boolean>();

  private electionPositionDataRequestDeleteSubject = new Subject<string>();
  private electionPositionDataDeletedSubject = new Subject<boolean>();

  constructor() { }

  onInit() {
    this.setElectionPositionDataSubscription();
  }

  requestData() {
    this.electionPositionDataRequestSubject.next(null);
  }

  saveData(barangay: ElectionPositionInterface) {
    this.electionPositionDataRequestSaveSubject.next(barangay);
    return this.electionPositionDataSavedSubject.asObservable();
  }

  updateData(barangay: Partial<ElectionPositionInterface>) {
    this.electionPositionDataUpdateRequestSubject.next(barangay);
    return this.electionPositionDataUpdatedSubject.asObservable();
  }

  deleteData(id: string) {
    this.electionPositionDataRequestDeleteSubject.next(id);
    return this.electionPositionDataDeletedSubject.asObservable();
  }

  setElectionPositionDataSubscription() {
    this.electionPositionDataRequestSubject.pipe(
      concatMap(() =>
        this.electionPositionApi.getElectionPositions().pipe(
          takeUntil(this.electionPositionDataRequestCancelled),
          take(1)
        )
      )
    )
      .subscribe((res: any) => {
        if (res) {
          this.electionPositionDataSubject.next(res.data);
        }
      });

    this.electionPositionDataRequestSaveSubject
      .pipe(
        concatMap((voter) =>
          this.electionPositionApi.createElectionPosition(voter)
            .pipe(
              take(1)
            )
        )
      )
      .subscribe(() => {
        this.electionPositionDataSavedSubject.next(true);
      });

    this.electionPositionDataUpdateRequestSubject.pipe(
      concatMap((voter) =>
        this.electionPositionApi.updateElectionPosition(voter)
          .pipe(
            take(1)
          )
      )
    )
      .subscribe((res: any) => {
        if (res) {
          this.electionPositionDataUpdatedSubject.next(true);
        }
      })

    this.electionPositionDataRequestDeleteSubject.pipe(
      concatMap((id) =>
        this.electionPositionApi.deleteElectionPosition(id)
          .pipe(
            take(1)
          )
      )
    ).subscribe((res: any) => {
      if (res) {
        this.electionPositionDataDeletedSubject.next(true);
      }
    });
  }

  get electionPositionData$(): Observable<ElectionPositionInterface[]> {
    return this.electionPositionDataSubject.asObservable();
  }
}
