import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { of } from 'rxjs/observable/of';

import {
  catchError,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  take,
  tap
} from 'rxjs/operators';

import { Subscription } from 'rxjs/Subscription';

import { AlertService } from './alert.service';
import { SettingsService } from './settings.service';
import { _throw } from 'rxjs/observable/throw';

@Injectable()
export class ConfigsService {
  private fetchSub: Subscription;

  private _activeConfig = new BehaviorSubject<any>(undefined);
  private _working = new BehaviorSubject<boolean>(false);

  readonly configs$ = this.settingsService.configs$;

  readonly activeConfig$ = this._activeConfig
    .asObservable()
    .pipe(distinctUntilChanged());

  readonly working$ = this._working.asObservable().pipe(distinctUntilChanged());

  get data$() {
    return combineLatest(
      this.activeConfig$,
      this.working$,
      (activeConfig, working) => {
        return {
          service: 'ConfigsService',
          activeConfig,
          working
        };
      }
    );
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private alerts: AlertService,
    private settingsService: SettingsService
  ) {}

  fetchConfig(configId: string | null) {
    if (this.fetchSub) {
      this.fetchSub.unsubscribe();
    }

    this._activeConfig.next({ id: configId, config: undefined });

    if (configId) {
      this.fetchSub = this.getConfigUrl(configId, 'get')
        .pipe(
          tap(() => this._working.next(true)),
          switchMap(url => this.http.get(url)),
          tap(() => this._working.next(false)),
          catchError(err => {
            this._working.next(false);
            return this.handleFetchError(configId, err.message);
          })
        )
        .subscribe(config => this._activeConfig.next({ id: configId, config }));
    }
  }

  updateConfig(configId: string, config: any) {
    return this.getConfigUrl(configId, 'post').pipe(
      tap(() => this._working.next(true)),
      switchMap(url => this.http.post(url, config)),
      tap(() => this._working.next(false)),
      catchError(err => {
        this._working.next(false);
        return _throw(err);
      })
    );
  }

  private getConfigUrl(configId: string, method: 'get' | 'post') {
    return this.settingsService.settings$.pipe(
      map(settings => _.get(settings, ['configs', configId, method])),
      filter(url => !!url),
      take(1)
    );
  }

  private handleFetchError(configId: string, err: string) {
    const msg = `Failed to get "${configId}" config.`;
    this.alerts.notify(`${msg} Error: ${err}`);
    this.router.navigate(['/']);
    return of(undefined);
  }
}
