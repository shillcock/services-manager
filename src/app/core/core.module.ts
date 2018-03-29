import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AuthService } from './auth.service';
import { AUTH_INTERCEPTOR_PROVIDER } from './auth-interceptor';
import { MODEL_PROVIDER } from './model.service';
import { ServicesManager } from './services-manager';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    AuthService,
    AUTH_INTERCEPTOR_PROVIDER,
    MODEL_PROVIDER,
    ServicesManager
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
