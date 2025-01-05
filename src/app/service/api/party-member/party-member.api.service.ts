import { inject, Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment.development";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class PartyMemberApiService {

  urlApi = environment.urlAPI;

  http = inject(HttpClient);

  constructor() { }

  getAll() {
    return this.http.get(`${this.urlApi}/party-member`);
  }

  getById(id: string) {
    return this.http.get(`${this.urlApi}/party-member/${id}`);
  }

  getByParty(id: string) {
    return this.http.get(`${this.urlApi}/party-member/party/${id}`);
  }

  create(payload: any) {
    return this.http.post(`${this.urlApi}/party-member`, payload);
  }

  update(payload: any) {
    const { id, ...rest } = payload;
    return this.http.patch(`${this.urlApi}/party-member/${id}`, rest);
  }

  delete(id: string) {
    return this.http.delete(`${this.urlApi}/party-member/${id}`);
  }

}
