import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { map, take } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { AuthService } from './auth.service';
import { IClient, IService } from './models';

import { API } from '@app/shared/consts';

interface IClientsResponse {
  status: 'ok' | 'error';
  message?: string;
  data: { clients: IClient[] };
}

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
    return this.clients.pipe(
      map(item => item.find(c => c.id === clientId))
    );
  }

  getService(client: IClient, service: IService) {
    const meta = {
      clientId: client.id,
      serviceId: service.id,
      renderer: service.renderer
    };

    return this.http
      .get(`${client.baseUrl}/${service.id}`)
      .pipe(map(response => Object.assign({}, response, { meta })));
  }

  getClientPath(client: IClient) {
    const defaultService = this.getDefaultService(client);
    return defaultService
      ? `${client.path}/${client.id}/${defaultService.id}`
      : `${client.path}/${client.id}`;
  }

  private getDefaultService(client: IClient): IService | undefined {
    const { services } = client;
    if (services) {
      const defaultService = services.find(s => s.default ? true : false);
      return defaultService || services[0];
    }
  }

  private fetchClients() {
    this.http
      .get<IClientsResponse>(API.getClients)
      .pipe(
        map(response => {
          return response.status === 'ok'
            ? this.handleOk(response.data)
            : this.handleError(response.message);
        })
      )
      .subscribe(authorized => {
        console.log('xfetch-sub:', authorized);
      });
  }

  private handleOk({ clients }: { clients: IClient[] }) {
    this.clients.next(clients);
    return true;
  }

  private handleError(message = 'Error getting configured clients') {
    console.error(message);
    this.clients.next([]);
    return false;
  }
}
