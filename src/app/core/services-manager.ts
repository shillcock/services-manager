import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { map, pluck, take } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { Client, ClientServiceResponse } from './models';

const logHandler = (data: any, prefix: string = 'Data'): any => {
  console.log(prefix, data);
  return data;
};

const HANDLERS = {
  log: logHandler,
  default: data => data
};

@Injectable()
export class ServicesManager {
  clients$: Observable<Client[]>;

  constructor(private http: HttpClient, private auth: AuthService) {
    this.clients$ = auth.authState$.pipe(pluck('clients'));
  }

  getClient(clientId: string): Observable<Client> {
    return this.clients$.pipe(
      take(1),
      map((clients: Client[]) => {
        return clients.find(client => client.id === clientId);
      })
    );
  }

  getClientService(
    client: Client,
    serviceId: string
  ): Observable<ClientServiceResponse> {
    return this.http
      .get<ClientServiceResponse>(`${client.baseUrl}/${serviceId}`)
      .pipe(take(1));
  }

  processData(handlers: string[], data: any): any {
    let res = data;
    handlers.forEach(h => {
      const processor = HANDLERS[h] || HANDLERS.default;
      res = processor({ ...res });
    });
    return res;
  }
}
