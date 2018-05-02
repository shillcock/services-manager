import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { delay, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { IUser } from '@app/core/models';

import { API } from '@app/shared/consts';

interface IAuthResponse {
  status: 'ok' | 'error';
  message?: string;
  data: { user: IUser };
}

@Injectable()
export class AuthService {
  private authorized = new BehaviorSubject<boolean>(false);
  private user = new BehaviorSubject<IUser | undefined>(undefined);
  private errorMessage = new BehaviorSubject<string | undefined>(undefined);

  get authorized$() {
    return this.authorized.asObservable();
  }

  get user$() {
    return this.user.asObservable();
  }

  get errorMessage$() {
    return this.errorMessage.asObservable();
  }

  constructor(private http: HttpClient) {
    this.fetchAuthState();
  }

  private fetchAuthState() {
    this.http
      .get<IAuthResponse>(API.getAuth)
      .pipe(
        delay(1500),
        map(response => {
          return response.status === 'ok'
            ? this.handleOk(response.data.user)
            : this.handleError(response.message);
        }),
        catchError(err => {
          this.handleError(err.message);
          return of(false);
        })
      )
      .subscribe(authorized => this.authorized.next(authorized));
  }

  private handleOk(user: IUser) {
    this.user.next(user);
    return true;
  }

  private handleError(message = 'Error initializing application') {
    this.errorMessage.next(message);
    return false;
  }
}
