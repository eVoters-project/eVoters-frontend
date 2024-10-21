import { Injectable } from "@angular/core";
import { environment } from "../../../../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { ProvinceInterface } from "../../../../interface";

@Injectable()
export class ProvinceApiService {
  urlAPI = environment.urlAPI;

  constructor(private http: HttpClient) { }

  getProvinces() {
    return this.http.get(`${this.urlAPI}/setup-area-province`);
  }

  getProvinceById(id: string) {
    return this.http.get(`${this.urlAPI}/setup-area-province/${id}`);
  }

  createProvince(data: ProvinceInterface) {
    return this.http.post(`${this.urlAPI}/setup-area-province`, data);
  }

  updateProvince(data: Partial<ProvinceInterface>) {
    const { id, ...payload } = data;
    return this.http.patch(`${this.urlAPI}/setup-area-province/${id}`, payload);
  }

  deleteProvince(id: string) {
    return this.http.delete(`${this.urlAPI}/setup-area-province/${id}`);
  }
}
