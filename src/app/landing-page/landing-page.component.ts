import { Component, OnDestroy } from '@angular/core';

import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

import { ServicesManager } from '@app/core';
import { IClient } from '@app/core/models';

@Component({
  selector: 'sm-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnDestroy {
  clients: IClient[];

  private destroyed$ = new Subject<boolean>();

  constructor(private sm: ServicesManager) {
    sm.clients$
      .pipe(
        takeUntil(this.destroyed$),
        map(clientMap => _.values(clientMap))
      )
      .subscribe(clients => (this.clients = clients));
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
