import { inject, Injectable } from "@angular/core";
import { CampaignApiService } from "../../service/api";
import { concatMap, Observable, Subject, take, takeUntil } from "rxjs";
import { CampaignInterface } from "./data/interface";

@Injectable()
export class CampaignService {

  private campaignApi = inject(CampaignApiService);

  private campaignDataSubject = new Subject<CampaignInterface[]>();
  private campaignDataRequestSubject = new Subject();
  private campaignDataRequestCancelled = new Subject<boolean>();

  private campaignDataUpdateRequestSubject = new Subject<Partial<CampaignInterface>>();
  private campaignDataUpdatedSubject = new Subject<boolean>();

  private campaignDataRequestSaveSubject = new Subject<CampaignInterface>();
  private campaignDataSavedSubject = new Subject<boolean>();

  private leaderDataRequestDeleteSubject = new Subject<string>();
  private leaderDataDeletedSubject = new Subject<boolean>();

  onInit() {
    this.setCampaignDataSubscription();
  }

  requestData() {
    this.campaignDataRequestSubject.next(null);
  }

  saveData(leader: CampaignInterface) {
    this.campaignDataRequestSaveSubject.next(leader);
    return this.campaignDataSavedSubject.asObservable();
  }

  updateData(leader: Partial<CampaignInterface>) {
    this.campaignDataUpdateRequestSubject.next(leader);
    return this.campaignDataUpdatedSubject.asObservable();
  }

  deleteData(id: string) {
    this.leaderDataRequestDeleteSubject.next(id);
    return this.leaderDataDeletedSubject.asObservable();
  }

  setCampaignDataSubscription() {
    this.campaignDataRequestSubject.pipe(
      concatMap(() =>
        this.campaignApi.getAll().pipe(
          takeUntil(this.campaignDataRequestCancelled),
          take(1)
        )
      )
    )
      .subscribe((res: any) => {
        if (res) {
          this.campaignDataSubject.next(res.data);
        };
      });

    this.campaignDataRequestSaveSubject
      .pipe(
        concatMap((campaign) =>
          this.campaignApi.create(campaign)
            .pipe(
              take(1)
            )
        )
      )
      .subscribe(() => {
        this.campaignDataSavedSubject.next(true);
      });

    this.campaignDataUpdateRequestSubject.pipe(
      concatMap((campaign) =>
        this.campaignApi.update(campaign)
          .pipe(
            take(1)
          )
      )
    )
      .subscribe((res: any) => {
        if (res) {
          this.campaignDataUpdatedSubject.next(true);
        }
      });

    this.leaderDataRequestDeleteSubject.pipe(
      concatMap((id) =>
        this.campaignApi.delete(id)
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

  get campaignData$(): Observable<CampaignInterface[]> {
    return this.campaignDataSubject.asObservable();
  }

}
