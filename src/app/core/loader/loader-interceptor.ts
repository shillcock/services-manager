import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';

import { LoaderService } from './loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private _loadingBar: LoaderService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // start our loader here
    this._loadingBar.show();

    return next.handle(req).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            this._loadingBar.hide();
          }
        },
        (err: any) => {
          this._loadingBar.hide();
        }
      )
    );
  }
}
