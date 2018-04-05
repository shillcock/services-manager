import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { ServicesManager } from './core';
import { Client, ClientService } from './core/models';

@Component({
  selector: 'sm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  clients$: Observable<Client[]>;

  constructor(private router: Router, private sm: ServicesManager) {
    this.clients$ = sm.clients$;
  }

  goToClient(client: Client) {
    const defaultService = this.getDefaultService(client);

    if (defaultService) {
      return this.router.navigate([client.path, client.id, defaultService.id]);
    } else {
      console.error('Client does not have a default service configured.');
    }
  }

  private getDefaultService(client: Client) {
    const defaultClient: ClientService = client.services.find(
      action => action.default
    );
    return defaultClient ? defaultClient : client.services[0];
  }
}
