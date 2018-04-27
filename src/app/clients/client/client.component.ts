import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ServicesManager } from '@app/core';
import { IClient, IService } from '@app/core/models';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'sm-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent {
  client?: IClient;
  service?: IService;
  serviceContext$: Observable<any>;

  constructor(route: ActivatedRoute, private sm: ServicesManager) {
    route.params.subscribe(params => {
      const { clientId, serviceId } = params;
      if (this.client && this.client.id !== clientId) {
        this.client = undefined;
      }
      if (this.service && this.service.id !== serviceId) {
        this.service = undefined;
      }
      this.paramsUpdated(clientId, serviceId);
    });
  }

  private paramsUpdated(clientId: string, serviceId: string) {
    this.sm.getClient(clientId).subscribe(client => {
      if (client && client.services) {
        const service = client.services.find(s => s.id === serviceId);
        if (service) {
          this.serviceContext$ = this.callService(client, service);
        }
      }
    });
  }

  private callService(client: IClient, service: IService) {
    this.client = client;
    this.service = service;
    return this.sm.getService(this.client, this.service);
  }
}
