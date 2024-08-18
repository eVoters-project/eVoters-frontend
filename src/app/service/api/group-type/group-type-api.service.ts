import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { GroupTypeInterface } from "../../../interface";

@Injectable()
export class GroupTypeApiService {
  urlAPI = environment.urlAPI;

  constructor(private http: HttpClient) { }

  getGroupTypes() {
    return this.http.get(`${this.urlAPI}/setup-group-type`);
  }

  getGroupTypeById(id: string) {
    return this.http.get(`${this.urlAPI}/setup-group-type/${id}`);
  }

  createGroupType(data: GroupTypeInterface) {
    return this.http.post(`${this.urlAPI}/setup-group-type`, data);
  }

  updateGroupType(data: Partial<GroupTypeInterface>) {
    const { id, ...payload } = data;
    return this.http.patch(`${this.urlAPI}/setup-group-type/${id}`, payload);
  }

  deleteGroupType(id: string) {
    return this.http.delete(`${this.urlAPI}/setup-group-type/${id}`);
  }
}
