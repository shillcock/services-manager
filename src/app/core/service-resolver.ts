import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { Client } from './models';
import { ServicesManager } from './services-manager';

@Injectable()
export class ServiceResolver implements Resolve<Client> {
  constructor(private sm: ServicesManager) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Client> {
    const clientId = route.paramMap.get('clientId');
    return this.sm.getClient(clientId);
  }
}
