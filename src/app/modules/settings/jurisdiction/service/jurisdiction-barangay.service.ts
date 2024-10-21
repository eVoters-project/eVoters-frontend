import { inject, Injectable } from "@angular/core";
import { BarangayApiService } from "../../../../service/api";
import { concatMap, Observable, Subject, take, takeUntil } from "rxjs";
import { BarangayInterface } from "../../../../interface";

@Injectable()
export class JurisdictionBarangayService {
  private barangayApi = inject(BarangayApiService);

  private barangayDataSubject = new Subject<BarangayInterface[]>;
  private barangayDataRequestSubject = new Subject();
  private barangayDataRequestCancelled = new Subject<boolean>();

  private barangayDataUpdateRequestSubject = new Subject<Partial<BarangayInterface>>();
  private barangayDataUpdatedSubject = new Subject<boolean>();

  private barangayDataRequestSaveSubject = new Subject<BarangayInterface>();
  private barangayDataSavedSubject = new Subject<boolean>();

  private barangayDataRequestDeleteSubject = new Subject<string>();
  private barangayDataDeletedSubject = new Subject<boolean>();

  constructor() { }

  onInit() {
    this.setBarangayDataSubscription();
  }

  requestData() {
    this.barangayDataRequestSubject.next(null);
  }

  saveData(barangay: BarangayInterface) {
    this.barangayDataRequestSaveSubject.next(barangay);
    return this.barangayDataSavedSubject.asObservable();
  }

  updateData(barangay: Partial<BarangayInterface>) {
    this.barangayDataUpdateRequestSubject.next(barangay);
    return this.barangayDataUpdatedSubject.asObservable();
  }

  deleteData(id: string) {
    this.barangayDataRequestDeleteSubject.next(id);
    return this.barangayDataDeletedSubject.asObservable();
  }

  setBarangayDataSubscription() {
    this.barangayDataRequestSubject.pipe(
      concatMap(() =>
        this.barangayApi.getBarangays().pipe(
          takeUntil(this.barangayDataRequestCancelled),
          take(1)
        )
      )
    )
      .subscribe((res: any) => {
        if (res) {
          this.barangayDataSubject.next(res.data);
        }
      });

    this.barangayDataRequestSaveSubject
      .pipe(
        concatMap((voter) =>
          this.barangayApi.createBarangay(voter)
            .pipe(
              take(1)
            )
        )
      )
      .subscribe(() => {
        this.barangayDataSavedSubject.next(true);
      });

    this.barangayDataUpdateRequestSubject.pipe(
      concatMap((voter) =>
        this.barangayApi.updateBarangay(voter)
          .pipe(
            take(1)
          )
      )
    )
      .subscribe((res: any) => {
        if (res) {
          this.barangayDataUpdatedSubject.next(true);
        }
      })

    this.barangayDataRequestDeleteSubject.pipe(
      concatMap((id) =>
        this.barangayApi.deleteBarangay(id)
          .pipe(
            take(1)
          )
      )
    ).subscribe((res: any) => {
      if (res) {
        this.barangayDataDeletedSubject.next(true);
      }
    });
  }

  get barangayData$(): Observable<BarangayInterface[]> {
    return this.barangayDataSubject.asObservable();
  }

}
