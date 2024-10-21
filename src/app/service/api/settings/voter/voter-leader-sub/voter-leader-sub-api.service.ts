import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../../../environments/environment.development";
import { VoterLeaderSubInterface } from "../../../../../interface";

@Injectable()
export class VoterLeaderSubApiService {
  urlAPI = environment.urlAPI;

  constructor(private http: HttpClient) { }

  getVoterLeadersSub() {
    return this.http.get(`${this.urlAPI}/setup-voter-leader-sub`);
  }

  getVoterLeaderSubById(id: string) {
    return this.http.get(`${this.urlAPI}/setup-voter-leader-sub/${id}`);
  }

  createVoterLeaderSub(data: VoterLeaderSubInterface) {
    return this.http.post(`${this.urlAPI}/setup-voter-leader-sub`, data);
  }

  updateVoterLeaderSub(data: Partial<VoterLeaderSubInterface>) {
    const { id, ...payload } = data;
    return this.http.patch(`${this.urlAPI}/setup-voter-leader-sub/${id}`, payload);
  }

  deleteVoterLeaderSub(id: string) {
    return this.http.delete(`${this.urlAPI}/setup-voter-leader-sub/${id}`);
  }
}
