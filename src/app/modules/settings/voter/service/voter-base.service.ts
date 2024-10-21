import { inject, Injectable } from "@angular/core";
import { VoterBaseInterface } from "../../../../interface";
import { VoterBaseApiService } from "../../../../service/api";
import { Subject, concatMap, takeUntil, take, Observable } from "rxjs";

@Injectable()
export class VoterBaseService {
  private voterbaseApi = inject(VoterBaseApiService);

  private voterbaseDataSubject = new Subject<VoterBaseInterface[]>;
  private voterbaseDataRequestSubject = new Subject();
  private voterbaseDataRequestCancelled = new Subject<boolean>();

  private voterbaseDataUpdateRequestSubject = new Subject<Partial<VoterBaseInterface>>();
  private voterbaseDataUpdatedSubject = new Subject<boolean>();

  private voterbaseDataRequestSaveSubject = new Subject<VoterBaseInterface>();
  private voterbaseDataSavedSubject = new Subject<boolean>();

  private voterbaseDataRequestDeleteSubject = new Subject<string>();
  private voterbaseDataDeletedSubject = new Subject<boolean>();

  constructor() { }

  onInit() {
    this.setVoterBaseDataSubscription();
  }

  requestData() {
    this.voterbaseDataRequestSubject.next(null);
  }

  saveData(barangay: VoterBaseInterface) {
    this.voterbaseDataRequestSaveSubject.next(barangay);
    return this.voterbaseDataSavedSubject.asObservable();
  }

  updateData(barangay: Partial<VoterBaseInterface>) {
    this.voterbaseDataUpdateRequestSubject.next(barangay);
    return this.voterbaseDataUpdatedSubject.asObservable();
  }

  deleteData(id: string) {
    this.voterbaseDataRequestDeleteSubject.next(id);
    return this.voterbaseDataDeletedSubject.asObservable();
  }

  setVoterBaseDataSubscription() {
    this.voterbaseDataRequestSubject.pipe(
      concatMap(() =>
        this.voterbaseApi.getVoterBases().pipe(
          takeUntil(this.voterbaseDataRequestCancelled),
          take(1)
        )
      )
    )
      .subscribe((res: any) => {
        if (res) {
          this.voterbaseDataSubject.next(res.data);
        }
      });

    this.voterbaseDataRequestSaveSubject
      .pipe(
        concatMap((voter) =>
          this.voterbaseApi.createVoterBase(voter)
            .pipe(
              take(1)
            )
        )
      )
      .subscribe(() => {
        this.voterbaseDataSavedSubject.next(true);
      });

    this.voterbaseDataUpdateRequestSubject.pipe(
      concatMap((voter) =>
        this.voterbaseApi.updateVoterBase(voter)
          .pipe(
            take(1)
          )
      )
    )
      .subscribe((res: any) => {
        if (res) {
          this.voterbaseDataUpdatedSubject.next(true);
        }
      })

    this.voterbaseDataRequestDeleteSubject.pipe(
      concatMap((id) =>
        this.voterbaseApi.deleteVoterBase(id)
          .pipe(
            take(1)
          )
      )
    ).subscribe((res: any) => {
      if (res) {
        this.voterbaseDataDeletedSubject.next(true);
      }
    });
  }

  get voterBaseData$(): Observable<VoterBaseInterface[]> {
    return this.voterbaseDataSubject.asObservable();
  }

}
