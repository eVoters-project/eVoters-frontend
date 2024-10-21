import { inject, Injectable } from "@angular/core";
import { VoterStatusApiService } from "../../../../service/api";
import { VoterStatusInterface } from "../../../../interface";
import { Subject, concatMap, takeUntil, take, Observable } from "rxjs";

@Injectable()
export class VoterStatusService {
  private voterstatusApi = inject(VoterStatusApiService);

  private voterstatusDataSubject = new Subject<VoterStatusInterface[]>;
  private voterstatusDataRequestSubject = new Subject();
  private voterstatusDataRequestCancelled = new Subject<boolean>();

  private voterstatusDataUpdateRequestSubject = new Subject<Partial<VoterStatusInterface>>();
  private voterstatusDataUpdatedSubject = new Subject<boolean>();

  private voterstatusDataRequestSaveSubject = new Subject<VoterStatusInterface>();
  private voterstatusDataSavedSubject = new Subject<boolean>();

  private voterstatusDataRequestDeleteSubject = new Subject<string>();
  private voterstatusDataDeletedSubject = new Subject<boolean>();

  constructor() { }

  onInit() {
    this.setVoterStatusDataSubscription();
  }

  requestData() {
    this.voterstatusDataRequestSubject.next(null);
  }

  saveData(barangay: VoterStatusInterface) {
    this.voterstatusDataRequestSaveSubject.next(barangay);
    return this.voterstatusDataSavedSubject.asObservable();
  }

  updateData(barangay: Partial<VoterStatusInterface>) {
    this.voterstatusDataUpdateRequestSubject.next(barangay);
    return this.voterstatusDataUpdatedSubject.asObservable();
  }

  deleteData(id: string) {
    this.voterstatusDataRequestDeleteSubject.next(id);
    return this.voterstatusDataDeletedSubject.asObservable();
  }

  setVoterStatusDataSubscription() {
    this.voterstatusDataRequestSubject.pipe(
      concatMap(() =>
        this.voterstatusApi.getVoterStatuses().pipe(
          takeUntil(this.voterstatusDataRequestCancelled),
          take(1)
        )
      )
    )
      .subscribe((res: any) => {
        if (res) {
          this.voterstatusDataSubject.next(res.data);
        }
      });

    this.voterstatusDataRequestSaveSubject
      .pipe(
        concatMap((voter) =>
          this.voterstatusApi.createVoterStatus(voter)
            .pipe(
              take(1)
            )
        )
      )
      .subscribe(() => {
        this.voterstatusDataSavedSubject.next(true);
      });

    this.voterstatusDataUpdateRequestSubject.pipe(
      concatMap((voter) =>
        this.voterstatusApi.updateVoterStatus(voter)
          .pipe(
            take(1)
          )
      )
    )
      .subscribe((res: any) => {
        if (res) {
          this.voterstatusDataUpdatedSubject.next(true);
        }
      })

    this.voterstatusDataRequestDeleteSubject.pipe(
      concatMap((id) =>
        this.voterstatusApi.deleteVoterStatus(id)
          .pipe(
            take(1)
          )
      )
    ).subscribe((res: any) => {
      if (res) {
        this.voterstatusDataDeletedSubject.next(true);
      }
    });
  }

  get voterStatusData$(): Observable<VoterStatusInterface[]> {
    return this.voterstatusDataSubject.asObservable();
  }

}
