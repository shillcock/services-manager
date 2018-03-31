import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { ServicesManager } from './core';
import { Service, ServiceAction } from './core/models';

@Component({
  selector: 'sm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  private destroy$ = new Subject<boolean>();

  services$: Observable<Service[]>;

  constructor(private router: Router, private sm: ServicesManager) {
    this.services$ = sm.services$;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  goToService(service: Service) {
    const defaultAction = this.getDefaultAction(service);

    if (defaultAction) {
      return this.router.navigate([
        service.path,
        service.id,
        defaultAction.type
      ]);
    } else {
      console.error('Service does not have a default action configured.');
    }
  }

  private getDefaultAction(service: Service) {
    const defaultAction: ServiceAction = service.actions.find(
      action => action.default
    );
    return defaultAction ? defaultAction : service.actions[0];
  }
}
