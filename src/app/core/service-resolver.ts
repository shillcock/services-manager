import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { Service } from './models';
import { ServicesManager } from './services-manager';

@Injectable()
export class ServiceResolver implements Resolve<Service> {
  constructor(private sm: ServicesManager) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Service> {
    const serviceId = route.paramMap.get('serviceId');
    return this.sm.getService(serviceId);
  }
}
