import { Injectable } from '@angular/core';
import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { _throw } from 'rxjs/observable/throw';
import { catchError } from 'rxjs/operators';

import { AlertService } from './services/alert.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private alertService: AlertService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(err => {
        if (err instanceof HttpErrorResponse) {
          this.alertService.notify(err.message);

          if (err.status === 401) {
            alert('Invalid session. Login to continue.');
            window.location.href = '/gfmui/logon';
          }
        }

        return _throw(err);
      })
    );
  }
}

export const AUTH_INTERCEPTOR_PROVIDER = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
};
