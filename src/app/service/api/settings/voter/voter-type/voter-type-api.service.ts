import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../../../environments/environment.development";
import { VoterTypeInterface } from "../../../../../interface";

@Injectable()
export class VoterTypeApiService {
  urlAPI = environment.urlAPI;

  constructor(private http: HttpClient) { }

  getVoterTypes() {
    return this.http.get(`${this.urlAPI}/setup-voter-type`);
  }

  getVoterTypeById(id: string) {
    return this.http.get(`${this.urlAPI}/setup-voter-type/${id}`);
  }

  createVoterType(data: VoterTypeInterface) {
    return this.http.post(`${this.urlAPI}/setup-voter-type`, data);
  }

  updateVoterType(data: Partial<VoterTypeInterface>) {
    const { id, ...payload } = data;
    return this.http.patch(`${this.urlAPI}/setup-voter-type/${id}`, payload);
  }

  deleteVoterType(id: string) {
    return this.http.delete(`${this.urlAPI}/setup-voter-type/${id}`);
  }
}
