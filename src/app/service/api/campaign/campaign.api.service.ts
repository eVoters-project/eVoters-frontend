import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment.development";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class CampaignApiService {

  urlApi = environment.urlAPI;

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${this.urlApi}/campaign`)
  }

  getById(id: string) {
    return this.http.get(`${this.urlApi}/campaign/${id}`);
  }

  create(payload: any) {
    return this.http.post(`${this.urlApi}/campaign`, payload);
  }

  update(payload: any) {
    const { id, ...rest } = payload;
    return this.http.patch(`${this.urlApi}/campaign/${id}`, rest);
  }

  delete(id: string) {
    return this.http.delete(`${this.urlApi}/campaign/${id}`);
  }

  sendSMS(payload: any) {
    return this.http.post(`${this.urlApi}/campaign/send-sms-campaign`, payload);
  }

}
