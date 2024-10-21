import { inject, Injectable } from "@angular/core";
import { VoterPositionInterface } from "../../../../interface";
import { Subject, concatMap, takeUntil, take, Observable } from "rxjs";
import { VoterPositionApiService } from "../../../../service/api";

@Injectable()
export class VoterPositionService {
  private voterpositionApi = inject(VoterPositionApiService);

  private voterpositionDataSubject = new Subject<VoterPositionInterface[]>;
  private voterpositionDataRequestSubject = new Subject();
  private voterpositionDataRequestCancelled = new Subject<boolean>();

  private voterpositionDataUpdateRequestSubject = new Subject<Partial<VoterPositionInterface>>();
  private voterpositionDataUpdatedSubject = new Subject<boolean>();

  private voterpositionDataRequestSaveSubject = new Subject<VoterPositionInterface>();
  private voterpositionDataSavedSubject = new Subject<boolean>();

  private voterpositionDataRequestDeleteSubject = new Subject<string>();
  private voterpositionDataDeletedSubject = new Subject<boolean>();

  constructor() { }

  onInit() {
    this.setVoterLeaderDataSubscription();
  }

  requestData() {
    this.voterpositionDataRequestSubject.next(null);
  }

  saveData(barangay: VoterPositionInterface) {
    this.voterpositionDataRequestSaveSubject.next(barangay);
    return this.voterpositionDataSavedSubject.asObservable();
  }

  updateData(barangay: Partial<VoterPositionInterface>) {
    this.voterpositionDataUpdateRequestSubject.next(barangay);
    return this.voterpositionDataUpdatedSubject.asObservable();
  }

  deleteData(id: string) {
    this.voterpositionDataRequestDeleteSubject.next(id);
    return this.voterpositionDataDeletedSubject.asObservable();
  }

  setVoterLeaderDataSubscription() {
    this.voterpositionDataRequestSubject.pipe(
      concatMap(() =>
        this.voterpositionApi.getVoterPositions().pipe(
          takeUntil(this.voterpositionDataRequestCancelled),
          take(1)
        )
      )
    )
      .subscribe((res: any) => {
        if (res) {
          this.voterpositionDataSubject.next(res.data);
        }
      });

    this.voterpositionDataRequestSaveSubject
      .pipe(
        concatMap((voter) =>
          this.voterpositionApi.createVoterPosition(voter)
            .pipe(
              take(1)
            )
        )
      )
      .subscribe(() => {
        this.voterpositionDataSavedSubject.next(true);
      });

    this.voterpositionDataUpdateRequestSubject.pipe(
      concatMap((voter) =>
        this.voterpositionApi.updateVoterPosition(voter)
          .pipe(
            take(1)
          )
      )
    )
      .subscribe((res: any) => {
        if (res) {
          this.voterpositionDataUpdatedSubject.next(true);
        }
      })

    this.voterpositionDataRequestDeleteSubject.pipe(
      concatMap((id) =>
        this.voterpositionApi.deleteVoterPosition(id)
          .pipe(
            take(1)
          )
      )
    ).subscribe((res: any) => {
      if (res) {
        this.voterpositionDataDeletedSubject.next(true);
      }
    });
  }

  get voterPositionData$(): Observable<VoterPositionInterface[]> {
    return this.voterpositionDataSubject.asObservable();
  }

}
