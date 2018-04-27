import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { ModelFactory, Model } from './model.service';
import { IClient, IUser } from '@app/core/models';

import { API } from '@app/shared/consts';

export interface IAuthState {
  user: IUser;
  clients?: IClient[];
  errorMessage?: string;
}

const initialState = {
  user: {
    edi: '0000000000',
    name: 'Anonymous',
    roles: void 0,
    authenticated: false
  }
};

@Injectable()
export class AuthService {
  authState$: Observable<IAuthState>;

  private model: Model<IAuthState>;

  constructor(
    // Provider parse errors:
    // Cannot instantiate cyclic dependency! ApplicationRef ("[ERROR ->]"): 
    //   in NgModule AppModule in ./AppModule@-1:-1
    // private http: HttpClient,
    private injector: Injector,
    private modelFactory: ModelFactory<IAuthState>
  ) {
    this.model = this.modelFactory.create(initialState);
    this.authState$ = this.model.data$;
  }

  // called on app initialization to grab required application data
  initializeApp(): Promise<boolean> {
    const http = this.injector.get(HttpClient);
    return http
      .get<any>(API.AUTH)
      .toPromise()
      .then(response => {
        return response['status'] === 'ok'
          ? this.handleOk(response['data'])
          : this.handleError(response['message']);
      })
      .catch(error => {
        console.log('Auth Error: ', error);
        return this.handleError(error.message);
      });
  }

  private handleOk(state: IAuthState): boolean {
    console.log('AUTH:', state);
    this.model.set(state);
    return true;
  }

  private handleError(
    errorMessage: string = 'Error initializing application.'
  ): boolean {
    const state = Object.assign({}, initialState, { errorMessage });
    console.log('AUTH:', state);
    this.model.set(state);
    return false;
  }
}
