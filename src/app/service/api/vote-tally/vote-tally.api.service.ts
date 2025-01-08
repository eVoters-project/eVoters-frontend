import { inject, Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment.development";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class VoteTallyApiService {
  urlApi = environment.urlAPI;

  http = inject(HttpClient);

  constructor() { }

  getAll() {
    return this.http.get(`${this.urlApi}/trx-election-tally`);
  }

  getById(id: string) {
    return this.http.get(`${this.urlApi}/trx-election-tally/${id}`);
  }

  getBySchedule(id: string) {
    return this.http.get(`${this.urlApi}/trx-election-tally/schedule/${id}`);
  }

  create(payload: any) {
    return this.http.post(`${this.urlApi}/trx-election-tally`, payload);
  }

  update(payload: any) {
    const { id, ...rest } = payload;
    return this.http.patch(`${this.urlApi}/trx-election-tally/${id}`, rest);
  }

  delete(id: string) {
    return this.http.delete(`${this.urlApi}/trx-election-tally/${id}`);
  }
}
