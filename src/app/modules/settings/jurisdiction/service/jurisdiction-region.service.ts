import { inject, Injectable } from "@angular/core";
import { RegionApiService } from "../../../../service/api";
import { RegionInterface } from "../../../../interface";
import { Subject, concatMap, takeUntil, take, Observable } from "rxjs";

@Injectable()
export class JurisdictionRegionService {
  private regionApi = inject(RegionApiService);

  private regionDataSubject = new Subject<RegionInterface[]>;
  private regionDataRequestSubject = new Subject();
  private regionDataRequestCancelled = new Subject<boolean>();

  private regionDataUpdateRequestSubject = new Subject<Partial<RegionInterface>>();
  private regionDataUpdatedSubject = new Subject<boolean>();

  private regionDataRequestSaveSubject = new Subject<RegionInterface>();
  private regionDataSavedSubject = new Subject<boolean>();

  private regionDataRequestDeleteSubject = new Subject<string>();
  private regionDataDeletedSubject = new Subject<boolean>();

  constructor() { }

  onInit() {
    this.setRegionDataSubscription();
  }

  requestData() {
    this.regionDataRequestSubject.next(null);
  }

  saveData(barangay: RegionInterface) {
    this.regionDataRequestSaveSubject.next(barangay);
    return this.regionDataSavedSubject.asObservable();
  }

  updateData(barangay: Partial<RegionInterface>) {
    this.regionDataUpdateRequestSubject.next(barangay);
    return this.regionDataUpdatedSubject.asObservable();
  }

  deleteData(id: string) {
    this.regionDataRequestDeleteSubject.next(id);
    return this.regionDataDeletedSubject.asObservable();
  }

  setRegionDataSubscription() {
    this.regionDataRequestSubject.pipe(
      concatMap(() =>
        this.regionApi.getRegions().pipe(
          takeUntil(this.regionDataRequestCancelled),
          take(1)
        )
      )
    )
      .subscribe((res: any) => {
        if (res) {
          this.regionDataSubject.next(res.data);
        }
      });

    this.regionDataRequestSaveSubject
      .pipe(
        concatMap((voter) =>
          this.regionApi.createRegion(voter)
            .pipe(
              take(1)
            )
        )
      )
      .subscribe(() => {
        this.regionDataSavedSubject.next(true);
      });

    this.regionDataUpdateRequestSubject.pipe(
      concatMap((voter) =>
        this.regionApi.updateRegion(voter)
          .pipe(
            take(1)
          )
      )
    )
      .subscribe((res: any) => {
        if (res) {
          this.regionDataUpdatedSubject.next(true);
        }
      })

    this.regionDataRequestDeleteSubject.pipe(
      concatMap((id) =>
        this.regionApi.deleteRegion(id)
          .pipe(
            take(1)
          )
      )
    ).subscribe((res: any) => {
      if (res) {
        this.regionDataDeletedSubject.next(true);
      }
    });
  }

  get regionData$(): Observable<RegionInterface[]> {
    return this.regionDataSubject.asObservable();
  }

}
