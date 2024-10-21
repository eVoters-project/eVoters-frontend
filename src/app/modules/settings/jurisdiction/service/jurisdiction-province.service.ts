import { inject, Injectable } from "@angular/core";
import { ProvinceApiService } from "../../../../service/api";
import { ProvinceInterface } from "../../../../interface";
import { Subject, concatMap, takeUntil, take, Observable } from "rxjs";

@Injectable()
export class JurisdictionProvinceService {
  private provinceApi = inject(ProvinceApiService);

  private provinceDataSubject = new Subject<ProvinceInterface[]>;
  private provinceDataRequestSubject = new Subject();
  private provinceDataRequestCancelled = new Subject<boolean>();

  private provinceDataUpdateRequestSubject = new Subject<Partial<ProvinceInterface>>();
  private provinceDataUpdatedSubject = new Subject<boolean>();

  private provinceDataRequestSaveSubject = new Subject<ProvinceInterface>();
  private provinceDataSavedSubject = new Subject<boolean>();

  private provinceDataRequestDeleteSubject = new Subject<string>();
  private provinceDataDeletedSubject = new Subject<boolean>();

  constructor() { }

  onInit() {
    this.setProvinceDataSubscription();
  }

  requestData() {
    this.provinceDataRequestSubject.next(null);
  }

  saveData(barangay: ProvinceInterface) {
    this.provinceDataRequestSaveSubject.next(barangay);
    return this.provinceDataSavedSubject.asObservable();
  }

  updateData(barangay: Partial<ProvinceInterface>) {
    this.provinceDataUpdateRequestSubject.next(barangay);
    return this.provinceDataUpdatedSubject.asObservable();
  }

  deleteData(id: string) {
    this.provinceDataRequestDeleteSubject.next(id);
    return this.provinceDataDeletedSubject.asObservable();
  }

  setProvinceDataSubscription() {
    this.provinceDataRequestSubject.pipe(
      concatMap(() =>
        this.provinceApi.getProvinces().pipe(
          takeUntil(this.provinceDataRequestCancelled),
          take(1)
        )
      )
    )
      .subscribe((res: any) => {
        if (res) {
          this.provinceDataSubject.next(res.data);
        }
      });

    this.provinceDataRequestSaveSubject
      .pipe(
        concatMap((voter) =>
          this.provinceApi.createProvince(voter)
            .pipe(
              take(1)
            )
        )
      )
      .subscribe(() => {
        this.provinceDataSavedSubject.next(true);
      });

    this.provinceDataUpdateRequestSubject.pipe(
      concatMap((voter) =>
        this.provinceApi.updateProvince(voter)
          .pipe(
            take(1)
          )
      )
    )
      .subscribe((res: any) => {
        if (res) {
          this.provinceDataUpdatedSubject.next(true);
        }
      })

    this.provinceDataRequestDeleteSubject.pipe(
      concatMap((id) =>
        this.provinceApi.deleteProvince(id)
          .pipe(
            take(1)
          )
      )
    ).subscribe((res: any) => {
      if (res) {
        this.provinceDataDeletedSubject.next(true);
      }
    });
  }

  get provinceData$(): Observable<ProvinceInterface[]> {
    return this.provinceDataSubject.asObservable();
  }

}
