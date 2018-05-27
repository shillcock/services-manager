import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { pluck } from 'rxjs/operators';

import { API } from '@app/shared/consts';

import { IClient } from './models';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';

export interface IClientsMap {
  [id: string]: IClient;
}

@Injectable()
export class ServicesManager {
  private sub: Subscription;
  private client = new BehaviorSubject<any>(undefined);
  private clientId = new BehaviorSubject<string | undefined>(undefined);
  private clients = new BehaviorSubject<any>({});
  private settings = new BehaviorSubject<any>({});

  client$ = this.client.asObservable();
  clientId$ = this.clientId.asObservable();
  clients$ = this.clients.asObservable();
  settings$ = this.settings.asObservable();

  constructor(private http: HttpClient) {
    this.fetchClients();
    this.fetchSettings();
  }

  fetchClients() {
    this.http.get(API.clients).subscribe(clients => this.clients.next(clients));
  }

  fetchClient(clientId: string) {
    if (this.sub) {
      this.sub.unsubscribe();
    }

    this.sub = this.clients$.pipe(pluck(clientId)).subscribe(client => {
      this.postProcess(client);
      this.clientId.next(clientId);
      this.client.next(client);
    });
  }

  fetchSettings() {
    this.http
      .get(API.settings)
      .subscribe(settings => this.settings.next(settings));
  }

  private postProcess(client: IClient | undefined) {
    _.forEach(_.get(client, 'commands'), (command, key) => {
      const endpoint = _.get(command, 'endpoint', _.get(command, 'id'));
      if (!_.startsWith(endpoint, 'http')) {
        _.set(
          client,
          ['commands', key, 'endpoint'],
          `${client.host}/${endpoint}`
        );
      }
    });
  }
}
