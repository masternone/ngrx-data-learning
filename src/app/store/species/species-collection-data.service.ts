import {Injectable} from '@angular/core';
import {DefaultDataService, DefaultDataServiceConfig, HttpUrlGenerator, Logger, QueryParams} from '@ngrx/data';
import {HttpClient} from '@angular/common/http';
import * as species from './';
import {BehaviorSubject, Observable} from 'rxjs';
import {map, switchMap, tap} from 'rxjs/operators';

@Injectable()
export class SpeciesCollectionDataService extends DefaultDataService<species.Species> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator, logger: Logger, config: DefaultDataServiceConfig) {
    super(species.entityCollectionName, http, httpUrlGenerator, config);
  }

  getAll(): Observable<species.Species[]> {
    return super.getAll().pipe(
      map((result: any) => result.results)
    );
  }

  getWithQuery(queryParams: QueryParams | string): Observable<species.Species[]> {
    const bs = new BehaviorSubject([]);
    super.getWithQuery(queryParams).pipe(
      map((result: any) => {
        if (result.next) {
          this.getWithQuery(result.next.substr(result.next.lastIndexOf('?') + 1)).subscribe(res => bs.next(res));
        }
        return result.results;
      })
    ).subscribe(res => bs.next(res));
    return bs;
  }
}
