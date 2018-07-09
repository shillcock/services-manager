import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SidebarService {
  private _open = new BehaviorSubject<boolean>(false);

  readonly open$ = this._open.asObservable().pipe();

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
