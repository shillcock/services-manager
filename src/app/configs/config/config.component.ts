import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Data, ParamMap, Router } from '@angular/router';

import { map } from 'rxjs/operators';

import { ConfigItems } from '@app/shared/consts';
import { ConfigsService } from '@app/configs/configs.service';
import { AlertService } from '@app/core/alert.service';
import { ConfigEditComponent } from '@app/configs/config-edit/config-edit.component';
import { CanComponentDeactivate } from '@app/core/can-deactivate-guard.service';

@Component({
  selector: 'sm-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements CanComponentDeactivate {
  @ViewChild(ConfigEditComponent) editor: ConfigEditComponent;

  readonly configItems = ConfigItems;
  configId: string;
  config: any;
  edit: boolean;
  working: boolean;

  get dirty() {
    return this.edit && this.editor ? this.editor.isDirty() : false;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alerts: AlertService,
    private configs: ConfigsService
  ) {
    this.route.paramMap
      .pipe(map((p: ParamMap) => p.get('configId')))
      .subscribe(configId => (this.configId = configId));

    this.route.queryParamMap
      .pipe(map((p: ParamMap) => p.get('m')), map(mode => mode === 'edit'))
      .subscribe(edit => (this.edit = edit));

    this.route.data
      .pipe(map((data: Data) => data.config))
      .subscribe((config: any) => {
        this.config = config;
      });
  }

  canDeactivate() {
    return this.dirty ? confirm('Discard changes?') : true;
  }

  onEdit() {
    this.router.navigate(['.'], {
      relativeTo: this.route,
      queryParams: { m: 'edit' }
    });
  }

  onUpdate(config: any) {
    this.working = true;
    this.configs.updateConfig(this.configId, config).subscribe(
      (result: any) => {
        this.working = false;
        this.alerts.notify(`Updated ${this.configId}`);
        this.router.navigate(['.'], { relativeTo: this.route });
      },
      (err: any) => {
        this.working = false;
        this.alerts.notify(`Failed to update config: ${err.message}`);
        throw err;
      }
    );
  }

  onCancel() {
    this.router.navigate(['.'], { relativeTo: this.route });
  }
}
