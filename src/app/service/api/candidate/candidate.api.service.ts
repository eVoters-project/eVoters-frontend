import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment.development";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class CandidateApiService {
  urlApi = environment.urlAPI;

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${this.urlApi}/election-candidate`)
  }

  getById(id: string) {
    return this.http.get(`${this.urlApi}/election-candidate/${id}`);
  }

  getBySchedule(id: string) {
    return this.http.get(`${this.urlApi}/election-candidate/schedule/${id}`);
  }

  create(payload: any) {
    return this.http.post(`${this.urlApi}/election-candidate`, payload);
  }

  update(payload: any) {
    const { id, ...rest } = payload;
    return this.http.patch(`${this.urlApi}/election-candidate/${id}`, rest);
  }

  delete(id: string) {
    return this.http.delete(`${this.urlApi}/election-candidate/${id}`);
  }
}
