import { inject, Injectable } from "@angular/core";
import { LeaderApiService } from "../../service/api";
import { concatMap, Observable, Subject, take, takeUntil } from "rxjs";
import { LeaderInterface } from "../../interface/modules/leader/leader.interface";

@Injectable()
export class LeaderService {

  private leaderApi = inject(LeaderApiService);

  private leaderDataSubject = new Subject<LeaderInterface[]>();
  private leaderDataRequestSubject = new Subject();
  private leaderDataRequestCancelled = new Subject<boolean>();

  private leaderDataUpdateRequestSubject = new Subject<Partial<LeaderInterface>>();
  private leaderDataUpdatedSubject = new Subject<boolean>();

  private leaderDataRequestSaveSubject = new Subject<LeaderInterface>();
  private leaderDataSavedSubject = new Subject<boolean>();

  private leaderDataRequestDeleteSubject = new Subject<string>();
  private leaderDataDeletedSubject = new Subject<boolean>();

  constructor() { }

  onInit() {
    this.setLeaderDataSubscription();
  }

  requestData() {
    this.leaderDataRequestSubject.next(null);
  }

  saveData(leader: LeaderInterface) {
    this.leaderDataRequestSaveSubject.next(leader);
    return this.leaderDataSavedSubject.asObservable();
  }

  updateData(leader: Partial<LeaderInterface>) {
    this.leaderDataUpdateRequestSubject.next(leader);
    return this.leaderDataUpdatedSubject.asObservable();
  }

  deleteData(id: string) {
    this.leaderDataRequestDeleteSubject.next(id);
    return this.leaderDataDeletedSubject.asObservable();
  }

  setLeaderDataSubscription() {
    this.leaderDataRequestSubject.pipe(
      concatMap(() =>
        this.leaderApi.getAll().pipe(
          takeUntil(this.leaderDataRequestCancelled),
          take(1)
        )
      )
    )
      .subscribe((res: any) => {
        if (res) {
          this.leaderDataSubject.next(res.data);
        };
      });

    this.leaderDataRequestSaveSubject
      .pipe(
        concatMap((voter) =>
          this.leaderApi.create(voter)
            .pipe(
              take(1)
            )
        )
      )
      .subscribe(() => {
        this.leaderDataSavedSubject.next(true);
      });

    this.leaderDataUpdateRequestSubject.pipe(
      concatMap((leader) =>
        this.leaderApi.update(leader)
          .pipe(
            take(1)
          )
      )
    ).subscribe((res: any) => {
      if (res) {
        this.leaderDataUpdatedSubject.next(true);
      }
    });

    this.leaderDataRequestDeleteSubject.pipe(
      concatMap((id) =>
        this.leaderApi.delete(id)
          .pipe(
            take(1)
          )
      )
    ).subscribe((res: any) => {
      if (res) {
        this.leaderDataDeletedSubject.next(true);
      }
    });
  }

  get leaderData$(): Observable<LeaderInterface[]> {
    return this.leaderDataSubject.asObservable();
  }

}
