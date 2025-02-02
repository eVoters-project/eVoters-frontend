import { inject, Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment.development";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class VoteTallyApiService {
  urlApi = environment.urlAPI;

  http = inject(HttpClient);

  constructor() { }

  getAll() {
    return this.http.get(`${this.urlApi}/election-tally`);
  }

  getById(id: string) {
    return this.http.get(`${this.urlApi}/election-tally/${id}`);
  }

  getBySchedule(id: string) {
    return this.http.get(`${this.urlApi}/election-tally/schedule/${id}`);
  }

  create(payload: any) {
    return this.http.post(`${this.urlApi}/election-tally`, payload);
  }

  update(payload: any) {
    const { id, ...rest } = payload;
    return this.http.patch(`${this.urlApi}/election-tally/${id}`, rest);
  }

  delete(id: string) {
    return this.http.delete(`${this.urlApi}/election-tally/${id}`);
  }
}
