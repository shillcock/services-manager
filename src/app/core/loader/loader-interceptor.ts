import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

import { LoaderService } from '@app/core/loader/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private _loadingBar: LoaderService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // start our loader here
    this._loadingBar.start();

    return next.handle(req).do(
      (event: HttpEvent<any>) => {
        // if the event is for http response
        if (event instanceof HttpResponse) {
          // stop our loader here
          this._loadingBar.complete();
        }
      },
      (err: any) => {
        // if any error (not for just HttpResponse) we stop our loader bar
        this._loadingBar.complete();
      }
    );
  }
}
