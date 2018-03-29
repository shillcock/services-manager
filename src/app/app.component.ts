import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { ServicesManager } from '@app/core';
import { Action, Service } from '@app/core/models';

@Component({
  selector: 'sm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  private destroy$ = new Subject<boolean>();
  services$: Observable<Service[]>;
  services: Service[];

  constructor(private router: Router, private sm: ServicesManager) {
    this.services$ = sm.services$;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  goToService(service: Service) {
    const defaultAction: Action = service.actions.find(
      action => action.default
    );
    console.log('default action:', defaultAction);
    return this.router.navigate([service.path, service.id, defaultAction.type]);
  }
}
