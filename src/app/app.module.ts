import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AuthService, CoreModule } from './core';
import { SharedModule } from './shared';
import { ClientsModule } from './clients/clients.module';

import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

function init_app(authService: AuthService) {
  return () => authService.initializeApp();
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    ClientsModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: init_app,
      deps: [AuthService],
      multi: true
    }
  ],
  declarations: [AppComponent, LandingPageComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
