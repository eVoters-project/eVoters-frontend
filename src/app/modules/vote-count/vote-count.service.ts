import { Injectable, signal } from "@angular/core";
import { VoteCountFilterInterface } from "./interface/filter.interface";
import { Subject } from "rxjs";

@Injectable()
export class VoteCountService {

  private filters = signal<VoteCountFilterInterface | null>(null);

  setFilters(filter: VoteCountFilterInterface) {
    this.filters.set(filter);
  }

  getFilters() {
    return this.filters;
  }

}
