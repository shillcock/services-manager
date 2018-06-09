import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError, distinctUntilChanged } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { API } from '@app/shared/consts';
import { environment } from '@env/environment';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

interface IAppError {
  pathname: string;
  useragent: string;
  message: string;
  stack?: any;
}

@Injectable()
export class LoggerService {
  private _logs = new BehaviorSubject<any[]>([]);
  readonly logs$ = this._logs.asObservable().pipe(distinctUntilChanged());

  constructor(private http: HttpClient) {}

  logAction(action: string, payload: any) {
    const log = { action, payload, createdAt: new Date() };
    this._logs.next([log, ...this._logs.value]);
  }

  captureException(ex: any) {
    const error = ex.originalError || ex;

    const appError: IAppError = {
      pathname: window.location.pathname,
      useragent: window.navigator.userAgent,
      message: error.message || error.toString(),
      stack: error.stack
    };

    this.sendToBackend(appError);
  }

  private sendToBackend(error: IAppError) {
    return this.http
      .post(API.log, error)
      .pipe(
        catchError((err: any) => {
          console.error('Failed to log error:', err);
          return of(undefined);
        })
      )
      .subscribe(() => {
        if (!environment.production) {
          console.group('GFMUI: AppError');
          this.logError(error);
          console.warn('Application exception captured.');
          console.groupEnd();
        }
      });
  }

  private logError(error: IAppError) {
    console.warn('pathname:', window.location.pathname);
    console.warn('useragent:', window.navigator.userAgent);
    error.stack
      ? console.warn('stack:', error.stack)
      : console.warn('message:', error.message);
  }
}
