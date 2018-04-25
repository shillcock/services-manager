import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AlertService } from './alert.service';
import { AuthService } from './auth.service';
import { CommandService } from './command.service';
import { ServicesManager } from './services-manager';

import { AUTH_INTERCEPTOR_PROVIDER } from './auth-interceptor';
import { MODEL_PROVIDER } from './model.service';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    AlertService,
    AuthService,
    CommandService,
    ServicesManager,
    AUTH_INTERCEPTOR_PROVIDER,
    MODEL_PROVIDER
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
