import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SidebarService {
  private isOpen = new BehaviorSubject<boolean>(false);

  get open$() {
    return this.isOpen.asObservable();
  }

  toggle() {
    this.isOpen.next(!this.isOpen.getValue());
  }

  open() {
    this.isOpen.next(true);
  }

  close() {
    this.isOpen.next(false);
  }
}
