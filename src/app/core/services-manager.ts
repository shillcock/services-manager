import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { map, pluck, take } from 'rxjs/operators';

import { find } from 'lodash';

import { AuthService } from './auth.service';
import { IClient, IService } from './models';

@Injectable()
export class ServicesManager {
  clients$: Observable<IClient[]>;

  constructor(private http: HttpClient, private auth: AuthService) {
    this.clients$ = auth.authState$.pipe(pluck('clients'));
  }

  getClient(clientId: string): Observable<IClient | undefined> {
    return this.clients$.pipe(
      take(1),
      map(clients => find(clients, ['id', clientId]))
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
      .pipe(take(1), map(response => Object.assign({}, response, { meta })));
  }
}
