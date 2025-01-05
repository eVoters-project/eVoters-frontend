import { Injectable } from "@angular/core";
import { environment } from "../../../../../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { ElectionCandidateInterface } from "../../../../../interface";

@Injectable()
export class ElectionCandidateApiService {
  urlAPI = environment.urlAPI;

  constructor(private http: HttpClient) { }

  getElectionCandidates() {
    return this.http.get(`${this.urlAPI}/election-candidate`);
  }

  getElectionCandidateById(id: string) {
    return this.http.get(`${this.urlAPI}/election-candidate/${id}`);
  }

  createElectionCandidate(data: ElectionCandidateInterface) {
    return this.http.post(`${this.urlAPI}/election-candidate`, data);
  }

  updateElectionCandidate(data: Partial<ElectionCandidateInterface>) {
    const { id, ...payload } = data;
    return this.http.patch(`${this.urlAPI}/election-candidate/${id}`, payload);
  }

  deleteElectionCandidate(id: string) {
    return this.http.delete(`${this.urlAPI}/election-candidate/${id}`);
  }
}
