import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../../../environments/environment.development";
import { VoterInfluenceSubInterface } from "../../../../../interface";

@Injectable()
export class VoterInfluenceSubApiService {
  urlAPI = environment.urlAPI;

  constructor(private http: HttpClient) { }

  getVoterInfluencesSub() {
    return this.http.get(`${this.urlAPI}/setup-voter-influence-sub`);
  }

  getVoterInfluenceSubById(id: string) {
    return this.http.get(`${this.urlAPI}/setup-voter-influence-sub/${id}`);
  }

  createVoterInfluenceSub(data: VoterInfluenceSubInterface) {
    return this.http.post(`${this.urlAPI}/setup-voter-influence-sub`, data);
  }

  updateVoterInfluenceSub(data: Partial<VoterInfluenceSubInterface>) {
    const { id, ...payload } = data;
    return this.http.patch(`${this.urlAPI}/setup-voter-influence-sub/${id}`, payload);
  }

  deleteVoterInfluenceSub(id: string) {
    return this.http.delete(`${this.urlAPI}/setup-voter-influence-sub/${id}`);
  }
}
