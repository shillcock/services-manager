import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { _throw } from 'rxjs/observable/throw';
import { pluck, tap } from 'rxjs/operators';

import { ServicesManager } from '@app/core';
import { of } from 'rxjs/observable/of';

interface IUpdateMap {
  [id: string]: () => void;
}

@Injectable()
export class ConfigsService {
  private configsSnapshot: any;

  constructor(private http: HttpClient, private sm: ServicesManager) {
    this.sm.settings$
      .pipe(pluck('configs'))
      .subscribe((configs: any) => (this.configsSnapshot = configs));
  }

  getConfig(configId: string): Observable<any> {
    const url = this.configGetUrl(configId);
    return this.get(url);
  }

  updateConfig(configId: string, config: any): Observable<any> {
    const url = this.configPostUrl(configId);
    return this.post(url, config);
  }

  private configGetUrl(configId: string): string | undefined {
    return _.get(this.configsSnapshot, [configId, 'get']);
  }

  private configPostUrl(configId: string): string | undefined {
    return _.get(this.configsSnapshot, [configId, 'post']);
  }

  private get(url: string | undefined) {
    return url
      ? this.http.get(url)
      : _throw(new Error('"GET" url not found for config.'));
  }

  private post(url: string | undefined, payload: any) {
    return url
      ? this.http.post(url, payload)
      : _throw(new Error('"POST" url not found for config.'));
  }
}
