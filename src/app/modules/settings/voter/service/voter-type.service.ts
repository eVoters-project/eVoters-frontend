import { inject, Injectable } from "@angular/core";
import { VoterTypeApiService } from "../../../../service/api";
import { VoterTypeInterface } from "../../../../interface";
import { Subject, concatMap, takeUntil, take, Observable } from "rxjs";

@Injectable()
export class VoterTypeService {
  private votertypeApi = inject(VoterTypeApiService);

  private votertypeDataSubject = new Subject<VoterTypeInterface[]>;
  private votertypeDataRequestSubject = new Subject();
  private votertypeDataRequestCancelled = new Subject<boolean>();

  private votertypeDataUpdateRequestSubject = new Subject<Partial<VoterTypeInterface>>();
  private votertypeDataUpdatedSubject = new Subject<boolean>();

  private votertypeDataRequestSaveSubject = new Subject<VoterTypeInterface>();
  private votertypeDataSavedSubject = new Subject<boolean>();

  private votertypeDataRequestDeleteSubject = new Subject<string>();
  private votertypeDataDeletedSubject = new Subject<boolean>();

  constructor() { }

  onInit() {
    this.setVoterTypeDataSubscription();
  }

  requestData() {
    this.votertypeDataRequestSubject.next(null);
  }

  saveData(barangay: VoterTypeInterface) {
    this.votertypeDataRequestSaveSubject.next(barangay);
    return this.votertypeDataSavedSubject.asObservable();
  }

  updateData(barangay: Partial<VoterTypeInterface>) {
    this.votertypeDataUpdateRequestSubject.next(barangay);
    return this.votertypeDataUpdatedSubject.asObservable();
  }

  deleteData(id: string) {
    this.votertypeDataRequestDeleteSubject.next(id);
    return this.votertypeDataDeletedSubject.asObservable();
  }

  setVoterTypeDataSubscription() {
    this.votertypeDataRequestSubject.pipe(
      concatMap(() =>
        this.votertypeApi.getVoterTypes().pipe(
          takeUntil(this.votertypeDataRequestCancelled),
          take(1)
        )
      )
    )
      .subscribe((res: any) => {
        if (res) {
          this.votertypeDataSubject.next(res.data);
        }
      });

    this.votertypeDataRequestSaveSubject
      .pipe(
        concatMap((voter) =>
          this.votertypeApi.createVoterType(voter)
            .pipe(
              take(1)
            )
        )
      )
      .subscribe(() => {
        this.votertypeDataSavedSubject.next(true);
      });

    this.votertypeDataUpdateRequestSubject.pipe(
      concatMap((voter) =>
        this.votertypeApi.updateVoterType(voter)
          .pipe(
            take(1)
          )
      )
    )
      .subscribe((res: any) => {
        if (res) {
          this.votertypeDataUpdatedSubject.next(true);
        }
      })

    this.votertypeDataRequestDeleteSubject.pipe(
      concatMap((id) =>
        this.votertypeApi.deleteVoterType(id)
          .pipe(
            take(1)
          )
      )
    ).subscribe((res: any) => {
      if (res) {
        this.votertypeDataDeletedSubject.next(true);
      }
    });
  }

  get voterTypeData$(): Observable<VoterTypeInterface[]> {
    return this.votertypeDataSubject.asObservable();
  }

}
