import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ServicesManager } from '@app/core';
import { Client, ClientService } from '@app/core/models';
import { map } from 'rxjs/operators';

@Component({
  selector: 'sm-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent {
  client: Client;
  clientService: ClientService;
  serviceData: any;

  constructor(route: ActivatedRoute, private sm: ServicesManager) {
    route.params.subscribe(params => {
      const { clientId, serviceId } = params;
      this.paramsUpdated(clientId, serviceId);
    });
  }

  private paramsUpdated(clientId: string, serviceId: string) {
    this.sm.getClient(clientId).subscribe(client => {
      this.getService(client, serviceId);
    });
  }

  private getService(client: Client, serviceId: string) {
    this.client = client;
    this.clientService = client.services.find(
      service => service.id === serviceId
    );

    const handlers = this.clientService.handlers;
    const processData = (data: any) => this.sm.processData(handlers, data);

    this.sm
      .getClientService(client, serviceId)
      .pipe(map(response => response.data), map(processData))
      .subscribe(data => {
        this.serviceData = data;
        this.serviceData.processor = 'json';
      });
  }
}
