import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { API } from '@app/shared/consts';
import { ICommand } from '../models';

@Injectable()
export class CommandService {
  constructor(private http: HttpClient) {}

  sendCommand(
    command: ICommand,
    payload: any = {},
    meta: any = {}
  ): Observable<any> {
    const { endpoint, proxy } = command;
    const method = command.method || 'POST';

    const cmd$ = proxy
      ? this.proxy(method, endpoint, payload)
      : this.request(method, endpoint, payload);

    return cmd$.pipe(
      map(response => {
        const newMeta = _.assign({}, _.get(response, 'meta'), meta, {
          commandId: command.id
        });
        const newResponse = _.isObject(response) ? response : { response };
        return _.assign({}, newResponse, { meta: newMeta });
      }),
      catchError(err => this.handleError(err))
    );
  }

  private proxy(method: string, url: string, payload: any = {}) {
    return this.http.post(API.proxy, { method, url, payload });
  }

  private request(method: string, url: string, payload: any = {}) {
    return this.http.request(method, url, payload);
  }

  private handleError(err: any) {
    console.error('Failed sending command:', err);
    const message = err.message || err.toString();
    return of({ status: 'error', message });
  }
}
