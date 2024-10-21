import { Injectable } from "@angular/core";
import { environment } from "../../../../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { LGUInterface } from "../../../../interface";

@Injectable()
export class LGUApiService {
  urlAPI = environment.urlAPI;

  constructor(private http: HttpClient) { }

  getLGUs() {
    return this.http.get(`${this.urlAPI}/setup-area-lgu`);
  }

  getLGUById(id: string) {
    return this.http.get(`${this.urlAPI}/setup-area-lgu/${id}`);
  }

  createLGU(data: LGUInterface) {
    return this.http.post(`${this.urlAPI}/setup-area-lgu`, data);
  }

  updateLGU(data: Partial<LGUInterface>) {
    const { id, ...payload } = data;
    return this.http.patch(`${this.urlAPI}/setup-area-lgu/${id}`, payload);
  }

  deleteLGU(id: string) {
    return this.http.delete(`${this.urlAPI}/setup-area-lgu/${id}`);
  }
}
