import { Injectable } from "@angular/core";
import { catchError, concat, concatMap, delay, Observable, of, Subject, takeUntil, toArray } from "rxjs";

@Injectable()
export class PerformApiService {

  private results = (
    item: {
      tag: string,
      result: any,
      error: any | null
    }[]) => of(item)
      .pipe(delay(1000));

  performApi(actions: { action: () => Observable<any>, tag: string }[], unbSubscribe$: Subject<void>) {
    return concat(...actions.map(({ action, tag }) =>
      action().pipe(
        delay(300),
        concatMap(res => this.results([{ tag, result: res, error: null }])),
        catchError(err => this.results([{ tag, result: null, error: err }]))
      )
    )).pipe(
      concatMap(res => res),
      toArray(),
      takeUntil(unbSubscribe$)
    );
  }
}
