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
    const { endpoint, proxy, extra } = command;
    const method = command.method || 'POST';

    if (!_.isEmpty(extra)) {
      payload = { ...extra, ...payload };
    }

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

  private proxy(method: string, endpoint: string, payload: any) {
    const url = this.url(endpoint, payload);
    return this.http.post(API.proxy, { method, url, payload });
  }

  private request(method: string, endpoint: string, payload: any) {
    const url = this.url(endpoint, payload);
    return this.http.request(method, url, payload);
  }

  private url(endpoint: string, payload: any) {
    // regex to find all placeholders values that look like :foo
    const placeholder = /:\b[A-z]+/g;
    return _.isEmpty(payload)
      ? endpoint
      : endpoint.replace(placeholder, val => payload[val.slice(1)] || val);
  }

  private handleError(err: any) {
    console.error('Failed sending command:', err);
    const message = err.message || err.toString();
    return of({ status: 'error', message });
  }
}
