import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';

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
    const { endpoint, proxy } = command;
    const method = command.method || 'POST';
        
    return this.execute(method, endpoint, payload, proxy).pipe(
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
  
  private execute(method: string, url: string, payload: any = {}, proxy: boolean) {
    console.debug(method, url, payload, proxy);
    return this.http.request(
      new HttpRequest(
        proxy ? 'POST': method, 
        proxy ? API.proxy : url, 
        proxy ? { method, url, payload } : payload
      )
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
