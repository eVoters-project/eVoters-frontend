import { inject, Injectable } from "@angular/core";
import { VoterInfluenceInterface } from "../../../../interface";
import { VoterInfluenceApiService } from "../../../../service/api";
import { Subject, concatMap, takeUntil, take, Observable } from "rxjs";

@Injectable()
export class VoterInfluenceService {
  private voterinfluenceApi = inject(VoterInfluenceApiService);

  private voterinfluenceDataSubject = new Subject<VoterInfluenceInterface[]>;
  private voterinfluenceDataRequestSubject = new Subject();
  private voterinfluenceDataRequestCancelled = new Subject<boolean>();

  private voterinfluenceDataUpdateRequestSubject = new Subject<Partial<VoterInfluenceInterface>>();
  private voterinfluenceDataUpdatedSubject = new Subject<boolean>();

  private voterinfluenceDataRequestSaveSubject = new Subject<VoterInfluenceInterface>();
  private voterinfluenceDataSavedSubject = new Subject<boolean>();

  private voterinfluenceDataRequestDeleteSubject = new Subject<string>();
  private voterinfluenceDataDeletedSubject = new Subject<boolean>();

  constructor() { }

  onInit() {
    this.setVoterInfluenceDataSubscription();
  }

  requestData() {
    this.voterinfluenceDataRequestSubject.next(null);
  }

  saveData(barangay: VoterInfluenceInterface) {
    this.voterinfluenceDataRequestSaveSubject.next(barangay);
    return this.voterinfluenceDataSavedSubject.asObservable();
  }

  updateData(barangay: Partial<VoterInfluenceInterface>) {
    this.voterinfluenceDataUpdateRequestSubject.next(barangay);
    return this.voterinfluenceDataUpdatedSubject.asObservable();
  }

  deleteData(id: string) {
    this.voterinfluenceDataRequestDeleteSubject.next(id);
    return this.voterinfluenceDataDeletedSubject.asObservable();
  }

  setVoterInfluenceDataSubscription() {
    this.voterinfluenceDataRequestSubject.pipe(
      concatMap(() =>
        this.voterinfluenceApi.getVoterInfluences().pipe(
          takeUntil(this.voterinfluenceDataRequestCancelled),
          take(1)
        )
      )
    )
      .subscribe((res: any) => {
        if (res) {
          this.voterinfluenceDataSubject.next(res.data);
        }
      });

    this.voterinfluenceDataRequestSaveSubject
      .pipe(
        concatMap((voter) =>
          this.voterinfluenceApi.createVoterInfluence(voter)
            .pipe(
              take(1)
            )
        )
      )
      .subscribe(() => {
        this.voterinfluenceDataSavedSubject.next(true);
      });

    this.voterinfluenceDataUpdateRequestSubject.pipe(
      concatMap((voter) =>
        this.voterinfluenceApi.updateVoterInfluence(voter)
          .pipe(
            take(1)
          )
      )
    )
      .subscribe((res: any) => {
        if (res) {
          this.voterinfluenceDataUpdatedSubject.next(true);
        }
      })

    this.voterinfluenceDataRequestDeleteSubject.pipe(
      concatMap((id) =>
        this.voterinfluenceApi.deleteVoterInfluence(id)
          .pipe(
            take(1)
          )
      )
    ).subscribe((res: any) => {
      if (res) {
        this.voterinfluenceDataDeletedSubject.next(true);
      }
    });
  }

  get voterInfluenceData$(): Observable<VoterInfluenceInterface[]> {
    return this.voterinfluenceDataSubject.asObservable();
  }

}
