import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { pluck } from 'rxjs/operators';

export class Model<T> {
  private _data: BehaviorSubject<T>;

  data$: Observable<T>;

  constructor(initialData: T) {
    this._data = new BehaviorSubject(initialData);
    this.data$ = this._data.asObservable();
  }

  get value() {
    return this._data.value;
  }

  select<R>(name: string): Observable<R> {
    return this.data$.pipe(pluck(name));
  }

  set(name: string, data: any) {
    console.debug(`==> ${name} = `, data);
    this._data.next(Object.assign({}, this.value, { [name]: data }));
  }
}
