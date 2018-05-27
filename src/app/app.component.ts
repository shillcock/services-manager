import { Component, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { filter, map, pluck, takeUntil } from 'rxjs/operators';

import { AuthService } from '@app/core';

import { ServicesManager } from './core';
import { SidebarService } from './core/sidebar.service';

import { IClient } from './core/models';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'sm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  readonly appName = 'Services Manager';
  readonly menuItems = [{ label: 'Home', path: '/' }];
  private destroyed$ = new Subject<boolean>();
  clients: IClient[];
  configs: any;

  get authorized$() {
    return this.auth.authorized$;
  }

  get errorMessage$() {
    return this.auth.errorMessage$;
  }

  get sidebarOpen$() {
    return this.sidebar.open$;
  }

  constructor(
    private router: Router,
    private auth: AuthService,
    private sm: ServicesManager,
    private sidebar: SidebarService
  ) {
    router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.sidebar.close());

    sm.clients$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(clients => (this.clients = _.toArray(clients)));

    sm.settings$
      .pipe(takeUntil(this.destroyed$), pluck('configs'))
      .subscribe(configs => (this.configs = _.toArray(configs)));
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  sidebarOpened() {
    this.sidebar.open();
  }

  sidebarClosed() {
    this.sidebar.close();
  }

  logout() {
    window.location.href = '/gfmui/logoff';
  }
}
