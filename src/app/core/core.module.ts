import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AlertService } from './alert.service';
import { AuthService } from './auth.service';
import { CommandService } from './command.service';
import { ServicesManager } from './services-manager';
import { SchedulesService } from './schedules.service';
import { CanDeactivateGuard } from './can-deactivate-guard.service';

import { AUTH_INTERCEPTOR_PROVIDER } from './auth-interceptor';
import { MODEL_PROVIDER } from './model.service';
import { SidebarService } from './sidebar.service';

import { MaterialModule } from '../shared/material.module';

@NgModule({
  imports: [CommonModule, HttpClientModule, MaterialModule],
  providers: [
    AlertService,
    AUTH_INTERCEPTOR_PROVIDER,
    AuthService,
    CanDeactivateGuard,
    CommandService,
    MODEL_PROVIDER,
    ServicesManager,
    SchedulesService,
    SidebarService
  ]
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}
