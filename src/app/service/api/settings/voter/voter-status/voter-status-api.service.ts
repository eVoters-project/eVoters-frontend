import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../../../environments/environment.development";
import { VoterStatusInterface } from "../../../../../interface";

@Injectable()
export class VoterStatusApiService {
  urlAPI = environment.urlAPI;

  constructor(private http: HttpClient) { }

  getVoterStatuses() {
    return this.http.get(`${this.urlAPI}/setup-voter-status`);
  }

  getVoterStatusById(id: string) {
    return this.http.get(`${this.urlAPI}/setup-voter-status/${id}`);
  }

  createVoterStatus(data: VoterStatusInterface) {
    return this.http.post(`${this.urlAPI}/setup-voter-status`, data);
  }

  updateVoterStatus(data: Partial<VoterStatusInterface>) {
    const { id, ...payload } = data;
    return this.http.patch(`${this.urlAPI}/setup-voter-status/${id}`, payload);
  }

  deleteVoterStatus(id: string) {
    return this.http.delete(`${this.urlAPI}/setup-voter-status/${id}`);
  }
}
