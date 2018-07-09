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

const getId = _.partialRight(_.get, 'id');
const getEndpoint = _.partialRight(_.get, 'endpoint');
const getProxy = _.partialRight(_.get, 'proxy', _);
const getCommands = _.partialRight(_.get, 'commands');
const reportingOnly = _.partialRight(_.filter, 'reporting');
const getReports = _.flow(getCommands, reportingOnly);

@Injectable()
export class ClientsService {
  private _clients = new BehaviorSubject<IClientsMap>({});
  private _selectedClientId = new BehaviorSubject<string | undefined>(
    undefined
  );

  readonly clients$: Observable<IClient[]>;
  readonly selectedClient$: Observable<IClient>;
  readonly reportingCommands$: Observable<ICommand[]>;

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

    this.reportingCommands$ = this.clients$.pipe(
      map(clients => this.getAllReportingCommands(clients))
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
      return this.sendCommand(statusCommand);
    } else {
      return of(null);
    }
  }

  private sendCommand(command: ICommand): Observable<string> {
    return this.rpc
      .sendCommand(command)
      .pipe(map(status => _.get(status, 'health', 'unknown')));
  }

  private postProcessClients(clients: IClientsMap) {
    _.forEach(clients, (client: IClient) => this.processClient(client));
    return clients;
  }

  private processClient(client: IClient) {
    const commands = _.get(client, 'commands');
    _.forEach(commands, (command: ICommand) => {
      updateEndpoint(command);
      updateProxy(command);
    });

    return client;

    function updateEndpoint(command: ICommand) {
      const endpoint = getEndpoint(command) || getId(command);
      if (client && !_.startsWith(endpoint, 'http')) {
        const url = `${client.host}/${endpoint}`;
        _.set(command, 'endpoint', url);
      }
    }

    function updateProxy(command: ICommand) {
      const proxyDefault = getProxy(client, true);
      _.set(command, 'proxy', getProxy(command, proxyDefault));
    }
  }

  private getAllReportingCommands(clients: IClient[]): ICommand[] {
    return _.flatMap(clients, (client: IClient) => getReports(client));
  }
}
