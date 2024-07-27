import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment.development";

@Injectable()
export class LeaderApiService {

  urlApi = environment.urlAPI;

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${this.urlApi}/leader`)
  }

  getById(id: string) {
    return this.http.get(`${this.urlApi}/leader/${id}`);
  }

  create(payload: any) {
    return this.http.post(`${this.urlApi}/leader`, payload);
  }

  update(payload: any) {
    const { id, ...rest } = payload;
    return this.http.patch(`${this.urlApi}/leader/${id}`, rest);
  }

  delete(id: string) {
    return this.http.delete(`${this.urlApi}/leader/${id}`);
  }

}
