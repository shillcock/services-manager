import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthService, CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { ServicesModule } from '@app/services/services.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

function init_app(authService: AuthService) {
  return () => authService.initializeApp();
}

@NgModule({
  declarations: [AppComponent, LandingPageComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    ServicesModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: init_app,
      deps: [AuthService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
