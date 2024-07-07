import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment.development";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class VoterMapLocationApiService {

  urlApi = environment.urlAPI;

  constructor(private http: HttpClient) {}

  getVoterData() {
    return this.http.get(`${this.urlApi}/voters`);
  }

}
