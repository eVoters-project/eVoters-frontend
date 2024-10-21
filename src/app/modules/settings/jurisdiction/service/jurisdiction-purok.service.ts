import { inject, Injectable } from "@angular/core";
import { PurokApiService } from "../../../../service/api";
import { concatMap, Observable, Subject, take, takeUntil } from "rxjs";
import { PurokInterface } from "../../../../interface";

@Injectable()
export class JurisdictionPurokService {
  private purokApi = inject(PurokApiService);

  private purokDataSubject = new Subject<PurokInterface[]>;
  private purokDataRequestSubject = new Subject();
  private purokDataRequestCancelled = new Subject<boolean>();

  private purokDataUpdateRequestSubject = new Subject<Partial<PurokInterface>>();
  private purokDataUpdatedSubject = new Subject<boolean>();

  private purokDataRequestSaveSubject = new Subject<PurokInterface>();
  private purokDataSavedSubject = new Subject<boolean>();

  private purokDataRequestDeleteSubject = new Subject<string>();
  private purokDataDeletedSubject = new Subject<boolean>();

  constructor() { }

  onInit() {
    this.setPurokDataSubscription();
  }

  requestData() {
    this.purokDataRequestSubject.next(null);
  }

  saveData(purok: PurokInterface) {
    this.purokDataRequestSaveSubject.next(purok);
    return this.purokDataSavedSubject.asObservable();
  }

  updateData(purok: Partial<PurokInterface>) {
    this.purokDataUpdateRequestSubject.next(purok);
    return this.purokDataUpdatedSubject.asObservable();
  }

  deleteData(id: string) {
    this.purokDataRequestDeleteSubject.next(id);
    return this.purokDataDeletedSubject.asObservable();
  }

  setPurokDataSubscription() {
    this.purokDataRequestSubject.pipe(
      concatMap(() =>
        this.purokApi.getPuroks().pipe(
          takeUntil(this.purokDataRequestCancelled),
          take(1)
        )
      )
    )
      .subscribe((res: any) => {
        if (res) {
          this.purokDataSubject.next(res.data);
        }
      });

    this.purokDataRequestSaveSubject
      .pipe(
        concatMap((voter) =>
          this.purokApi.createPurok(voter)
            .pipe(
              take(1)
            )
        )
      )
      .subscribe(() => {
        this.purokDataSavedSubject.next(true);
      });

    this.purokDataUpdateRequestSubject.pipe(
      concatMap((voter) =>
        this.purokApi.updatePurok(voter)
          .pipe(
            take(1)
          )
      )
    )
      .subscribe((res: any) => {
        if (res) {
          this.purokDataUpdatedSubject.next(true);
        }
      })

    this.purokDataRequestDeleteSubject.pipe(
      concatMap((id) =>
        this.purokApi.deletePurok(id)
          .pipe(
            take(1)
          )
      )
    ).subscribe((res: any) => {
      if (res) {
        this.purokDataDeletedSubject.next(true);
      }
    });
  }

  get purokData$(): Observable<PurokInterface[]> {
    return this.purokDataSubject.asObservable();
  }

}
