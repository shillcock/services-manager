import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot
} from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, take } from 'rxjs/operators';

import { AlertService } from '../core/alert.service';
import { ConfigsService } from '@app/configs/configs.service';

@Injectable()
export class ConfigResolver implements Resolve<any> {
  constructor(
    private router: Router,
    private alertService: AlertService,
    private configs: ConfigsService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    const configId = route.paramMap.get('configId');
    if (!configId) {
      this.alertAndRedirectHome(configId);
      return of(null);
    }

    return this.configs
      .getConfig(configId)
      .pipe(
        take(1),
        map(config => (config ? config : this.alertAndRedirectHome(configId)))
      );
  }

  private alertAndRedirectHome(configId: string | null) {
    this.router.navigate(['/']);
    this.alertService.notify(`${configId} config not found.`);
  }
}
