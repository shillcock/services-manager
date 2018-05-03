import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { IClient, IService } from './models';

import { API } from '@app/shared/consts';

@Injectable()
export class ServicesManager {
  clients = new BehaviorSubject<IClient[]>([]);

  get clients$() {
    return this.clients.asObservable();
  }

  constructor(private http: HttpClient) {
    this.fetchClients();
  }

  getClient(clientId: string): Observable<IClient | undefined> {
    return this.clients.pipe(map(item => item.find(c => c.id === clientId)));
  }

  getService(client: IClient, service: IService) {
    const meta = {
      clientId: client.id,
      serviceId: service.id,
      renderer: service.renderer
    };

    const endpoint = service.endpoint ? service.endpoint : service.id;
    const url = `${client.host}/${endpoint}`;

    const proxy$ = this.proxyGet(url, meta);
    return proxy$.pipe(map(response => Object.assign({}, response, { meta })));
  }

  proxyGet(url: string, meta: any) {
    return this.proxy('GET', url).pipe(
      map(response => Object.assign({}, response, { meta }))
    );
  }

  /*
  proxyPost(url: string, payload: any, meta: any) {
    return this.proxy('POST', url, payload).pipe(
      map(response => Object.assign({}, response, { meta }))
    );
  }
  */

  proxy(method: 'GET' | 'POST', url: string, payload?: any) {
    return this.http.post(API.getProxy, { method, url, payload });
  }

  getClientPath(client: IClient, service?: IService) {
    const defaultService = service || this.getDefaultService(client);
    return defaultService
      ? `client/${client.id}/${defaultService.id}`
      : `client/${client.id}`;
  }

  private getDefaultService(client: IClient): IService | undefined {
    const { services } = client;
    if (services) {
      const defaultService = services.find(s => !!s.default);
      return defaultService || services[0];
    }
  }

  private fetchClients() {
    this.http
      .get<any>(API.getClients)
      .pipe(
        map(response => this.handleOk(response)),
        catchError(err => this.handleError(err.message))
      )
      .subscribe();
  }

  private handleOk(response: any) {
    const clients: IClient[] = Object.keys(response).map(key => {
      return response[key] as IClient;
    });

    this.clients.next(clients);
    return true;
  }

  private handleError(message = 'Error getting configured clients') {
    console.error(message);
    this.clients.next([]);
    return of(false);
  }
}
