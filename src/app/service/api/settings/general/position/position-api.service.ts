import { Injectable } from "@angular/core";
import { environment } from "../../../../../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { PositionInterface } from "../../../../../interface";

@Injectable()
export class PositionApiService {
    urlAPI = environment.urlAPI;
    
      constructor(private http: HttpClient) { }
    
      getPositions() {
        return this.http.get(`${this.urlAPI}/setup-position`);
      }
    
      getPositionById(id: string) {
        return this.http.get(`${this.urlAPI}/setup-position/${id}`);
      }
    
      createPosition(data: PositionInterface) {
        return this.http.post(`${this.urlAPI}/setup-position`, data);
      }
    
      updatePosition(data: Partial<PositionInterface>) {
        const { id, ...payload } = data;
        return this.http.patch(`${this.urlAPI}/setup-position/${id}`, payload);
      }
    
      deletePosition(id: string) {
        return this.http.delete(`${this.urlAPI}/setup-position/${id}`);
      }
}