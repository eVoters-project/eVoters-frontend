import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment.development";
import { VoterInterface } from "../../../interface";

@Injectable()
export class VoterApiService {

  urlAPI = environment.urlAPI;

  constructor(private http: HttpClient) { }

  getVoters() {
    return this.http.get(`${this.urlAPI}/voters`);
  }

  getVoterById(id: string) {
    return this.http.get(`${this.urlAPI}/voters/${id}`);
  }

  createVoter(data: VoterInterface) {
    return this.http.post(`${this.urlAPI}/voters`, data);
  }

  updateVoter(data: VoterInterface) {
    const { id, ...payload } = data;
    return this.http.patch(`${this.urlAPI}/voters/${id}`, payload);
  }

  deleteVoter(id: string) {
    return this.http.delete(`${this.urlAPI}/voters/${id}`);
  }

}
