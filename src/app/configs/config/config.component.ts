import { Component, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { debounceTime, map, takeUntil } from 'rxjs/operators';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { Subject } from 'rxjs/Subject';

import {
  AlertService,
  AuthService,
  ClientsService,
  ConfigsService,
  SettingsService
} from '@app/core';

import { ACCESS_ADMIN_ONLY } from '@app/shared/consts';
import { CanComponentDeactivate } from '@app/core/can-deactivate-guard.service';

import { ConfigEditComponent } from '../config-edit/config-edit.component';

@Component({
  selector: 'sm-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnDestroy, CanComponentDeactivate {
  @ViewChild(ConfigEditComponent) editor: ConfigEditComponent;
  private destroyed$ = new Subject<boolean>();
  configs$ = this.configsService.configs$;
  edit: boolean;
  configId: string;
  config: any;
  working: boolean;
  updated: boolean;
  hasAccess = true;

  get dirty() {
    return this.edit && this.editor ? this.editor.isDirty() : false;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alerts: AlertService,
    private auth: AuthService,
    private settingsService: SettingsService,
    private configsService: ConfigsService,
    private clientsService: ClientsService
  ) {
    this.configsService.activeConfig$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(config => {
        this.configId = _.get(config, 'id');
        this.config = _.get(config, 'config');
        const roles = _.get(config, 'roles', ACCESS_ADMIN_ONLY);
        this.hasAccess = this.auth.canAccess(roles);
      });

    this.configsService.working$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(working => (this.working = working));

    this.setupRouteChangeHandler();
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }

  canDeactivate() {
    return this.dirty
      ? confirm('Unsaved changes will be lost. Proceed?')
      : true;
  }

  onEdit() {
    this.navToEdit();
  }

  onUpdate(config: any) {
    this.updated = true;
    this.configsService.updateConfig(this.configId, config).subscribe(
      res => {
        this.alerts.notify(`Updated ${this.configId}`);
        this.postUpdate(this.configId);
        this.navToView();
      },
      (err: any) => {
        this.alerts.notify(`Failed to update config: ${err.message}`);
      }
    );
  }

  onCancel() {
    if (this.canDeactivate()) {
      this.navToView();
    }
  }

  private navToView() {
    this.router.navigate(['.'], { relativeTo: this.route });
  }

  private navToEdit() {
    this.router.navigate(['.'], {
      relativeTo: this.route,
      queryParams: { m: 'edit' }
    });
  }

  private setupRouteChangeHandler() {
    const configId$ = this.route.paramMap.pipe(
      map(paramMap => paramMap.get('configId'))
    );

    const edit$ = this.route.queryParamMap.pipe(
      map((p: ParamMap) => p.get('m')),
      map(mode => mode === 'edit')
    );

    combineLatest(configId$, edit$)
      .pipe(debounceTime(100))
      .subscribe(([configId, edit]) => {
        if (this.shouldFetch(configId, edit)) {
          this.configsService.fetchConfig(configId);
        }
        this.edit = edit;
        this.updated = false;
      });
  }

  private shouldFetch(configId: string | null, edit: boolean) {
    if (!this.config) {
      return true;
    }

    if (configId !== this.configId) {
      return true;
    }

    if (this.updated && this.edit && !edit) {
      return true;
    }
  }

  private postUpdate(configId: string) {
    if (configId === 'settings') {
      this.settingsService.fetchSettings();
    } else if (configId === 'clients') {
      this.clientsService.fetchClients();
    }
  }
}
