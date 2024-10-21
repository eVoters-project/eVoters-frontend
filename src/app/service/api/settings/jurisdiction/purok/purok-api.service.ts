import { Injectable } from "@angular/core";
import { environment } from "../../../../../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { PurokInterface } from "../../../../../interface";

@Injectable()
export class PurokApiService {
  urlAPI = environment.urlAPI;

  constructor(private http: HttpClient) { }

  getPuroks() {
    return this.http.get(`${this.urlAPI}/setup-area-purok`);
  }

  getPurokById(id: string) {
    return this.http.get(`${this.urlAPI}/setup-area-purok/${id}`);
  }

  createPurok(data: PurokInterface) {
    return this.http.post(`${this.urlAPI}/setup-area-purok`, data);
  }

  updatePurok(data: Partial<PurokInterface>) {
    const { id, ...payload } = data;
    return this.http.patch(`${this.urlAPI}/setup-area-purok/${id}`, payload);
  }

  deletePurok(id: string) {
    return this.http.delete(`${this.urlAPI}/setup-area-purok/${id}`);
  }
}
