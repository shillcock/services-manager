import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { combineLatest } from 'rxjs/observable/combineLatest';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

import { APP_NAME } from '@app/shared/consts';

import {
  AuthService,
  SidebarService,
  ClientsService,
  SettingsService
} from '@app/core';

import { IClient } from '@app/core/models';

@Component({
  selector: 'sm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  readonly appName = APP_NAME;
  readonly topMenuItems = [
    { label: 'Home', path: '/' },
    { label: 'Reports', path: 'reports' }
  ];
  readonly bottomMenuItems = [{ label: 'History', path: 'history' }];
  private destroyed$ = new Subject<boolean>();
  clients: IClient[];
  configs: any[];

  constructor(
    private router: Router,
    private clientsService: ClientsService,
    private settingsService: SettingsService,
    public auth: AuthService,
    public sidebar: SidebarService
  ) {
    router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.sidebar.close());

    combineLatest(this.clientsService.clients$, this.settingsService.configs$)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(([clients, configs]) => {
        this.clients = clients;
        this.configs = configs;
      });
  }

  ngOnInit() {
    this.settingsService.fetchSettings();
    this.clientsService.fetchClients();
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }

  logout() {
    window.location.href = '/gfmui/logoff';
  }
}
