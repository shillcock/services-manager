import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { pluck } from 'rxjs/operators';

import { find, first, get } from 'lodash';

import { AuthService } from '@app/core';

import { ServicesManager } from './core';
import { IClient, IService, IUser } from './core/models';
import { isUser } from '@app/core/models';

@Component({
  selector: 'sm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  user: IUser;

  constructor(
    private router: Router,
    private auth: AuthService,
    private sm: ServicesManager
  ) {
    this.auth.authState$.pipe(pluck('user')).subscribe(user => {
      if (isUser(user)) {
        this.user = user;
      }

      if (!get(this.user, 'authenticated')) {
        // TODO: Handle case where user is not authenticated
        // window.location.href = '/gfmui/logon';
      }
    });
  }

  get clients$(): Observable<IClient[]> {
    return this.sm.clients$;
  }

  clientPath(client: IClient) {
    return `${client.path}/${client.id}`;
  }

  goToClient(client: IClient) {
    const defaultService = this.getDefaultService(client);
    if (defaultService) {
      this.router.navigate([client.path, client.id, defaultService.id]);
    }
  }

  logout() {
    // TODO: Figure out the propper way to handle logout
    // window.location.href = '/gfmui/logout';
  }

  private getDefaultService(client: IClient): IService | undefined {
    const { services } = client;
    const defaultService = find(services, 'default');
    return defaultService || first(services);
  }
}
