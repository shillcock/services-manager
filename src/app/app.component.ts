import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { combineLatest } from 'rxjs/observable/combineLatest';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

import {
  AuthService,
  ConfigsService,
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
  readonly appName = 'Services Manager';
  readonly topMenuItems = [{ label: 'Home', path: '/' }];
  readonly bottomMenuItems = [{ label: 'History', path: 'history' }];
  private destroyed$ = new Subject<boolean>();
  debugData$: any;
  showDebugPanel = false;
  clients: IClient[];
  configs: any[];

  constructor(
    private router: Router,
    private configsService: ConfigsService,
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

    this.debugData$ = combineLatest(
      this.clientsService.data$,
      this.configsService.data$,
      this.settingsService.data$,
      this.sidebar.data$,
      this.auth.data$
    );
  }

  ngOnInit() {
    this.settingsService.fetchSettings();
    this.clientsService.fetchClients();
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }

  @HostListener('window:keydown.control.shift.d')
  onKeyDown() {
    this.showDebugPanel = !this.showDebugPanel;
  }

  logout() {
    window.location.href = '/gfmui/logoff';
  }
}
