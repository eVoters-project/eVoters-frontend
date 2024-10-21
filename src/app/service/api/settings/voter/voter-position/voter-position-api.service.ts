import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../../../environments/environment.development";
import { VoterPositionInterface } from "../../../../../interface";

@Injectable()
export class VoterPositionApiService {
  urlAPI = environment.urlAPI;

  constructor(private http: HttpClient) { }

  getVoterPositions() {
    return this.http.get(`${this.urlAPI}/setup-voter-position`);
  }

  getVoterPositionById(id: string) {
    return this.http.get(`${this.urlAPI}/setup-voter-position/${id}`);
  }

  createVoterPosition(data: VoterPositionInterface) {
    return this.http.post(`${this.urlAPI}/setup-voter-position`, data);
  }

  updateVoterPosition(data: Partial<VoterPositionInterface>) {
    const { id, ...payload } = data;
    return this.http.patch(`${this.urlAPI}/setup-voter-position/${id}`, payload);
  }

  deleteVoterPosition(id: string) {
    return this.http.delete(`${this.urlAPI}/setup-voter-position/${id}`);
  }
}
