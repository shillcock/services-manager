import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ServicesManager } from '@app/core';
import { Client, Service, ServiceResponse } from '@app/core/models';
import { Observable } from 'rxjs/Observable';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'sm-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent {
  client: Client;
  service: Service;
  serviceData$: Observable<ServiceResponse>;

  constructor(route: ActivatedRoute, private sm: ServicesManager) {
    route.params.subscribe(params => {
      const { clientId, serviceId } = params;
      if (this.client && this.client.id !== clientId) {
        this.client = null;
      }
      if (this.service && this.service.id !== serviceId) {
        this.service = null;
      }
      this.paramsUpdated(clientId, serviceId);
    });
  }

  private paramsUpdated(clientId: string, serviceId: string) {
    this.sm.getClient(clientId).subscribe(client => {
      this.serviceData$ = this.callService(client, serviceId);
    });
  }

  private callService(
    client: Client,
    serviceId: string
  ): Observable<ServiceResponse> {
    this.client = client;
    this.service = client.services.find(service => service.id === serviceId);
    return this.sm.getService(this.client, this.service);
  }
}
