import { Injectable } from "@angular/core";
import { environment } from "../../../../../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { BarangayInterface } from "../../../../../interface";

@Injectable()
export class BarangayApiService {
  urlAPI = environment.urlAPI;

  constructor(private http: HttpClient) { }

  getBarangays() {
    return this.http.get(`${this.urlAPI}/setup-area-barangay`);
  }

  getBarangayById(id: string) {
    return this.http.get(`${this.urlAPI}/setup-area-barangay/${id}`);
  }

  createBarangay(data: BarangayInterface) {
    return this.http.post(`${this.urlAPI}/setup-area-barangay`, data);
  }

  updateBarangay(data: Partial<BarangayInterface>) {
    const { id, ...payload } = data;
    return this.http.patch(`${this.urlAPI}/setup-area-barangay/${id}`, payload);
  }

  deleteBarangay(id: string) {
    return this.http.delete(`${this.urlAPI}/setup-area-barangay/${id}`);
  }
}
