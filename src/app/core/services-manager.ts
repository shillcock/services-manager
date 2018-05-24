import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { map, publishReplay, refCount } from 'rxjs/operators';

import { API } from '@app/shared/consts';

import { IClient } from './models';
import { Subscription } from 'rxjs/Subscription';

export interface IClientsMap {
  [id: string]: IClient;
}

@Injectable()
export class ServicesManager {
  private clientMap$?: Observable<IClientsMap>;
  private subscription: Subscription;

  get clients$() {
    if (!this.clientMap$) {
      this.clientMap$ = this.http
        .get<IClientsMap>(API.clients)
        .pipe(publishReplay(1), refCount());
    }

    return this.clientMap$;
  }

  constructor(private http: HttpClient) {
    this.fetchClients();
  }

  getClient(clientId: string): Observable<IClient | undefined> {
    return this.clients$.pipe(
      map(clients => this.postProcess(clients[clientId]))
    );
  }

  fetchClients() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    this.clientMap$ = undefined;
    this.subscription = this.clients$.subscribe();
  }

  updateClients(clientsMap: IClientsMap) {
    this.http.post(API.clients, clientsMap).subscribe(result => {
      console.log('UPDATE CLIENTS:', result);
    });
  }

  private postProcess(client: IClient | undefined) {
    if (client) {
      Object.keys(client.commands).forEach(key => {
        const command = client.commands[key];
        if (command) {
          const endpoint = command.endpoint || command.id;
          if (!endpoint.startsWith('http')) {
            client.commands[key] = {
              ...command,
              endpoint: `${client.host}/${endpoint}`
            };
          }
        }
      });
    }
    return client;
  }
}
