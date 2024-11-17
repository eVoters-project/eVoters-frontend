import { Injectable } from "@angular/core";
import { environment } from "../../../../../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { ElectionPrecinctInterface } from "../../../../../interface";

@Injectable()
export class ElectionPrecinctApiService {
  urlAPI = environment.urlAPI;

  constructor(private http: HttpClient) { }

  getElectionPrecincts() {
    return this.http.get(`${this.urlAPI}/setup-election-precinct`);
  }

  getElectionPrecinctById(id: string) {
    return this.http.get(`${this.urlAPI}/setup-election-precinct/${id}`);
  }

  createElectionPrecinct(data: ElectionPrecinctInterface) {
    return this.http.post(`${this.urlAPI}/setup-election-precinct`, data);
  }

  updateElectionPrecinct(data: Partial<ElectionPrecinctInterface>) {
    const { id, ...payload } = data;
    return this.http.patch(`${this.urlAPI}/setup-election-precinct/${id}`, payload);
  }

  deleteElectionPrecinct(id: string) {
    return this.http.delete(`${this.urlAPI}/setup-election-precinct/${id}`);
  }
}
