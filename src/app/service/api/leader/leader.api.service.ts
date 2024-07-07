import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment.development";

@Injectable()
export class LeaderApiService {

  urlApi = environment.urlAPI;

  constructor(private http: HttpClient) {}

  getLeaders() {

  }

}
