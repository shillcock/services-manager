import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { ICommand } from '../models/index';
import { API } from '../../shared/consts';

@Injectable()
export class CommandService {
  constructor(private http: HttpClient) {}

  sendCommand(
    command: ICommand,
    payload: any = {},
    meta: any = {}
  ): Observable<any> {
    const { endpoint } = command;
    const method = command.method || 'POST';

    return this.proxy(method, endpoint, payload).pipe(
      map(response => ({
        ...response,
        meta: { ...meta, commandId: command.id }
      })),
      catchError(err => this.handleError(err))
    );
  }

  private proxy(method: 'GET' | 'POST', url: string, payload: any = {}) {
    console.log('proxy:', method, url, payload);
    return this.http.post(API.proxy, { method, url, payload });
  }

  private handleError(err: any) {
    console.log('handleError:', err);
    const message = err.message || err.toString();
    return of({ status: 'error', message });
  }
}
