import { inject, Injectable } from "@angular/core";
import { VoteTallyApiService } from "../../service/api";
import { concatMap, Observable, Subject, take, takeUntil } from "rxjs";
import { RequestVoteTallyInterface, VoteTallyInterface } from "../../interface";

@Injectable()
export class VoteTallyService {
  private voteTallyApi = inject(VoteTallyApiService);

  private voteTallyDataSubject = new Subject<VoteTallyInterface[]>;
  private voteTallyDataRequestSubject = new Subject<RequestVoteTallyInterface | null>();
  private voteTallyDataRequestCancelled = new Subject<boolean>();

  private voteTallyDataUpdateRequestSubject = new Subject<Partial<VoteTallyInterface>>();
  private voteTallyDataUpdatedSubject = new Subject<boolean>();

  private voteTallyDataRequestSaveSubject = new Subject<VoteTallyInterface>();
  private voteTallyDataSavedSubject = new Subject<boolean>();

  private voteTallyDataRequestDeleteSubject = new Subject<string>();
  private voteTallyDataDeletedSubject = new Subject<boolean>();

  constructor() { }

  onInit() {
    this.setVoteTallyDataSubscription();
  }

  requestData(params: RequestVoteTallyInterface | null) {
    this.voteTallyDataRequestSubject.next(params);
  }

  saveData(voter: VoteTallyInterface) {
    this.voteTallyDataRequestSaveSubject.next(voter);
    return this.voteTallyDataSavedSubject.asObservable();
  }

  updateData(voter: Partial<VoteTallyInterface>) {
    this.voteTallyDataUpdateRequestSubject.next(voter);
    return this.voteTallyDataUpdatedSubject.asObservable();
  }

  deleteData(id: string) {
    this.voteTallyDataRequestDeleteSubject.next(id);
    return this.voteTallyDataDeletedSubject.asObservable();
  }

  setVoteTallyDataSubscription() {
    this.voteTallyDataRequestSubject.pipe(
      concatMap((params) => {
        if (params && params.id) {
          /*
            possible additional switch or if statement if we have different types we are looking for,
            for now default to schedule
          */
          switch (params.type) {
            default: {
              return this.voteTallyApi.getBySchedule(params.id).pipe(
                takeUntil(this.voteTallyDataRequestCancelled),
                take(1)
              )
            }
          }
        } else {
          return this.voteTallyApi.getAll().pipe(
            takeUntil(this.voteTallyDataRequestCancelled),
            take(1)
          )
        }
      })
    )
      .subscribe((res: any) => {
        if (res) {
          this.voteTallyDataSubject.next(res.data);
        }
      });

    this.voteTallyDataRequestSaveSubject
      .pipe(
        concatMap((party) =>
          this.voteTallyApi.create(party)
            .pipe(
              take(1)
            )
        )
      )
      .subscribe(() => {
        this.voteTallyDataSavedSubject.next(true);
      });

    this.voteTallyDataUpdateRequestSubject.pipe(
      concatMap((party) =>
        this.voteTallyApi.update(party)
          .pipe(
            take(1)
          )
      )
    )
      .subscribe((res: any) => {
        if (res) {
          this.voteTallyDataUpdatedSubject.next(true);
        }
      });

    this.voteTallyDataRequestDeleteSubject.pipe(
      concatMap((id) =>
        this.voteTallyApi.delete(id)
          .pipe(
            take(1)
          )
      )
    ).subscribe((res: any) => {
      if (res) {
        this.voteTallyDataDeletedSubject.next(true);
      }
    });
  }

  get voteTallyData$(): Observable<VoteTallyInterface[]> {
    return this.voteTallyDataSubject.asObservable();
  }
}
