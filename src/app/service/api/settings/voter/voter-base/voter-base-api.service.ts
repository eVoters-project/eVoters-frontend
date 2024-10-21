import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../../../environments/environment.development";
import { VoterBaseInterface } from "../../../../../interface";

@Injectable()
export class VoterBaseApiService {
  urlAPI = environment.urlAPI;

  constructor(private http: HttpClient) { }

  getVoterBases() {
    return this.http.get(`${this.urlAPI}/setup-voter-base`);
  }

  getVoterBaseById(id: string) {
    return this.http.get(`${this.urlAPI}/setup-voter-base/${id}`);
  }

  createVoterBase(data: VoterBaseInterface) {
    return this.http.post(`${this.urlAPI}/setup-voter-base`, data);
  }

  updateVoterBase(data: Partial<VoterBaseInterface>) {
    const { id, ...payload } = data;
    return this.http.patch(`${this.urlAPI}/setup-voter-base/${id}`, payload);
  }

  deleteVoterBase(id: string) {
    return this.http.delete(`${this.urlAPI}/setup-voter-base/${id}`);
  }
}
