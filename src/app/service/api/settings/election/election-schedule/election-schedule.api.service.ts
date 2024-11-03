import { Injectable } from "@angular/core";
import { environment } from "../../../../../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { ElectionScheduleInterface } from "../../../../../interface";

@Injectable()
export class ElectionScheduleApiService {
  urlAPI = environment.urlAPI;

  constructor(private http: HttpClient) { }

  getElectionSchedules() {
    return this.http.get(`${this.urlAPI}/setup-election-schedule`);
  }

  getElectionScheduleById(id: string) {
    return this.http.get(`${this.urlAPI}/setup-election-schedule/${id}`);
  }

  createElectionSchedule(data: ElectionScheduleInterface) {
    return this.http.post(`${this.urlAPI}/setup-election-schedule`, data);
  }

  updateElectionSchedule(data: Partial<ElectionScheduleInterface>) {
    const { id, ...payload } = data;
    return this.http.patch(`${this.urlAPI}/setup-election-schedule/${id}`, payload);
  }

  deleteElectionSchedule(id: string) {
    return this.http.delete(`${this.urlAPI}/setup-election-schedule/${id}`);
  }
}
