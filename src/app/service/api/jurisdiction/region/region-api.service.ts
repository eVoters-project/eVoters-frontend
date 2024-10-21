import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../../environments/environment.development";
import { RegionInterface } from "../../../../interface";

@Injectable()
export class RegionApiService {
  urlAPI = environment.urlAPI;

  constructor(private http: HttpClient) { }

  getRegions() {
    return this.http.get(`${this.urlAPI}/setup-area-region`);
  }

  getRegionById(id: string) {
    return this.http.get(`${this.urlAPI}/setup-area-region/${id}`);
  }

  createRegion(data: RegionInterface) {
    return this.http.post(`${this.urlAPI}/setup-area-region`, data);
  }

  updateRegion(data: Partial<RegionInterface>) {
    const { id, ...payload } = data;
    return this.http.patch(`${this.urlAPI}/setup-area-region/${id}`, payload);
  }

  deleteRegion(id: string) {
    return this.http.delete(`${this.urlAPI}/setup-area-region/${id}`);
  }
}
