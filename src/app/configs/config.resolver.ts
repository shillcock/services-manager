import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot
} from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';
import { map, take, catchError } from 'rxjs/operators';

import { AlertService } from '../core/alert.service';
import { ConfigsService } from '@app/configs/configs.service';

@Injectable()
export class ConfigResolver implements Resolve<any> {
  constructor(
    private router: Router,
    private alertService: AlertService,
    private cs: ConfigsService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    const configId = route.paramMap.get('configId');
    if (!configId) {
      return of(this.alertAndRedirectHome());
    }

    return this.cs
      .getConfig(configId)
      .pipe(
        take(1),
        map(config => (config ? config : this.alertAndRedirectHome(configId)))
//        catchError((err: any) =>  {
//          this.handleError(err);
//          return _throw(err);
//        })
      );
  }

  private alertAndRedirectHome(configId = '') {
    this.router.navigate(['/']);
    this.alertService.notify(`${configId} config not found.`);
    return {};
  }
    
  private handleError(err: any) {
    if (err instanceof HttpErrorResponse) {
      if (err.status === 401) {
          this.handleNoAuthorized();
      }

      return _throw(err);
    }
  }
    
    private handleNoAuthorized() {
        alert('Invalid session. Login to continue.'); 
        window.location.href = '/gfmui/logon';    
    }
}
