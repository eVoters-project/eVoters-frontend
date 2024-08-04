import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment.development";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class VoterLeaderApiService {
  urlAPI = environment.urlAPI;

  constructor(private http: HttpClient) { }

  getVoterLeaders() {
    return this.http.get(`${this.urlAPI}/setup-voter-leader`);
  }

  getVoterLeaderById(id: string) {
    return this.http.get(`${this.urlAPI}/setup-voter-leader/${id}`);
  }

  // createVoterLeader(data: VoterInterface) {
  //   return this.http.post(`${this.urlAPI}/setup-voter-leader`, data);
  // }

  // updateVoterLeader(data: Partial<VoterInterface>) {
  //   const { id, ...payload } = data;
  //   return this.http.patch(`${this.urlAPI}/setup-voter-leader/${id}`, payload);
  // }

  deleteVoterLeader(id: string) {
    return this.http.delete(`${this.urlAPI}/setup-voter-leader/${id}`);
  }
}
