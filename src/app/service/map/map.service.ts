import { Injectable } from "@angular/core";
import { VoterMapLocationService } from "./voter-map-location.service";

@Injectable()
export class MapService {

  constructor(private voterMapLocationService: VoterMapLocationService) {
    this.voterMapLocationService.onInit();
  }

  /**
   * get voter locations from the server
   */
  getVoterLocations() {
    this.voterMapLocationService.requestData();
  }

}
