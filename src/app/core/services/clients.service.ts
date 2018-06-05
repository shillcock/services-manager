import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { map } from 'rxjs/operators';

import { API } from '@app/shared/consts';

import { IClient, IClientsMap } from '../models';

@Injectable()
export class ClientsService {
  private _clients = new BehaviorSubject<IClientsMap>({});
  private _selectedClientId = new BehaviorSubject<string | undefined>(
    undefined
  );

  readonly clients$: Observable<IClient[]>;
  readonly selectedClient$: Observable<IClient>;

  get data$() {
    const clients$ = this._clients.asObservable();
    const selectedClientId$ = this._selectedClientId.asObservable();
    return combineLatest(
      clients$,
      selectedClientId$,
      (clients, selectedClientId) => {
        return { service: 'ClientsService', clients, selectedClientId };
      }
    );
  }

  constructor(private http: HttpClient) {
    const clientsMap$ = this._clients.asObservable();
    this.clients$ = clientsMap$.pipe(map(clients => _.toArray(clients)));

    const selectedClientId$ = this._selectedClientId.asObservable();
    this.selectedClient$ = combineLatest(
      clientsMap$,
      selectedClientId$,
      (clients, clientId) => {
        return _.get(clients, clientId);
      }
    );
  }

  fetchClients() {
    this.http
      .get<IClientsMap>(API.clients)
      .pipe(map(clients => this.postProcessClients(clients)))
      .subscribe(clients => this._clients.next(clients));
  }

  selectClient(clientId: string | undefined) {
    this._selectedClientId.next(clientId);
  }

  private postProcessClients(clients: IClientsMap) {
    _.forEach(clients, this.processClient);
    return clients;
  }

  private processClient(client: IClient) {
    _.forEach(_.get(client, 'commands'), (command: any, key: string) => {
      const endpoint = _.get(command, 'endpoint', _.get(command, 'id'));
      if (client && !_.startsWith(endpoint, 'http')) {
        _.set(
          client,
          ['commands', key, 'endpoint'],
          `${client.host}/${endpoint}`
        );
      }
    });

    return client;
  }
}
