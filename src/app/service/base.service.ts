import { Injectable, OnDestroy } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class BaseService implements OnDestroy {
  protected unsub = new Subject();

  ngOnDestroy(): void {
      this.unsub.next(null);
      this.unsub.complete();
  }
}
