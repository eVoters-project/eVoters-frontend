import { inject, Injectable } from "@angular/core";
import { VoterLeaderSubInterface } from "../../../../interface";
import { VoterLeaderSubApiService } from "../../../../service/api";
import { Subject, concatMap, takeUntil, take, Observable } from "rxjs";

@Injectable()
export class VoterLeaderSubService {
  private voterleadersubApi = inject(VoterLeaderSubApiService);

  private voterleadersubDataSubject = new Subject<VoterLeaderSubInterface[]>;
  private voterleadersubDataRequestSubject = new Subject();
  private voterleadersubDataRequestCancelled = new Subject<boolean>();

  private voterleadersubDataUpdateRequestSubject = new Subject<Partial<VoterLeaderSubInterface>>();
  private voterleadersubDataUpdatedSubject = new Subject<boolean>();

  private voterleadersubDataRequestSaveSubject = new Subject<VoterLeaderSubInterface>();
  private voterleadersubDataSavedSubject = new Subject<boolean>();

  private voterleadersubDataRequestDeleteSubject = new Subject<string>();
  private voterleadersubDataDeletedSubject = new Subject<boolean>();

  constructor() { }

  onInit() {
    this.setVoterLeaderDataSubscription();
  }

  requestData() {
    this.voterleadersubDataRequestSubject.next(null);
  }

  saveData(barangay: VoterLeaderSubInterface) {
    this.voterleadersubDataRequestSaveSubject.next(barangay);
    return this.voterleadersubDataSavedSubject.asObservable();
  }

  updateData(barangay: Partial<VoterLeaderSubInterface>) {
    this.voterleadersubDataUpdateRequestSubject.next(barangay);
    return this.voterleadersubDataUpdatedSubject.asObservable();
  }

  deleteData(id: string) {
    this.voterleadersubDataRequestDeleteSubject.next(id);
    return this.voterleadersubDataDeletedSubject.asObservable();
  }

  setVoterLeaderDataSubscription() {
    this.voterleadersubDataRequestSubject.pipe(
      concatMap(() =>
        this.voterleadersubApi.getVoterLeadersSub().pipe(
          takeUntil(this.voterleadersubDataRequestCancelled),
          take(1)
        )
      )
    )
      .subscribe((res: any) => {
        if (res) {
          this.voterleadersubDataSubject.next(res.data);
        }
      });

    this.voterleadersubDataRequestSaveSubject
      .pipe(
        concatMap((voter) =>
          this.voterleadersubApi.createVoterLeaderSub(voter)
            .pipe(
              take(1)
            )
        )
      )
      .subscribe(() => {
        this.voterleadersubDataSavedSubject.next(true);
      });

    this.voterleadersubDataUpdateRequestSubject.pipe(
      concatMap((voter) =>
        this.voterleadersubApi.updateVoterLeaderSub(voter)
          .pipe(
            take(1)
          )
      )
    )
      .subscribe((res: any) => {
        if (res) {
          this.voterleadersubDataUpdatedSubject.next(true);
        }
      })

    this.voterleadersubDataRequestDeleteSubject.pipe(
      concatMap((id) =>
        this.voterleadersubApi.deleteVoterLeaderSub(id)
          .pipe(
            take(1)
          )
      )
    ).subscribe((res: any) => {
      if (res) {
        this.voterleadersubDataDeletedSubject.next(true);
      }
    });
  }

  get voterLeaderSubData$(): Observable<VoterLeaderSubInterface[]> {
    return this.voterleadersubDataSubject.asObservable();
  }

}
