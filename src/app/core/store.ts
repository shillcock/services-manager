import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { distinctUntilChanged, pluck } from 'rxjs/operators';
import { IClient, IClientsMap, IUser } from '@app/core/models';

export interface State {
  authorized: boolean;
  clients?: IClientsMap;
  errorMessage?: string;
  selectedClientId?: string;
  selectedConfigId?: string;
  settings?: any;
  sidebarOpen: boolean;
  user?: IUser;
  [key: string]: any;
}

const initialState: State = {
  authorized: false,
  clients: undefined,
  errorMessage: undefined,
  selectedClientId: undefined,
  selectedConfigId: undefined,
  settings: undefined,
  sidebarOpen: false,
  user: undefined
};

export class Store {
  private subject = new BehaviorSubject<State>(initialState);
  private store$ = this.subject.asObservable().pipe(distinctUntilChanged());

  get value() {
    return this.subject.value;
  }

  get appState$() {
    return this.store$;
  }

  select<T>(name: string): Observable<T> {
    return this.store$.pipe(pluck(name));
  }

  set(name: string, state: any) {
    console.debug(`--> ${name} = `, state);
    this.subject.next({ ...this.value, [name]: state });
  }
}
