import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { map, pluck, take, tap } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { Client, Service, ServiceResponse } from './models';

@Injectable()
export class ServicesManager {
  clients$: Observable<Client[]>;

  constructor(private http: HttpClient, private auth: AuthService) {
    this.clients$ = auth.authState$.pipe(pluck('clients'));
  }

  getClient(clientId: string): Observable<Client> {
    return this.clients$.pipe(
      take(1),
      map(clients => clients.find(client => client.id === clientId))
    );
  }

  getService(client: Client, service: Service): Observable<ServiceResponse> {
    const meta = {
      clientId: client.id,
      serviceId: service.id,
      renderer: service.renderer
    };
    return this.http
      .get<ServiceResponse>(`${client.baseUrl}/${service.id}`)
      .pipe(
        take(1),
        map(response => ({
          meta: { ...response.meta, ...meta },
          body: { ...response.body }
        }))
      );
  }
}
