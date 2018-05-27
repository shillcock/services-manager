import { Component, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Data, ParamMap, Router } from '@angular/router';

import {
  catchError,
  debounceTime,
  map,
  pluck,
  takeUntil
} from 'rxjs/operators';
import { empty } from 'rxjs/observable/empty';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { Subject } from 'rxjs/Subject';

import { AlertService, ServicesManager } from '@app/core';
import { ConfigsService } from '@app/configs/configs.service';
import { CanComponentDeactivate } from '@app/core/can-deactivate-guard.service';

import { ConfigEditComponent } from '@app/configs/config-edit/config-edit.component';

@Component({
  selector: 'sm-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnDestroy, CanComponentDeactivate {
  @ViewChild(ConfigEditComponent) editor: ConfigEditComponent;

  private destroyed$ = new Subject<boolean>();

  configId?: string;
  config: any;
  edit: boolean;
  working: boolean;
  configs: any;

  get dirty() {
    return this.edit && this.editor ? this.editor.isDirty() : false;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alerts: AlertService,
    private cs: ConfigsService,
    private sm: ServicesManager
  ) {
    this.sm.settings$
      .pipe(takeUntil(this.destroyed$), pluck('configs'))
      .subscribe(configs => (this.configs = _.toArray(configs)));

    this.setupRouteChangeHandler();
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
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
    if (!this.configId) {
      this.alerts.notify('Failed to update config: unknown config');
      return;
    }

    this.working = true;
    this.cs.updateConfig(this.configId, config).subscribe(
      (result: any) => {
        this.working = false;
        this.alerts.notify(`Updated ${this.configId}`);
        this.postUpdate();
        this.navToView();
      },
      (err: any) => {
        this.working = false;
        this.alerts.notify(`Failed to update config: ${err.message}`);
      }
    );
  }

  onCancel() {
    this.navToView();
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
      map((p: ParamMap) => p.get('configId'))
    );

    const edit$ = this.route.queryParamMap.pipe(
      map((p: ParamMap) => p.get('m')),
      map(mode => mode === 'edit')
    );

    combineLatest(configId$, edit$)
      .pipe(debounceTime(100))
      .subscribe(([configId, edit]) => {
        if (!configId) {
          return;
        }

        this.edit = edit;
        this.working = true;

        if (this.configId !== configId || this.edit === false) {
          this.config = undefined;
        }

        this.configId = configId;

        this.cs
          .getConfig(configId)
          .pipe(
            catchError(err => {
              const msg = `Failed to get "${configId}" config. ${err}`;
              this.alerts.notify(msg);
              this.router.navigate(['/']);
              return empty();
            })
          )
          .subscribe((config: any) => {
            this.working = false;
            this.config = config;
          });
      });
  }

  private postUpdate() {
    if (this.configId === 'settings') {
      this.sm.fetchSettings();
    } else if (this.configId === 'clients') {
      this.sm.fetchClients();
    }
  }
}
