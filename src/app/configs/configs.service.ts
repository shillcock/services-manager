import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { of } from 'rxjs/observable/of';

import { API } from '@app/shared/consts';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ConfigsService {
  constructor(private http: HttpClient) {}

  getConfig(configId: string): Observable<any> {
    const url = configUrl(configId);
    return url ? this.http.get(url) : of(undefined);
  }

  updateConfig(configId: string, config: any): Observable<any> {
    const url = configUrl(configId);
    return url ? this.http.post(url, config) : of(undefined);
  }
}

function configUrl(configId: string): string | undefined {
  switch (configId) {
    case 'clients':
      return API.clients;
    case 'roles':
      return API.roles;
    case 'schedules':
      return API.schedules;
    case 'settings':
      return API.settings;
    default:
      return;
  }
}
