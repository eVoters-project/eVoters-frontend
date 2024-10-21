import { inject, Injectable } from "@angular/core";
import { LGUApiService } from "../../../../service/api";
import { LGUInterface, PurokInterface } from "../../../../interface";
import { Subject, concatMap, takeUntil, take, Observable } from "rxjs";

@Injectable()
export class JurisdictionLGUService {
  private lguApi = inject(LGUApiService);

  private lguDataSubject = new Subject<LGUInterface[]>;
  private lguDataRequestSubject = new Subject();
  private lguDataRequestCancelled = new Subject<boolean>();

  private lguDataUpdateRequestSubject = new Subject<Partial<LGUInterface>>();
  private lguDataUpdatedSubject = new Subject<boolean>();

  private lguDataRequestSaveSubject = new Subject<LGUInterface>();
  private lguDataSavedSubject = new Subject<boolean>();

  private lguDataRequestDeleteSubject = new Subject<string>();
  private lguDataDeletedSubject = new Subject<boolean>();

  constructor() { }

  onInit() {
    this.setLguDataSubscription();
  }

  requestData() {
    this.lguDataRequestSubject.next(null);
  }

  saveData(purok: LGUInterface) {
    this.lguDataRequestSaveSubject.next(purok);
    return this.lguDataSavedSubject.asObservable();
  }

  updateData(purok: Partial<LGUInterface>) {
    this.lguDataUpdateRequestSubject.next(purok);
    return this.lguDataUpdatedSubject.asObservable();
  }

  deleteData(id: string) {
    this.lguDataRequestDeleteSubject.next(id);
    return this.lguDataDeletedSubject.asObservable();
  }

  setLguDataSubscription() {
    this.lguDataRequestSubject.pipe(
      concatMap(() =>
        this.lguApi.getLGUs().pipe(
          takeUntil(this.lguDataRequestCancelled),
          take(1)
        )
      )
    )
      .subscribe((res: any) => {
        if (res) {
          this.lguDataSubject.next(res.data);
        }
      });

    this.lguDataRequestSaveSubject
      .pipe(
        concatMap((voter) =>
          this.lguApi.createLGU(voter)
            .pipe(
              take(1)
            )
        )
      )
      .subscribe(() => {
        this.lguDataSavedSubject.next(true);
      });

    this.lguDataUpdateRequestSubject.pipe(
      concatMap((voter) =>
        this.lguApi.updateLGU(voter)
          .pipe(
            take(1)
          )
      )
    )
      .subscribe((res: any) => {
        if (res) {
          this.lguDataUpdatedSubject.next(true);
        }
      })

    this.lguDataRequestDeleteSubject.pipe(
      concatMap((id) =>
        this.lguApi.deleteLGU(id)
          .pipe(
            take(1)
          )
      )
    ).subscribe((res: any) => {
      if (res) {
        this.lguDataDeletedSubject.next(true);
      }
    });
  }

  get lguData$(): Observable<LGUInterface[]> {
    return this.lguDataSubject.asObservable();
  }

}
