import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AlertService } from './services/alert.service';
import { AuthService } from './services/auth.service';
import { ClientsService } from './services/clients.service';
import { CommandService } from './services/command.service';
import { ConfigsService } from './services/configs.service';
import { LoggerService } from './services/logger.service';
import { SettingsService } from './services/settings.service';
import { SidebarService } from './services/sidebar.service';

import { AUTH_INTERCEPTOR_PROVIDER } from './auth-interceptor';
import { CanDeactivateGuard } from './can-deactivate-guard.service';

import { MaterialModule } from '../shared/material.module';

@NgModule({
  imports: [CommonModule, HttpClientModule, MaterialModule],
  providers: [
    AUTH_INTERCEPTOR_PROVIDER,
    AlertService,
    AuthService,
    CanDeactivateGuard,
    ClientsService,
    ConfigsService,
    CommandService,
    LoggerService,
    SettingsService,
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
