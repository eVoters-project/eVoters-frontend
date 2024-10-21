import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../../../environments/environment.development";
import { VoterInfluenceInterface } from "../../../../../interface";

@Injectable()
export class VoterInfluenceApiService {
  urlAPI = environment.urlAPI;

  constructor(private http: HttpClient) { }

  getVoterInfluences() {
    return this.http.get(`${this.urlAPI}/setup-voter-influence`);
  }

  getVoterInfluenceById(id: string) {
    return this.http.get(`${this.urlAPI}/setup-voter-influence/${id}`);
  }

  createVoterInfluence(data: VoterInfluenceInterface) {
    return this.http.post(`${this.urlAPI}/setup-voter-influence`, data);
  }

  updateVoterInfluence(data: Partial<VoterInfluenceInterface>) {
    const { id, ...payload } = data;
    return this.http.patch(`${this.urlAPI}/setup-voter-influence/${id}`, payload);
  }

  deleteVoterInfluence(id: string) {
    return this.http.delete(`${this.urlAPI}/setup-voter-influence/${id}`);
  }
}
