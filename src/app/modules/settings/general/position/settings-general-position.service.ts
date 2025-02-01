import { inject, Injectable } from "@angular/core";
import { PositionInterface } from "../../../../interface";
import { concatMap, Observable, Subject, take, takeUntil } from "rxjs";
import { PositionApiService } from "../../../../service/api";

@Injectable()
export class SettingsGeneralPositionService {
    private positionApi = inject(PositionApiService);
    
      private positionDataSubject = new Subject<PositionInterface[]>;
      private positionDataRequestSubject = new Subject();
      private positionDataRequestCancelled = new Subject<boolean>();
    
      private positionDataUpdateRequestSubject = new Subject<Partial<PositionInterface>>();
      private positionDataUpdatedSubject = new Subject<boolean>();
    
      private positionDataRequestSaveSubject = new Subject<PositionInterface>();
      private positionDataSavedSubject = new Subject<boolean>();
    
      private positionDataRequestDeleteSubject = new Subject<string>();
      private positionDataDeletedSubject = new Subject<boolean>();
    
      constructor() { }
    
      onInit() {
        this.setPositionDataSubscription();
      }
    
      requestData() {
        this.positionDataRequestSubject.next(null);
      }
    
      saveData(barangay: PositionInterface) {
        this.positionDataRequestSaveSubject.next(barangay);
        return this.positionDataSavedSubject.asObservable();
      }
    
      updateData(barangay: Partial<PositionInterface>) {
        this.positionDataUpdateRequestSubject.next(barangay);
        return this.positionDataUpdatedSubject.asObservable();
      }
    
      deleteData(id: string) {
        this.positionDataRequestDeleteSubject.next(id);
        return this.positionDataDeletedSubject.asObservable();
      }
    
      setPositionDataSubscription() {
        this.positionDataRequestSubject.pipe(
          concatMap(() =>
            this.positionApi.getPositions().pipe(
              takeUntil(this.positionDataRequestCancelled),
              take(1)
            )
          )
        )
          .subscribe((res: any) => {
            if (res) {
              this.positionDataSubject.next(res.data);
            }
          });
    
        this.positionDataRequestSaveSubject
          .pipe(
            concatMap((position) =>
              this.positionApi.createPosition(position)
                .pipe(
                  take(1)
                )
            )
          )
          .subscribe(() => {
            this.positionDataSavedSubject.next(true);
          });
    
        this.positionDataUpdateRequestSubject.pipe(
          concatMap((position) =>
            this.positionApi.updatePosition(position)
              .pipe(
                take(1)
              )
          )
        )
          .subscribe((res: any) => {
            if (res) {
              this.positionDataUpdatedSubject.next(true);
            }
          })
    
        this.positionDataRequestDeleteSubject.pipe(
          concatMap((id) =>
            this.positionApi.deletePosition(id)
              .pipe(
                take(1)
              )
          )
        ).subscribe((res: any) => {
          if (res) {
            this.positionDataDeletedSubject.next(true);
          }
        });
      }
    
      get positionData$(): Observable<PositionInterface[]> {
        return this.positionDataSubject.asObservable();
      }
}