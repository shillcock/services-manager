import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { of } from 'rxjs/observable/of';
import { map, catchError } from 'rxjs/operators';

import { IUser } from '../models';

import { API } from '@app/shared/consts';

interface IAuthResponse {
  user: IUser;
}

@Injectable()
export class AuthService {
  private _authorized = new BehaviorSubject<boolean>(false);
  private _user = new BehaviorSubject<IUser | undefined>(undefined);
  private _errorMessage = new BehaviorSubject<string | undefined>(undefined);

  get data$() {
    return combineLatest(
      this.authorized$,
      this.errorMessage$,
      this.user$,
      (authorized, errorMessage, user) => {
        return { service: 'AuthService', authorized, errorMessage, user };
      }
    );
  }

  set authorized(value: boolean) {
    this._authorized.next(value);
  }

  get authorized$() {
    return this._authorized.asObservable();
  }

  set errorMessage(message: string | undefined) {
    this._errorMessage.next(message);
  }

  get errorMessage$() {
    return this._errorMessage.asObservable();
  }

  set user(user: IUser) {
    this._user.next(user);
  }

  get user$() {
    return this._user.asObservable();
  }

  constructor(private http: HttpClient) {
    this.fetchAuthState();
  }

  private fetchAuthState() {
    this.http
      .get<IAuthResponse>(API.auth)
      .pipe(
        map(response => this.handleOk(response.user)),
        catchError(err => this.handleError(err.message))
      )
      .subscribe(authorized => (this.authorized = authorized));
  }

  private handleOk(user: IUser) {
    console.log('Auth:', user);
    this.user = user;
    this.errorMessage = undefined;
    return true;
  }

  private handleError(message = 'Error initializing application') {
    console.error('AuthError:', message);
    this.errorMessage = message;
    return of(false);
  }
}
