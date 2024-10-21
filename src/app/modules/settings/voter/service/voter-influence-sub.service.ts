import { inject, Injectable } from "@angular/core";
import { VoterInfluenceSubApiService } from "../../../../service/api";
import { VoterInfluenceSubInterface } from "../../../../interface";
import { Subject, concatMap, takeUntil, take, Observable } from "rxjs";

@Injectable()
export class VoterInfluenceSubService {
  private voterinfluencesubApi = inject(VoterInfluenceSubApiService);

  private voterinfluencesubDataSubject = new Subject<VoterInfluenceSubInterface[]>;
  private voterinfluencesubDataRequestSubject = new Subject();
  private voterinfluencesubDataRequestCancelled = new Subject<boolean>();

  private voterinfluencesubDataUpdateRequestSubject = new Subject<Partial<VoterInfluenceSubInterface>>();
  private voterinfluencesubDataUpdatedSubject = new Subject<boolean>();

  private voterinfluencesubDataRequestSaveSubject = new Subject<VoterInfluenceSubInterface>();
  private voterinfluencesubDataSavedSubject = new Subject<boolean>();

  private voterinfluencesubDataRequestDeleteSubject = new Subject<string>();
  private voterinfluencesubDataDeletedSubject = new Subject<boolean>();

  constructor() { }

  onInit() {
    this.setVoterInfluenceSubDataSubscription();
  }

  requestData() {
    this.voterinfluencesubDataRequestSubject.next(null);
  }

  saveData(barangay: VoterInfluenceSubInterface) {
    this.voterinfluencesubDataRequestSaveSubject.next(barangay);
    return this.voterinfluencesubDataSavedSubject.asObservable();
  }

  updateData(barangay: Partial<VoterInfluenceSubInterface>) {
    this.voterinfluencesubDataUpdateRequestSubject.next(barangay);
    return this.voterinfluencesubDataUpdatedSubject.asObservable();
  }

  deleteData(id: string) {
    this.voterinfluencesubDataRequestDeleteSubject.next(id);
    return this.voterinfluencesubDataDeletedSubject.asObservable();
  }

  setVoterInfluenceSubDataSubscription() {
    this.voterinfluencesubDataRequestSubject.pipe(
      concatMap(() =>
        this.voterinfluencesubApi.getVoterInfluencesSub().pipe(
          takeUntil(this.voterinfluencesubDataRequestCancelled),
          take(1)
        )
      )
    )
      .subscribe((res: any) => {
        if (res) {
          this.voterinfluencesubDataSubject.next(res.data);
        }
      });

    this.voterinfluencesubDataRequestSaveSubject
      .pipe(
        concatMap((voter) =>
          this.voterinfluencesubApi.createVoterInfluenceSub(voter)
            .pipe(
              take(1)
            )
        )
      )
      .subscribe(() => {
        this.voterinfluencesubDataSavedSubject.next(true);
      });

    this.voterinfluencesubDataUpdateRequestSubject.pipe(
      concatMap((voter) =>
        this.voterinfluencesubApi.updateVoterInfluenceSub(voter)
          .pipe(
            take(1)
          )
      )
    )
      .subscribe((res: any) => {
        if (res) {
          this.voterinfluencesubDataUpdatedSubject.next(true);
        }
      })

    this.voterinfluencesubDataRequestDeleteSubject.pipe(
      concatMap((id) =>
        this.voterinfluencesubApi.deleteVoterInfluenceSub(id)
          .pipe(
            take(1)
          )
      )
    ).subscribe((res: any) => {
      if (res) {
        this.voterinfluencesubDataDeletedSubject.next(true);
      }
    });
  }

  get voterInfluenceSubData$(): Observable<VoterInfluenceSubInterface[]> {
    return this.voterinfluencesubDataSubject.asObservable();
  }

}
