import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot
} from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { map, take } from 'rxjs/operators';

import { IClient } from '@app/core/models';
import { ServicesManager } from '@app/core';
import { of } from 'rxjs/observable/of';
import { AlertService } from '@app/core/alert.service';

@Injectable()
export class ClientResolver implements Resolve<IClient | undefined> {
  constructor(
    private router: Router,
    private sm: ServicesManager,
    private alertService: AlertService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IClient | undefined> {
    const clientId = route.paramMap.get('clientId');
    if (clientId) {
      return this.sm.getClient(clientId).pipe(
        take(1),
        map(client => {
          if (!client) {
            this.router.navigate(['/']);
            this.alertService.notify(`Client: ${clientId} not found.`);
          }

          return client;
        })
      );
    } else {
      return of(undefined);
    }
  }
}
