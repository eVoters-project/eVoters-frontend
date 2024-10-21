import { inject, Injectable } from "@angular/core";
import { VoterLeaderApiService } from "../../../../service/api/voter-leader/voter-leader.api.service";
import { VoterLeaderInterface } from "../../../../interface";
import { Subject, concatMap, takeUntil, take, Observable } from "rxjs";

@Injectable()
export class VoterLeaderService {
  private voterleaderApi = inject(VoterLeaderApiService);

  private voterleaderDataSubject = new Subject<VoterLeaderInterface[]>;
  private voterleaderDataRequestSubject = new Subject();
  private voterleaderDataRequestCancelled = new Subject<boolean>();

  private voterleaderDataUpdateRequestSubject = new Subject<Partial<VoterLeaderInterface>>();
  private voterleaderDataUpdatedSubject = new Subject<boolean>();

  private voterleaderDataRequestSaveSubject = new Subject<VoterLeaderInterface>();
  private voterleaderDataSavedSubject = new Subject<boolean>();

  private voterleaderDataRequestDeleteSubject = new Subject<string>();
  private voterleaderDataDeletedSubject = new Subject<boolean>();

  constructor() { }

  onInit() {
    this.setVoterLeaderDataSubscription();
  }

  requestData() {
    this.voterleaderDataRequestSubject.next(null);
  }

  saveData(barangay: VoterLeaderInterface) {
    this.voterleaderDataRequestSaveSubject.next(barangay);
    return this.voterleaderDataSavedSubject.asObservable();
  }

  updateData(barangay: Partial<VoterLeaderInterface>) {
    this.voterleaderDataUpdateRequestSubject.next(barangay);
    return this.voterleaderDataUpdatedSubject.asObservable();
  }

  deleteData(id: string) {
    this.voterleaderDataRequestDeleteSubject.next(id);
    return this.voterleaderDataDeletedSubject.asObservable();
  }

  setVoterLeaderDataSubscription() {
    this.voterleaderDataRequestSubject.pipe(
      concatMap(() =>
        this.voterleaderApi.getVoterLeaders().pipe(
          takeUntil(this.voterleaderDataRequestCancelled),
          take(1)
        )
      )
    )
      .subscribe((res: any) => {
        if (res) {
          this.voterleaderDataSubject.next(res.data);
        }
      });

    this.voterleaderDataRequestSaveSubject
      .pipe(
        concatMap((voter) =>
          this.voterleaderApi.createVoterLeader(voter)
            .pipe(
              take(1)
            )
        )
      )
      .subscribe(() => {
        this.voterleaderDataSavedSubject.next(true);
      });

    this.voterleaderDataUpdateRequestSubject.pipe(
      concatMap((voter) =>
        this.voterleaderApi.updateVoterLeader(voter)
          .pipe(
            take(1)
          )
      )
    )
      .subscribe((res: any) => {
        if (res) {
          this.voterleaderDataUpdatedSubject.next(true);
        }
      })

    this.voterleaderDataRequestDeleteSubject.pipe(
      concatMap((id) =>
        this.voterleaderApi.deleteVoterLeader(id)
          .pipe(
            take(1)
          )
      )
    ).subscribe((res: any) => {
      if (res) {
        this.voterleaderDataDeletedSubject.next(true);
      }
    });
  }

  get voterLeaderData$(): Observable<VoterLeaderInterface[]> {
    return this.voterleaderDataSubject.asObservable();
  }

}
