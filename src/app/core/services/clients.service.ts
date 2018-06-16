import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { map } from 'rxjs/operators';

import { API } from '@app/shared/consts';

import { CommandService } from './command.service';
import { IClient, IClientsMap } from '../models';
import { of } from 'rxjs/observable/of';
import { ICommand } from '@app/core/models';

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

  constructor(private http: HttpClient, private rpc: CommandService) {
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

  getClientHealth(client: IClient) {
    const commands = _.get(client, 'commands');
    const statusCommand = _.find(commands, 'status');
    if (statusCommand) {
      const command$ = this.rpc.sendCommand(statusCommand);
      return command$.pipe(map(status => _.get(status, 'health', 'unknown')));
    } else {
      return of(null);
    }
  }

  private sendCommand(command: ICommand): Observable<string> {
    return this.rpc.sendCommand(command).pipe(
      map(status => {
        console.log('STATUS:', status);
        return _.get(status, 'health', 'unknown');
      })
    );
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
