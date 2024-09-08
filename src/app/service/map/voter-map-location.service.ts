import { Injectable } from "@angular/core";
import { VoterMapLocationApiService } from "../api";
import { concatMap, Observable, Subject, take, takeUntil } from "rxjs";
import { BaseService } from "../base.service";
import { VoterMapLocationInterface } from "../../interface/map";

@Injectable()
export class VoterMapLocationService extends BaseService {

  private voterLocationMarkerSubject = new Subject<VoterMapLocationInterface[]>();
  private voterLocationRequestSubject = new Subject();
  private voterLocationRequestCancelled = new Subject<boolean>();

  private voterLocationOnMap = new Map<number, VoterMapLocationInterface>();

  constructor(private voterMapLocationApi: VoterMapLocationApiService) {
    super();
  }

  /**
   * initialize subscriptions
   */
  onInit() {
    this.setVoterLocationSubscription();
  }

  /**
   * request data to the server
   */
  requestData() {
    this.voterLocationRequestSubject.next(null);
  }

  private setVoterLocationSubscription() {
    this.voterLocationRequestSubject.pipe(
      concatMap(() =>
        this.voterMapLocationApi.getVoterData().pipe(
          takeUntil(this.voterLocationRequestCancelled),
          take(1)
        )
      )
    )
      .subscribe((res: any) => {
        if (res) {
          res.data.forEach((loc: any) => {
            this.voterLocationOnMap.set(loc.id, {
              voter: {
                name: `${loc.firstname_middlename} ${loc.lastname}`,
                barangay: loc.barangay,
                purok: loc.purok,
                party: loc.party,
                position: loc.position
              },
              longitude: loc.longitude,
              latitude: loc.latitude
            })
          });

          this.voterLocationMarkerSubject.next(Array.from(this.voterLocationOnMap.values()));
        }
      });
  }

  /**
   * getters
   */
  get voterLocationMarkers$(): Observable<VoterMapLocationInterface[]> {
    return this.voterLocationMarkerSubject.asObservable();
  }

}
