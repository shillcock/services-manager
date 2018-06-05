import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { map } from 'rxjs/operators';

import { API } from '@app/shared/consts';

@Injectable()
export class SettingsService {
  private _settings = new BehaviorSubject<any>({});

  settings$ = this._settings.asObservable();
  configs$: Observable<any>;

  get data$() {
    return combineLatest(this.settings$, this.configs$, (settings, configs) => {
      return {
        service: 'SettingsService',
        settings,
        configs
      };
    });
  }

  constructor(private http: HttpClient) {
    this.configs$ = this.settings$.pipe(
      map(settings => _.get(settings, 'configs')),
      map(configs => _.toArray(configs))
    );
  }

  fetchSettings() {
    this.http
      .get<any>(API.settings)
      .subscribe(settings => this._settings.next(settings));
  }

  getConfig(configId: string) {
    return this.settings$.pipe(
      map(settings => _.get(settings, ['configs', configId]))
    );
  }
}
