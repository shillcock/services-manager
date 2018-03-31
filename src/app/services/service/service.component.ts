import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ServicesManager } from '@app/core';
import { Service, ServiceAction } from '@app/core/models';

@Component({
  selector: 'sm-service-action',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent {
  service$: Observable<Service>;

  service: Service;
  serviceAction: ServiceAction;
  actionData: any;

  constructor(route: ActivatedRoute, private sm: ServicesManager) {
    route.params.subscribe(params => {
      const { serviceId, actionType } = params;
      this.paramsUpdated(serviceId, actionType);
    });
  }

  private paramsUpdated(serviceId: string, actionType: string) {
    this.sm.getService(serviceId).subscribe(service => {
      this.service = service;
      this.getAction(service, actionType);
    });
  }

  private getAction(service: Service, actionType: string): void {
    this.sm.getAction(service, actionType).subscribe(actionData => {
      this.serviceAction = service.actions.find(
        action => action.type === actionType
      );
      this.actionData = actionData;
      this.actionData.processor = this.serviceAction.processor;

      console.log('ACTION DATA:', this.actionData);
    });
  }
}
