import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { ModelFactory, Model } from './model.service';
import { Service, User } from './models';

import { API_ENDPOINT as API } from '@app/shared/consts';

export interface AuthState {
  authenticated: boolean;
  user: User;
  services: Service[];
  errorMessage?: string;
}

const initialState = <AuthState>{
  authenticated: false,
  user: {},
  services: []
};

@Injectable()
export class AuthService {
  authState$: Observable<AuthState>;

  private model: Model<AuthState>;

  constructor(
    private http: HttpClient,
    private modelFactory: ModelFactory<AuthState>
  ) {
    this.model = this.modelFactory.create(initialState);
    this.authState$ = this.model.data$;
  }

  // called on app initialization to grab required application data
  initializeApp(): Promise<boolean> {
    return this.http
      .get<AuthState>(`${API}/auth`)
      .toPromise()
      .then(
        (state: AuthState) => {
          console.log('AUTH:', state);
          this.model.set(state);
          return true;
        },
        err => {
          console.error('AUTH Error:', err);
          const state = <AuthState>{
            ...initialState,
            errorMessage: err.message
          };
          this.model.set(state);
          return false;
        }
      );
  }
}
