import { Injectable } from "@angular/core";
import { environment } from "../../../../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { ElectionPositionInterface } from "../../../../interface";

@Injectable()
export class ElectionPositionApiService {
  urlAPI = environment.urlAPI;

  constructor(private http: HttpClient) { }

  getElectionPositions() {
    return this.http.get(`${this.urlAPI}/setup-election-position`);
  }

  getElectionPositionById(id: string) {
    return this.http.get(`${this.urlAPI}/setup-election-position/${id}`);
  }

  createElectionPosition(data: ElectionPositionInterface) {
    return this.http.post(`${this.urlAPI}/setup-election-position`, data);
  }

  updateElectionPosition(data: Partial<ElectionPositionInterface>) {
    const { id, ...payload } = data;
    return this.http.patch(`${this.urlAPI}/setup-election-position/${id}`, payload);
  }

  deleteElectionPosition(id: string) {
    return this.http.delete(`${this.urlAPI}/setup-election-position/${id}`);
  }
}
