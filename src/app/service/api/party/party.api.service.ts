import { inject, Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment.development";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class PartyApiService {
  urlApi = environment.urlAPI;

  http = inject(HttpClient);

  constructor() { }

  getAll() {
    return this.http.get(`${this.urlApi}/party`);
  }

  getById(id: string) {
    return this.http.get(`${this.urlApi}/party/${id}`);
  }

  create(payload: any) {
    return this.http.post(`${this.urlApi}/party`, payload);
  }

  update(payload: any) {
    const { id, ...rest } = payload;
    return this.http.patch(`${this.urlApi}/party/${id}`, rest);
  }

  delete(id: string) {
    return this.http.delete(`${this.urlApi}/party/${id}`);
  }
}
