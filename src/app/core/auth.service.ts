import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { IUser } from '@app/core/models';

import { API } from '@app/shared/consts';

interface IAuthResponse {
  user: IUser;
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
        map(response => this.handleOk(response.user)),
        catchError(err => this.handleError(err.message))
      )
      .subscribe(authorized => this.authorized.next(authorized));
  }

  private handleOk(user: IUser) {
    console.log('Auth:', user);
    this.user.next(user);
    this.errorMessage.next(undefined);
    return true;
  }

  private handleError(message = 'Error initializing application') {
    console.error('AuthError:', message);
    this.errorMessage.next(message);
    return of(false);
  }
}
