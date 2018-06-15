import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { ICommand } from '@app/core/models/index';
import { API } from '@app/shared/consts';

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

  private handleError(err: any) {
    console.error('Failed sending command:', err);
    const message = err.message || err.toString();
    return of({ status: 'error', message });
  }
}
