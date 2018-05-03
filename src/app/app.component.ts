import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { filter } from 'rxjs/operators';

import { AuthService } from '@app/core';

import { ServicesManager } from './core';
import { SidebarService } from './core/sidebar.service';

import { IClient, IService } from './core/models';

@Component({
  selector: 'sm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  readonly appName = 'Services Manager';
  readonly menuItems = [
    { text: 'Home', path: '/' },
    { text: 'Scheduling', path: '/scheduling' }
  ];

  constructor(
    private router: Router,
    private auth: AuthService,
    private sm: ServicesManager,
    private sidebar: SidebarService
  ) {
    router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.sidebar.close());
  }

  get authorized$() {
    return this.auth.authorized$;
  }

  get errorMessage$() {
    return this.auth.errorMessage$;
  }

  get clients$() {
    return this.sm.clients$;
  }

  get sidebarOpen$() {
    return this.sidebar.open$;
  }

  sidebarOpened() {
    this.sidebar.open();
  }

  sidebarClosed() {
    this.sidebar.close();
  }

  logout() {
    // TODO: handle logout
    // window.location.href = '/gfmui/logout';
  }

  clientPath(client: IClient) {
    return this.sm.getClientPath(client);
  }
}
