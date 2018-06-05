import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { distinctUntilChanged, map } from 'rxjs/operators';

@Injectable()
export class SidebarService {
  private _open = new BehaviorSubject<boolean>(false);

  readonly open$ = this._open.asObservable().pipe();

  get data$() {
    return this.open$.pipe(
      map(open => ({
        service: 'SidebarService',
        open
      }))
    );
  }

  get isOpen() {
    return this._open.value;
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  open() {
    this._open.next(true);
  }

  close() {
    this._open.next(false);
  }
}
