import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';

import { API } from '@app/shared/consts';

import { IClient, IClientsMap } from './models';
import { Store } from '@app/core/store';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class ServicesManager {
  clients$: Observable<IClient[]>;
  selectedClient$: Observable<IClient>;

  settings$: Observable<any>;
  configs$: Observable<any[]>;
  selectedConfig$: Observable<any>;

  private fetchSub: Subscription;

  constructor(private http: HttpClient, private store: Store) {
    const clientsMap$ = this.store.select('clients');
    this.clients$ = clientsMap$.pipe(map(clients => _.toArray(clients)));

    const selectedClientId$ = this.store.select<string>('selectedClientId');
    this.selectedClient$ = combineLatest(clientsMap$, selectedClientId$).pipe(
      map(([clients, clientId]) => _.get(clients, clientId))
    );

    this.settings$ = this.store.select<any>('settings');

    this.configs$ = this.settings$.pipe(
      map(settings => _.get(settings, 'configs')),
      map(configs => _.toArray(configs))
    );

    const selectedConfigId$ = this.store.select<string>('selectedConfigId');
    const config$ = combineLatest(this.settings$, selectedConfigId$).pipe(
      map(([settings, configId]) => _.get(settings, ['configs', configId]))
    );

    this.selectedConfig$ = config$.pipe(
      map(config => _.get(config, 'get')),
      filter(url => !!url),
      switchMap(url => this.http.get(url))
    );
  }

  fetchClients() {
    this.http
      .get<IClientsMap>(API.clients)
      .pipe(map(clients => this.postProcessClients(clients)))
      .subscribe(clients => this.store.set('clients', clients));
  }

  selectClient(clientId: string | undefined | null) {
    this.store.set('selectedClientId', clientId);
  }

  fetchSettings() {
    this.http.get(API.settings).subscribe(settings => {
      this.store.set('settings', settings);
    });
  }

  selectConfig(configId: string | undefined | null) {
    this.store.set('selectedConfigId', configId);
  }

  private fetchConfig(configId: string) {
    console.log('FETCH CONFIG:', configId);
    if (this.fetchSub) {
      this.fetchSub.unsubscribe();
    }

    this.fetchSub = this.settings$
      .pipe(
        map(settings => _.get(settings, ['configs', configId, 'get'])),
        switchMap(url => this.http.get(url))
      )
      .subscribe(config => {
        console.log('fetched:', config);
      });
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
